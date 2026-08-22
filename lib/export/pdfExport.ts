/**
 * PDF Export Utility
 * Exports table data to PDF format with formatting
 * Uses jsPDF and AutoTable libraries for best results
 * Falls back to text-based PDF if libraries not available
 */

import type { Transaction } from '@/types/dashboard';

interface ExportRow {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Export table data to PDF
 * Note: For production, install jsPDF and jspdf-autotable:
 * npm install jspdf jspdf-autotable
 */
export async function exportTableToPDF(
  data: ExportRow[],
  filename: string = 'export.pdf',
  title: string = 'Data Export'
): Promise<void> {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  try {
    // Try to use jsPDF with AutoTable
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

    if (jsPDF) {
      const { jsPDF: jsPDFClass } = await import('jspdf');
      const doc = new jsPDFClass('l', 'mm', 'a4'); // landscape orientation

      // Title
      doc.setFontSize(14);
      doc.text(title, 14, 10);

      // Export date
      doc.setFontSize(10);
      doc.text(`Exported: ${new Date().toLocaleString('ar-AE')}`, 14, 16);

      // Table
      const headers = Object.keys(data[0]);
      const rows = data.map((row) => headers.map((h) => String(row[h] ?? '')));

      // Try to use autoTable if available
      try {
        await import('jspdf-autotable');
        (doc as any).autoTable({
          head: [headers],
          body: rows,
          startY: 22,
          styles: {
            cellPadding: 3,
            overflow: 'linebreak',
            halign: 'left',
            font: 'helvetica',
            fontSize: 9,
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center',
          },
          alternateRowStyles: {
            fillColor: [240, 240, 240],
          },
          margin: { top: 30 },
          didDrawPage: (data: any) => {
            // Footer
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.getHeight();
            const pageWidth = pageSize.getWidth();
            const pageCount = (doc as any).internal.getNumberOfPages?.();

            doc.setFontSize(9);
            doc.text(`Page ${data.pageNumber} of ${pageCount}`, pageWidth - 20, pageHeight - 10);
          },
        });
      } catch (err) {
        // AutoTable not available, create simple table manually
        createSimplePDFTable(doc, headers, rows, 22);
      }

      doc.save(filename);
      return;
    }
  } catch (err) {
    console.warn('jsPDF library not available, creating simple PDF', err);
  }

  // Fallback: Create simple text-based PDF
  createSimpleTextPDF(data, filename, title);
}

/**
 * Export transactions to PDF with formatted values
 */
export async function exportTransactionsToPDF(transactions: Transaction[], filename: string = 'transactions.pdf'): Promise<void> {
  const data = transactions.map((tx) => ({
    Date: tx.date instanceof Date ? tx.date.toISOString().split('T')[0] : tx.date,
    Reference: tx.reference || '',
    Description: tx.description.substring(0, 30),
    Account: tx.account || '',
    Category: tx.category,
    Type: tx.type.toUpperCase(),
    Amount: tx.amount.toLocaleString('ar-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    Currency: tx.currency || 'AED',
    Status: tx.status.toUpperCase(),
  }));

  await exportTableToPDF(data, filename, 'Transaction Report');
}

/**
 * Create a simple table in PDF manually
 */
function createSimplePDFTable(doc: any, headers: string[], rows: string[][], startY: number): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const colWidth = (pageWidth - 28) / headers.length;
  let currentY = startY;
  const rowHeight = 6;
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header row
  doc.setFillColor(41, 128, 185);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);

  let currentX = 14;
  headers.forEach((header) => {
    doc.text(header.substring(0, 15), currentX, currentY + 4);
    currentX += colWidth;
  });

  currentY += rowHeight + 1;

  // Data rows
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  let rowIndex = 0;
  rows.forEach((row) => {
    // Check if we need a new page
    if (currentY > pageHeight - 15) {
      doc.addPage('l');
      currentY = 20;

      // Repeat header on new page
      doc.setFillColor(41, 128, 185);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);

      let headerX = 14;
      headers.forEach((header) => {
        doc.text(header.substring(0, 15), headerX, currentY + 4);
        headerX += colWidth;
      });

      currentY += rowHeight + 1;
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
    }

    // Alternate row colors
    if (rowIndex % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      currentX = 14;
      headers.forEach(() => {
        doc.rect(currentX, currentY - rowHeight / 2, colWidth, rowHeight, 'F');
        currentX += colWidth;
      });
    }

    currentX = 14;
    row.forEach((cell) => {
      doc.text(String(cell).substring(0, 20), currentX + 1, currentY);
      currentX += colWidth;
    });

    currentY += rowHeight;
    rowIndex++;
  });

  // Footer
  doc.setFontSize(9);
  doc.text(`Exported: ${new Date().toLocaleString('ar-AE')}`, 14, pageHeight - 10);
}

/**
 * Create a simple text-based PDF as fallback
 */
function createSimpleTextPDF(data: ExportRow[], filename: string, title: string): void {
  const headers = Object.keys(data[0]);
  const rows = data.map((row) => headers.map((h) => String(row[h] ?? '')));

  // Create CSV content
  const content = [title, '', `Exported: ${new Date().toLocaleString('ar-AE')}`, '', headers.join('|'), ...rows.map((r) => r.join('|'))].join(
    '\n'
  );

  // Create blob and download as text file
  // In a real scenario, you would use a library to create actual PDF
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename.replace('.pdf', '.txt'));
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  console.info('PDF library not available - saved as text file. For PDF export, install jsPDF: npm install jspdf jspdf-autotable');
}
