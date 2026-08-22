/**
 * Sortable Widget Card Component
 * Wraps widgets with dnd-kit integration for drag-and-drop reordering
 */

'use client';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { CSSProperties, ReactNode } from 'react';

interface SortableWidgetCardProps {
  id: string;
  children: ReactNode;
  title?: string;
  isDragging?: boolean;
}

export function SortableWidgetCard({
  id,
  children,
  title,
  isDragging = false,
}: SortableWidgetCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const isCurrentlyDragging = isSortableDragging || isDragging;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isCurrentlyDragging ? 0.5 : 1,
    scale: isCurrentlyDragging ? 1.05 : 1,
    transformOrigin: '0 0',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative bg-white dark:bg-gray-800 rounded-lg shadow-md
        border-2 border-transparent
        ${isCurrentlyDragging ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
        transition-all duration-200 ease-in-out
        overflow-hidden
      `}
    >
      {/* Drag Handle Area */}
      <div
        {...attributes}
        {...listeners}
        className={`
          absolute top-3 right-3 z-10 cursor-grab active:cursor-grabbing
          p-2 rounded-md transition-colors
          ${
            isCurrentlyDragging
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }
        `}
        aria-label="Drag handle"
      >
        <GripVertical size={20} />
      </div>

      {/* Widget Title (optional) */}
      {title && (
        <div className="px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}

      {/* Widget Content */}
      <div className="p-4">
        {children}
      </div>

      {/* Visual Feedback on Drag */}
      {isCurrentlyDragging && (
        <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 pointer-events-none rounded-lg" />
      )}
    </div>
  );
}
