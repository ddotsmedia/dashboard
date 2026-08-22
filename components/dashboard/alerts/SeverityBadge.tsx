/**
 * Severity Badge Component
 * Displays alert severity with icon and colored styling
 */

'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: 'critical' | 'warning' | 'attention' | 'info';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Configuration for severity types
 */
const severityConfig = {
  critical: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    icon: AlertCircle,
    label: 'Critical',
    dotColor: 'bg-red-600 dark:bg-red-500',
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: AlertTriangle,
    label: 'Warning',
    dotColor: 'bg-yellow-600 dark:bg-yellow-500',
  },
  attention: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    icon: Info,
    label: 'Attention',
    dotColor: 'bg-blue-600 dark:bg-blue-500',
  },
  info: {
    bg: 'bg-gray-100 dark:bg-gray-700/30',
    text: 'text-gray-700 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    icon: Info,
    label: 'Info',
    dotColor: 'bg-gray-500 dark:bg-gray-400',
  },
};

/**
 * Get icon size based on badge size
 */
const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
};

/**
 * Get padding based on badge size
 */
const paddingSizeMap = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base',
};

/**
 * SeverityBadge Component
 * Displays severity with icon and optional text label
 */
export function SeverityBadge({
  severity,
  showText = false,
  size = 'md',
  className,
}: SeverityBadgeProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;
  const iconSize = iconSizeMap[size];
  const paddingClass = paddingSizeMap[size];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border',
        paddingClass,
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <Icon size={iconSize} className="flex-shrink-0" />
      {showText && <span className="font-medium">{config.label}</span>}
    </div>
  );
}

export default SeverityBadge;
