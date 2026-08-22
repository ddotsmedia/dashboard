/**
 * Mock Expenses Data
 * Comprehensive expense tracking and analysis
 * Currency: AED
 */

import type { ExpenseCategory, DepartmentExpense, TrendData, CategoryRanking } from '@/types/dashboard';
import type { ExpenseMetric } from '@/types/financial';

/**
 * Total Expenses: 1,284,320 AED
 * Change: -2.3% (month-over-month)
 * Breakdown:
 * - COGS: 40% = 513,728 AED
 * - Payroll: 35% = 449,512 AED
 * - Rent: 10% = 128,432 AED
 * - Utilities: 5% = 64,216 AED
 * - Other: 10% = 128,432 AED
 */

const TOTAL_EXPENSES = 1284320;
const MONTHLY_CHANGE_PERCENT = -2.3;
const PREVIOUS_MONTH_EXPENSES = Math.round(TOTAL_EXPENSES / (1 - MONTHLY_CHANGE_PERCENT / 100));
const EXPENSE_CHANGE = TOTAL_EXPENSES - PREVIOUS_MONTH_EXPENSES;

/**
 * Expense Breakdown by Category
 * Primary expense categories with percentages and trends
 */
export const expenseBreakdown: ExpenseCategory[] = [
  {
    id: 'exp-cat-001',
    category: 'Cost of Goods Sold (COGS)',
    amount: 513728,
    percentage: 40.0,
    color: '#3b82f6', // Blue
    trend: -3.2,
  },
  {
    id: 'exp-cat-002',
    category: 'Payroll & Benefits',
    amount: 449512,
    percentage: 35.0,
    color: '#10b981', // Green
    trend: 1.5,
  },
  {
    id: 'exp-cat-003',
    category: 'Rent & Facilities',
    amount: 128432,
    percentage: 10.0,
    color: '#f59e0b', // Yellow
    trend: 0.0,
  },
  {
    id: 'exp-cat-004',
    category: 'Utilities & Services',
    amount: 64216,
    percentage: 5.0,
    color: '#ec4899', // Pink
    trend: 2.1,
  },
  {
    id: 'exp-cat-005',
    category: 'Other Expenses',
    amount: 128432,
    percentage: 10.0,
    color: '#8b5cf6', // Purple
    trend: -1.8,
  },
];

/**
 * Department-level expense analysis
 * Shows spending by department with budget comparison
 */
export const departmentExpenses: DepartmentExpense[] = [
  {
    id: 'exp-dept-001',
    department: 'Operations',
    amount: 380000,
    percentage: 29.6,
    budget: 500000,
    variance: 120000,
    variancePercent: 24.0,
    trend: -1.2,
  },
  {
    id: 'exp-dept-002',
    department: 'Cost of Goods Sold',
    amount: 513728,
    percentage: 40.0,
    budget: 600000,
    variance: 86272,
    variancePercent: 14.4,
    trend: -3.2,
  },
  {
    id: 'exp-dept-003',
    department: 'Marketing & Sales',
    amount: 230000,
    percentage: 17.9,
    budget: 200000,
    variance: -30000,
    variancePercent: -15.0,
    trend: 2.5,
  },
  {
    id: 'exp-dept-004',
    department: 'IT & Technology',
    amount: 110000,
    percentage: 8.6,
    budget: 100000,
    variance: -10000,
    variancePercent: -10.0,
    trend: 3.8,
  },
  {
    id: 'exp-dept-005',
    department: 'Human Resources',
    amount: 50592,
    percentage: 3.9,
    budget: 150000,
    variance: 99408,
    variancePercent: 66.3,
    trend: -0.5,
  },
];

/**
 * 12-month expense trend data
 * Historical expenses from September 2023 to August 2024
 */
export const expenseTrends: TrendData[] = [
  {
    period: 'Sep 2023',
    value: 1187000,
    previousValue: 1165000,
    change: 22000,
    changePercent: 1.9,
  },
  {
    period: 'Oct 2023',
    value: 1201200,
    previousValue: 1187000,
    change: 14200,
    changePercent: 1.2,
  },
  {
    period: 'Nov 2023',
    value: 1215400,
    previousValue: 1201200,
    change: 14200,
    changePercent: 1.2,
  },
  {
    period: 'Dec 2023',
    value: 1289300,
    previousValue: 1215400,
    change: 73900,
    changePercent: 6.1,
  },
  {
    period: 'Jan 2024',
    value: 1245600,
    previousValue: 1289300,
    change: -43700,
    changePercent: -3.4,
  },
  {
    period: 'Feb 2024',
    value: 1218300,
    previousValue: 1245600,
    change: -27300,
    changePercent: -2.2,
  },
  {
    period: 'Mar 2024',
    value: 1235700,
    previousValue: 1218300,
    change: 17400,
    changePercent: 1.4,
  },
  {
    period: 'Apr 2024',
    value: 1251400,
    previousValue: 1235700,
    change: 15700,
    changePercent: 1.3,
  },
  {
    period: 'May 2024',
    value: 1267200,
    previousValue: 1251400,
    change: 15800,
    changePercent: 1.3,
  },
  {
    period: 'Jun 2024',
    value: 1278900,
    previousValue: 1267200,
    change: 11700,
    changePercent: 0.9,
  },
  {
    period: 'Jul 2024',
    value: 1294300,
    previousValue: 1278900,
    change: 15400,
    changePercent: 1.2,
  },
  {
    period: 'Aug 2024',
    value: 1284320,
    previousValue: PREVIOUS_MONTH_EXPENSES,
    change: EXPENSE_CHANGE,
    changePercent: MONTHLY_CHANGE_PERCENT,
  },
];

/**
 * Top 5 Expense Categories
 * Ranked by amount with trend analysis
 */
export const topExpenseCategories: CategoryRanking[] = [
  {
    rank: 1,
    category: 'Cost of Goods Sold (COGS)',
    amount: 513728,
    percentage: 40.0,
    trend: 'down',
    changePercent: -3.2,
  },
  {
    rank: 2,
    category: 'Payroll & Benefits',
    amount: 449512,
    percentage: 35.0,
    trend: 'up',
    changePercent: 1.5,
  },
  {
    rank: 3,
    category: 'Rent & Facilities',
    amount: 128432,
    percentage: 10.0,
    trend: 'stable',
    changePercent: 0.0,
  },
  {
    rank: 4,
    category: 'Other Expenses',
    amount: 128432,
    percentage: 10.0,
    trend: 'down',
    changePercent: -1.8,
  },
  {
    rank: 5,
    category: 'Utilities & Services',
    amount: 64216,
    percentage: 5.0,
    trend: 'up',
    changePercent: 2.1,
  },
];

/**
 * Comprehensive Expense Metric
 * Main expense data structure for dashboard
 */
export const expensesMetric: ExpenseMetric = {
  totalExpenses: TOTAL_EXPENSES,
  expenseByCategory: [
    {
      category: 'Cost of Goods Sold',
      amount: 513728,
      percentage: 40.0,
      budget: 600000,
      variance: 86272,
    },
    {
      category: 'Payroll & Benefits',
      amount: 449512,
      percentage: 35.0,
      budget: 475000,
      variance: 25488,
    },
    {
      category: 'Rent & Facilities',
      amount: 128432,
      percentage: 10.0,
      budget: 130000,
      variance: 1568,
    },
    {
      category: 'Utilities & Services',
      amount: 64216,
      percentage: 5.0,
      budget: 70000,
      variance: 5784,
    },
    {
      category: 'Other Expenses',
      amount: 128432,
      percentage: 10.0,
      budget: 125000,
      variance: -3432,
    },
  ],
  expenseByDepartment: departmentExpenses.map((dept) => ({
    department: dept.department,
    amount: dept.amount,
    percentage: dept.percentage,
    budget: dept.budget,
    variance: dept.variance,
  })),
  expenseGrowth: EXPENSE_CHANGE,
  expenseGrowthPercent: MONTHLY_CHANGE_PERCENT,
  monthlyExpense: expenseTrends.map((trend) => ({
    month: trend.period,
    value: trend.value,
    previousValue: trend.previousValue,
    change: trend.change,
  })),
};

/**
 * Export all expense data as immutable objects
 */
export const expensesData = Object.freeze({
  expenseBreakdown: Object.freeze(expenseBreakdown),
  departmentExpenses: Object.freeze(departmentExpenses),
  expenseTrends: Object.freeze(expenseTrends),
  topExpenseCategories: Object.freeze(topExpenseCategories),
  expensesMetric: Object.freeze(expensesMetric),
  totalExpenses: TOTAL_EXPENSES,
  monthlyChange: MONTHLY_CHANGE_PERCENT,
});
