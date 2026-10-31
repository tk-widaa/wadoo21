import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { Sparkles, Code2, Database, Wrench, Layers } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const { lang } = useLang();
  const t = content[lang].skills;

  const [activeCategory, setActiveCategory] = useState(0);

  const categoryIcons = [
    <Code2 size={18} key="fe" />,
    <Database size={18} key="be" />,
    <Wrench size={18} key="tl" />,
  ];

  return (
    <section id="skills" className="skills" aria-label={t.title}>
      {/* Background Decor */}
      <div className="skills__glow" aria-hidden="true" />

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

        {/* Category Filter Tabs */}
        <div className="skills__tabs">
          {t.categories.map((cat, idx) => (
            <button
              key={idx}
              className={`skills__tab ${idx === activeCategory ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              {categoryIcons[idx]}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        <div className="skills__grid">
          {t.categories[activeCategory].skills.map((skill, index) => {
            const levelLabel =
              skill.level >= 90
                ? lang === 'ar' ? 'مستوى خبير' : 'Mastery'
                : skill.level >= 80
                ? lang === 'ar' ? 'مستوى متقدم' : 'Advanced'
                : lang === 'ar' ? 'مستوى جيد جداً' : 'Proficient';

            return (
              <div key={index} className="card skill-card animate-fadeInUp" style={{ animationDelay: `${index * 0.08}s` }}>
                <div className="skill-card__header">
                  <div className="skill-card__name-box">
                    <span className="skill-card__dot" />
                    <h4 className="skill-card__name">{skill.name}</h4>
                  </div>
                  <span className="skill-card__pct">{skill.level}%</span>
                </div>

                {/* Progress Track */}
                <div className="skill-card__track">
                  <div
                    className="skill-card__fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="skill-card__footer">
                  <span className="skill-card__badge">{levelLabel}</span>
                  <span className="skill-card__level-code">
                    LVL_{Math.round(skill.level / 10)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Stack Overview Chips */}
        <div className="skills__overview">
          <span className="skills__overview-title">
            <Layers size={16} />
            <span>{lang === 'ar' ? 'نظرة شاملة على كامل المهارات:' : 'Complete Technology Ecosystem:'}</span>
          </span>
          <div className="skills__chips">
            {t.categories.flatMap((cat) => cat.skills).map((skill, sIdx) => (
              <span key={sIdx} className="skills__chip">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
