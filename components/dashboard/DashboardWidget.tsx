/**
 * Dashboard Widget Wrapper Component
 * Provides responsive grid layout and conditional rendering for widgets
 */

import React from 'react';

interface DashboardWidgetProps {
  id: string;
  children: React.ReactNode;
  size?: 1 | 2 | 3 | 4;
  visible?: boolean;
}

/**
 * Converts widget size to grid column span classes
 * Size 1: 1/4 width on desktop (grid-cols-4)
 * Size 2: 1/2 width on desktop (grid-cols-2)
 * Size 3: 3/4 width on desktop
 * Size 4: Full width (grid-cols-1)
 */
function getSizeClasses(size: number): string {
  switch (size) {
    case 1:
      return 'col-span-1';
    case 2:
      return 'lg:col-span-2 col-span-1';
    case 3:
      return 'lg:col-span-3 col-span-1';
    case 4:
      return 'lg:col-span-4 col-span-1';
    default:
      return 'col-span-1';
  }
}

export function DashboardWidget({
  id,
  children,
  size = 1,
  visible = true,
}: DashboardWidgetProps) {
  // Don't render if not visible
  if (!visible) {
    return null;
  }

  return (
    <div
      data-widget-id={id}
      className={`${getSizeClasses(size)} transition-all duration-300`}
    >
      {children}
    </div>
  );
}
