'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import type { Role } from '@/types/user';
import { DEFAULT_PERMISSIONS } from '@/types/user';

interface RoleInfoProps {
  role: Role | null;
}

const ROLE_DESCRIPTIONS: Record<string, { title: string; description: string; permissions: number }> = {
  CFO: {
    title: 'Chief Financial Officer',
    description: 'Full access to all financial data and system features',
    permissions: 15,
  },
  FinanceManager: {
    title: 'Finance Manager',
    description: 'Manage financial operations and reporting',
    permissions: 14,
  },
  Accountant: {
    title: 'Accountant',
    description: 'Access to transactions and accounting records',
    permissions: 8,
  },
  Management: {
    title: 'Management',
    description: 'Strategic financial overview and analytics',
    permissions: 12,
  },
  Viewer: {
    title: 'Viewer',
    description: 'Read-only access to dashboards and reports',
    permissions: 10,
  },
};

export function RoleInfo({ role }: RoleInfoProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!role) return null;

  const roleInfo = ROLE_DESCRIPTIONS[role];
  const permissions = Object.values(DEFAULT_PERMISSIONS[role] || {}).filter(Boolean).length;

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        title="Role information"
      >
        <Info className="w-4 h-4" />
      </button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3 z-50">
          <div className="text-sm">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{roleInfo.title}</p>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{roleInfo.description}</p>
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Access to <span className="font-semibold text-gray-900 dark:text-gray-100">{permissions} features</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
