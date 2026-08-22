/**
 * Suspense Wrapper Component
 * Provides consistent fallback UI for lazy-loaded components
 */

'use client';

import { Suspense, type ReactNode } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingHeight?: string;
}

/**
 * Default Fallback Component
 * Renders skeleton loaders as placeholders
 */
function DefaultFallback({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`w-full ${height} bg-white dark:bg-slate-800 rounded-lg`}>
      <Skeleton className="w-full h-full" />
    </div>
  );
}

/**
 * Suspense Wrapper for lazy-loaded components
 * Automatically handles loading and error states
 */
export function SuspenseWrapper({
  children,
  fallback,
  loadingHeight = 'h-96',
}: SuspenseWrapperProps) {
  return (
    <Suspense fallback={fallback ?? <DefaultFallback height={loadingHeight} />}>
      {children}
    </Suspense>
  );
}

/**
 * Specialized wrappers for different component types
 */

export function ModalSuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function DrawerSuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="p-6 space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function ChartSuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-80" />}>
      {children}
    </Suspense>
  );
}

export function TableSuspenseWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-12" />
          ))}
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
