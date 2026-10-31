import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Sparkles, Award, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';
import './Certificates.css';

export default function Certificates() {
  const { lang } = useLang();
  const t = content[lang].certificates;

  return (
    <section id="certificates" className="certificates" aria-label={t.title}>
      {/* Ambient background glow */}
      <div className="certs__glow" aria-hidden="true" />

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

        {/* Certificates Grid */}
        <div className="certs__grid">
          {t.items.map((cert, index) => (
            <div key={index} className="card cert-card">
              <div className="cert-card__top">
                <div className="cert-card__icon-wrap">
                  <Award size={22} />
                </div>
                <div className="cert-card__verified">
                  <ShieldCheck size={14} />
                  <span>{lang === 'ar' ? 'شهادة معتمدة' : 'Verified'}</span>
                </div>
              </div>

              <div className="cert-card__meta">
                <span className="cert-card__issuer">{cert.issuer}</span>
                <span className="cert-card__year">
                  <Calendar size={13} />
                  <span>{cert.year}</span>
                </span>
              </div>

              <h3 className="cert-card__title">{cert.title}</h3>
              <p className="cert-card__desc">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
