# Troubleshooting Guide

## Common Issues & Solutions

### Port 3000 Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**

**Windows (PowerShell):**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F

# Or specify different port
npm run dev -- -p 3001
```

**macOS/Linux:**
```bash
# Find and kill process
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or specify different port
npm run dev -- -p 3001
```

---

## Build Failures

### Dependencies Not Found

**Error:** `Cannot find module '@package/name'` during build

**Solution:**

```bash
# Clear node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Verify installation
npm ls

# Build again
npm run build
```

### Corrupted npm Cache

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install

# Rebuild
npm run build
```

### Out of Memory During Build

**Error:** `JavaScript heap out of memory`

**Solution:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build

# For persistent fix, add to .env.local or shell profile
export NODE_OPTIONS="--max_old_space_size=4096"
```

### ESLint Build Failure

**Error:** Linting fails during build

**Solution:**

```bash
# Run linter to see specific errors
npm run lint

# Fix automatically fixable issues
npm run lint -- --fix

# Review and fix remaining issues manually

# Run type checker
npm run type-check
```

---

## TypeScript Errors

### Type Mismatch Errors

**Error:** `Type 'X' is not assignable to type 'Y'`

**Solution:**

```bash
# Get detailed type checking
npm run type-check

# Review errors and fix:
# 1. Ensure prop types match interfaces
# 2. Verify function return types
# 3. Check API response types

# Example fix:
// Before
const data: string = someData; // Type error

// After
const data: string = String(someData);
```

### 'any' Type Used

**Error:** `Implicitly has type 'any'`

**Solution:**

```typescript
// Before
function myFunction(param) { // Error: implicit any
  return param.value;
}

// After
function myFunction(param: MyType) {
  return param.value;
}
```

### Missing Type Definitions

**Error:** `Cannot find type definition for 'package'`

**Solution:**

```bash
# Check if @types package exists
npm search @types/package

# Install type definitions
npm install --save-dev @types/package

# If no @types package exists, create types/package.d.ts
# with proper type definitions
```

---

## Chart Issues (ECharts & Recharts)

### Charts Not Rendering

**Error:** Blank chart area or console errors

**Solution:**

```typescript
// 1. Ensure chart container has dimensions
<div style={{ width: '100%', height: 400 }}>
  <YourChart />
</div>

// 2. Verify data format matches chart requirements
const chartData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 200 }
];

// 3. Check for console errors
// Open DevTools → Console tab

// 4. Verify echarts-for-react is installed
npm ls echarts echarts-for-react
```

### Chart Data Not Updating

**Error:** Charts show stale data after API call

**Solution:**

```typescript
// Use useEffect to update chart when data changes
import { useEffect, useRef } from 'react';

export function MyChart() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch or update data
    fetchChartData().then(setData);
  }, [dependency]);

  // Chart will re-render with new data
  return <YourChart data={data} ref={chartRef} />;
}
```

### Chart Memory Leak

**Error:** Performance degrades over time; DevTools shows growing memory

**Solution:**

```typescript
// Properly dispose of chart instance
useEffect(() => {
  return () => {
    // Cleanup on unmount
    chartRef.current?.dispose?.();
  };
}, []);

// Limit chart instances
// Don't create new chart for every render
```

### Chart Styling Issues

**Solution:**

```typescript
// For ECharts, pass theme and options
const options = {
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: 12
  },
  // ... more options
};

<ReactECharts
  option={options}
  style={{ height: '400px' }}
/>
```

---

## RTL (Right-to-Left) Issues

### Text Not Aligning Right

**Problem:** Arabic/Hebrew text not right-aligned

**Solution:**

```tsx
// Wrong approach - don't use right/left
<div className="text-right">مرحبا</div>

// Correct approach - use Tailwind's start/end utilities
<div className="text-end">مرحبا</div>

// For direction, set on root
<div dir="rtl" className="space-x-4">
  {/* Content */}
</div>
```

### Tailwind RTL Support

**Ensure tailwind.config.ts supports RTL:**

```typescript
// tailwind.config.ts
export default {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
  // RTL is supported by default in Tailwind v3
};
```

### Layout Direction Issues

**Solution:**

```typescript
// Use i18n to set text direction
import { useLocale } from 'next-intl';

export function LayoutWrapper() {
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html dir={direction}>
      {/* Your layout */}
    </html>
  );
}
```

### Margin/Padding Not Mirroring

**Wrong:**
```jsx
<div className="ml-4">Text</div>  // Doesn't mirror in RTL
```

**Correct:**
```jsx
<div className="ms-4">Text</div>  // ms = margin-start (auto-mirrors)
<div className="ps-4">Text</div>  // ps = padding-start
```

---

## i18n (Internationalization) Not Working

### Messages Not Loading

**Error:** Keys show instead of translated text (e.g., `common.welcome` instead of actual text)

**Solution:**

```bash
# 1. Check message files exist
ls -la messages/

# 2. Verify structure
# messages/
#   ├── en.json
#   ├── ar.json
#   └── fr.json

# 3. Verify useTranslations import
import { useTranslations } from 'next-intl';

// 4. Check message file format
{
  "common": {
    "welcome": "Welcome"
  }
}

// 5. Use correct key path
const t = useTranslations();
t('common.welcome'); // Not t('welcome')
```

### Language Not Switching

**Solution:**

```typescript
// Ensure routing includes locale
// app/[locale]/layout.tsx
export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
```

### Message Format Errors

**Error:** `"x" is not a valid message key`

**Solution:**

```json
{
  "errors": {
    "required": "This field is required",
    "email": "Invalid email format"
  }
}

// Usage
const t = useTranslations('errors');
t('required'); // Returns "This field is required"
```

---

## Zustand State Not Persisting

### State Reset on Page Refresh

**Problem:** Zustand store loses state after refresh

**Solution:**

```typescript
// Add persistence middleware
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      name: '',
      setName: (name) => set({ name }),
    }),
    {
      name: 'user-storage', // localStorage key
      storage: localStorage,
      partialize: (state) => ({
        name: state.name, // Only persist specific fields
      }),
    }
  )
);
```

### Selective Persistence

```typescript
// Persist only certain fields
export const useAppStore = create(
  persist(
    (set) => ({
      theme: 'light',
      auth: null,
      setTheme: (theme) => set({ theme }),
      setAuth: (auth) => set({ auth }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme, // Only persist theme, not auth
      }),
    }
  )
);
```

### Clear Persistent State

```typescript
// Add reset function
export const useUserStore = create(
  persist(
    (set) => ({
      name: '',
      setName: (name) => set({ name }),
      reset: () => set({ name: '' }),
    }),
    { name: 'user-storage' }
  )
);

// Usage
const reset = useUserStore((state) => state.reset);
reset(); // Clears persisted data
```

---

## TanStack Query Cache Issues

### Data Not Updating

**Problem:** Old data shown even after API call

**Solution:**

```typescript
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function Component() {
  const queryClient = useQueryClient();
  
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const handleRefresh = () => {
    // Manually refetch
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  return <button onClick={handleRefresh}>Refresh</button>;
}
```

### Background Refetch Not Working

**Solution:**

```typescript
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  refetchInterval: 30000, // Refetch every 30s
  refetchOnWindowFocus: true, // Refetch on window focus
  refetchOnReconnect: true, // Refetch when reconnecting
});
```

### Clearing Query Cache

```typescript
const queryClient = useQueryClient();

// Clear specific query
queryClient.removeQueries({ queryKey: ['users'] });

// Clear all queries
queryClient.clear();

// On logout, clear sensitive data
function handleLogout() {
  queryClient.removeQueries();
  // ... logout logic
}
```

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newData) => {
    // Cancel pending queries
    await queryClient.cancelQueries({ queryKey: ['users'] });
    
    // Optimistic update
    const previousData = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], newData);
    
    return { previousData }; // Context for rollback
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['users'], context.previousData);
  },
  onSuccess: () => {
    // Verify with server
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

---

## Debug Mode

### Enable Debug Logging

```bash
# Set debug environment variable
NEXT_DEBUG=true npm run dev

# Or on Windows
set NEXT_DEBUG=true && npm run dev

# Or in PowerShell
$env:NEXT_DEBUG = "true"; npm run dev
```

### Debug Output Includes

- Build optimization details
- Routing resolution
- Module loading
- Performance metrics
- Source map information

### Browser DevTools

```javascript
// Add debug logging to components
console.log('Component mounted', { props, state });

// Monitor store updates
const store = useUserStore.subscribe(
  (state) => console.log('Store updated:', state)
);

// Check API responses
fetch('/api/users')
  .then(r => r.json())
  .then(data => {
    console.log('API Response:', data);
    return data;
  });
```

### Network Inspection

1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Trigger action
4. Click request
5. Inspect Headers and Response
6. Check for 4xx/5xx errors

### React DevTools

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Inspect component tree
4. View props and state
5. Trigger re-renders

---

## Performance Issues

### Slow Page Load

**Solution:**

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer

# Check build time
time npm run build

# Check runtime performance
# Open DevTools → Performance tab
# Click Record, perform action, click Stop
```

### High Memory Usage

```bash
# Monitor with PM2
pm2 monit

# Check Node process
ps aux | grep node

# Restart if needed
pm2 restart accounts-web
```

### Database Slow Queries

```bash
# Enable query logging
DATABASE_LOG=true npm run dev

# Use database profiling tools
# Check indexes on frequently queried tables
```

---

## Production Deployment Issues

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs accounts-web

# Verify Node version
node --version

# Check port availability
netstat -tulpn | grep 3115

# Manually start for errors
npm run build && npm start
```

### Nginx Connection Error

```bash
# Test Nginx config
sudo nginx -t

# Check if app is running on port 3115
curl http://localhost:3115

# Review error logs
tail -f /var/log/nginx/accounts-web-error.log
```

### SSL Certificate Expired

```bash
# Check certificate expiry
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Auto-renewal status
sudo systemctl status certbot.timer
```

---

## Getting Help

1. **Check Documentation**
   - Review DEVELOPMENT.md and DEPLOYMENT.md
   - Check Next.js documentation
   - Search package docs (Tailwind, Zustand, TanStack Query)

2. **Review Logs**
   - Development: Check browser console and terminal
   - Production: Check PM2 logs and Nginx error logs

3. **Debug with Tools**
   - Use VS Code debugger
   - Use browser DevTools
   - Use PM2 monitoring

4. **Ask for Help**
   - Search GitHub issues
   - Create detailed issue with:
     - Error message
     - Steps to reproduce
     - Environment info (OS, Node version, etc.)
     - Relevant code snippets
     - Log output

5. **Emergency Rollback**
   ```bash
   # If deployment breaks production
   git reset --hard <previous-commit>
   npm install --production
   npm run build
   pm2 restart accounts-web
   ```
