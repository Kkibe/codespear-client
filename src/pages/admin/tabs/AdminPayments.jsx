import { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';
import { adminFetchPayments } from '../../../api';

export function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetchPayments().then(setPayments).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const totalRevenue = payments.filter((p) => p.status === 'successful').reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div className="admin__panel card">
      <h2 className="admin__panel-title">
        Payments ({payments.length})
        <span className="badge">Total: ${totalRevenue.toFixed(2)}</span>
      </h2>
      {loading ? <p className="admin-empty">Loading...</p> : payments.length === 0 ? (
        <p className="admin-empty">No payments recorded yet.</p>
      ) : (
        <div className="admin-table">
          {payments.map((p) => (
            <div key={p.id} className="admin-row">
              <div style={{ flex: 1 }}>
                <div className="admin-row__title">{p.kind === 'subscription' ? 'Subscription' : 'Course purchase'}</div>
                <div className="admin-row__sub">{p.tx_ref}</div>
              </div>
              <span className={`badge ${p.status === 'successful' ? 'badge-success' : 'badge-neutral'}`}>{p.status}</span>
              <span className="admin-row__title">{p.currency} {Number(p.amount).toFixed(2)}</span>
              <span className="admin-row__sub">{new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
