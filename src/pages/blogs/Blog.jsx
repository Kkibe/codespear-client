import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Send, Loader2, MessageCircle, User } from 'lucide-react';
import { fetchBlogBySlug, fetchRelatedBlogs, fetchBlogComments, addBlogComment } from '../../api';
import { useAuth } from '../../AuthContext';
import './Blog.css';

export default function Blog() {
  const { slug } = useParams();
  const { user, profile } = useAuth();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    setBlog(null);
    fetchBlogBySlug(slug)
      .then(async (b) => {
        if (!b) { setError('Article not found'); setLoading(false); return; }
        setBlog(b);
        const [rel, coms] = await Promise.all([
          fetchRelatedBlogs(slug).catch(() => []),
          fetchBlogComments(b.id).catch(() => []),
        ]);
        setRelated(rel);
        setComments(coms);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load article'); setLoading(false); });
  }, [slug]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) { window.location.href = '/login'; return; }
    if (!commentText.trim()) return;
    setPosting(true);
    try {
      const c = await addBlogComment(blog.id, user.id, commentText.trim());
      setComments((prev) => [{ ...c }, ...prev]);
      setCommentText('');
    } catch (err) {
      setError(err.message || 'Could not post comment');
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <div className="page"><div className="loading-screen"><div className="spinner spinner-lg" /> Loading article...</div></div>;
  if (error || !blog) return (
    <div className="page">
      <div className="container empty-state">
        <h3>{error || 'Article not found'}</h3>
        <Link to="/blog" className="btn btn-secondary"><ArrowLeft size={16} /> Back to blog</Link>
      </div>
    </div>
  );

  const date = blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div className="page blog-page">
      <article className="container container-narrow">
        <Link to="/blog" className="blog-page__back"><ArrowLeft size={16} /> All articles</Link>
        <div className="cluster" style={{ marginTop: 'var(--space-6)' }}>
          {blog.tags?.map((t) => <span key={t} className="badge badge-neutral">#{t}</span>)}
        </div>
        <h1 className="h1 blog-page__title text-balance">{blog.title}</h1>
        <p className="lead blog-page__excerpt text-balance">{blog.excerpt}</p>
        <div className="blog-page__meta">
          <span className="blog-page__author">
            <User size={16} /> {blog.author_name}
          </span>
          {date && <span className="blog-page__date"><Clock size={16} /> {date}</span>}
        </div>
        {blog.cover_image_url && (
          <div className="blog-page__cover">
            <img src={blog.cover_image_url} alt={blog.title} />
          </div>
        )}
        <div className="blog-page__content">
          <p>{blog.content}</p>
          <p>Whether you are just getting started or refining your craft, the key is consistent practice. Build small things, break them, fix them, and ship. The concepts in this article are meant to be a starting point — take them, apply them to a real project, and make them your own.</p>
        </div>

        {/* Comments */}
        <section className="blog-comments">
          <h2 className="h3 blog-comments__title"><MessageCircle size={20} /> Comments ({comments.length})</h2>
          {user ? (
            <form className="blog-comments__form" onSubmit={handleComment}>
              <textarea
                className="textarea"
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={posting || !commentText.trim()}>
                {posting ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                {posting ? 'Posting...' : 'Post comment'}
              </button>
            </form>
          ) : (
            <div className="alert alert-info">
              <Link to="/login" style={{ fontWeight: 600, color: 'inherit', textDecoration: 'underline' }}>Sign in</Link> to join the discussion.
            </div>
          )}
          <div className="blog-comments__list">
            {comments.length ? comments.map((c) => (
              <div key={c.id} className="comment">
                <div className="comment__avatar">
                  <User size={18} />
                </div>
                <div className="comment__body">
                  <div className="comment__head">
                    <span className="comment__author">{profile?.username || 'Community member'}</span>
                    <span className="comment__date">{new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p className="comment__text">{c.content}</p>
                </div>
              </div>
            )) : (
              <p className="muted">Be the first to comment.</p>
            )}
          </div>
        </section>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="container" style={{ marginTop: 'var(--space-16)' }}>
          <h2 className="h3" style={{ marginBottom: 'var(--space-6)' }}>Related articles</h2>
          <div className="grid grid-3 stagger">
            {related.map((r) => (
              <Link key={r.id} to={`/blog/${r.slug}`} className="blog-card card card-hover">
                {r.cover_image_url && <div className="blog-card__media"><img src={r.cover_image_url} alt={r.title} loading="lazy" /></div>}
                <div className="blog-card__body">
                  <span className="blog-card__author">{r.author_name}</span>
                  <h3 className="blog-card__title">{r.title}</h3>
                  <p className="blog-card__excerpt">{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
