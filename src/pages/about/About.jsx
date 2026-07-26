import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Heart, Users, ChevronDown, Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import './About.css';

const VALUES = [
  { icon: Target, title: 'Practical first', text: 'We believe learning sticks when you build. Every course is project-driven.' },
  { icon: Zap, title: 'Always modern', text: 'The industry moves fast. We keep our content current with what teams actually ship.' },
  { icon: Heart, title: 'Accessible to all', text: 'Quality education should not cost a fortune. Codespear is free to start.' },
  { icon: Users, title: 'Community-driven', text: 'Learners help learners. Share, comment, and grow together.' },
];

const FAQS = [
  { q: 'Is Codespear really free?', a: 'Yes. All courses and articles are free to read and learn from. Create a free account to track your progress and enroll in courses.' },
  { q: 'Do I need prior experience?', a: 'No. We have paths for complete beginners as well as intermediate developers looking to level up. Start with any beginner-level course.' },
  { q: 'Can I get a certificate?', a: 'You can track your progress and completion in your dashboard. Formal certificates are on our roadmap.' },
  { q: 'How often is content updated?', a: 'We regularly add new courses and articles and refresh existing ones to keep pace with the industry.' },
];

const SOCIALS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export const About = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="page about-page">
      <div className="container">
        <div className="about-page__hero">
          <span className="eyebrow">About Codespear</span>
          <h1 className="h1 text-balance">Learn with Codespear</h1>
          <p className="lead text-balance" style={{ maxWidth: 620, marginTop: 'var(--space-5)' }}>
            The world is going digital, and the demand for skilled developers has never been higher. Codespear exists to make programming accessible, practical, and genuinely enjoyable — for everyone, everywhere.
          </p>
        </div>

        <div className="grid grid-4 stagger" style={{ marginTop: 'var(--space-16)' }}>
          {VALUES.map((v) => (
            <div key={v.title} className="feature card">
              <div className="feature__icon"><v.icon size={24} /></div>
              <h3 className="feature__title">{v.title}</h3>
              <p className="feature__text">{v.text}</p>
            </div>
          ))}
        </div>

        <section className="about-page__faqs">
          <div className="section__head text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="h2">People often ask</h2>
          </div>
          <div className="faqs">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq ${open === i ? 'open' : ''}`}>
                <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                  <ChevronDown size={20} className="faq__chevron" />
                </button>
                {open === i && <p className="faq__a fade-in">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="about-page__connect">
          <h2 className="h2 text-center">Connect with us</h2>
          <div className="about-page__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="about-page__social">
                <s.icon size={20} />
              </a>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Get in touch</Link>
          </div>
        </section>
      </div>
    </div>
  );
};
