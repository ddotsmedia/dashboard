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
import type { DashboardFilters } from '@/types/api';
import { mockDashboardData } from '@/data/mock/dashboardData';

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
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      totalAR: 456200,
      current: 410600,
      overdue: 45600,
      collectionRate: 94,
      agingBuckets: [
        { bucket: '0-30', amount: 410600, percentage: 90, count: 85 },
        { bucket: '31-60', amount: 30240, percentage: 6.6, count: 12 },
        { bucket: '61-90', amount: 10868, percentage: 2.4, count: 5 },
        { bucket: '91+', amount: 4492, percentage: 1, count: 1 },
      ],
      topCustomers: [
        {
          id: '1',
          name: 'Acme Corp',
          amount: 125000,
          daysOutstanding: 15,
          lastTransaction: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        },
      ],
      daysOutstanding: 28,
    };
  }

  async getPayables(_filters: DashboardFilters): Promise<PayableMetric> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      totalAP: 234567,
      current: 222227,
      overdue: 12340,
      topSuppliers: [],
      agingBuckets: [
        { bucket: '0-30', amount: 222227, percentage: 94.8, count: 42 },
        { bucket: '31-60', amount: 8260, percentage: 3.5, count: 3 },
        { bucket: '61-90', amount: 2460, percentage: 1.05, count: 1 },
        { bucket: '91+', amount: 1620, percentage: 0.65, count: 1 },
      ],
      paymentCycle: 30,
    };
  }

  async getCashFlow(_filters: DashboardFilters): Promise<CashFlowData> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      inflows: 2845620,
      outflows: 1284320,
      netCashFlow: 1561300,
      operatingCashFlow: 1561300,
      investingCashFlow: -200000,
      financingCashFlow: -100000,
      periods: [],
    };
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
}
