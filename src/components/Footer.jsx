import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Mail, ArrowUp, Code2, Sparkles } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { lang } = useLang();
  const t = content[lang].footer;
  const nav = content[lang].nav;
  const c = content[lang].contact;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Ambient Top Glow Line */}
      <div className="footer__glow-line" aria-hidden="true" />

      <div className="container footer__container">
        {/* Brand Column */}
        <div className="footer__brand">
          <button className="footer__logo" onClick={() => scrollTo('hero')} aria-label="Go to top">
            <span className="logo-bracket">{'<'}</span>
            <span className="logo-letter">W</span>
            <span className="logo-bracket">{'>'}</span>
          </button>
          <p className="footer__tagline">
            {lang === 'ar'
              ? 'وداعه الطاهر — هندسة برمجيات وتطوير مواقع وتطبيقات حديثة'
              : 'Widaa Altaher — Software Engineering & Modern Web Applications'}
          </p>
          <div className="footer__status-chip">
            <span className="footer__status-dot" />
            <span>{lang === 'ar' ? 'متاح للفرص والمشاريع' : 'Open for Opportunities'}</span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="footer__nav" aria-label={lang === 'ar' ? 'روابط سريعة' : 'Quick links'}>
          {[
            { id: 'hero', label: nav.home },
            { id: 'about', label: nav.about },
            { id: 'skills', label: nav.skills },
            { id: 'projects', label: nav.projects },
            { id: 'services', label: nav.services },
            { id: 'certificates', label: nav.certificates },
            { id: 'contact', label: nav.contact },
          ].map((link) => (
            <button key={link.id} className="footer__nav-link" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions & Scroll to top */}
        <div className="footer__actions">
          <a
            href={`mailto:${c.email}`}
            className="footer__action-btn"
            title={c.email}
            aria-label="Direct Email"
          >
            <Mail size={18} />
          </a>
          <button
            className="footer__action-btn footer__action-btn--top"
            onClick={scrollToTop}
            title={lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <p className="footer__copy">{t.copy}</p>
        <div className="footer__built-tag">
          <Code2 size={14} className="footer__code-icon" />
          <span>{lang === 'ar' ? 'صُمم وبُني بأحدث تقنيات React & CSS' : 'Engineered with React & Modern CSS'}</span>
        </div>
      </div>
    </footer>
  );
}
