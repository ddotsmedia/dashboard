'use client';

import { useCallback } from 'react';
import { Briefcase } from 'lucide-react';
import { useAuth } from '@/lib/store';
import type { Role } from '@/types/user';

interface RoleSelectorProps {
  currentRole: Role | null;
  onRoleChange?: (role: Role) => void;
}

const ROLES = [
  { id: 'CFO', label: 'CFO' },
  { id: 'FinanceManager', label: 'Finance Manager' },
  { id: 'Accountant', label: 'Accountant' },
  { id: 'Management', label: 'Management' },
] as const;

const ROLE_ICONS: Record<string, string> = {
  CFO: '👔',
  FinanceManager: '💼',
  Accountant: '📊',
  Management: '👥',
};

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const { setCurrentRole } = useAuth();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const role = e.target.value as Role;
      setCurrentRole(role);
      onRoleChange?.(role);
    },
    [setCurrentRole, onRoleChange]
  );

  const selectedRole = currentRole || 'FinanceManager';
  const selectedRoleLabel = ROLES.find((r) => r.id === selectedRole)?.label || 'Finance Manager';

  return (
    <div className="relative inline-block">
      <select
        value={selectedRole}
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 transition-colors appearance-none cursor-pointer pr-8"
      >
        {ROLES.map((role) => (
          <option key={role.id} value={role.id}>
            {ROLE_ICONS[role.id]} {role.label}
          </option>
        ))}
      </select>
      <Briefcase className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
    </div>
  );
}
