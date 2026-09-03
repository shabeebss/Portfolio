import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, ShieldCheck, Cloud, Code2 } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

const certIcons = {
  Cloud,
  Code2
};

export const Education = () => {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Academic Credentials</span>
          <h2 className="section-title">Education & Certifications</h2>
          <p className="section-description">
            Formal academic training in computer applications and verified credentials from premier institutions.
          </p>
        </div>

        <div className="edu-cert-grid">
          {/* Education Column */}
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
      </div>
    </section>
  );
};
