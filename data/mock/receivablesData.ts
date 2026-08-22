/**
 * Receivables Mock Data
 * Accounts Receivable aging and collection metrics
 */

import type { ReceivableMetric } from '@/types/dashboard';

/**
 * Receivables Metrics - Phase 4 Specifications
 * Total AR: 456,200 AED
 * Collection Rate: 94%
 * DSO: 35 days
 * Aging distribution with top 5 debtors
 */
export const receivablesData: ReceivableMetric = {
  totalAR: 456200,
  current: 200000,
  overdue: 256200,
  collectionRate: 94,
  daysOutstanding: 35,
  agingBuckets: [
    { bucket: 'Current (0-30)', amount: 200000, percentage: 43.8, count: 32 },
    { bucket: '1-30', amount: 150000, percentage: 32.9, count: 28 },
    { bucket: '31-60', amount: 60000, percentage: 13.2, count: 12 },
    { bucket: '61-90', amount: 30000, percentage: 6.6, count: 5 },
    { bucket: '90+', amount: 16200, percentage: 3.5, count: 2 },
  ],
  topCustomers: [
    {
      id: 'debtor-001',
      name: 'Emirates Trading Corporation',
      amount: 85400,
      daysOutstanding: 42,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 42)),
    },
    {
      id: 'debtor-002',
      name: 'Gulf Maritime Solutions',
      amount: 68900,
      daysOutstanding: 55,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 55)),
    },
    {
      id: 'debtor-003',
      name: 'Desert Logistics Limited',
      amount: 52300,
      daysOutstanding: 28,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 28)),
    },
    {
      id: 'debtor-004',
      name: 'Middle East Import Export',
      amount: 48100,
      daysOutstanding: 35,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 35)),
    },
    {
      id: 'debtor-005',
      name: 'UAE Distribution Partners',
      amount: 42800,
      daysOutstanding: 19,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 19)),
    },
  ],
};

/**
 * Top Debtors - Simplified format for AR Top Debtors endpoint
 * Returns only overdue accounts with daysOverdue metric
 */
export interface TopDebtorRecord {
  id: string;
  name: string;
  amount: number;
  daysOverdue: number;
}

export const receivablesTopDebtors: TopDebtorRecord[] = [
  {
    id: 'debtor-002',
    name: 'Gulf Maritime Solutions',
    amount: 68900,
    daysOverdue: 55,
  },
  {
    id: 'debtor-001',
    name: 'Emirates Trading Corporation',
    amount: 85400,
    daysOverdue: 42,
  },
  {
    id: 'debtor-004',
    name: 'Middle East Import Export',
    amount: 48100,
    daysOverdue: 35,
  },
  {
    id: 'debtor-003',
    name: 'Desert Logistics Limited',
    amount: 52300,
    daysOverdue: 0, // Current, not overdue
  },
  {
    id: 'debtor-005',
    name: 'UAE Distribution Partners',
    amount: 42800,
    daysOverdue: 0, // Current, not overdue
  },
];
