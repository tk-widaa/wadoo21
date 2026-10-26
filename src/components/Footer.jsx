import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Mail, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { lang } = useLang();
  const t = content[lang].footer;
  const nav = content[lang].nav;
  const c = content[lang].contact;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        {/* Brand */}
        <div className="footer__brand">
          <button className="footer__logo" onClick={() => scrollTo('hero')} aria-label="Go to top">
            <span className="logo-dot">{'< '}</span>W<span className="logo-dot">{' />'}</span>
          </button>
          <p className="footer__tagline">
            {lang === 'ar' ? 'مطوّرة برمجيات — جامعة النصر' : 'Software Developer — Al-Nasr University'}
          </p>
        </div>

        {/* Quick Nav */}
        <nav className="footer__nav" aria-label={lang === 'ar' ? 'روابط سريعة' : 'Quick links'}>
          {[
            { id: 'about', label: nav.about },
            { id: 'skills', label: nav.skills },
            { id: 'projects', label: nav.projects },
            { id: 'services', label: nav.services },
            { id: 'certificates', label: nav.certificates },
            { id: 'contact', label: nav.contact },
          ].map(link => (
            <button key={link.id} className="footer__nav-link" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div className="footer__socials">
          <a href={c.github} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="GitHub">
          </a>
          <a href={`mailto:${c.email}`} className="footer__social" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>{t.copy}</p>
        <p className="footer__built">
          {t.built} <Heart size={13} fill="currentColor" className="footer__heart" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
