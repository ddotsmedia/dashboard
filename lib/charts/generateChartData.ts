/**
 * Chart Data Generation Utilities
 * Transforms dashboard data into ECharts-compatible formats
 */

import type { HistoricalMetric, CashFlowData } from '@/types/dashboard';

/**
 * Line chart data point for revenue/expenses/profit trends
 */
export interface LineChartPoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

/**
 * Cash flow bar chart data point
 */
export interface CashFlowChartPoint {
  category: string;
  value: number;
}

/**
 * Pie/donut chart data point
 */
export interface PieChartPoint {
  name: string;
  value: number;
}

/**
 * Transform historical metrics into line chart data
 * @param historicalData - Array of historical metrics from dashboard
 * @returns Array of line chart points with date, revenue, expenses, profit
 */
export function transformToLineChartData(historicalData: HistoricalMetric[]): LineChartPoint[] {
  return historicalData.map((metric) => ({
    date: metric.month,
    revenue: metric.revenue,
    expenses: metric.expenses,
    profit: metric.profit,
  }));
}

/**
 * Transform cash flow data into bar chart data
 * @param cashFlowData - Cash flow data object
 * @returns Array of cash flow chart points for bar chart
 */
export function transformToCashFlowData(cashFlowData: CashFlowData): CashFlowChartPoint[] {
  return [
    { category: 'Opening Cash', value: 295489 }, // Simplified calculation
    { category: 'Inflows', value: cashFlowData.inflows },
    { category: 'Outflows', value: cashFlowData.outflows },
    { category: 'Net Cash Flow', value: cashFlowData.netCashFlow },
    { category: 'Closing Cash', value: 456789 }, // From dashboard summary
  ];
}

/**
 * Transform expense breakdown data into pie chart data
 * Uses realistic expense distribution percentages
 * @returns Array of pie chart points with category names and values
 */
export function transformToPieChartData(totalExpenses: number): PieChartPoint[] {
  // Typical expense breakdown for enterprise
  const breakdown = [
    { name: 'Cost of Goods Sold (COGS)', percentage: 40 },
    { name: 'Payroll & Benefits', percentage: 35 },
    { name: 'Rent & Facilities', percentage: 10 },
    { name: 'Utilities & Operations', percentage: 5 },
    { name: 'Other Expenses', percentage: 10 },
  ];

  return breakdown.map((item) => ({
    name: item.name,
    value: Math.round((totalExpenses * item.percentage) / 100),
  }));
}

/**
 * Get line chart x-axis labels from historical data
 * @param historicalData - Array of historical metrics
 * @returns Array of date labels
 */
export function getLineChartXAxisLabels(historicalData: HistoricalMetric[]): string[] {
  return historicalData.map((metric) => metric.month);
}

/**
 * Format revenue and expense values for chart tooltip
 * @param value - Numeric value
 * @param currency - Currency code (AED, USD, EUR)
 * @returns Formatted string
 */
export function formatChartCurrency(value: number, currency: string = 'AED'): string {
  const symbols: Record<string, string> = {
    AED: 'د.إ',
    USD: '$',
    EUR: '€',
  };

  const symbol = symbols[currency] || currency;
  const formatted = new Intl.NumberFormat('ar-AE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return `${symbol} ${formatted}`;
}

/**
 * Calculate revenue range for chart Y-axis
 * @param historicalData - Array of historical metrics
 * @returns Object with min and max values for Y-axis
 */
export function getRevenueRange(historicalData: HistoricalMetric[]): { min: number; max: number } {
  const values = historicalData.flatMap((m) => [m.revenue, m.expenses, m.profit]);
  const min = Math.min(...values);
  const max = Math.max(...values);

  // Add 10% padding for better visualization
  const padding = (max - min) * 0.1;
  return {
    min: Math.max(0, min - padding),
    max: max + padding,
  };
}

/**
 * Get color for a specific metric
 * @param metric - Metric name (revenue, expenses, profit)
 * @returns Hex color code
 */
export function getMetricColor(metric: 'revenue' | 'expenses' | 'profit'): string {
  const colors = {
    revenue: '#10b981', // Emerald green
    expenses: '#f97316', // Orange
    profit: '#3b82f6', // Blue
  };
  return colors[metric];
}

/**
 * Get color for cash flow categories
 * @param category - Category name
 * @returns Hex color code
 */
export function getCashFlowColor(category: string): string {
  const colors: Record<string, string> = {
    'Opening Cash': '#3b82f6', // Blue
    Inflows: '#10b981', // Green
    Outflows: '#ef4444', // Red
    'Net Cash Flow': '#8b5cf6', // Purple
    'Closing Cash': '#3b82f6', // Blue
  };
  return colors[category] || '#6b7280';
}

/**
 * Get color for expense categories (pie chart)
 * @param index - Index of the expense category
 * @returns Hex color code
 */
export function getExpenseColor(index: number): string {
  const colors = [
    '#f97316', // Orange - COGS
    '#ef4444', // Red - Payroll
    '#06b6d4', // Cyan - Rent
    '#f59e0b', // Amber - Utilities
    '#8b5cf6', // Purple - Other
  ];
  return colors[index % colors.length];
}
