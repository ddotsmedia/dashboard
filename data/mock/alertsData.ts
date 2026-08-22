/**
 * Mock Alerts Data
 * 10 realistic alerts with scenarios
 */

import type { Alert } from '@/types/dashboard';

/**
 * Helper function to generate realistic relative timestamps
 */
function getRelativeDate(hoursAgo: number): Date {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date;
}

function getDaysAgoDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

/**
 * 10 Realistic Alerts with Specific Scenarios
 */
export const alertsData: Alert[] = Object.freeze([
  {
    id: 'alert-001',
    severity: 'CRITICAL',
    type: 'critical',
    title: 'Cash balance below 100k threshold',
    description: 'Operating account balance has fallen to AED 87,450. Current balance is below the recommended safety threshold of AED 100,000. Immediate action recommended.',
    timestamp: getRelativeDate(2),
    actionUrl: '/dashboard/cash-flow',
    actionLabel: 'View Cash Flow',
    resourceType: 'cash_account',
    resourceId: 'acc-001',
    read: false,
    dismissed: false,
  },
  {
    id: 'alert-002',
    severity: 'WARNING',
    type: 'warning',
    title: 'Marketing budget exceeded by 15%',
    description: 'Marketing department has spent AED 230,400 against a budget of AED 180,000. Current overage: AED 50,400 (28% over budget). Review spending with department manager.',
    timestamp: getRelativeDate(3),
    actionUrl: '/dashboard/budget',
    actionLabel: 'Review Budget',
    resourceType: 'budget_item',
    resourceId: 'dept-marketing',
    read: false,
    dismissed: false,
  },
  {
    id: 'alert-003',
    severity: 'ATTENTION',
    type: 'attention',
    title: '14 invoices are overdue',
    description: 'You have 14 unpaid invoices that are overdue. Total outstanding amount: AED 234,560. Days overdue range from 15 to 87 days. Collection action recommended.',
    timestamp: getRelativeDate(6),
    actionUrl: '/dashboard/receivables',
    actionLabel: 'View Overdue Invoices',
    resourceType: 'accounts_receivable',
    resourceId: 'ar-aging',
    read: true,
    dismissed: false,
  },
  {
    id: 'alert-004',
    severity: 'INFO',
    type: 'info',
    title: 'Monthly financial report is ready',
    description: 'Your August 2024 financial report has been generated and is available for download. Report includes income statement, balance sheet, and cash flow analysis.',
    timestamp: getRelativeDate(24),
    actionUrl: '/dashboard/reports',
    actionLabel: 'Download Report',
    resourceType: 'report',
    resourceId: 'report-2024-08',
    read: false,
    dismissed: false,
  },
  {
    id: 'alert-005',
    severity: 'CRITICAL',
    type: 'critical',
    title: '3 vendor payments are 30+ days overdue',
    description: 'You have 3 outstanding vendor payments that are significantly overdue. Total due: AED 156,230. Days overdue: 32-67 days. Risk of service disruption or payment penalties.',
    timestamp: getDaysAgoDate(5),
    actionUrl: '/dashboard/payables',
    actionLabel: 'View Overdue Payments',
    resourceType: 'accounts_payable',
    resourceId: 'ap-aging',
    read: false,
    dismissed: false,
  },
  {
    id: 'alert-006',
    severity: 'WARNING',
    type: 'warning',
    title: 'AR aging is deteriorating (90+ days at 5%)',
    description: 'Accounts receivable aging analysis shows 5% of your AR is over 90 days old, up from 3.6% last month. This indicates potential collection challenges. Total amount at risk: AED 23,100.',
    timestamp: getDaysAgoDate(7),
    actionUrl: '/dashboard/receivables/aging',
    actionLabel: 'Review AR Aging',
    resourceType: 'accounts_receivable',
    resourceId: 'ar-aging-detail',
    read: true,
    dismissed: false,
  },
  {
    id: 'alert-007',
    severity: 'INFO',
    type: 'info',
    title: 'Reconciliation completed for November',
    description: 'Your November 2023 bank reconciliation has been completed successfully. All transactions matched. Reconciliation completed by: Finance Team.',
    timestamp: getDaysAgoDate(14),
    actionUrl: '/dashboard/reconciliation',
    actionLabel: 'View Details',
    resourceType: 'reconciliation',
    resourceId: 'recon-2023-11',
    read: true,
    dismissed: false,
  },
  {
    id: 'alert-008',
    severity: 'ATTENTION',
    type: 'attention',
    title: 'Expense variance detected in Operations',
    description: 'Operations department expenses show a 18.5% unfavorable variance for August. Actual spending: AED 385,200 vs. budgeted: AED 450,000. Root cause analysis recommended.',
    timestamp: getDaysAgoDate(8),
    actionUrl: '/dashboard/expenses',
    actionLabel: 'View Variance Analysis',
    resourceType: 'expense_report',
    resourceId: 'dept-operations',
    read: false,
    dismissed: false,
  },
  {
    id: 'alert-009',
    severity: 'WARNING',
    type: 'warning',
    title: 'Cash flow projection shows negative trend',
    description: 'Based on current payment cycles and receivables collection rate, cash flow is projected to decline 12% over the next 3 months. Projected cash position by November: AED 402,000.',
    timestamp: getDaysAgoDate(10),
    actionUrl: '/dashboard/cash-flow/forecast',
    actionLabel: 'View Forecast',
    resourceType: 'forecast',
    resourceId: 'cf-forecast-3m',
    read: false,
    dismissed: false,
  },
  {
    id: 'alert-010',
    severity: 'INFO',
    type: 'info',
    title: 'Year-end close process initiated',
    description: 'The August 2024 financial close process has been initiated. All transactions must be finalized by August 31st. Current status: In Progress (92% complete).',
    timestamp: getDaysAgoDate(3),
    actionUrl: '/dashboard/close-process',
    actionLabel: 'View Close Status',
    resourceType: 'month_close',
    resourceId: 'close-2024-08',
    read: true,
    dismissed: false,
  },
]) as Alert[];

/**
 * Export for backward compatibility
 */
export const mockAlerts: Alert[] = alertsData;

/**
 * Export alert count for verification
 */
export const alertsCount = alertsData.length;
