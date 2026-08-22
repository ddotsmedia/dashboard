/**
 * Mock AI Insights
 * Realistic mock data for AI-generated insights
 */

import type { AIInsight } from '@/types/dashboard';
import type { InsightCategory } from './insightCategories';

export interface AIInsightWithCategory extends AIInsight {
  insightCategory: InsightCategory;
}

/**
 * Generate a mock ID (UUID-like but deterministic for demo purposes)
 */
function generateMockId(): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      result += '-';
    } else if (i === 14) {
      result += '4';
    } else if (i === 19) {
      const randomIdx = Math.random() * 4 | 0 | 0x8;
      result += chars[randomIdx & 0xf];
    } else {
      const randomIdx = Math.random() * 16 | 0;
      result += chars[randomIdx];
    }
  }
  return result;
}

/**
 * Create a mock insight object
 */
function createInsight(
  title: string,
  description: string,
  category: InsightCategory,
  confidence: number,
  daysAgo: number = 0
): AIInsightWithCategory {
  const now = new Date();
  const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

  return {
    id: generateMockId(),
    title,
    description,
    category: 'recommendation', // Use recommendation as the base category
    confidence,
    relevance: Math.min(100, confidence + Math.random() * 15), // Slightly higher relevance
    timestamp,
    insightCategory: category,
    metadata: {
      source: 'MockAIEngine',
      dataPoints: Math.floor(Math.random() * 1000) + 100,
      version: '1.0',
    },
  };
}

/**
 * Collection of mock insights covering various dashboard metrics
 */
const MOCK_INSIGHTS_DATA: AIInsightWithCategory[] = [
  // Revenue Insights
  createInsight(
    'Revenue Growth Acceleration',
    'Revenue increased 12.4% compared to the previous month. This is driven primarily by increased sales volume in core markets and new customer acquisitions.',
    'revenue',
    93,
    0
  ),
  createInsight(
    'Dubai Branch Leading Revenue',
    'The Dubai branch contributed 43% of total company revenue this period, significantly outperforming other branches with a 18% growth rate.',
    'revenue',
    89,
    1
  ),
  createInsight(
    'Q3 Revenue Forecast',
    'Based on current trends and seasonality patterns, revenue is projected to increase by 8-12% in Q3, assuming no major market disruptions.',
    'revenue',
    85,
    2
  ),
  createInsight(
    'High-Value Customer Segment Growth',
    'Enterprise customer segment showed 25% growth quarter-over-quarter, indicating strong product-market fit in the premium segment.',
    'revenue',
    91,
    3
  ),
  createInsight(
    'Geographic Expansion Opportunity',
    'Analysis indicates untapped market potential in emerging markets, with estimated revenue opportunity of 15-20% increase.',
    'revenue',
    82,
    0
  ),

  // Expense Insights
  createInsight(
    'Operating Expenses Surge',
    'Operating expenses increased 8.7% month-over-month, primarily due to payroll expansion and increased marketing spend.',
    'expenses',
    91,
    0
  ),
  createInsight(
    'Overdue Supplier Invoices Alert',
    '3 AP invoices are 30+ days overdue, totaling 245,000 AED. Immediate action required to maintain supplier relationships.',
    'expenses',
    100,
    0
  ),
  createInsight(
    'Marketing Budget Variance',
    'Marketing expenses exceeded budget by 15%, driven by promotional campaigns in preparation for Q4 product launch.',
    'expenses',
    88,
    1
  ),
  createInsight(
    'Payroll Cost Optimization',
    'Payroll represents 42% of total expenses. Consider process automation opportunities that could reduce labor costs by 8-12%.',
    'expenses',
    84,
    2
  ),
  createInsight(
    'Supply Chain Cost Reduction',
    'Renegotiated supplier contracts could yield 6-8% savings on COGS. Estimated annual impact: 180,000 AED.',
    'expenses',
    87,
    3
  ),

  // Cash Flow Insights
  createInsight(
    'Positive Cash Flow Outlook',
    'Cash flow projections indicate positive cash position for the next 90 days with strong inflows from receivables collection.',
    'cashflow',
    87,
    0
  ),
  createInsight(
    'Working Capital Efficiency',
    'Working capital cycle improved by 5 days compared to previous month. AR collection rate improved to 94%, up 2 percentage points.',
    'cashflow',
    90,
    1
  ),
  createInsight(
    'Seasonal Cash Flow Pattern',
    'Historical data shows 35% reduction in cash inflows during Q4. Consider establishing credit lines for seasonal funding needs.',
    'cashflow',
    86,
    2
  ),

  // Profitability Insights
  createInsight(
    'Profitability Margins Trending Up',
    'Net profit margins increased from 8.2% to 9.1% this period, driven by improved operational efficiency and cost controls.',
    'profitability',
    92,
    0
  ),
  createInsight(
    'Branch Profitability Analysis',
    'Abu Dhabi branch showing the highest profit margin at 12.3%, while Dubai branch has volume advantage. Consider strategic focus.',
    'profitability',
    88,
    1
  ),
  createInsight(
    'Product Line Performance',
    'Premium product line showing 35% higher margins than standard products. Recommend expanding premium offerings to boost profitability.',
    'profitability',
    86,
    3
  ),
];

/**
 * Generate mock insights with optional filters
 * @param filters - Optional filters for category or date range
 * @returns Array of AI insights
 */
export function generateMockInsights(filters?: {
  category?: InsightCategory;
  maxDaysOld?: number;
  limit?: number;
}): AIInsightWithCategory[] {
  let insights = [...MOCK_INSIGHTS_DATA];

  // Filter by category if specified
  if (filters?.category) {
    insights = insights.filter((i) => i.insightCategory === filters.category);
  }

  // Filter by age if specified
  if (filters?.maxDaysOld !== undefined) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - filters.maxDaysOld);
    insights = insights.filter((i) => i.timestamp >= cutoffDate);
  }

  // Sort by timestamp (newest first)
  insights.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Apply limit if specified
  if (filters?.limit) {
    insights = insights.slice(0, filters.limit);
  }

  return insights;
}

/**
 * Get all mock insights grouped by category
 */
export function getInsightsByCategory(): Record<InsightCategory, AIInsightWithCategory[]> {
  const grouped: Record<InsightCategory, AIInsightWithCategory[]> = {
    revenue: [],
    expenses: [],
    cashflow: [],
    profitability: [],
  };

  MOCK_INSIGHTS_DATA.forEach((insight) => {
    grouped[insight.insightCategory].push(insight);
  });

  return grouped;
}

/**
 * Get insights with high confidence (above threshold)
 * @param threshold - Confidence threshold (default 85)
 */
export function getHighConfidenceInsights(threshold: number = 85): AIInsightWithCategory[] {
  return MOCK_INSIGHTS_DATA.filter((insight) => insight.confidence >= threshold).sort(
    (a, b) => b.confidence - a.confidence
  );
}

/**
 * Get the most recent insight
 */
export function getMostRecentInsight(): AIInsightWithCategory | undefined {
  if (MOCK_INSIGHTS_DATA.length === 0) return undefined;
  return [...MOCK_INSIGHTS_DATA].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  )[0];
}

/**
 * Get total number of mock insights
 */
export function getTotalInsightCount(): number {
  return MOCK_INSIGHTS_DATA.length;
}
