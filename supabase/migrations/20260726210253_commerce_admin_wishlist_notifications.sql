/*
# Codespear — commerce, admin, wishlist, notifications, progress

## Overview
Adds the data layer for paid content, an admin panel, and richer user
tracking: course categories, subscription plans + subscriptions,
Flutterwave payments, user wishlists, in-app notifications,
per-lesson completion tracking, and an admin role flag.

## Changes
1. `profiles` — add `is_admin` boolean default false.
2. `is_admin()` SQL helper — returns the caller's admin flag.
3. `categories` — course/blog categories. Public read, admin write.
4. `subscription_plans` — plan definitions. Public read, admin write.
5. `payments` — Flutterwave transactions. Owner + admin read, owner insert, admin update.
6. `subscriptions` — active user subscriptions. Owner-scoped CRUD.
7. `wishlists` — saved courses. Owner-scoped.
8. `notifications` — in-app notifications. Owner-scoped.
9. `lesson_completions` — per-lesson completion tracking. Owner-scoped.
10. `courses` — add price, currency, content_html, category_id.
11. `course_sections` — add content_html.
12. `blogs` — add category_id, views.
13. Seed: 3 subscription plans, 5 categories, link courses to categories.

## Security
- `is_admin()` checks profiles.is_admin for the calling user.
- `categories`, `subscription_plans` — public SELECT; admin-only write.
- `payments` — owner SELECT + admin SELECT; owner INSERT; admin UPDATE.
- `subscriptions`, `wishlists`, `notifications`, `lesson_completions` — owner-scoped CRUD with DEFAULT auth.uid().
- All ADD COLUMN operations are non-destructive.
*/
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_categories" ON categories;
CREATE POLICY "public_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_categories" ON categories;
CREATE POLICY "admin_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_categories" ON categories;
CREATE POLICY "admin_update_categories" ON categories FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_categories" ON categories;
CREATE POLICY "admin_delete_categories" ON categories FOR DELETE
  TO authenticated USING (public.is_admin());

-- subscription_plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  price numeric(10,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  interval text NOT NULL DEFAULT 'month',
  benefits text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_plans" ON subscription_plans;
CREATE POLICY "public_select_plans" ON subscription_plans FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_plans" ON subscription_plans;
CREATE POLICY "admin_insert_plans" ON subscription_plans FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_plans" ON subscription_plans;
CREATE POLICY "admin_update_plans" ON subscription_plans FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_plans" ON subscription_plans;
CREATE POLICY "admin_delete_plans" ON subscription_plans FOR DELETE
  TO authenticated USING (public.is_admin());

-- payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending',
  tx_ref text NOT NULL UNIQUE,
  flw_tx_id bigint,
  kind text NOT NULL DEFAULT 'course',
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  plan_id uuid REFERENCES subscription_plans(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_payments" ON payments;
CREATE POLICY "select_own_payments" ON payments FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "admin_select_payments" ON payments;
CREATE POLICY "admin_select_payments" ON payments FOR SELECT
  TO authenticated USING (public.is_admin());
DROP POLICY IF EXISTS "insert_own_payments" ON payments;
CREATE POLICY "insert_own_payments" ON payments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "admin_update_payments" ON payments;
CREATE POLICY "admin_update_payments" ON payments FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE INDEX IF NOT EXISTS payments_user_idx ON payments(user_id);

-- subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  started_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, plan_id)
);
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_subscriptions" ON subscriptions;
CREATE POLICY "select_own_subscriptions" ON subscriptions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_subscriptions" ON subscriptions;
CREATE POLICY "insert_own_subscriptions" ON subscriptions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_subscriptions" ON subscriptions;
CREATE POLICY "update_own_subscriptions" ON subscriptions FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_subscriptions" ON subscriptions;
CREATE POLICY "delete_own_subscriptions" ON subscriptions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON subscriptions(user_id);

-- wishlists
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_wishlists" ON wishlists;
CREATE POLICY "select_own_wishlists" ON wishlists FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_wishlists" ON wishlists;
CREATE POLICY "insert_own_wishlists" ON wishlists FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_wishlists" ON wishlists;
CREATE POLICY "delete_own_wishlists" ON wishlists FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS wishlists_user_idx ON wishlists(user_id);

-- notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text DEFAULT '',
  type text NOT NULL DEFAULT 'info',
  link text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_notifications" ON notifications;
CREATE POLICY "insert_own_notifications" ON notifications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_notifications" ON notifications;
CREATE POLICY "delete_own_notifications" ON notifications FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id);

-- lesson_completions
CREATE TABLE IF NOT EXISTS lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id uuid NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, section_id)
);
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_completions" ON lesson_completions;
CREATE POLICY "select_own_completions" ON lesson_completions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_completions" ON lesson_completions;
CREATE POLICY "insert_own_completions" ON lesson_completions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_completions" ON lesson_completions;
CREATE POLICY "delete_own_completions" ON lesson_completions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS completions_user_idx ON lesson_completions(user_id);
CREATE INDEX IF NOT EXISTS completions_section_idx ON lesson_completions(section_id);

-- courses: pricing + content + category
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS price numeric(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS content_html text,
  ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS courses_category_id_idx ON courses(category_id);

-- course_sections: html content
ALTER TABLE course_sections ADD COLUMN IF NOT EXISTS content_html text;

-- blogs: category + views
ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS views integer NOT NULL DEFAULT 0;

-- ---- Seed: subscription plans ----
INSERT INTO subscription_plans (name, slug, price, currency, interval, benefits, is_active)
VALUES
  ('Free', 'free', 0, 'USD', 'month', ARRAY['Access to free courses','Community access','Progress tracking'], true),
  ('Pro', 'pro', 9.00, 'USD', 'month', ARRAY['All courses','No ads','Certificate of completion','Priority support','Wishlist & notes'], true),
  ('Lifetime', 'lifetime', 199.00, 'USD', 'year', ARRAY['Everything in Pro','Lifetime access','Early access to new courses','Source code downloads'], true)
ON CONFLICT (slug) DO NOTHING;

-- ---- Seed: categories ----
INSERT INTO categories (name, slug, description)
VALUES
  ('Frontend', 'frontend', 'User interfaces, design, and client-side development.'),
  ('Backend', 'backend', 'Servers, APIs, and data persistence.'),
  ('Programming', 'programming', 'Core programming languages and fundamentals.'),
  ('Data', 'data', 'Databases, data science, and analytics.'),
  ('Tools', 'tools', 'Developer tools, workflows, and best practices.')
ON CONFLICT (slug) DO NOTHING;

-- link existing seeded courses to categories by their category text
UPDATE courses SET category_id = c.id FROM categories c WHERE courses.category = c.name AND courses.category_id IS NULL;
