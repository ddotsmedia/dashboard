'use client';

import React, { useState } from 'react';
import { Sparkles, X, Info, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { AIInsight } from '@/types/dashboard';

interface InsightCardProps {
  insight: AIInsight;
  onDismiss?: (insightId: string) => void;
  onViewDetails?: (insight: AIInsight) => void;
}

/**
 * Category color mapping
 */
const categoryColors = {
  trend: {
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  anomaly: {
    badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
  },
  forecast: {
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  recommendation: {
    badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
  },
};

/**
 * Confidence bar component - Responsive
 */
function ConfidenceBar({ confidence }: { confidence: number }) {
  let barColor = 'bg-green-500';
  if (confidence < 75) {
    barColor = 'bg-yellow-500';
  } else if (confidence < 85) {
    barColor = 'bg-blue-500';
  }

  return (
    <div className="flex items-center gap-2 text-xs md:text-sm">
      <span className="text-gray-600 dark:text-gray-400 flex-shrink-0">Confidence:</span>
      <div className="flex-1 min-w-0 max-w-[80px] md:max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="font-semibold text-gray-900 dark:text-white w-[35px] text-right flex-shrink-0">
        {confidence}%
      </span>
    </div>
  );
}

/**
 * Tooltip component for explain functionality - Responsive and touch-friendly
 */
function ExplainTooltip({ insight }: { insight: AIInsight }) {
  const [isVisible, setIsVisible] = useState(false);

  // Create a detailed explanation based on the insight
  const explanation =
    insight.metadata && Object.keys(insight.metadata).length > 0
      ? `This insight is based on the following metrics: ${Object.entries(insight.metadata)
          .slice(0, 3)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')}`
      : insight.description;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={cn(
          'px-3 py-2 md:px-2 md:py-1 text-xs md:text-xs font-medium rounded transition-all min-h-[36px] md:min-h-auto flex items-center justify-center',
          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          'hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600'
        )}
      >
        Explain
      </button>

      {isVisible && (
        <div
          className={cn(
            'absolute bottom-full mb-2 left-0 z-50 w-48 sm:w-56 p-3 md:p-4 rounded-lg shadow-lg',
            'bg-gray-900 dark:bg-gray-800 text-white text-xs md:text-sm',
            'border border-gray-700 dark:border-gray-600'
          )}
        >
          <div className="font-semibold mb-1 md:mb-2">Details</div>
          <p className="text-gray-200 leading-relaxed text-xs md:text-sm">{explanation}</p>
          <div className="absolute top-full left-4 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 -translate-y-1" />
        </div>
      )}
    </div>
  );
}

/**
 * InsightCard Component
 * Displays a single AI insight with actions and metadata
 */
export function InsightCard({
  insight,
  onDismiss,
  onViewDetails,
}: InsightCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const colors = categoryColors[insight.category];
  const relativeTime = formatDistanceToNow(new Date(insight.timestamp), {
    addSuffix: true,
  });

  const handleDismiss = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissing(true);
    if (onDismiss) {
      await onDismiss(insight.id);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(insight);
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Mock action - log to console for now
    console.log('Compare action for insight:', insight.id);
  };

  if (isDismissing) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'flex-shrink-0 w-full sm:w-96 group',
        'border border-gray-200 dark:border-gray-700 rounded-[12px]',
        'bg-white dark:bg-gray-800',
        'transition-all duration-300 cursor-pointer',
        'hover:shadow-lg md:hover:scale-[1.02]',
        'shadow-sm md:shadow-md',
        isHovered ? 'md:shadow-md' : 'shadow-sm'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with icon and dismiss button - Responsive padding: 16px mobile, 20px desktop */}
      <div className="p-4 md:p-5 flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={cn('flex-shrink-0', colors.icon)}>
            <Sparkles size={20} className="md:w-5 md:h-5" />
          </div>
          <div className="flex-1 min-w-0">
            {/* Title - Responsive: 14px mobile, 16px desktop */}
            <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate">
              {insight.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={cn('px-2 py-0.5 rounded text-xs font-medium', colors.badge)}>
                {insight.category.charAt(0).toUpperCase() +
                  insight.category.slice(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {relativeTime}
              </span>
            </div>
          </div>
        </div>

        {/* Dismiss button - Always visible, touch-friendly min 44px x 44px */}
        <button
          onClick={handleDismiss}
          className={cn(
            'p-2 md:p-1.5 rounded-lg transition-all flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center md:min-w-auto md:min-h-auto',
            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'active:bg-gray-200 dark:active:bg-gray-600 md:opacity-0 md:group-hover:opacity-100'
          )}
          aria-label="Dismiss insight"
        >
          <X size={18} className="md:w-4 md:h-4" />
        </button>
      </div>

      {/* Description - Responsive: 12px mobile, 14px desktop */}
      <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-700">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3 sm:line-clamp-2">
          {insight.description}
        </p>
      </div>

      {/* Confidence and Relevance - Responsive sizing */}
      <div className="p-4 md:p-5 space-y-3 border-b border-gray-200 dark:border-gray-700">
        <ConfidenceBar confidence={insight.confidence} />
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <span className="text-gray-600 dark:text-gray-400 flex-shrink-0">Relevance:</span>
          <div className="flex-1 min-w-0">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 rounded-full transition-all',
                    'h-1.5 md:h-2',
                    i < Math.round((insight.relevance / 100) * 5)
                      ? 'bg-amber-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              ))}
            </div>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white w-[35px] text-right flex-shrink-0">
            {insight.relevance}%
          </span>
        </div>
      </div>

      {/* Action buttons - Responsive: 36px mobile, 40px desktop */}
      <div className="p-4 md:p-5 flex gap-2 flex-wrap">
        <ExplainTooltip insight={insight} />

        <button
          onClick={handleViewDetails}
          className={cn(
            'px-3 py-2 md:px-2 md:py-1 text-xs md:text-xs font-medium rounded transition-all min-h-[36px] md:min-h-auto flex items-center justify-center',
            'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400'
          )}
        >
          View Details
        </button>

        <button
          onClick={handleCompare}
          className={cn(
            'px-3 py-2 md:px-2 md:py-1 text-xs md:text-xs font-medium rounded transition-all min-h-[36px] md:min-h-auto flex items-center justify-center',
            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
            'hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600'
          )}
        >
          Compare
        </button>
      </div>
    </div>
  );
}

export default InsightCard;
