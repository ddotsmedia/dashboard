/**
 * Excel Export Utility
 * Exports table data to Excel format with formatting
 * Uses a library approach - requires xlsx to be installed for best results
 * Falls back to CSV format if xlsx is not available
 */

import type { Transaction } from '@/types/dashboard';

interface ExportRow {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Export table data to Excel
 * Note: For production, install xlsx: npm install xlsx
 */
export async function exportTableToExcel(data: ExportRow[], filename: string = 'export.xlsx'): Promise<void> {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  try {
    // Try to use XLSX library if available
    const module = await import('xlsx');
    const XLSX = module.default || module;

    if (XLSX && XLSX.utils && XLSX.writeFile) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

      // Format headers (bold)
      const headers = Object.keys(data[0]);
      headers.forEach((header, index) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
        if (worksheet[cellRef]) {
          worksheet[cellRef].font = { bold: true };
        }
      });

      // Auto-fit columns
      const columnWidths = headers.map((header) => ({
        wch: Math.min(Math.max(header.length + 2, 10), 50),
      }));
      worksheet['!cols'] = columnWidths;

      XLSX.writeFile(workbook, filename);
      return;
    }
  } catch (err) {
    console.warn('XLSX library not available, falling back to CSV export', err);
  }

  // Fallback to CSV if XLSX not available
  exportToCSVFallback(data, filename);
}

/**
 * Export transactions to Excel with formatted values
 */
export async function exportTransactionsToExcel(transactions: Transaction[], filename: string = 'transactions.xlsx'): Promise<void> {
  const data = transactions.map((tx) => ({
    Date: tx.date instanceof Date ? tx.date.toISOString().split('T')[0] : tx.date,
    Reference: tx.reference || '',
    Description: tx.description,
    Account: tx.account || '',
    Category: tx.category,
    Type: tx.type,
    Amount: `${tx.currency || 'AED'} ${tx.amount.toLocaleString('ar-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    Currency: tx.currency || 'AED',
    Status: tx.status,
  }));

  await exportTableToExcel(data, filename);
}

/**
 * Fallback CSV export function
 */
function exportToCSVFallback(data: ExportRow[], filename: string): void {
  function escapeCSV(value: unknown): string {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...data.map((row) => headers.map((header) => escapeCSV(row[header])).join(',')),
  ].join('\n');

  const bom = '﻿';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename.replace('.xlsx', '.csv'));
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Create a simple XLSX-like structure if library unavailable
 * This is a helper for basic Excel compatibility
 */
export function createSimpleExcelFile(data: ExportRow[], sheetName: string = 'Sheet1'): ArrayBuffer {
  // This is a simplified implementation
  // In production, use actual XLSX library
  const headers = Object.keys(data[0]);
  const rows = [headers, ...data.map((row) => headers.map((h) => row[h] ?? ''))];

  // Create a simple TSV that Excel can open
  const content = rows.map((row) => (Array.isArray(row) ? row.join('\t') : Object.values(row).join('\t'))).join('\n');

  const encoder = new TextEncoder();
  return encoder.encode(content).buffer;
}
