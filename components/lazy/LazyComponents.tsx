/**
 * Lazy-loaded components for performance optimization
 * These components are code-split and loaded only when needed
 */

import dynamic from 'next/dynamic';
import { Suspense, type ReactNode } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

/**
 * Modal Fallback Component
 */
function ModalFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] p-6">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Drawer Fallback Component
 */
function DrawerFallback() {
  return (
    <div className="fixed right-0 top-0 h-screen w-[400px] bg-white dark:bg-slate-800 shadow-lg p-6 space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  );
}

/**
 * Lazy-loaded CustomizeModal
 * Only loaded when user opens the customize feature
 */
export const CustomizeModal = dynamic(
  () => import('@/components/dashboard/CustomizeModal').then(mod => ({ default: mod.CustomizeModal })),
  {
    loading: () => <ModalFallback />,
    ssr: false,
  }
);

/**
 * Lazy-loaded TransactionDetailsDrawer
 * Only loaded when user clicks on a transaction
 */
export const TransactionDetailsDrawer = dynamic(
  () => import('@/components/dashboard/transactions/TransactionDetailsDrawer').then(mod => ({ default: mod.TransactionDetailsDrawer })),
  {
    loading: () => <DrawerFallback />,
    ssr: false,
  }
);

/**
 * Lazy-loaded DragDropDemo
 * Only loaded when customize page loads
 */
export const DragDropDemo = dynamic(
  () => import('@/components/dashboard/customize/DragDropDemo').then(mod => ({ default: mod.DragDropDemo })),
  {
    loading: () => <Skeleton className="w-full h-96" />,
    ssr: false,
  }
);

/**
 * Lazy-loaded AIAssistantPanel
 * Loaded asynchronously to avoid blocking initial page render
 */
export const AIAssistantPanel = dynamic(
  () => import('@/components/ai/AIAssistantPanel').then(mod => ({ default: mod.AIAssistantPanel })),
  {
    loading: () => null,
    ssr: false,
  }
);

/**
 * Lazy-loaded chart components for heavy visualizations
 */

export const RevenueExpenseChart = dynamic(
  () => import('@/components/dashboard/charts/RevenueExpenseChart').then(mod => ({ default: mod.RevenueExpenseChart })),
  {
    loading: () => <Skeleton className="w-full h-80" />,
    ssr: false,
  }
);

export const CashFlowChart = dynamic(
  () => import('@/components/dashboard/charts/CashFlowChart').then(mod => ({ default: mod.CashFlowChart })),
  {
    loading: () => <Skeleton className="w-full h-80" />,
    ssr: false,
  }
);

export const ExpenseBreakdownChart = dynamic(
  () => import('@/components/dashboard/charts/ExpenseBreakdownChart').then(mod => ({ default: mod.ExpenseBreakdownChart })),
  {
    loading: () => <Skeleton className="w-full h-80" />,
    ssr: false,
  }
);

export const ARAgingChart = dynamic(
  () => import('@/components/dashboard/charts/ARAgingChart').then(mod => ({ default: mod.ARAgingChart })),
  {
    loading: () => <Skeleton className="w-full h-80" />,
    ssr: false,
  }
);

export const APAgingChart = dynamic(
  () => import('@/components/dashboard/charts/APAgingChart').then(mod => ({ default: mod.APAgingChart })),
  {
    loading: () => <Skeleton className="w-full h-80" />,
    ssr: false,
  }
);

/**
 * Lazy-load heavy analytics sections
 */

export const AnalyticsSection = dynamic(
  () => import('@/components/dashboard/analytics/AnalyticsSection').then(mod => ({ default: mod.AnalyticsSection })),
  {
    loading: () => <Skeleton className="w-full h-96" />,
    ssr: false,
  }
);

/**
 * Wrapper component for lazy-loaded components with Suspense
 */
interface LazyComponentWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LazyComponentWrapper({
  children,
  fallback,
}: LazyComponentWrapperProps) {
  return (
    <Suspense fallback={fallback ?? <Skeleton className="w-full h-96" />}>
      {children}
    </Suspense>
  );
}
