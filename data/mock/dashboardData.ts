/**
 * Mock Financial Data
 * Realistic 12-month financial dataset for dashboard development
 */

import type {
  DashboardSummary,
  HistoricalMetric,
  Transaction,
  ReceivableMetric,
  PayableMetric,
  Alert,
  AIInsight,
  BudgetItem,
  FinancialRatio,
  CashFlowData,
  ProfitabilityMetric,
} from '@/types/dashboard';

/**
 * Dashboard Summary - Main KPI Data
 * Represents current period (August 2024) with YoY growth of 12.4%
 */
export const dashboardSummary: DashboardSummary = {
  totalRevenue: 2845620,
  totalExpenses: 1284320,
  grossProfit: 1561300,
  netProfit: 1234540,
  cashBalance: 456789,
  accountsReceivable: 456200,
  accountsPayable: 234567,
  currency: 'AED',
  yearOverYearGrowth: 12.4,
  lastUpdated: new Date(),
  historicalData: generateHistoricalMetrics(),
};

/**
 * Generate 12 months of historical data (September 2023 - August 2024)
 * With realistic month-over-month variations
 */
function generateHistoricalMetrics(): HistoricalMetric[] {
  const months = [
    'Sep 2023',
    'Oct 2023',
    'Nov 2023',
    'Dec 2023',
    'Jan 2024',
    'Feb 2024',
    'Mar 2024',
    'Apr 2024',
    'May 2024',
    'Jun 2024',
    'Jul 2024',
    'Aug 2024',
  ];

  const baseRevenue = 2530000;
  const baseExpense = 1143000;

  return months.map((month, index) => {
    // Seasonal variation: Q4 boost, summer dip
    const seasonalFactor =
      month.includes('Dec') ? 1.15 : month.includes('Jul') ? 0.95 : 1.0;
    // Growth trend: 12.4% YoY = ~0.98% monthly
    const growthFactor = 1 + (index * 0.009) / 12;

    const revenue = baseRevenue * seasonalFactor * growthFactor;
    const expenses = baseExpense * seasonalFactor * (growthFactor * 0.95);
    const profit = revenue - expenses;
    const cashFlow = profit * 0.85; // Assume 85% profit converts to cash

    return {
      month,
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      profit: Math.round(profit),
      cashFlow: Math.round(cashFlow),
    };
  });
}

/**
 * Receivables Metrics
 * Accounts receivable aging and customer breakdown
 */
export const receivablesMetric: ReceivableMetric = {
  totalAR: 456200,
  current: 285700,
  overdue: 170500,
  collectionRate: 0.87,
  daysOutstanding: 32,
  agingBuckets: [
    { bucket: '0-30', amount: 285700, percentage: 62.6, count: 47 },
    { bucket: '31-60', amount: 98400, percentage: 21.5, count: 18 },
    { bucket: '61-90', amount: 56200, percentage: 12.3, count: 8 },
    { bucket: '91+', amount: 15900, percentage: 3.6, count: 3 },
  ],
  topCustomers: [
    {
      id: 'cust-001',
      name: 'Emirates Trading Co.',
      amount: 125400,
      daysOutstanding: 28,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 28)),
    },
    {
      id: 'cust-002',
      name: 'Gulf Industries LLC',
      amount: 98700,
      daysOutstanding: 35,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 35)),
    },
    {
      id: 'cust-003',
      name: 'Middle East Logistics',
      amount: 87600,
      daysOutstanding: 42,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 42)),
    },
    {
      id: 'cust-004',
      name: 'Desert Supply Chain',
      amount: 72500,
      daysOutstanding: 21,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 21)),
    },
    {
      id: 'cust-005',
      name: 'UAE Wholesale Partners',
      amount: 72000,
      daysOutstanding: 19,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 19)),
    },
  ],
};

/**
 * Payables Metrics
 * Accounts payable aging and supplier breakdown
 */
export const payablesMetric: PayableMetric = {
  totalAP: 234567,
  current: 156230,
  overdue: 78337,
  paymentCycle: 38,
  agingBuckets: [
    { bucket: '0-30', amount: 156230, percentage: 66.6, count: 42 },
    { bucket: '31-60', amount: 52100, percentage: 22.2, count: 14 },
    { bucket: '61-90', amount: 18240, percentage: 7.8, count: 5 },
    { bucket: '91+', amount: 7997, percentage: 3.4, count: 2 },
  ],
  topSuppliers: [
    {
      id: 'supp-001',
      name: 'Global Manufacturing Ltd.',
      amount: 67800,
      daysPayable: 35,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 35)),
    },
    {
      id: 'supp-002',
      name: 'Asian Components Co.',
      amount: 52400,
      daysPayable: 42,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 42)),
    },
    {
      id: 'supp-003',
      name: 'European Materials Supplier',
      amount: 45200,
      daysPayable: 28,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 28)),
    },
    {
      id: 'supp-004',
      name: 'Local Services Provider',
      amount: 38900,
      daysPayable: 21,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 21)),
    },
    {
      id: 'supp-005',
      name: 'Technology Solutions Inc.',
      amount: 30267,
      daysPayable: 14,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 14)),
    },
  ],
};

/**
 * Sample Transactions
 * Recent financial transactions across the organization
 */
export const transactionsMock: Transaction[] = [
  {
    id: 'txn-001',
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    description: 'Invoice #INV-2024-0847 - Emirates Trading Co.',
    type: 'revenue',
    amount: 125400,
    category: 'Product Sales',
    status: 'posted',
    reference: 'INV-2024-0847',
  },
  {
    id: 'txn-002',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    description: 'Payment to Global Manufacturing Ltd.',
    type: 'expense',
    amount: 67800,
    category: 'Cost of Goods Sold',
    status: 'posted',
    reference: 'PO-2024-5621',
  },
  {
    id: 'txn-003',
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    description: 'Bank Transfer - Operational Expenses',
    type: 'transfer',
    amount: 45000,
    category: 'Operating Expenses',
    status: 'reconciled',
    reference: 'BT-2024-1234',
  },
  {
    id: 'txn-004',
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    description: 'Invoice #INV-2024-0846 - Gulf Industries LLC',
    type: 'revenue',
    amount: 98700,
    category: 'Service Revenue',
    status: 'posted',
    reference: 'INV-2024-0846',
  },
  {
    id: 'txn-005',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    description: 'Employee Payroll Processing',
    type: 'expense',
    amount: 285600,
    category: 'Salaries & Wages',
    status: 'reconciled',
    reference: 'PAY-2024-08',
  },
];

/**
 * Alerts
 * Critical and warning alerts for the dashboard
 */
export const alertsMock: Alert[] = [
  {
    id: 'alert-001',
    type: 'critical',
    title: 'Overdue Receivables',
    description: 'AED 170,500 in accounts receivable is overdue by 30+ days',
    timestamp: new Date(),
    actionUrl: '/dashboard/receivables',
    actionLabel: 'View Details',
    dismissed: false,
  },
  {
    id: 'alert-002',
    type: 'warning',
    title: 'Budget Variance Alert',
    description: 'Marketing department has exceeded budget by 15% this month',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    actionUrl: '/dashboard/budget',
    actionLabel: 'Review Budget',
    dismissed: false,
  },
  {
    id: 'alert-003',
    type: 'attention',
    title: 'Low Cash Balance',
    description: 'Operating cash balance is below recommended minimum threshold',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 4)),
    actionUrl: '/dashboard/cash-flow',
    actionLabel: 'View Cash Flow',
    dismissed: false,
  },
  {
    id: 'alert-004',
    type: 'info',
    title: 'Monthly Close Approaching',
    description: 'Please ensure all transactions are entered before month-end close',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    actionUrl: '/dashboard/transactions',
    actionLabel: 'View Transactions',
    dismissed: false,
  },
];

/**
 * AI Insights
 * AI-generated insights based on financial patterns
 */
export const aiInsightsMock: AIInsight[] = [
  {
    id: 'insight-001',
    category: 'trend',
    title: 'Revenue Growth Acceleration',
    description:
      'Revenue has grown 12.4% YoY with accelerating momentum in Q2-Q3. Current trajectory suggests potential 15%+ growth by year-end.',
    confidence: 92,
    relevance: 95,
    timestamp: new Date(),
    metadata: {
      period: 'YoY',
      dataPoints: 12,
      trend: 'upward',
    },
  },
  {
    id: 'insight-002',
    category: 'anomaly',
    title: 'Expense Spike Detected',
    description:
      'Marketing expenses increased by 28% in August compared to historical average. Recommend review of recent campaigns.',
    confidence: 87,
    relevance: 78,
    timestamp: new Date(new Date().setHours(new Date().getHours() - 5)),
    metadata: {
      department: 'Marketing',
      variance: '28%',
    },
  },
  {
    id: 'insight-003',
    category: 'forecast',
    title: '3-Month Cash Flow Forecast',
    description:
      'Projected cash position to reach AED 520K by November based on current payment cycles and receivables collection rate.',
    confidence: 78,
    relevance: 88,
    timestamp: new Date(new Date().setHours(new Date().getHours() - 12)),
    metadata: {
      forecast_period: '3 months',
      confidence_interval: '±5%',
    },
  },
  {
    id: 'insight-004',
    category: 'recommendation',
    title: 'Optimize Inventory Turnover',
    description:
      'Current inventory metrics suggest opportunity to improve cash conversion by 8-10% through faster turnover cycles.',
    confidence: 84,
    relevance: 72,
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    metadata: {
      potential_savings: 'AED 125K',
      implementation_time: '6 weeks',
    },
  },
];

/**
 * Budget Items
 * Departmental budget tracking
 */
export const budgetItemsMock: BudgetItem[] = [
  {
    id: 'budget-001',
    name: 'Operations',
    department: 'Operations',
    budgetAmount: 450000,
    spentAmount: 385200,
    variance: 64800,
    variancePercent: 14.4,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-002',
    name: 'Marketing',
    department: 'Marketing',
    budgetAmount: 180000,
    spentAmount: 230400,
    variance: -50400,
    variancePercent: -28.0,
    status: 'over-budget',
    month: 'Aug 2024',
  },
  {
    id: 'budget-003',
    name: 'IT & Technology',
    department: 'IT',
    budgetAmount: 250000,
    spentAmount: 187500,
    variance: 62500,
    variancePercent: 25.0,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-004',
    name: 'Sales & Business Development',
    department: 'Sales',
    budgetAmount: 320000,
    spentAmount: 298400,
    variance: 21600,
    variancePercent: 6.75,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-005',
    name: 'Human Resources',
    department: 'HR',
    budgetAmount: 150000,
    spentAmount: 145200,
    variance: 4800,
    variancePercent: 3.2,
    status: 'on-track',
    month: 'Aug 2024',
  },
  {
    id: 'budget-006',
    name: 'Finance',
    department: 'Finance',
    budgetAmount: 120000,
    spentAmount: 98500,
    variance: 21500,
    variancePercent: 17.9,
    status: 'on-track',
    month: 'Aug 2024',
  },
];

/**
 * Financial Ratios
 * Key financial metrics and health indicators
 */
export const financialRatiosMock: FinancialRatio[] = [
  {
    name: 'Current Ratio',
    value: 2.42,
    benchmark: 1.5,
    status: 'healthy',
    description: 'Strong liquidity position - AED 2.42 in current assets per AED 1 of current liabilities',
  },
  {
    name: 'Quick Ratio',
    value: 1.87,
    benchmark: 1.0,
    status: 'healthy',
    description: 'Excellent ability to meet short-term obligations without selling inventory',
  },
  {
    name: 'Debt-to-Equity Ratio',
    value: 0.58,
    benchmark: 1.0,
    status: 'healthy',
    description: 'Conservative leverage - AED 0.58 of debt for every AED 1 of equity',
  },
  {
    name: 'Gross Profit Margin',
    value: 54.9,
    benchmark: 45.0,
    status: 'healthy',
    description: 'Strong gross margin indicating efficient production and pricing',
  },
  {
    name: 'Net Profit Margin',
    value: 43.4,
    benchmark: 30.0,
    status: 'healthy',
    description: 'Excellent bottom-line profitability after all expenses',
  },
  {
    name: 'Return on Assets (ROA)',
    value: 18.2,
    benchmark: 8.0,
    status: 'healthy',
    description: 'Efficient use of assets to generate profits',
  },
];

/**
 * Cash Flow Data
 * Comprehensive cash flow analysis
 */
export const cashFlowDataMock: CashFlowData = {
  inflows: 2845620,
  outflows: 1284320,
  netCashFlow: 1561300,
  operatingCashFlow: 1245000,
  investingCashFlow: -180000,
  financingCashFlow: 95300,
  periods: [
    {
      period: 'Aug 2024',
      inflows: 287200,
      outflows: 125400,
      netCashFlow: 161800,
    },
    {
      period: 'Jul 2024',
      inflows: 268900,
      outflows: 118600,
      netCashFlow: 150300,
    },
    {
      period: 'Jun 2024',
      inflows: 275100,
      outflows: 129700,
      netCashFlow: 145400,
    },
    {
      period: 'May 2024',
      inflows: 263400,
      outflows: 115300,
      netCashFlow: 148100,
    },
    {
      period: 'Apr 2024',
      inflows: 258700,
      outflows: 122800,
      netCashFlow: 135900,
    },
    {
      period: 'Mar 2024',
      inflows: 282300,
      outflows: 131200,
      netCashFlow: 151100,
    },
  ],
};

/**
 * Profitability Metrics
 * Detailed profitability analysis
 */
export const profitabilityMetricsMock: ProfitabilityMetric = {
  grossMargin: 54.9,
  netMargin: 43.4,
  operatingMargin: 48.2,
  returnOnAssets: 18.2,
  returnOnEquity: 42.8,
  ebitda: 1567890,
  trends: [
    {
      period: 'Aug 2024',
      revenue: 287200,
      expenses: 125400,
      profit: 161800,
      margin: 56.3,
    },
    {
      period: 'Jul 2024',
      revenue: 268900,
      expenses: 118600,
      profit: 150300,
      margin: 55.9,
    },
    {
      period: 'Jun 2024',
      revenue: 275100,
      expenses: 129700,
      profit: 145400,
      margin: 52.8,
    },
    {
      period: 'May 2024',
      revenue: 263400,
      expenses: 115300,
      profit: 148100,
      margin: 56.2,
    },
    {
      period: 'Apr 2024',
      revenue: 258700,
      expenses: 122800,
      profit: 135900,
      margin: 52.5,
    },
    {
      period: 'Mar 2024',
      revenue: 282300,
      expenses: 131200,
      profit: 151100,
      margin: 53.5,
    },
  ],
};

/**
 * AR Aging Chart Data
 * 12 months of AR aging bucket history
 */
export const arAgingChartData = [
  {
    month: 'Sep 2023',
    current: 245300,
    d1_30: 68900,
    d31_60: 35600,
    d61_90: 18200,
    d90plus: 8600,
  },
  {
    month: 'Oct 2023',
    current: 258700,
    d1_30: 72100,
    d31_60: 38900,
    d61_90: 19800,
    d90plus: 7200,
  },
  {
    month: 'Nov 2023',
    current: 272400,
    d1_30: 75600,
    d31_60: 41200,
    d61_90: 21500,
    d90plus: 6800,
  },
  {
    month: 'Dec 2023',
    current: 285700,
    d1_30: 79200,
    d31_60: 43800,
    d61_90: 23100,
    d90plus: 6300,
  },
  {
    month: 'Jan 2024',
    current: 268900,
    d1_30: 74600,
    d31_60: 40500,
    d61_90: 21800,
    d90plus: 7200,
  },
  {
    month: 'Feb 2024',
    current: 252100,
    d1_30: 70300,
    d31_60: 38200,
    d61_90: 20600,
    d90plus: 8400,
  },
  {
    month: 'Mar 2024',
    current: 276800,
    d1_30: 76900,
    d31_60: 42100,
    d61_90: 22700,
    d90plus: 7200,
  },
  {
    month: 'Apr 2024',
    current: 265300,
    d1_30: 73500,
    d31_60: 40200,
    d61_90: 21900,
    d90plus: 7800,
  },
  {
    month: 'May 2024',
    current: 278200,
    d1_30: 77300,
    d31_60: 42600,
    d61_90: 23200,
    d90plus: 6900,
  },
  {
    month: 'Jun 2024',
    current: 282100,
    d1_30: 78200,
    d31_60: 43400,
    d61_90: 23800,
    d90plus: 6700,
  },
  {
    month: 'Jul 2024',
    current: 283400,
    d1_30: 78600,
    d31_60: 43700,
    d61_90: 24100,
    d90plus: 6400,
  },
  {
    month: 'Aug 2024',
    current: 285700,
    d1_30: 98400,
    d31_60: 56200,
    d61_90: 15900,
    d90plus: 0,
  },
];

/**
 * AP Aging Chart Data
 * 12 months of AP aging bucket history
 */
export const apAgingChartData = [
  {
    month: 'Sep 2023',
    current: 135600,
    d1_30: 38900,
    d31_60: 12800,
    d61_90: 4200,
    d90plus: 2100,
  },
  {
    month: 'Oct 2023',
    current: 142300,
    d1_30: 40800,
    d31_60: 13600,
    d61_90: 4500,
    d90plus: 1900,
  },
  {
    month: 'Nov 2023',
    current: 149800,
    d1_30: 42900,
    d31_60: 14300,
    d61_90: 4800,
    d90plus: 1900,
  },
  {
    month: 'Dec 2023',
    current: 156230,
    d1_30: 44700,
    d31_60: 14900,
    d61_90: 5100,
    d90plus: 1700,
  },
  {
    month: 'Jan 2024',
    current: 148200,
    d1_30: 42500,
    d31_60: 14200,
    d61_90: 4900,
    d90plus: 1800,
  },
  {
    month: 'Feb 2024',
    current: 140600,
    d1_30: 40300,
    d31_60: 13500,
    d61_90: 4600,
    d90plus: 1900,
  },
  {
    month: 'Mar 2024',
    current: 152700,
    d1_30: 43800,
    d31_60: 14600,
    d61_90: 5000,
    d90plus: 1700,
  },
  {
    month: 'Apr 2024',
    current: 146300,
    d1_30: 41900,
    d31_60: 14000,
    d61_90: 4800,
    d90plus: 1900,
  },
  {
    month: 'May 2024',
    current: 153900,
    d1_30: 44100,
    d31_60: 14700,
    d61_90: 5100,
    d90plus: 1700,
  },
  {
    month: 'Jun 2024',
    current: 157200,
    d1_30: 45000,
    d31_60: 15000,
    d61_90: 5200,
    d90plus: 1600,
  },
  {
    month: 'Jul 2024',
    current: 158600,
    d1_30: 45400,
    d31_60: 15100,
    d61_90: 5300,
    d90plus: 1600,
  },
  {
    month: 'Aug 2024',
    current: 156230,
    d1_30: 52100,
    d31_60: 18240,
    d61_90: 7997,
    d90plus: 0,
  },
];

/**
 * Export all mock data as a collection
 */
export const mockDataService = {
  dashboardSummary,
  receivablesMetric,
  payablesMetric,
  transactionsMock,
  alertsMock,
  aiInsightsMock,
  budgetItemsMock,
  financialRatiosMock,
  cashFlowDataMock,
  profitabilityMetricsMock,
  arAgingChartData,
  apAgingChartData,
};

/**
 * Backward compatibility export
 */
export const mockDashboardData = dashboardSummary;
