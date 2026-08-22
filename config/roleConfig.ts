/**
 * Role-Based Configuration
 * Defines widget visibility and defaults for each role
 */

import type { Role } from '@/types/user';
import { WIDGET_IDS } from '@/config/defaultLayout';

/**
 * Role configuration interface
 */
export interface RoleConfig {
  role: Role;
  name: string;
  description: string;
  widgets: string[];
  defaultLayout: {
    widgetVisibility: Record<string, boolean>;
    widgetOrder: string[];
    widgetSizes: Record<string, 1 | 2 | 3 | 4>;
  };
}

/**
 * Role configurations mapping roles to their allowed widgets
 */
export const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  cfo: {
    role: 'cfo',
    name: 'CFO',
    description: 'Chief Financial Officer - Strategic financial view',
    widgets: [
      WIDGET_IDS.REVENUE,
      WIDGET_IDS.EXPENSES,
      WIDGET_IDS.PROFIT,
      WIDGET_IDS.CASH,
      WIDGET_IDS.CASHFLOW,
      WIDGET_IDS.BUDGET,
      WIDGET_IDS.PROFITABILITY,
    ],
    defaultLayout: {
      widgetVisibility: {
        [WIDGET_IDS.REVENUE]: true,
        [WIDGET_IDS.EXPENSES]: true,
        [WIDGET_IDS.PROFIT]: true,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: false,
        [WIDGET_IDS.AP]: false,
        [WIDGET_IDS.INVOICES]: false,
        [WIDGET_IDS.AR_WIDGET]: false,
        [WIDGET_IDS.AP_WIDGET]: false,
        [WIDGET_IDS.CASHFLOW]: true,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: true,
        [WIDGET_IDS.EXPENSES_WIDGET]: false,
        [WIDGET_IDS.TRANSACTIONS]: false,
        [WIDGET_IDS.ALERTS]: false,
        [WIDGET_IDS.AI_INSIGHTS]: false,
      },
      widgetOrder: [
        WIDGET_IDS.REVENUE,
        WIDGET_IDS.EXPENSES,
        WIDGET_IDS.PROFIT,
        WIDGET_IDS.CASH,
        WIDGET_IDS.CASHFLOW,
        WIDGET_IDS.BUDGET,
        WIDGET_IDS.PROFITABILITY,
      ],
      widgetSizes: {
        [WIDGET_IDS.REVENUE]: 1,
        [WIDGET_IDS.EXPENSES]: 1,
        [WIDGET_IDS.PROFIT]: 1,
        [WIDGET_IDS.CASH]: 1,
        [WIDGET_IDS.AR]: 1,
        [WIDGET_IDS.AP]: 1,
        [WIDGET_IDS.INVOICES]: 1,
        [WIDGET_IDS.AR_WIDGET]: 2,
        [WIDGET_IDS.AP_WIDGET]: 2,
        [WIDGET_IDS.CASHFLOW]: 2,
        [WIDGET_IDS.BUDGET]: 2,
        [WIDGET_IDS.PROFITABILITY]: 4,
        [WIDGET_IDS.EXPENSES_WIDGET]: 4,
        [WIDGET_IDS.TRANSACTIONS]: 3,
        [WIDGET_IDS.ALERTS]: 1,
        [WIDGET_IDS.AI_INSIGHTS]: 4,
      },
    },
  },
  'finance-manager': {
    role: 'finance-manager',
    name: 'Finance Manager',
    description: 'Comprehensive operational view of all financial metrics',
    widgets: [
      WIDGET_IDS.REVENUE,
      WIDGET_IDS.EXPENSES,
      WIDGET_IDS.PROFIT,
      WIDGET_IDS.CASH,
      WIDGET_IDS.AR,
      WIDGET_IDS.AP,
      WIDGET_IDS.INVOICES,
      WIDGET_IDS.AR_WIDGET,
      WIDGET_IDS.AP_WIDGET,
      WIDGET_IDS.CASHFLOW,
      WIDGET_IDS.BUDGET,
      WIDGET_IDS.PROFITABILITY,
      WIDGET_IDS.EXPENSES_WIDGET,
      WIDGET_IDS.TRANSACTIONS,
      WIDGET_IDS.ALERTS,
    ],
    defaultLayout: {
      widgetVisibility: {
        [WIDGET_IDS.REVENUE]: true,
        [WIDGET_IDS.EXPENSES]: true,
        [WIDGET_IDS.PROFIT]: true,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: true,
        [WIDGET_IDS.AP]: true,
        [WIDGET_IDS.INVOICES]: true,
        [WIDGET_IDS.AR_WIDGET]: true,
        [WIDGET_IDS.AP_WIDGET]: true,
        [WIDGET_IDS.CASHFLOW]: true,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: true,
        [WIDGET_IDS.EXPENSES_WIDGET]: true,
        [WIDGET_IDS.TRANSACTIONS]: true,
        [WIDGET_IDS.ALERTS]: true,
        [WIDGET_IDS.AI_INSIGHTS]: false,
      },
      widgetOrder: [
        WIDGET_IDS.REVENUE,
        WIDGET_IDS.EXPENSES,
        WIDGET_IDS.PROFIT,
        WIDGET_IDS.CASH,
        WIDGET_IDS.AR,
        WIDGET_IDS.AP,
        WIDGET_IDS.INVOICES,
        WIDGET_IDS.AR_WIDGET,
        WIDGET_IDS.AP_WIDGET,
        WIDGET_IDS.CASHFLOW,
        WIDGET_IDS.BUDGET,
        WIDGET_IDS.PROFITABILITY,
        WIDGET_IDS.EXPENSES_WIDGET,
        WIDGET_IDS.TRANSACTIONS,
        WIDGET_IDS.ALERTS,
      ],
      widgetSizes: {
        [WIDGET_IDS.REVENUE]: 1,
        [WIDGET_IDS.EXPENSES]: 1,
        [WIDGET_IDS.PROFIT]: 1,
        [WIDGET_IDS.CASH]: 1,
        [WIDGET_IDS.AR]: 1,
        [WIDGET_IDS.AP]: 1,
        [WIDGET_IDS.INVOICES]: 1,
        [WIDGET_IDS.AR_WIDGET]: 2,
        [WIDGET_IDS.AP_WIDGET]: 2,
        [WIDGET_IDS.CASHFLOW]: 2,
        [WIDGET_IDS.BUDGET]: 2,
        [WIDGET_IDS.PROFITABILITY]: 4,
        [WIDGET_IDS.EXPENSES_WIDGET]: 4,
        [WIDGET_IDS.TRANSACTIONS]: 3,
        [WIDGET_IDS.ALERTS]: 1,
        [WIDGET_IDS.AI_INSIGHTS]: 4,
      },
    },
  },
  accountant: {
    role: 'accountant',
    name: 'Accountant',
    description: 'Detailed transaction and reconciliation focused view',
    widgets: [
      WIDGET_IDS.CASH,
      WIDGET_IDS.AR,
      WIDGET_IDS.AP,
      WIDGET_IDS.INVOICES,
      WIDGET_IDS.AR_WIDGET,
      WIDGET_IDS.AP_WIDGET,
      WIDGET_IDS.BUDGET,
      WIDGET_IDS.TRANSACTIONS,
      WIDGET_IDS.ALERTS,
    ],
    defaultLayout: {
      widgetVisibility: {
        [WIDGET_IDS.REVENUE]: false,
        [WIDGET_IDS.EXPENSES]: false,
        [WIDGET_IDS.PROFIT]: false,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: true,
        [WIDGET_IDS.AP]: true,
        [WIDGET_IDS.INVOICES]: true,
        [WIDGET_IDS.AR_WIDGET]: true,
        [WIDGET_IDS.AP_WIDGET]: true,
        [WIDGET_IDS.CASHFLOW]: false,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: false,
        [WIDGET_IDS.EXPENSES_WIDGET]: false,
        [WIDGET_IDS.TRANSACTIONS]: true,
        [WIDGET_IDS.ALERTS]: true,
        [WIDGET_IDS.AI_INSIGHTS]: false,
      },
      widgetOrder: [
        WIDGET_IDS.CASH,
        WIDGET_IDS.AR,
        WIDGET_IDS.AP,
        WIDGET_IDS.INVOICES,
        WIDGET_IDS.AR_WIDGET,
        WIDGET_IDS.AP_WIDGET,
        WIDGET_IDS.BUDGET,
        WIDGET_IDS.TRANSACTIONS,
        WIDGET_IDS.ALERTS,
      ],
      widgetSizes: {
        [WIDGET_IDS.REVENUE]: 1,
        [WIDGET_IDS.EXPENSES]: 1,
        [WIDGET_IDS.PROFIT]: 1,
        [WIDGET_IDS.CASH]: 1,
        [WIDGET_IDS.AR]: 1,
        [WIDGET_IDS.AP]: 1,
        [WIDGET_IDS.INVOICES]: 1,
        [WIDGET_IDS.AR_WIDGET]: 2,
        [WIDGET_IDS.AP_WIDGET]: 2,
        [WIDGET_IDS.CASHFLOW]: 2,
        [WIDGET_IDS.BUDGET]: 2,
        [WIDGET_IDS.PROFITABILITY]: 4,
        [WIDGET_IDS.EXPENSES_WIDGET]: 4,
        [WIDGET_IDS.TRANSACTIONS]: 4,
        [WIDGET_IDS.ALERTS]: 4,
        [WIDGET_IDS.AI_INSIGHTS]: 4,
      },
    },
  },
  management: {
    role: 'management',
    name: 'Management',
    description: 'Executive overview with strategic metrics',
    widgets: [
      WIDGET_IDS.REVENUE,
      WIDGET_IDS.EXPENSES,
      WIDGET_IDS.PROFIT,
      WIDGET_IDS.CASH,
      WIDGET_IDS.AR,
      WIDGET_IDS.AP,
      WIDGET_IDS.CASHFLOW,
      WIDGET_IDS.BUDGET,
      WIDGET_IDS.PROFITABILITY,
      WIDGET_IDS.ALERTS,
    ],
    defaultLayout: {
      widgetVisibility: {
        [WIDGET_IDS.REVENUE]: true,
        [WIDGET_IDS.EXPENSES]: true,
        [WIDGET_IDS.PROFIT]: true,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: true,
        [WIDGET_IDS.AP]: true,
        [WIDGET_IDS.INVOICES]: false,
        [WIDGET_IDS.AR_WIDGET]: false,
        [WIDGET_IDS.AP_WIDGET]: false,
        [WIDGET_IDS.CASHFLOW]: true,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: true,
        [WIDGET_IDS.EXPENSES_WIDGET]: false,
        [WIDGET_IDS.TRANSACTIONS]: false,
        [WIDGET_IDS.ALERTS]: true,
        [WIDGET_IDS.AI_INSIGHTS]: false,
      },
      widgetOrder: [
        WIDGET_IDS.REVENUE,
        WIDGET_IDS.EXPENSES,
        WIDGET_IDS.PROFIT,
        WIDGET_IDS.CASH,
        WIDGET_IDS.AR,
        WIDGET_IDS.AP,
        WIDGET_IDS.CASHFLOW,
        WIDGET_IDS.BUDGET,
        WIDGET_IDS.PROFITABILITY,
        WIDGET_IDS.ALERTS,
      ],
      widgetSizes: {
        [WIDGET_IDS.REVENUE]: 1,
        [WIDGET_IDS.EXPENSES]: 1,
        [WIDGET_IDS.PROFIT]: 1,
        [WIDGET_IDS.CASH]: 1,
        [WIDGET_IDS.AR]: 1,
        [WIDGET_IDS.AP]: 1,
        [WIDGET_IDS.INVOICES]: 1,
        [WIDGET_IDS.AR_WIDGET]: 2,
        [WIDGET_IDS.AP_WIDGET]: 2,
        [WIDGET_IDS.CASHFLOW]: 2,
        [WIDGET_IDS.BUDGET]: 2,
        [WIDGET_IDS.PROFITABILITY]: 4,
        [WIDGET_IDS.EXPENSES_WIDGET]: 4,
        [WIDGET_IDS.TRANSACTIONS]: 3,
        [WIDGET_IDS.ALERTS]: 1,
        [WIDGET_IDS.AI_INSIGHTS]: 4,
      },
    },
  },
};

/**
 * Get role configuration by role
 */
export function getRoleConfig(role: Role): RoleConfig {
  return ROLE_CONFIGS[role] || ROLE_CONFIGS.management;
}

/**
 * Get all role configurations
 */
export function getAllRoleConfigs(): RoleConfig[] {
  return Object.values(ROLE_CONFIGS);
}
