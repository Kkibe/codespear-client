import { supabase } from './supabaseClient';

export async function fetchCourses({ category, search, featured } = {}) {
  let query = supabase
    .from('courses')
    .select('id, title, slug, description, image_url, category, difficulty, duration_hours, is_featured, tags, lessons_count, rating, enrolled_count, price, currency, created_at')
    .order('is_featured', { ascending: false })
    .order('enrolled_count', { ascending: false });
  if (category && category !== 'All') query = query.eq('category', category);
  if (featured) query = query.eq('is_featured', true);
  if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchCourseBySlug(slug) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, slug, description, image_url, category, difficulty, duration_hours, is_featured, tags, lessons_count, rating, enrolled_count, price, currency, content_html, created_at')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchCourseSections(courseId) {
  const { data, error } = await supabase
    .from('course_sections')
    .select('id, title, content, content_html, order_index')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchBlogs({ search } = {}) {
  let query = supabase
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, author_name, tags, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchBlogBySlug(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, content, cover_image_url, author_name, tags, published_at')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchRelatedBlogs(bSlug, limit = 3) {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, author_name, published_at')
    .eq('published', true)
    .neq('slug', bSlug)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchBlogComments(blogId) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, content, created_at, user_id')
    .eq('blog_id', blogId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addBlogComment(blogId, userId, content) {
  const { data, error } = await supabase
    .from('comments')
    .insert({ blog_id: blogId, user_id: userId, content })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchUserEnrollments(userId) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('id, progress, completed, created_at, course_id, courses:course_id(id, title, slug, image_url, category, difficulty, duration_hours, lessons_count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function enrollInCourse(userId, courseId) {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({ user_id: userId, course_id: courseId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEnrollmentProgress(enrollmentId, progress, completed) {
  const { data, error } = await supabase
    .from('enrollments')
    .update({ progress, completed })
    .eq('id', enrollmentId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function subscribeNewsletter(email) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function submitContactMessage(name, email, message) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getEnrollment(userId, courseId) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('id, progress, completed, created_at')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/* ----------------- Payments ----------------- */

export async function fetchUserPayments(userId) {
  const { data, error } = await supabase
    .from('payments')
    .select('id, amount, currency, status, tx_ref, kind, created_at, course_id, plan_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function insertPayment({ userId, amount, currency, txRef, kind, courseId, planId }) {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      user_id: userId,
      amount,
      currency,
      status: 'pending',
      tx_ref: txRef,
      kind,
      course_id: courseId || null,
      plan_id: planId || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function verifyPaymentWithEdge({ transactionId, txRef, kind, courseId, planId, amount, currency }) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`;
  const { data: session } = await supabase.auth.getSession();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      transaction_id: transactionId,
      tx_ref: txRef,
      kind,
      course_id: courseId || null,
      plan_id: planId || null,
      amount,
      currency,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || `Verification failed (${res.status})`);
  return json;
}

/* ----------------- Subscriptions ----------------- */

export async function fetchSubscriptionPlans() {
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('id, name, slug, price, currency, interval, benefits, is_active')
    .eq('is_active', true)
    .order('price', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchUserSubscriptions(userId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('id, status, started_at, ends_at, plan_id, plans:plan_id(id, name, slug, price, currency, interval)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export function hasActiveSubscription(subscriptions) {
  return (subscriptions || []).some((s) => s.status === 'active' && (!s.ends_at || new Date(s.ends_at) > new Date()));
}

/* ----------------- Wishlists ----------------- */

export async function fetchWishlist(userId) {
  const { data, error } = await supabase
    .from('wishlists')
    .select('id, course_id, created_at, courses:course_id(id, title, slug, image_url, category, difficulty, duration_hours, price, currency)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addToWishlist(userId, courseId) {
  const { data, error } = await supabase
    .from('wishlists')
    .insert({ user_id: userId, course_id: courseId })
    .select()
    .maybeSingle();
  if (error && !error.message.includes('duplicate')) throw error;
  return data;
}

export async function removeFromWishlist(userId, courseId) {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('course_id', courseId);
  if (error) throw error;
}

/* ----------------- Notifications ----------------- */

export async function fetchNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, title, body, type, link, read, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data ?? [];
}

export async function markNotificationRead(id) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id);
  if (error) throw error;
}

export async function markAllNotificationsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);
  if (error) throw error;
}

/* ----------------- Lesson completions ----------------- */

export async function fetchLessonCompletions(userId, courseId) {
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('id, section_id, created_at')
    .eq('user_id', userId)
    .in('section_id',
      (await supabase.from('course_sections').select('id').eq('course_id', courseId)).data?.map((s) => s.id) || []
    );
  if (error) throw error;
  return data ?? [];
}

export async function markLessonComplete(userId, sectionId) {
  const { data, error } = await supabase
    .from('lesson_completions')
    .insert({ user_id: userId, section_id: sectionId })
    .select()
    .maybeSingle();
  if (error && !error.message.includes('duplicate')) throw error;
  return data;
}

/* ----------------- Categories ----------------- */

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, created_at')
    .order('name', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/* ----------------- Admin ----------------- */

export async function adminFetchAll(table, select = '*') {
  const { data, error } = await supabase.from(table).select(select).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminUpsert(table, row) {
  const { data, error } = await supabase.from(table).upsert(row).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function adminDelete(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export async function adminFetchUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio, is_admin, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminFetchPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select('id, user_id, amount, currency, status, tx_ref, kind, created_at, course_id, plan_id')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}

export async function adminFetchContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminFetchCourseSections(courseId) {
  const { data, error } = await supabase
    .from('course_sections')
    .select('id, course_id, title, content, content_html, order_index')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function adminToggleUserAdmin(userId, isAdmin) {
  const { error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId);
  if (error) throw error;
}

/* ----------------- Blog likes ----------------- */

export async function fetchBlogLikes(blogId) {
  const { count, error } = await supabase
    .from('blog_likes')
    .select('id', { count: 'exact', head: true })
    .eq('blog_id', blogId);
  if (error) throw error;
  return count ?? 0;
}

export async function hasUserLikedBlog(userId, blogId) {
  if (!userId) return false;
  const { data, error } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('user_id', userId)
    .eq('blog_id', blogId)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function likeBlog(userId, blogId) {
  const { data, error } = await supabase
    .from('blog_likes')
    .insert({ user_id: userId, blog_id: blogId })
    .select()
    .maybeSingle();
  if (error && !error.message.includes('duplicate')) throw error;
  return data;
}

export async function unlikeBlog(userId, blogId) {
  const { error } = await supabase
    .from('blog_likes')
    .delete()
    .eq('user_id', userId)
    .eq('blog_id', blogId);
  if (error) throw error;
}

export async function incrementBlogViews(blogId) {
  const { error } = await supabase.rpc('increment_blog_views', { blog_id: blogId });
  if (error) {
    // rpc may not exist; fall back silently
  }
}

