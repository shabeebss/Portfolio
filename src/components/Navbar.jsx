import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`floating-nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
      <nav className="floating-nav-dock" id="nav" aria-label="Main navigation">
        <a href="#hero" className="nav-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
          <span className="logo-beacon">
            <span className="logo-dot"></span>
          </span>
          <span className="logo-name">
            <ShinyText shimmerColor="#d97706" speed={3.5}>
              Shabeeb Ahammed
            </ShinyText>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link-pill ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                  {isActive && <span className="nav-active-glow" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          {/* Magnet CTA Button */}
          <Magnet magnetStrength={0.3} activeRadius={80}>
            <a
              href="#contact"
              className="btn-lets-talk"
              onClick={(e) => handleLinkClick(e, '#contact')}
              style={{ display: 'inline-flex', padding: '6px 16px', fontSize: '0.75rem' }}
            >
              <span>LET'S TALK &rarr;</span>
            </a>
          </Magnet>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-links">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="mobile-nav-indicator"></span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
