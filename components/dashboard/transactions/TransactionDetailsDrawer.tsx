'use client';

import { useState } from 'react';
import { X, Download, Edit2, RotateCcw, Check, Trash2, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useChartResponsive } from '@/lib/hooks/useChartResponsive';
import { formatCurrency } from '@/lib/formatting/currency';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/types/dashboard';

interface TransactionDetailsDrawerProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Transaction Details Drawer
 * Slides in from right with full transaction details
 * Responsive: 400px on desktop, fullscreen on mobile
 */
export function TransactionDetailsDrawer({ transaction, isOpen, onClose }: TransactionDetailsDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { isMobile } = useChartResponsive();

  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'posted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'reconciled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'revenue':
      case 'credit':
      case 'receipt':
        return 'text-green-600 dark:text-green-400';
      case 'expense':
      case 'debit':
      case 'payment':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const transactionDate = transaction.date instanceof Date ? transaction.date : new Date(transaction.date);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer/Modal */}
      <div
        className={cn(
          'fixed z-50 bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 overflow-y-auto',
          isMobile
            ? 'inset-0 rounded-t-lg' // Fullscreen on mobile with top rounded corners
            : 'right-0 top-0 h-screen w-[400px] transform', // Side drawer on desktop
          isMobile ? (isOpen ? 'translate-y-0' : 'translate-y-full') : isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header - Sticky with 44px+ close button on mobile */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between flex-shrink-0">
          <h2 className={cn(
            'font-semibold text-gray-900 dark:text-white',
            isMobile ? 'text-base' : 'text-lg'
          )}>Transaction Details</h2>
          <button
            onClick={onClose}
            className={cn(
              'hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors flex-shrink-0',
              isMobile ? 'p-3 h-11 w-11' : 'p-1 h-8 w-8'
            )}
            aria-label="Close drawer"
          >
            <X size={isMobile ? 24 : 20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content - Responsive padding */}
        <div className={cn('space-y-6', isMobile ? 'p-4' : 'p-6')}>
          {/* Transaction Info Card */}
          <Card className="p-4">
            <div className="space-y-4">
              {/* Amount */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Amount</p>
                <div className="flex items-baseline gap-2">
                  <p className={cn('text-3xl font-bold', getTypeColor(transaction.type))}>
                    {transaction.type === 'revenue' || transaction.type === 'credit' || transaction.type === 'receipt'
                      ? '+'
                      : '-'}
                    {formatCurrency(transaction.amount, transaction.currency || 'AED')}
                  </p>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{transaction.currency || 'AED'}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Status</p>
                <span
                  className={cn('inline-block px-3 py-1 rounded-full text-xs font-medium', getStatusColor(transaction.status))}
                >
                  {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                </span>
              </div>
            </div>
          </Card>

          {/* Transaction Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Details</h3>
            <div className="space-y-3">
              {/* Date */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Date</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium">{transactionDate.toLocaleDateString('ar-AE')}</p>
              </div>

              {/* Reference */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Reference</p>
                <p className="text-sm text-gray-900 dark:text-white font-mono">{transaction.reference || 'N/A'}</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{transaction.description}</p>
              </div>

              {/* Account */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Account</p>
                <p className="text-sm text-gray-900 dark:text-white">{transaction.account || 'Not specified'}</p>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Category</p>
                <p className="text-sm text-gray-900 dark:text-white">{transaction.category}</p>
              </div>

              {/* Type */}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Type</p>
                <p className={cn('text-sm font-medium capitalize', getTypeColor(transaction.type))}>{transaction.type}</p>
              </div>

              {/* Notes */}
              {transaction.notes && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Notes</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{transaction.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Metadata</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Created by</span>
                <span className="text-gray-900 dark:text-white font-medium">System Admin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Created at</span>
                <span className="text-gray-900 dark:text-white font-medium">{transactionDate.toLocaleString('ar-AE')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Approved by</span>
                <span className="text-gray-900 dark:text-white font-medium">Pending</span>
              </div>
            </div>
          </div>

          {/* Related Entries */}
          {transaction.status?.toLowerCase() === 'posted' && (
            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Related Journal Entries</h3>
              <div className="space-y-2">
                <div className="p-2 bg-gray-50 dark:bg-slate-700 rounded text-xs">
                  <p className="font-mono text-gray-900 dark:text-white">JE-{transaction.id.substring(0, 8)}</p>
                  <p className="text-gray-500 dark:text-gray-400">Posted on {transactionDate.toLocaleDateString('ar-AE')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Attachments */}
          <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Attachments</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">No attachments</div>
          </div>

          {/* Action Buttons - 44px+ height on mobile */}
          <div className="pt-4 border-t border-gray-200 dark:border-slate-700 space-y-2">
            <button
              disabled={isEditing}
              className={cn(
                'w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium',
                isMobile ? 'px-3 py-3 text-sm' : 'px-4 py-2 text-sm'
              )}
            >
              <Edit2 size={isMobile ? 18 : 16} />
              Edit
            </button>

            <button
              disabled={isEditing || transaction.status?.toLowerCase() === 'reconciled'}
              className={cn(
                'w-full flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium',
                isMobile ? 'px-3 py-3 text-sm' : 'px-4 py-2 text-sm'
              )}
            >
              <RotateCcw size={isMobile ? 18 : 16} />
              Reverse
            </button>

            {transaction.status?.toLowerCase() === 'draft' && (
              <button className={cn(
                'w-full flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors font-medium',
                isMobile ? 'px-3 py-3 text-sm' : 'px-4 py-2 text-sm'
              )}>
                <Check size={isMobile ? 18 : 16} />
                Post
              </button>
            )}

            <button className={cn(
              'w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium',
              isMobile ? 'px-3 py-3 text-sm' : 'px-4 py-2 text-sm'
            )}>
              <Download size={isMobile ? 18 : 16} />
              Download
            </button>

            <button
              disabled={isEditing}
              className={cn(
                'w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium',
                isMobile ? 'px-3 py-3 text-sm' : 'px-4 py-2 text-sm'
              )}
            >
              <Trash2 size={isMobile ? 18 : 16} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
