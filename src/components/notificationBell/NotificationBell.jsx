import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { fetchNotifications, markAllNotificationsRead, markNotificationRead } from '../../api';
import './NotificationBell.css';

export function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!user) return;
    fetchNotifications(user.id).then(setItems).catch(() => {});
  }, [user]);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!user) return null;
  const unread = items.filter((n) => !n.read).length;

  const handleMarkAll = async () => {
    await markAllNotificationsRead(user.id).catch(() => {});
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleRead = async (id, link) => {
    await markNotificationRead(id).catch(() => {});
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setOpen(false);
  };

  return (
    <div className="notif" ref={ref}>
      <button className="topnav__icon-btn notif__btn" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
        <Bell size={20} />
        {unread > 0 && <span className="notif__badge">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {open && (
        <div className="notif__panel scale-in">
          <div className="notif__head">
            <span>Notifications</span>
            {unread > 0 && (
              <button className="notif__mark" onClick={handleMarkAll}>
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>
          <div className="notif__list">
            {items.length === 0 ? (
              <p className="notif__empty">No notifications yet.</p>
            ) : (
              items.map((n) => (
                <button
                  key={n.id}
                  className={`notif__item ${n.read ? '' : 'unread'}`}
                  onClick={() => handleRead(n.id, n.link)}
                >
                  <span className={`notif__dot notif__dot--${n.type}`} />
                  <span className="notif__content">
                    <span className="notif__title">{n.title}</span>
                    {n.body && <span className="notif__body">{n.body}</span>}
                    <span className="notif__time">{new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
