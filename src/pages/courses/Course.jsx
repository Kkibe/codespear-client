import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, ChartBar as BarChart3, Users, Star, ArrowLeft, CircleCheck as CheckCircle2, CirclePlay as PlayCircle, BookOpen, Lock } from 'lucide-react';
import { fetchCourseBySlug, fetchCourseSections, getEnrollment, enrollInCourse } from '../../api';
import { useAuth } from '../../AuthContext';
import './Course.css';

export default function Course() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setCourse(null);
    setSections([]);
    setEnrollment(null);
    setError('');
    Promise.all([
      fetchCourseBySlug(slug),
    ])
      .then(async ([c]) => {
        if (!c) { setError('Course not found'); setLoading(false); return; }
        setCourse(c);
        const secs = await fetchCourseSections(c.id);
        setSections(secs);
        if (user) {
          const en = await getEnrollment(user.id, c.id).catch(() => null);
          setEnrollment(en);
        }
        setLoading(false);
      })
      .catch(() => { setError('Failed to load course'); setLoading(false); });
  }, [slug, user]);

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

  return (
    <div className="page course-page">
      {/* Hero */}
      <div className="course-hero">
        <div className="container course-hero__inner">
          <Link to="/courses" className="course-hero__back"><ArrowLeft size={16} /> All courses</Link>
          <div className="course-hero__grid">
            <div className="course-hero__content">
              <div className="cluster">
                <span className="badge">{course.category}</span>
                <span className={`badge badge-neutral`}>{level}</span>
                {course.is_featured && <span className="badge badge-warning">Featured</span>}
              </div>
              <h1 className="h2 course-hero__title">{course.title}</h1>
              <p className="lead">{course.description}</p>
              <div className="course-hero__stats">
                {course.rating > 0 && <span><Star size={16} fill="currentColor" /> {Number(course.rating).toFixed(1)}</span>}
                {course.lessons_count > 0 && <span><BarChart3 size={16} /> {course.lessons_count} lessons</span>}
                {course.duration_hours > 0 && <span><Clock size={16} /> {course.duration_hours}h</span>}
                {course.enrolled_count > 0 && <span><Users size={16} /> {course.enrolled_count.toLocaleString()} enrolled</span>}
              </div>
              <div className="course-hero__actions">
                {enrollment ? (
                  <span className="badge badge-success" style={{ padding: 'var(--space-3) var(--space-5)', fontSize: '0.95rem' }}>
                    <CheckCircle2 size={18} /> You're enrolled
                  </span>
                ) : (
                  <button className="btn btn-primary btn-lg" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? <><div className="spinner" /> Enrolling...</> : <><PlayCircle size={18} /> Enroll now</>}
                  </button>
                )}
                {!user && <span className="muted">Sign in to enroll and track progress</span>}
              </div>
              {error && <p className="alert alert-error" style={{ marginTop: 'var(--space-4)' }}>{error}</p>}
            </div>
            <div className="course-hero__media">
              <img src={course.image_url} alt={course.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Body: sidebar + content */}
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
                    <span className="course-sidebar__num">{i + 1}</span>
                    <span className="course-sidebar__label">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="muted" style={{ fontSize: '0.9rem' }}>Lessons coming soon.</p>
          )}
        </aside>

        <div className="course-content">
          {sections[activeSection] ? (
            <article className="card course-content__card fade-in" key={activeSection}>
              <span className="eyebrow">Lesson {activeSection + 1} of {sections.length}</span>
              <h2 className="h3" style={{ marginTop: 'var(--space-3)' }}>{sections[activeSection].title}</h2>
              <div className="course-content__body">
                <p>{sections[activeSection].content}</p>
                {sections[activeSection].content && (
                  <p>This lesson is part of the <strong>{course.title}</strong> track. Each lesson builds on the last, so work through them in order for the best results. Practice what you learn in your own editor to lock in the concepts.</p>
                )}
              </div>
              <div className="course-content__nav">
                <button className="btn btn-secondary" disabled={activeSection === 0} onClick={() => setActiveSection((s) => s - 1)}>
                  <ArrowLeft size={16} /> Previous
                </button>
                <button className="btn btn-primary" disabled={activeSection === sections.length - 1} onClick={() => setActiveSection((s) => s + 1)}>
                  Next lesson
                </button>
              </div>
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
