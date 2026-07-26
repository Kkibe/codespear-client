import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { adminFetchAll, adminUpsert, adminDelete } from '../../../api';

const EMPTY = {
  title: '', slug: '', excerpt: '', content: '', cover_image_url: '',
  author_name: 'Codespear Team', tags: '', published: true,
};

export function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

  const load = () => adminFetchAll('blogs', '*').then(setBlogs).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const row = {
      ...editing,
      tags: editing.tags ? editing.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };
    delete row.created_at; delete row.published_at;
    try {
      await adminUpsert('blogs', row);
      setMsg('Post saved'); setEditing(null); load();
      setTimeout(() => setMsg(''), 2500);
    } catch (err) { setMsg(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try { await adminDelete('blogs', id); load(); } catch (e) { setMsg(e.message); }
  };

  if (editing) {
    return (
      <div className="admin__panel card">
        <h2 className="admin__panel-title">
          {editing.id ? 'Edit post' : 'New post'}
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}><X size={16} /> Cancel</button>
        </h2>
        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-form-row">
            <div className="field"><label className="label">Title</label><input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></div>
            <div className="field"><label className="label">Slug</label><input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required /></div>
          </div>
          <div className="field"><label className="label">Excerpt</label><textarea className="textarea" value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></div>
          <div className="field"><label className="label">Content</label><textarea className="html-editor" style={{ minHeight: 200 }} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></div>
          <div className="admin-form-row">
            <div className="field"><label className="label">Cover image URL</label><input className="input" value={editing.cover_image_url} onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value })} /></div>
            <div className="field"><label className="label">Author</label><input className="input" value={editing.author_name} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} /></div>
          </div>
          <div className="field"><label className="label">Tags (comma separated)</label><input className="input" value={editing.tags} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} /></div>
          <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published
          </label>
          <div className="admin-form__actions">
            <button type="submit" className="btn btn-primary"><Save size={16} /> Save post</button>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          </div>
          {msg && <p className="alert alert-error">{msg}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin__panel card">
      <h2 className="admin__panel-title">
        Blog posts ({blogs.length})
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ ...EMPTY })}><Plus size={16} /> New post</button>
      </h2>
      {blogs.length === 0 ? <p className="admin-empty">No posts yet.</p> : (
        <div className="admin-table">
          {blogs.map((b) => (
            <div key={b.id} className="admin-row">
              {b.cover_image_url && <img src={b.cover_image_url} alt="" style={{ width: 48, height: 36, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />}
              <div>
                <div className="admin-row__title">{b.title}</div>
                <div className="admin-row__sub">{b.author_name} · {b.published ? 'Published' : 'Draft'}</div>
              </div>
              <div className="admin-row__actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing({ ...b, tags: Array.isArray(b.tags) ? b.tags.join(', ') : '' })}><Pencil size={16} /></button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(b.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {msg && <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>{msg}</p>}
    </div>
  );
}
