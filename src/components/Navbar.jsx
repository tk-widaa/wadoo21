import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import './Navbar.css';

export default function Navbar() {
  const { lang, toggle } = useLang();
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const links = [
    { id: 'hero',         label: t.home },
    { id: 'about',        label: t.about },
    { id: 'skills',       label: t.skills },
    { id: 'projects',     label: t.projects },
    { id: 'services',     label: t.services },
    { id: 'certificates', label: t.certificates },
    { id: 'contact',      label: t.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll Spy
      const scrollPos = window.scrollY + 180;
      for (let i = links.length - 1; i >= 0; i--) {
        const sec = document.getElementById(links[i].id);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [links]);

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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className={`navbar-wrapper ${scrolled ? 'navbar-wrapper--scrolled' : ''}`}
      role="banner"
    >
      <nav
        className="navbar"
        role="navigation"
        aria-label={lang === 'ar' ? 'القائمة الرئيسية' : 'Main navigation'}
      >
        <div className="navbar__container">
          {/* Logo with Code Glyph */}
          <button
            className="navbar__logo"
            onClick={() => scrollTo('hero')}
            aria-label={lang === 'ar' ? 'الصفحة الرئيسية' : 'Go to home'}
          >
            <span className="logo-bracket">{'<'}</span>
            <span className="logo-letter">W</span>
            <span className="logo-bracket">{'>'}</span>
            <span className="logo-pulse" />
          </button>

          {/* Desktop Nav Links */}
          <ul className="navbar__links" role="list">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                    {isActive && <span className="navbar__link-dot" />}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Controls */}
          <div className="navbar__controls">
            <button
              className="lang-toggle"
              onClick={toggle}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe size={15} aria-hidden="true" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
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
                  <button
                    className={`navbar__mobile-link ${activeSection === link.id ? 'navbar__mobile-link--active' : ''}`}
                    onClick={() => scrollTo(link.id)}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && <Sparkles size={14} className="navbar__mobile-active-icon" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
