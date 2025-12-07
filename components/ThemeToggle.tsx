import React from 'react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-card-light dark:bg-card-dark text-primary border border-primary/20 hover:bg-primary/10 transition-colors shadow-sm"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-icons-outlined text-xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};