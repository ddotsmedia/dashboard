/**
 * Mock Budgets Data
 * Department-level budget tracking with variance analysis
 * Currency: AED
 */

import type { BudgetItem } from '@/types/dashboard';

/**
 * Department Budgets
 * 5 departments with budget vs actual comparison
 * Format: Department (Budget/Actual/Variance)
 * - Operations: 500k/480k/20k (96% utilization)
 * - Marketing: 200k/230k/-30k (115% utilization)
 * - HR: 150k/145k/5k (96.7% utilization)
 * - IT: 100k/110k/-10k (110% utilization)
 * - Admin: 50k/48k/2k (96% utilization)
 * Total: 1,000k/1,013k/-13k
 */
export const departmentBudgets: BudgetItem[] = [
  {
    id: 'budget-ops-001',
    name: 'Operations',
    department: 'Operations',
    budgetAmount: 500000,
    spentAmount: 480000,
    variance: 20000,
    variancePercent: 4.0,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-mkt-001',
    name: 'Marketing',
    department: 'Marketing',
    budgetAmount: 200000,
    spentAmount: 230000,
    variance: -30000,
    variancePercent: -15.0,
    status: 'over-budget',
    month: 'Aug 2024',
  },
  {
    id: 'budget-hr-001',
    name: 'Human Resources',
    department: 'HR',
    budgetAmount: 150000,
    spentAmount: 145000,
    variance: 5000,
    variancePercent: 3.3,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-it-001',
    name: 'Information Technology',
    department: 'IT',
    budgetAmount: 100000,
    spentAmount: 110000,
    variance: -10000,
    variancePercent: -10.0,
    status: 'at-risk',
    month: 'Aug 2024',
  },
  {
    id: 'budget-admin-001',
    name: 'Administration',
    department: 'Admin',
    budgetAmount: 50000,
    spentAmount: 48000,
    variance: 2000,
    variancePercent: 4.0,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-total-001',
    name: 'Total Budget',
    department: 'Company',
    budgetAmount: 1000000,
    spentAmount: 1013000,
    variance: -13000,
    variancePercent: -1.3,
    status: 'on-track',
    month: 'Aug 2024',
  },
];

/**
 * Utilization percentages by department
 */
export const budgetUtilization = {
  operations: 96.0,
  marketing: 115.0,
  hr: 96.7,
  it: 110.0,
  admin: 96.0,
  total: 101.3,
};

/**
 * Variance status colors
 * Green: 0-5% variance (on-track)
 * Yellow: 5-15% variance (at-risk)
 * Red: >15% variance (over-budget)
 */
export const varianceColors = {
  onTrack: '#10b981', // Green
  atRisk: '#f59e0b', // Yellow
  overBudget: '#ef4444', // Red
};

/**
 * Monthly budget trend for total organization
 * Shows budget vs actual for last 6 months
 */
export const budgetTrends = [
  {
    month: 'Mar 2024',
    budget: 980000,
    actual: 965000,
    variance: 15000,
    variancePercent: 1.5,
  },
  {
    month: 'Apr 2024',
    budget: 990000,
    actual: 998000,
    variance: -8000,
    variancePercent: -0.8,
  },
  {
    month: 'May 2024',
    budget: 1000000,
    actual: 1005000,
    variance: -5000,
    variancePercent: -0.5,
  },
  {
    month: 'Jun 2024',
    budget: 1000000,
    actual: 1010000,
    variance: -10000,
    variancePercent: -1.0,
  },
  {
    month: 'Jul 2024',
    budget: 1000000,
    actual: 1008000,
    variance: -8000,
    variancePercent: -0.8,
  },
  {
    month: 'Aug 2024',
    budget: 1000000,
    actual: 1013000,
    variance: -13000,
    variancePercent: -1.3,
  },
];

/**
 * Export all budget data as immutable objects
 */
export const budgetsData = Object.freeze({
  departmentBudgets: Object.freeze(departmentBudgets),
  budgetUtilization: Object.freeze(budgetUtilization),
  varianceColors: Object.freeze(varianceColors),
  budgetTrends: Object.freeze(budgetTrends),
});
