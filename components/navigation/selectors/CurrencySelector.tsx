'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';

const CURRENCY_FLAGS: Record<string, string> = {
  AED: '🇦🇪',
  USD: '🇺🇸',
  EUR: '🇪🇺',
};

export function CurrencySelector() {
  const { currency, setCurrency } = useFilters();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrency(e.target.value as 'AED' | 'USD' | 'EUR');
    },
    [setCurrency]
  );

  return (
    <select
      value={currency}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors"
    >
      {(['AED', 'USD', 'EUR'] as const).map((curr) => (
        <option key={curr} value={curr}>
          {CURRENCY_FLAGS[curr]} {curr}
        </option>
      ))}
    </select>
  );
}
