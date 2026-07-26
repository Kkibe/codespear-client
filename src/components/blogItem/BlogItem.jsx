import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import './BlogItem.css';

export function BlogItem({ blog }) {
  const date = blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  return (
    <Link to={`/blog/${blog.slug}`} className="blog-card card card-hover">
      {blog.cover_image_url && (
        <div className="blog-card__media">
          <img src={blog.cover_image_url} alt={blog.title} loading="lazy" />
        </div>
      )}
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__author">{blog.author_name}</span>
          {date && <span className="blog-card__date"><Clock size={13} /> {date}</span>}
        </div>
        <h3 className="blog-card__title">{blog.title}</h3>
        <p className="blog-card__excerpt">{blog.excerpt}</p>
        {blog.tags?.length > 0 && (
          <div className="blog-card__tags">
            {blog.tags.slice(0, 3).map((t) => <span key={t} className="badge badge-neutral">#{t}</span>)}
          </div>
        )}
        <div className="blog-card__cta">
          <span>Read article</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
