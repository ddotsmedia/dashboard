'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';

export function ComparisonSelector() {
  const { comparisonPeriod, setComparisonPeriod } = useFilters();

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

  return (
    <select
      value={comparisonPeriod}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
