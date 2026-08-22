'use client';

import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useIsMobile } from '@/lib/responsive';

export function SearchButton() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Search modal functionality placeholder
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <button
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors h-10 w-10 flex items-center justify-center flex-shrink-0 md:h-10 md:w-auto md:px-3"
      title="Search (Cmd+K)"
      aria-label="Search"
    >
      <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      {!isMobile && (
        <span className="hidden sm:inline ml-2 text-xs text-gray-600 dark:text-gray-400">
          Cmd+K
        </span>
      )}
    </button>
  );
}
