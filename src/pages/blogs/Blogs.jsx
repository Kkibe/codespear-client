import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { BlogItem } from '../../components/blogItem/BlogItem';
import { fetchBlogs } from '../../api';
import './Blogs.css';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchBlogs({ search })
      .then((data) => setBlogs(data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="page blogs-page">
      <div className="container">
        <div className="blogs-page__head">
          <span className="eyebrow">The Codespear Blog</span>
          <h1 className="h2">Insights &amp; tutorials</h1>
          <p className="lead text-balance">Deep dives, how-tos, and perspectives on programming, web development, and the tech industry.</p>
        </div>

        <form className="blogs-page__search" onSubmit={(e) => { e.preventDefault(); setSearch(e.target.elements.q.value.trim()); }}>
          <Search size={18} />
          <input name="q" placeholder="Search articles..." aria-label="Search articles" defaultValue={search} />
          {search && <button type="button" className="blogs-page__clear" onClick={() => setSearch('')} aria-label="Clear"><X size={16} /></button>}
        </form>

        {loading ? (
          <div className="grid grid-3">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 340 }} />)}
          </div>
        ) : blogs.length ? (
          <div className="grid grid-3 stagger">
            {blogs.map((b) => <BlogItem key={b.id} blog={b} />)}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={40} />
            <h3>No articles found</h3>
            <p>Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
