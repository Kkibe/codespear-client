import { useEffect, useState } from 'react';
import { BookOpen, FileText, Users, CreditCard, Tag, Mail, TrendingUp } from 'lucide-react';
import { adminFetchAll, adminFetchPayments } from '../../../api';

export function AdminOverview({ counts }) {
  const [revenue, setRevenue] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    adminFetchPayments()
      .then((pays) => {
        const total = pays.filter((p) => p.status === 'successful').reduce((s, p) => s + Number(p.amount), 0);
        setRevenue(total);
        setRecent(pays.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Courses', value: counts.courses ?? 0, icon: BookOpen },
    { label: 'Blog posts', value: counts.blogs ?? 0, icon: FileText },
    { label: 'Users', value: counts.users ?? 0, icon: Users },
    { label: 'Categories', value: counts.categories ?? 0, icon: Tag },
    { label: 'Messages', value: counts.messages ?? 0, icon: Mail },
    { label: 'Revenue', value: `$${revenue.toFixed(2)}`, icon: TrendingUp },
  ];

  return (
    <div className="admin__panel card">
      <h2 className="admin__panel-title">Overview</h2>
      <div className="admin-stats">
        {cards.map((c) => (
          <div key={c.label} className="admin-stat">
            <div className="admin-stat__icon"><c.icon size={20} /></div>
            <div className="admin-stat__value">{c.value}</div>
            <div className="admin-stat__label">{c.label}</div>
          </div>
        ))}
      </div>

      <h3 className="h3" style={{ marginTop: 'var(--space-10)', marginBottom: 'var(--space-4)' }}>Recent payments</h3>
      {recent.length ? (
        <div className="admin-table">
          {recent.map((p) => (
            <div key={p.id} className="admin-row">
              <div>
                <div className="admin-row__title">{p.kind === 'subscription' ? 'Subscription' : 'Course purchase'}</div>
                <div className="admin-row__sub">{p.tx_ref}</div>
              </div>
              <span className={`badge ${p.status === 'successful' ? 'badge-success' : 'badge-neutral'}`}>{p.status}</span>
              <span className="admin-row__sub" style={{ marginLeft: 'auto' }}>{p.currency} {Number(p.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="admin-empty">No payments recorded yet.</p>
      )}
    </div>
  );
}
