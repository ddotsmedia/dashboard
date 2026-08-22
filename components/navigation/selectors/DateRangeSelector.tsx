'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';
import { useIsMobile } from '@/lib/responsive';
import { format } from 'date-fns';

export function DateRangeSelector() {
  const { dateRange, setDateRange } = useFilters();
  const isMobile = useIsMobile();

  const presets = [
    {
      label: 'Today',
      getRange: () => {
        const today = new Date();
        return { startDate: today, endDate: today };
      },
    },
    {
      label: 'This Week',
      getRange: () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        return { startDate: startOfWeek, endDate: today };
      },
    },
    {
      label: 'This Month',
      getRange: () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return { startDate: startOfMonth, endDate: today };
      },
    },
    {
      label: 'Last Month',
      getRange: () => {
        const today = new Date();
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        return { startDate: startOfLastMonth, endDate: endOfLastMonth };
      },
    },
    {
      label: 'This Year',
      getRange: () => {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        return { startDate: startOfYear, endDate: today };
      },
    },
    {
      label: 'Last Year',
      getRange: () => {
        const today = new Date();
        const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
        const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
        return { startDate: startOfLastYear, endDate: endOfLastYear };
      },
    },
  ];

  const handlePreset = useCallback(
    (preset: (typeof presets)[0]) => {
      const range = preset.getRange();
      setDateRange(range.startDate, range.endDate);
    },
    [setDateRange]
  );

  const formatRange = () => {
    if (isMobile) {
      // Short format for mobile
      return `${format(dateRange.startDate, 'MMM dd')} - ${format(dateRange.endDate, 'MMM dd')}`;
    }
    return `${format(dateRange.startDate, 'MMM dd')} - ${format(dateRange.endDate, 'MMM dd, yyyy')}`;
  };

  // Responsive sizing
  const containerClass = isMobile ? 'w-full flex flex-col gap-2' : 'flex items-center gap-2';
  const labelClass = isMobile ? 'text-xs font-medium text-gray-600 dark:text-gray-400 px-1' : 'text-sm font-medium text-gray-700 dark:text-gray-300';
  const selectClass = isMobile ? 'w-full px-3 py-2.5 text-sm' : 'px-3 py-2 text-sm';

  return (
    <div className={containerClass}>
      <div className={labelClass}>
        {formatRange()}
      </div>
      <select
        onChange={(e) => {
          const preset = presets.find((p) => p.label === e.target.value);
          if (preset) handlePreset(preset);
        }}
        className={`${selectClass} ${isMobile ? 'w-full' : 'w-auto'} border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
        aria-label="Select date range preset"
      >
        <option value="">Select Preset...</option>
        {presets.map((p) => (
          <option key={p.label} value={p.label}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
