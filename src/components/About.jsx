import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import {
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  Compass,
  Zap
} from 'lucide-react';
import './About.css';

export default function About() {
  const { lang } = useLang();
  const t = content[lang].about;

  const stats = [
    { value: '4+', label: lang === 'ar' ? 'سنوات من الشغف والبرمجة' : 'Years Experience', icon: <Zap size={20} /> },
    { value: '15+', label: lang === 'ar' ? 'مشروع وتطبيق ويب' : 'Projects Completed', icon: <Code2 size={20} /> },
    { value: '100%', label: lang === 'ar' ? 'التزام بالجودة والأداء' : 'Clean Architecture', icon: <CheckCircle2 size={20} /> },
    { value: 'BSc', label: lang === 'ar' ? 'هندسة البرمجيات' : 'Software Engineering', icon: <GraduationCap size={20} /> },
  ];

  const highlights = [
    { title: lang === 'ar' ? 'تطوير واجهات متقدمة' : 'Modern Frontend', desc: lang === 'ar' ? 'بناء تطبيقات React تفاعلية وسريعة' : 'Crafting scalable interactive React apps', icon: <Cpu size={18} /> },
    { title: lang === 'ar' ? 'تجربة مستخدم استثنائية' : 'Pixel-Perfect UI/UX', desc: lang === 'ar' ? 'الاهتمام بأدق تفاصيل الحركة والجمال' : 'Obsession with fluidity and elegance', icon: <Compass size={18} /> },
  ];

  return (
    <section id="about" className="about" aria-label={t.title}>
      {/* Background Aura */}
      <div className="about__glow" aria-hidden="true" />

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

        {/* Bento Grid Layout */}
        <div className="about__bento">
          {/* Main Bio Card */}
          <div className="card about__bio-card">
            <div className="about__bio-badge">
              <span className="about__badge-dot" />
              <span>{lang === 'ar' ? 'الرؤية والشغف' : 'Vision & Passion'}</span>
            </div>

            <h3 className="about__bio-heading">
              {lang === 'ar'
                ? 'أجمع بين دقة الهندسة وجماليات التصميم الرقمي'
                : 'Bridging Software Engineering with Visual Elegance'}
            </h3>

            <p className="about__bio-paragraph">{t.bio1}</p>
            <p className="about__bio-paragraph">{t.bio2}</p>

            {/* Core Highlights */}
            <div className="about__highlights">
              {highlights.map((h, i) => (
                <div key={i} className="about__highlight-item">
                  <div className="about__highlight-icon">{h.icon}</div>
                  <div>
                    <h4 className="about__highlight-title">{h.title}</h4>
                    <p className="about__highlight-desc">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats & Education */}
          <div className="about__side-col">
            {/* Impact Stats Grid */}
            <div className="about__stats-grid">
              {stats.map((s, idx) => (
                <div key={idx} className="about__stat-card">
                  <div className="about__stat-icon">{s.icon}</div>
                  <strong className="about__stat-number gradient-text">{s.value}</strong>
                  <span className="about__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="card about__edu-card">
              <div className="about__edu-top">
                <div className="about__edu-icon-wrap">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="about__edu-header-title">{t.education_label}</h4>
                  <span className="about__edu-header-sub">
                    {lang === 'ar' ? 'الخلفية الأكاديمية الرسمية' : 'Formal Academic Background'}
                  </span>
                </div>
              </div>

              {t.education.map((edu, idx) => (
                <div key={idx} className="about__edu-milestone">
                  <div className="about__edu-node">
                    <span className="about__edu-dot" />
                  </div>
                  <div className="about__edu-details">
                    <div className="about__edu-meta">
                      <span className="about__edu-year">{edu.year}</span>
                      <span className="about__edu-verified">
                        <Award size={13} />
                        {lang === 'ar' ? 'مؤهل معتمد' : 'Verified Degree'}
                      </span>
                    </div>
                    <h5 className="about__edu-degree">{edu.degree}</h5>
                    <p className="about__edu-school">{edu.school}</p>
                    <p className="about__edu-desc">{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
