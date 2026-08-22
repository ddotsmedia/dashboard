/**
 * Default Dashboard Layout Configuration
 * Defines the default visibility, order, and sizes for dashboard widgets
 */

import type { Layout } from '@/lib/store';

/**
 * Widget IDs for reference
 */
export const WIDGET_IDS = {
  // KPI Cards
  REVENUE: 'kpi-revenue',
  EXPENSES: 'kpi-expenses',
  PROFIT: 'kpi-profit',
  CASH: 'kpi-cash-flow',
  AR: 'kpi-ar',
  AP: 'kpi-ap',
  INVOICES: 'kpi-working-capital',

  // Widgets
  AR_WIDGET: 'widget-ar',
  AP_WIDGET: 'widget-ap',
  CASHFLOW: 'widget-cf',
  BUDGET: 'widget-budget',
  PROFITABILITY: 'widget-profitability',
  EXPENSES_WIDGET: 'widget-expenses',

  // Analytics & Data
  TRANSACTIONS: 'widget-transactions',
  ALERTS: 'widget-alerts',
  AI_INSIGHTS: 'widget-ai-insights',
} as const;

/**
 * Available widgets with details
 */
export const AVAILABLE_WIDGETS = [
  // KPI Cards (7)
  { id: 'kpi-revenue', name: 'Revenue', description: 'Total revenue for the period' },
  { id: 'kpi-expenses', name: 'Expenses', description: 'Total operating expenses' },
  { id: 'kpi-profit', name: 'Profit', description: 'Net profit margin' },
  { id: 'kpi-cash-flow', name: 'Cash Flow', description: 'Current cash position' },
  { id: 'kpi-ar', name: 'AR Balance', description: 'Accounts receivable total' },
  { id: 'kpi-ap', name: 'AP Balance', description: 'Accounts payable total' },
  { id: 'kpi-working-capital', name: 'Working Capital', description: 'Current ratio and liquidity' },

  // Financial Metrics
  { id: 'widget-ar', name: 'Accounts Receivable', description: 'AR aging and collection metrics' },
  { id: 'widget-ap', name: 'Accounts Payable', description: 'AP aging and payment schedule' },
  { id: 'widget-cf', name: 'Cash Flow', description: 'Inflows and outflows analysis' },

  // Analytics
  { id: 'widget-budget', name: 'Budget Analysis', description: 'Budget vs actual comparison' },
  { id: 'widget-profitability', name: 'Profitability', description: 'Profit margins and trends' },
  { id: 'widget-expenses', name: 'Expenses', description: 'Expense breakdown by category' },

  // Data
  { id: 'widget-transactions', name: 'Transactions', description: 'Recent transactions list' },
  { id: 'widget-alerts', name: 'Alerts', description: 'Critical alerts and notifications' },
  { id: 'widget-ai-insights', name: 'AI Insights', description: 'AI-powered financial insights' },
  { id: 'widget-financial-ratios', name: 'Financial Ratios', description: 'Key financial ratios and metrics' },
];

/**
 * Default widget visibility
 */
export const DEFAULT_WIDGET_VISIBILITY: Record<string, boolean> = {
  'kpi-revenue': true,
  'kpi-expenses': true,
  'kpi-profit': true,
  'kpi-cash-flow': true,
  'kpi-ar': true,
  'kpi-ap': true,
  'kpi-working-capital': true,
  'widget-ar': true,
  'widget-ap': true,
  'widget-cf': true,
  'widget-budget': true,
  'widget-profitability': true,
  'widget-expenses': true,
  'widget-transactions': true,
  'widget-alerts': true,
  'widget-ai-insights': false,
  'widget-financial-ratios': false,
};

/**
 * Default widget order
 */
export const DEFAULT_WIDGET_ORDER = [
  'kpi-revenue',
  'kpi-expenses',
  'kpi-profit',
  'kpi-cash-flow',
  'kpi-ar',
  'kpi-ap',
  'kpi-working-capital',
  'widget-ar',
  'widget-ap',
  'widget-cf',
  'widget-budget',
  'widget-profitability',
  'widget-expenses',
  'widget-transactions',
  'widget-alerts',
];

/**
 * Default widget sizes (in grid columns)
 */
export const DEFAULT_WIDGET_SIZES: Record<string, 1 | 2 | 3 | 4> = {
  'kpi-revenue': 1,
  'kpi-expenses': 1,
  'kpi-profit': 1,
  'kpi-cash-flow': 1,
  'kpi-ar': 1,
  'kpi-ap': 1,
  'kpi-working-capital': 1,
  'widget-ar': 2,
  'widget-ap': 2,
  'widget-cf': 2,
  'widget-budget': 2,
  'widget-profitability': 2,
  'widget-expenses': 2,
  'widget-transactions': 4,
  'widget-alerts': 2,
  'widget-ai-insights': 2,
  'widget-financial-ratios': 2,
};

/**
 * Default dashboard layout
 */
export const DEFAULT_LAYOUT: Layout = {
  widgetVisibility: DEFAULT_WIDGET_VISIBILITY,
  widgetOrder: DEFAULT_WIDGET_ORDER,
  widgetSizes: DEFAULT_WIDGET_SIZES,
};

/**
 * Widget labels for backward compatibility
 */
export const WIDGET_LABELS: Record<string, string> = {
  'kpi-revenue': 'Revenue',
  'kpi-expenses': 'Expenses',
  'kpi-profit': 'Profit',
  'kpi-cash-flow': 'Cash Flow',
  'kpi-ar': 'AR Balance',
  'kpi-ap': 'AP Balance',
  'kpi-working-capital': 'Working Capital',
  'widget-ar': 'Accounts Receivable',
  'widget-ap': 'Accounts Payable',
  'widget-cf': 'Cash Flow',
  'widget-budget': 'Budget Analysis',
  'widget-profitability': 'Profitability',
  'widget-expenses': 'Expenses',
  'widget-transactions': 'Transactions',
  'widget-alerts': 'Alerts',
  'widget-ai-insights': 'AI Insights',
  'widget-financial-ratios': 'Financial Ratios',
};
