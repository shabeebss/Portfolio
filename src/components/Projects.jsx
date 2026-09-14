import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ExternalLink, Zap } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';

export const Projects = ({ onSelectProject }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { label: 'All Projects', value: 'all', count: PROJECTS.length },
    { label: 'Enterprise ERP', value: 'enterprise', count: PROJECTS.filter((p) => p.category === 'enterprise').length },
    { label: 'AI & Computer Vision', value: 'ai', count: PROJECTS.filter((p) => p.category === 'ai').length },
    { label: 'Web & Integrations', value: 'web', count: PROJECTS.filter((p) => p.category === 'web').length }
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const getMetric = (projectId) => {
    switch (projectId) {
      case 'pyerp':
        return '< 45ms P95 Latency • 100% FIFO Consistency';
      case 'home360':
        return '30+ FPS Real-Time • 94.2% mAP Accuracy';
      case 'taxifare':
        return 'Dynamic Polyline Routing • Instant QR Billing';
      default:
        return 'Production-Grade Architecture';
    }
  };

  return (
    <section className="section" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal text-center">
          <span className="section-subtitle">PROVEN ENGINEERING EXCELLENCE</span>
          <h2 className="section-title">Selected Works</h2>
          <p className="section-description">
            Production-grade enterprise architectures, real-time AI computer vision pipelines, and scalable full-stack web platforms built with Python, Django, and Next.js.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="project-filters reveal" style={{ marginBottom: '32px' }}>
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`filter-btn ${filter === opt.value ? 'active' : ''}`}
              onClick={() => setFilter(opt.value)}
            >
              <span>{opt.label}</span>
              <span className="filter-count-badge">{opt.count}</span>
            </button>
          ))}
        </div>

        {/* Luxury Editorial Project Cards Grid */}
        <div className="editorial-projects-grid">
          {filteredProjects.map((project) => {
            const metricText = getMetric(project.id);

            return (
              <div key={project.id} className="reveal">
                <div
                  className="editorial-project-card spotlight-card"
                  onClick={() => onSelectProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Media Header with Mac Window Bar */}
                  <div className="editorial-card-media">
                    <div className="editorial-mac-bar">
                      <span className="editorial-mac-dot red"></span>
                      <span className="editorial-mac-dot yellow"></span>
                      <span className="editorial-mac-dot green"></span>
                      <span className="editorial-mac-title">{project.shortTitle || project.title}</span>
                    </div>

                    <img src={project.image} alt={project.title} loading="lazy" />

                    <div className="editorial-media-badge">
                      <span className="editorial-media-badge-dot"></span>
                      <span>{project.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="editorial-card-body">
                    {/* Performance Metric Pill */}
                    <div className="editorial-metric-pill">
                      <Zap size={13} style={{ color: 'var(--accent)' }} />
                      <span>{metricText}</span>
                    </div>

                    {/* Title */}
                    <h3 className="editorial-card-title">{project.title}</h3>

                    {/* Description */}
                    <p className="editorial-card-desc">
                      {project.shortDescription || project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="editorial-card-tech">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="editorial-tech-chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Footer */}
                    <div className="editorial-card-footer" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="editorial-btn-details"
                        onClick={() => onSelectProject(project)}
                      >
                        <span>Case Study &amp; Specs</span>
                        <ArrowUpRight size={15} />
                      </button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="editorial-github-btn"
                          aria-label={`View ${project.title} source code on GitHub`}
                          title="View on GitHub"
                        >
                          <GithubIcon size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
