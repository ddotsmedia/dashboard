# Drag-Drop Widget Reordering - Quick Start Guide

## Quick Links

- **Main Customization Page**: `/dashboard/customize`
- **Demo Page**: `/dashboard/customize/demo`
- **Documentation**: See `DRAG_DROP_IMPLEMENTATION.md`

## What Was Implemented

✅ Complete drag-and-drop widget reordering system using dnd-kit
✅ Desktop (mouse), tablet (touch), and mobile support
✅ Automatic persistence to localStorage
✅ Smooth animations and visual feedback
✅ Accessibility features (keyboard nav, ARIA labels)
✅ Toast notifications
✅ Dark mode support

## Packages Installed

```bash
@dnd-kit/core
@dnd-kit/sortable
@dnd-kit/utilities
```

Install with: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities --save --legacy-peer-deps`

## Key Components

### SortableWidgetCard
Wraps any widget to make it draggable.

```tsx
import { SortableWidgetCard } from '@/components/dashboard/customize';

<SortableWidgetCard id="widget-1" title="My Widget">
  <YourContent />
</SortableWidgetCard>
```

### LayoutPreview
Manages drag-and-drop for multiple widgets.

```tsx
import { LayoutPreview } from '@/components/dashboard/LayoutPreview';

const widgets = [
  { id: 'w1', title: 'Widget 1', component: Widget1 },
  { id: 'w2', title: 'Widget 2', component: Widget2 },
];

<LayoutPreview widgets={widgets} />
```

## File Locations

| What | Where |
|------|-------|
| SortableWidgetCard | `/components/dashboard/customize/SortableWidgetCard.tsx` |
| LayoutPreview | `/components/dashboard/LayoutPreview.tsx` |
| Demo Component | `/components/dashboard/customize/DragDropDemo.tsx` |
| Customization Page | `/app/dashboard/customize/page.tsx` |
| Demo Page | `/app/dashboard/customize/demo/page.tsx` |
| Dashboard Hook | `/lib/hooks/useDashboard.ts` |
| Button Component | `/components/ui/button.tsx` |

## Features

### Drag Handle
- GripVertical icon in top-right corner
- Changes cursor on hover (grab/grabbing)
- Touch-friendly size (20px)

### Visual Feedback
- **Dragging**: Opacity 0.5, scale 1.05
- **Drop zone**: Blue border highlight
- **Animations**: 200ms ease-in-out
- **Dark mode**: Theme-aware colors

### Sensor Support
- PointerSensor (mouse drag)
- TouchSensor (mobile/tablet)
- KeyboardSensor (arrow keys)

### Persistence
- Automatic localStorage saving via Zustand
- Widget order updates immediately
- Changes persist across page reloads
- Reset to default layout option available

## Testing

### Desktop
1. Go to `/dashboard/customize`
2. Click and drag any widget's drag handle
3. See it move smoothly
4. Release to drop in new position
5. Toast notification appears
6. Close and reopen - order persists

### Mobile
1. Go to `/dashboard/customize` on phone/tablet
2. Long-press (tap and hold) drag handle
3. Drag finger up/down
4. Release to drop
5. Verify smooth animation
6. Close browser and return - order persists

### Demo
1. Go to `/dashboard/customize/demo`
2. Follow the testing guide
3. See features checklist
4. Verify persistence by reloading

## State Management

### Using the Hook
```typescript
import { useDashboard } from '@/lib/hooks/useDashboard';

const { 
  widgetOrder, 
  setWidgetOrder, 
  toggleWidget,
  resetLayout 
} = useDashboard();
```

### Store Structure
```typescript
widgetOrder: string[]                      // ['widget-1', 'widget-2', ...]
widgetVisibility: Record<string, boolean>  // { 'widget-1': true, ... }
widgetSizes: Record<string, 1|2|3|4>       // { 'widget-1': 2, ... }
```

## Common Usage Patterns

### Add Drag-Drop to Existing Widget
```tsx
import { SortableWidgetCard } from '@/components/dashboard/customize';

// Wrap existing widget
<SortableWidgetCard id="my-widget" title="My Widget">
  <ExistingWidget />
</SortableWidgetCard>
```

### Create Reorderable Section
```tsx
import { LayoutPreview } from '@/components/dashboard/LayoutPreview';

const widgets = [
  { id: 'w1', title: 'First', component: First },
  { id: 'w2', title: 'Second', component: Second },
];

<LayoutPreview widgets={widgets} />
```

### Handle Order Changes
```tsx
<LayoutPreview
  widgets={widgets}
  onOrderChange={(newOrder) => {
    console.log('New order:', newOrder);
    // Do something with the new order
  }}
/>
```

## Accessibility

- Keyboard navigation with arrow keys
- Tab to focus widgets
- ARIA labels on drag handles
- Screen reader support
- Minimum 44x44px touch targets

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
- Chrome Android (latest)

## Troubleshooting

### Drag not working
- Check DndContext wraps SortableContext
- Verify TouchSensor is included for mobile
- Clear browser cache

### Changes not persisting
- Check Zustand middleware is configured
- Verify localStorage is enabled
- Open DevTools → Application → localStorage

### Animations lag
- Check GPU acceleration in Chrome DevTools
- Verify CSS transitions are applied
- Disable browser extensions

### Touch not working on mobile
- Verify you're on actual mobile, not desktop emulation
- Try long-pressing (not quick tap)
- Check browser supports touch events

## Performance Tips

1. Use memoized components to prevent re-renders
2. Keep widget list reasonable size (< 20 items)
3. Use CSS transitions instead of JS animations
4. Test on actual mobile devices

## Documentation

- **Full Guide**: `DRAG_DROP_IMPLEMENTATION.md`
- **Component Docs**: `components/dashboard/customize/README.md`
- **Summary**: `PHASE7_TASK3_SUMMARY.md`

## Next Steps

1. Test on `/dashboard/customize/demo` page
2. Visit `/dashboard/customize` to see full implementation
3. Integrate LayoutPreview into main dashboard if desired
4. Customize widget styles as needed
5. Add more widgets following the same pattern

---

**Status**: ✅ Complete and ready to use!

For detailed information, see the full documentation in `DRAG_DROP_IMPLEMENTATION.md`.
