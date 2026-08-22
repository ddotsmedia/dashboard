'use client';

/**
 * Role Configuration Hook
 * Provides role-based widget visibility and role management
 */

import { useMemo, useCallback } from 'react';
import { useAuth } from '@/lib/store';
import type { Role } from '@/types/user';
import { getRoleConfig, type RoleConfig } from './roleConfig';

/**
 * Hook return interface
 */
export interface UseRoleConfigReturn {
  currentRole: Role | null;
  roleConfig: RoleConfig | null;
  visibleWidgets: readonly string[];
  setRole: (role: Role) => void;
}

/**
 * useRoleConfig Hook
 * Manages role configuration and visible widgets for the current user
 * @returns Role configuration and control functions
 */
export function useRoleConfig(): UseRoleConfigReturn {
  const { currentRole, setRole } = useAuth();

  const roleConfig = useMemo(() => {
    if (!currentRole) return null;
    return getRoleConfig(currentRole);
  }, [currentRole]);

  const visibleWidgets = useMemo(() => {
    if (!roleConfig) return [];
    return [...roleConfig.widgets];
  }, [roleConfig]);

  const handleSetRole = useCallback(
    (role: Role) => {
      setRole(role);
    },
    [setRole]
  );

  return {
    currentRole,
    roleConfig,
    visibleWidgets,
    setRole: handleSetRole,
  };
}
