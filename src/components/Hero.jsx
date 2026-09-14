import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Milestone, Mail, FileDown, Terminal as TerminalIcon, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_CONFIG, TYPING_TITLES } from '../data/portfolioData';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useToast } from '../context/ToastContext';
import { InteractiveTerminal } from './InteractiveTerminal';
import { DecryptedText } from './reactbits/DecryptedText';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';

export const Hero = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const typedText = useTypingEffect(TYPING_TITLES, 65, 35, 2000);
  const { addToast } = useToast();
  const [visualMode, setVisualMode] = useState('profile'); // 'profile' | 'terminal'

  // Interactive Particle Background Animation with Cursor Constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroElem = heroRef.current;
    if (!canvas || !heroElem) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: -9999, y: -9999, radius: 140 };
    let shockwaves = [];

    const resize = () => {
      canvas.width = heroElem.offsetWidth;
      canvas.height = heroElem.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 13000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 2 + 1,
          glow: Math.random() > 0.65
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 160,
        opacity: 0.65
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const computedStyle = getComputedStyle(document.documentElement);
      const particleColor = (computedStyle.getPropertyValue('--accent') || '#10b981').trim();
      const lineColor = (computedStyle.getPropertyValue('--accent-secondary') || '#38bdf8').trim();

      // Render expanding shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = particleColor;
        ctx.globalAlpha = sw.opacity;
        ctx.lineWidth = 2;
        ctx.stroke();

        sw.radius += 4;
        sw.opacity *= 0.94;
        if (sw.opacity < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundary
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse proximity interaction (gentle attraction / constellation strand)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          // Constellation web connector to cursor
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = particleColor;
          ctx.globalAlpha = (1 - distMouse / mouse.radius) * 0.45;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Subtle attraction spring
          const force = (1 - distMouse / mouse.radius) * 0.4;
          p.x += (dxMouse / distMouse) * force;
          p.y += (dyMouse / distMouse) * force;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.glow ? particleColor : lineColor;
        ctx.globalAlpha = p.glow ? 0.75 : 0.4;
        ctx.fill();

        // Connect adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = (1 - dist / 115) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    heroElem.addEventListener('mousemove', handleMouseMove);
    heroElem.addEventListener('mouseleave', handleMouseLeave);
    heroElem.addEventListener('click', handleClick);

    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      heroElem.removeEventListener('mousemove', handleMouseMove);
      heroElem.removeEventListener('mouseleave', handleMouseLeave);
      heroElem.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDownloadResume = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.65 }
      });
    } catch (e) {
      // Confetti fallback
    }
    addToast('Downloading Curriculum Vitae...', 'success');
  };

  return (
    <section className="hero section" id="hero" ref={heroRef}>
      <div className="hero-bg"></div>
      <canvas
        ref={canvasRef}
        id="particles-canvas"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      ></canvas>

      <div className="container hero-content">
        <div className="hero-text">
          {/* Live Status Pill with ShinyText */}
          <div className="hero-status-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'var(--accent-subtle)', border: '1px solid var(--border-accent)', marginBottom: '16px' }}>
            <span className="live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', animation: 'pulseGlow 2s infinite' }}></span>
            <ShinyText shimmerColor="#d97706" speed={3}>
              <span style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)' }}>
                AVAILABLE FOR ENTERPRISE &amp; AI ROLES
              </span>
            </ShinyText>
          </div>

          <h1 className="hero-name-editorial">
            <DecryptedText
              text="Shabeeb Ahammed KT"
              speed={35}
              maxIterations={16}
              animateOn="hover"
            />
          </h1>

          <div className="hero-headline-sub">
            Full Stack <span className="gradient-text">Python &amp; Next.js</span> Engineer
          </div>

          <div className="hero-title-wrapper">
            <span className="terminal-prompt-sym">&gt;</span>
            <span className="hero-typed">{typedText}</span>
            <span className="typed-cursor">_</span>
          </div>

          <p className="hero-description">
            Architecting scalable enterprise ERP workflows, high-throughput Django REST APIs (sub-45ms P95),
            and real-time YOLOv8 computer vision models with high-performance Next.js interfaces.
          </p>

          <div className="hero-actions">
            <Magnet magnetStrength={0.25} activeRadius={100}>
              <a href="#projects" className="btn btn-primary magnetic">
                <Briefcase size={18} />
                Explore Engineering Work
              </a>
            </Magnet>

            <Magnet magnetStrength={0.25} activeRadius={100}>
              <a href="#experience" className="btn btn-secondary magnetic">
                <Milestone size={18} />
                Career Milestones
              </a>
            </Magnet>
          </div>

          <div className="hero-socials">
            {/* Email */}
            <a
              href={PORTFOLIO_CONFIG.mailtoUrl}
              className="btn-icon magnetic"
              aria-label="Compose Email"
              title="Compose Email"
            >
              <Mail size={19} />
            </a>

            {/* WhatsApp */}
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon magnetic"
              aria-label="WhatsApp"
              title="WhatsApp Direct"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#25d366">
                <path d="M12.031 0C5.408 0 0.031 5.377 0.031 12c0 2.115.553 4.184 1.605 6.007L0 24l6.177-1.62c1.76 0.96 3.753 1.467 5.854 1.467 6.624 0 12-5.377 12-12s-5.376-12-11.969-12zm0 21.808c-1.838 0-3.639-.494-5.207-1.428l-.374-.222-3.869 1.015 1.033-3.771-.244-.388A9.774 9.774 0 012.23 12c0-5.405 4.396-9.808 9.801-9.808 5.405 0 9.801 4.403 9.801 9.808 0 5.405-4.396 9.808-9.801 9.808zm5.374-7.348c-.295-.148-1.745-.861-2.015-.96-.27-.098-.466-.148-.663.148-.197.295-.762.96-.934 1.157-.172.197-.344.222-.639.074s-1.248-.46-2.378-1.468c-.879-.784-1.473-1.753-1.645-2.048-.172-.295-.018-.455.13-.602.133-.133.295-.344.443-.516.148-.172.197-.295.295-.492.098-.197.049-.369-.025-.516-.074-.148-.663-1.599-.909-2.191-.239-.577-.482-.499-.663-.508l-.565-.01c-.197 0-.516.074-.786.369s-1.033 1.009-1.033 2.461c0 1.452 1.057 2.855 1.205 3.052.148.197 2.08 3.176 5.039 4.455.704.305 1.254.487 1.683.623.708.225 1.352.193 1.862.117.568-.085 1.745-.714 1.991-1.403.246-.689.246-1.279.172-1.403-.074-.124-.27-.197-.565-.345z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={PORTFOLIO_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon magnetic"
              aria-label="GitHub Profile"
              title="GitHub (shabeebss)"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={PORTFOLIO_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon magnetic"
              aria-label="LinkedIn Profile"
              title="LinkedIn (shabeebahammed)"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Resume Download with Confetti */}
            <a
              href={PORTFOLIO_CONFIG.resumePath}
              download="Shabeeb_Resume.pdf"
              onClick={handleDownloadResume}
              className="btn-icon magnetic"
              aria-label="Download Resume"
              title="Download CV (PDF) & Confetti"
            >
              <FileDown size={19} />
            </a>
          </div>
        </div>

        {/* Visual Right Column: Interactive Mode Switcher & Content */}
        <div className="hero-visual">
          <div className="hero-visual-toggle-bar">
            <button
              type="button"
              className={`visual-toggle-pill ${visualMode === 'terminal' ? 'active' : ''}`}
              onClick={() => setVisualMode('terminal')}
            >
              <TerminalIcon size={14} />
              <span>Live Terminal</span>
            </button>
            <button
              type="button"
              className={`visual-toggle-pill ${visualMode === 'profile' ? 'active' : ''}`}
              onClick={() => setVisualMode('profile')}
            >
              <User size={14} />
              <span>Profile Showcase</span>
            </button>
          </div>

          {visualMode === 'terminal' ? (
            <InteractiveTerminal />
          ) : (
            <div className="hero-profile-showcase animate-scale-in">
              <div className="hero-ambient-aura" />

              <div className="executive-card">
                {/* Header with Live Status & Role Tag */}
                <div className="executive-card-header">
                  <div className="executive-status-tag">
                    <span className="pulse-dot"></span>
                    <span>{PORTFOLIO_CONFIG.status.text}</span>
                  </div>
                  <div className="executive-role-pill">Full Stack Engineer</div>
                </div>

                {/* Squircle Framed Portrait with Lighting Sheen */}
                <div className="executive-portrait-wrapper">
                  <div className="portrait-squircle-ring">
                    <img
                      src={PORTFOLIO_CONFIG.profileImage}
                      alt={`${PORTFOLIO_CONFIG.name} — Full Stack Developer`}
                      className="executive-portrait-img"
                      loading="eager"
                    />
                    <div className="portrait-sheen"></div>
                  </div>
                </div>

                {/* Developer Identity */}
                <div className="executive-identity">
                  <h3 className="executive-name">{PORTFOLIO_CONFIG.name}</h3>
                  <p className="executive-spec">Full Stack Python &amp; Next.js Architecture</p>
                </div>

                {/* Redesigned Core Competency Titles Dock */}
                <div className="executive-skills-dock">
                  <div className="dock-chip" title="Enterprise Backend Architecture">
                    <span className="dock-dot emerald"></span>
                    <div className="dock-info">
                      <span className="dock-title">Django REST</span>
                      <span className="dock-sub">Python Enterprise</span>
                    </div>
                  </div>

                  <div className="dock-chip" title="Modern Frontend Engineering">
                    <span className="dock-dot cyan"></span>
                    <div className="dock-info">
                      <span className="dock-title">Next.js 14</span>
                      <span className="dock-sub">React &amp; App Router</span>
                    </div>
                  </div>

                  <div className="dock-chip" title="High-Performance Relational DB">
                    <span className="dock-dot amber"></span>
                    <div className="dock-info">
                      <span className="dock-title">PostgreSQL 16</span>
                      <span className="dock-sub">High-Scale Data</span>
                    </div>
                  </div>

                  <div className="dock-chip" title="Computer Vision & Real-Time AI">
                    <span className="dock-dot purple"></span>
                    <div className="dock-info">
                      <span className="dock-title">YOLOv8</span>
                      <span className="dock-sub">Computer Vision AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

