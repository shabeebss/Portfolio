import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../data/portfolioData';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('warm-paper');

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('portfolio-theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  useEffect(() => {
    // Fixed Warm Editorial Theme
    setCurrentTheme('warm-paper');
    localStorage.setItem('portfolio-theme', 'warm-paper');
    document.documentElement.setAttribute('data-theme', 'warm-paper');
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
