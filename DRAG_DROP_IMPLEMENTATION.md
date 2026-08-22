# Drag-and-Drop Widget Reordering Implementation Guide

## Overview

This project implements drag-and-drop functionality using **dnd-kit** (version 6.x+) for reordering dashboard widgets. The implementation includes:

- Automatic state persistence to localStorage via Zustand
- Touch and keyboard support for accessibility
- Smooth animations and visual feedback
- Real-time preview updates

## What Was Installed

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities --save --legacy-peer-deps
```

### Packages Added

| Package | Version | Purpose |
|---------|---------|---------|
| @dnd-kit/core | Latest | Core drag-and-drop engine |
| @dnd-kit/sortable | Latest | Sortable list abstraction |
| @dnd-kit/utilities | Latest | Utility functions for transforms |

## File Structure

```
components/dashboard/
├── customize/
│   ├── SortableWidgetCard.tsx    # Individual draggable widget wrapper
│   ├── index.ts                  # Component exports
│   └── README.md                 # Detailed component docs
├── LayoutPreview.tsx             # Main drag-drop container component
│
app/dashboard/
└── customize/
    └── page.tsx                  # Customization page for users

lib/hooks/
└── useDashboard.ts              # Custom hook for dashboard state
```

## Key Components

### 1. SortableWidgetCard Component

**Location:** `/components/dashboard/customize/SortableWidgetCard.tsx`

Wraps individual widgets with drag-and-drop capabilities.

**Features:**
- Drag handle with visual indicator (GripVertical icon)
- Opacity feedback when dragging (0.5)
- Scale effect when dragging (1.05)
- Drop zone border highlight (2px solid blue)
- Smooth CSS transitions (200ms ease-in-out)
- Dark mode support

**Example Usage:**
```tsx
<SortableWidgetCard id="ar-widget" title="Accounts Receivable">
  <ARWidget />
</SortableWidgetCard>
```

### 2. LayoutPreview Component

**Location:** `/components/dashboard/LayoutPreview.tsx`

Main component managing drag-and-drop container and state updates.

**Features:**
- DndContext with closestCenter collision strategy
- SortableContext with vertical list strategy
- Multi-sensor support (Pointer, Touch, Keyboard)
- Automatic order updates to Zustand store
- Toast notifications on successful reorder
- useTransition for smooth UI updates
- Support for filtering widgets

**Example Usage:**
```tsx
const widgets = [
  { id: 'ar-widget', title: 'AR', component: ARWidget },
  { id: 'ap-widget', title: 'AP', component: APWidget },
];

<LayoutPreview
  widgets={widgets}
  showOnly={['ar-widget', 'ap-widget']}
  onOrderChange={(newOrder) => console.log(newOrder)}
/>
```

### 3. Customize Page

**Location:** `/app/dashboard/customize/page.tsx`

User-facing page where users can reorder widgets.

**Features:**
- Reset to default layout button
- Visual feedback when changes are being saved
- Instructions for users
- Responsive layout
- Integrates LayoutPreview component

## State Management

### Zustand Store (Dashboard Slice)

```typescript
// State
widgetVisibility: Record<string, boolean>    // Show/hide widgets
widgetOrder: string[]                        // Order of widget IDs
widgetSizes: Record<string, 1 | 2 | 3 | 4>  // Widget sizes (grid columns)
savedLayouts: Record<string, Layout>         // Saved layout profiles

// Actions
setWidgetOrder(order: string[]): void
toggleWidget(widgetId: string): void
setWidgetSize(widgetId: string, size: 1|2|3|4): void
resetLayout(): void
saveLayout(name: string, layout: Layout): void
loadLayout(name: string): void
deleteLayout(name: string): void
```

### useDashboard Hook

**Location:** `/lib/hooks/useDashboard.ts`

Custom hook providing access to dashboard state with proper selectors.

```typescript
const { widgetOrder, setWidgetOrder, resetLayout } = useDashboard();
```

## How It Works

### Drag Flow

1. User clicks and holds the drag handle (GripVertical icon)
2. Widget opacity changes to 0.5, scale becomes 1.05
3. Drop zone border highlights in blue
4. User moves the widget to new position
5. Drop zone under cursor highlights with blue border
6. User releases mouse/touch
7. Order updates in Zustand store
8. Toast notification shows "Order updated"
9. localStorage automatically updated via Zustand middleware

### State Flow

```
User Drag → DndContext onDragEnd 
  → arrayMove() computes new order
  → startTransition(setWidgetOrder())
  → Zustand store updates
  → localStorage persisted
  → Component re-renders
  → Toast notification
```

## Configuration

### Collision Detection

```typescript
// Using closestCenter strategy
collisionDetection={closestCenter}
```

This strategy finds the closest widget center to the dragged item and uses that as the drop target.

### Sensors

```typescript
const sensors = useSensors(
  useSensor(PointerSensor),      // Mouse drag
  useSensor(TouchSensor),         // Touch drag (mobile)
  useSensor(KeyboardSensor, {     // Keyboard navigation
    coordinateGetter: sortableKeyboardCoordinates,
  })
);
```

### CSS Variables Used

From `/app/globals.css`:
```css
--background: widget background color
--foreground: text color
```

## Styling Details

### Dragging State
```css
opacity: 0.5
scale: 1.05
border: 2px solid (blue theme-aware)
transition: 200ms ease-in-out
```

### Drag Handle
```css
width: 40px
height: 40px
position: absolute (top-right)
cursor: grab (normal), grabbing (dragging)
background: theme-aware gray
hover: lighter gray
```

### Drop Zone
```css
border-bottom: 2px solid blue
animation: smooth transition
```

## Mobile Support

### Touch Sensor Configuration
- 8px activation distance
- Passive event listeners for better performance
- Touch-friendly drag handle (20px icon)

### Testing on Mobile
1. Open customize page on mobile device
2. Long-press the drag handle
3. Drag widget up/down
4. Release to drop
5. Verify animation is smooth
6. Check that changes persist on reload

## Desktop Support

### Mouse Drag
- Left-click and drag the handle
- Visual feedback while dragging
- Smooth animation on drop

### Keyboard Navigation
- Tab to focus widget
- Arrow Up/Down to reorder
- Enter to confirm

## Accessibility

### Screen Reader Announcements
- Each widget card is marked with appropriate role
- Drag handle has aria-label="Drag handle"
- Status updates announced to screen readers

### Keyboard Support
- Tab navigation between widgets
- Arrow keys for reordering
- Escape to cancel drag
- Enter to confirm

## Integration with Main Dashboard

The LayoutPreview component can be integrated into the main DashboardContent component:

```tsx
// In DashboardContent.tsx or similar
<LayoutPreview
  widgets={DASHBOARD_WIDGETS}
  onOrderChange={handleOrderChange}
/>
```

This allows real-time reordering without leaving the main dashboard view.

## Performance Optimization

1. **useTransition Hook**: Smooth updates without blocking UI
   ```typescript
   const [isPending, startTransition] = useTransition();
   startTransition(() => setWidgetOrder(newOrder));
   ```

2. **Memoized Selectors**: Zustand selector hooks prevent unnecessary renders
   ```typescript
   const { widgetOrder, setWidgetOrder } = useDashboard();
   ```

3. **CSS Transforms**: Use transform instead of layout changes
   ```css
   transform: translateX(0px);
   /* Smoother than changing margin/padding */
   ```

4. **Passive Event Listeners**: Touch events don't block scrolling

## Testing Checklist

### Desktop Testing
- [ ] Click and drag widget handle
- [ ] Visual feedback (opacity, scale, border) during drag
- [ ] Smooth animation when dropping
- [ ] Toast notification appears
- [ ] Widget order persists on page reload
- [ ] Reset to default works

### Mobile Testing
- [ ] Long-press drag handle on touch device
- [ ] Smooth drag animation on mobile
- [ ] Works on tablet (landscape and portrait)
- [ ] Works on smartphone (portrait and landscape)
- [ ] Changes persist after page reload

### Accessibility Testing
- [ ] Can tab to drag handle
- [ ] Drag handle has aria-label
- [ ] Can use arrow keys to reorder
- [ ] Screen reader announces widget order
- [ ] Works without mouse

### Browser Testing
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Troubleshooting

### Drag Not Working
1. Check that DndContext wraps the SortableContext
2. Verify sensors are configured correctly
3. Check browser console for errors

### Changes Not Persisting
1. Verify Zustand store is configured with persist middleware
2. Check localStorage is enabled in browser
3. Check that setWidgetOrder is being called

### Animations Not Smooth
1. Check that CSS transitions are applied
2. Verify GPU acceleration is enabled
3. Check browser DevTools Performance tab

### Touch Not Working
1. Verify TouchSensor is included in useSensors
2. Check mobile browser supports touch events
3. Test on actual device, not just desktop emulation

## Future Enhancements

1. **Grid Layout**: Implement 2D grid drag-and-drop
2. **Widget Resizing**: Allow dragging widget edges to resize
3. **Layout Profiles**: Save/load multiple layout configurations
4. **Snap to Grid**: Align widgets to grid during drag
5. **Preview Mode**: Show preview of new layout before confirming
6. **Undo/Redo**: Add undo/redo functionality
7. **Animation Customization**: Allow users to adjust animation speed

## References

- [dnd-kit Documentation](https://docs.dndkit.com/)
- [React 18 Transitions](https://react.dev/reference/react/useTransition)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
