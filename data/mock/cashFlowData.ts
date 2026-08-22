/**
 * Cash Flow Mock Data
 * Comprehensive cash flow analysis and forecasts
 */

import type { CashFlowData, CashFlowPeriod } from '@/types/dashboard';

/**
 * Cash Flow Metrics - Phase 4 Specifications
 * Opening: 450,000 AED
 * Inflows: +180,000 AED
 * Outflows: -120,000 AED
 * Net: +60,000 AED
 * Closing: 510,000 AED
 * Includes 12-month trend data and forecasts
 */
export const cashFlowData: CashFlowData = {
  inflows: 180000,
  outflows: 120000,
  netCashFlow: 60000,
  operatingCashFlow: 145000,
  investingCashFlow: -28000,
  financingCashFlow: -57000,
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
    {
      period: 'Feb 2024',
      inflows: 265800,
      outflows: 119500,
      netCashFlow: 146300,
    },
    {
      period: 'Jan 2024',
      inflows: 258200,
      outflows: 124300,
      netCashFlow: 133900,
    },
    {
      period: 'Dec 2023',
      inflows: 312600,
      outflows: 145200,
      netCashFlow: 167400,
    },
    {
      period: 'Nov 2023',
      inflows: 271800,
      outflows: 128600,
      netCashFlow: 143200,
    },
    {
      period: 'Oct 2023',
      inflows: 264300,
      outflows: 121800,
      netCashFlow: 142500,
    },
    {
      period: 'Sep 2023',
      inflows: 256700,
      outflows: 119400,
      netCashFlow: 137300,
    },
  ],
};

/**
 * Cash Position Summary
 * Opening balance, current period activity, and closing position
 */
export interface CashPositionSummary {
  openingBalance: number;
  periodInflows: number;
  periodOutflows: number;
  netPeriodFlow: number;
  closingBalance: number;
  currency: 'AED';
}

export const cashPositionSummary: CashPositionSummary = {
  openingBalance: 450000,
  periodInflows: 180000,
  periodOutflows: 120000,
  netPeriodFlow: 60000,
  closingBalance: 510000,
  currency: 'AED',
};

/**
 * Cash Flow Forecast Data
 * 30/60/90 day forecasts based on historical trends
 */
export interface CashFlowForecast {
  period: string;
  daysAhead: number;
  projectedInflows: number;
  projectedOutflows: number;
  projectedNetFlow: number;
  projectedBalance: number;
  confidence: number; // 0-100
}

export const cashFlowForecasts: CashFlowForecast[] = [
  {
    period: 'Sep 2024 (30 days)',
    daysAhead: 30,
    projectedInflows: 285000,
    projectedOutflows: 122000,
    projectedNetFlow: 163000,
    projectedBalance: 673000,
    confidence: 92,
  },
  {
    period: 'Oct 2024 (60 days)',
    daysAhead: 60,
    projectedInflows: 562000,
    projectedOutflows: 238000,
    projectedNetFlow: 324000,
    projectedBalance: 834000,
    confidence: 85,
  },
  {
    period: 'Nov 2024 (90 days)',
    daysAhead: 90,
    projectedInflows: 852000,
    projectedOutflows: 358000,
    projectedNetFlow: 494000,
    projectedBalance: 1004000,
    confidence: 78,
  },
];

/**
 * Cash Flow Waterfall Data
 * Component breakdown of cash flow for current period
 */
export interface CashFlowWaterfallComponent {
  category: string;
  amount: number;
  type: 'inflow' | 'outflow';
  percentage: number;
}

export const cashFlowWaterfallData: CashFlowWaterfallComponent[] = [
  {
    category: 'Operating Activities',
    amount: 145000,
    type: 'inflow',
    percentage: 80.6,
  },
  {
    category: 'Collection of Receivables',
    amount: 125300,
    type: 'inflow',
    percentage: 69.6,
  },
  {
    category: 'Product Sales',
    amount: 87200,
    type: 'inflow',
    percentage: 48.4,
  },
  {
    category: 'Service Revenue',
    amount: 52800,
    type: 'inflow',
    percentage: 29.3,
  },
  {
    category: 'Cost of Goods Sold',
    amount: 78500,
    type: 'outflow',
    percentage: 65.4,
  },
  {
    category: 'Operating Expenses',
    amount: 32400,
    type: 'outflow',
    percentage: 27.0,
  },
  {
    category: 'Supplier Payments',
    amount: 9100,
    type: 'outflow',
    percentage: 7.6,
  },
  {
    category: 'Investing Activities',
    amount: 28000,
    type: 'outflow',
    percentage: 23.3,
  },
  {
    category: 'Capital Expenditure',
    amount: 28000,
    type: 'outflow',
    percentage: 23.3,
  },
  {
    category: 'Financing Activities',
    amount: 57000,
    type: 'outflow',
    percentage: 47.5,
  },
  {
    category: 'Loan Repayment',
    amount: 40000,
    type: 'outflow',
    percentage: 33.3,
  },
  {
    category: 'Dividend Payment',
    amount: 17000,
    type: 'outflow',
    percentage: 14.2,
  },
];
