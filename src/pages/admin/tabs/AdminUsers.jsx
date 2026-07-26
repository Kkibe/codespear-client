import { useEffect, useState } from 'react';
import { ShieldCheck, UserCog } from 'lucide-react';
import { adminFetchUsers, adminToggleUserAdmin } from '../../../api';

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    adminFetchUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const toggleAdmin = async (userId, current) => {
    try {
      await adminToggleUserAdmin(userId, !current);
      load();
      setMsg(`User ${current ? 'demoted' : 'promoted to admin'}`);
      setTimeout(() => setMsg(''), 2500);
    } catch (e) { setMsg(e.message); }
  };

  return (
    <div className="admin__panel card">
      <h2 className="admin__panel-title">Users ({users.length})</h2>
      {loading ? <p className="admin-empty">Loading...</p> : users.length === 0 ? (
        <p className="admin-empty">No users yet.</p>
      ) : (
        <div className="admin-table">
          {users.map((u) => (
            <div key={u.id} className="admin-row">
              <div className="user-row">
                <span className="user-row__avatar">{(u.username || '?').charAt(0).toUpperCase()}</span>
                <div>
                  <div className="admin-row__title">{u.username || 'Unnamed'}</div>
                  <div className="admin-row__sub">Joined {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>
              {u.is_admin && <span className="badge"><ShieldCheck size={14} /> Admin</span>}
              <div className="admin-row__actions">
                <button className={`btn btn-sm ${u.is_admin ? 'btn-ghost' : 'btn-secondary'}`} onClick={() => toggleAdmin(u.id, u.is_admin)}>
                  <UserCog size={14} /> {u.is_admin ? 'Remove admin' : 'Make admin'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {msg && <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>{msg}</p>}
    </div>
  );
}
