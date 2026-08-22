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
    return [];
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
