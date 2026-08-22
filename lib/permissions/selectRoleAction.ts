'use server';

import type { Role } from '@/types/user';

/**
 * Server action stub for role change logging
 * Currently a placeholder for future server-side role change handling
 * @param userId - The user ID
 * @param role - The new role being selected
 */
export async function selectRoleAction(userId: string, role: Role): Promise<void> {
  // Placeholder for server-side role change handling
  // Currently client-side only via Zustand
  // The actual role update happens in components/dashboard/RoleSelector.tsx
  // via useAuth().setCurrentRole()
}
