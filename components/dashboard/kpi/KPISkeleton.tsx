/**
 * KPISkeleton Component
 * Loading skeleton for KPI cards
 */

import React, { type ReactElement } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

/**
 * Skeleton loader matching KPI card dimensions
 * Displays pulse animation while data loads
 */
export function KPISkeleton(): ReactElement {
  return (
    <Card className="p-6">
      <div className="flex flex-col justify-between h-full">
        {/* Label skeleton */}
        <Skeleton className="h-4 w-24 mb-3" />

        {/* Value skeleton */}
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <Skeleton className="h-8 w-32 mb-2" />

            {/* Change percentage skeleton */}
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Sparkline skeleton */}
          <div className="ml-4">
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    </Card>
  );
}
