'use client';

import { useState } from 'react';
import { AIInsightsWidget, type Insight } from '@/components/ai/AIInsightsWidget';
import {
  TrendingUp,
  AlertCircle,
  Target,
  BarChart3,
  Clock,
  DollarSign,
  Zap,
  PieChart,
} from 'lucide-react';

// Mock insights data
const MOCK_INSIGHTS: Insight[] = [
  {
    id: 'insight-1',
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Revenue Growing Steadily',
    description:
      'Your revenue has increased by 12% compared to the previous period, with consistent growth across all segments.',
    category: 'Revenue',
    confidence: 92,
    timestamp: new Date(Date.now() - 5 * 60000), // 5 mins ago
    action: {
      label: 'View Details',
      onClick: () => {
        // Placeholder for view details action
      },
    },
  },
  {
    id: 'insight-2',
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Overdue Payments Alert',
    description:
      'You have 3% of receivables overdue beyond 90 days. This may impact cash flow planning.',
    category: 'Receivables',
    confidence: 88,
    timestamp: new Date(Date.now() - 15 * 60000), // 15 mins ago
    action: {
      label: 'Review',
      onClick: () => {
        // Placeholder for review action
      },
    },
  },
  {
    id: 'insight-3',
    icon: <Target className="w-5 h-5" />,
    title: 'Expense Optimization Opportunity',
    description:
      'Payroll costs are 5% above budget. Consider reviewing staffing or compensation levels.',
    category: 'Expenses',
    confidence: 76,
    timestamp: new Date(Date.now() - 25 * 60000), // 25 mins ago
  },
  {
    id: 'insight-4',
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Cash Flow Positive',
    description:
      'Your projected cash flow for the next quarter shows a positive trend with AED 1.45M buffer.',
    category: 'Cash Flow',
    confidence: 85,
    timestamp: new Date(Date.now() - 35 * 60000), // 35 mins ago
  },
  {
    id: 'insight-5',
    icon: <Clock className="w-5 h-5" />,
    title: 'Payment Cycle Trend',
    description:
      'Average payment cycle has shortened to 22 days, indicating improved vendor relationships.',
    category: 'Payables',
    confidence: 82,
    timestamp: new Date(Date.now() - 45 * 60000), // 45 mins ago
  },
  {
    id: 'insight-6',
    icon: <DollarSign className="w-5 h-5" />,
    title: 'Working Capital Efficiency',
    description:
      'Working capital ratio improved to 1.8, indicating better operational efficiency.',
    category: 'Metrics',
    confidence: 79,
    timestamp: new Date(Date.now() - 55 * 60000), // 55 mins ago
  },
  {
    id: 'insight-7',
    icon: <Zap className="w-5 h-5" />,
    title: 'Seasonal Pattern Detected',
    description:
      'Your business shows 23% higher expenses in Q3. Plan for this seasonal variation.',
    category: 'Trends',
    confidence: 71,
    timestamp: new Date(Date.now() - 65 * 60000), // 65 mins ago
  },
  {
    id: 'insight-8',
    icon: <PieChart className="w-5 h-5" />,
    title: 'Revenue Mix Diversification',
    description:
      'Service revenue increased by 8% share, reducing dependency on product sales.',
    category: 'Revenue',
    confidence: 80,
    timestamp: new Date(Date.now() - 75 * 60000), // 75 mins ago
  },
];

export function AIInsightsSection() {
  const [insights, setInsights] = useState<Insight[]>(MOCK_INSIGHTS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDismiss = (id: string) => {
    setInsights((prev) => prev.filter((insight) => insight.id !== id));
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real app, this would fetch new insights from an API
    setInsights(MOCK_INSIGHTS);
    setIsRefreshing(false);
  };

  if (insights.length === 0) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Insights
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Smart analysis of your financial data
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isRefreshing ? 'Generating...' : 'Refresh'}
          </button>
        </div>
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No insights available. Click refresh to generate new insights.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Insights
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {insights.length} active insights • Smart analysis of your financial data
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isRefreshing ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <AIInsightsWidget
            key={insight.id}
            insight={insight}
            onDismiss={handleDismiss}
          />
        ))}
      </div>
    </section>
  );
}
