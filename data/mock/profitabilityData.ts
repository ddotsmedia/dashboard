/**
 * Mock Profitability Data
 * Multi-dimensional profitability analysis
 * Consistent with dashboard totals: Revenue 2.8M, GP 1.56M, NP 1.23M
 * Currency: AED
 */

import type { ProfitabilityItem } from '@/types/dashboard';

/**
 * Company-wide profitability metrics
 * Total: 2,845,620 revenue, 1,561,300 gross profit, 1,234,540 net profit
 * Margin: 43.4% net margin
 */
export const companyProfitability: ProfitabilityItem = {
  id: 'prof-company-001',
  name: 'Organization Total',
  dimension: 'company',
  revenue: 2845620,
  grossProfit: 1561300,
  netProfit: 1234540,
  margin: 43.4,
  changePercent: 12.4,
  trend: 'up',
};

/**
 * Top branch profitability (3 branches)
 */
export const branchProfitability: ProfitabilityItem[] = [
  {
    id: 'prof-branch-001',
    name: 'Dubai Main Branch',
    dimension: 'branch',
    revenue: 1425000,
    grossProfit: 785000,
    netProfit: 625000,
    margin: 43.8,
    changePercent: 15.2,
    trend: 'up',
  },
  {
    id: 'prof-branch-002',
    name: 'Abu Dhabi Branch',
    dimension: 'branch',
    revenue: 890000,
    grossProfit: 489000,
    netProfit: 387000,
    margin: 43.5,
    changePercent: 8.5,
    trend: 'up',
  },
  {
    id: 'prof-branch-003',
    name: 'Sharjah Branch',
    dimension: 'branch',
    revenue: 530620,
    grossProfit: 287300,
    netProfit: 222540,
    margin: 41.9,
    changePercent: 6.2,
    trend: 'stable',
  },
];

/**
 * Top department profitability (5 departments)
 */
export const departmentProfitability: ProfitabilityItem[] = [
  {
    id: 'prof-dept-001',
    name: 'Sales & Distribution',
    dimension: 'department',
    revenue: 1250000,
    grossProfit: 687500,
    netProfit: 562500,
    margin: 45.0,
    changePercent: 18.5,
    trend: 'up',
  },
  {
    id: 'prof-dept-002',
    name: 'Operations',
    dimension: 'department',
    revenue: 820000,
    grossProfit: 451000,
    netProfit: 369000,
    margin: 45.0,
    changePercent: 9.2,
    trend: 'up',
  },
  {
    id: 'prof-dept-003',
    name: 'Services',
    dimension: 'department',
    revenue: 568000,
    grossProfit: 284000,
    netProfit: 227000,
    margin: 40.0,
    changePercent: 5.8,
    trend: 'stable',
  },
  {
    id: 'prof-dept-004',
    name: 'Consulting',
    dimension: 'department',
    revenue: 125000,
    grossProfit: 112500,
    netProfit: 62500,
    margin: 50.0,
    changePercent: 22.1,
    trend: 'up',
  },
  {
    id: 'prof-dept-005',
    name: 'Support Services',
    dimension: 'department',
    revenue: 82620,
    grossProfit: 26300,
    netProfit: 13540,
    margin: 16.4,
    changePercent: -5.2,
    trend: 'down',
  },
];

/**
 * Top products by profitability (10 products)
 */
export const productProfitability: ProfitabilityItem[] = [
  {
    id: 'prof-prod-001',
    name: 'Premium Software Suite',
    dimension: 'product',
    revenue: 425000,
    grossProfit: 340000,
    netProfit: 297500,
    margin: 70.0,
    changePercent: 24.3,
    trend: 'up',
  },
  {
    id: 'prof-prod-002',
    name: 'Enterprise Solutions',
    dimension: 'product',
    revenue: 380000,
    grossProfit: 266000,
    netProfit: 209800,
    margin: 55.2,
    changePercent: 19.5,
    trend: 'up',
  },
  {
    id: 'prof-prod-003',
    name: 'Cloud Services',
    dimension: 'product',
    revenue: 320000,
    grossProfit: 224000,
    netProfit: 160000,
    margin: 50.0,
    changePercent: 32.8,
    trend: 'up',
  },
  {
    id: 'prof-prod-004',
    name: 'Consulting Services',
    dimension: 'product',
    revenue: 285000,
    grossProfit: 228000,
    netProfit: 125000,
    margin: 43.9,
    changePercent: 15.2,
    trend: 'up',
  },
  {
    id: 'prof-prod-005',
    name: 'Support & Maintenance',
    dimension: 'product',
    revenue: 215000,
    grossProfit: 150500,
    netProfit: 86300,
    margin: 40.1,
    changePercent: 8.9,
    trend: 'stable',
  },
  {
    id: 'prof-prod-006',
    name: 'Training Programs',
    dimension: 'product',
    revenue: 125000,
    grossProfit: 100000,
    netProfit: 50000,
    margin: 40.0,
    changePercent: 12.5,
    trend: 'up',
  },
  {
    id: 'prof-prod-007',
    name: 'Implementation Services',
    dimension: 'product',
    revenue: 95000,
    grossProfit: 66500,
    netProfit: 28500,
    margin: 30.0,
    changePercent: 5.3,
    trend: 'stable',
  },
  {
    id: 'prof-prod-008',
    name: 'Documentation Services',
    dimension: 'product',
    revenue: 85000,
    grossProfit: 55250,
    netProfit: 25500,
    margin: 30.0,
    changePercent: 3.2,
    trend: 'stable',
  },
  {
    id: 'prof-prod-009',
    name: 'Licensing',
    dimension: 'product',
    revenue: 72000,
    grossProfit: 57600,
    netProfit: 14400,
    margin: 20.0,
    changePercent: 2.1,
    trend: 'down',
  },
  {
    id: 'prof-prod-010',
    name: 'Support Add-ons',
    dimension: 'product',
    revenue: 63620,
    grossProfit: 31810,
    netProfit: 12644,
    margin: 19.9,
    changePercent: -3.8,
    trend: 'down',
  },
];

/**
 * Top customers by profitability (10 customers)
 */
export const customerProfitability: ProfitabilityItem[] = [
  {
    id: 'prof-cust-001',
    name: 'Emirates Trading Co.',
    dimension: 'customer',
    revenue: 285000,
    grossProfit: 171000,
    netProfit: 142500,
    margin: 50.0,
    changePercent: 28.5,
    trend: 'up',
  },
  {
    id: 'prof-cust-002',
    name: 'Gulf Industries LLC',
    dimension: 'customer',
    revenue: 245000,
    grossProfit: 147000,
    netProfit: 117600,
    margin: 48.0,
    changePercent: 18.3,
    trend: 'up',
  },
  {
    id: 'prof-cust-003',
    name: 'Middle East Logistics',
    dimension: 'customer',
    revenue: 215000,
    grossProfit: 129000,
    netProfit: 96900,
    margin: 45.1,
    changePercent: 12.7,
    trend: 'up',
  },
  {
    id: 'prof-cust-004',
    name: 'Desert Supply Chain',
    dimension: 'customer',
    revenue: 185000,
    grossProfit: 103600,
    netProfit: 74000,
    margin: 40.0,
    changePercent: 9.2,
    trend: 'stable',
  },
  {
    id: 'prof-cust-005',
    name: 'UAE Wholesale Partners',
    dimension: 'customer',
    revenue: 165000,
    grossProfit: 82500,
    netProfit: 58050,
    margin: 35.2,
    changePercent: 5.5,
    trend: 'stable',
  },
  {
    id: 'prof-cust-006',
    name: 'Regional Distribution',
    dimension: 'customer',
    revenue: 145000,
    grossProfit: 65250,
    netProfit: 43500,
    margin: 30.0,
    changePercent: 3.2,
    trend: 'stable',
  },
  {
    id: 'prof-cust-007',
    name: 'Local Retailers Network',
    dimension: 'customer',
    revenue: 125000,
    grossProfit: 50000,
    netProfit: 25000,
    margin: 20.0,
    changePercent: 1.8,
    trend: 'down',
  },
  {
    id: 'prof-cust-008',
    name: 'Corporate Services Ltd',
    dimension: 'customer',
    revenue: 98000,
    grossProfit: 39200,
    netProfit: 14700,
    margin: 15.0,
    changePercent: -2.5,
    trend: 'down',
  },
  {
    id: 'prof-cust-009',
    name: 'Startup Ventures Inc',
    dimension: 'customer',
    revenue: 75000,
    grossProfit: 30000,
    netProfit: 9000,
    margin: 12.0,
    changePercent: -8.3,
    trend: 'down',
  },
  {
    id: 'prof-cust-010',
    name: 'Emerging Partners',
    dimension: 'customer',
    revenue: 62620,
    grossProfit: 21917,
    netProfit: 6262,
    margin: 10.0,
    changePercent: -15.2,
    trend: 'down',
  },
];

/**
 * Export all profitability data as immutable objects
 */
export const profitabilityData = Object.freeze({
  companyProfitability: Object.freeze(companyProfitability),
  branchProfitability: Object.freeze(branchProfitability),
  departmentProfitability: Object.freeze(departmentProfitability),
  productProfitability: Object.freeze(productProfitability),
  customerProfitability: Object.freeze(customerProfitability),
});
