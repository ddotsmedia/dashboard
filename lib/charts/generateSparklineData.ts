/**
 * Sparkline Data Generation
 * Generate monthly trend data from mock dataset
 */

import { mockDashboardData } from '@/data/mock/dashboardData';

/**
 * Get 12-month revenue trend data for sparkline
 */
export function getRevenueSparklineData(): number[] {
  if (!mockDashboardData.historicalData || mockDashboardData.historicalData.length === 0) {
    return Array.from({ length: 12 }, () => Math.random() * 100);
  }

  return mockDashboardData.historicalData.map((month) => {
    // Normalize to 0-100 scale for visualization
    const max = Math.max(...mockDashboardData.historicalData.map((m) => m.revenue));
    return (month.revenue / max) * 100;
  });
}

/**
 * Get 12-month expense trend data for sparkline
 */
export function getExpenseSparklineData(): number[] {
  if (!mockDashboardData.historicalData || mockDashboardData.historicalData.length === 0) {
    return Array.from({ length: 12 }, () => Math.random() * 100);
  }

  return mockDashboardData.historicalData.map((month) => {
    // Normalize to 0-100 scale for visualization
    const max = Math.max(...mockDashboardData.historicalData.map((m) => m.expenses));
    return (month.expenses / max) * 100;
  });
}

/**
 * Get 12-month profit trend data for sparkline
 */
export function getProfitSparklineData(): number[] {
  if (!mockDashboardData.historicalData || mockDashboardData.historicalData.length === 0) {
    return Array.from({ length: 12 }, () => Math.random() * 100);
  }

  return mockDashboardData.historicalData.map((month) => {
    // Normalize to 0-100 scale for visualization
    const max = Math.max(...mockDashboardData.historicalData.map((m) => m.profit));
    return (month.profit / max) * 100;
  });
}

/**
 * Get 12-month cash flow trend data for sparkline
 */
export function getCashFlowSparklineData(): number[] {
  if (!mockDashboardData.historicalData || mockDashboardData.historicalData.length === 0) {
    return Array.from({ length: 12 }, () => Math.random() * 100);
  }

  return mockDashboardData.historicalData.map((month) => {
    // Normalize to 0-100 scale for visualization
    const max = Math.max(...mockDashboardData.historicalData.map((m) => m.cashFlow));
    return (month.cashFlow / max) * 100;
  });
}

/**
 * Get 12-month AR trend data for sparkline
 */
export function getARSparklineData(): number[] {
  // Mock data for AR trend (typically growing with revenue)
  const baseAR = 400000;
  return Array.from({ length: 12 }, (_, i) => {
    const variance = 50000 * Math.sin((i * Math.PI) / 6);
    return (baseAR + variance) / 500000; // Normalize to 0-1
  }).map((v) => v * 100);
}

/**
 * Get 12-month AP trend data for sparkline
 */
export function getAPSparklineData(): number[] {
  // Mock data for AP trend
  const baseAP = 200000;
  return Array.from({ length: 12 }, (_, i) => {
    const variance = 30000 * Math.cos((i * Math.PI) / 6);
    return (baseAP + variance) / 300000; // Normalize to 0-1
  }).map((v) => v * 100);
}
