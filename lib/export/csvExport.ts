/**
 * CSV Export Utility
 * Exports table data to CSV format with proper escaping and UTF-8 encoding
 */

import type { Transaction } from '@/types/dashboard';

interface ExportRow {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Escape CSV values that contain special characters
 */
function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) return '';

  const stringValue = String(value);

  // If the value contains quotes, commas, newlines, wrap in quotes and escape internal quotes
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

/**
 * Export table data to CSV
 */
export function exportTableToCSV(data: ExportRow[], filename: string = 'export.csv'): void {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first row
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    // Header row
    headers.map(escapeCSV).join(','),
    // Data rows
    ...data.map((row) => headers.map((header) => escapeCSV(row[header])).join(',')),
  ].join('\n');

  // Create blob and download
  downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
}

/**
 * Export transactions to CSV with formatted values
 */
export function exportTransactionsToCSV(transactions: Transaction[], filename: string = 'transactions.csv'): void {
  const data = transactions.map((tx) => ({
    Date: tx.date instanceof Date ? tx.date.toISOString().split('T')[0] : tx.date,
    Reference: tx.reference || '',
    Description: tx.description,
    Account: tx.account || '',
    Category: tx.category,
    Type: tx.type,
    Amount: tx.amount,
    Currency: tx.currency || 'AED',
    Status: tx.status,
  }));

  exportTableToCSV(data, filename);
}

/**
 * Helper function to download file
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  // Add BOM for UTF-8 to ensure proper encoding in Excel
  const bom = '﻿';
  const blob = new Blob([bom + content], { type: mimeType });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}
