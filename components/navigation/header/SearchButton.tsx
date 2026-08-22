'use client';

import { Search } from 'lucide-react';
import { useEffect } from 'react';

export function SearchButton() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // TODO: Open search modal
        console.log('Search modal opened');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <button
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
      title="Search (Cmd+K)"
    >
      <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
    </button>
  );
}
