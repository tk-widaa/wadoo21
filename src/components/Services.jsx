import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Sparkles, Globe, Zap, Palette, Wrench, CheckCircle2, ArrowUpRight } from 'lucide-react';
import './Services.css';

export default function Services() {
  const { lang } = useLang();
  const t = content[lang].services;

  const icons = [
    <Globe size={26} key="web" />,
    <Zap size={26} key="app" />,
    <Palette size={26} key="ui" />,
    <Wrench size={26} key="maint" />,
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="services" aria-label={t.title}>
      {/* Background Glow */}
      <div className="services__glow" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <Sparkles size={14} />
            <span>{t.label}</span>
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        {/* Services Grid */}
        <div className="services__grid">
          {t.items.map((service, index) => (
            <div
              key={index}
              className="card service-card"
              onClick={scrollToContact}
              role="button"
              tabIndex={0}
            >
              <div className="service-card__top">
                <div className="service-card__icon-box">
                  {icons[index]}
                </div>
                <div className="service-card__arrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>

              {/* Feature Checklist */}
              <ul className="service-card__features">
                {service.features.map((feat, fIdx) => (
                  <li key={fIdx} className="service-card__feature">
                    <CheckCircle2 size={15} className="service-card__check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
