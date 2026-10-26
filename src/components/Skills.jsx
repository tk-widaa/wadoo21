import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import './Skills.css';

function SkillBar({ name, level }) {
  return (
    <div className="skill-item" role="group" aria-label={`${name}: ${level}%`}>
      <div className="skill-item__header">
        <span className="skill-item__name">{name}</span>
        <span className="skill-item__level">{level}%</span>
      </div>
      <div className="skill-item__track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="skill-item__fill"
          style={{ '--target-width': `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { lang } = useLang();
  const t = content[lang].skills;

  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title" id="skills-title">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="skills__grid">
          {t.categories.map((cat, i) => (
            <div key={i} className="card skills__category">
              <h3 className="skills__cat-name">{cat.name}</h3>
              <div className="skills__list">
                {cat.skills.map((skill, j) => (
                  <SkillBar key={j} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
