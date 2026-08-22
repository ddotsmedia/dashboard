/**
 * Role Configuration System
 * Defines role-based access control and widget visibility
 */

import type { Role } from '@/types/user';

/**
 * Role Configuration Interface
 */
export interface RoleConfig {
  id: Role;
  name: string;
  description: string;
  widgets: readonly string[];
}

/**
 * CFO Role Configuration
 * Full access to all financial metrics and insights
 */
export const CFO_ROLE: RoleConfig = {
  id: 'cfo',
  name: 'CFO',
  description: 'Chief Financial Officer',
  widgets: [
    'kpi-revenue',
    'kpi-expenses',
    'kpi-profit',
    'kpi-cash',
    'kpi-ar',
    'kpi-ap',
    'kpi-invoices',
    'ar-widget',
    'ap-widget',
    'cashflow-widget',
    'budget-widget',
    'profitability',
    'expenses',
    'ai-insights',
  ],
};

/**
 * Finance Manager Role Configuration
 * Access to core financial operations and management widgets
 */
export const FINANCE_MANAGER_ROLE: RoleConfig = {
  id: 'finance-manager',
  name: 'Finance Manager',
  description: 'Finance Team',
  widgets: [
    'kpi-revenue',
    'kpi-expenses',
    'kpi-profit',
    'kpi-cash',
    'kpi-ar',
    'kpi-ap',
    'ar-widget',
    'ap-widget',
    'budget-widget',
    'transactions',
    'alerts',
  ],
};

/**
 * Accountant Role Configuration
 * Access to accounting operations and receivables/payables
 */
export const ACCOUNTANT_ROLE: RoleConfig = {
  id: 'accountant',
  name: 'Accountant',
  description: 'Accounting Staff',
  widgets: [
    'kpi-ar',
    'kpi-ap',
    'kpi-cash',
    'ar-widget',
    'ap-widget',
    'transactions',
    'alerts',
  ],
};

/**
 * Management Role Configuration
 * Executive-level access to key business metrics
 */
export const MANAGEMENT_ROLE: RoleConfig = {
  id: 'management',
  name: 'Management',
  description: 'Executive Management',
  widgets: [
    'kpi-revenue',
    'kpi-profit',
    'kpi-cash',
    'budget-widget',
    'profitability',
    'ai-insights',
  ],
};

/**
 * All role configurations indexed by role ID
 */
export const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  cfo: CFO_ROLE,
  'finance-manager': FINANCE_MANAGER_ROLE,
  accountant: ACCOUNTANT_ROLE,
  management: MANAGEMENT_ROLE,
};

/**
 * Get role configuration by role ID
 * @param role - The role to get configuration for
 * @returns The role configuration object
 */
export function getRoleConfig(role: Role): RoleConfig {
  const config = ROLE_CONFIGS[role];
  if (!config) {
    throw new Error(`Invalid role: ${role}`);
  }
  return {
    id: config.id,
    name: config.name,
    description: config.description,
    widgets: config.widgets,
  };
}

/**
 * Get all available role configurations
 * @returns Array of all role configurations
 */
export function getAllRoles(): RoleConfig[] {
  return Object.values(ROLE_CONFIGS).map((config) => ({
    id: config.id,
    name: config.name,
    description: config.description,
    widgets: config.widgets,
  })) as RoleConfig[];
}
