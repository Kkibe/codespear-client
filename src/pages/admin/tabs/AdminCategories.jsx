import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { adminFetchAll, adminUpsert, adminDelete } from '../../../api';

export function AdminCategories({ onChange }) {
  const [cats, setCats] = useState([]);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

  const load = () => adminFetchAll('categories', '*').then(setCats).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await adminUpsert('categories', editing);
      setMsg('Category saved'); setEditing(null); load(); onChange?.();
      setTimeout(() => setMsg(''), 2500);
    } catch (err) { setMsg(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try { await adminDelete('categories', id); load(); onChange?.(); } catch (e) { setMsg(e.message); }
  };

  if (editing) {
    return (
      <div className="admin__panel card">
        <h2 className="admin__panel-title">
          {editing.id ? 'Edit category' : 'New category'}
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}><X size={16} /> Cancel</button>
        </h2>
        <form className="admin-form" onSubmit={handleSave}>
          <div className="field"><label className="label">Name</label><input className="input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></div>
          <div className="field"><label className="label">Slug</label><input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required /></div>
          <div className="field"><label className="label">Description</label><textarea className="textarea" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="admin-form__actions">
            <button type="submit" className="btn btn-primary"><Save size={16} /> Save</button>
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
        Categories ({cats.length})
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ name: '', slug: '', description: '' })}><Plus size={16} /> New category</button>
      </h2>
      {cats.length === 0 ? <p className="admin-empty">No categories yet.</p> : (
        <div className="admin-table">
          {cats.map((c) => (
            <div key={c.id} className="admin-row">
              <div><div className="admin-row__title">{c.name}</div><div className="admin-row__sub">{c.slug}</div></div>
              <div className="admin-row__actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(c)}><Pencil size={16} /></button>
                <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(c.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {msg && <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>{msg}</p>}
    </div>
  );
}
