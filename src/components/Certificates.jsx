import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Award, Calendar } from 'lucide-react';
import './Certificates.css';

export default function Certificates() {
  const { lang } = useLang();
  const t = content[lang].certificates;

  return (
    <section id="certificates" className="certificates" aria-labelledby="certs-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title" id="certs-title">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="certs__grid">
          {t.items.map((cert, i) => (
            <article key={i} className="card cert-card" aria-label={cert.title}>
              <div className="cert-card__header">
                <div className="cert-card__icon-wrap" aria-hidden="true">
                  <Award size={22} />
                </div>
                <div className="cert-card__year">
                  <Calendar size={13} aria-hidden="true" />
                  <span>{cert.year}</span>
                </div>
              </div>
              <h3 className="cert-card__title">{cert.title}</h3>
              <p className="cert-card__issuer">{cert.issuer}</p>
              <p className="cert-card__desc">{cert.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
