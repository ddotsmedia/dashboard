/**
 * Financial Types
 * Extended financial data types
 */

export interface RevenueMetric {
  totalRevenue: number;
  revenueByCategory: RevenueByCategory[];
  revenueByCustomer: RevenueByCustomer[];
  revenueGrowth: number;
  revenueGrowthPercent: number;
  monthlyRevenue: MonthlyMetric[];
  averageTicketValue: number;
}

export interface RevenueByCategory {
  category: string;
  amount: number;
  percentage: number;
  trend: number;
}

export interface RevenueByCustomer {
  customerId: string;
  customerName: string;
  amount: number;
  percentage: number;
  transactionCount: number;
}

export interface ExpenseMetric {
  totalExpenses: number;
  expenseByCategory: ExpenseByCategory[];
  expenseByDepartment: ExpenseByDepartment[];
  expenseGrowth: number;
  expenseGrowthPercent: number;
  monthlyExpense: MonthlyMetric[];
}

export interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
  budget?: number;
  variance?: number;
}

export interface ExpenseByDepartment {
  department: string;
  amount: number;
  percentage: number;
  budget?: number;
  variance?: number;
}

export interface MonthlyMetric {
  month: string;
  value: number;
  previousValue?: number;
  change?: number;
}

export interface CashFlowMetric {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  totalCashFlow: number;
  monthlyFlow: MonthlyCashFlow[];
  forecastedFlow: ForecastedCashFlow[];
}

export interface MonthlyCashFlow {
  month: string;
  operating: number;
  investing: number;
  financing: number;
  total: number;
}

export interface ForecastedCashFlow {
  month: string;
  projectedFlow: number;
  confidence: number; // 0-100
}

export interface ProfitabilityMetricExtended {
  grossMargin: number;
  grossMarginTrend: number;
  netMargin: number;
  netMarginTrend: number;
  operatingMargin: number;
  operatingMarginTrend: number;
  ebitda: number;
  ebitdaMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  roi: number;
}

export interface BalanceSheetItem {
  id: string;
  name: string;
  currentValue: number;
  previousValue?: number;
  change?: number;
  percentage?: number;
  category: 'asset' | 'liability' | 'equity';
  subcategory?: string;
}

export interface IncomeStatementItem {
  id: string;
  name: string;
  amount: number;
  percentage?: number;
  previousAmount?: number;
  trend?: number;
}

export interface CashFlowStatementItem {
  id: string;
  name: string;
  amount: number;
  category: 'operating' | 'investing' | 'financing';
}

export interface FinancialRatioSet {
  liquidity: FinancialRatio[];
  profitability: FinancialRatio[];
  efficiency: FinancialRatio[];
  leverage: FinancialRatio[];
}

export interface FinancialRatio {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  benchmark?: number;
  industry?: number;
  status: 'healthy' | 'caution' | 'critical';
  interpretation: string;
}

export interface BudgetPerformance {
  period: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: 'on-track' | 'at-risk' | 'over-budget';
}

export interface Variance {
  category: string;
  amount: number;
  percentage: number;
  favorability: 'favorable' | 'unfavorable';
  reason?: string;
}

export interface FinancialForecast {
  period: string;
  projectedRevenue: number;
  projectedExpenses: number;
  projectedProfit: number;
  confidence: number; // 0-100
}

export interface FinancialGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  progress: number; // percentage
  deadline: Date;
  status: 'on-track' | 'at-risk' | 'achieved' | 'missed';
  notes?: string;
}
