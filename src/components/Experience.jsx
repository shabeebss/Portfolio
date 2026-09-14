import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Sparkles,
  Server,
  Cpu,
  GraduationCap,
  Code2,
  CheckCircle2,
  CircleDot,
  ArrowRight,
  Milestone,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass
} from 'lucide-react';
import { EXPERIENCES, EXPERIENCE_ROADMAP } from '../data/portfolioData';
import { BrunoRoadmap3D } from './BrunoRoadmap3D';

const iconMap = {
  Code2,
  GraduationCap,
  Cpu,
  Server,
  Sparkles
};

export const Experience = () => {
  const [activeTab, setActiveTab] = useState('3d'); // '3d' | 'roadmap' | 'timeline'
  const [selectedStep, setSelectedStep] = useState(4); // Default to Current Active Stage (Step 4: Exouzia)

  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Career Progression & Milestones</span>
          <h2 className="section-title">Experience Roadmap</h2>
          <p className="section-description">
            A strategic engineering journey spanning foundational backend development, computer vision AI systems, and high-scale enterprise ERP platforms.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="experience-tab-toggle-wrapper reveal">
          <div className="experience-tab-toggle-pill">
            <button
              type="button"
              onClick={() => setActiveTab('3d')}
              className={`experience-toggle-btn ${activeTab === '3d' ? 'active' : ''}`}
            >
              <Compass size={16} />
              <span>🚗 3D Drive Mode (Bruno Simon)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`experience-toggle-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            >
              <Milestone size={16} />
              <span>Pipeline View</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className={`experience-toggle-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            >
              <Layers size={16} />
              <span>Timeline View</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            VIEW 1: BRUNO SIMON 3D DRIVE ROADMAP OR 2D PIPELINE
           ========================================================= */}
        {(activeTab === '3d' || activeTab === 'roadmap') && (
          <div className="roadmap-container reveal">
            {/* 3D Drive Simulator Canvas when in 3D Mode */}
            {activeTab === '3d' && (
              <div className="roadmap-3d-section-wrapper animate-fade-in" style={{ marginBottom: '32px' }}>
                <BrunoRoadmap3D
                  activeStep={selectedStep}
                  onSelectStep={(step) => setSelectedStep(step)}
                />
              </div>
            )}

            {/* Connected Animated Progression Pipeline when in 2D Mode */}
            {activeTab === 'roadmap' && (
              <div className="roadmap-pipeline-track animate-fade-in">
                {/* Pipeline Line Background & Animated Glowing Fill */}
                <div className="roadmap-line-rail">
                  <div
                    className="roadmap-line-fill"
                    style={{
                      width: `${((selectedStep - 1) / (EXPERIENCE_ROADMAP.length - 1)) * 100}%`
                    }}
                  >
                    <span className="roadmap-tracer-bead"></span>
                  </div>
                </div>

                {/* 5 Milestone Step Nodes */}
                <div className="roadmap-nodes-row">
                  {EXPERIENCE_ROADMAP.map((item) => {
                    const isSelected = selectedStep === item.step;
                    const isCompleted = item.step < selectedStep;
                    const isCurrent = item.statusType === 'active';
                    const IconComp = iconMap[item.icon] || Code2;

                    return (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => setSelectedStep(item.step)}
                        className={`roadmap-node-step ${isSelected ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      >
                        <div className="roadmap-node-marker">
                          <div className="roadmap-node-circle">
                            <IconComp size={18} />
                            {isCurrent && <span className="roadmap-node-live-pulse" />}
                          </div>
                          {isSelected && <div className="roadmap-node-aura-ring"></div>}
                        </div>

                        <div className="roadmap-node-info">
                          <span className="roadmap-node-badge">Phase 0{item.step}</span>
                          <h4 className="roadmap-node-name">{item.organization}</h4>
                          <span className="roadmap-node-dates">
                            {item.phase.split(': ')[1] || item.phase}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}


            {/* Selected Milestone Detailed Display Card */}
            {(() => {
              const currentMilestone = EXPERIENCE_ROADMAP.find((m) => m.step === selectedStep) || EXPERIENCE_ROADMAP[3];
              const IconComp = iconMap[currentMilestone.icon] || Code2;
              const isCurrent = currentMilestone.statusType === 'active';

              return (
                <div key={selectedStep} className="roadmap-detail-card spotlight-card roadmap-animate-in">
                  {/* Top Badges Bar */}
                  <div className="roadmap-card-badge-row">
                    <div className="roadmap-status-group">
                      <span className={`roadmap-status-pill ${isCurrent ? 'active' : ''}`}>
                        {isCurrent ? <CircleDot size={14} className="spin" /> : <CheckCircle2 size={14} />}
                        {currentMilestone.status}
                      </span>

                      <span className="roadmap-phase-pill">
                        {currentMilestone.phase}
                      </span>
                    </div>

                    <span className="roadmap-badge-label">
                      {currentMilestone.badge}
                    </span>
                  </div>

                  {/* Main Role Title & Org */}
                  <h3 className="roadmap-role-title">
                    {currentMilestone.title}
                  </h3>

                  <div className="roadmap-meta-row">
                    <span className="roadmap-org">
                      <Building2 size={16} style={{ color: 'var(--accent)' }} />
                      {currentMilestone.organization}
                    </span>
                    <span className="roadmap-location">
                      <MapPin size={15} />
                      {currentMilestone.location}
                    </span>
                  </div>

                  {/* Description Paragraph */}
                  <p className="roadmap-desc">
                    {currentMilestone.description}
                  </p>

                  {/* Key Milestones / Deliverables Grid */}
                  <div className="roadmap-deliverables-section">
                    <h4 className="roadmap-section-subtitle">
                      Key Engineering Deliverables & Accomplishments:
                    </h4>
                    <div className="roadmap-deliverables-grid">
                      {currentMilestone.milestones.map((m, idx) => (
                        <div key={idx} className="roadmap-deliverable-item">
                          <CheckCircle2 size={16} className="roadmap-item-icon" />
                          <span className="roadmap-item-text">
                            {m}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="roadmap-tech-section">
                    <h4 className="roadmap-tech-subtitle">
                      Domain Technologies & Tools:
                    </h4>
                    <div className="roadmap-tech-tags">
                      {currentMilestone.tech.map((t, idx) => (
                        <span key={idx} className="skill-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Controller Footer */}
                  <div className="roadmap-nav-footer">
                    <button
                      type="button"
                      className="btn-roadmap-nav"
                      disabled={selectedStep <= 1}
                      onClick={() => setSelectedStep((prev) => Math.max(1, prev - 1))}
                    >
                      <ChevronLeft size={16} />
                      <span>Previous Phase</span>
                    </button>

                    <div className="roadmap-step-dots">
                      {EXPERIENCE_ROADMAP.map((m) => (
                        <button
                          key={m.step}
                          type="button"
                          title={`Jump to Phase ${m.step}: ${m.organization}`}
                          onClick={() => setSelectedStep(m.step)}
                          className={`roadmap-dot ${selectedStep === m.step ? 'active' : ''}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="btn-roadmap-nav"
                      disabled={selectedStep >= EXPERIENCE_ROADMAP.length}
                      onClick={() => setSelectedStep((prev) => Math.min(EXPERIENCE_ROADMAP.length, prev + 1))}
                    >
                      <span>Next Phase</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =========================================================
            VIEW 2: DETAILED CHRONOLOGICAL TIMELINE VIEW
           ========================================================= */}
        {activeTab === 'timeline' && (
          <div className="timeline reveal">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card spotlight-card">
                  <div className="timeline-header-row">
                    <h3>{exp.role}</h3>
                    <span className="timeline-date">{exp.period}</span>
                  </div>

                  <div className="timeline-company-row">
                    <span className="timeline-company">
                      <Building2 size={16} />
                      {exp.company}
                    </span>
                    <span className="timeline-location">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                    <span className="timeline-status-badge">{exp.badge}</span>
                  </div>

                  <ul className="timeline-list">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>

                  <div className="timeline-tech-tags">
                    {exp.tech.map((t, idx) => (
                      <span key={idx} className="skill-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
