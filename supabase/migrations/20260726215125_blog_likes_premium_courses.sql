/*
# Blog likes + premium courses seed

## Overview
1. Adds a `blog_likes` table for blog post likes (owner-scoped, one like per user per post).
2. Marks several existing courses as premium (price > 0) so individual course purchases
   are demonstrable.

## New table
- `blog_likes` (user_id, blog_id, created_at) — owner-scoped CRUD with DEFAULT auth.uid().
  Unique constraint prevents duplicate likes. Public SELECT so anyone can see like counts.

## Security
- blog_likes: owner-scoped INSERT/DELETE; public SELECT (to count likes).

## Notes
- No destructive operations. Prices set via UPDATE on existing rows.
*/

-- blog_likes
CREATE TABLE IF NOT EXISTS blog_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, blog_id)
);
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_blog_likes" ON blog_likes;
CREATE POLICY "public_select_blog_likes" ON blog_likes FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "insert_own_blog_likes" ON blog_likes;
CREATE POLICY "insert_own_blog_likes" ON blog_likes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_blog_likes" ON blog_likes;
CREATE POLICY "delete_own_blog_likes" ON blog_likes FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS blog_likes_blog_idx ON blog_likes(blog_id);
CREATE INDEX IF NOT EXISTS blog_likes_user_idx ON blog_likes(user_id);

-- Mark some courses as premium (individual purchase) — keep a few free
UPDATE courses SET price = 29.00, currency = 'USD' WHERE slug IN ('react','javascript');
UPDATE courses SET price = 39.00, currency = 'USD' WHERE slug IN ('nodejs','tailwind');
UPDATE courses SET price = 49.00, currency = 'USD' WHERE slug = 'python';
