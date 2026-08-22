/**
 * DashboardGrid Component
 * Responsive grid container for dashboard KPI cards
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive grid layout:
 * - Mobile (default): 1 column
 * - Tablet (768px): 2 columns
 * - Desktop (1024px): 4 columns
 */
export function DashboardGrid({ children, className }: DashboardGridProps) {
  return (
    <div
      className={cn(
        'grid',
        'grid-cols-1',           // Mobile: 1 column
        'md:grid-cols-2',        // Tablet: 2 columns
        'lg:grid-cols-4',        // Desktop: 4 columns
        'gap-6',                 // 24px gap
        'p-6',                   // 24px padding
        className
      )}
    >
      {children}
    </div>
  );
}
