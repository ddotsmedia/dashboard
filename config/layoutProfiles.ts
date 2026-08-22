/**
 * Dashboard Layout Profiles
 * Predefined layout templates for different user roles and use cases
 */

import type { Layout } from '@/lib/store';
import { WIDGET_IDS } from '@/config/defaultLayout';

/**
 * Profile type definition
 */
export interface LayoutProfile {
  name: string;
  description: string;
  layout: Layout;
}

/**
 * Layout Profiles for different user roles
 */
export const LAYOUT_PROFILES: Record<string, LayoutProfile> = {
  /**
   * Default Profile - All widgets visible with standard organization
   * Best for: General users, finance managers
   */
  default: {
    name: 'Default',
    description: 'All widgets visible with standard layout organization',
    layout: {
      widgetVisibility: {
        // KPI Cards - all visible
        [WIDGET_IDS.REVENUE]: true,
        [WIDGET_IDS.EXPENSES]: true,
        [WIDGET_IDS.PROFIT]: true,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: true,
        [WIDGET_IDS.AP]: true,
        [WIDGET_IDS.INVOICES]: true,

        // Main Widgets - all visible
        [WIDGET_IDS.AR_WIDGET]: true,
        [WIDGET_IDS.AP_WIDGET]: true,
        [WIDGET_IDS.CASHFLOW]: true,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: true,
        [WIDGET_IDS.EXPENSES_WIDGET]: true,

        // Analytics & Data - visible
        [WIDGET_IDS.TRANSACTIONS]: true,
        [WIDGET_IDS.ALERTS]: true,

        // AI Insights - hidden
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
        WIDGET_IDS.AI_INSIGHTS,
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

  /**
   * CFO Focus Profile - Only essential KPIs and strategic metrics
   * Best for: CFO, Executive management
   * Focus: Revenue, cash flow, profitability, budget
   */
  cfoFocus: {
    name: 'CFO Focus',
    description: 'Streamlined view for C-suite with only critical KPIs and strategic metrics',
    layout: {
      widgetVisibility: {
        // KPI Cards - only key metrics
        [WIDGET_IDS.REVENUE]: true,
        [WIDGET_IDS.EXPENSES]: true,
        [WIDGET_IDS.PROFIT]: true,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: false,
        [WIDGET_IDS.AP]: false,
        [WIDGET_IDS.INVOICES]: false,

        // Main Widgets - only strategic
        [WIDGET_IDS.AR_WIDGET]: false,
        [WIDGET_IDS.AP_WIDGET]: false,
        [WIDGET_IDS.CASHFLOW]: true,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: true,
        [WIDGET_IDS.EXPENSES_WIDGET]: false,

        // Analytics & Data - hidden
        [WIDGET_IDS.TRANSACTIONS]: false,
        [WIDGET_IDS.ALERTS]: false,

        // AI Insights - hidden
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

  /**
   * Finance Manager Profile - Comprehensive operational view
   * Best for: Finance managers, operations managers
   * Focus: All KPIs and widgets, no AI
   */
  financeManager: {
    name: 'Finance Manager',
    description: 'Comprehensive operational view with all KPIs and widgets',
    layout: {
      widgetVisibility: {
        // KPI Cards - all visible
        [WIDGET_IDS.REVENUE]: true,
        [WIDGET_IDS.EXPENSES]: true,
        [WIDGET_IDS.PROFIT]: true,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: true,
        [WIDGET_IDS.AP]: true,
        [WIDGET_IDS.INVOICES]: true,

        // Main Widgets - all visible
        [WIDGET_IDS.AR_WIDGET]: true,
        [WIDGET_IDS.AP_WIDGET]: true,
        [WIDGET_IDS.CASHFLOW]: true,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: true,
        [WIDGET_IDS.EXPENSES_WIDGET]: true,

        // Analytics & Data - visible
        [WIDGET_IDS.TRANSACTIONS]: true,
        [WIDGET_IDS.ALERTS]: true,

        // AI Insights - hidden by default
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

  /**
   * Accountant Profile - Detailed transaction and reconciliation focus
   * Best for: Accountants, bookkeepers, finance officers
   * Focus: AR/AP, transactions, alerts, budget
   */
  accountant: {
    name: 'Accountant',
    description: 'Detailed view for transaction processing and reconciliation',
    layout: {
      widgetVisibility: {
        // KPI Cards - essential only
        [WIDGET_IDS.REVENUE]: false,
        [WIDGET_IDS.EXPENSES]: false,
        [WIDGET_IDS.PROFIT]: false,
        [WIDGET_IDS.CASH]: true,
        [WIDGET_IDS.AR]: true,
        [WIDGET_IDS.AP]: true,
        [WIDGET_IDS.INVOICES]: true,

        // Main Widgets - AR/AP focused
        [WIDGET_IDS.AR_WIDGET]: true,
        [WIDGET_IDS.AP_WIDGET]: true,
        [WIDGET_IDS.CASHFLOW]: false,
        [WIDGET_IDS.BUDGET]: true,
        [WIDGET_IDS.PROFITABILITY]: false,
        [WIDGET_IDS.EXPENSES_WIDGET]: false,

        // Analytics & Data - all visible for reconciliation
        [WIDGET_IDS.TRANSACTIONS]: true,
        [WIDGET_IDS.ALERTS]: true,

        // AI Insights - hidden
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
};

/**
 * Get a layout profile by key
 */
export function getLayoutProfile(key: string): LayoutProfile | null {
  return LAYOUT_PROFILES[key] || null;
}

/**
 * Get all available profile names
 */
export function getAvailableProfiles(): string[] {
  return Object.keys(LAYOUT_PROFILES);
}

/**
 * Get all layout profiles
 */
export function getAllProfiles(): LayoutProfile[] {
  return Object.values(LAYOUT_PROFILES);
}
