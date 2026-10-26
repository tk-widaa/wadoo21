import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import { ExternalLink, Code2 } from 'lucide-react';
import './Projects.css';

function ProjectCard({ project, githubLabel, liveLabel, index }) {
  return (
    <article
      className="card project-card"
      style={{ '--card-color': project.color, '--delay': `${index * 0.1}s` }}
      aria-label={project.title}
    >
      {/* Image / Placeholder */}
      <div className="project-card__image-wrap">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-card__image"
          />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true">
            <Code2 size={32} />
          </div>
        )}
        {/* Overlay links */}
        <div className="project-card__overlay">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__overlay-btn"
              aria-label={`${project.title} — ${githubLabel}`}
            >

              <span>{githubLabel}</span>
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__overlay-btn project-card__overlay-btn--primary"
              aria-label={`${project.title} — ${liveLabel}`}
            >
              <ExternalLink size={18} />
              <span>{liveLabel}</span>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__tags" role="list">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag" role="listitem">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const t = content[lang].projects;

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.label}</span>
          <h2 className="section-title" id="projects-title">{t.title}</h2>
          <p className="section-desc">{t.desc}</p>
        </div>

        <div className="projects__grid">
          {t.items.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              githubLabel={t.github_label}
              liveLabel={t.live_label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
