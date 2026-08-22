'use client';

import { useState } from 'react';
import { useUI } from '@/lib/store';
import { Menu, X, Sliders } from 'lucide-react';
import { CompanySelector } from './selectors/CompanySelector';
import { BranchSelector } from './selectors/BranchSelector';
import { DateRangeSelector } from './selectors/DateRangeSelector';
import { ComparisonSelector } from './selectors/ComparisonSelector';
import { CurrencySelector } from './selectors/CurrencySelector';
import { ThemeSwitcher } from './header/ThemeSwitcher';
import { SearchButton } from './header/SearchButton';
import { NotificationsBell } from './header/NotificationsBell';
import { UserMenu } from './header/UserMenu';
import { useIsMobile } from '@/lib/responsive';
import { CustomizeModal } from '@/components/dashboard/CustomizeModal';

export function Header() {
  const { sidebarOpen, toggleSidebar } = useUI();
  const isMobile = useIsMobile();
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
        {/* Left Section - Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          )}
        </div>

        {/* Center Section - Filters */}
        <div className="flex-1 flex flex-wrap items-center gap-2 md:gap-4 justify-center px-4">
          <div className="hidden md:block">
            <CompanySelector />
          </div>
          <div className="hidden lg:block">
            <BranchSelector />
          </div>
          <div className="hidden lg:block">
            <DateRangeSelector />
          </div>
          <div className="hidden xl:block">
            <ComparisonSelector />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:block">
            <CurrencySelector />
          </div>
          <SearchButton />
          <NotificationsBell />
          <button
            onClick={() => setIsCustomizeModalOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            title="Customize Dashboard"
          >
            <Sliders className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <ThemeSwitcher />
          <UserMenu />
        </div>
      </div>

      {/* Mobile Filter Row */}
      <div className="md:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex gap-2">
          <CompanySelector />
          <BranchSelector />
        </div>
        <DateRangeSelector />
      </div>

      {/* Customize Modal */}
      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
      />
    </header>
  );
}
