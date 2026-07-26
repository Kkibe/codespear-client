import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Users, Award, Zap, Target, Code2, Rocket, GraduationCap } from 'lucide-react';
import { CourseItem } from '../../components/courseItem/CoursesItem';
import { BlogItem } from '../../components/blogItem/BlogItem';
import { fetchCourses, fetchBlogs } from '../../api';
import './Home.css';

const STATS = [
  { icon: BookOpen, value: '20+', label: 'Courses' },
  { icon: Users, value: '120K+', label: 'Learners' },
  { icon: Award, value: '4.8★', label: 'Avg rating' },
  { icon: Zap, value: '100%', label: 'Free' },
];

const FEATURES = [
  { icon: Target, title: 'Learn by doing', text: 'Hands-on lessons with real projects, not just theory. Build a portfolio as you learn.' },
  { icon: Rocket, title: 'Curated paths', text: 'Structured tracks from beginner to advanced, designed by working developers.' },
  { icon: GraduationCap, title: 'For everyone', text: 'Whether you are starting out or leveling up, there is a path that fits your goals.' },
  { icon: Code2, title: 'Modern stack', text: 'Learn the technologies the industry uses today — React, Python, Node, and more.' },
];

export function Home() {
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCourses({ featured: true }),
      fetchBlogs(),
    ])
      .then(([c, b]) => {
        setCourses((c || []).slice(0, 6));
        setBlogs((b || []).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content fade-up">
            <span className="eyebrow">
              <Sparkles size={14} /> Learn to code, the modern way
            </span>
            <h1 className="h1 hero__title text-balance">
              Master programming with <span className="gradient-text">curated courses</span> and hands-on learning
            </h1>
            <p className="lead hero__lead text-balance">
              Codespear brings you high-quality courses, resources, and articles on the technologies shaping the future. Learn at your pace, build real skills, and grow your career.
            </p>
            <div className="hero__actions">
              <Link to="/courses" className="btn btn-primary btn-lg">
                Explore courses <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                Create free account
              </Link>
            </div>
            <div className="hero__stats">
              {STATS.map((s) => (
                <div key={s.label} className="hero__stat">
                  <s.icon size={20} />
                  <div>
                    <span className="hero__stat-value">{s.value}</span>
                    <span className="hero__stat-label">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__visual fade-up" style={{ animationDelay: '120ms' }}>
            <div className="hero__card hero__card--main">
              <div className="hero__card-header">
                <span className="hero__dot" />
                <span className="hero__dot" />
                <span className="hero__dot" />
              </div>
              <pre className="hero__code">
<span className="c-key">const</span> <span className="c-fn">developer</span> = {'{'}<br />
{'  '}name: <span className="c-str">'you'</span>,<br />
{'  '}stack: [<span className="c-str">'React'</span>, <span className="c-str">'Python'</span>],<br />
{'  '}learning: <span className="c-key">true</span>,<br />
{'  '}<span className="c-fn">build</span>() {'{'}<br />
{'    '}<span className="c-key">return</span> <span className="c-str">'something great'</span>;<br />
{'  '}<br />
{'}'};<br />
developer.<span className="c-fn">build</span>();
              </pre>
            </div>
            <div className="hero__card hero__card--badge scale-in" style={{ animationDelay: '300ms' }}>
              <Award size={22} />
              <div>
                <span>Certified</span>
                <small>Track your progress</small>
              </div>
            </div>
            <div className="hero__card hero__card--badge hero__card--badge2 scale-in" style={{ animationDelay: '420ms' }}>
              <Users size={22} />
              <div>
                <span>120K+ learners</span>
                <small>Join the community</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section__head text-center">
            <span className="eyebrow">Why Codespear</span>
            <h2 className="h2 text-balance">Everything you need to level up</h2>
            <p className="lead text-balance" style={{ maxWidth: 560, margin: 'var(--space-3) auto 0' }}>
              A learning experience built for how developers actually work — practical, modern, and always relevant.
            </p>
          </div>
          <div className="grid grid-4 stagger">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature card">
                <div className="feature__icon"><f.icon size={24} /></div>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="section section--subtle">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="eyebrow">Featured</span>
              <h2 className="h2">Popular courses</h2>
            </div>
            <Link to="/courses" className="btn btn-ghost">View all <ArrowRight size={16} /></Link>
          </div>
          {loading ? (
            <div className="auto-grid">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton course-skel" />)}
            </div>
          ) : courses.length ? (
            <div className="auto-grid stagger">
              {courses.map((c) => <CourseItem key={c.id} course={c} />)}
            </div>
          ) : (
            <p className="muted text-center">No courses yet. Check back soon.</p>
          )}
        </div>
      </section>

      {/* Latest articles */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="eyebrow">From the blog</span>
              <h2 className="h2">Latest articles</h2>
            </div>
            <Link to="/blog" className="btn btn-ghost">Read all <ArrowRight size={16} /></Link>
          </div>
          {loading ? (
            <div className="grid grid-3">
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton blog-skel" />)}
            </div>
          ) : blogs.length ? (
            <div className="grid grid-3 stagger">
              {blogs.map((b) => <BlogItem key={b.id} blog={b} />)}
            </div>
          ) : (
            <p className="muted text-center">No articles yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-card__content">
              <h2 className="h2 text-balance">Ready to start your journey?</h2>
              <p className="lead text-balance">Join thousands of learners building their future with Codespear. It is free to start.</p>
              <div className="cluster">
                <Link to="/register" className="btn btn-primary btn-lg">Get started free <ArrowRight size={18} /></Link>
                <Link to="/courses" className="btn btn-secondary btn-lg">Browse courses</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
