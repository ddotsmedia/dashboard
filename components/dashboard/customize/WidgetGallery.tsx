'use client';

/**
 * Widget Gallery Component
 * Lists all available widgets with checkboxes to toggle visibility
 */

import React from 'react';
import { AVAILABLE_WIDGETS } from '@/config/defaultLayout';
import clsx from 'clsx';

interface WidgetGalleryProps {
  widgetVisibility: Record<string, boolean>;
  onToggleWidget: (widgetId: string) => void;
}

export function WidgetGallery({
  widgetVisibility,
  onToggleWidget,
}: WidgetGalleryProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Available Widgets
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {Object.values(widgetVisibility).filter(Boolean).length} / {AVAILABLE_WIDGETS.length} widgets visible
        </p>
      </div>

      {/* Scrollable Widget List */}
      <div className="flex-grow overflow-y-auto space-y-2 pr-2 -mr-2">
        {AVAILABLE_WIDGETS.map((widget) => (
          <label
            key={widget.id}
            className={clsx(
              'flex items-start gap-3 p-3 rounded-lg border transition-all duration-150',
              'cursor-pointer select-none',
              'bg-white dark:bg-slate-900',
              'border-slate-200 dark:border-slate-700',
              widgetVisibility[widget.id]
                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            )}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={widgetVisibility[widget.id] ?? false}
              onChange={() => onToggleWidget(widget.id)}
              className={clsx(
                'mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-600',
                'text-indigo-600 dark:text-indigo-500',
                'cursor-pointer',
                'accent-indigo-600 dark:accent-indigo-500'
              )}
            />

            {/* Widget Info */}
            <div className="flex-grow min-w-0">
              <p className="font-medium text-slate-900 dark:text-white text-sm">
                {widget.name}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                {widget.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
