import React from 'react';
import { PORTFOLIO_CONFIG, STATS } from '../data/portfolioData';

export const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">System Engineering & Philosophy</span>
          <h2 className="section-title">Backend Precision,<br />Frontend Craftsmanship</h2>
        </div>

        <div className="about-grid">
          <div className="about-image-wrapper reveal-left">
            <div className="about-image">
              <img
                src={PORTFOLIO_CONFIG.profileImage}
                alt={`${PORTFOLIO_CONFIG.name} engineering systems`}
              />
            </div>
          </div>

          <div className="about-content reveal-right">
            <h3>Architecting enterprise systems & real-time intelligent applications</h3>
            <p>
              I'm a Python Django Backend and Full Stack Developer with hands-on experience building
              enterprise ERP platforms, e-commerce architectures, and computer vision AI solutions.
              My engineering philosophy centers on clean relational domain modeling, performant query pipelines,
              strict type safety, and intuitive user experiences.
            </p>
            <p>
              Currently developing multi-tenant ERP and e-commerce systems at Exouzia using Python, Django REST Framework,
              PostgreSQL, React.js, Next.js, and PrimeReact. I specialize in solving high-complexity problems—from
              inventory batch lifecycles and double-entry accounting ledgers to real-time YOLO object detection models.
            </p>

            <div className="about-stats">
              {STATS.map((stat, index) => (
                <div key={index} className="stat-item spotlight-card">
                  <div className="stat-number">
                    {stat.value}
                    <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
