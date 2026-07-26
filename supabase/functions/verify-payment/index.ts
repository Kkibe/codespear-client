import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const FLW_SECRET = Deno.env.get("FLW_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!FLW_SECRET) {
      return new Response(
        JSON.stringify({ error: "Flutterwave secret key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { transaction_id, tx_ref, kind, course_id, plan_id, amount, currency } = body;

    if (!transaction_id || !tx_ref) {
      return new Response(
        JSON.stringify({ error: "Missing transaction_id or tx_ref" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Server-to-server verification with Flutterwave
    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      { headers: { Authorization: `Bearer ${FLW_SECRET}` } }
    );
    const verifyData = await verifyRes.json();

    if (verifyData.status !== "success" || verifyData.data?.status !== "successful") {
      return new Response(
        JSON.stringify({ error: "Transaction verification failed", detail: verifyData }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tx = verifyData.data;
    const verifiedAmount = Number(tx.amount);
    const verifiedCurrency = tx.currency;
    const verifiedRef = tx.tx_ref;

    // 2. Guard against tampering: ref must match, amount + currency must match
    if (verifiedRef !== tx_ref) {
      return new Response(
        JSON.stringify({ error: "Transaction reference mismatch" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (Number(amount) !== verifiedAmount || currency !== verifiedCurrency) {
      return new Response(
        JSON.stringify({ error: "Amount or currency mismatch" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Extract the user from the JWT sent by the client
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    });

    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Invalid session" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = userData.user.id;
    const userEmail = userData.user.email || "";
    const userName = tx.customer?.name || userEmail.split("@")[0];

    // 4. Record the payment (service role bypasses RLS)
    const { error: payErr } = await supabase.from("payments").insert({
      user_id: userId,
      amount: verifiedAmount,
      currency: verifiedCurrency,
      status: "successful",
      tx_ref: verifiedRef,
      flw_tx_id: Number(transaction_id),
      kind: kind || "course",
      course_id: course_id || null,
      plan_id: plan_id || null,
    });

    if (payErr) {
      // Unique constraint on tx_ref means a duplicate verify is idempotent — ignore it
      if (!payErr.message.includes("duplicate")) {
        return new Response(
          JSON.stringify({ error: "Failed to record payment", detail: payErr.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // 5. Fulfil the purchase
    if (kind === "course" && course_id) {
      // Enrol the user and mark complete-on-access so progress tracking starts
      await supabase.from("enrollments").upsert(
        { user_id: userId, course_id, progress: 0, completed: false },
        { onConflict: "user_id,course_id" }
      );
      await supabase.from("notifications").insert({
        user_id: userId,
        title: "Course unlocked",
        body: "Your purchase is complete. Happy learning!",
        type: "success",
        link: `/courses/${course_id}`,
      });
    } else if (kind === "subscription" && plan_id) {
      // Determine plan interval to compute the end date
      const { data: plan } = await supabase
        .from("subscription_plans")
        .select("interval, name")
        .eq("id", plan_id)
        .maybeSingle();

      const startedAt = new Date();
      const endsAt = new Date(startedAt);
      if (plan?.interval === "year") endsAt.setFullYear(endsAt.getFullYear() + 1);
      else endsAt.setMonth(endsAt.getMonth() + 1);

      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          plan_id,
          status: "active",
          started_at: startedAt.toISOString(),
          ends_at: endsAt.toISOString(),
        },
        { onConflict: "user_id,plan_id" }
      );
      await supabase.from("notifications").insert({
        user_id: userId,
        title: `${plan?.name || "Subscription"} active`,
        body: "Your subscription is now active. Enjoy premium access!",
        type: "success",
        link: "/dashboard",
      });
    }

    return new Response(
      JSON.stringify({ success: true, status: "verified", ref: verifiedRef }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Verification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
