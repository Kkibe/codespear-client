import { Link, NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowUp, Code as Code2 } from 'lucide-react';
import './Footer.css';

const SOCIALS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <Code2 size={28} />
            <span>Codespear</span>
          </Link>
          <p className="footer__tagline">
            Learn to code. Build the future. Curated courses, resources, and articles for the modern developer.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="footer__social">
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>Platform</h4>
            <NavLink to="/courses" className="footer__link">Courses</NavLink>
            <NavLink to="/blog" className="footer__link">Blog</NavLink>
            <NavLink to="/resources" className="footer__link">Resources</NavLink>
            <NavLink to="/dashboard" className="footer__link">Dashboard</NavLink>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <NavLink to="/about" className="footer__link">About us</NavLink>
            <NavLink to="/contact" className="footer__link">Contact</NavLink>
            <NavLink to="/register" className="footer__link">Get started</NavLink>
            <NavLink to="/about" className="footer__link">FAQ</NavLink>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <a href="#" className="footer__link">Terms &amp; Privacy</a>
            <a href="#" className="footer__link">Cookie Policy</a>
            <a href="#" className="footer__link">Code of Conduct</a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} Codespear. All rights reserved.</p>
        <button className="footer__top" onClick={scrollTop} aria-label="Back to top">
          <ArrowUp size={16} /> Back to top
        </button>
      </div>
    </footer>
  );
}
