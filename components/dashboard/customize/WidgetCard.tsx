'use client';

/**
 * Widget Card Component
 * Reusable card for layout preview showing drag handle, name, size buttons, and delete action
 */

import React from 'react';
import { GripVertical, X } from 'lucide-react';
import clsx from 'clsx';

interface WidgetCardProps {
  widget: {
    id: string;
    name: string;
  };
  size: 1 | 2 | 3 | 4;
  onSizeChange: (widgetId: string, size: 1 | 2 | 3 | 4) => void;
  onDelete: (widgetId: string) => void;
  isDragging?: boolean;
}

export function WidgetCard({
  widget,
  size,
  onSizeChange,
  onDelete,
  isDragging = false,
}: WidgetCardProps) {
  const sizeOptions = [1, 2, 3, 4] as const;

  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-4 rounded-lg border transition-all duration-200',
        'bg-white dark:bg-slate-900',
        'border-slate-200 dark:border-slate-700',
        isDragging
          ? 'opacity-50 shadow-lg scale-105 bg-slate-50 dark:bg-slate-800'
          : 'hover:border-slate-300 dark:hover:border-slate-600'
      )}
    >
      {/* Drag Handle */}
      <div className="flex-shrink-0 cursor-move text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400">
        <GripVertical size={20} className="w-5 h-5" />
      </div>

      {/* Widget Name */}
      <div className="flex-grow min-w-0">
        <p className="font-medium text-slate-900 dark:text-white truncate">
          {widget.name}
        </p>
      </div>

      {/* Size Selector Buttons */}
      <div className="flex gap-1 flex-shrink-0">
        {sizeOptions.map((sizeOption) => (
          <button
            key={sizeOption}
            onClick={() => onSizeChange(widget.id, sizeOption)}
            className={clsx(
              'w-8 h-8 rounded text-xs font-semibold transition-colors duration-150',
              'flex items-center justify-center',
              size === sizeOption
                ? 'bg-indigo-500 text-white dark:bg-indigo-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
              'hover:bg-indigo-400 hover:text-white dark:hover:bg-indigo-500',
              'border border-slate-200 dark:border-slate-700'
            )}
            title={`Set to ${sizeOption} column${sizeOption > 1 ? 's' : ''}`}
          >
            {sizeOption}
          </button>
        ))}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(widget.id)}
        className={clsx(
          'flex-shrink-0 p-2 rounded transition-colors duration-150',
          'text-slate-400 dark:text-slate-500',
          'hover:bg-red-50 dark:hover:bg-red-900/20',
          'hover:text-red-600 dark:hover:text-red-400'
        )}
        title="Hide widget"
      >
        <X size={18} className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}
