'use client';

import { useState, useEffect } from 'react';
import { useUI, useAuth } from '@/lib/store';
import { Menu, X, Sliders, ChevronDown } from 'lucide-react';
import { CompanySelector } from './selectors/CompanySelector';
import { BranchSelector } from './selectors/BranchSelector';
import { DateRangeSelector } from './selectors/DateRangeSelector';
import { ComparisonSelector } from './selectors/ComparisonSelector';
import { CurrencySelector } from './selectors/CurrencySelector';
import { RoleSelector } from '@/components/dashboard/RoleSelector';
import { RoleInfo } from '@/components/dashboard/RoleInfo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './header/ThemeSwitcher';
import { SearchButton } from './header/SearchButton';
import { NotificationsBell } from './header/NotificationsBell';
import { AIAssistantButton } from './header/AIAssistantButton';
import { UserMenu } from './header/UserMenu';
import { useIsMobile, useIsTablet } from '@/lib/responsive';
import { CustomizeModal } from '@/components/dashboard/CustomizeModal';

// Default locale if next-intl is not configured yet
const DEFAULT_LOCALE = 'en' as const;

export function Header() {
  const { sidebarOpen, toggleSidebar, toggleAIAssistant } = useUI();
  const { currentRole } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(!isMobile);
  const [currentLocale, setCurrentLocale] = useState<'en' | 'ar'>(DEFAULT_LOCALE);

  // Initialize locale from localStorage or detect from browser
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as 'en' | 'ar' | null;
    if (savedLocale) {
      setCurrentLocale(savedLocale);
    } else {
      // Detect from browser language
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
      setCurrentLocale(browserLang);
      localStorage.setItem('locale', browserLang);
    }
  }, []);

  // Auto-collapse filters on mobile
  useEffect(() => {
    if (isMobile) {
      setIsFiltersExpanded(false);
    } else {
      setIsFiltersExpanded(true);
    }
  }, [isMobile]);

  // Keyboard shortcut: Cmd+Shift+A to toggle AI Assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleAIAssistant();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleAIAssistant]);

  // Handle locale change
  const handleLocaleChange = (newLocale: 'en' | 'ar') => {
    setCurrentLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  // Responsive spacing
  const headerPadding = isMobile ? 'px-3 py-3' : isTablet ? 'px-4 py-3' : 'px-6 lg:px-8 py-4';
  const filterRowGap = isMobile ? 'gap-2' : 'gap-3 md:gap-4';

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Main Header Row */}
      <div className={`flex items-center justify-between ${headerPadding}`}>
        {/* Left Section - Sidebar Toggle */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-11 w-11 flex items-center justify-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
              aria-controls="sidebar"
              title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          )}

          {/* Mobile Filter Toggle */}
          {isMobile && (
            <button
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-11 w-11 flex items-center justify-center flex-shrink-0 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
              aria-label="Toggle filters"
              aria-expanded={isFiltersExpanded}
              aria-controls="filters-panel"
              title="Toggle filters"
            >
              <ChevronDown
                className={`w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform ${
                  isFiltersExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Center Section - Desktop Filters (Hidden on mobile/tablet) */}
        <div className="hidden lg:flex flex-1 flex-wrap items-center gap-3 justify-center px-4">
          <CompanySelector />
          <BranchSelector />
          <DateRangeSelector />
          <ComparisonSelector />
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <div className="hidden sm:block">
            <CurrencySelector />
          </div>
          <SearchButton />
          <NotificationsBell />
          <AIAssistantButton />
          <button
            onClick={() => setIsCustomizeModalOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-10 w-10 flex items-center justify-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
            title="Customize Dashboard"
            aria-label="Customize Dashboard"
          >
            <Sliders className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="hidden lg:flex items-center gap-1.5">
            <RoleSelector currentRole={currentRole} />
            <RoleInfo role={currentRole} />
          </div>
          <LanguageSwitcher
            currentLocale={currentLocale}
            onLocaleChange={handleLocaleChange}
          />
          <ThemeSwitcher />
          <UserMenu />
        </div>
      </div>

      {/* Tablet Filter Row (768px - 1023px) */}
      {!isMobile && (
        <div className="hidden md:block lg:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex flex-wrap items-center ${filterRowGap}`}>
            <CompanySelector />
            <BranchSelector />
            <DateRangeSelector />
            <ComparisonSelector />
          </div>
        </div>
      )}

      {/* Mobile Filter Panel (Collapsible Accordion) */}
      {isMobile && isFiltersExpanded && (
        <div
          id="filters-panel"
          className="px-3 py-3 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-gray-50 dark:bg-slate-700/50"
        >
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2">
              COMPANY
            </div>
            <CompanySelector />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2">
              BRANCH
            </div>
            <BranchSelector />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2">
              DATE RANGE
            </div>
            <DateRangeSelector />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2">
              COMPARISON
            </div>
            <ComparisonSelector />
          </div>
        </div>
      )}

      {/* Customize Modal */}
      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
      />
    </header>
  );
}
