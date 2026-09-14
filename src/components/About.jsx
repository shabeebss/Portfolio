import React from 'react';
import { 
  Server, 
  Cpu, 
  Database, 
  Code2, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  Building2, 
  ArrowUpRight 
} from 'lucide-react';
import { PORTFOLIO_CONFIG, STATS } from '../data/portfolioData';
import { CountUp } from './CountUp';

export const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-subtitle">Systems Philosophy & Track Record</span>
          <h2 className="section-title">Backend Precision,<br />Modern Engineering</h2>
          <p className="section-description">
            Building resilient distributed backend architectures, relational enterprise ERP systems, and low-latency computer vision pipelines.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="about-bento-grid">
          {/* Bento Tile 1: Primary Engineering Narrative */}
          <div className="bento-card bento-story spotlight-card reveal-left">
            <div className="bento-badge">
              <Sparkles size={14} /> Full Stack Systems Engineer
            </div>
            <h3>Architecting enterprise systems & real-time intelligent applications</h3>
            <p>
              I specialize in Python and Django backend engineering with deep production experience building multi-tenant ERP platforms, commercial e-commerce systems, and computer vision AI solutions. My core philosophy centers on clean relational domain modeling, performant query pipelines, strict type safety, and intuitive user experiences.
            </p>
            <p>
              Currently architecting enterprise ERP modules at <strong>Exouzia</strong> using Python, Django REST Framework, PostgreSQL, Next.js, and PrimeReact. I specialize in high-complexity workflows—from automated FIFO inventory batch valuation and double-entry accounting ledgers to sub-45ms P95 query response optimization.
            </p>

            <div className="bento-tech-pills">
              <span className="bento-pill">Python & Django REST</span>
              <span className="bento-pill">PostgreSQL 16</span>
              <span className="bento-pill">Next.js & React</span>
              <span className="bento-pill">YOLOv8 Computer Vision</span>
            </div>
          </div>

          {/* Bento Tile 2: Live Quantifiable Metrics */}
          <div className="bento-card bento-stats spotlight-card reveal-right">
            <div className="bento-badge">
              <Zap size={14} /> Quantifiable Impact
            </div>
            
            <div className="bento-stats-grid">
              {STATS.map((stat, idx) => (
                <div key={idx} className="bento-stat-item">
                  <div className="bento-stat-number">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="bento-stat-label">{stat.label}</div>
                </div>
              ))}
              
              <div className="bento-stat-item">
                <div className="bento-stat-number">
                  <span className="stat-prefix">&lt;</span>
                  <CountUp end={45} suffix="ms" />
                </div>
                <div className="bento-stat-label">P95 Database Query Response</div>
              </div>
            </div>
          </div>

          {/* Bento Tile 3: Core Engineering Pillars */}
          <div className="bento-card bento-pillars spotlight-card reveal">
            <div className="bento-badge">
              <Database size={14} /> Core Engineering Competencies
            </div>
            
            <div className="bento-pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon">
                  <Server size={20} />
                </div>
                <div>
                  <h4>Relational Domain Modeling</h4>
                  <p>Strict schema constraints, automated FIFO inventory valuation, and balanced double-entry accounting balances.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">
                  <Zap size={20} />
                </div>
                <div>
                  <h4>High-Throughput REST APIs</h4>
                  <p>Indexed PostgreSQL pipelines, query prefetching, JWT role-based access control (RBAC), and webhook verification.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4>Real-Time AI Vision Systems</h4>
                  <p>Production deployment of YOLOv8 and CNN models for real-time video surveillance and threat detection @ 30+ FPS.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Tile 4: Current Status & Location */}
          <div className="bento-card bento-status spotlight-card reveal">
            <div className="bento-status-inner">
              <div className="status-avatar-circle">
                <Building2 size={24} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <span className="bento-mini-tag">Active Production Role</span>
                <h4>Backend Engineer @ Exouzia</h4>
                <p>Pattambi / Malappuram, Kerala • Open to Global High-Impact Roles</p>
              </div>
              <a href="#contact" className="bento-action-link" aria-label="Connect with Shabeeb">
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

