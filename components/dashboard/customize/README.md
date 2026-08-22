# Dashboard Widget Drag-and-Drop Customization

This directory contains components for managing dashboard widget reordering using dnd-kit.

## Components

### SortableWidgetCard
A wrapper component that adds drag-and-drop functionality to any widget.

**Features:**
- Drag handle with GripVertical icon
- Visual feedback during drag (opacity 0.5, scale 1.05)
- Drop zone highlight (blue border)
- Smooth animations (200ms ease-in-out)
- Touch support for mobile devices
- Keyboard navigation support

**Usage:**
```tsx
import { SortableWidgetCard } from '@/components/dashboard/customize';

<SortableWidgetCard id="widget-id" title="Widget Title">
  <YourWidgetContent />
</SortableWidgetCard>
```

### LayoutPreview
A context provider that manages drag-and-drop state for multiple widgets.

**Features:**
- DndContext with closestCenter collision detection
- SortableContext for managing widget order
- Keyboard, Touch, and Pointer sensors
- Automatic persistence to Zustand store
- Toast notifications on order change
- Loading state during transitions

**Usage:**
```tsx
import { LayoutPreview } from '@/components/dashboard/LayoutPreview';

const widgets = [
  { id: 'widget-1', title: 'Widget 1', component: Widget1 },
  { id: 'widget-2', title: 'Widget 2', component: Widget2 },
];

<LayoutPreview 
  widgets={widgets}
  onOrderChange={(newOrder) => console.log(newOrder)}
/>
```

## State Management

Widget order is stored in Zustand store with the following key features:

- **Auto-persistence**: Changes are automatically saved to localStorage via Zustand middleware
- **Real-time updates**: UI updates immediately on drag end
- **Reset functionality**: Can reset to default layout
- **Layout profiles**: Can save and load different layout configurations

### Store Actions

```typescript
// Update widget order
setWidgetOrder(newOrder: string[]): void

// Toggle widget visibility
toggleWidget(widgetId: string): void

// Resize widget
setWidgetSize(widgetId: string, size: 1 | 2 | 3 | 4): void

// Reset to default layout
resetLayout(): void

// Save current layout as profile
saveLayout(name: string, layout: Layout): void

// Load saved layout profile
loadLayout(name: string): void
```

## Styling & Visual Feedback

### CSS Variables Used
- `--background`: Widget background color
- `--foreground`: Text color
- Theme-aware colors (light/dark mode)

### Animation Timings
- Drag opacity transition: 200ms ease-in-out
- Scale transition: 200ms ease-in-out
- Border highlight: smooth transition

### Mobile Optimizations
- Touch sensor with 8px activation distance
- Mobile-friendly drag handle size (20px icon)
- Proper z-index layering for overlays

## Integration

### Adding to Customize Page

1. Create a widget definition:
```typescript
const CUSTOMIZABLE_WIDGETS = [
  {
    id: WIDGET_IDS.WIDGET_NAME,
    title: 'Widget Display Name',
    component: WidgetComponent,
  },
];
```

2. Use LayoutPreview in your page:
```typescript
<LayoutPreview
  widgets={CUSTOMIZABLE_WIDGETS}
  onOrderChange={handleOrderChange}
/>
```

3. The store automatically persists changes to localStorage

## Testing

### Desktop Testing
- Click and drag widget handles
- Verify visual feedback (opacity, scale, border)
- Check toast notification appears
- Verify order persists on page reload

### Mobile Testing
- Touch and drag widget handles
- Verify smooth animations on touch devices
- Test on tablet and smartphone viewports
- Check that changes persist

### Accessibility
- Keyboard navigation (arrow keys to move items)
- Screen reader announcements
- Proper aria labels on drag handles

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Considerations

- Uses React.useTransition for smooth updates
- Efficient selector hooks via Zustand
- Memoized widget components
- Smooth CSS transitions instead of JS animations
- Touch passive event listeners for better performance
