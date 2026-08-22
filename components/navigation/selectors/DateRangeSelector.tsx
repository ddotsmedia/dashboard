'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';
import { format } from 'date-fns';

export function DateRangeSelector() {
  const { dateRange, setDateRange } = useFilters();

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
    return `${format(dateRange.startDate, 'MMM dd')} - ${format(dateRange.endDate, 'MMM dd, yyyy')}`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-medium text-gray-700">
        {formatRange()}
      </div>
      <select
        onChange={(e) => {
          const preset = presets.find((p) => p.label === e.target.value);
          if (preset) handlePreset(preset);
        }}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors"
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
