/**
 * Alert Card Component
 * Reusable card displaying individual alert with actions
 */

'use client';

import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { SeverityBadge } from './SeverityBadge';
import type { Alert } from '@/types/dashboard';

interface AlertCardProps {
  alert: Alert;
  onDismiss?: (alertId: string) => void;
  onNavigate?: (alert: Alert) => void;
  onMarkRead?: (alertId: string) => void;
  showAction?: boolean;
}

/**
 * Color mapping for left border based on severity
 */
const severityBorderColor = {
  critical: 'border-l-red-600',
  warning: 'border-l-yellow-600',
  attention: 'border-l-blue-600',
  info: 'border-l-gray-500',
};

/**
 * AlertCard Component
 * Displays an individual alert with severity badge, content, and actions
 */
export function AlertCard({
  alert,
  onDismiss,
  onNavigate,
  onMarkRead,
  showAction = true,
}: AlertCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const severity = (alert.type || alert.severity?.toLowerCase()) as
    | 'critical'
    | 'warning'
    | 'attention'
    | 'info';

  const borderColorClass = severityBorderColor[severity] || 'border-l-gray-500';

  const handleDismiss = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissing(true);
    if (onDismiss) {
      await onDismiss(alert.id);
    }
  };

  const handleCardClick = async () => {
    // Mark as read when clicked
    if (!alert.read && onMarkRead) {
      await onMarkRead(alert.id);
    }
    // Navigate if action URL exists
    if (onNavigate) {
      onNavigate(alert);
    }
  };

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(alert);
    }
  };

  // Calculate relative time
  const relativeTime = formatDistanceToNow(new Date(alert.timestamp), {
    addSuffix: true,
  });

  if (isDismissing) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'relative group',
        'border-l-4 border-r border-t border-b rounded-lg',
        borderColorClass,
        'border-r-gray-200 dark:border-r-gray-700 border-t-gray-200 dark:border-t-gray-700 border-b-gray-200 dark:border-b-gray-700',
        'bg-white dark:bg-slate-800',
        'transition-all duration-200 cursor-pointer',
        isHovered ? 'shadow-md' : 'shadow-sm'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="p-4 flex gap-4">
        {/* Left: Severity Badge */}
        <div className="flex-shrink-0 pt-1">
          <SeverityBadge severity={severity} size="md" />
        </div>

        {/* Center: Content */}
        <div className="flex-1 min-w-0">
          {/* Title with unread indicator */}
          <div className="flex items-start gap-2 mb-1">
            <h3
              className={cn(
                'text-sm truncate',
                alert.read
                  ? 'font-medium text-gray-900 dark:text-gray-100'
                  : 'font-bold text-gray-900 dark:text-white'
              )}
            >
              {alert.title}
            </h3>
            {!alert.read && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {alert.description}
          </p>

          {/* Timestamp */}
          <p className="text-xs text-gray-500 dark:text-gray-500">{relativeTime}</p>
        </div>

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex items-start gap-1">
          {/* Action Button (if applicable) */}
          {showAction && alert.actionUrl && (
            <button
              onClick={handleAction}
              className={cn(
                'px-3 py-1.5 rounded text-xs font-medium transition-all',
                'bg-blue-600 hover:bg-blue-700 text-white',
                'opacity-0 group-hover:opacity-100'
              )}
            >
              {alert.actionLabel || 'Review'}
            </button>
          )}

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className={cn(
              'p-1.5 rounded transition-all',
              'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
              'opacity-0 group-hover:opacity-100'
            )}
            aria-label="Dismiss alert"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
