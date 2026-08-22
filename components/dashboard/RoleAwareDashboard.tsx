/**
 * Role-Aware Dashboard Wrapper
 * Handles role switching and applies appropriate layout based on selected role
 * Manages role-specific customizations and persists them to localStorage
 */

'use client';

import { useEffect, ReactNode, createContext, useContext } from 'react';
import { useRole } from '@/lib/store';
import { getRoleConfig } from '@/config/roleConfig';
import type { Role } from '@/types/user';

interface RoleAwareDashboardProps {
  children: ReactNode;
  onRoleChange?: (role: Role) => void;
}

/**
 * Wrapper component that applies role-aware layout when role changes
 * Handles smooth transitions and localStorage persistence
 */
export function RoleAwareDashboard({ children, onRoleChange }: RoleAwareDashboardProps) {
  const { currentRole, setRole } = useRole();

  /**
   * Handle role changes
   * Applies the role's default layout and triggers optional callback
   */
  const handleRoleChange = (newRole: Role) => {
    if (newRole === currentRole) return;

    // Update role in store (which applies the layout)
    setRole(newRole);

    // Trigger optional callback for parent components
    if (onRoleChange) {
      onRoleChange(newRole);
    }

    // Store role in localStorage for persistence
    try {
      localStorage.setItem('dashboard-role', newRole);
    } catch (error) {
      console.error('Failed to save role to localStorage:', error);
    }
  };

  /**
   * Load saved role from localStorage on mount
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('dashboard-role') as Role | null;
      if (savedRole && ['cfo', 'finance-manager', 'accountant', 'management'].includes(savedRole)) {
        // Apply the saved role if it's different from current
        if (savedRole !== currentRole) {
          setRole(savedRole);
        }
      }
    } catch (error) {
      console.error('Failed to load role from localStorage:', error);
    }
  }, []);

  return (
    <RoleAwareDashboardProvider value={{ currentRole, setRole: handleRoleChange }}>
      {children}
    </RoleAwareDashboardProvider>
  );
}

/**
 * Context for role-aware dashboard
 */
interface RoleContextValue {
  currentRole: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

/**
 * Provider component for role context
 */
function RoleAwareDashboardProvider({
  value,
  children,
}: {
  value: RoleContextValue;
  children: ReactNode;
}) {
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

/**
 * Hook to use role context
 */
export function useRoleDashboard(): RoleContextValue {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleDashboard must be used within RoleAwareDashboard');
  }
  return context;
}

/**
 * Role switcher component for UI
 */
export function RoleSwitcher() {
  const { currentRole, setRole } = useRoleDashboard();
  const availableRoles: Role[] = ['management', 'cfo', 'finance-manager', 'accountant'];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role:</span>
      <select
        value={currentRole}
        onChange={(e) => setRole(e.target.value as Role)}
        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      >
        {availableRoles.map((role) => {
          const config = getRoleConfig(role);
          return (
            <option key={role} value={role}>
              {config.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

/**
 * Role info component
 */
export function RoleInfo() {
  const { currentRole } = useRoleDashboard();
  const config = getRoleConfig(currentRole);

  return (
    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">{config.name}</h3>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">{config.description}</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
            {config.widgets.length} widgets available
          </p>
        </div>
      </div>
    </div>
  );
}
