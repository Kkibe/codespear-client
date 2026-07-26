/*
# Blog view counter RPC

## Overview
Adds an atomic increment function for blog post views. Using an RPC avoids
race conditions when many users view a post simultaneously — each call does a
single UPDATE without a separate SELECT.

## Changes
- `increment_blog_views(blog_id uuid)` — increments blogs.views by 1.
- SECURITY DEFINER so it runs with elevated privileges; the blogs table has
  no public UPDATE policy (only admin write), so the RPC is the single safe
  way for anon/authenticated users to bump the counter.
*/
CREATE OR REPLACE FUNCTION public.increment_blog_views(blog_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blogs SET views = views + 1 WHERE id = blog_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_blog_views(uuid) TO anon, authenticated;
