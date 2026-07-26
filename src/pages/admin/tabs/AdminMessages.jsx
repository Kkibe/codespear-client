import { useEffect, useState } from 'react';
import { Mail, Trash2 } from 'lucide-react';
import { adminFetchContactMessages, adminDelete } from '../../../api';

export function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminFetchContactMessages().then(setMessages).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await adminDelete('contact_messages', id); load(); } catch (e) { console.error(e); }
  };

  return (
    <div className="admin__panel card">
      <h2 className="admin__panel-title">Contact messages ({messages.length})</h2>
      {loading ? <p className="admin-empty">Loading...</p> : messages.length === 0 ? (
        <p className="admin-empty">No messages yet.</p>
      ) : (
        <div className="admin-table">
          {messages.map((m) => (
            <div key={m.id} className="admin-row" style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className="admin-row__title">{m.name}</div>
                <div className="admin-row__sub"><Mail size={12} /> {m.email} · {new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <p style={{ marginTop: 'var(--space-3)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{m.message}</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(m.id)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
