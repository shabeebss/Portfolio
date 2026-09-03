import React from 'react';
import { ArrowUp, Mail, FileDown } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)', padding: '60px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand Info */}
          <div>
            <a href="#hero" className="nav-logo" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              <span className="logo-dot"></span>
              {PORTFOLIO_CONFIG.name}
            </a>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: '340px' }}>
              Python Django Backend & Full Stack Engineer engineering scalable enterprise ERP systems, Next.js interfaces, and real-time computer vision AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color var(--transition-fast)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-primary)', marginBottom: '16px' }}>
              Connect & Engage
            </h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <a
                href={PORTFOLIO_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                title="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              <a
                href={PORTFOLIO_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a
                href={PORTFOLIO_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                title="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M12.031 0C5.408 0 0.031 5.377 0.031 12c0 2.115.553 4.184 1.605 6.007L0 24l6.177-1.62c1.76 0.96 3.753 1.467 5.854 1.467 6.624 0 12-5.377 12-12s-5.376-12-11.969-12zm0 21.808c-1.838 0-3.639-.494-5.207-1.428l-.374-.222-3.869 1.015 1.033-3.771-.244-.388A9.774 9.774 0 012.23 12c0-5.405 4.396-9.808 9.801-9.808 5.405 0 9.801 4.403 9.801 9.808 0 5.405-4.396 9.808-9.801 9.808zm5.374-7.348c-.295-.148-1.745-.861-2.015-.96-.27-.098-.466-.148-.663.148-.197.295-.762.96-.934 1.157-.172.197-.344.222-.639.074s-1.248-.46-2.378-1.468c-.879-.784-1.473-1.753-1.645-2.048-.172-.295-.018-.455.13-.602.133-.133.295-.344.443-.516.148-.172.197-.295.295-.492.098-.197.049-.369-.025-.516-.074-.148-.663-1.599-.909-2.191-.239-.577-.482-.499-.663-.508l-.565-.01c-.197 0-.516.074-.786.369s-1.033 1.009-1.033 2.461c0 1.452 1.057 2.855 1.205 3.052.148.197 2.08 3.176 5.039 4.455.704.305 1.254.487 1.683.623.708.225 1.352.193 1.862.117.568-.085 1.745-.714 1.991-1.403.246-.689.246-1.279.172-1.403-.074-.124-.27-.197-.565-.345z"/>
                </svg>
              </a>

              <a
                href={PORTFOLIO_CONFIG.mailtoUrl}
                className="btn-icon"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <a
              href={PORTFOLIO_CONFIG.resumePath}
              download="Shabeeb_Resume.pdf"
              className="btn btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.84rem' }}
            >
              <FileDown size={15} />
              Download Resume (PDF)
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. Built with React & Vite. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="btn-icon"
            title="Scroll to top"
            style={{ width: '38px', height: '38px' }}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};
