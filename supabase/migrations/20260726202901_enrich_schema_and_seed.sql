/*
# Codespear — enrich schema + enrollments + seed data

## Overview
Adds clean-URL slugs and catalog metadata to courses/blogs, creates the
enrollments table for the user dashboard, and seeds starter content so the
site renders real data on first load.

## Changes
1. `courses` — add `slug` (unique), `lessons_count`, `rating`, `enrolled_count`, `level` is already `difficulty`.
2. `blogs` — add `slug` (unique), `author_name`, `published_at`.
3. New `enrollments` table — owner-scoped, links a user to a course with progress + completed flag. `user_id` defaults to `auth.uid()` so client inserts work.
4. RLS on enrollments — owner-scoped CRUD (authenticated, auth.uid() = user_id).
5. Seed: 9 courses with slugs/metadata, matching course sections, 6 blog posts with slugs/authors.

## Security
- enrollments: 4 owner-scoped policies (select/insert/update/delete), authenticated only.
- All other existing policies unchanged.

## Notes
- All ADD COLUMN operations are non-destructive (tables are empty).
- Slug uniqueness enforced via unique index. Seeded slugs are URL-friendly.
*/

-- courses enrichments
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS lessons_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rating numeric(2,1) NOT NULL DEFAULT 0.0,
  ADD COLUMN IF NOT EXISTS enrolled_count integer NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS courses_slug_idx ON courses(slug);

-- blogs enrichments
ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS author_name text NOT NULL DEFAULT 'Codespear Team',
  ADD COLUMN IF NOT EXISTS published_at timestamptz NOT NULL DEFAULT now();
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);

-- enrollments (new)
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress numeric(5,2) NOT NULL DEFAULT 0.0,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_enrollments" ON enrollments;
CREATE POLICY "select_own_enrollments" ON enrollments FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_enrollments" ON enrollments;
CREATE POLICY "insert_own_enrollments" ON enrollments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_enrollments" ON enrollments;
CREATE POLICY "update_own_enrollments" ON enrollments FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_enrollments" ON enrollments;
CREATE POLICY "delete_own_enrollments" ON enrollments FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS enrollments_user_idx ON enrollments(user_id);

-- ---- Seed: courses ----
INSERT INTO courses (title, slug, description, image_url, category, difficulty, duration_hours, is_featured, tags, lessons_count, rating, enrolled_count)
VALUES
  ('React from Scratch', 'react', 'Build modern, component-driven user interfaces with React 18, hooks, and the latest patterns used in production apps.', 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg', 'Frontend', 'Beginner', 12, true, ARRAY['react','javascript','frontend'], 24, 4.8, 12450),
  ('Python for Everyone', 'python', 'Master Python from basics to advanced topics: data structures, OOP, automation, and an intro to data science.', 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg', 'Programming', 'Beginner', 16, true, ARRAY['python','data','automation'], 32, 4.9, 28910),
  ('Modern JavaScript', 'javascript', 'Deep dive into ES6+, asynchronous JavaScript, modules, and the language features every developer must know.', 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg', 'Frontend', 'Intermediate', 10, true, ARRAY['javascript','es6','web'], 20, 4.7, 18760),
  ('Java Fundamentals', 'java', 'Learn Java from the ground up: syntax, OOP, collections, streams, and building robust backend applications.', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg', 'Backend', 'Beginner', 14, false, ARRAY['java','backend','oop'], 28, 4.6, 9320),
  ('HTML & CSS Mastery', 'html-css', 'Craft beautiful, responsive layouts with semantic HTML, modern CSS, Flexbox, Grid, and animations.', 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', 'Frontend', 'Beginner', 8, true, ARRAY['html','css','responsive'], 18, 4.8, 21050),
  ('SQL & Databases', 'sql', 'Understand relational databases, write efficient SQL queries, and design schemas that scale.', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg', 'Data', 'Intermediate', 9, false, ARRAY['sql','database','postgres'], 16, 4.5, 6740),
  ('Node.js Backend', 'nodejs', 'Build REST APIs and real-time services with Node.js, Express, and modern backend best practices.', 'https://images.pexels.com/photos/11035480/pexels-photo-11035480.jpeg', 'Backend', 'Intermediate', 11, false, ARRAY['nodejs','api','backend'], 22, 4.6, 8120),
  ('Git & Version Control', 'git', 'Master Git workflows, branching strategies, and collaboration essentials every developer needs.', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg', 'Tools', 'Beginner', 4, false, ARRAY['git','version-control','workflow'], 10, 4.7, 14200),
  ('Tailwind CSS', 'tailwind', 'Design systems at lightning speed with utility-first CSS and a modern component workflow.', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg', 'Frontend', 'Intermediate', 6, false, ARRAY['css','tailwind','design'], 14, 4.6, 5430)
ON CONFLICT (slug) DO NOTHING;

-- ---- Seed: course sections (lessons) ----
INSERT INTO course_sections (course_id, title, content, order_index)
SELECT c.id, s.title, s.content, s.ord
FROM courses c
JOIN (VALUES
  ('react', 'Getting Started with React', 'Introduction to React, the virtual DOM, and why component-driven development changed frontend engineering.', 0),
  ('react', 'Components & Props', 'Learn function components, passing data with props, and composing reusable UI pieces.', 1),
  ('react', 'State & Hooks', 'Master useState, useEffect, and the rules of hooks that power interactive components.', 2),
  ('python', 'Python Basics', 'Variables, types, control flow, and writing your first Python programs.', 0),
  ('python', 'Data Structures', 'Lists, dictionaries, sets, and tuples — the building blocks of Python code.', 1),
  ('python', 'Object-Oriented Python', 'Classes, inheritance, and how to model real-world systems in Python.', 2),
  ('javascript', 'The Language', 'Values, types, operators, and how JavaScript evaluates expressions.', 0),
  ('javascript', 'Functions & Scope', 'Closures, arrow functions, and lexical scope explained clearly.', 1),
  ('javascript', 'Async JavaScript', 'Promises, async/await, and handling time in your applications.', 2),
  ('html-css', 'Semantic HTML', 'Structure documents with meaning using the right elements for the job.', 0),
  ('html-css', 'CSS Layout', 'Flexbox and Grid: the two systems that solve almost every layout problem.', 1),
  ('html-css', 'Responsive Design', 'Mobile-first layouts, media queries, and fluid typography.', 2)
) AS s(slug, title, content, ord)
ON c.slug = s.slug
WHERE NOT EXISTS (SELECT 1 FROM course_sections cs WHERE cs.course_id = c.id);

-- ---- Seed: blogs ----
INSERT INTO blogs (title, slug, excerpt, content, cover_image_url, author_name, tags, published, published_at)
VALUES
  ('Getting Started with React in 2024', 'getting-started-react-2024',
   'A practical, modern introduction to React — hooks, components, and the patterns that matter today.',
   'React has evolved dramatically. This guide walks through setting up a new project with Vite, building your first components, and understanding the mental model that makes React click. We cover function components, the hooks that replaced class lifecycle methods, and how to think about state as a tree of immutable values. By the end you will have a working app and the confidence to keep building.',
   'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg', 'Kelvin Kibet', ARRAY['react','javascript','frontend'], true, now() - interval '3 days'),

  ('Why Python Keeps Winning', 'why-python-keeps-winning',
   'From scripting to AI, Python''s simplicity and ecosystem make it the most versatile language of the decade.',
   'Python is everywhere — web backends, data science, machine learning, automation, and scientific computing. Its readable syntax flattens the learning curve, while a vast ecosystem of libraries means you rarely start from scratch. In this post we explore the domains where Python dominates, why its community keeps growing, and how to decide if it is the right first language for you.',
   'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg', 'Aisha Mohamed', ARRAY['python','career','data'], true, now() - interval '7 days'),

  ('CSS Grid: A Visual Guide', 'css-grid-visual-guide',
   'Stop fighting layouts. CSS Grid gives you a two-dimensional system that handles almost any design.',
   'For years frontend developers wrestled with floats, clearfixes, and hacky positioning. CSS Grid changed the game by offering a real two-dimensional layout system. We break down rows, columns, tracks, and areas with visual examples that make the model intuitive. You will leave with patterns you can apply to dashboards, landing pages, and full app shells today.',
   'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg', 'Kelvin Kibet', ARRAY['css','layout','frontend'], true, now() - interval '12 days'),

  ('Understanding Asynchronous JavaScript', 'async-javascript-explained',
   'Promises, async/await, and the event loop — demystified with plain analogies and real examples.',
   'JavaScript is single-threaded, yet it handles thousands of concurrent operations gracefully. The secret is the event loop and the async primitives built on top of it. This article traces the evolution from callbacks to promises to async/await, shows where each pattern fits, and warns about the common pitfalls like unhandled rejections and sequential awaits that should be parallel.',
   'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg', 'Brian Otieno', ARRAY['javascript','async','web'], true, now() - interval '18 days'),

  ('A Developer''s Guide to Git', 'developers-guide-to-git',
   'Commits, branches, and merges — the version control workflow every developer should internalize.',
   'Git is the foundation of modern collaboration. Yet most developers learn just enough to get by and panic when things go wrong. We walk through a clean branching workflow, how to write good commit messages, resolving conflicts calmly, and the recovery commands that save the day. Master these and you will never fear version control again.',
   'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg', 'Aisha Mohamed', ARRAY['git','workflow','tools'], true, now() - interval '25 days'),

  ('Designing REST APIs That Last', 'designing-rest-apis',
   'Resource modeling, status codes, and versioning — the principles behind APIs developers love to use.',
   'A good API feels obvious. It uses the right verbs, returns predictable shapes, and communicates errors clearly. This guide covers resource naming, when to nest versus query params, idempotency, pagination, and how to version without breaking existing clients. Whether you build public or internal APIs, these principles will keep your interfaces clean for years.',
   'https://images.pexels.com/photos/11035480/pexels-photo-11035480.jpeg', 'Brian Otieno', ARRAY['api','backend','nodejs'], true, now() - interval '30 days')
ON CONFLICT (slug) DO NOTHING;
