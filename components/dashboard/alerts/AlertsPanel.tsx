/**
 * Alerts Panel Component
 * Main dashboard component displaying recent alerts with filtering and actions
 */

'use client';

import React, { useEffect, useState, type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCard } from './AlertCard';
import { cn } from '@/lib/utils';
import {
  getAlerts,
  dismissAlert,
  markAlertAsRead,
  getUnreadAlertCount,
} from '@/lib/alerts/alertsService';
import type { Alert } from '@/types/dashboard';

type SeverityFilter = 'all' | 'critical' | 'warning' | 'attention' | 'info';

/**
 * Skeleton loading state for alerts panel
 */
function AlertsPanelSkeleton(): ReactElement {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header skeleton */}
        <Skeleton className="h-6 w-48" />
        {/* Filter skeleton */}
        <Skeleton className="h-9 w-full" />
        {/* Alert cards skeleton */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    </Card>
  );
}

/**
 * Alerts Panel Component
 * Displays recent alerts with filtering by severity and action buttons
 */
export function AlertsPanel(): ReactElement {
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<SeverityFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Load alerts from service
   */
  const loadAlerts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      // Fetch alerts based on selected filter
      const fetchedAlerts = await getAlerts(selectedFilter);
      setAlerts(fetchedAlerts);

      // Get unread count
      const unreadAlerts = await getUnreadAlertCount();
      setUnreadCount(unreadAlerts);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Failed to load alerts'));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load alerts on component mount and when filter changes
   */
  useEffect(() => {
    loadAlerts();
  }, [selectedFilter]);

  /**
   * Handle dismissing an alert
   */
  const handleDismiss = async (alertId: string) => {
    try {
      await dismissAlert(alertId);
      // Reload alerts
      await loadAlerts();
    } catch (err) {
      console.error('Failed to dismiss alert:', err);
    }
  };

  /**
   * Handle marking alert as read and navigating if applicable
   */
  const handleNavigate = async (alert: Alert) => {
    try {
      if (!alert.read) {
        await markAlertAsRead(alert.id);
        setUnreadCount(Math.max(0, unreadCount - 1));
      }

      if (alert.actionUrl) {
        router.push(alert.actionUrl);
      }
    } catch (err) {
      console.error('Failed to navigate from alert:', err);
    }
  };

  /**
   * Handle marking alert as read without navigation
   */
  const handleMarkRead = async (alertId: string) => {
    try {
      await markAlertAsRead(alertId);
      setUnreadCount(Math.max(0, unreadCount - 1));
      // Update local state
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, read: true } : a))
      );
    } catch (err) {
      console.error('Failed to mark alert as read:', err);
    }
  };

  /**
   * Handle "View all" navigation
   */
  const handleViewAll = () => {
    router.push('/alerts');
  };

  /**
   * Filter tabs configuration
   */
  const filters: { label: string; value: SeverityFilter; count?: number }[] = [
    { label: 'All', value: 'all' },
    { label: 'Critical', value: 'critical' },
    { label: 'Warning', value: 'warning' },
    { label: 'Attention', value: 'attention' },
    { label: 'Info', value: 'info' },
  ];

  // Loading state
  if (isLoading) {
    return <AlertsPanelSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <Bell className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading alerts</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {error?.message || 'Failed to fetch alerts'}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Empty state
  if (alerts.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No alerts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All systems running smoothly. Check back soon for updates.
          </p>
        </div>
      </Card>
    );
  }

  // Calculate the maximum of 5-7 alerts to show
  const displayAlerts = alerts.slice(0, 7);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header with Title and Unread Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Financial Alerts
            </h2>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-4 -mx-6 px-6">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {displayAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDismiss={handleDismiss}
              onNavigate={handleNavigate}
              onMarkRead={handleMarkRead}
              showAction={true}
            />
          ))}
        </div>

        {/* View All Link */}
        {alerts.length > 7 && (
          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-colors"
          >
            View all alerts
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </Card>
  );
}

export default AlertsPanel;
