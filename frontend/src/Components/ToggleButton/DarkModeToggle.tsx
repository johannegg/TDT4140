import React from 'react';
import { useDarkMode } from '../../Contexts/DarkModeContext';
import './DarkModeToggle.css'; 

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <label className="dark-mode-toggle">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        aria-label="Toggle dark mode"
      />
      <span className="toggle-track">
        <span className="toggle-indicator">
          {isDarkMode ? '🌜' : '🌞'}
        </span>
      </span>
    </label>
  );
};

export default DarkModeToggle;

