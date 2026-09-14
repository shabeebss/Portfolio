import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, Server, Layout, Cpu, Database, Layers, Play } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

// 3D Glass Tool Tiles matching video screenshot
const UNIVERSE_TILES = [
  {
    id: 'figma',
    name: 'Figma',
    size: 'large',
    icon: (
      <svg width="42" height="42" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#0ACF83" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#1ABCFE" />
        <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#EA4C89" />
        <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" />
        <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
      </svg>
    ),
    positionClass: 'tile-figma'
  },
  {
    id: 'claude',
    name: 'Claude',
    size: 'large',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="#EFA224">
        <path d="M12 2L14.2 9.4L21.6 7.2L16.6 12.8L22 17.5L14.7 16.5L13.8 24L10.2 16.5L2.9 17.5L8.3 12.8L3.3 7.2L10.7 9.4L12 2Z" />
      </svg>
    ),
    positionClass: 'tile-claude'
  },
  {
    id: 'ae',
    name: 'Ae',
    size: 'medium',
    color: '#9999FF',
    badgeText: 'After Effects',
    positionClass: 'tile-ae'
  },
  {
    id: 'pr',
    name: 'Pr',
    size: 'medium',
    color: '#9999FF',
    badgeText: 'Premiere Pro',
    positionClass: 'tile-pr'
  },
  {
    id: 'openai',
    name: 'ChatGPT',
    size: 'medium',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
      </svg>
    ),
    positionClass: 'tile-openai'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    size: 'medium',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
        <path d="M3 17l4-9 4 4 4-8 6 13H3z" />
      </svg>
    ),
    positionClass: 'tile-midjourney'
  },
  {
    id: 'spline',
    name: 'Spline',
    size: 'small',
    color: '#FF5E89',
    positionClass: 'tile-spline'
  },
  {
    id: 'notion',
    name: 'Notion',
    size: 'small',
    color: '#FFFFFF',
    positionClass: 'tile-notion'
  },
  {
    id: 'webflow',
    name: 'Webflow',
    size: 'small',
    color: '#146EF5',
    positionClass: 'tile-webflow'
  },
  {
    id: 'lr',
    name: 'Lr',
    size: 'small',
    color: '#31A8FF',
    positionClass: 'tile-lr'
  }
];

export const Skills = () => {
  const canvasRef = useRef(null);

  // 3D Canvas Universe Particle Mesh Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D Floating Particle Embers
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 200,
      radius: Math.random() * 2.5 + 1,
      speedY: (Math.random() - 0.5) * 0.6,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() > 0.5 ? '#ff3b00' : '#ff7a00'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3D Floating Ember Nodes
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.hue;
        ctx.shadowBlur = 12;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="section creative-universe-section" id="skills">
      <div className="container">
        {/* Section Header Matching Video Serif Typography */}
        <div className="universe-header reveal text-center">
          <span className="universe-supertitle">ICONS OF</span>
          <h2 className="universe-maintitle">THE CREATIVE UNIVERSE</h2>
          <div className="universe-subdots">
            <span>TOOLS</span> • <span>SKILLS</span> • <span>PEOPLE</span> • <span>IMPACT</span>
          </div>
        </div>

        {/* Full 3D Glass Tiles Universe Viewport */}
        <div className="universe-3d-viewport reveal">
          {/* Animated 3D Particles Canvas */}
          <canvas
            ref={canvasRef}
            className="universe-canvas-3d"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
          />

          {/* Glowing Orange Ring Thread Path */}
          <div className="fiery-ring-thread-container">
            <svg className="fiery-ring-svg" viewBox="0 0 900 450" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fieryThreadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3b00" stopOpacity="0.3" />
                  <stop offset="40%" stopColor="#ff7a00" stopOpacity="1" />
                  <stop offset="70%" stopColor="#ffa800" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ff3b00" stopOpacity="0.4" />
                </linearGradient>
                <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Elliptical Ring Loop around Center Silhouette */}
              <ellipse
                cx="450"
                cy="230"
                rx="340"
                ry="130"
                fill="none"
                stroke="url(#fieryThreadGrad)"
                strokeWidth="4"
                filter="url(#threadGlow)"
                className="animated-ring-ellipse"
              />
            </svg>
          </div>

          {/* Center Standing Silhouette Cutout */}
          <div className="universe-center-silhouette">
            <div className="silhouette-shadow-aura"></div>
            <img
              src={PORTFOLIO_CONFIG.profileImage}
              alt="Shabeeb Standing Cutout"
              className="silhouette-img"
            />
          </div>

          {/* Floating 3D Glassmorphism Cards */}
          <div className="universe-3d-tiles-container">
            {UNIVERSE_TILES.map((tile) => (
              <div
                key={tile.id}
                className={`glass-tile 3d-card ${tile.size} ${tile.positionClass}`}
              >
                <div className="glass-tile-inner spotlight-card">
                  {tile.icon ? (
                    <div className="glass-tile-icon-box">{tile.icon}</div>
                  ) : (
                    <div
                      className="glass-tile-text-badge"
                      style={{ color: tile.color || '#ffffff' }}
                    >
                      {tile.name}
                    </div>
                  )}

                  <span className="glass-tile-label">{tile.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

