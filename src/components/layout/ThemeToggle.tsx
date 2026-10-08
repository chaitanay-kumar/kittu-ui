import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/theme/useTheme';

export interface ThemeToggleProps {
  /** Optional className for the trigger button */
  className?: string;
  /** Accessible label override */
  label?: string;
}

/**
 * ThemeToggle — small icon button that flips between the light and dark
 * page themes. Visual style matches the other icon buttons in the Navbar
 * pill (translucent hover background, muted→primary text).
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, label }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const accessible = label ?? (isDark ? 'Switch to light theme' : 'Switch to dark theme');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={accessible}
      title={accessible}
      className={
        'p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors focus-ring cursor-pointer ' +
        (className ?? '')
      }
    >
      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
};

export default ThemeToggle;
