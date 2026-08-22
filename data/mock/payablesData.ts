/**
 * Payables Mock Data
 * Accounts Payable aging and payment metrics
 */

import type { PayableMetric } from '@/types/dashboard';

/**
 * Payables Metrics - Phase 4 Specifications
 * Total AP: 234,567 AED
 * Payment Rate: 96%
 * DPO: 42 days
 * Aging distribution with top 5 suppliers
 */
export const payablesData: PayableMetric = {
  totalAP: 234567,
  current: 120000,
  overdue: 114567,
  paymentCycle: 42,
  agingBuckets: [
    { bucket: 'Current (0-30)', amount: 120000, percentage: 51.1, count: 24 },
    { bucket: '1-30', amount: 80000, percentage: 34.1, count: 18 },
    { bucket: '31-60', amount: 25000, percentage: 10.7, count: 6 },
    { bucket: '61-90', amount: 7000, percentage: 3.0, count: 2 },
    { bucket: '90+', amount: 2567, percentage: 1.1, count: 1 },
  ],
  topSuppliers: [
    {
      id: 'supplier-001',
      name: 'Global Manufacturing Ltd.',
      amount: 65200,
      daysPayable: 38,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 38)),
    },
    {
      id: 'supplier-002',
      name: 'Asian Components Co.',
      amount: 51800,
      daysPayable: 45,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 45)),
    },
    {
      id: 'supplier-003',
      name: 'European Materials Supplier',
      amount: 43500,
      daysPayable: 32,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 32)),
    },
    {
      id: 'supplier-004',
      name: 'Local Services Provider',
      amount: 37900,
      daysPayable: 25,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 25)),
    },
    {
      id: 'supplier-005',
      name: 'Technology Solutions Inc.',
      amount: 29867,
      daysPayable: 18,
      lastTransaction: new Date(new Date().setDate(new Date().getDate() - 18)),
    },
  ],
};

/**
 * Top Suppliers - Simplified format for AP Top Suppliers endpoint
 * Returns suppliers with daysDue metric
 */
export interface TopSupplierRecord {
  id: string;
  name: string;
  amount: number;
  daysDue: number;
}

export const payablesTopSuppliers: TopSupplierRecord[] = [
  {
    id: 'supplier-002',
    name: 'Asian Components Co.',
    amount: 51800,
    daysDue: 45,
  },
  {
    id: 'supplier-001',
    name: 'Global Manufacturing Ltd.',
    amount: 65200,
    daysDue: 38,
  },
  {
    id: 'supplier-003',
    name: 'European Materials Supplier',
    amount: 43500,
    daysDue: 32,
  },
  {
    id: 'supplier-004',
    name: 'Local Services Provider',
    amount: 37900,
    daysDue: 25,
  },
  {
    id: 'supplier-005',
    name: 'Technology Solutions Inc.',
    amount: 29867,
    daysDue: 18,
  },
];
