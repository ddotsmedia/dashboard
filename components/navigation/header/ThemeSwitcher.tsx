'use client';

import { useUI } from '@/lib/store';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useUI();

  useEffect(() => {
    // Apply theme to document
    const html = document.documentElement;
    if (theme === 'system') {
      html.removeAttribute('data-theme');
      // Optional: detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.style.colorScheme = 'dark';
      }
    } else {
      html.setAttribute('data-theme', theme);
      html.style.colorScheme = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const themeLabel = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-10 w-10 flex items-center justify-center flex-shrink-0"
      title={`Theme: ${themeLabel[theme]} (click to cycle)`}
      aria-label={`Theme: ${themeLabel[theme]}`}
    >
      {theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
