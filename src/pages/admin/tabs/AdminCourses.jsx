import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, BookOpen, FileCode, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { adminFetchAll, adminUpsert, adminDelete, adminFetchCourseSections, fetchCategories } from '../../../api';

const EMPTY_COURSE = {
  title: '', slug: '', description: '', image_url: '', category: 'Programming',
  difficulty: 'Beginner', duration_hours: 0, is_featured: false, price: 0, currency: 'USD',
  tags: '', lessons_count: 0, content_html: '',
};

const EMPTY_SECTION = { title: '', content: '', content_html: '', order_index: 0 };

export function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [sections, setSections] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([adminFetchAll('courses', '*'), fetchCategories()])
      .then(([c, cat]) => { setCourses(c || []); setCategories(cat || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (c) => {
    setEditing({ ...EMPTY_COURSE, ...c, tags: Array.isArray(c.tags) ? c.tags.join(', ') : '' });
    setExpanded(null);
  };

  const handleNew = () => setEditing({ ...EMPTY_COURSE });

  const handleSave = async (e) => {
    e.preventDefault();
    const row = {
      ...editing,
      tags: editing.tags ? editing.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      duration_hours: Number(editing.duration_hours) || 0,
      lessons_count: Number(editing.lessons_count) || 0,
      price: Number(editing.price) || 0,
      category_id: categories.find((c) => c.name === editing.category)?.id || null,
    };
    delete row.created_at;
    try {
      await adminUpsert('courses', row);
      setMsg('Course saved');
      setEditing(null);
      load();
      setTimeout(() => setMsg(''), 2500);
    } catch (err) { setMsg(err.message || 'Save failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this course and all its lessons? This cannot be undone.')) return;
    try { await adminDelete('courses', id); load(); } catch (e) { setMsg(e.message); }
  };

  const loadSections = async (courseId) => {
    const secs = await adminFetchCourseSections(courseId);
    setSections(secs || []);
  };

  const toggleExpand = (courseId) => {
    if (expanded === courseId) { setExpanded(null); return; }
    setExpanded(courseId);
    setEditingSection(null);
    loadSections(courseId);
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    if (!expanded) return;
    const row = { ...editingSection, course_id: expanded, order_index: Number(editingSection.order_index) || 0 };
    try {
      await adminUpsert('course_sections', row);
      setEditingSection(null);
      loadSections(expanded);
    } catch (err) { setMsg(err.message); }
  };

  const handleDeleteSection = async (id) => {
    if (!confirm('Delete this lesson?')) return;
    try { await adminDelete('course_sections', id); loadSections(expanded); } catch (e) { setMsg(e.message); }
  };

  if (editing) {
    return (
      <div className="admin__panel card">
        <h2 className="admin__panel-title">
          {editing.id ? 'Edit course' : 'New course'}
          <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}><X size={16} /> Cancel</button>
        </h2>
        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-form-row">
            <div className="field">
              <label className="label">Title</label>
              <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
            </div>
            <div className="field">
              <label className="label">Slug</label>
              <input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="react-fundamentals" required />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <textarea className="textarea" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div className="admin-form-row">
            <div className="field">
              <label className="label">Image URL</label>
              <input className="input" value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
            </div>
            <div className="field">
              <label className="label">Category</label>
              <select className="select" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                <option value="Programming">Programming</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Data">Data</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="field">
              <label className="label">Difficulty</label>
              <select className="select" value={editing.difficulty} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Duration (hours)</label>
              <input type="number" className="input" value={editing.duration_hours} onChange={(e) => setEditing({ ...editing, duration_hours: e.target.value })} />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="field">
              <label className="label">Price</label>
              <input type="number" step="0.01" className="input" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
            </div>
            <div className="field">
              <label className="label">Currency</label>
              <input className="input" value={editing.currency} onChange={(e) => setEditing({ ...editing, currency: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label className="label">Tags (comma separated)</label>
            <input className="input" value={editing.tags} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} placeholder="react, javascript" />
          </div>
          <div className="field">
            <label className="label"><FileCode size={14} /> Full course HTML (served as the course document)</label>
            <textarea className="html-editor" value={editing.content_html} onChange={(e) => setEditing({ ...editing, content_html: e.target.value })} placeholder="<h1>Welcome</h1><p>Your HTML course content...</p>" />
            {editing.content_html && (
              <iframe title="preview" className="iframe-preview" srcDoc={`<!DOCTYPE html><html><body style="font-family:Inter,sans-serif;padding:16px;color:#1e293b">${editing.content_html}</body></html>`} sandbox="allow-same-origin" />
            )}
          </div>
          <label className="label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} />
            Featured course
          </label>
          <div className="admin-form__actions">
            <button type="submit" className="btn btn-primary"><Save size={16} /> Save course</button>
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
        Courses ({courses.length})
        <button className="btn btn-primary btn-sm" onClick={handleNew}><Plus size={16} /> New course</button>
      </h2>
      {loading ? <p className="admin-empty">Loading...</p> : courses.length === 0 ? (
        <p className="admin-empty">No courses yet. Create your first course.</p>
      ) : (
        <div className="admin-table">
          {courses.map((c) => (
            <div key={c.id}>
              <div className="admin-row">
                <div className="user-row">
                  {c.image_url && <img src={c.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />}
                  <div>
                    <div className="admin-row__title">{c.title}</div>
                    <div className="admin-row__sub">{c.category} · {c.difficulty} · {c.currency} {Number(c.price).toFixed(2)}</div>
                  </div>
                </div>
                <div className="admin-row__actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => toggleExpand(c.id)} title="Lessons">
                    {expanded === c.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />} Lessons
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(c)}><Pencil size={16} /></button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(c.id)}><Trash2 size={16} /></button>
                </div>
              </div>
              {expanded === c.id && (
                <div className="course-lessons-admin" style={{ padding: 'var(--space-4)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                    <strong>Lessons ({sections.length})</strong>
                    <button className="btn btn-primary btn-sm" onClick={() => setEditingSection({ ...EMPTY_SECTION })}><Plus size={14} /> Add lesson</button>
                  </div>
                  {editingSection && (
                    <form className="admin-form" style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)' }} onSubmit={handleSaveSection}>
                      <div className="field">
                        <label className="label">Lesson title</label>
                        <input className="input" value={editingSection.title} onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })} required />
                      </div>
                      <div className="field">
                        <label className="label">Text content</label>
                        <textarea className="textarea" value={editingSection.content} onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })} />
                      </div>
                      <div className="field">
                        <label className="label"><FileCode size={14} /> HTML content (served in iframe)</label>
                        <textarea className="html-editor" value={editingSection.content_html} onChange={(e) => setEditingSection({ ...editingSection, content_html: e.target.value })} />
                      </div>
                      <div className="admin-form-row">
                        <div className="field">
                          <label className="label">Order</label>
                          <input type="number" className="input" value={editingSection.order_index} onChange={(e) => setEditingSection({ ...editingSection, order_index: e.target.value })} />
                        </div>
                      </div>
                      <div className="admin-form__actions">
                        <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save lesson</button>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingSection(null)}>Cancel</button>
                      </div>
                    </form>
                  )}
                  {sections.map((s, i) => (
                    <div key={s.id} className="admin-row" style={{ background: 'var(--surface)' }}>
                      <span className="badge badge-neutral">{i + 1}</span>
                      <div className="admin-row__title">{s.title}</div>
                      <div className="admin-row__actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditingSection({ ...s })}><Pencil size={14} /></button>
                        <button className="btn btn-ghost btn-sm" onClick={() => handleDeleteSection(s.id)}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                  {sections.length === 0 && <p className="muted" style={{ fontSize: '0.85rem' }}>No lessons yet.</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {msg && <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>{msg}</p>}
    </div>
  );
}
