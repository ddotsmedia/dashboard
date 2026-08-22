'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';
import { useIsMobile } from '@/lib/responsive';

export function BranchSelector() {
  const { branch, setBranch } = useFilters();
  const isMobile = useIsMobile();

  const branches = [
    { id: 'main', name: 'Main Branch' },
    { id: 'dxb', name: 'Dubai Branch' },
    { id: 'auh', name: 'Abu Dhabi Branch' },
    { id: 'shr', name: 'Sharjah Branch' },
  ];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setBranch(e.target.value);
    },
    [setBranch]
  );

  // Responsive sizing:
  // Mobile: 100% width, 14px font, 44px min height
  // Desktop: auto width, 14px font, 40px height
  const containerClass = isMobile ? 'w-full' : 'w-auto';
  const inputClass = isMobile ? 'px-3 py-2.5 text-sm' : 'px-3 py-2 text-sm';

  return (
    <div className={containerClass}>
      <label htmlFor="branch-selector" className="sr-only">
        Select branch
      </label>
      <select
        id="branch-selector"
        value={branch}
        onChange={handleChange}
        className={`${inputClass} ${containerClass} border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus-visible:ring-indigo-500 transition-all duration-150`}
        aria-label="Select branch"
      >
        {branches.map((b) => (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
}
