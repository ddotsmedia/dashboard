'use client';

import { useFilters } from '@/lib/store';
import { useCallback } from 'react';

export function BranchSelector() {
  const { branch, setBranch } = useFilters();

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

  return (
    <select
      value={branch}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 transition-colors"
    >
      {branches.map((b) => (
        <option key={b.id} value={b.name}>
          {b.name}
        </option>
      ))}
    </select>
  );
}
