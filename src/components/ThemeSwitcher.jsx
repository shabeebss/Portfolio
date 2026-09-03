import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

export const ThemeSwitcher = () => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectTheme = (theme) => {
    changeTheme(theme.id);
    addToast(`Theme switched to ${theme.name}`, 'info', 2000);
    setIsOpen(false);
  };

  const darkThemes = themes.filter((t) => t.category === 'Dark');
  const lightThemes = themes.filter((t) => t.category === 'Light');

  return (
    <div className="theme-switcher" ref={dropdownRef}>
      <button
        className="theme-toggle-btn"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Switch Theme Aesthetic"
        aria-expanded={isOpen}
        title="Change Theme (Dark & Light Presets)"
      >
        <Palette size={19} />
      </button>

      <div className={`theme-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="theme-dropdown-header">
          <span>Theme Presets</span>
          <span className="theme-shortcut-badge">5 Curated</span>
        </div>

        <div className="theme-options-grid-scroll">
          <div className="theme-group-divider">Dark Aesthetic ({darkThemes.length})</div>
          <div className="theme-options-grid">
            {darkThemes.map((theme) => {
              const isActive = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-option ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectTheme(theme)}
                >
                  <span
                    className="theme-swatch"
                    style={{
                      background: theme.accent,
                      boxShadow: `0 0 10px ${theme.accent}66`
                    }}
                  />
                  <div className="theme-option-text">
                    <span className="theme-option-name">{theme.name}</span>
                    <span className="theme-option-desc">{theme.category} Mode</span>
                  </div>
                  <Check size={16} className="theme-check-icon" style={{ opacity: isActive ? 1 : 0 }} />
                </button>
              );
            })}
          </div>

          <div className="theme-group-divider" style={{ marginTop: '10px' }}>
            Light Aesthetic ({lightThemes.length})
          </div>
          <div className="theme-options-grid">
            {lightThemes.map((theme) => {
              const isActive = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-option ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectTheme(theme)}
                >
                  <span
                    className="theme-swatch"
                    style={{
                      background: theme.accent,
                      border: '2px solid rgba(0,0,0,0.15)',
                      boxShadow: `0 0 8px ${theme.accent}44`
                    }}
                  />
                  <div className="theme-option-text">
                    <span className="theme-option-name">{theme.name}</span>
                    <span className="theme-option-desc">{theme.category} Mode</span>
                  </div>
                  <Check size={16} className="theme-check-icon" style={{ opacity: isActive ? 1 : 0 }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
