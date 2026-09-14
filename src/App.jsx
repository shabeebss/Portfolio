import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ClickSpark } from './components/reactbits/ClickSpark';

export function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  // Ambient cursor glow tracking & Spotlight / 3D Tilt card tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const cards = document.querySelectorAll('.spotlight-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set spotlight coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute 3D tilt if mouse is hovering over this card
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const tiltY = (((x - centerX) / centerX) * 4.5).toFixed(2);
          const tiltX = (-((y - centerY) / centerY) * 4.5).toFixed(2);
          card.style.setProperty('--tilt-x', `${tiltX}deg`);
          card.style.setProperty('--tilt-y', `${tiltY}deg`);
        } else {
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        }
      });
    };

    const handleMouseLeave = () => {
      setCursorPos({ x: -999, y: -999 });
      const cards = document.querySelectorAll('.spotlight-card');
      cards.forEach((card) => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <ClickSpark sparkColor="#d97706" sparkCount={10} sparkRadius={22} duration={450}>
      <div className="portfolio-app">
        {/* Ambient Cursor Light Glow Follower */}
        <div
          className="ambient-cursor-glow"
          style={{
            transform: `translate3d(${cursorPos.x - 220}px, ${cursorPos.y - 220}px, 0)`
          }}
        />

        {/* Main Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
          <Experience />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Project Case Study Deep-Dive Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </ClickSpark>
  );
}

export default App;
