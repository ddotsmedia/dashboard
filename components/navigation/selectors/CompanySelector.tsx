'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';

export function CompanySelector() {
  const { company, setCompany } = useFilters();

  const companies = [
    { id: 'al-watan', name: 'Al-Watan' },
    { id: 'emirates', name: 'Emirates Trading Co.' },
    { id: 'gulf', name: 'Gulf Industries' },
  ];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCompany(e.target.value);
    },
    [setCompany]
  );

  return (
    <select
      value={company}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors"
    >
      {companies.map((c) => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
