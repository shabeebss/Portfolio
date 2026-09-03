import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';

export const Projects = ({ onSelectProject }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { label: 'All Projects', value: 'all' },
    { label: 'ERP & Full Stack', value: 'enterprise' },
    { label: 'AI & Computer Vision', value: 'ai' },
    { label: 'Web Applications', value: 'web' }
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Portfolio Case Studies</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Production systems showcasing backend architecture, reactive dashboards, deep learning computer vision, and payment gateways.
          </p>
        </div>

        {/* Project Filters */}
        <div className="project-filters reveal">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              className={`filter-btn ${filter === opt.value ? 'active' : ''}`}
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card spotlight-card reveal"
              data-category={project.category}
            >
              <div className="project-image">
                <div
                  onClick={() => onSelectProject(project)}
                  style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
                >
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="project-overlay">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="btn-icon"
                    aria-label="View Project Case Study"
                    title="View Case Study"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-icon"
                      aria-label="View source code"
                      title="GitHub Repo"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-info">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3>
                      <button
                        onClick={() => onSelectProject(project)}
                        className="project-title-link"
                        style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
                      >
                        {project.title}
                      </button>
                    </h3>
                    <span className="skill-tag" style={{ fontSize: '0.72rem', color: 'var(--accent)' }}>
                      {project.categoryLabel}
                    </span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t, idx) => (
                      <span key={idx}>{t}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className="project-view-details-link"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  <span>View Case Study & Architecture</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
