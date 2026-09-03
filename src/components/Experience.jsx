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
  Layers
} from 'lucide-react';
import { EXPERIENCES, EXPERIENCE_ROADMAP } from '../data/portfolioData';

const iconMap = {
  Code2,
  GraduationCap,
  Cpu,
  Server,
  Sparkles
};

export const Experience = () => {
  const [activeTab, setActiveTab] = useState('roadmap'); // 'roadmap' | 'timeline'
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
        <div 
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '4px',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeTab === 'roadmap' ? 'var(--gradient-accent)' : 'transparent',
                color: activeTab === 'roadmap' ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Milestone size={16} />
              <span>Interactive Roadmap</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeTab === 'timeline' ? 'var(--gradient-accent)' : 'transparent',
                color: activeTab === 'timeline' ? '#fff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Layers size={16} />
              <span>Detailed Timeline</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            VIEW 1: INTERACTIVE ROADMAP VIEW
           ========================================================= */}
        {activeTab === 'roadmap' && (
          <div className="roadmap-container reveal">
            {/* Horizontal Step Navigation Bar */}
            <div
              className="roadmap-step-bar"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${EXPERIENCE_ROADMAP.length}, 1fr)`,
                gap: '12px',
                marginBottom: '36px',
                position: 'relative'
              }}
            >
              {EXPERIENCE_ROADMAP.map((item) => {
                const isSelected = selectedStep === item.step;
                const isCurrent = item.statusType === 'active';
                const IconComp = iconMap[item.icon] || Code2;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setSelectedStep(item.step)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '16px 10px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--accent-subtle)' : 'var(--bg-surface)',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      position: 'relative'
                    }}
                  >
                    {/* Step Icon Badge */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: isSelected 
                          ? 'var(--accent)' 
                          : isCurrent 
                            ? 'var(--accent-subtle)' 
                            : 'var(--bg-secondary)',
                        color: isSelected 
                          ? '#ffffff' 
                          : isCurrent 
                            ? 'var(--accent)' 
                            : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        position: 'relative',
                        boxShadow: isCurrent ? '0 0 14px var(--glow-color)' : 'none'
                      }}
                    >
                      <IconComp size={18} />
                      {isCurrent && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#10b981',
                            border: '2px solid var(--bg-surface)'
                          }}
                        />
                      )}
                    </div>

                    {/* Step Phase Label */}
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: isSelected ? 'var(--accent)' : 'var(--text-tertiary)',
                        letterSpacing: '0.5px',
                        marginBottom: '2px'
                      }}
                    >
                      Phase {item.step}
                    </span>

                    {/* Short Title */}
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.organization}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Milestone Detailed Display Card */}
            {(() => {
              const currentMilestone = EXPERIENCE_ROADMAP.find((m) => m.step === selectedStep) || EXPERIENCE_ROADMAP[3];
              const IconComp = iconMap[currentMilestone.icon] || Code2;
              const isCurrent = currentMilestone.statusType === 'active';

              return (
                <div
                  className="spotlight-card animate-fade-in"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '36px',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Top Badges Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          background: isCurrent ? 'var(--accent)' : 'var(--accent-subtle)',
                          color: isCurrent ? '#ffffff' : 'var(--accent)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {isCurrent ? <CircleDot size={14} className="spin" /> : <CheckCircle2 size={14} />}
                        {currentMilestone.status}
                      </span>

                      <span
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          color: 'var(--text-tertiary)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-xs)',
                          background: 'var(--bg-surface)'
                        }}
                      >
                        {currentMilestone.phase}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--accent-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {currentMilestone.badge}
                    </span>
                  </div>

                  {/* Main Role Title & Org */}
                  <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {currentMilestone.title}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '22px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      <Building2 size={16} style={{ color: 'var(--accent)' }} />
                      {currentMilestone.organization}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} />
                      {currentMilestone.location}
                    </span>
                  </div>

                  {/* Description Paragraph */}
                  <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '28px' }}>
                    {currentMilestone.description}
                  </p>

                  {/* Key Milestones / Deliverables List */}
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-primary)', marginBottom: '14px' }}>
                      Key Engineering Deliverables & Accomplishments:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {currentMilestone.milestones.map((m, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            background: 'var(--bg-surface)',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border)'
                          }}
                        >
                          <CheckCircle2 size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {m}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
                      Domain Technologies & Tools:
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {currentMilestone.tech.map((t, idx) => (
                        <span key={idx} className="skill-tag">
                          {t}
                        </span>
                      ))}
                    </div>
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
