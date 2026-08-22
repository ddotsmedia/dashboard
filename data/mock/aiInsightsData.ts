/**
 * Mock AI Insights Data
 * 15+ realistic financial insights with various categories and confidence levels
 * Tied to dashboard metrics: revenue, expenses, cash, AR, AP, budget, profitability
 */

import type { AIInsight } from '@/types/dashboard';

/**
 * Helper function to generate realistic relative timestamps
 */
function getRelativeDate(hoursAgo: number): Date {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date;
}

function getDaysAgoDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

/**
 * 18 Realistic AI Insights with Various Categories and Confidence Levels
 */
export const aiInsightsData: AIInsight[] = (Object.freeze([
  {
    id: 'insight-001',
    category: 'trend',
    title: 'Revenue Growth Acceleration',
    description:
      'Revenue has increased 12.5% over the last 3 months. At this rate, Q4 projections suggest a year-end total of AED 8.2M, exceeding target by 15%.',
    confidence: 92,
    relevance: 95,
    timestamp: getRelativeDate(1),
    metadata: {
      metric: 'revenue',
      period: '3-month',
      projection: 8200000,
      target: 7130000,
    },
  },
  {
    id: 'insight-002',
    category: 'anomaly',
    title: 'Unusual Expense Spike in Operations',
    description:
      'Operations department expenses spiked 28% this month to AED 385K. This is 4x the normal variance. Recommend investigation into procurement or recurring charges.',
    confidence: 88,
    relevance: 87,
    timestamp: getRelativeDate(2),
    metadata: {
      metric: 'expenses',
      department: 'Operations',
      variance: 0.28,
      amount: 385000,
    },
  },
  {
    id: 'insight-003',
    category: 'forecast',
    title: 'Cash Flow Stress in Q4',
    description:
      'Based on current payment cycles and AR collection rates, projected cash position will drop to AED 385K by December. Recommend securing line of credit.',
    confidence: 85,
    relevance: 94,
    timestamp: getDaysAgoDate(1),
    metadata: {
      metric: 'cash_flow',
      period: 'Q4',
      projected_balance: 385000,
      critical_threshold: 500000,
    },
  },
  {
    id: 'insight-004',
    category: 'recommendation',
    title: 'Optimize AR Collection Timing',
    description:
      'Your AR DSO (Days Sales Outstanding) is 45 days vs. industry average of 38 days. Accelerating collection by 1 week could free up AED 156K in working capital.',
    confidence: 82,
    relevance: 88,
    timestamp: getDaysAgoDate(2),
    metadata: {
      metric: 'receivables',
      current_dso: 45,
      benchmark_dso: 38,
      potential_improvement: 156000,
    },
  },
  {
    id: 'insight-005',
    category: 'anomaly',
    title: 'Marketing Budget Overspend Trend',
    description:
      'Marketing has exceeded budget 3 out of last 4 months, averaging 22% overage. Current overage: AED 50.4K. Pattern suggests need for budget adjustment or spending controls.',
    confidence: 90,
    relevance: 85,
    timestamp: getDaysAgoDate(3),
    metadata: {
      metric: 'budget',
      department: 'Marketing',
      overage_rate: 0.22,
      current_overage: 50400,
      budget_allocated: 180000,
    },
  },
  {
    id: 'insight-006',
    category: 'trend',
    title: 'Gross Margin Compression',
    description:
      'Gross margin has declined from 52% to 48% over 6 months. COGS as % of revenue increased from 38% to 42%. Recommend cost reduction review or pricing adjustment.',
    confidence: 87,
    relevance: 93,
    timestamp: getDaysAgoDate(1),
    metadata: {
      metric: 'profitability',
      metric_type: 'gross_margin',
      current: 0.48,
      previous: 0.52,
      period: '6-month',
    },
  },
  {
    id: 'insight-007',
    category: 'forecast',
    title: 'Q4 Profitability Outlook - Positive',
    description:
      'Based on current trends, Q4 net profit is projected at AED 380K (12% margin), up from Q3 (9% margin). This assumes revenue trajectory continues.',
    confidence: 79,
    relevance: 90,
    timestamp: getDaysAgoDate(2),
    metadata: {
      metric: 'profitability',
      projected_profit: 380000,
      projected_margin: 0.12,
      current_quarter_margin: 0.09,
    },
  },
  {
    id: 'insight-008',
    category: 'recommendation',
    title: 'Vendor Payment Cycle Optimization',
    description:
      'You have 67 days payable outstanding vs. 52-day industry average. Extending payment terms by 2 weeks would defer AED 98K in outflows without damaging vendor relationships.',
    confidence: 81,
    relevance: 82,
    timestamp: getDaysAgoDate(4),
    metadata: {
      metric: 'payables',
      current_dpo: 67,
      benchmark_dpo: 52,
      potential_deferral: 98000,
    },
  },
  {
    id: 'insight-009',
    category: 'anomaly',
    title: 'Sharjah Branch Underperformance',
    description:
      'Sharjah branch margins contracted 8.2% YTD to 13%. Dubai and Abu Dhabi branches grew margins 3.8% and 1.9% respectively. Investigate local cost structure.',
    confidence: 83,
    relevance: 86,
    timestamp: getDaysAgoDate(3),
    metadata: {
      metric: 'profitability',
      dimension: 'branch',
      branch: 'Sharjah',
      margin_change: -0.082,
      margin_current: 0.13,
    },
  },
  {
    id: 'insight-010',
    category: 'trend',
    title: 'Support Services Becoming Unprofitable',
    description:
      'Support Services division net margin is -8.1%, deteriorating 18.5% YoY. Current loss: AED 105K annually. Recommend price increase or service restructuring.',
    confidence: 86,
    relevance: 89,
    timestamp: getDaysAgoDate(2),
    metadata: {
      metric: 'profitability',
      dimension: 'department',
      department: 'Support Services',
      net_profit: -105200,
      margin: -0.081,
    },
  },
  {
    id: 'insight-011',
    category: 'forecast',
    title: 'Seasonal AR Aging Risk',
    description:
      'Historical data shows AR aging deteriorates 15-20% during Q4 due to customer year-end budgets. Current 5% 90+ days overdue may reach 7.5% by December.',
    confidence: 80,
    relevance: 84,
    timestamp: getDaysAgoDate(5),
    metadata: {
      metric: 'receivables',
      current_90plus_pct: 0.05,
      forecast_90plus_pct: 0.075,
      risk_amount: 23100,
    },
  },
  {
    id: 'insight-012',
    category: 'recommendation',
    title: 'Premium Package Revenue Opportunity',
    description:
      'Premium Package maintains 22% net margin with 18.9% growth. Upsell opportunities from Standard Package customers could add AED 280K annually.',
    confidence: 84,
    relevance: 87,
    timestamp: getDaysAgoDate(1),
    metadata: {
      metric: 'profitability',
      dimension: 'product',
      product: 'Premium Package',
      margin: 0.22,
      growth: 0.189,
      opportunity: 280000,
    },
  },
  {
    id: 'insight-013',
    category: 'anomaly',
    title: 'Utilities Expense Unexplained Growth',
    description:
      'Utilities & Rent charges grew 34% month-over-month to AED 98.2K. No facility expansion or changes documented. Recommend audit of supplier invoices.',
    confidence: 89,
    relevance: 80,
    timestamp: getDaysAgoDate(2),
    metadata: {
      metric: 'expenses',
      category: 'Utilities & Rent',
      growth: 0.34,
      current_amount: 98200,
      variance: 22200,
    },
  },
  {
    id: 'insight-014',
    category: 'trend',
    title: 'Operating Efficiency Gains',
    description:
      'Operating expenses as % of revenue decreased from 18.2% to 16.8% over 3 months. Efficiency initiatives in procurement and labor management showing results.',
    confidence: 88,
    relevance: 85,
    timestamp: getDaysAgoDate(3),
    metadata: {
      metric: 'expenses',
      opex_ratio_previous: 0.182,
      opex_ratio_current: 0.168,
      improvement: 0.014,
    },
  },
  {
    id: 'insight-015',
    category: 'forecast',
    title: 'Budget Variance Trajectory Analysis',
    description:
      'Current month variance trajectory suggests year-end variance of AED 480K unfavorable. Early intervention required to maintain annual budget targets.',
    confidence: 77,
    relevance: 82,
    timestamp: getDaysAgoDate(4),
    metadata: {
      metric: 'budget',
      projected_year_end_variance: -480000,
      current_variance: -120000,
      variance_acceleration: 'increasing',
    },
  },
  {
    id: 'insight-016',
    category: 'recommendation',
    title: 'Receivables Concentration Risk',
    description:
      'Top 5 customers represent 48% of total AR (AED 168K out of 350K). One customer is 67+ days overdue for AED 42.5K. Recommend credit policy review.',
    confidence: 85,
    relevance: 88,
    timestamp: getDaysAgoDate(2),
    metadata: {
      metric: 'receivables',
      concentration_ratio: 0.48,
      concentration_amount: 168000,
      high_risk_customer_amount: 42500,
    },
  },
  {
    id: 'insight-017',
    category: 'anomaly',
    title: 'Payables Aging - Supplier Payment Overdue',
    description:
      'Three vendor payments totaling AED 156.2K are 32-67 days overdue. Early payment discounts being forfeited. Recommend prioritizing payment or negotiating extension.',
    confidence: 91,
    relevance: 91,
    timestamp: getDaysAgoDate(1),
    metadata: {
      metric: 'payables',
      overdue_count: 3,
      overdue_amount: 156230,
      days_overdue_range: '32-67',
      discount_lost: 7800,
    },
  },
  {
    id: 'insight-018',
    category: 'trend',
    title: 'Basic Package - Volume Up, Margin Down',
    description:
      'Basic Package volume increased 14% but net margin remains flat at 5%. Growth from lower-margin customers suggests need for pricing or mix optimization.',
    confidence: 80,
    relevance: 83,
    timestamp: getDaysAgoDate(3),
    metadata: {
      metric: 'profitability',
      dimension: 'product',
      product: 'Basic Package',
      volume_growth: 0.14,
      margin: 0.05,
      margin_change: 0,
    },
  },
]) as unknown) as AIInsight[];

/**
 * Export for backward compatibility
 */
export const mockAIInsights: AIInsight[] = aiInsightsData;

/**
 * Export count for verification
 */
export const aiInsightsCount = aiInsightsData.length;
