import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, BarChart3, Users, Star, ArrowLeft, CheckCircle2, PlayCircle, BookOpen, Lock, Heart, Check, Crown } from 'lucide-react';
import { fetchCourseBySlug, fetchCourseSections, getEnrollment, enrollInCourse, fetchUserSubscriptions, hasActiveSubscription, markLessonComplete, fetchLessonCompletions, updateEnrollmentProgress } from '../../api';
import { useAuth } from '../../AuthContext';
import { PaymentButton } from '../../components/payment/PaymentButton';
import { WishlistButton } from '../../components/wishlistButton/WishlistButton';
import './Course.css';

export default function Course() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState(null);
  const [subs, setSubs] = useState([]);
  const [completed, setCompleted] = useState(new Set());
  const [activeSection, setActiveSection] = useState(0);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);
  const [justPaid, setJustPaid] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCourse(null);
    setSections([]);
    setEnrollment(null);
    setCompleted(new Set());
    setError('');
    setJustPaid(false);
    fetchCourseBySlug(slug)
      .then(async (c) => {
        if (!c) { setError('Course not found'); setLoading(false); return; }
        setCourse(c);
        const [secs, userSubs] = await Promise.all([
          fetchCourseSections(c.id),
          user ? fetchUserSubscriptions(user.id).catch(() => []) : Promise.resolve([]),
        ]);
        setSections(secs);
        setSubs(userSubs);
        if (user) {
          const [en, comp] = await Promise.all([
            getEnrollment(user.id, c.id).catch(() => null),
            fetchLessonCompletions(user.id, c.id).catch(() => []),
          ]);
          setEnrollment(en);
          setCompleted(new Set(comp.map((x) => x.section_id)));
        }
        setLoading(false);
      })
      .catch(() => { setError('Failed to load course'); setLoading(false); });
  }, [slug, user]);

  const isPaid = course ? Number(course.price) > 0 : false;
  const hasSub = hasActiveSubscription(subs);
  const hasAccess = !isPaid || enrollment || hasSub || justPaid;

  const handleEnroll = async () => {
    if (!user) { window.location.href = '/login'; return; }
    if (!course) return;
    setEnrolling(true);
    try {
      const en = await enrollInCourse(user.id, course.id);
      setEnrollment(en);
    } catch (e) {
      setError(e.message || 'Could not enroll');
    } finally {
      setEnrolling(false);
    }
  };

  const handleComplete = async (sectionId) => {
    if (!user) return;
    try {
      await markLessonComplete(user.id, sectionId);
      setCompleted((prev) => new Set(prev).add(sectionId));
      if (enrollment && sections.length) {
        const pct = Math.round(((completed.size + 1) / sections.length) * 100);
        await updateEnrollmentProgress(enrollment.id, pct, pct >= 100);
      }
    } catch (e) { console.error(e); }
  };

  const handlePaid = async () => {
    setJustPaid(true);
    setPaying(false);
    if (user && course) {
      const en = await getEnrollment(user.id, course.id).catch(() => null);
      setEnrollment(en);
    }
  };

  const iframeSrcDoc = useMemo(() => {
    const html = sections[activeSection]?.content_html || course?.content_html || '';
    if (!html) return null;
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>
      :root { color-scheme: light dark; }
      body { font-family: 'Inter', system-ui, sans-serif; line-height: 1.7; padding: 24px; color: #1e293b; background: #fff; max-width: 760px; margin: 0 auto; }
      h1,h2,h3 { font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; line-height: 1.25; margin: 1.4em 0 .6em; }
      p { margin: .8em 0; color: #334155; }
      a { color: #0f766e; }
      code, pre { font-family: 'SF Mono', 'Fira Code', Consolas, monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: .9em; }
      pre { padding: 16px; overflow-x: auto; }
      ul, ol { padding-left: 1.4em; margin: .8em 0; }
      img { max-width: 100%; border-radius: 8px; }
      blockquote { border-left: 3px solid #0f766e; padding-left: 16px; color: #475569; margin: 1em 0; }
      @media (prefers-color-scheme: dark) {
        body { background: #0f172a; color: #e2e8f0; }
        h1,h2,h3 { color: #f1f5f9; }
        p { color: #cbd5e1; }
        code, pre { background: #1e293b; }
        blockquote { color: #94a3b8; }
      }
    </style></head><body>${html}</body></html>`;
  }, [sections, activeSection, course]);

  if (loading) return <div className="page"><div className="loading-screen"><div className="spinner spinner-lg" /> Loading course...</div></div>;
  if (error || !course) return (
    <div className="page">
      <div className="container empty-state">
        <BookOpen size={40} />
        <h3>{error || 'Course not found'}</h3>
        <Link to="/courses" className="btn btn-secondary"><ArrowLeft size={16} /> Back to courses</Link>
      </div>
    </div>
  );

  const level = course.difficulty || 'Beginner';
  const active = sections[activeSection];
  const activeComplete = active && completed.has(active.id);

  return (
    <div className="page course-page">
      <div className="course-hero">
        <div className="container course-hero__inner">
          <Link to="/courses" className="course-hero__back"><ArrowLeft size={16} /> All courses</Link>
          <div className="course-hero__grid">
            <div className="course-hero__content">
              <div className="cluster">
                <span className="badge">{course.category}</span>
                <span className="badge badge-neutral">{level}</span>
                {course.is_featured && <span className="badge badge-warning">Featured</span>}
                {isPaid ? <span className="badge">{course.currency} {Number(course.price).toFixed(2)}</span> : <span className="badge badge-success">Free</span>}
              </div>
              <div className="course-hero__title-row">
                <h1 className="h2 course-hero__title">{course.title}</h1>
                {user && <WishlistButton courseId={course.id} />}
              </div>
              <p className="lead">{course.description}</p>
              <div className="course-hero__stats">
                {course.rating > 0 && <span><Star size={16} fill="currentColor" /> {Number(course.rating).toFixed(1)}</span>}
                {course.lessons_count > 0 && <span><BarChart3 size={16} /> {course.lessons_count} lessons</span>}
                {course.duration_hours > 0 && <span><Clock size={16} /> {course.duration_hours}h</span>}
                {course.enrolled_count > 0 && <span><Users size={16} /> {course.enrolled_count.toLocaleString()} enrolled</span>}
              </div>
              <div className="course-hero__actions">
                {hasAccess ? (
                  enrollment ? (
                    <span className="badge badge-success course-hero__enrolled"><CheckCircle2 size={18} /> You're enrolled</span>
                  ) : (
                    <button className="btn btn-primary btn-lg" onClick={handleEnroll} disabled={enrolling}>
                      {enrolling ? <><div className="spinner" /> Enrolling...</> : <><PlayCircle size={18} /> Start learning</>}
                    </button>
                  )
                ) : isPaid ? (
                  paying ? (
                    <PaymentButton
                      amount={course.price}
                      currency={course.currency}
                      kind="course"
                      courseId={course.id}
                      label={`Buy for ${course.currency} ${Number(course.price).toFixed(2)}`}
                      className="btn-lg"
                      onSuccess={handlePaid}
                    />
                  ) : (
                    <button className="btn btn-primary btn-lg" onClick={() => user ? setPaying(true) : (window.location.href = '/login')}>
                      <Lock size={18} /> Unlock for {course.currency} {Number(course.price).toFixed(2)}
                    </button>
                  )
                ) : (
                  <button className="btn btn-primary btn-lg" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? <><div className="spinner" /> Enrolling...</> : <><PlayCircle size={18} /> Enroll free</>}
                  </button>
                )}
                {!hasAccess && hasSub === false && (
                  <Link to="/dashboard" className="btn btn-secondary"><Crown size={16} /> Or subscribe</Link>
                )}
              </div>
              {!user && <p className="muted" style={{ marginTop: 'var(--space-3)' }}>Sign in to enroll, save, and track progress.</p>}
              {error && <p className="alert alert-error" style={{ marginTop: 'var(--space-4)' }}>{error}</p>}
            </div>
            <div className="course-hero__media">
              <img src={course.image_url} alt={course.title} />
            </div>
          </div>
        </div>
      </div>

      <div className="container course-body">
        <aside className="course-sidebar card">
          <h3 className="course-sidebar__title">Course content</h3>
          {sections.length > 0 ? (
            <ol className="course-sidebar__list">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    className={`course-sidebar__item ${activeSection === i ? 'active' : ''}`}
                    onClick={() => setActiveSection(i)}
                  >
                    <span className="course-sidebar__num">{completed.has(s.id) ? <Check size={12} /> : i + 1}</span>
                    <span className="course-sidebar__label">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted" style={{ fontSize: '0.9rem' }}>Lessons coming soon.</p>
          )}
          {user && sections.length > 0 && (
            <div className="course-sidebar__progress">
              <div className="progress"><div className="progress__bar" style={{ width: `${Math.round((completed.size / sections.length) * 100)}%` }} /></div>
              <span>{completed.size} / {sections.length} done</span>
            </div>
          )}
        </aside>

        <div className="course-content">
          {active ? (
            <article className="card course-content__card fade-in" key={activeSection}>
              <div className="course-content__head">
                <span className="eyebrow">Lesson {activeSection + 1} of {sections.length}</span>
                {hasAccess && user && (
                  <button
                    className={`btn btn-sm ${activeComplete ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleComplete(active.id)}
                    disabled={activeComplete}
                  >
                    {activeComplete ? <><CheckCircle2 size={16} /> Completed</> : <>Mark complete</>}
                  </button>
                )}
              </div>
              <h2 className="h3" style={{ marginTop: 'var(--space-3)' }}>{active.title}</h2>

              {hasAccess ? (
                <>
                  {iframeSrcDoc ? (
                    <div className="course-content__iframe-wrap">
                      <iframe
                        title={`Lesson: ${active.title}`}
                        srcDoc={iframeSrcDoc}
                        sandbox="allow-same-origin"
                        className="course-content__iframe"
                      />
                    </div>
                  ) : (
                    <div className="course-content__body">
                      <p>{active.content}</p>
                      <p>This lesson is part of the <strong>{course.title}</strong> track. Each lesson builds on the last, so work through them in order for the best results.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="course-content__locked">
                  <Lock size={36} />
                  <h3>This is a premium lesson</h3>
                  <p>Purchase this course or subscribe to unlock all lessons.</p>
                  {justPaid ? (
                    <span className="badge badge-success"><CheckCircle2 /> Access granted</span>
                  ) : paying ? (
                    <PaymentButton
                      amount={course.price}
                      currency={course.currency}
                      kind="course"
                      courseId={course.id}
                      label={`Buy for ${course.currency} ${Number(course.price).toFixed(2)}`}
                      onSuccess={handlePaid}
                    />
                  ) : (
                    <button className="btn btn-primary" onClick={() => user ? setPaying(true) : (window.location.href = '/login')}>
                      <Lock size={16} /> Unlock course
                    </button>
                  )}
                </div>
              )}

              {hasAccess && (
                <div className="course-content__nav">
                  <button className="btn btn-secondary" disabled={activeSection === 0} onClick={() => setActiveSection((s) => s - 1)}>
                    <ArrowLeft size={16} /> Previous
                  </button>
                  <button className="btn btn-primary" disabled={activeSection === sections.length - 1} onClick={() => setActiveSection((s) => s + 1)}>
                    Next lesson
                  </button>
                </div>
              )}
            </article>
          ) : (
            <div className="card course-content__card">
              <h2 className="h3">Coming soon</h2>
              <p>Full lesson content for this course is being crafted. Enroll now to be notified when it drops.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
