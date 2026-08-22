'use client';

import React from 'react';
import { useAlerts } from '@/hooks';
import { AlertItem } from './AlertItem';

/**
 * Alert Panel Component
 * Displays a list of alerts with severity filtering
 */
export function AlertPanel() {
  const { data: alerts, isLoading, isError } = useAlerts();

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
        <p className="text-red-800 dark:text-red-200">Failed to load alerts</p>
      </div>
    );
  }

  const sortedAlerts = (alerts || []).sort((a, b) => {
    // Sort by severity first
    const severityOrder = { CRITICAL: 0, WARNING: 1, ATTENTION: 2, INFO: 3 };
    const aSeverity = severityOrder[(a.severity || 'INFO') as keyof typeof severityOrder] ?? 3;
    const bSeverity = severityOrder[(b.severity || 'INFO') as keyof typeof severityOrder] ?? 3;

    if (aSeverity !== bSeverity) {
      return aSeverity - bSeverity;
    }

    // Then by timestamp (newest first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="w-full space-y-4">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alerts & Notifications</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {isLoading ? 'Loading...' : `${sortedAlerts.length} alerts`}
        </p>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
            />
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}

AlertPanel.displayName = 'AlertPanel';
