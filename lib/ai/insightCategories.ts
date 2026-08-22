/**
 * Insight Categories Configuration
 * Maps AI insight categories to colors and icons for UI display
 */

import {
  TrendingUp,
  AlertTriangle,
  Waves,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

export type InsightCategory = 'revenue' | 'expenses' | 'cashflow' | 'profitability';

export interface CategoryInfo {
  color: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

/**
 * Insight category configuration mapping
 * Each category has a color, icon, label, and description for UI rendering
 */
export const INSIGHT_CATEGORIES: Record<InsightCategory, CategoryInfo> = {
  revenue: {
    color: '#16B96F',
    icon: TrendingUp,
    label: 'Revenue',
    description: 'Revenue trends and growth metrics',
  },
  expenses: {
    color: '#F97316',
    icon: AlertTriangle,
    label: 'Expenses',
    description: 'Expense tracking and cost management',
  },
  cashflow: {
    color: '#06B6D4',
    icon: Waves,
    label: 'Cash Flow',
    description: 'Cash flow analysis and liquidity insights',
  },
  profitability: {
    color: '#6366F1',
    icon: BarChart3,
    label: 'Profitability',
    description: 'Profitability metrics and margin analysis',
  },
};

/**
 * Get category info by category name
 * @param category - The insight category
 * @returns CategoryInfo object with color, icon, and labels
 */
export function getCategoryInfo(category: InsightCategory): CategoryInfo {
  return INSIGHT_CATEGORIES[category];
}

/**
 * Get all available categories
 * @returns Array of all insight categories
 */
export function getAllCategories(): InsightCategory[] {
  return Object.keys(INSIGHT_CATEGORIES) as InsightCategory[];
}

/**
 * Get category color by name
 * @param category - The insight category
 * @returns Hex color code
 */
export function getCategoryColor(category: InsightCategory): string {
  return INSIGHT_CATEGORIES[category].color;
}

/**
 * Get category icon by name
 * @param category - The insight category
 * @returns Lucide icon component
 */
export function getCategoryIcon(category: InsightCategory): LucideIcon {
  return INSIGHT_CATEGORIES[category].icon;
}
