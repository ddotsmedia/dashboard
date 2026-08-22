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

export interface IDashboardService {
  getDashboardSummary(filters: DashboardFilters): Promise<DashboardSummary>;
  getTransactions(filters: DashboardFilters): Promise<Transaction[]>;
  getReceivables(filters: DashboardFilters): Promise<ReceivableMetric>;
  getPayables(filters: DashboardFilters): Promise<PayableMetric>;
  getCashFlow(filters: DashboardFilters): Promise<CashFlowData>;
  getBudgets(filters: DashboardFilters): Promise<BudgetItem[]>;
  getAlerts(): Promise<Alert[]>;
  getAIInsights(filters: DashboardFilters): Promise<AIInsight[]>;
}

// Service instance will be created in index.ts
export let dashboardService: IDashboardService;

export function setDashboardService(service: IDashboardService): void {
  dashboardService = service;
}
