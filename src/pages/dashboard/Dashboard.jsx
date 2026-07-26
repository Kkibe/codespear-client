import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Award, TrendingUp, Clock, CheckCircle2, PlayCircle, Loader2, Save, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { fetchUserEnrollments, updateEnrollmentProgress, fetchCourses } from '../../api';
import './Dashboard.css';

export default function Dashboard() {
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
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
    ])
      .then(([ens, courses]) => {
        setEnrollments(ens || []);
        setAllCourses((courses || []).slice(0, 3));
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

  if (authLoading) return <div className="page"><div className="loading-screen"><div className="spinner spinner-lg" /></div></div>;
  if (!user) return null;

  const displayName = profile?.username || user.email?.split('@')[0] || 'Learner';

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
            <button className={`dashboard__tab ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>Profile</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-4 stagger dashboard__stats">
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}><BookOpen size={22} /></div>
            <div>
              <span className="stat-card__value">{enrollments.length}</span>
              <span className="stat-card__label">Enrolled</span>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--success-500)' }}><CheckCircle2 size={22} /></div>
            <div>
              <span className="stat-card__value">{completedCount}</span>
              <span className="stat-card__label">Completed</span>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--accent-600)' }}><TrendingUp size={22} /></div>
            <div>
              <span className="stat-card__value">{avgProgress}%</span>
              <span className="stat-card__label">Avg progress</span>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-card__icon" style={{ background: 'rgba(59,130,246,0.12)', color: 'var(--info-500)' }}><PlayCircle size={22} /></div>
            <div>
              <span className="stat-card__value">{inProgress}</span>
              <span className="stat-card__label">In progress</span>
            </div>
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
                <h2 className="h3 dashboard__panel-title">Recommended for you</h2>
                <div className="enroll-list">
                  {loading ? <div className="loading-screen"><div className="spinner" /></div> : allCourses.map((c) => (
                    <Link key={c.id} to={`/courses/${c.slug}`} className="enroll-row">
                      {c.image_url && <img src={c.image_url} alt={c.title} className="enroll-row__img" />}
                      <div className="enroll-row__body">
                        <span className="enroll-row__title">{c.title}</span>
                        <span className="enroll-row__meta">{c.category} · {c.difficulty}</span>
                      </div>
                      <PlayCircle size={20} className="enroll-row__play" />
                    </Link>
                  ))}
                </div>
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
