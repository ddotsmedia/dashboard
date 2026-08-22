'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';
import { useIsMobile } from '@/lib/responsive';

const CURRENCY_FLAGS: Record<string, string> = {
  AED: '🇦🇪',
  USD: '🇺🇸',
  EUR: '🇪🇺',
};

export function CurrencySelector() {
  const { currency, setCurrency } = useFilters();
  const isMobile = useIsMobile();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrency(e.target.value as 'AED' | 'USD' | 'EUR');
    },
    [setCurrency]
  );

  // Responsive sizing:
  // Mobile: 100% width, 14px font, 44px min height
  // Desktop: auto width, 14px font, 40px height
  const containerClass = isMobile ? 'w-full' : 'w-auto';
  const inputClass = isMobile ? 'px-3 py-2.5 text-sm' : 'px-3 py-2 text-sm';

  return (
    <div className={containerClass}>
      <select
        value={currency}
        onChange={handleChange}
        className={`${inputClass} ${containerClass} border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
        aria-label="Select currency"
      >
        {(['AED', 'USD', 'EUR'] as const).map((curr) => (
          <option key={curr} value={curr}>
            {CURRENCY_FLAGS[curr]} {curr}
          </option>
        ))}
      </select>
    </div>
  );
}
