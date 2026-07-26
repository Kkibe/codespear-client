import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, LogOut, LayoutDashboard, ChevronDown, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { useTheme } from '../../ThemeContext';
import { NotificationBell } from '../notificationBell/NotificationBell';
import './TopNav.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses' },
  { to: '/blog', label: 'Blog' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function TopNav() {
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/courses?search=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const displayName = profile?.username || (user?.email ? user.email.split('@')[0] : 'Learner');
  const avatar = profile?.avatar_url;

  return (
    <header className={`topnav ${scrolled ? 'topnav--scrolled' : ''}`}>
      <div className="container topnav__inner">
        <Link to="/" className="topnav__brand" aria-label="Codespear home">
          <span className="topnav__logo" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" width="36" height="36">
              <rect width="64" height="64" rx="16" fill="currentColor" />
              <path d="M32 14L48 24V40L32 50L16 40V24L32 14Z" stroke="#5eead4" strokeWidth="3" strokeLinejoin="round" />
              <path d="M27 29L23 33L27 37" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M37 29L41 33L37 37" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="topnav__name">Codespear</span>
        </Link>

        <form className="topnav__search" onSubmit={handleSearch} role="search">
          <Search size={18} className="topnav__search-icon" />
          <input
            type="search"
            placeholder="Search courses, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search courses"
          />
        </form>

        <nav className="topnav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `topnav__link ${isActive ? 'topnav__link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="topnav__actions">
          <button className="topnav__icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user && <NotificationBell />}
          {profile?.is_admin && (
            <Link to="/admin" className="topnav__admin-badge" aria-label="Admin panel">
              <ShieldCheck size={16} /> Admin
            </Link>
          )}

          {user ? (
            <div className="topnav__user" ref={menuRef}>
              <button className="topnav__user-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Account menu">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="topnav__avatar" />
                ) : (
                  <span className="topnav__avatar topnav__avatar--fallback">{displayName.charAt(0).toUpperCase()}</span>
                )}
                <ChevronDown size={16} />
              </button>
              {menuOpen && (
                <div className="topnav__menu scale-in" role="menu">
                  <div className="topnav__menu-header">
                    <span className="topnav__menu-name">{displayName}</span>
                    <span className="topnav__menu-email">{user.email}</span>
                  </div>
                  <Link to="/dashboard" className="topnav__menu-item" onClick={() => setMenuOpen(false)}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  {profile?.is_admin && (
                    <Link to="/admin" className="topnav__menu-item" onClick={() => setMenuOpen(false)}>
                      <ShieldCheck size={18} /> Admin panel
                    </Link>
                  )}
                  <button className="topnav__menu-item topnav__menu-item--danger" onClick={handleSignOut}>
                    <LogOut size={18} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="topnav__auth">
              <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
            </div>
          )}

          <button
            className="topnav__icon-btn topnav__menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="topnav__mobile fade-in">
          <form className="topnav__mobile-search" onSubmit={handleSearch}>
            <Search size={18} />
            <input type="search" placeholder="Search courses..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </form>
          <nav className="topnav__mobile-links" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => `topnav__mobile-link ${isActive ? 'topnav__mobile-link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            {user && (
              <NavLink to="/dashboard" className="topnav__mobile-link" onClick={() => setMobileOpen(false)}>
                Dashboard
              </NavLink>
            )}
            {user && profile?.is_admin && (
              <NavLink to="/admin" className="topnav__mobile-link" onClick={() => setMobileOpen(false)}>
                Admin panel
              </NavLink>
            )}
          </nav>
          <div className="topnav__mobile-actions">
            {user ? (
              <button className="btn btn-secondary btn-block" onClick={handleSignOut}>
                <LogOut size={18} /> Sign out
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-block" onClick={() => setMobileOpen(false)}>Log in</Link>
                <Link to="/register" className="btn btn-primary btn-block" onClick={() => setMobileOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
