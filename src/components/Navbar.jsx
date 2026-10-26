import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import './Navbar.css';

export default function Navbar() {
  const { lang, toggle } = useLang();
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  const links = [
    { id: 'hero',         label: t.home },
    { id: 'about',        label: t.about },
    { id: 'skills',       label: t.skills },
    { id: 'projects',     label: t.projects },
    { id: 'services',     label: t.services },
    { id: 'certificates', label: t.certificates },
    { id: 'contact',      label: t.contact },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label={lang === 'ar' ? 'القائمة الرئيسية' : 'Main navigation'}
    >
      <div className="navbar__container">
        {/* Logo */}
        <button
          className="navbar__logo"
          onClick={() => scrollTo('hero')}
          aria-label={lang === 'ar' ? 'الصفحة الرئيسية' : 'Go to home'}
        >
          <span className="logo-dot">{'< '}</span>
          <span>W</span>
          <span className="logo-dot">{' />'}</span>
        </button>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="list">
          {links.map((link) => (
            <li key={link.id}>
              <button className="navbar__link" onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="navbar__controls">
          <button
            className="lang-toggle"
            onClick={toggle}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe size={15} aria-hidden="true" />
            <span>{lang === 'ar' ? 'EN' : 'ع'}</span>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile" role="dialog" aria-modal="true">
          <ul role="list">
            {links.map((link) => (
              <li key={link.id}>
                <button className="navbar__mobile-link" onClick={() => scrollTo(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
