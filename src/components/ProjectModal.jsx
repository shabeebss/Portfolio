import React, { useEffect } from 'react';
import { X, CheckCircle, Server, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="project-modal-close-btn"
          aria-label="Close Case Study"
        >
          <X size={20} />
        </button>

        {/* Header Badges */}
        <div className="project-modal-badge-row">
          <span className="project-modal-badge">
            {project.categoryLabel}
          </span>
          <span className="project-modal-subtitle">
            Case Study & Architecture
          </span>
        </div>

        {/* Title */}
        <h2 className="project-modal-title">
          {project.title}
        </h2>

        <p className="project-modal-headline">
          {caseStudy?.headline || project.description}
        </p>

        {/* Meta Grid */}
        <div className="project-modal-meta-grid">
          {caseStudy?.client && (
            <div className="project-modal-meta-item">
              <div className="meta-item-label">Client / Context</div>
              <div className="meta-item-value">{caseStudy.client}</div>
            </div>
          )}
          {caseStudy?.timeline && (
            <div className="project-modal-meta-item">
              <div className="meta-item-label">Timeline</div>
              <div className="meta-item-value">{caseStudy.timeline}</div>
            </div>
          )}
          {caseStudy?.role && (
            <div className="project-modal-meta-item">
              <div className="meta-item-label">Role</div>
              <div className="meta-item-value">{caseStudy.role}</div>
            </div>
          )}
        </div>

        {/* Project Image Banner */}
        <div className="project-modal-image-banner">
          <img
            src={project.image}
            alt={project.title}
          />
        </div>

        {/* Key Metrics */}
        {caseStudy?.metrics && (
          <div className="project-modal-section">
            <h3 className="project-modal-section-title">
              <Layers size={20} style={{ color: 'var(--accent)' }} />
              Key System Performance Metrics
            </h3>
            <div className="project-modal-metrics-grid">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="project-modal-metric-card">
                  <div className="metric-card-value">
                    {m.value}
                  </div>
                  <div className="metric-card-label">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Highlights */}
        {caseStudy?.highlights && (
          <div className="project-modal-section">
            <h3 className="project-modal-section-title">
              <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
              Architectural Capabilities & Implementation
            </h3>
            <div className="project-modal-highlights-list">
              {caseStudy.highlights.map((h, idx) => (
                <div key={idx} className="project-modal-highlight-item">
                  <div className="highlight-dot" />
                  <p className="highlight-text">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Architecture */}
        {caseStudy?.architecture && (
          <div className="project-modal-section">
            <h3 className="project-modal-section-title">
              <Server size={20} style={{ color: 'var(--accent)' }} />
              Stack & Pipeline Breakdown
            </h3>
            <div className="project-modal-arch-list">
              {caseStudy.architecture.map((arch, idx) => (
                <div key={idx} className="project-modal-arch-item">
                  {arch}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="project-modal-section">
          <h3 className="project-modal-section-title" style={{ fontSize: '1.05rem' }}>Technologies Employed</h3>
          <div className="project-modal-tech-tags">
            {project.tech.map((t, idx) => (
              <span key={idx} className="skill-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="project-modal-footer">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
            >
              <GithubIcon size={18} />
              View on GitHub
            </a>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
            style={{ justifyContent: 'center' }}
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
