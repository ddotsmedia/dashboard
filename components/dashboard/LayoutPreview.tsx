/**
 * Layout Preview Component
 * Displays dashboard widgets in a draggable grid layout with dnd-kit
 */

'use client';

import { useTransition } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useUI } from '@/lib/store';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { SortableWidgetCard } from './customize/SortableWidgetCard';

/**
 * Widget component type
 */
interface WidgetConfig {
  id: string;
  title: string;
  component: React.ComponentType;
}

interface LayoutPreviewProps {
  widgets: WidgetConfig[];
  showOnly?: string[];
  onOrderChange?: (newOrder: string[]) => void;
}

export function LayoutPreview({
  widgets,
  showOnly,
  onOrderChange,
}: LayoutPreviewProps) {
  const [isPending, startTransition] = useTransition();
  const { widgetOrder, setWidgetOrder } = useDashboard();
  const { addNotification } = useUI();

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter widgets based on showOnly prop
  const visibleWidgets = showOnly
    ? widgets.filter((w) => showOnly.includes(w.id))
    : widgets;

  // Order widgets based on widgetOrder from store
  const orderedWidgets = [...visibleWidgets].sort((a, b) => {
    const aIndex = widgetOrder.indexOf(a.id);
    const bIndex = widgetOrder.indexOf(b.id);
    return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
  });

  const widgetIds = orderedWidgets.map((w) => w.id);

  /**
   * Handle drag end event
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = widgetIds.indexOf(active.id as string);
      const newIndex = widgetIds.indexOf(over.id as string);

      const newOrder = arrayMove(widgetIds, oldIndex, newIndex);

      // Update order in store (with transition for smooth animation)
      startTransition(() => {
        const updatedOrder = [
          ...widgetOrder.filter((id) => !widgetIds.includes(id)),
          ...newOrder,
        ];
        setWidgetOrder(updatedOrder);

        // Call callback if provided
        if (onOrderChange) {
          onOrderChange(updatedOrder);
        }

        // Show notification
        addNotification({
          type: 'success',
          title: 'Order Updated',
          message: 'Widget order has been saved',
          duration: 2000,
        });
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={widgetIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {orderedWidgets.map((widget) => {
            const WidgetComponent = widget.component;
            return (
              <SortableWidgetCard
                key={widget.id}
                id={widget.id}
                title={widget.title}
              >
                <div className="min-h-[200px]">
                  <WidgetComponent />
                </div>
              </SortableWidgetCard>
            );
          })}

          {orderedWidgets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No widgets available to display
              </p>
            </div>
          )}
        </div>
      </SortableContext>

      {isPending && (
        <div className="fixed inset-0 bg-black/5 dark:bg-black/20 pointer-events-none" />
      )}
    </DndContext>
  );
}
