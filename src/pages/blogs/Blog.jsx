import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Send, Loader as Loader2, MessageCircle, User, Heart, Share2, Check, Eye } from 'lucide-react';
import {
  fetchBlogBySlug, fetchRelatedBlogs, fetchBlogComments, addBlogComment,
  fetchBlogLikes, hasUserLikedBlog, likeBlog, unlikeBlog, incrementBlogViews,
} from '../../api';
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
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeBusy, setLikeBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    setBlog(null);
    setLiked(false);
    setLikes(0);
    fetchBlogBySlug(slug)
      .then(async (b) => {
        if (!b) { setError('Article not found'); setLoading(false); return; }
        setBlog(b);
        const [rel, coms, likeCount, userLiked] = await Promise.all([
          fetchRelatedBlogs(slug).catch(() => []),
          fetchBlogComments(b.id).catch(() => []),
          fetchBlogLikes(b.id).catch(() => 0),
          user ? hasUserLikedBlog(user.id, b.id).catch(() => false) : Promise.resolve(false),
        ]);
        setRelated(rel);
        setComments(coms);
        setLikes(likeCount);
        setLiked(userLiked);
        incrementBlogViews(b.id).catch(() => {});
        setLoading(false);
      })
      .catch(() => { setError('Failed to load article'); setLoading(false); });
  }, [slug, user]);

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

  const handleLike = async () => {
    if (!user) { window.location.href = '/login'; return; }
    if (likeBusy) return;
    setLikeBusy(true);
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes((n) => n + (wasLiked ? -1 : 1));
    try {
      if (wasLiked) { await unlikeBlog(user.id, blog.id); }
      else { await likeBlog(user.id, blog.id); }
    } catch (err) {
      setLiked(wasLiked);
      setLikes((n) => n + (wasLiked ? 1 : -1));
    } finally {
      setLikeBusy(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: blog.title, text: blog.excerpt, url }); } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (_) {}
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
          {blog.views > 0 && <span className="blog-page__date"><Eye size={16} /> {blog.views} views</span>}
        </div>
        {blog.cover_image_url && (
          <div className="blog-page__cover">
            <img src={blog.cover_image_url} alt={blog.title} />
          </div>
        )}

        {/* Like + Share bar */}
        <div className="blog-actions">
          <button className={`blog-action ${liked ? 'blog-action--liked' : ''}`} onClick={handleLike} disabled={likeBusy}>
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
            <span className="blog-action__label">{likes === 1 ? 'like' : 'likes'}</span>
          </button>
          <button className="blog-action" onClick={handleShare}>
            {copied ? <><Check size={18} /><span>Copied!</span></> : <><Share2 size={18} /><span>Share</span></>}
          </button>
        </div>

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
              <Link to="/login" style={{ fontWeight: 600, color: 'inherit', textDecoration: 'underline' }}>Sign in</Link> to like, share, and join the discussion.
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
