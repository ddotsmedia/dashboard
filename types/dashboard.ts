/**
 * Dashboard Types
 * Core types for dashboard functionality
 */

export interface DashboardSummary {
  totalRevenue: number;
  totalExpenses: number;
  grossProfit: number;
  netProfit: number;
  cashBalance: number;
  accountsReceivable: number;
  accountsPayable: number;
  currency: 'AED' | 'USD' | 'EUR';
  historicalData: HistoricalMetric[];
  yearOverYearGrowth: number;
  lastUpdated: Date;
}

export interface HistoricalMetric {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
}

export interface KPIMetric {
  label: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  trend?: 'up' | 'down' | 'stable';
  currency?: string;
  format?: 'currency' | 'percentage' | 'number';
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  type: 'revenue' | 'expense' | 'transfer' | 'payment' | 'receipt' | 'debit' | 'credit';
  amount: number;
  category: string;
  status: 'draft' | 'posted' | 'reconciled' | 'Draft' | 'Posted' | 'Reconciled';
  reference?: string;
  account?: string;
  currency?: 'AED' | 'USD' | 'EUR';
  notes?: string;
}

export interface ReceivableMetric {
  totalAR: number;
  current: number;
  overdue: number;
  collectionRate: number;
  agingBuckets: ARAgingBucket[];
  topCustomers: CustomerBalance[];
  daysOutstanding: number;
}

export interface PayableMetric {
  totalAP: number;
  current: number;
  overdue: number;
  topSuppliers: SupplierBalance[];
  agingBuckets: APAgingBucket[];
  paymentCycle: number;
}

export interface ARAgingBucket {
  bucket: string; // e.g., "0-30", "31-60", "61-90", "91+"
  amount: number;
  percentage: number;
  count: number;
}

export interface APAgingBucket {
  bucket: string; // e.g., "0-30", "31-60", "61-90", "91+"
  amount: number;
  percentage: number;
  count: number;
}

export interface CustomerBalance {
  id: string;
  name: string;
  amount: number;
  daysOutstanding: number;
  lastTransaction: Date;
}

export interface SupplierBalance {
  id: string;
  name: string;
  amount: number;
  daysPayable: number;
  lastTransaction: Date;
}

export interface Alert {
  id: string;
  type?: 'critical' | 'warning' | 'attention' | 'info';
  severity?: 'CRITICAL' | 'WARNING' | 'ATTENTION' | 'INFO';
  title: string;
  description: string;
  timestamp: Date;
  actionUrl?: string;
  actionLabel?: string;
  resourceType?: string;
  resourceId?: string;
  read?: boolean;
  dismissed?: boolean;
}

export interface AIInsight {
  id: string;
  category: 'trend' | 'anomaly' | 'forecast' | 'recommendation';
  title: string;
  description: string;
  confidence: number; // 0-100
  relevance: number; // 0-100
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface BudgetItem {
  id: string;
  name: string;
  department: string;
  budgetAmount: number;
  spentAmount: number;
  variance: number;
  variancePercent: number;
  status: 'on-track' | 'at-risk' | 'over-budget' | 'under-utilized';
  month: string;
}

export interface FinancialRatio {
  name: string;
  value: number;
  benchmark?: number;
  status: 'healthy' | 'warning' | 'critical';
  description?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: unknown;
}

export interface CashFlowData {
  inflows: number;
  outflows: number;
  netCashFlow: number;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  periods: CashFlowPeriod[];
}

export interface CashFlowPeriod {
  period: string;
  inflows: number;
  outflows: number;
  netCashFlow: number;
}

export interface ProfitabilityMetric {
  grossMargin: number;
  netMargin: number;
  operatingMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  ebitda: number;
  trends: ProfitabilityTrend[];
}

export interface ProfitabilityTrend {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
}

export interface ProfitabilityItem {
  id: string;
  name: string;
  dimension: 'company' | 'branch' | 'department' | 'product' | 'customer';
  revenue: number;
  grossProfit: number;
  netProfit: number;
  margin: number;
  changePercent?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface ExpenseCategory {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  color?: string;
  trend?: number;
}

export interface DepartmentExpense {
  id: string;
  department: string;
  amount: number;
  percentage: number;
  budget?: number;
  variance?: number;
  variancePercent?: number;
  trend?: number;
}

export interface TrendData {
  period: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
}

export interface CategoryRanking {
  rank: number;
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export type Locale = 'en' | 'ar';
export type Currency = 'AED' | 'USD' | 'EUR';
