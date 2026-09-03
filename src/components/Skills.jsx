import React from 'react';
import { Server, Layout, Cpu, Database, CreditCard, GitBranch } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap = {
  Server,
  Layout,
  Cpu,
  Database,
  CreditCard,
  GitBranch
};

export const Skills = () => {
  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Technical Matrix</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-description">
            A battle-tested technology stack spanning scalable server backends, modern reactive frontends, AI vision models, and payment integrations.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.icon] || Server;
            return (
              <div key={category.id} className="skill-card spotlight-card reveal">
                <div className="skill-icon">
                  <IconComponent size={24} />
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="skill-tags">
                  {category.tags.map((tag, idx) => (
                    <span key={idx} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
