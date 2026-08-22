/**
 * Mock Transactions Data
 * 100+ realistic transactions spanning 12 months (September 2023 - August 2024)
 * Includes various transaction types with realistic amounts, statuses, and categories
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Transaction } from '@/types/dashboard';

/**
 * Transaction Categories and realistic scenarios
 */
const categories = {
  revenue: ['Product Sales', 'Service Revenue', 'Consulting Fees', 'Licensing Revenue', 'Rental Income'],
  expenses: ['Cost of Goods Sold', 'Salaries & Wages', 'Rent', 'Utilities', 'Travel', 'Professional Fees', 'Payroll', 'Marketing & Advertising'],
  transfers: ['Bank Transfer', 'Internal Transfer', 'Account Transfer'],
  payments: ['Vendor Payment', 'Supplier Payment', 'Bill Payment'],
  receipts: ['Customer Receipt', 'Payment Receipt', 'Refund Receipt'],
};

/**
 * Account names
 */
const accounts = ['Operating Account', 'Savings Account', 'Petty Cash', 'AR Account', 'AP Account'];

/**
 * Status distribution: 70% Posted, 20% Reconciled, 10% Draft
 */
function getRandomStatus(): 'Posted' | 'Reconciled' | 'Draft' {
  const rand = Math.random();
  if (rand < 0.7) return 'Posted';
  if (rand < 0.9) return 'Reconciled';
  return 'Draft';
}

/**
 * Currency distribution: 85% AED, 10% USD, 5% EUR
 */
function getRandomCurrency(): 'AED' | 'USD' | 'EUR' {
  const rand = Math.random();
  if (rand < 0.85) return 'AED';
  if (rand < 0.95) return 'USD';
  return 'EUR';
}

/**
 * Generate a realistic mock transaction ID
 */
function generateTransactionId(index: number): string {
  const timestamp = Math.floor(Math.random() * 999999);
  return `TXN-${String(timestamp).padStart(6, '0')}-${String(index).padStart(4, '0')}`;
}

/**
 * Generate 100+ realistic transactions
 */
function generateTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const startDate = new Date('2023-09-01');

  let transactionIndex = 0;

  // September 2023 - 10 transactions
  for (let i = 0; i < 10; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * 28));

    if (Math.random() > 0.4) {
      // Revenue transaction
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Invoice #INV-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')} - Customer Transaction`,
        type: 'revenue',
        amount: Math.floor(Math.random() * 95000) + 5000,
        category: categories.revenue[Math.floor(Math.random() * categories.revenue.length)],
        status: getRandomStatus() as any,
        reference: `INV-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    } else {
      // Expense transaction
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Bill #PO-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')} - Supplier Invoice`,
        type: 'expense',
        amount: Math.floor(Math.random() * 50000) + 2000,
        category: categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
        status: getRandomStatus() as any,
        reference: `PO-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    }
  }

  // October 2023 - 9 transactions
  for (let i = 0; i < 9; i++) {
    const date = new Date('2023-10-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Transfer to Operating Account ${Math.floor(Math.random() * 999)}`,
      type: Math.random() > 0.5 ? 'transfer' : 'payment',
      amount: Math.floor(Math.random() * 150000) + 5000,
      category: Math.random() > 0.5 ? categories.transfers[0] : categories.payments[0],
      status: getRandomStatus() as any,
      reference: `TRF-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // November 2023 - 11 transactions
  for (let i = 0; i < 11; i++) {
    const date = new Date('2023-11-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 28));

    if (Math.random() > 0.35) {
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Invoice #INV-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')} - Service Delivery`,
        type: 'revenue',
        amount: Math.floor(Math.random() * 85000) + 8000,
        category: categories.revenue[Math.floor(Math.random() * categories.revenue.length)],
        status: getRandomStatus() as any,
        reference: `INV-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    } else {
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Payroll Processing - November 2023`,
        type: 'expense',
        amount: 285600,
        category: 'Salaries & Wages',
        status: getRandomStatus() as any,
        reference: `PAY-2023-11`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    }
  }

  // December 2023 - 12 transactions (seasonal increase)
  for (let i = 0; i < 12; i++) {
    const date = new Date('2023-12-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Year-End Transaction #${Math.floor(Math.random() * 9999)}`,
      type: Math.random() > 0.6 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 100000) + 10000,
      category: Math.random() > 0.6
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `DEC-2023-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // January 2024 - 10 transactions
  for (let i = 0; i < 10; i++) {
    const date = new Date('2024-01-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    if (Math.random() > 0.4) {
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Invoice #INV-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')} - New Year Business`,
        type: 'revenue',
        amount: Math.floor(Math.random() * 95000) + 5000,
        category: categories.revenue[Math.floor(Math.random() * categories.revenue.length)],
        status: getRandomStatus() as any,
        reference: `INV-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    } else {
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Rent Payment - January 2024`,
        type: 'expense',
        amount: 50000,
        category: 'Rent',
        status: getRandomStatus() as any,
        reference: `RENT-2024-01`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    }
  }

  // February 2024 - 9 transactions
  for (let i = 0; i < 9; i++) {
    const date = new Date('2024-02-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 28));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Transaction FEB-2024-${String(i + 1).padStart(3, '0')}`,
      type: Math.random() > 0.5 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 85000) + 5000,
      category: Math.random() > 0.5
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `FEB-2024-${String(i + 1).padStart(3, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // March 2024 - 11 transactions
  for (let i = 0; i < 11; i++) {
    const date = new Date('2024-03-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Q1 Transaction MAR-2024-${String(i + 1).padStart(3, '0')}`,
      type: Math.random() > 0.45 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 95000) + 5000,
      category: Math.random() > 0.45
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `MAR-2024-${String(i + 1).padStart(3, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // April 2024 - 10 transactions
  for (let i = 0; i < 10; i++) {
    const date = new Date('2024-04-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 29));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Transaction APR-2024-${String(i + 1).padStart(3, '0')}`,
      type: Math.random() > 0.5 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 85000) + 5000,
      category: Math.random() > 0.5
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `APR-2024-${String(i + 1).padStart(3, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // May 2024 - 10 transactions
  for (let i = 0; i < 10; i++) {
    const date = new Date('2024-05-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Transaction MAY-2024-${String(i + 1).padStart(3, '0')}`,
      type: Math.random() > 0.5 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 90000) + 5000,
      category: Math.random() > 0.5
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `MAY-2024-${String(i + 1).padStart(3, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // June 2024 - 11 transactions
  for (let i = 0; i < 11; i++) {
    const date = new Date('2024-06-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 29));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `H1 Close Transaction JUN-2024-${String(i + 1).padStart(3, '0')}`,
      type: Math.random() > 0.48 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 85000) + 5000,
      category: Math.random() > 0.48
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `JUN-2024-${String(i + 1).padStart(3, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // July 2024 - 9 transactions
  for (let i = 0; i < 9; i++) {
    const date = new Date('2024-07-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    transactions.push({
      id: generateTransactionId(transactionIndex++),
      date,
      description: `Summer Transaction JUL-2024-${String(i + 1).padStart(3, '0')}`,
      type: Math.random() > 0.55 ? 'revenue' : 'expense',
      amount: Math.floor(Math.random() * 75000) + 5000,
      category: Math.random() > 0.55
        ? categories.revenue[Math.floor(Math.random() * categories.revenue.length)]
        : categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
      status: getRandomStatus() as any,
      reference: `JUL-2024-${String(i + 1).padStart(3, '0')}`,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      currency: getRandomCurrency(),
    });
  }

  // August 2024 - 12 transactions (current month, more detail)
  for (let i = 0; i < 12; i++) {
    const date = new Date('2024-08-01');
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));

    if (Math.random() > 0.42) {
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Invoice #INV-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')} - August Revenue`,
        type: 'revenue',
        amount: Math.floor(Math.random() * 95000) + 5000,
        category: categories.revenue[Math.floor(Math.random() * categories.revenue.length)],
        status: getRandomStatus() as any,
        reference: `INV-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    } else {
      transactions.push({
        id: generateTransactionId(transactionIndex++),
        date,
        description: `Expense Transaction AUG-2024-${String(i + 1).padStart(2, '0')}`,
        type: 'expense',
        amount: Math.floor(Math.random() * 50000) + 2000,
        category: categories.expenses[Math.floor(Math.random() * categories.expenses.length)],
        status: getRandomStatus() as any,
        reference: `EXP-2024-${String(i + 1).padStart(3, '0')}`,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        currency: getRandomCurrency(),
      });
    }
  }

  return transactions;
}

/**
 * Mock transactions data - immutable and realistic
 */
export const transactionsData: Transaction[] = Object.freeze(generateTransactions()) as Transaction[];

/**
 * Export for backward compatibility
 */
export const mockTransactions: Transaction[] = transactionsData;

/**
 * Export count for verification
 */
export const transactionsCount = transactionsData.length;
