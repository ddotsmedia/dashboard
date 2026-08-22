'use client';

/**
 * Layout Preview Component
 * Shows current widget order with drag handle, size selection, and visual grid preview
 */

import React, { useState } from 'react';
import { AVAILABLE_WIDGETS } from '@/config/defaultLayout';
import { WidgetCard } from './WidgetCard';
import clsx from 'clsx';

interface LayoutPreviewProps {
  widgetOrder: string[];
  widgetSizes: Record<string, 1 | 2 | 3 | 4>;
  widgetVisibility: Record<string, boolean>;
  onReorder?: (newOrder: string[]) => void;
  onSizeChange: (widgetId: string, size: 1 | 2 | 3 | 4) => void;
  onToggle: (widgetId: string) => void;
}

export function LayoutPreview({
  widgetOrder,
  widgetSizes,
  widgetVisibility,
  onReorder,
  onSizeChange,
  onToggle,
}: LayoutPreviewProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Get widget details from AVAILABLE_WIDGETS
  const getWidgetName = (id: string) => {
    return AVAILABLE_WIDGETS.find((w) => w.id === id)?.name || id;
  };

  // Visible widgets in order
  const visibleWidgets = widgetOrder.filter((id) => widgetVisibility[id]);

  // Handle drag start
  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  // Handle drag over
  const handleDragOver = (id: string) => {
    setDragOverId(id);
  };

  // Handle drop
  const handleDrop = (id: string) => {
    if (!draggedId || draggedId === id || !onReorder) return;

    const newOrder = [...widgetOrder];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = newOrder.indexOf(id);

    if (draggedIndex > -1 && targetIndex > -1) {
      // Remove the dragged item
      const [item] = newOrder.splice(draggedIndex, 1);
      // Insert at the new position
      newOrder.splice(targetIndex, 0, item);
      onReorder(newOrder);
    }

    setDraggedId(null);
    setDragOverId(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Layout Preview
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {visibleWidgets.length} widgets visible • Drag to reorder
        </p>
      </div>

      {/* Scrollable Preview List */}
      <div className="flex-grow overflow-y-auto space-y-3 pr-2 -mr-2">
        {visibleWidgets.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-center">
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-sm">No widgets visible</p>
              <p className="text-xs mt-1">Enable some widgets to see them here</p>
            </div>
          </div>
        ) : (
          visibleWidgets.map((widgetId) => (
            <div
              key={widgetId}
              draggable
              onDragStart={() => handleDragStart(widgetId)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(widgetId);
              }}
              onDrop={() => handleDrop(widgetId)}
              onDragEnd={handleDragEnd}
              className={clsx(
                'transition-all duration-150',
                dragOverId === widgetId && draggedId !== widgetId
                  ? 'opacity-50'
                  : ''
              )}
            >
              <WidgetCard
                widget={{
                  id: widgetId,
                  name: getWidgetName(widgetId),
                }}
                size={widgetSizes[widgetId] || 2}
                onSizeChange={onSizeChange}
                onDelete={onToggle}
                isDragging={draggedId === widgetId}
              />
            </div>
          ))
        )}
      </div>

      {/* Grid Preview Visualization */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
          Grid Preview
        </h4>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {visibleWidgets.map((widgetId) => {
            const size = widgetSizes[widgetId] || 2;
            const name = getWidgetName(widgetId);
            return (
              <div
                key={widgetId}
                className={clsx(
                  'p-2 rounded bg-gradient-to-br',
                  'from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-800/30',
                  'border border-indigo-200 dark:border-indigo-700',
                  'text-indigo-900 dark:text-indigo-100',
                  'font-semibold text-center break-words'
                )}
                style={{ gridColumn: `span ${size}` }}
              >
                <div className="truncate">{name}</div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          12-column grid • Drag to reorder • Click size buttons to adjust
        </p>
      </div>
    </div>
  );
}
