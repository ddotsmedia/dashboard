'use client';

import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Alert } from '@/types/dashboard';

interface AlertItemProps {
  alert: Alert;
}

/**
 * Alert Item Component
 * Displays a single alert with actions
 */
export function AlertItem({ alert }: AlertItemProps) {
  const [isDismissed, setIsDismissed] = useState(alert.dismissed || false);
  const [isRead, setIsRead] = useState(alert.read || false);

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'ATTENTION':
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'INFO':
        return <Info className="w-5 h-5 text-green-600 dark:text-green-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800';
      case 'WARNING':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-800';
      case 'ATTENTION':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-800';
      case 'INFO':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700';
    }
  };

  const handleMarkAsRead = () => {
    setIsRead(true);
    // TODO: Call API to mark as read
    console.log(`[Mock] Marked alert ${alert.id} as read`);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // TODO: Call API to dismiss
    console.log(`[Mock] Dismissed alert ${alert.id}`);
  };

  const handleClick = () => {
    if (!isRead) {
      handleMarkAsRead();
    }
    if (alert.actionUrl) {
      window.location.href = alert.actionUrl;
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`rounded-lg border-l-4 p-4 transition-all ${getSeverityColor(alert.severity)} ${!isRead ? 'opacity-100' : 'opacity-75'}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{getSeverityIcon(alert.severity)}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
            {alert.title}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {alert.description}
          </p>

          {/* Timestamp */}
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {new Date(alert.timestamp).toLocaleString()}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {alert.actionUrl && alert.actionLabel && (
              <button
                onClick={handleClick}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {alert.actionLabel}
              </button>
            )}
            {!isRead && (
              <button
                onClick={handleMarkAsRead}
                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

AlertItem.displayName = 'AlertItem';
