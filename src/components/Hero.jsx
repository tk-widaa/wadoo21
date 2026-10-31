import { useState, useRef, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { ArrowDown, Mail, Sparkles, Code2, Terminal, ExternalLink } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { lang } = useLang();
  const t = content[lang].hero;
  const c = content[lang].contact;

  // 3D Tilt interaction for profile frame
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const techBadges = ['React', 'JavaScript', 'Node.js', 'Python', 'TypeScript', 'CSS3'];

  return (
    <section id="hero" className="hero" aria-label={lang === 'ar' ? 'مقدمة' : 'Introduction'}>
      {/* Dynamic Ambient Background Elements */}
      <div className="hero__aurora hero__aurora--1" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--2" aria-hidden="true" />
      <div className="hero__grid-overlay" aria-hidden="true" />

      <div className="container hero__container">
        {/* Profile Card — Creative Multi-Layered Tilt Frame */}
        <div
          ref={frameRef}
          className="hero__profile-column animate-fadeInUp"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ animationDelay: '0.1s' }}
        >
          <div
            className="hero__profile-card"
            style={{
              transform: isHovered
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
                : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            }}
          >
            {/* Ambient Back Glow Ring */}
            <div className="hero__card-glow" aria-hidden="true" />

            {/* Specular Edge Border */}
            <div className="hero__card-border" aria-hidden="true" />

            {/* Profile Image with Overlay Glass */}
            <div className="hero__image-wrap">
              <img
                src="/profile.png"
                alt={lang === 'ar' ? 'صورة وداعه الشخصية' : 'Photo of Widaa'}
                className="hero__profile-img"
              />
              <div className="hero__image-glare" aria-hidden="true" />
            </div>

            {/* HUD Tech Accents */}
            <div className="hero__hud-tag hero__hud-tag--top">
              <Terminal size={13} className="hero__hud-icon" />
              <span>DEV_CORE // V2.0</span>
            </div>

            {/* Floating Status Badge */}
            <div className="hero__status-badge">
              <span className="hero__status-dot" aria-hidden="true" />
              <span>{lang === 'ar' ? 'متاح للمشاريع الجديدة' : 'Available for Work'}</span>
            </div>

            {/* Floating Experience Chip */}
            <div className="hero__exp-chip animate-float">
              <Code2 size={16} className="hero__exp-icon" />
              <div>
                <strong className="hero__exp-title">4+ {lang === 'ar' ? 'سنوات' : 'Years'}</strong>
                <span className="hero__exp-sub">{lang === 'ar' ? 'خبرة تطوير' : 'Experience'}</span>
              </div>
            </div>

            {/* Corner Decorative Brackets */}
            <div className="hero__bracket hero__bracket--tl" aria-hidden="true" />
            <div className="hero__bracket hero__bracket--tr" aria-hidden="true" />
            <div className="hero__bracket hero__bracket--bl" aria-hidden="true" />
            <div className="hero__bracket hero__bracket--br" aria-hidden="true" />
          </div>
        </div>

        {/* Hero Text & Presentation Content */}
        <div className="hero__content">
          <div className="hero__greeting-pill animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <Sparkles size={14} className="hero__greeting-icon" />
            <span>{t.greeting}</span>
          </div>

          <h1 className="hero__name animate-fadeInUp gradient-text" style={{ animationDelay: '0.25s' }}>
            {t.name}
          </h1>

          <div className="hero__title-box animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <span className="hero__title-text">{t.title}</span>
            <span className="hero__title-divider">•</span>
            <span className="hero__subtitle-text">{t.subtitle}</span>
          </div>

          <p className="hero__bio animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            {t.bio}
          </p>

          {/* Quick Tech Stack Ticker */}
          <div className="hero__tech-row animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <span className="hero__tech-label">{lang === 'ar' ? 'التقنيات الأساسية:' : 'Core Stack:'}</span>
            <div className="hero__tech-tags">
              {techBadges.map((badge) => (
                <span key={badge} className="hero__tech-badge">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Call-to-action buttons */}
          <div className="hero__cta animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              <span>{t.cta_projects}</span>
              <ExternalLink size={17} />
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              <span>{t.cta_contact}</span>
            </button>
            <a
              href={`mailto:${c.email}`}
              className="hero__email-btn"
              title={c.email}
              aria-label="Direct Email"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <button
        className="hero__scroll-indicator"
        onClick={() => scrollTo('about')}
        aria-label={t.scroll}
      >
        <span className="hero__scroll-text">{t.scroll}</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <ArrowDown size={14} className="hero__scroll-arrow" />
      </button>
    </section>
  );
}
