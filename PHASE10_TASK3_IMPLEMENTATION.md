# Phase 10, Task 3: RTL Layout & Locale-Aware Formatting

## Implementation Summary

This implementation adds comprehensive RTL (Right-to-Left) support and locale-aware formatting (English/Arabic) to the Accounts Dashboard. The solution uses CSS logical properties for direction-independent layout and Intl.NumberFormat/Intl.DateTimeFormat for proper locale handling.

## Files Created

### 1. **lib/localization/formatters.ts**
Comprehensive locale-aware formatting utilities using Intl APIs:
- `formatCurrency(value, currency, locale)` - AED/USD/EUR with en/ar support
- `formatNumber(value, locale, decimals)` - Locale-aware number formatting
- `formatDate(date, locale, format)` - Date formatting with Arabic month names
- `formatPercent(value, locale, decimals)` - Percentage formatting
- `formatList(items, locale)` - Comma-separated list formatting
- `getDirection(locale)` - Returns 'ltr' or 'rtl'
- `formatLargeNumber(value, locale, decimals)` - K/M/B suffix formatting

### 2. **lib/hooks/useDirection.ts**
Client-side hook for RTL/LTR detection:
- `useDirection()` - Returns 'ltr' | 'rtl' based on current locale
- Uses `useLocale()` from next-intl

### 3. **messages/en.json** (Updated)
Comprehensive English translations with 549 keys including:
- Navigation, Header, KPIs, Widgets, Actions, Status, Messages
- Table headers, Filters, Export formats, Pagination, Forms
- Currency types, Timezones, Themes, Error codes, Welcome messages
- Onboarding, Dashboard, Analytics, Receivables, Payables, Cash Flow
- Budget, Profitability, Reports, Settings, User management
- Integration, Notification, Validation, AI, Tooltips

### 4. **messages/ar.json** (Updated)
Comprehensive Arabic translations with 549 keys (matching en.json structure)
- All navigation labels in Arabic
- Full financial terminology in Arabic
- Arabic formatting indicators for Intl APIs

### 5. **middleware.ts**
Next-intl middleware for locale routing:
- Automatically redirects requests to locale-prefixed URLs
- Matches all pathnames except API routes, static files, and public folder
- Uses 'always' locale prefix strategy

### 6. **app/[locale]/layout.tsx**
New root layout for locale-specific pages:
- Sets `dir` attribute (rtl/ltr) on HTML element
- Sets `lang` attribute for language declaration
- Sets `data-dir` for CSS selectors
- Wraps children with `NextIntlClientProvider`
- Loads locale-specific messages from getMessages()
- Maintains all existing QueryProvider and AIAssistantPanel wrapping

### 7. **app/[locale]/page.tsx**
Home page redirect to dashboard with locale:
- Redirects `/:locale` to `/:locale/dashboard`

### 8. **app/[locale]/dashboard/page.tsx**
Locale-aware dashboard page:
- Wraps MainLayout with AIInsightsSection and DashboardContent

## Files Updated

### 1. **styles/variables.css**
- Added `--dir` CSS variable to track text direction
- Added RTL variables under `[dir="rtl"]` selector

### 2. **styles/globals.css**
- Added direction property to `html` and `html[dir="rtl"]`
- Added RTL-specific CSS rules using logical properties:
  - Sidebar border adjustments for RTL
  - Text alignment using `text-start` and `text-end`
  - Flexbox direction reversal for RTL
  - Navigation alignment adjustments
  - Padding/margin using `margin-inline-*` and `padding-inline-*`
  - Border adjustments for `border-l` and `border-r`

### 3. **components/navigation/MainLayout.tsx**
- Added `useDirection()` hook import
- Added `flex-row-reverse` for RTL layout
- Updated sidebar border styling based on direction
- Maintains responsive behavior for both LTR and RTL

### 4. **components/navigation/Sidebar.tsx**
- Added `text-start` for RTL-aware text alignment
- Added `flex-shrink-0` to icons for consistent sizing
- Updated logo and navigation items for RTL support

### 5. **components/dashboard/kpi/KPICard.tsx**
- Added `useLocale()` hook for locale-aware formatting
- Updated to use locale-aware formatters from `lib/localization/formatters.ts`
- Added `text-start` for RTL-aware text alignment
- Updated margin using `ms-1` (margin-inline-start) instead of `ml-1`
- Added locale parameter to formatKPIValue function

### 6. **components/dashboard/transactions/TransactionsTable.tsx**
- Added `useLocale()` hook for potential locale-aware formatting
- Updated table headers from `text-left` to `text-start`
- Updated amount column from `text-right` to `text-end`
- Maintains proper text alignment in both LTR and RTL

### 7. **lib/formatting/currency.ts**
- Refactored to use locale-aware formatters from `lib/localization/formatters.ts`
- Updated function signatures to include `Locale` type parameter
- `formatCurrency(value, currency, locale)` - now requires locale
- `formatNumber(value, decimals, locale)` - now requires locale
- `formatPercent(value, decimals, locale)` - now requires locale
- Maintains backward compatibility with fallback locale

## Key Features Implemented

### 1. **Locale-Aware Formatting**
- Currency formatting respects locale and currency type
  - AED + ar: Arabic format
  - USD/EUR + en: Standard format
  - All combinations supported
- Date formatting with Arabic month names
- Number formatting with locale-specific separators
- Percentage formatting with locale rules
- List formatting using Intl.ListFormat

### 2. **CSS Logical Properties**
- All hardcoded left/right replaced with start/end
- `text-left` → `text-start`
- `text-right` → `text-end`
- `margin-left` → `margin-inline-start`
- `border-left` → logical RTL adjustment
- Flexbox `flex-row` → `flex-row-reverse` for RTL

### 3. **Automatic Direction Detection**
- HTML `dir` attribute automatically set based on locale
- `data-dir` attribute for CSS selectors
- `lang` attribute for screen readers and spell checkers
- useDirection() hook for component-level direction access

### 4. **Middleware-Based Routing**
- All routes automatically prefixed with locale
- Seamless navigation between en/ar versions
- Consistent locale in URL throughout the application

## Supported Locales

- **en** - English (LTR)
  - Locale code: en-US
  - Direction: left-to-right

- **ar** - Arabic (RTL)
  - Locale code: ar-AE
  - Direction: right-to-left

## Supported Currencies

- **AED** - United Arab Emirates Dirham (د.إ)
- **USD** - United States Dollar ($)
- **EUR** - Euro (€)

## Usage Examples

### Format Currency
```typescript
import { formatCurrency } from '@/lib/localization/formatters';

// Returns formatted string based on locale
formatCurrency(1000, 'AED', 'ar')  // "١٬٠٠٠.٠٠ د.إ" (if Arabic numerals configured)
formatCurrency(1000, 'USD', 'en')  // "$1,000.00"
```

### Format Date
```typescript
import { formatDate } from '@/lib/localization/formatters';

formatDate(new Date(), 'ar', 'long')    // "22 أغسطس 2026"
formatDate(new Date(), 'en', 'long')    // "Aug 22, 2026"
```

### Use Direction Hook
```typescript
'use client';

import { useDirection } from '@/lib/hooks/useDirection';

export function MyComponent() {
  const direction = useDirection();
  
  return (
    <div className={direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}>
      Content
    </div>
  );
}
```

## CSS Logical Properties Reference

### Text Alignment
- `text-start` - Aligns text to the start (left in LTR, right in RTL)
- `text-end` - Aligns text to the end (right in LTR, left in RTL)

### Spacing
- `ms-*` (margin-inline-start) - Start side margin
- `me-*` (margin-inline-end) - End side margin
- `ps-*` (padding-inline-start) - Start side padding
- `pe-*` (padding-inline-end) - End side padding

### Flexbox
- `flex-row` (LTR default) - Items flow left to right
- `flex-row-reverse` (RTL) - Items flow right to left

## Breaking Changes

None - all changes are backward compatible. Existing code will work with the default locale (en).

## Migration Guide

### For Components Using Currency Formatting

**Before:**
```typescript
formatCurrency(value, 'AED', 'ar-AE')
```

**After:**
```typescript
import { formatCurrency } from '@/lib/localization/formatters';
formatCurrency(value, 'AED', 'ar')
```

### For Components Using Direction

**Before:**
```typescript
// No built-in RTL support
const isRTL = locale === 'ar';
className={isRTL ? 'flex-row-reverse' : 'flex-row'}
```

**After:**
```typescript
import { useDirection } from '@/lib/hooks/useDirection';
const direction = useDirection();
className={direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}
```

### For CSS Text Alignment

**Before:**
```html
<p className="text-left">Left aligned</p>
<p className="text-right">Right aligned</p>
```

**After:**
```html
<p className="text-start">Start aligned</p>
<p className="text-end">End aligned</p>
```

## Testing Recommendations

1. **Locale Switching**: Test switching between /en and /ar URLs
2. **Currency Display**: Verify AED displays correctly in ar locale
3. **Date Formatting**: Check Arabic month names display correctly
4. **RTL Layout**: Verify sidebar moves to right in RTL mode
5. **Text Direction**: Confirm HTML dir attribute changes
6. **Table Alignment**: Check table headers and amounts align properly

## Browser Support

- Modern browsers supporting:
  - CSS Logical Properties
  - Intl.NumberFormat
  - Intl.DateTimeFormat
  - Intl.ListFormat
  - next-intl v3+

## Performance Considerations

- Formatters use native Intl APIs (no external dependencies)
- Direction hook is lightweight (simple locale check)
- CSS logical properties have native browser support
- No runtime locale detection - direction determined at build/request time

## Future Enhancements

1. Add more locales (e.g., ar-SA for Saudi Arabic)
2. Add pseudo-locale for testing (e.g., 'en-test')
3. Implement locale-specific number formats (Indian numbering system, etc.)
4. Add timezone support in date formatting
5. Implement RTL calendar picker components
6. Add number input directionality handling

## References

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [HTML dir Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
