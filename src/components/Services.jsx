import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import './Services.css';

function ServiceCard({ item, index }) {
  return (
    <article
      className="card service-card"
      style={{ '--delay': `${index * 0.1}s` }}
      aria-label={item.title}
    >
      <div className="service-card__icon" aria-hidden="true">{item.icon}</div>
      <h3 className="service-card__title">{item.title}</h3>
      <p className="service-card__desc">{item.desc}</p>
      <ul className="service-card__features" role="list">
        {item.features.map((f, i) => (
          <li key={i} className="service-card__feature">
            <span className="service-card__check" aria-hidden="true">✦</span>
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Services() {
  const { lang } = useLang();
  const t = content[lang].services;

  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title" id="services-title">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="services__grid">
          {t.items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
