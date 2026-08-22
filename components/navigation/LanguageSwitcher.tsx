'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: 'en' | 'ar';
  onLocaleChange?: (locale: 'en' | 'ar') => void;
}

const LANGUAGES = [
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'ar', label: 'العربية', flag: '🇸🇦' },
] as const;

export function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current language info
  const currentLanguage = LANGUAGES.find((lang) => lang.id === currentLocale) || LANGUAGES[0];

  // Handle locale change
  const handleLocaleChange = (newLocale: 'en' | 'ar') => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Remove current locale from pathname if present
    const segments = pathname.split('/');
    let newPathname = pathname;

    // If first segment is a locale, replace it
    if (segments[1] && LANGUAGES.find((lang) => lang.id === segments[1])) {
      segments[1] = newLocale;
      newPathname = segments.join('/');
    } else {
      // Otherwise prepend the new locale
      newPathname = `/${newLocale}${pathname}`;
    }

    // Call callback if provided
    onLocaleChange?.(newLocale);

    // Navigate to new locale route
    router.push(newPathname);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        title="Change Language"
        aria-label="Change Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.label}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {LANGUAGES.map((language) => (
            <button
              key={language.id}
              onClick={() => handleLocaleChange(language.id as 'en' | 'ar')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                language.id === currentLocale
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              role="menuitem"
            >
              <span>{language.flag}</span>
              <span>{language.label}</span>
              {language.id === currentLocale && (
                <span className="ml-auto text-lg">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
