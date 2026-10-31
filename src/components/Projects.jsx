import { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';
import { content } from '../data/content';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  ShoppingBag,
  CheckSquare,
  Building2,
  Code
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import './Projects.css';

// Project visual preview generator based on index
const ProjectVisual = ({ index, color }) => {
  if (index === 0) {
    // Task Manager App visual
    return (
      <div className="project-visual project-visual--tasks">
        <div className="pv-header">
          <div className="pv-dots"><span /><span /><span /></div>
          <span className="pv-title">TaskFlow Pro // Dashboard</span>
        </div>
        <div className="pv-tasks-grid">
          <div className="pv-task-col">
            <span className="pv-col-label">To-Do (4)</span>
            <div className="pv-card"><div className="pv-bar pv-bar--cyan" /><h6>Auth Module</h6></div>
            <div className="pv-card"><div className="pv-bar pv-bar--purple" /><h6>API Integration</h6></div>
          </div>
          <div className="pv-task-col">
            <span className="pv-col-label">In Progress (2)</span>
            <div className="pv-card active"><div className="pv-bar pv-bar--green" /><h6>Team Realtime</h6></div>
          </div>
        </div>
      </div>
    );
  }
  if (index === 1) {
    // E-Commerce Store visual
    return (
      <div className="project-visual project-visual--shop">
        <div className="pv-header">
          <div className="pv-dots"><span /><span /><span /></div>
          <span className="pv-title">Luxury Commerce // Storefront</span>
        </div>
        <div className="pv-shop-grid">
          <div className="pv-product">
            <div className="pv-prod-img pv-prod-img--1" />
            <div className="pv-prod-info">
              <span>Smart Device</span>
              <strong>$299</strong>
            </div>
          </div>
          <div className="pv-product">
            <div className="pv-prod-img pv-prod-img--2" />
            <div className="pv-prod-info">
              <span>Bespoke Edition</span>
              <strong>$480</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (index === 2) {
    // Engineering Firm visual
    return (
      <div className="project-visual project-visual--eng">
        <div className="pv-header">
          <div className="pv-dots"><span /><span /><span /></div>
          <span className="pv-title">Engineering Suite // CAD Blueprint</span>
        </div>
        <div className="pv-eng-blueprint">
          <div className="pv-blueprint-grid" />
          <div className="pv-blueprint-shapes">
            <div className="pv-geo-circle" />
            <div className="pv-geo-rect" />
            <div className="pv-geo-line" />
          </div>
          <div className="pv-blueprint-tag">PROJECT_BLUEPRINT_CAD.DWG</div>
        </div>
      </div>
    );
  }
  // Portfolio visual
  return (
    <div className="project-visual project-visual--code">
      <div className="pv-header">
        <div className="pv-dots"><span /><span /><span /></div>
        <span className="pv-title">Widaa.dev // React 19 Core</span>
      </div>
      <div className="pv-code-body">
        <div className="pv-line"><span className="pv-kw">const</span> <span className="pv-var">developer</span> = {'{'}</div>
        <div className="pv-line pv-indent"><span className="pv-key">name</span>: <span className="pv-str">'Widaa Altaher'</span>,</div>
        <div className="pv-line pv-indent"><span className="pv-key">stack</span>: [<span className="pv-str">'React'</span>, <span className="pv-str">'Vite'</span>, <span className="pv-str">'CSS'</span>],</div>
        <div className="pv-line pv-indent"><span className="pv-key">passion</span>: <span className="pv-str">'High-Performance Apps'</span></div>
        <div className="pv-line">{'}'};</div>
      </div>
    </div>
  );
};

export default function Projects() {
  const { lang } = useLang();
  const t = content[lang].projects;
  const items = t.items;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const containerRef = useRef(null);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  }, [items.length]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  }, [items.length]);

  // Pointer / Touch Drag Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 45;

    // RTL vs LTR swipe direction
    const isRtl = lang === 'ar';
    if (dragDeltaX.current > threshold) {
      isRtl ? nextSlide() : prevSlide();
    } else if (dragDeltaX.current < -threshold) {
      isRtl ? prevSlide() : nextSlide();
    }
    dragDeltaX.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        lang === 'ar' ? nextSlide() : prevSlide();
      } else if (e.key === 'ArrowRight') {
        lang === 'ar' ? prevSlide() : nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lang, prevSlide, nextSlide]);

  const activeProject = items[activeIndex];

  return (
    <section id="projects" className="projects" aria-label={t.title}>
      {/* Background Decor */}
      <div className="projects__glow projects__glow--1" aria-hidden="true" />
      <div className="projects__glow projects__glow--2" aria-hidden="true" />

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

        {/* Coverflow 3D Stage */}
        <div
          ref={containerRef}
          className="coverflow"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="coverflow__stage">
            {items.map((project, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              // Coverflow 3D Transform computation
              const rotateDir = lang === 'ar' ? -1 : 1;
              let transformStyle = '';
              let opacity = 1;
              let zIndex = 10 - absOffset;

              if (isCenter) {
                transformStyle = 'translateX(0%) scale(1.06) translateZ(60px) rotateY(0deg)';
                opacity = 1;
              } else {
                const xOffset = offset * (window.innerWidth < 768 ? 62 : 68);
                const rotateY = offset * 28 * rotateDir;
                const scale = Math.max(0.76, 1 - absOffset * 0.16);
                const zTranslate = -100 - absOffset * 40;
                transformStyle = `translateX(${xOffset}%) scale(${scale}) translateZ(${zTranslate}px) rotateY(${rotateY}deg)`;
                opacity = Math.max(0.3, 1 - absOffset * 0.38);
              }

              return (
                <div
                  key={index}
                  className={`coverflow__card ${isCenter ? 'coverflow__card--active' : ''}`}
                  style={{
                    transform: transformStyle,
                    opacity: opacity,
                    zIndex: zIndex,
                    filter: isCenter ? 'none' : 'blur(0.8px) brightness(0.75)',
                  }}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={project.title}
                >
                  <div className="coverflow__card-inner">
                    {/* Visual Mockup Screen */}
                    <div className="coverflow__card-screen">
                      <ProjectVisual index={index} color={project.color} />
                    </div>

                    {/* Card Title & Meta Overlay */}
                    <div className="coverflow__card-meta">
                      <div className="coverflow__card-tag-row">
                        <span className="coverflow__card-idx">
                          0{index + 1} //
                        </span>
                        <div className="coverflow__card-pills">
                          {project.tags.slice(0, 2).map((tag, tIdx) => (
                            <span key={tIdx} className="coverflow__card-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="coverflow__card-title">{project.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="coverflow__controls">
            <button
              className="coverflow__nav-btn coverflow__nav-btn--prev"
              onClick={lang === 'ar' ? nextSlide : prevSlide}
              aria-label="Previous project"
            >
              {lang === 'ar' ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </button>

            {/* Pagination Indicators */}
            <div className="coverflow__pagination">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  className={`coverflow__dot ${idx === activeIndex ? 'coverflow__dot--active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              className="coverflow__nav-btn coverflow__nav-btn--next"
              onClick={lang === 'ar' ? prevSlide : nextSlide}
              aria-label="Next project"
            >
              {lang === 'ar' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </button>
          </div>
        </div>

        {/* Selected Project Full Details Showcase Card */}
        {activeProject && (
          <div className="project-detail card animate-fadeIn">
            <div className="project-detail__header">
              <div className="project-detail__badge">
                <Layers size={15} className="project-detail__badge-icon" />
                <span>{lang === 'ar' ? `المشروع المميّز 0${activeIndex + 1}` : `Featured Project 0${activeIndex + 1}`}</span>
              </div>
              <span className="project-detail__count">
                0{activeIndex + 1} / 0{items.length}
              </span>
            </div>

            <h3 className="project-detail__title">{activeProject.title}</h3>
            <p className="project-detail__desc">{activeProject.desc}</p>

            {/* Tech Stack Tags */}
            <div className="project-detail__tags">
              {activeProject.tags.map((tag, idx) => (
                <span key={idx} className="project-detail__tag">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Links and Actions */}
            <div className="project-detail__actions">
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <GithubIcon size={18} />
                  <span>{t.github_label || 'GitHub'}</span>
                </a>
              )}
              {activeProject.live && activeProject.live !== '#' && (
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={18} />
                  <span>{t.live_label || 'Live Demo'}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
