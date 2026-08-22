# Performance Guide

## Overview

This document outlines performance optimization strategies, monitoring procedures, and targets for the Dashboard application. Performance directly impacts user satisfaction and conversion rates.

## Web Vitals Targets

### Core Web Vitals

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint (FCP) | < 1.8s | TBD | TBD |
| Largest Contentful Paint (LCP) | < 2.5s | TBD | TBD |
| Cumulative Layout Shift (CLS) | < 0.1 | TBD | TBD |

### Additional Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Input Delay (FID) | < 100ms | TBD | TBD |
| Interaction to Next Paint (INP) | < 200ms | TBD | TBD |
| Time to Interactive (TTI) | < 3.5s | TBD | TBD |

### Lighthouse Scores

| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 95+ | 90+ |
| Accessibility | 95+ | 90+ |
| Best Practices | 95+ | 90+ |
| SEO | 95+ | 90+ |

## Bundle Size Target

**Maximum Gzipped Bundle Size: 240KB**

Current breakdown (target):
- React & dependencies: 40KB
- UI components: 60KB
- Styles & theme: 30KB
- Application code: 80KB
- Vendor libraries: 30KB

## Monitoring Performance

### Measuring Web Vitals

#### Using Google Analytics

```typescript
// lib/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'web_vitals',
    event_label: metric.id,
  });
}

export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

#### Using Sentry

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});

// Automatically captures Web Vitals
Sentry.captureConsoleMessage('Performance data captured');
```

#### Using WebPageTest

```bash
# Analyze site performance
# Visit: https://www.webpagetest.org/
# Test URL: https://dashboard.example.com
# Analyze metrics and recommendations
```

#### Using Lighthouse CI

```yaml
# lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["https://dashboard.example.com"],
      "numberOfRuns": 3,
      "settings": {
        "configPath": "./lighthouse-config.js"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "categories:accessibility": ["error", { "minScore": 0.90 }]
      }
    }
  }
}
```

## Performance Optimizations

### 1. Lazy Loading (Target: 10 Instances)

#### Route-Based Code Splitting

```typescript
// routes/index.tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

const Loading = () => <LoadingSpinner />;

export const routes = [
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: '/transactions',
    element: (
      <Suspense fallback={<Loading />}>
        <Transactions />
      </Suspense>
    ),
  },
];
```

#### Component-Based Code Splitting

```typescript
// components/Chart.tsx
import { lazy, Suspense } from 'react';

const ChartLibrary = lazy(() => import('recharts'));

export function ChartComponent({ data }: { data: any[] }) {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ChartLibrary data={data} />
    </Suspense>
  );
}
```

#### Image Lazy Loading

```typescript
// components/TransactionImage.tsx
export function TransactionImage({ src, alt }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy" // Native lazy loading
      decoding="async" // Async image decoding
      srcSet={`
        ${src}?w=200 200w,
        ${src}?w=400 400w,
        ${src}?w=800 800w
      `}
      sizes="(max-width: 600px) 200px, 400px"
    />
  );
}
```

#### Dynamic Import for Heavy Libraries

```typescript
// hooks/useChartLibrary.ts
import { useEffect, useState } from 'react';

export function useChartLibrary() {
  const [Chart, setChart] = useState(null);

  useEffect(() => {
    // Only import when needed
    import('recharts').then(module => setChart(module.LineChart));
  }, []);

  return Chart;
}
```

### 2. Memoization (Target: 4 Instances)

#### React.memo for Components

```typescript
// components/TransactionRow.tsx
import { memo } from 'react';

interface TransactionRowProps {
  transaction: Transaction;
  onClick: (id: string) => void;
}

const TransactionRow = memo(
  ({ transaction, onClick }: TransactionRowProps) => (
    <tr onClick={() => onClick(transaction.id)}>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.category}</td>
    </tr>
  ),
  (prev, next) => {
    // Custom comparison - only re-render if transaction changed
    return prev.transaction.id === next.transaction.id;
  }
);

export default TransactionRow;
```

#### useMemo for Expensive Calculations

```typescript
// hooks/useDashboardMetrics.ts
import { useMemo } from 'react';

export function useDashboardMetrics(transactions: Transaction[]) {
  const metrics = useMemo(() => {
    // Expensive calculation only runs when transactions change
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  return metrics;
}
```

#### useCallback for Event Handlers

```typescript
// hooks/useTransactionFilters.ts
import { useCallback, useState } from 'react';

export function useTransactionFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState({});

  const handleFilterChange = useCallback(
    (filterName: string, value: any) => {
      setFilters(prev => ({ ...prev, [filterName]: value }));
    },
    []
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Apply all active filters
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return t[key] === value;
      });
    });
  }, [transactions, filters]);

  return { filteredTransactions, handleFilterChange };
}
```

#### Context Memoization

```typescript
// context/ThemeContext.tsx
import { createContext, useMemo, useState } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
```

### 3. Code Splitting

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer dist/stats.json

# Check for duplicates
npx webpack-bundle-analyzer --help

# Install size-limit to track bundle over time
npm install --save-dev size-limit @size-limit/webpack
```

#### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        ui: {
          test: /[\\/]node_modules[\\/](react-icons|recharts)[\\/]/,
          name: 'ui-libs',
          priority: 5,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single',
  },
};
```

#### .size-limit.json Configuration

```json
{
  "checks": [
    {
      "path": "dist/*.js",
      "limit": "240KB",
      "gzip": true
    },
    {
      "path": "dist/main.*.js",
      "limit": "80KB",
      "gzip": true
    },
    {
      "path": "dist/vendor.*.js",
      "limit": "40KB",
      "gzip": true
    }
  ]
}
```

### 4. Image Optimization

#### Responsive Images

```typescript
// components/OptimizedImage.tsx
export function OptimizedImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <picture>
      <source
        media="(max-width: 600px)"
        srcSet={`${src}?w=400&h=300&fit=crop`}
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${src}?w=600&h=450&fit=crop`}
      />
      <img
        src={`${src}?w=1200&h=900&fit=crop`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
```

#### Image Format Selection

```typescript
// Use WebP with fallback
<picture>
  <source type="image/webp" srcSet="image.webp" />
  <source type="image/jpeg" srcSet="image.jpg" />
  <img src="image.jpg" alt="Description" />
</picture>
```

#### SVG Optimization

```typescript
// Always inline critical SVGs
import LogoSvg from './logo.svg?react';

export function Header() {
  return (
    <header>
      <LogoSvg /> {/* Inlined SVG, no network request */}
    </header>
  );
}
```

### 5. CSS Optimization

#### Critical CSS

```typescript
// Generate critical CSS for above-the-fold content
import criticalCss from './critical.css';

export function App() {
  return (
    <html>
      <head>
        <style>{criticalCss}</style>
        <link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'" />
      </head>
    </html>
  );
}
```

#### CSS-in-JS Optimization

```typescript
// Styled Components with theme
import styled from 'styled-components';

const Container = styled.div`
  padding: ${props => props.theme.spacing};
  color: ${props => props.theme.colors.text};
  /* Theme values cached and reused */
`;
```

### 6. JavaScript Optimization

#### Tree Shaking Configuration

```json
{
  "sideEffects": false,
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
}
```

#### Defer Non-Critical Scripts

```html
<script src="analytics.js" defer></script>
<script src="chat-widget.js" async></script>
<script src="critical-app.js"></script>
```

### 7. Font Optimization

```typescript
// Load fonts optimally
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

#### System Font Stack

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  /* No network request needed */
}
```

### 8. API Caching

#### Service Worker Caching

```typescript
// service-worker.ts
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Cache CSS, JS, images forever (versioned)
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [new ExpirationPlugin({ maxEntries: 60 })],
  })
);

// Network first for API, fallback to cache
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
  })
);

// Stale while revalidate for images
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
  })
);
```

#### Browser Cache Headers

```typescript
// server/middleware/cache.ts
app.use((req, res, next) => {
  if (req.path.match(/\.(js|css)$/)) {
    // Cache static assets for 1 year (versioned in filename)
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (req.path === '/') {
    // Never cache HTML
    res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  } else if (req.path.match(/api/)) {
    // Cache API responses briefly
    res.set('Cache-Control', 'public, max-age=60');
  }
  next();
});
```

### 9. Database Query Optimization

#### Efficient API Calls

```typescript
// hooks/useDashboardData.ts - Efficient fetching
export function useDashboardData() {
  // Single query for multiple data types
  return useQuery(['dashboard'], async () => {
    const response = await fetch('/api/dashboard?include=summary,transactions,alerts');
    return response.json();
  });
}

// DON'T do multiple sequential requests
// Bad pattern:
// const summary = await fetch('/api/summary');
// const transactions = await fetch('/api/transactions');
// const alerts = await fetch('/api/alerts');
```

#### Pagination

```typescript
// components/TransactionList.tsx
export function TransactionList() {
  const [page, setPage] = useState(1);

  const { data } = useQuery(
    ['transactions', page],
    () => fetch(`/api/transactions?page=${page}&limit=20`).then(r => r.json()),
    {
      keepPreviousData: true, // Smooth pagination
    }
  );

  return (
    <>
      {data?.items.map(item => (...))}
      <Pagination page={page} setPage={setPage} total={data?.total} />
    </>
  );
}
```

### 10. Virtualization for Long Lists

```typescript
// components/VirtualTransactionList.tsx
import { FixedSizeList } from 'react-window';

export function VirtualTransactionList({ items }: { items: Transaction[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <TransactionRow transaction={items[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

## Performance Monitoring

### Real User Monitoring (RUM)

```typescript
// lib/rum.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1, // 10% profiling
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});

// Track custom performance metrics
export function trackPerformance(metric: string, value: number) {
  Sentry.captureMessage(metric, 'info', {
    tags: { performance: true },
    extra: { value },
  });
}
```

### Performance Budgets

```javascript
// performance-budget.js
const performanceBudget = {
  bundles: [
    {
      name: 'main',
      maxSize: '80kb',
    },
    {
      name: 'vendor',
      maxSize: '40kb',
    },
  ],
  metrics: [
    {
      name: 'FCP',
      maxValue: 1800,
    },
    {
      name: 'LCP',
      maxValue: 2500,
    },
    {
      name: 'CLS',
      maxValue: 0.1,
    },
  ],
};
```

## Performance Checklist

### Pre-Release
- [ ] Lighthouse score >= 90 (all categories)
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Bundle size < 240KB gzipped
- [ ] Zero console errors/warnings
- [ ] Images optimized and lazy-loaded
- [ ] Code split appropriately
- [ ] Service Worker implemented
- [ ] Fonts optimized
- [ ] CSS critical path optimized
- [ ] API calls batched where possible
- [ ] Database queries optimized
- [ ] No memory leaks detected
- [ ] Long-running tasks using Web Workers

### Post-Release
- [ ] Monitor real user performance metrics
- [ ] Track error rates
- [ ] Monitor API response times
- [ ] Track bundle size trends
- [ ] Daily performance reports
- [ ] Investigate performance degradation
- [ ] Address user-reported slowness

## Future Performance Optimizations

### Web Workers (Phase 2)
- Offload heavy calculations to background thread
- Target: Chart generation, data processing

### Service Worker Enhancement (Phase 2)
- Advanced caching strategies
- Offline capability
- Push notifications

### Static Site Generation (SSG) (Phase 3)
- Pre-render static pages at build time
- Instant page loads for common routes
- CDN distribution

### Edge Computing (Phase 3)
- Process requests at edge servers
- Reduce latency for global users
- Server-side rendering at edge

### Compression (Phase 2)
- Brotli compression (60% smaller than gzip)
- WASM modules for performance-critical code

## Performance Testing Tools

### Automated Testing
```bash
# Lighthouse CI
npm run lighthouse:ci

# Bundle analysis
npm run analyze:bundle

# Performance regression testing
npm run test:performance

# Real user monitoring dashboard
# https://sentry.io/dashboard
```

### Manual Testing
- Chrome DevTools (Performance tab)
- Firefox Developer Tools
- WebPageTest
- GTmetrix
- Pingdom

## Documentation

- [Web Vitals Guide](https://web.dev/vitals/)
- [React Performance](https://react.dev/reference/react)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
