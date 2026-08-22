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
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      {/* Trigger Button - Icon only on mobile, icon + text on desktop */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => isMobile && setShowTooltip(true)}
          onMouseLeave={() => isMobile && setShowTooltip(false)}
          className={`flex items-center gap-2 rounded-md text-sm transition-colors flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
            isMobile
              ? 'p-2 h-10 w-10 justify-center bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
              : 'px-3 py-2 h-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          title="Change Language"
          aria-label="Change Language"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="language-menu"
        >
          <Globe className="w-4 h-4 flex-shrink-0 text-gray-700 dark:text-gray-300" />
          {/* Hide text on mobile, show on desktop */}
          <span className="hidden md:inline whitespace-nowrap text-gray-900 dark:text-gray-100">{currentLanguage.flag} {currentLanguage.label}</span>
        </button>

        {/* Mobile Tooltip - Show on hover/focus */}
        {isMobile && showTooltip && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap z-50">
            {currentLanguage.label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
          </div>
        )}
      </div>

      {/* Dropdown Menu - Wider on mobile for touch targets, auto on desktop */}
      {isOpen && (
        <div
          id="language-menu"
          className={`absolute right-0 mt-2 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-in fade-in duration-150 ${
            isMobile ? 'w-56' : 'w-48'
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          {LANGUAGES.map((language) => (
            <button
              key={language.id}
              onClick={() => handleLocaleChange(language.id as 'en' | 'ar')}
              className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 min-h-11 md:py-2 md:min-h-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset ${
                language.id === currentLocale
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              role="menuitem"
              aria-current={language.id === currentLocale ? 'true' : undefined}
            >
              <span className="flex-shrink-0">{language.flag}</span>
              <span className="flex-1">{language.label}</span>
              {language.id === currentLocale && (
                <span className="ml-auto text-lg flex-shrink-0" aria-hidden="true">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
