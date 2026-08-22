'use client';

import { ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { useUI } from '@/lib/store';
import { useDirection } from '@/lib/hooks/useDirection';
import { useIsMobile, useIsTablet } from '@/lib/responsive';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useUI();
  const direction = useDirection();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Auto-close sidebar on mobile/tablet when window resizes to smaller size
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen, setSidebarOpen]);

  // Desktop (1024px+): sidebar always visible, 280px
  // Tablet (768-1023px): sidebar collapsible
  // Mobile (<768px): sidebar hidden by default, drawer overlay on toggle
  const sidebarWidthClass = isMobile ? (sidebarOpen ? 'w-full' : 'w-0') : 'w-64 lg:w-[280px]';
  const sidebarPosition = isMobile ? 'fixed' : 'relative';
  const sidebarZIndex = isMobile ? 'z-50' : 'z-0';

  return (
    <div
      className={`flex h-screen bg-white dark:bg-slate-900 ${
        direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Skip Link - Visible on Tab focus */}
      <SkipLink />
      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`${sidebarWidthClass} ${sidebarPosition} ${sidebarZIndex} ${
          sidebarOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'translate-x-0'
        } transition-all duration-250 overflow-hidden h-screen ${
          direction === 'rtl'
            ? 'border-l border-gray-200 dark:border-gray-700'
            : 'border-r border-gray-200 dark:border-gray-700'
        }`}
        aria-hidden={isMobile && !sidebarOpen ? 'true' : undefined}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <Header />

        {/* Content */}
        <main
          id="main-content"
          role="main"
          className="flex-1 overflow-auto"
          tabIndex={-1}
        >
          <div className="p-4 sm:p-6 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
