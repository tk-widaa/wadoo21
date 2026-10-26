import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { GraduationCap } from 'lucide-react';
import './About.css';

export default function About() {
  const { lang } = useLang();
  const t = content[lang].about;

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title" id="about-title">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="about__grid">
          {/* Bio card */}
          <div className="card about__bio-card">
            <div className="about__avatar-strip" aria-hidden="true">
              <span>{'{ '}</span>
              <span className="about__av-name">widaa</span>
              <span>{' }'}</span>
            </div>
            <p className="about__bio-text">{t.bio1}</p>
            <p className="about__bio-text">{t.bio2}</p>

            <div className="about__tags" role="list" aria-label={lang === 'ar' ? 'اهتمامات' : 'Interests'}>
              {['React', 'Node.js', 'Python', 'UI/UX', 'Open Source'].map((tag) => (
                <span key={tag} className="about__tag" role="listitem">{tag}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card about__edu-card">
            <div className="about__edu-header">
              <GraduationCap size={22} className="about__edu-icon" aria-hidden="true" />
              <h3 className="about__edu-title">{t.education_label}</h3>
            </div>

            {t.education.map((edu, i) => (
              <div key={i} className="about__edu-item">
                <div className="about__edu-dot" aria-hidden="true" />
                <div className="about__edu-info">
                  <span className="about__edu-year">{edu.year}</span>
                  <strong className="about__edu-degree">{edu.degree}</strong>
                  <span className="about__edu-school">{edu.school}</span>
                  <span className="about__edu-desc">{edu.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
