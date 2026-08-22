# Performance Optimization Quick Start Guide

## For Developers: Using Performance Tools

### 1. Monitor Component Render Time

```typescript
import { useRenderTime } from '@/hooks';

function MyComponent() {
  useRenderTime('MyComponent');
  
  return <div>Hello World</div>;
}
```

**What it does**: Logs render time to console if > 16ms. Shows render count every 10 renders.

---

### 2. Use Memoized Formatters

**Before (recreates formatters on every render)**:
```typescript
function KPICard({ value, currency }) {
  const formatted = formatCurrency(value, currency);
  return <div>{formatted}</div>;
}

// Re-renders 10 times = formatCurrency called 10 times
```

**After (reuses formatter)**:
```typescript
import { useMemoizedKPIFormatter } from '@/hooks';

function KPICard({ value, currency }) {
  const formatter = useMemoizedKPIFormatter('ar');
  const formatted = formatter.formatCurrency(value, currency);
  return <div>{formatted}</div>;
}

// Re-renders 10 times = formatter only recreated if locale changes
```

**Performance gain**: 30-40% faster formatting

---

### 3. Lazy Load Heavy Components

**Before**:
```typescript
import { CustomizeModal } from '@/components/dashboard/CustomizeModal';
import { TransactionDetailsDrawer } from '@/components/dashboard/transactions/TransactionDetailsDrawer';

function Dashboard() {
  return (
    <>
      <CustomizeModal isOpen={isOpen} onClose={handleClose} />
      <TransactionDetailsDrawer transaction={tx} isOpen={showTx} onClose={closeTx} />
    </>
  );
}

// Both components loaded on initial page load (even if not shown)
// Adds ~50KB to initial bundle
```

**After**:
```typescript
import { CustomizeModal, TransactionDetailsDrawer } from '@/components/lazy/LazyComponents';

function Dashboard() {
  return (
    <>
      <CustomizeModal isOpen={isOpen} onClose={handleClose} />
      <TransactionDetailsDrawer transaction={tx} isOpen={showTx} onClose={closeTx} />
    </>
  );
}

// Both components code-split, only loaded when needed
// Improves initial TTI by ~200-400ms
```

---

### 4. Add Suspense Boundaries

**For Charts**:
```typescript
import { ChartSuspenseWrapper } from '@/components/providers/SuspenseWrapper';

function Dashboard() {
  return (
    <ChartSuspenseWrapper>
      <RevenueChart />
    </ChartSuspenseWrapper>
  );
}
```

**For Modals**:
```typescript
import { ModalSuspenseWrapper } from '@/components/providers/SuspenseWrapper';

function Dashboard() {
  return (
    <ModalSuspenseWrapper>
      {isOpen && <CustomizeModal />}
    </ModalSuspenseWrapper>
  );
}
```

---

### 5. Memoize Expensive Components

**Before**:
```typescript
export function MyCard() {
  return <div>Card content</div>;
}
```

**After**:
```typescript
import { memo } from 'react';

function MyCardComponent() {
  return <div>Card content</div>;
}

export const MyCard = memo(MyCardComponent);

MyCard.displayName = 'MyCard';
```

**When to use**: Components that render in lists or are called frequently with same props

---

### 6. Use useCallback for Event Handlers

**Before**:
```typescript
function AlertCard({ alert, onDismiss }) {
  const handleDismiss = (e) => {
    e.stopPropagation();
    onDismiss(alert.id);
  };
  
  return (
    <button onClick={handleDismiss}>Dismiss</button>
  );
}

// Parent re-renders = new handleDismiss function = child can't memoize
```

**After**:
```typescript
import { useCallback } from 'react';
import { memo } from 'react';

function AlertCardComponent({ alert, onDismiss }) {
  const handleDismiss = useCallback((e) => {
    e.stopPropagation();
    onDismiss(alert.id);
  }, [alert.id, onDismiss]);
  
  return (
    <button onClick={handleDismiss}>Dismiss</button>
  );
}

export const AlertCard = memo(AlertCardComponent);
```

**Benefit**: Stable function references enable parent component memoization

---

## For Performance Testing

### 1. Check Component Render Performance

```bash
# In Chrome DevTools
1. Open Performance tab (⌘+⇧+P on Mac, Ctrl+Shift+P on Windows)
2. Click Record
3. Interact with component (click, scroll, type)
4. Click Stop
5. Look for long yellow/red bars (main thread blocking)
6. Check Console for performance warnings
```

### 2. Check Bundle Size

```bash
# Build the app
npm run build

# View output
ls -lh .next/static/chunks/

# For detailed analysis:
npm install -g next-bundle-analyzer
ANALYZE=true npm run build
```

### 3. Profile with React DevTools

```bash
# Install React DevTools browser extension
# Open DevTools → Profiler tab
# Click Record
# Interact with page
# View commit graph and render times
```

---

## Common Performance Patterns

### Pattern 1: List with Many Items

```typescript
import { memo, useCallback } from 'react';

// Memoize the item component
const AlertItem = memo(function AlertItem({ alert, onDismiss }) {
  const handleDismiss = useCallback(() => {
    onDismiss(alert.id);
  }, [alert.id, onDismiss]);

  return (
    <div onClick={handleDismiss}>
      {alert.title}
    </div>
  );
});

// Parent uses stable callback
function AlertList({ alerts, onDismiss }) {
  const handleDismiss = useCallback((id) => {
    // Update state
  }, []);

  return (
    <div>
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} onDismiss={handleDismiss} />
      ))}
    </div>
  );
}
```

### Pattern 2: Expensive Calculation

**Before**:
```typescript
function Dashboard({ transactions }) {
  // Runs on every render
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  
  return <div>Total: {total}</div>;
}
```

**After**:
```typescript
import { useMemo } from 'react';

function Dashboard({ transactions }) {
  // Only recalculates when transactions changes
  const total = useMemo(
    () => transactions.reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );
  
  return <div>Total: {total}</div>;
}
```

### Pattern 3: Modal/Drawer on Demand

```typescript
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Code-split the modal
const CustomizeModal = dynamic(
  () => import('@/components/dashboard/CustomizeModal')
    .then(mod => ({ default: mod.CustomizeModal })),
  { ssr: false, loading: () => <ModalSkeleton /> }
);

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Customize</button>
      <Suspense fallback={<ModalSkeleton />}>
        {showModal && <CustomizeModal onClose={() => setShowModal(false)} />}
      </Suspense>
    </>
  );
}
```

---

## Performance Checklist for New Components

When creating a new component, ask:

- [ ] Does it render in a list? → Use `memo()`
- [ ] Does it accept callbacks? → Use `useCallback()` for handlers
- [ ] Does it do expensive calculations? → Use `useMemo()`
- [ ] Is it only sometimes shown? → Use dynamic import + Suspense
- [ ] Does it format numbers/dates? → Use `useMemoized*Formatter` hooks
- [ ] Is it a chart or heavy visualization? → Add to lazy loading
- [ ] Does it have many child components? → Wrap with Suspense boundary

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Creating Inline Objects/Functions

```typescript
// BAD - new object on every render
function Component() {
  const config = { timeout: 5000, retry: 3 };
  return <Child config={config} />;
}

// GOOD - object defined outside
const DEFAULT_CONFIG = { timeout: 5000, retry: 3 };
function Component() {
  return <Child config={DEFAULT_CONFIG} />;
}
```

### ❌ Mistake 2: Arrow Functions in Props

```typescript
// BAD - new function on every render
<button onClick={() => handleClick(id)}>Click</button>

// GOOD - use useCallback
const handleClick = useCallback((id) => {
  // handle click
}, []);
<button onClick={() => handleClick(id)}>Click</button>
```

### ❌ Mistake 3: Calculating in Render

```typescript
// BAD - runs every render
function Dashboard({ transactions }) {
  const summary = transactions
    .filter(tx => tx.status === 'posted')
    .reduce((sum, tx) => sum + tx.amount, 0);
}

// GOOD - only when transactions changes
function Dashboard({ transactions }) {
  const summary = useMemo(
    () => transactions
      .filter(tx => tx.status === 'posted')
      .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );
}
```

### ❌ Mistake 4: Wrong Dependency Array

```typescript
// BAD - dependencies missing
const handleClick = useCallback(() => {
  console.log(userId); // userId is accessed but not in deps
}, []); // Missing userId dependency!

// GOOD - all dependencies included
const handleClick = useCallback(() => {
  console.log(userId);
}, [userId]);
```

---

## Testing Performance Impact

### Before Making a Change

```bash
npm run build
# Note the bundle size and build time
```

### After Making a Change

```bash
npm run build
# Compare bundle size and build time
```

### For Runtime Performance

Use React DevTools Profiler:
1. Open DevTools → Profiler tab
2. Record interactions
3. Look at "Render duration" for each component
4. Target: < 16ms per render (60fps)

---

## Resources

- [React Performance Documentation](https://react.dev/reference/react/useMemo)
- [Next.js Performance Guide](https://nextjs.org/learn/seo/web-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Performance Tab](https://developer.chrome.com/docs/devtools/performance/)

---

## Quick Commands

```bash
# Build and analyze bundle
ANALYZE=true npm run build

# Start dev server
npm run dev

# Run tests
npm run test

# Type check
npm run type-check

# Lint code
npm run lint
```
