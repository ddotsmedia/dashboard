/**
 * Dashboard Service Interface
 * Abstract interface for data access
 */

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
import type { DashboardFilters } from '@/types/api';

export interface ARAgingChartData {
  month: string;
  current: number;
  d1_30: number;
  d31_60: number;
  d61_90: number;
  d90plus: number;
}

export interface APAgingChartData {
  month: string;
  current: number;
  d1_30: number;
  d31_60: number;
  d61_90: number;
  d90plus: number;
}

export interface RevenueExpenseChartData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface CashFlowChartData {
  category: string;
  value: number;
}

export interface ExpenseBreakdownData {
  name: string;
  value: number;
}

export interface IDashboardService {
  getDashboardSummary(filters: DashboardFilters): Promise<DashboardSummary>;
  getTransactions(filters: DashboardFilters): Promise<Transaction[]>;
  getReceivables(filters: DashboardFilters): Promise<ReceivableMetric>;
  getPayables(filters: DashboardFilters): Promise<PayableMetric>;
  getCashFlow(filters: DashboardFilters): Promise<CashFlowData>;
  getBudgets(filters: DashboardFilters): Promise<BudgetItem[]>;
  getAlerts(): Promise<Alert[]>;
  getAIInsights(filters: DashboardFilters): Promise<AIInsight[]>;
  getRevenueExpenseChartData(filters: DashboardFilters): Promise<RevenueExpenseChartData[]>;
  getCashFlowChartData(filters: DashboardFilters): Promise<CashFlowChartData[]>;
  getExpenseBreakdownData(): Promise<ExpenseBreakdownData[]>;
  getARAgingChartData(filters: DashboardFilters): Promise<ARAgingChartData[]>;
  getAPAgingChartData(filters: DashboardFilters): Promise<APAgingChartData[]>;
  getARTopDebtors(): Promise<Array<{ id: string; name: string; amount: number; daysOverdue: number }>>;
  getAPTopSuppliers(): Promise<Array<{ id: string; name: string; amount: number; daysDue: number }>>;
}

// Service instance will be created in index.ts
export let dashboardService: IDashboardService;

export function setDashboardService(service: IDashboardService): void {
  dashboardService = service;
}
