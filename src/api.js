import { supabase } from './supabaseClient';

export async function fetchCourses({ category, search, featured } = {}) {
  let query = supabase
    .from('courses')
    .select('id, title, slug, description, image_url, category, difficulty, duration_hours, is_featured, tags, lessons_count, rating, enrolled_count, created_at')
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
    .select('id, title, slug, description, image_url, category, difficulty, duration_hours, is_featured, tags, lessons_count, rating, enrolled_count, created_at')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchCourseSections(courseId) {
  const { data, error } = await supabase
    .from('course_sections')
    .select('id, title, content, order_index')
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
