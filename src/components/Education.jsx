import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Cloud, 
  Code2, 
  Milestone, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

const certIcons = {
  Cloud,
  Code2
};

const ACADEMIC_ROADMAP_STEPS = [
  {
    step: 1,
    id: 'bcom',
    phase: 'Phase 1: 2019 — 2022',
    degree: 'Bachelor of Commerce (B.Com)',
    institution: 'University of Calicut',
    location: 'Malappuram, Kerala',
    period: 'Jul 2019 — May 2022',
    gradeLabel: 'GPA: 5.90 / 10.00',
    scorePercent: 59,
    scoreDisplay: '5.90',
    scoreSub: '/ 10.00 GPA',
    badge: 'Undergraduate Foundation',
    icon: Users,
    summary: 'Built interdisciplinary foundations in organizational commerce while stepping into student technology leadership as CEO of the college Innovation & Entrepreneurship Development Cell (IEDC).',
    leadership: 'Served as CEO of the Innovation & Entrepreneurship Development Cell (IEDC) at college, leading hands-on workshops on Arduino Uno. Founded and led student tech community StackHub, and actively contributed to TinkerHub tech meetups.',
    highlights: [
      'CEO of College Innovation & Entrepreneurship Cell (IEDC)',
      'Founded StackHub student tech community',
      'Conducted hands-on hardware & open-source Arduino workshops'
    ]
  },
  {
    step: 2,
    id: 'gtech',
    phase: 'Phase 2: 2022 — 2023',
    degree: 'Python Django Full Stack Development',
    institution: 'G-Tech Computer Education',
    location: 'Pattambi, Kerala',
    period: 'Aug 2022 — Mar 2023',
    gradeLabel: 'Grade: A+ (Distinction)',
    scorePercent: 95,
    scoreDisplay: 'A+',
    scoreSub: 'Distinction Grade',
    badge: 'Professional Software Specialization',
    icon: Code2,
    summary: 'Underwent rigorous immersion in backend systems engineering, relational database schema architecture, Django MVC workflows, and asynchronous REST integration.',
    coursework: [
      'Python OOP & Algorithms',
      'Django Web Framework',
      'MySQL Relational Modeling',
      'REST APIs & Asynchronous Flow',
      'JavaScript ES6 & DOM',
      'Responsive HTML5 / CSS3'
    ],
    highlights: [
      'Graduated with highest academic distinction (Grade A+)',
      'Built production-ready CRUD systems with relational constraints',
      'Mastered full-stack request-response lifecycle & authentication'
    ]
  },
  {
    step: 3,
    id: 'mca',
    phase: 'Phase 3: 2023 — 2025',
    degree: 'Master of Computer Application (MCA)',
    institution: 'APJ Abdul Kalam Technological University',
    location: 'Malappuram, Kerala',
    period: 'Aug 2023 — May 2025',
    gradeLabel: 'GPA: 7.67 / 10.00',
    scorePercent: 76.7,
    scoreDisplay: '7.67',
    scoreSub: '/ 10.00 GPA',
    badge: 'Master of Computer Applications',
    icon: GraduationCap,
    summary: 'Comprehensive graduate study specializing in Data Structures, Advanced Relational Databases, Operating System internals, Machine Learning, and Computer Vision architectures.',
    coursework: [
      'Data Structures & Algorithms',
      'DBMS & SQL Optimization',
      'OOP Architecture & Design Patterns',
      'Artificial Intelligence & Deep Learning',
      'Operating Systems & Concurrency',
      'Cloud Computing & Distributed Systems'
    ],
    highlights: [
      'Graduated Master of Computer Applications with 7.67 GPA',
      'Engineered YOLOv8 deep learning vision surveillance pipelines',
      'Published projects in computer vision & real-time route optimization'
    ]
  },
  {
    step: 4,
    id: 'certs',
    phase: 'Phase 4: Verified Credentials',
    degree: 'Premier Certifications & Cloud Mastery',
    institution: 'IIT Kanpur & Industry Accredited Bodies',
    location: 'India / Online Verified',
    period: '2023 — Verified',
    gradeLabel: '100% Verified Credentials',
    scorePercent: 100,
    scoreDisplay: '100%',
    scoreSub: 'Verified Credential',
    badge: 'Premier Academic Accreditations',
    icon: Award,
    summary: 'Rigorous national credentials in Cloud Computing from premier institute IIT Kanpur and enterprise Python Django engineering.',
    credentials: CERTIFICATIONS,
    highlights: [
      'Cloud Computing Certification from IIT Kanpur (Premier Indian Institute)',
      'Verified Full Stack Python Django Certification from G-Tech',
      'Continuous advanced microservices & AI agent architecture training'
    ]
  }
];

export const Education = () => {
  const [viewMode, setViewMode] = useState('roadmap'); // 'roadmap' | 'grid'
  const [selectedStep, setSelectedStep] = useState(3); // Default to MCA Graduate degree (Step 3)

  const activeMilestone = ACADEMIC_ROADMAP_STEPS.find((s) => s.step === selectedStep) || ACADEMIC_ROADMAP_STEPS[2];
  const StepIcon = activeMilestone.icon || GraduationCap;

  // Circular progress calculations for SVG ring
  const circleRadius = 42;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (activeMilestone.scorePercent / 100) * circumference;

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Academic Credentials & Milestones</span>
          <h2 className="section-title">Education Roadmap</h2>
          <p className="section-description">
            Formal graduate education in computer applications, foundational engineering credentials, and premier institute certifications.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="edu-tab-toggle-wrapper reveal">
          <div className="experience-tab-toggle-pill">
            <button
              type="button"
              onClick={() => setViewMode('roadmap')}
              className={`experience-toggle-btn ${viewMode === 'roadmap' ? 'active' : ''}`}
            >
              <Milestone size={16} />
              <span>Roadmap Journey</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`experience-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <Layers size={16} />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            VIEW 1: INTERACTIVE ACADEMIC ROADMAP VIEW
           ========================================================= */}
        {viewMode === 'roadmap' && (
          <div className="edu-roadmap-container reveal">
            {/* Step Navigation Ribbon */}
            <div className="edu-roadmap-step-bar">
              {ACADEMIC_ROADMAP_STEPS.map((item) => {
                const isSelected = selectedStep === item.step;
                const IconC = item.icon || GraduationCap;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setSelectedStep(item.step)}
                    className={`edu-roadmap-step-btn ${isSelected ? 'active' : ''}`}
                  >
                    <div className={`edu-step-badge ${isSelected ? 'selected' : ''}`}>
                      <IconC size={18} />
                      {isSelected && <span className="edu-step-pulse-ring" />}
                    </div>

                    <span className="edu-step-phase">Step {item.step}</span>
                    <span className="edu-step-title">{item.institution.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Deep-Dive Card */}
            <div className="edu-milestone-card spotlight-card">
              {/* Card Header */}
              <div className="edu-milestone-header">
                <div className="edu-milestone-badge-row">
                  <span className="edu-phase-pill">
                    <Sparkles size={13} /> {activeMilestone.phase}
                  </span>
                  <span className="edu-status-badge">
                    {activeMilestone.badge}
                  </span>
                </div>

                <div className="edu-milestone-title-group">
                  <h3 className="edu-milestone-degree">{activeMilestone.degree}</h3>
                  <div className="edu-milestone-institution">
                    <strong>{activeMilestone.institution}</strong>
                  </div>
                  <div className="edu-milestone-meta">
                    <span>
                      <Calendar size={14} /> {activeMilestone.period}
                    </span>
                    <span>
                      <MapPin size={14} /> {activeMilestone.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body: Split Grid with Circular GPA Score Meter & Details */}
              <div className="edu-milestone-grid">
                {/* Left Column: Grade Score Circle & Summary */}
                <div className="edu-milestone-left">
                  <div className="edu-score-card">
                    {/* Animated Circular SVG Ring */}
                    <div className="edu-score-ring-wrapper">
                      <svg className="edu-score-svg" width="110" height="110" viewBox="0 0 100 100">
                        {/* Background Track Circle */}
                        <circle
                          className="edu-score-circle-bg"
                          cx="50"
                          cy="50"
                          r={circleRadius}
                          strokeWidth="8"
                        />
                        {/* Animated Glowing Progress Circle */}
                        <circle
                          className="edu-score-circle-progress"
                          cx="50"
                          cy="50"
                          r={circleRadius}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="edu-score-readout">
                        <span className="edu-score-val">{activeMilestone.scoreDisplay}</span>
                        <span className="edu-score-sub">{activeMilestone.scoreSub}</span>
                      </div>
                    </div>

                    <div className="edu-score-info">
                      <span className="edu-score-label">Academic Achievement</span>
                      <h4>{activeMilestone.gradeLabel}</h4>
                      <p>{activeMilestone.summary}</p>
                    </div>
                  </div>

                  {/* Highlights List */}
                  {activeMilestone.highlights && (
                    <div className="edu-highlights-list">
                      <span className="edu-section-mini-title">Key Milestones & Outcomes</span>
                      {activeMilestone.highlights.map((item, idx) => (
                        <div key={idx} className="edu-highlight-item">
                          <CheckCircle2 size={16} className="edu-highlight-icon" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Coursework or Credentials or Community */}
                <div className="edu-milestone-right">
                  {/* Coursework Modules (if present) */}
                  {activeMilestone.coursework && (
                    <div className="edu-coursework-container">
                      <span className="edu-section-mini-title">
                        <BookOpen size={15} /> Core Curriculum & Competencies
                      </span>
                      <div className="edu-coursework-pills">
                        {activeMilestone.coursework.map((course, idx) => (
                          <span key={idx} className="edu-course-chip spotlight-card">
                            <span className="course-dot"></span>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verified Certifications Showcase (if step 4) */}
                  {activeMilestone.credentials && (
                    <div className="edu-credentials-container">
                      <span className="edu-section-mini-title">
                        <ShieldCheck size={15} /> Verified Institutional Credentials
                      </span>
                      <div className="edu-credentials-grid">
                        {activeMilestone.credentials.map((cert) => {
                          const CertIcon = certIcons[cert.icon] || Award;
                          return (
                            <div key={cert.id} className="edu-cred-card spotlight-card">
                              <div className="edu-cred-icon">
                                <CertIcon size={22} />
                              </div>
                              <div className="edu-cred-body">
                                <h5>{cert.title}</h5>
                                <span className="edu-cred-issuer">
                                  <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                                  {cert.issuer} ({cert.year})
                                </span>
                                <span className="edu-cred-badge">{cert.badge}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Community Leadership Callout (for B.Com) */}
                  {activeMilestone.leadership && (
                    <div className="edu-leadership-callout spotlight-card">
                      <div className="leadership-badge">
                        <Users size={16} /> Tech Community & Student Leadership
                      </div>
                      <p>{activeMilestone.leadership}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            VIEW 2: CLASSIC GRID VIEW (SIDE BY SIDE)
           ========================================================= */}
        {viewMode === 'grid' && (
          <div className="edu-cert-grid reveal">
            {/* Formal Education Column */}
            <div className="edu-column reveal-left">
              <h3 className="edu-column-title">
                <GraduationCap size={24} />
                Formal Education
              </h3>

              <div className="edu-list">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="edu-card spotlight-card">
                    <div className="edu-card-header">
                      <span className="edu-degree">{edu.degree}</span>
                      <span className="edu-gpa-badge">{edu.grade}</span>
                    </div>
                    <div className="edu-institution">{edu.institution}</div>
                    <div className="edu-meta-row">
                      <span>
                        <Calendar size={14} />
                        {edu.period}
                      </span>
                      <span>
                        <MapPin size={14} />
                        {edu.location}
                      </span>
                    </div>

                    {edu.coursework && (
                      <div className="edu-coursework">
                        <span className="edu-coursework-label">
                          {edu.id === 'mca' ? 'Relevant Coursework' : 'Core Modules'}
                        </span>
                        <div className="edu-coursework-tags">
                          {edu.coursework.map((course, idx) => (
                            <span key={idx} className="edu-course-tag">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {edu.leadership && (
                      <div className="edu-leadership-box">
                        <strong>Leadership & Tech Community:</strong> {edu.leadership}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div className="edu-column reveal-right">
              <h3 className="cert-column-title">
                <Award size={24} />
                Certifications & Credentials
              </h3>

              <div className="cert-list">
                {CERTIFICATIONS.map((cert) => {
                  const CertIcon = certIcons[cert.icon] || Award;
                  return (
                    <div key={cert.id} className="cert-card spotlight-card">
                      <div className="cert-icon-wrapper">
                        <CertIcon size={24} />
                      </div>
                      <div className="cert-content">
                        <div className="cert-title">{cert.title}</div>
                        <div className="cert-issuer">
                          <ShieldCheck size={15} style={{ color: 'var(--accent)' }} />
                          {cert.issuer}
                        </div>
                        <div className="cert-footer">
                          <span>Issued: {cert.year}</span>
                          <span className="cert-badge-pill">{cert.badge}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

