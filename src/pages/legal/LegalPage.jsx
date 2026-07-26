import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Shield, Cookie, Users } from 'lucide-react';
import './Legal.css';

const ICONS = { terms: FileText, privacy: Shield, cookies: Cookie, conduct: Users };

export function LegalPage({ kind, title, updated, sections }) {
  const { pathname } = useLocation();
  useEffect(() => { document.title = `${title} — Codespear`; }, [title, pathname]);
  const Icon = ICONS[kind] || FileText;

  return (
    <div className="page legal-page">
      <div className="container container-narrow">
        <div className="legal-page__head">
          <div className="legal-page__icon"><Icon size={28} /></div>
          <h1 className="h1">{title}</h1>
          <p className="muted">Last updated: {updated}</p>
        </div>
        <div className="legal-page__body">
          {sections.map((s, i) => (
            <section key={i} className="legal-section">
              <h2 className="h3 legal-section__title">{s.heading}</h2>
              {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              {s.list && (
                <ul className="legal-section__list">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
