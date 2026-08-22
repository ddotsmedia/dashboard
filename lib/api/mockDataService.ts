/**
 * Mock Data Service Implementation
 */

import type { IDashboardService } from './dashboardService';
import type {
  DashboardSummary,
  ReceivableMetric,
  PayableMetric,
  Alert,
  AIInsight,
  BudgetItem,
  Transaction,
  CashFlowData,
  ProfitabilityItem,
  ExpenseCategory,
  DepartmentExpense,
  TrendData,
  CategoryRanking,
} from '@/types/dashboard';
import type {
  ARAgingChartData,
  APAgingChartData,
  RevenueExpenseChartData,
  CashFlowChartData,
  ExpenseBreakdownData,
} from './dashboardService';
import type { DashboardFilters } from '@/types/api';
import {
  mockDashboardData,
  arAgingChartData,
  apAgingChartData,
} from '@/data/mock/dashboardData';
import { receivablesData, receivablesTopDebtors } from '@/data/mock/receivablesData';
import { payablesData, payablesTopSuppliers } from '@/data/mock/payablesData';
import { cashFlowData } from '@/data/mock/cashFlowData';
import { departmentBudgets } from '@/data/mock/budgetsData';
import { profitabilityData } from '@/data/mock/profitabilityData';
import {
  expenseBreakdown,
  departmentExpenses,
  expenseTrends,
  topExpenseCategories,
} from '@/data/mock/expensesData';

export class MockDashboardService implements IDashboardService {
  async getDashboardSummary(_filters: DashboardFilters): Promise<DashboardSummary> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockDashboardData;
  }

  async getTransactions(_filters: DashboardFilters): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Return mock transactions
    return [];
  }

  async getReceivables(_filters: DashboardFilters): Promise<ReceivableMetric> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return receivablesData;
  }

  async getPayables(_filters: DashboardFilters): Promise<PayableMetric> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return payablesData;
  }

  async getCashFlow(_filters: DashboardFilters): Promise<CashFlowData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return cashFlowData;
  }

  async getBudgets(_filters: DashboardFilters): Promise<BudgetItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return departmentBudgets;
  }

  async getProfitability(
    dimension: string,
    _filters: DashboardFilters
  ): Promise<ProfitabilityItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (dimension === 'branch') {
      return [
        {
          id: '1',
          name: 'Dubai Branch',
          dimension: 'branch',
          revenue: 2850000,
          grossProfit: 1140000,
          netProfit: 427500,
          margin: 15.0,
          changePercent: 12.5,
          trend: 'up',
        },
        {
          id: '2',
          name: 'Abu Dhabi Branch',
          dimension: 'branch',
          revenue: 1920000,
          grossProfit: 729600,
          netProfit: 268800,
          margin: 14.0,
          changePercent: 8.3,
          trend: 'up',
        },
        {
          id: '3',
          name: 'Sharjah Branch',
          dimension: 'branch',
          revenue: 1580000,
          grossProfit: 632000,
          netProfit: 205100,
          margin: 12.99,
          changePercent: -2.1,
          trend: 'down',
        },
      ];
    } else if (dimension === 'department') {
      return [
        {
          id: '1',
          name: 'Sales',
          dimension: 'department',
          revenue: 4200000,
          grossProfit: 2100000,
          netProfit: 840000,
          margin: 20.0,
          changePercent: 15.2,
          trend: 'up',
        },
        {
          id: '2',
          name: 'Operations',
          dimension: 'department',
          revenue: 1850000,
          grossProfit: 925000,
          netProfit: 166500,
          margin: 9.0,
          changePercent: 5.7,
          trend: 'up',
        },
        {
          id: '3',
          name: 'Support Services',
          dimension: 'department',
          revenue: 1300000,
          grossProfit: 476500,
          netProfit: -105200,
          margin: -8.09,
          changePercent: -18.5,
          trend: 'down',
        },
      ];
    } else if (dimension === 'product') {
      return [
        {
          id: '1',
          name: 'Premium Package',
          dimension: 'product',
          revenue: 3200000,
          grossProfit: 1920000,
          netProfit: 704000,
          margin: 22.0,
          changePercent: 18.9,
          trend: 'up',
        },
        {
          id: '2',
          name: 'Standard Package',
          dimension: 'product',
          revenue: 2800000,
          grossProfit: 1176000,
          netProfit: 336000,
          margin: 12.0,
          changePercent: 9.2,
          trend: 'up',
        },
        {
          id: '3',
          name: 'Basic Package',
          dimension: 'product',
          revenue: 1350000,
          grossProfit: 405000,
          netProfit: 67500,
          margin: 5.0,
          changePercent: -3.4,
          trend: 'down',
        },
      ];
    }

    // Default: company-level
    return [
      {
        id: '1',
        name: 'Current Period',
        dimension: 'company',
        revenue: 6350000,
        grossProfit: 3501000,
        netProfit: 1107500,
        margin: 17.45,
        changePercent: 12.8,
        trend: 'up',
      },
      {
        id: '2',
        name: 'Previous Period',
        dimension: 'company',
        revenue: 5627000,
        grossProfit: 3127900,
        netProfit: 981425,
        margin: 17.44,
        changePercent: 0.01,
        trend: 'stable',
      },
    ];
  }

  async getExpenses(_filters: DashboardFilters): Promise<ExpenseCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const expenseData = await this.getExpenseBreakdownData();
    const total = expenseData.reduce((sum, item) => sum + item.value, 0);
    return expenseData.map((item) => ({
      id: item.name.toLowerCase().replace(/\s+/g, '_'),
      category: item.name,
      amount: item.value,
      percentage: (item.value / total) * 100,
      trend: Math.random() > 0.5 ? 5 : -3,
    }));
  }

  async getExpenseBreakdown(): Promise<ExpenseCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return expenseBreakdown;
  }

  async getDepartmentExpenses(): Promise<DepartmentExpense[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return departmentExpenses;
  }

  async getExpenseTrends(): Promise<TrendData[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return expenseTrends;
  }

  async getTopExpenseCategories(): Promise<CategoryRanking[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return topExpenseCategories;
  }

  async getAlerts(): Promise<Alert[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [];
  }

  async getAIInsights(_filters: DashboardFilters): Promise<AIInsight[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [];
  }

  async getRevenueExpenseChartData(
    _filters: DashboardFilters
  ): Promise<RevenueExpenseChartData[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockDashboardData.historicalData.map((item) => ({
      date: item.month,
      revenue: item.revenue,
      expenses: item.expenses,
      profit: item.profit,
    }));
  }

  async getCashFlowChartData(
    _filters: DashboardFilters
  ): Promise<CashFlowChartData[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [
      { category: 'Operating', value: 1245000 },
      { category: 'Investing', value: 180000 },
      { category: 'Financing', value: 95300 },
    ];
  }

  async getExpenseBreakdownData(): Promise<ExpenseBreakdownData[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [
      { name: 'Cost of Goods Sold', value: 485200 },
      { name: 'Salaries & Wages', value: 285600 },
      { name: 'Operating Expenses', value: 189300 },
      { name: 'Marketing & Sales', value: 156400 },
      { name: 'Utilities & Rent', value: 98200 },
      { name: 'Other Expenses', value: 69620 },
    ];
  }

  async getARAgingChartData(_filters: DashboardFilters): Promise<ARAgingChartData[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return arAgingChartData;
  }

  async getAPAgingChartData(_filters: DashboardFilters): Promise<APAgingChartData[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return apAgingChartData;
  }

  async getARTopDebtors(): Promise<Array<{ id: string; name: string; amount: number; daysOverdue: number }>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return receivablesTopDebtors;
  }

  async getAPTopSuppliers(): Promise<Array<{ id: string; name: string; amount: number; daysDue: number }>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return payablesTopSuppliers;
  }
}
