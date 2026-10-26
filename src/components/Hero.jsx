import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { ArrowDown, Mail } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { lang } = useLang();
  const t = content[lang].hero;
  const c = content[lang].contact; // centralised links

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label={lang === 'ar' ? 'مقدمة' : 'Introduction'}>
      {/* Background decoration */}
      <div className="hero__bg-orb hero__bg-orb--1" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--2" aria-hidden="true" />
      <div className="hero__bg-grid" aria-hidden="true" />

      <div className="container hero__container">
        {/* Profile Image — LEFT on desktop / LTR → right side */}
        <div className="hero__image-wrapper animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="hero__image-frame animate-float">
            <img
              src="/profile.png"
              alt={lang === 'ar' ? 'صورة وداعه' : 'Photo of Widaa'}
              className="hero__image"
            />
            <div className="hero__image-ring" aria-hidden="true" />
            <div className="hero__image-badge" aria-hidden="true">
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="hero__content">
          <p className="hero__greeting animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {t.greeting}
          </p>
          <h1 className="hero__name animate-fadeInUp gradient-text" style={{ animationDelay: '0.3s' }}>
            {t.name}
          </h1>
          <p className="hero__title animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {t.title}
          </p>
          <p className="hero__subtitle animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            {t.subtitle}
          </p>
          <p className="hero__bio animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            {t.bio}
          </p>

          <div className="hero__cta animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              {t.cta_projects}
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              {t.cta_contact}
            </button>
          </div>

          <div className="hero__socials animate-fadeInUp" style={{ animationDelay: '0.7s' }}>

            <a href={`mailto:${c.email}`} className="social-icon-btn" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <button
        className="hero__scroll-indicator"
        onClick={() => scrollTo('about')}
        aria-label={t.scroll}
      >
        <span className="hero__scroll-text">{t.scroll}</span>
        <ArrowDown size={18} className="hero__scroll-arrow" />
      </button>
    </section>
  );
}
