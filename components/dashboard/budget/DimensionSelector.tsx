/**
 * Dimension Selector Dropdown
 * Used to select the dimension for profitability analysis
 * Phase 5 Task 2
 */

'use client';

import React, { type ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type DimensionType = 'company' | 'branch' | 'department' | 'product' | 'customer';

interface DimensionSelectorProps {
  value: DimensionType;
  onChange: (value: DimensionType) => void;
  className?: string;
}

const DIMENSION_OPTIONS: Array<{ value: DimensionType; label: string }> = [
  { value: 'company', label: 'Company' },
  { value: 'branch', label: 'Branch' },
  { value: 'department', label: 'Department' },
  { value: 'product', label: 'Product' },
  { value: 'customer', label: 'Customer' },
];

export function DimensionSelector({
  value,
  onChange,
  className,
}: DimensionSelectorProps): ReactElement {
  return (
    <div className={cn('relative', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DimensionType)}
        className={cn(
          'w-full px-4 py-2 pr-10 rounded-lg border',
          'bg-white dark:bg-slate-800',
          'border-gray-200 dark:border-gray-600',
          'text-gray-900 dark:text-white',
          'font-medium text-sm',
          'appearance-none cursor-pointer',
          'hover:border-gray-300 dark:hover:border-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0',
          'dark:focus:ring-offset-slate-800',
          'transition-colors'
        )}
      >
        {DIMENSION_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-400 pointer-events-none" />
    </div>
  );
}

DimensionSelector.displayName = 'DimensionSelector';
