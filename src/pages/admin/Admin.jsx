import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, BookOpen, FileText, Tag, Users, Mail, CreditCard, BarChart3, Loader2, Crown } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { supabase } from '../../supabaseClient';
import { adminFetchAll } from '../../api';
import { AdminOverview } from './tabs/AdminOverview';
import { AdminCourses } from './tabs/AdminCourses';
import { AdminBlog } from './tabs/AdminBlog';
import { AdminCategories } from './tabs/AdminCategories';
import { AdminUsers } from './tabs/AdminUsers';
import { AdminMessages } from './tabs/AdminMessages';
import { AdminPayments } from './tabs/AdminPayments';
import './Admin.css';

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart3 },
  { key: 'courses', label: 'Courses', icon: BookOpen },
  { key: 'blog', label: 'Blog', icon: FileText },
  { key: 'categories', label: 'Categories', icon: Tag },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'messages', label: 'Messages', icon: Mail },
  { key: 'payments', label: 'Payments', icon: CreditCard },
];

export default function Admin() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [adminCount, setAdminCount] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimMsg, setClaimMsg] = useState('');

  const checkAccess = useCallback(() => {
    if (authLoading) return;
    if (!user) { navigate('/login'); return; }
  }, [authLoading, user, navigate]);

  useEffect(() => { checkAccess(); }, [checkAccess]);

  // Check whether any admin exists (for first-run bootstrap)
  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_admin', true)
      .then(({ count }) => setAdminCount(count ?? 0))
      .catch(() => setAdminCount(0));
  }, [user, profile]);

  const handleClaimAdmin = async () => {
    setClaiming(true);
    setClaimMsg('');
    try {
      const { error } = await supabase.from('profiles').update({ is_admin: true }).eq('id', user.id);
      if (error) throw error;
      setClaimMsg('Admin access granted. Reloading...');
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setClaimMsg(err.message || 'Could not claim admin access');
    } finally {
      setClaiming(false);
    }
  };

  const refreshCounts = useCallback(async () => {
    if (!profile?.is_admin) return;
    setLoadingCounts(true);
    try {
      const [courses, blogs, categories, users, messages, payments] = await Promise.all([
        adminFetchAll('courses', 'id'),
        adminFetchAll('blogs', 'id'),
        adminFetchAll('categories', 'id'),
        adminFetchAll('profiles', 'id'),
        adminFetchAll('contact_messages', 'id'),
        adminFetchAll('payments', 'id'),
      ]);
      setCounts({
        courses: courses.length, blogs: blogs.length, categories: categories.length,
        users: users.length, messages: messages.length, payments: payments.length,
      });
    } catch (e) { console.error(e); }
    setLoadingCounts(false);
  }, [profile]);

  useEffect(() => { refreshCounts(); }, [refreshCounts]);

  if (authLoading || !profile) return <div className="page"><div className="loading-screen"><Loader2 size={28} className="spin" /></div></div>;

  // First-run bootstrap: if no admins exist, let the signed-in user claim admin
  if (!profile.is_admin && adminCount === 0) {
    return (
      <div className="page admin">
        <div className="container container-narrow">
          <div className="card admin__panel" style={{ textAlign: 'center' }}>
            <div className="admin-stat__icon" style={{ margin: '0 auto var(--space-5)' }}><Crown size={24} /></div>
            <h1 className="h2">Set up admin access</h1>
            <p className="lead text-balance" style={{ maxWidth: 460, margin: 'var(--space-4) auto var(--space-8)' }}>
              No admin has been set up yet. As the first signed-in user, you can claim admin access to manage courses, blog posts, and users. This option is only available until the first admin is created.
            </p>
            <button className="btn btn-primary btn-lg" onClick={handleClaimAdmin} disabled={claiming}>
              {claiming ? <><Loader2 size={18} className="spin" /> Claiming...</> : <><ShieldCheck size={18} /> Claim admin access</>}
            </button>
            {claimMsg && <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>{claimMsg}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (!profile.is_admin) {
    return (
      <div className="page">
        <div className="container empty-state">
          <ShieldCheck size={40} />
          <h3>Admins only</h3>
          <p>You don't have access to the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page admin">
      <div className="container">
        <div className="admin__head">
          <div>
            <span className="eyebrow"><ShieldCheck size={14} /> Admin panel</span>
            <h1 className="h2">Manage Codespear</h1>
            <p className="muted">Create and manage courses, blog posts, categories, users, and more.</p>
          </div>
        </div>

        <div className="admin__layout">
          <aside className="admin__sidebar card">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`admin__nav-item ${tab === t.key ? 'active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                <t.icon size={18} />
                <span>{t.label}</span>
                {loadingCounts ? null : counts[t.key] !== undefined && (
                  <span className="admin__nav-count">{counts[t.key]}</span>
                )}
              </button>
            ))}
          </aside>

          <div className="admin__content">
            {tab === 'overview' && <AdminOverview counts={counts} />}
            {tab === 'courses' && <AdminCourses />}
            {tab === 'blog' && <AdminBlog />}
            {tab === 'categories' && <AdminCategories onChange={refreshCounts} />}
            {tab === 'users' && <AdminUsers />}
            {tab === 'messages' && <AdminMessages />}
            {tab === 'payments' && <AdminPayments />}
          </div>
        </div>
      </div>
    </div>
  );
}
