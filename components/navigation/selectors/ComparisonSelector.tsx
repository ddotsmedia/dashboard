'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';
import { useIsMobile } from '@/lib/responsive';

export function ComparisonSelector() {
  const { comparisonPeriod, setComparisonPeriod } = useFilters();
  const isMobile = useIsMobile();

  const options = [
    { id: 'none', label: 'None' },
    { id: 'MoM', label: 'vs Previous Month' },
    { id: 'QoQ', label: 'vs Previous Quarter' },
    { id: 'YoY', label: 'vs Previous Year' },
  ];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setComparisonPeriod(e.target.value as 'YoY' | 'QoQ' | 'MoM' | 'none');
    },
    [setComparisonPeriod]
  );

  // Responsive sizing:
  // Mobile: 100% width, 14px font, 44px min height
  // Desktop: auto width, 14px font, 40px height
  const containerClass = isMobile ? 'w-full' : 'w-auto';
  const inputClass = isMobile ? 'px-3 py-2.5 text-sm' : 'px-3 py-2 text-sm';

  return (
    <div className={containerClass}>
      <select
        value={comparisonPeriod}
        onChange={handleChange}
        className={`${inputClass} ${containerClass} border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
        aria-label="Select comparison period"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
