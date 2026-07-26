import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, CircleCheck as CheckCircle2, CirclePlay as PlayCircle, Loader as Loader2, Save, User, Sparkles, Heart, CreditCard, Crown, Trash2, Check } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import {
  fetchUserEnrollments, updateEnrollmentProgress, fetchCourses,
  fetchWishlist, removeFromWishlist, fetchUserSubscriptions, fetchSubscriptionPlans,
  fetchUserPayments, hasActiveSubscription,
} from '../../api';
import { PaymentButton } from '../../components/payment/PaymentButton';
import './Dashboard.css';

export default function Dashboard() {
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [subs, setSubs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');
  const [profileForm, setProfileForm] = useState({ username: '', avatar_url: '', bio: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      fetchUserEnrollments(user.id),
      fetchCourses(),
      fetchWishlist(user.id),
      fetchUserSubscriptions(user.id),
      fetchSubscriptionPlans(),
      fetchUserPayments(user.id),
    ])
      .then(([ens, courses, wish, s, p, pays]) => {
        setEnrollments(ens || []);
        setAllCourses((courses || []).slice(0, 3));
        setWishlist(wish || []);
        setSubs(s || []);
        setPlans(p || []);
        setPayments(pays || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (profile) setProfileForm({ username: profile.username || '', avatar_url: profile.avatar_url || '', bio: profile.bio || '' });
  }, [profile]);

  const completedCount = enrollments.filter((e) => e.completed).length;
  const inProgress = enrollments.filter((e) => !e.completed).length;
  const avgProgress = enrollments.length ? Math.round(enrollments.reduce((s, e) => s + Number(e.progress || 0), 0) / enrollments.length) : 0;
  const hasSub = hasActiveSubscription(subs);
  const activeSub = subs.find((s) => s.status === 'active' && (!s.ends_at || new Date(s.ends_at) > new Date()));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg('');
    try {
      await updateProfile(profileForm);
      setProfileMsg('Profile updated successfully');
      setTimeout(() => setProfileMsg(''), 3000);
    } catch (err) {
      setProfileMsg(err.message || 'Could not save profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleProgress = async (enrollmentId, val) => {
    const completed = val >= 100;
    try {
      await updateEnrollmentProgress(enrollmentId, val, completed);
      setEnrollments((prev) => prev.map((e) => (e.id === enrollmentId ? { ...e, progress: val, completed } : e)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveWishlist = async (courseId) => {
    try {
      await removeFromWishlist(user.id, courseId);
      setWishlist((prev) => prev.filter((w) => w.course_id !== courseId));
    } catch (err) { console.error(err); }
  };

  if (authLoading) return <div className="page"><div className="loading-screen"><div className="spinner spinner-lg" /></div></div>;
  if (!user) return null;

  const displayName = profile?.username || user.email?.split('@')[0] || 'Learner';
  const TABS = ['overview', 'courses', 'wishlist', 'billing', 'profile'];

  return (
    <div className="page dashboard">
      <div className="container">
        <div className="dashboard__head">
          <div>
            <span className="eyebrow"><Sparkles size={14} /> Dashboard</span>
            <h1 className="h2">Welcome back, {displayName}</h1>
            <p className="muted">Track your progress and keep building.</p>
          </div>
          <div className="dashboard__tabs">
            <button className={`dashboard__tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
            <button className={`dashboard__tab ${tab === 'courses' ? 'active' : ''}`} onClick={() => setTab('courses')}>My courses</button>
            <button className={`dashboard__tab ${tab === 'wishlist' ? 'active' : ''}`} onClick={() => setTab('wishlist')}>Wishlist</button>
            <button className={`dashboard__tab ${tab === 'billing' ? 'active' : ''}`} onClick={() => setTab('billing')}>Billing</button>
            <button className={`dashboard__tab ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>Profile</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-4 stagger dashboard__stats">
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}><BookOpen size={22} /></div>
            <div><span className="stat-card__value">{enrollments.length}</span><span className="stat-card__label">Enrolled</span></div>
          </div>
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--success-500)' }}><CheckCircle2 size={22} /></div>
            <div><span className="stat-card__value">{completedCount}</span><span className="stat-card__label">Completed</span></div>
          </div>
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--accent-600)' }}><TrendingUp size={22} /></div>
            <div><span className="stat-card__value">{avgProgress}%</span><span className="stat-card__label">Avg progress</span></div>
          </div>
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'rgba(239,68,68,0.12)', color: 'var(--error-500)' }}><Heart size={22} /></div>
            <div><span className="stat-card__value">{wishlist.length}</span><span className="stat-card__label">Wishlist</span></div>
          </div>
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="dashboard__overview fade-in">
            <div className="grid dashboard__overview-grid">
              <section className="card dashboard__panel">
                <h2 className="h3 dashboard__panel-title">Continue learning</h2>
                {loading ? <div className="loading-screen"><div className="spinner" /></div> : enrollments.length ? (
                  <div className="enroll-list">
                    {enrollments.slice(0, 3).map((en) => (
                      <Link key={en.id} to={`/courses/${en.courses?.slug}`} className="enroll-row">
                        {en.courses?.image_url && <img src={en.courses.image_url} alt={en.courses?.title} className="enroll-row__img" />}
                        <div className="enroll-row__body">
                          <span className="enroll-row__title">{en.courses?.title}</span>
                          <div className="enroll-row__progress">
                            <div className="progress"><div className="progress__bar" style={{ width: `${en.progress || 0}%` }} /></div>
                            <span>{Math.round(en.progress || 0)}%</span>
                          </div>
                        </div>
                        <PlayCircle size={20} className="enroll-row__play" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="empty-inline">
                    <p className="muted">You haven't enrolled in any courses yet.</p>
                    <Link to="/courses" className="btn btn-primary btn-sm">Browse courses</Link>
                  </div>
                )}
              </section>

              <section className="card dashboard__panel">
                <h2 className="h3 dashboard__panel-title">Subscription</h2>
                {hasSub ? (
                  <div className="sub-status">
                    <span className="badge badge-success"><Crown size={14} /> {activeSub?.plans?.name || 'Pro'} active</span>
                    {activeSub?.ends_at && <p className="muted" style={{ marginTop: 'var(--space-3)' }}>Renews/ends {new Date(activeSub.ends_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>}
                    <p className="muted">You have premium access to all courses.</p>
                  </div>
                ) : (
                  <div className="sub-status">
                    <span className="badge badge-neutral"><Crown size={14} /> Free plan</span>
                    <p className="muted" style={{ marginTop: 'var(--space-3)' }}>Upgrade to unlock all courses, certificates, and more.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => setTab('billing')}>View plans</button>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* My courses */}
        {tab === 'courses' && (
          <section className="card dashboard__panel fade-in" style={{ marginTop: 'var(--space-8)' }}>
            <h2 className="h3 dashboard__panel-title">My enrolled courses</h2>
            {loading ? <div className="loading-screen"><div className="spinner" /></div> : enrollments.length ? (
              <div className="enroll-table">
                {enrollments.map((en) => (
                  <div key={en.id} className="enroll-card">
                    <div className="enroll-card__media">
                      {en.courses?.image_url && <img src={en.courses.image_url} alt={en.courses?.title} />}
                    </div>
                    <div className="enroll-card__body">
                      <Link to={`/courses/${en.courses?.slug}`} className="enroll-card__title">{en.courses?.title}</Link>
                      <span className="enroll-card__cat">{en.courses?.category} · {en.courses?.difficulty}</span>
                      <div className="enroll-card__progress">
                        <div className="progress"><div className="progress__bar" style={{ width: `${en.progress || 0}%` }} /></div>
                        <span>{Math.round(en.progress || 0)}%</span>
                      </div>
                      <div className="enroll-card__controls">
                        <input type="range" min="0" max="100" value={Math.round(en.progress || 0)} onChange={(e) => handleProgress(en.id, Number(e.target.value))} aria-label="Update progress" />
                        {en.completed && <span className="badge badge-success"><CheckCircle2 size={14} /> Completed</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-inline">
                <BookOpen size={32} />
                <p className="muted">No enrollments yet. Start your first course today.</p>
                <Link to="/courses" className="btn btn-primary">Explore courses</Link>
              </div>
            )}
          </section>
        )}

        {/* Wishlist */}
        {tab === 'wishlist' && (
          <section className="card dashboard__panel fade-in" style={{ marginTop: 'var(--space-8)' }}>
            <h2 className="h3 dashboard__panel-title">Your wishlist</h2>
            {loading ? <div className="loading-screen"><div className="spinner" /></div> : wishlist.length ? (
              <div className="enroll-table">
                {wishlist.map((w) => (
                  <div key={w.id} className="enroll-card">
                    <div className="enroll-card__media">
                      {w.courses?.image_url && <img src={w.courses.image_url} alt={w.courses?.title} />}
                    </div>
                    <div className="enroll-card__body">
                      <Link to={`/courses/${w.courses?.slug}`} className="enroll-card__title">{w.courses?.title}</Link>
                      <span className="enroll-card__cat">{w.courses?.category} · {w.courses?.difficulty}</span>
                      <div className="enroll-card__controls">
                        <Link to={`/courses/${w.courses?.slug}`} className="btn btn-primary btn-sm">View course</Link>
                        <button className="btn btn-ghost btn-sm" onClick={() => handleRemoveWishlist(w.course_id)}><Trash2 size={14} /> Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-inline">
                <Heart size={32} />
                <p className="muted">Your wishlist is empty. Save courses you want to take later.</p>
                <Link to="/courses" className="btn btn-primary">Browse courses</Link>
              </div>
            )}
          </section>
        )}

        {/* Billing */}
        {tab === 'billing' && (
          <div className="fade-in" style={{ marginTop: 'var(--space-8)' }}>
            <section className="card dashboard__panel" style={{ marginBottom: 'var(--space-8)' }}>
              <h2 className="h3 dashboard__panel-title">Subscription plans</h2>
              <div className="grid grid-3 plans-grid">
                {plans.map((p) => {
                  const isCurrent = activeSub?.plan_id === p.id;
                  return (
                    <div key={p.id} className={`plan-card ${isCurrent ? 'plan-card--current' : ''}`}>
                      <h3 className="plan-card__name">{p.name}</h3>
                      <p className="plan-card__price">{p.currency} {Number(p.price).toFixed(2)}<span>/{p.interval}</span></p>
                      <ul className="plan-card__benefits">
                        {p.benefits.map((b) => <li key={b}><Check size={15} /> {b}</li>)}
                      </ul>
                      {isCurrent ? (
                        <span className="badge badge-success" style={{ justifyContent: 'center', padding: 'var(--space-3)' }}><CheckCircle2 size={16} /> Current plan</span>
                      ) : Number(p.price) === 0 ? (
                        <span className="badge badge-neutral" style={{ justifyContent: 'center', padding: 'var(--space-3)' }}>Free</span>
                      ) : (
                        <PaymentButton amount={p.price} currency={p.currency} kind="subscription" planId={p.id} label={`Subscribe`} className="btn-block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card dashboard__panel">
              <h2 className="h3 dashboard__panel-title">Payment history</h2>
              {payments.length ? (
                <div className="pay-history">
                  {payments.map((pay) => (
                    <div key={pay.id} className="pay-history__row">
                      <div className="pay-history__info">
                        <span className="pay-history__kind">{pay.kind === 'subscription' ? 'Subscription' : 'Course purchase'}</span>
                        <span className="pay-history__ref">{pay.tx_ref}</span>
                      </div>
                      <span className={`badge ${pay.status === 'successful' ? 'badge-success' : 'badge-neutral'}`}>{pay.status}</span>
                      <span className="pay-history__amount">{pay.currency} {Number(pay.amount).toFixed(2)}</span>
                      <span className="pay-history__date">{new Date(pay.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-inline">
                  <CreditCard size={32} />
                  <p className="muted">No payments yet.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Profile */}
        {tab === 'profile' && (
          <section className="card dashboard__panel fade-in" style={{ marginTop: 'var(--space-8)', maxWidth: 560 }}>
            <h2 className="h3 dashboard__panel-title">Your profile</h2>
            <form onSubmit={handleSaveProfile}>
              <div className="field">
                <label className="label" htmlFor="username">Display name</label>
                <div className="input-wrap">
                  <User size={18} />
                  <input id="username" className="input" value={profileForm.username} onChange={(e) => setProfileForm((f) => ({ ...f, username: e.target.value }))} placeholder="Your name" />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="avatar">Avatar URL</label>
                <input id="avatar" className="input" value={profileForm.avatar_url} onChange={(e) => setProfileForm((f) => ({ ...f, avatar_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="field">
                <label className="label" htmlFor="bio">Bio</label>
                <textarea id="bio" className="textarea" value={profileForm.bio} onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))} placeholder="Tell us about yourself" />
              </div>
              <button type="submit" className="btn btn-primary" disabled={savingProfile}>
                {savingProfile ? <><Loader2 size={18} className="spin" /> Saving...</> : <><Save size={18} /> Save changes</>}
              </button>
              {profileMsg && <p className="alert alert-success" style={{ marginTop: 'var(--space-4)' }}>{profileMsg}</p>}
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
