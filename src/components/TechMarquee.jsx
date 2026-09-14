import React from 'react';
import { 
  Server, 
  Cpu, 
  Database, 
  Layout, 
  CreditCard, 
  GitBranch, 
  Code2, 
  Cloud, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles 
} from 'lucide-react';

const TECH_ITEMS = [
  { name: 'Python 3.11', icon: Code2, label: 'Core Language' },
  { name: 'Django REST', icon: Server, label: 'Backend Framework' },
  { name: 'Next.js 14', icon: Layout, label: 'React Framework' },
  { name: 'PostgreSQL 16', icon: Database, label: 'Relational DB' },
  { name: 'YOLOv8 & OpenCV', icon: Cpu, label: 'AI Computer Vision' },
  { name: 'TypeScript', icon: Code2, label: 'Type Safety' },
  { name: 'PrimeReact', icon: Layers, label: 'Enterprise UI' },
  { name: 'Redis Cache', icon: Zap, label: 'In-Memory Store' },
  { name: 'Docker', icon: Cloud, label: 'Containerization' },
  { name: 'Razorpay Gateway', icon: CreditCard, label: 'Payments' },
  { name: 'Agile & CI/CD', icon: GitBranch, label: 'Engineering Sprint' },
  { name: 'Cloud Computing (IIT-K)', icon: ShieldCheck, label: 'IIT Kanpur Certified' }
];

export const TechMarquee = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="tech-marquee-section" aria-label="Technology Stack Ticker">
      <div className="marquee-fade-overlay left" />
      <div className="marquee-fade-overlay right" />

      <div className="tech-marquee-track">
        {marqueeItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={`${item.name}-${idx}`} className="marquee-chip">
              <span className="marquee-chip-icon">
                <IconComponent size={15} />
              </span>
              <span className="marquee-chip-name">{item.name}</span>
              <span className="marquee-chip-sep">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechMarquee;
