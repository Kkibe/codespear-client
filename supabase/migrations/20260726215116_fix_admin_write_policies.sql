/*
# Fix admin write policies for courses, course_sections, blogs

## Overview
The admin panel's course/blog publishing failed because these tables only had
SELECT policies — no INSERT/UPDATE/DELETE for admins. This adds admin-gated
write policies using the existing is_admin() helper.

## Changes
1. `courses` — admin INSERT/UPDATE/DELETE policies (is_admin() check).
2. `course_sections` — admin INSERT/UPDATE/DELETE policies.
3. `blogs` — admin INSERT/UPDATE/DELETE policies.

## Security
- All write policies require public.is_admin() = true (the calling user's
  profiles.is_admin flag). Read access stays public as before.
- No data is modified.
*/

-- courses: admin write
DROP POLICY IF EXISTS "admin_insert_courses" ON courses;
CREATE POLICY "admin_insert_courses" ON courses FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_courses" ON courses;
CREATE POLICY "admin_update_courses" ON courses FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_courses" ON courses;
CREATE POLICY "admin_delete_courses" ON courses FOR DELETE
  TO authenticated USING (public.is_admin());

-- course_sections: admin write
DROP POLICY IF EXISTS "admin_insert_course_sections" ON course_sections;
CREATE POLICY "admin_insert_course_sections" ON course_sections FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_course_sections" ON course_sections;
CREATE POLICY "admin_update_course_sections" ON course_sections FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_course_sections" ON course_sections;
CREATE POLICY "admin_delete_course_sections" ON course_sections FOR DELETE
  TO authenticated USING (public.is_admin());

-- blogs: admin write
DROP POLICY IF EXISTS "admin_insert_blogs" ON blogs;
CREATE POLICY "admin_insert_blogs" ON blogs FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_blogs" ON blogs;
CREATE POLICY "admin_update_blogs" ON blogs FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_blogs" ON blogs;
CREATE POLICY "admin_delete_blogs" ON blogs FOR DELETE
  TO authenticated USING (public.is_admin());
