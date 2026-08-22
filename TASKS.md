# ACCOUNTS DASHBOARD — TASKS.md
## Implementation Tracking & Phase Checklist

**Project**: Accounts Dashboard Enterprise Financial UI  
**Status**: READY TO START  
**Total Phases**: 14 (Steps 1–14)  
**Estimated Duration**: 12–14 Claude Code sessions  
**Last Updated**: 2024-08-19  

---

## PHASE TRACKING MATRIX

| Phase | Name | Status | Claude Sessions | Dependencies | Est. Hours | Assigned |
|-------|------|--------|-----------------|--------------|------------|----------|
| 0 | Foundation & Design System | 🟡 QUEUED | 1–2 | — | 4–6 | — |
| 1 | App Shell & Navigation | 🟡 QUEUED | 1 | Phase 0 | 3–4 | — |
| 2 | Dashboard Grid & KPI Cards | 🟡 QUEUED | 1–2 | Phase 0, 1 | 4–5 | — |
| 3 | Financial Charts | 🟡 QUEUED | 1–2 | Phase 0, 2 | 4–5 | — |
| 4 | AR/AP & Cash Flow Widgets | 🟡 QUEUED | 1 | Phase 0, 2, 3 | 3–4 | — |
| 5 | Budget, Profitability, Expenses | 🟡 QUEUED | 1–2 | Phase 0, 3, 4 | 4–5 | — |
| 6 | Transactions & Alerts | 🟡 QUEUED | 1 | Phase 0, 2 | 3–4 | — |
| 7 | Dashboard Customization | 🟡 QUEUED | 1 | Phase 0, 2, 6 | 2–3 | — |
| 8 | AI Insights & Assistant | 🟡 QUEUED | 1 | Phase 0 | 2–3 | — |
| 9 | Role-Based Dashboards | 🟡 QUEUED | 0.5 | Phase 0, 8 | 1–2 | — |
| 10 | Internationalization & RTL | 🟡 QUEUED | 1 | Phase 0, 1 | 2–3 | — |
| 11 | Responsive Optimization | 🟡 QUEUED | 0.5 | All prior | 1–2 | — |
| 12 | Accessibility & Performance | 🟡 QUEUED | 1 | All prior | 2–3 | — |
| 13 | Testing & QA | 🟡 QUEUED | 1 | All prior | 3–4 | — |

**Legend**: 🟢 Complete | 🟡 Queued | 🔴 Blocked | 🟠 In Progress

---

## PHASE 0: FOUNDATION & DESIGN SYSTEM
**Status**: 🟡 QUEUED  
**Claude Sessions**: 1–2  
**Duration**: 4–6 hours  

### Objectives
- Initialize clean Next.js 16 project
- Create canonical folder structure
- Define all TypeScript types
- Create design system (CSS variables, Tailwind config)
- Create mock data abstraction layer
- Create data service interfaces
- Create reusable utilities & hooks
- Verify build, TypeScript, linting

### Checklist

#### 0.1 – Project Initialization
- [ ] Create Next.js 16 with App Router, TypeScript strict, Tailwind 4.0
- [ ] Remove boilerplate code
- [ ] Install core dependencies (React 19, shadcn/ui, ECharts, etc.)
- [ ] Configure ESLint + Prettier
- [ ] Setup .gitignore, .env.local template
- [ ] Initial git commit: "Project scaffold"

#### 0.2 – Folder Structure
- [ ] Create all folders per CLAUDE.md structure
- [ ] Create placeholder files in each folder
- [ ] Verify folder structure matches canonical form
- [ ] git commit: "Folder structure setup"

#### 0.3 – TypeScript Type Definitions
- [ ] Create types/dashboard.ts (DashboardSummary, KPIMetric, etc.)
- [ ] Create types/financial.ts (Transaction, AR, AP, etc.)
- [ ] Create types/user.ts (User, Role, Permissions)
- [ ] Create types/api.ts (API response wrappers)
- [ ] Ensure strict, zero `any`
- [ ] git commit: "Type definitions"

#### 0.4 – Design System & Theme
- [ ] Create styles/variables.css (semantic colors, light/dark)
- [ ] Create tailwind.config.ts with custom colors, typography, spacing
- [ ] Customize shadcn/ui components (buttons, cards, inputs)
- [ ] Test light mode rendering
- [ ] Test dark mode rendering
- [ ] git commit: "Design system setup"

#### 0.5 – Mock Data Layer
- [ ] Create data/mock/dashboardData.ts (realistic financial data)
- [ ] Create data/mock/transactions.ts (12+ months)
- [ ] Create data/mock/receivables.ts (AR aging, customers)
- [ ] Create data/mock/payables.ts (AP aging, suppliers)
- [ ] Create data/mock/budgets.ts (budget vs actual)
- [ ] Create data/mock/alerts.ts (financial alerts)
- [ ] Verify data relationships are logically consistent
- [ ] git commit: "Mock data setup"

#### 0.6 – Data Service Layer
- [ ] Create lib/api/dashboardService.ts (IDashboardService interface)
- [ ] Create MockDashboardService (uses mock data)
- [ ] Create APIDashboardService (stub for real API)
- [ ] Create singleton that switches based on env var
- [ ] Test service returns correct mock data
- [ ] git commit: "Data service layer"

#### 0.7 – Utilities & Formatters
- [ ] Create lib/formatting/currency.ts (formatCurrency, formatNumber)
- [ ] Create lib/formatting/dates.ts (formatDate, parseDate, getDateRange)
- [ ] Create lib/utils/index.ts (common utilities)
- [ ] Create lib/dashboard/calculations.ts (margin %, ratios)
- [ ] Test all formatters with multiple currencies (AED, USD, EUR)
- [ ] Test RTL-safe number formatting
- [ ] git commit: "Utilities & formatters"

#### 0.8 – Reusable Hooks
- [ ] Create hooks/useFinancialData.ts (TanStack Query wrapper)
- [ ] Create hooks/useDateRange.ts (date range state management)
- [ ] Create hooks/useCurrency.ts (currency state management)
- [ ] Create hooks/useDashboardCustomization.ts (widget state)
- [ ] Create hooks/useTheme.ts (light/dark mode)
- [ ] Test hooks integrate with Zustand
- [ ] git commit: "Reusable hooks"

#### 0.9 – README & Documentation
- [ ] Write comprehensive README.md
  - Project overview
  - Architecture diagram (ASCII)
  - Tech stack table
  - Installation steps
  - Environment variables
  - Folder structure explanation
  - Data service abstraction explanation
  - Adding a new widget guide
  - Connecting real API guide
  - Testing section
  - Deployment section
- [ ] Create DEVELOPMENT.md with dev workflow
- [ ] git commit: "Documentation"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
npm run test          # ✅ All pass (if tests added)
```

### Success Criteria
- ✅ Next.js builds without errors
- ✅ TypeScript strict, zero `any`
- ✅ ESLint passes
- ✅ Folder structure matches CLAUDE.md
- ✅ All type definitions created
- ✅ Design system functional (light/dark mode)
- ✅ Mock data realistic and consistent
- ✅ Service layer abstraction working
- ✅ All formatters working correctly
- ✅ All hooks created and tested

**Next Phase**: Phase 1 (after Phase 0 complete)

---

## PHASE 1: APPLICATION SHELL & NAVIGATION
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅  
**Claude Sessions**: 1  
**Duration**: 3–4 hours  

### Objectives
- Create MainLayout with responsive sidebar + header
- Implement all header filters (date range, company, branch, currency, search)
- Create sidebar navigation with all menu items
- Implement dark mode toggle
- Use Zustand for global filter state
- Persistent localStorage state

### Checklist

#### 1.1 – Main Layout Component
- [ ] Create components/navigation/MainLayout.tsx
  - Two-column layout: sidebar + main content
  - Responsive: collapse sidebar on tablet/mobile
  - Sidebar toggle button
  - Persist sidebar state to localStorage
- [ ] Create components/navigation/Sidebar.tsx
  - Navigation structure with icons (Lucide React)
  - Active link highlighting
  - Collapse/expand animation
  - Logo section
  - Version footer
- [ ] Create components/navigation/Header.tsx
  - Company selector (dropdown)
  - Branch selector (dropdown)
  - Date range selector (with presets)
  - Comparison selector (None / Prev Period / Prev Year)
  - Currency selector
  - Global search button (Cmd+K)
  - Notifications icon
  - Theme switcher
  - User profile menu
- [ ] git commit: "Main layout structure"

#### 1.2 – Zustand Global State
- [ ] Create lib/store.ts (Zustand configuration)
  - filterSlice (dateRange, company, branch, currency, comparison)
  - uiSlice (sidebarOpen, theme, notifications)
  - authSlice (currentUser, role)
  - persistMiddleware (localStorage)
- [ ] Create hooks/useFilters.ts (useFilterStore selector)
- [ ] Create hooks/useUI.ts (useUIStore selector)
- [ ] git commit: "Global state management"

#### 1.3 – Responsive Behavior
- [ ] Desktop (1024px+): Full sidebar always visible
- [ ] Tablet (768px–1023px): Collapsible sidebar (toggle button)
- [ ] Mobile (< 768px): Slide-out sidebar or bottom nav
- [ ] Test at breakpoints: 320px, 768px, 1024px, 1920px
- [ ] Verify touch-friendly sizes on mobile
- [ ] git commit: "Responsive navigation"

#### 1.4 – Navigation Items
- [ ] Sidebar menu items (with icons):
  - Dashboard
  - Analytics
  - Transactions
  - Receivables
  - Payables
  - Cash Flow
  - Budget & Forecast
  - Profitability
  - Reports
  - AI Insights
  - Settings
- [ ] Active link highlighting
- [ ] Route integration (Link to next/link)
- [ ] git commit: "Navigation menu"

#### 1.5 – Header Filters
- [ ] Date range selector
  - Presets: Today, This Week, This Month, Last Month, This Quarter, This Year, Last Year, Custom
  - Integrated with calendar picker
  - Dispatch to Zustand on change
- [ ] Company selector (mock: Company A, Company B, etc.)
- [ ] Branch selector (mock: Branch 1, Branch 2, etc.)
- [ ] Currency selector (AED, USD, EUR)
- [ ] Comparison selector
- [ ] Global search trigger (Cmd+K)
- [ ] git commit: "Header filters"

#### 1.6 – Dark Mode
- [ ] Theme switcher (light / dark / system)
- [ ] CSS variables respond to data-theme attribute
- [ ] localStorage persistence
- [ ] System preference detection
- [ ] All components tested in both themes
- [ ] Charts readable in both themes
- [ ] git commit: "Dark mode support"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Click sidebar toggle
# - Change date range
# - Switch theme
# - Verify localStorage persistence
```

### Success Criteria
- ✅ MainLayout renders without errors
- ✅ Sidebar collapses/expands on mobile
- ✅ Header filters work and dispatch to Zustand
- ✅ Dark mode toggles UI appropriately
- ✅ State persists across page reload
- ✅ Navigation links active correctly
- ✅ Responsive at all breakpoints

**Next Phase**: Phase 2 (Dashboard Grid & KPIs)

---

## PHASE 2: DASHBOARD GRID & KPI CARDS
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 1 ✅  
**Claude Sessions**: 1–2  
**Duration**: 4–5 hours  

### Objectives
- Create responsive dashboard grid
- Create 8 professional KPI cards
- Pull data from mock service via TanStack Query
- Implement click-through to detail views
- Implement hover effects & sparklines

### Checklist

#### 2.1 – Dashboard Grid Layout
- [ ] Create components/dashboard/DashboardGrid.tsx
  - Responsive grid (4 cols desktop, 2 tablet, 1 mobile)
  - Gap/spacing consistent with design system
  - Grid auto-flow, min-width constraints
  - Widget-ready (prep for Phase 7 customization)
- [ ] Create app/dashboard/page.tsx (main dashboard route)
- [ ] Integrate with MainLayout
- [ ] git commit: "Dashboard grid layout"

#### 2.2 – KPI Card Component
- [ ] Create components/dashboard/kpi/KPICard.tsx
  - Label
  - Current value (formatted currency)
  - Percentage change (with color: green ↑, red ↓)
  - Comparison period label
  - Trend indicator (mini arrow up/down/flat)
  - Mini sparkline chart (ECharts)
  - Optional target value
  - Hover effect (slight shadow/scale)
  - Click → navigate to detail route (e.g., /receivables)
  - Loading skeleton state
  - Error state
- [ ] git commit: "KPI card component"

#### 2.3 – Eight KPI Cards
- [ ] Total Revenue card
- [ ] Total Expenses card
- [ ] Gross Profit card
- [ ] Net Profit card
- [ ] Cash & Bank card
- [ ] Accounts Receivable card
- [ ] Accounts Payable card
- [ ] Outstanding Invoices card
- [ ] All cards pull from dashboardService via useFinancialData hook
- [ ] All cards display correct currency based on Zustand state
- [ ] git commit: "Eight KPI cards"

#### 2.4 – Data Integration
- [ ] Create components/dashboard/DashboardContent.tsx (main dashboard widget container)
- [ ] useFinancialData hook pulls from dashboardService
- [ ] TanStack Query caching configured
- [ ] Loading states show skeleton loaders
- [ ] Error states show friendly messages
- [ ] Refresh button triggers query invalidation
- [ ] git commit: "Data integration"

#### 2.5 – Sparklines
- [ ] Create lib/charts/sparklineConfig.ts (ECharts config for small charts)
- [ ] Each KPI card includes mini sparkline (10–20 pixels tall)
- [ ] Sparklines responsive to dark mode
- [ ] Sparklines use semantic colors (green for good, red for bad)
- [ ] git commit: "Sparkline integration"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard
# - Verify 8 KPI cards visible
# - Change date range → cards update
# - Change currency → cards format correctly
# - Hover KPI → sparkline visible
# - Click KPI → navigate to detail (404 ok for now)
# - Toggle dark mode → sparklines readable
```

### Success Criteria
- ✅ 8 KPI cards render with correct data
- ✅ Cards responsive at all breakpoints
- ✅ Sparklines visible and formatted
- ✅ Currency formatting correct
- ✅ Loading/error states implemented
- ✅ Click-through wired (route exists or adds to URL)
- ✅ Dark mode compatible

**Next Phase**: Phase 3 (Financial Charts)

---

## PHASE 3: FINANCIAL CHARTS
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 2 ✅  
**Claude Sessions**: 1–2  
**Duration**: 4–5 hours  

### Objectives
- Create large interactive ECharts visualizations
- Revenue vs Expense chart (main dashboard chart)
- Cash Flow chart
- Expense breakdown pie chart
- AR/AP aging stacked bar charts
- All charts responsive, tooltip, legend toggling

### Checklist

#### 3.1 – Revenue vs Expense Chart
- [ ] Create components/dashboard/charts/RevenueExpenseChart.tsx
  - ECharts line chart
  - X-axis: dates (daily/weekly/monthly based on date range)
  - Y-axis: amounts in selected currency
  - Series: Revenue (green #16B96F), Expenses (orange #F97316), Gross Profit (blue #6366F1)
  - Legend toggles series visibility
  - Tooltip on hover shows all series values
  - Zoom/pan support
  - Responsive sizing
  - Empty state (if no data)
  - Loading state (skeleton)
- [ ] Create lib/charts/revenueExpenseConfig.ts (reusable ECharts config)
- [ ] git commit: "Revenue vs Expense chart"

#### 3.2 – Cash Flow Chart
- [ ] Create components/dashboard/charts/CashFlowChart.tsx
  - ECharts bar or waterfall chart
  - Series: Opening Cash, Inflows, Outflows, Net, Closing Cash
  - Responsive sizing
  - Tooltip with formatted values
  - Empty state, loading state
- [ ] git commit: "Cash Flow chart"

#### 3.3 – Additional Charts
- [ ] Create components/dashboard/charts/ExpenseBreakdownChart.tsx (donut)
- [ ] Create components/dashboard/charts/ARAgingChart.tsx (stacked bar)
- [ ] Create components/dashboard/charts/APAgingChart.tsx (stacked bar)
- [ ] All charts: responsive, tooltip, legend, empty/loading states
- [ ] git commit: "Additional charts"

#### 3.4 – Chart Configuration System
- [ ] Create lib/charts/chartConfig.ts
  - centralizecolor palette
  - Font sizes
  - Responsive breakpoints
  - Dark mode detection
  - Currency formatting for tooltip
- [ ] Create lib/charts/theme.ts (light/dark theme configs)
- [ ] git commit: "Chart configuration"

#### 3.5 – Theme Responsiveness
- [ ] Charts detect data-theme attribute
- [ ] Colors update when theme changes
- [ ] Text colors have sufficient contrast in both themes
- [ ] Grid lines visible in both themes
- [ ] Test all charts in light and dark modes
- [ ] git commit: "Theme-responsive charts"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard
# - All 5+ charts visible
# - Hover charts → tooltips appear
# - Click legend → toggle series
# - Toggle date range → charts update
# - Toggle dark mode → charts readable
# - Resize window → charts responsive
```

### Success Criteria
- ✅ 5+ ECharts visualizations created
- ✅ All charts responsive and readable
- ✅ Dark mode compatible
- ✅ Tooltip, legend, zoom/pan working
- ✅ Empty/loading states implemented
- ✅ Currency formatting in tooltips

**Next Phase**: Phase 4 (AR/AP & Cash Flow Widgets)

---

## PHASE 4: AR/AP & CASH FLOW WIDGETS
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 2 ✅, Phase 3 ✅  
**Claude Sessions**: 1  
**Duration**: 3–4 hours  

### Objectives
- Create detailed AR widget with aging breakdown
- Create detailed AP widget with aging breakdown
- Create detailed Cash Flow widget with forecast
- All widgets clickable for drill-down
- Responsive grid placement

### Checklist

#### 4.1 – AR Widget
- [ ] Create components/dashboard/receivables/ARWidget.tsx
  - Total receivables (large number)
  - Aging breakdown: Current, 1–30, 31–60, 61–90, 90+
  - Percentage per aging bucket
  - Collection rate (%)
  - Overdue amount (red badge)
  - Top 5 debtors (mini table)
  - Due this week (alert)
  - Due this month (alert)
  - Click → route to /receivables
- [ ] git commit: "AR widget"

#### 4.2 – AP Widget
- [ ] Create components/dashboard/payables/APWidget.tsx
  - Total payables
  - Aging breakdown
  - Top 5 suppliers
  - Due today (alert)
  - Due this week (alert)
  - Overdue payments (alert with count)
  - Upcoming payments (next 7 days)
  - Click → route to /payables
- [ ] git commit: "AP widget"

#### 4.3 – Cash Flow Widget
- [ ] Create components/dashboard/cash-flow/CashFlowWidget.tsx
  - Opening balance
  - Inflows (positive, green)
  - Outflows (negative, red)
  - Net cash flow
  - Closing balance
  - Cash position trend (mini chart)
  - 30/60/90-day forecast
    - Clearly label "Forecast" vs "Actual"
    - Use different colors/opacity
    - Include confidence interval if applicable
  - Forecast narrative (e.g., "Cash expected to remain positive")
  - Click → route to /cash-flow
- [ ] git commit: "Cash Flow widget"

#### 4.4 – Widget Styling & Layout
- [ ] Each widget: card with shadow, rounded corners
- [ ] Consistent spacing with design system
- [ ] Responsive: full width on mobile, side-by-side on desktop
- [ ] Loading states (skeleton loaders)
- [ ] Error states (friendly message)
- [ ] git commit: "Widget styling"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard
# - AR, AP, CF widgets visible
# - Click AR widget → /receivables route works
# - Click AP widget → /payables route works
# - Hover alerts → tooltips/details visible
# - Forecast clearly distinguished from actuals
```

### Success Criteria
- ✅ Three major widgets created (AR, AP, CF)
- ✅ All data pulled from mock service
- ✅ Click-through routing works
- ✅ Responsive layout
- ✅ Loading/error states

**Next Phase**: Phase 5 (Budget, Profitability, Expenses)

---

## PHASE 5: BUDGET, PROFITABILITY, EXPENSES
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 3 ✅, Phase 4 ✅  
**Claude Sessions**: 1–2  
**Duration**: 4–5 hours  

### Objectives
- Create Budget vs Actual widget
- Create Profitability Analytics section
- Create Expense Analytics section
- All with interactive charts and drill-down

### Checklist

#### 5.1 – Budget vs Actual Widget
- [ ] Create components/dashboard/budget/BudgetWidget.tsx
  - Table with columns: Department, Budget, Actual, Variance, Utilization %
  - Example departments: Operations, Marketing, HR, IT, Admin
  - Variance indicator: ✅ (green), ⚠️ (yellow), ❌ (red)
  - Visual variance bars (over/under budget)
  - Toggle: Monthly / Quarterly / Annual
  - Drill-down: Click department → see sub-departments
  - Click → route to /budget
- [ ] git commit: "Budget widget"

#### 5.2 – Profitability Analytics
- [ ] Create components/dashboard/profitability/ProfitabilityAnalytics.tsx
  - Analysis dimensions (selector): Company, Branch, Department, Product, Customer
  - Table columns: Name, Revenue, Gross Profit, Net Profit, Margin %
  - Ranking (sorted by profit or margin)
  - Interactive chart (bar chart of top 10)
  - Click row → drill-down to that entity
  - Click → route to /profitability
- [ ] git commit: "Profitability analytics"

#### 5.3 – Expense Analytics
- [ ] Create components/dashboard/expenses/ExpenseAnalytics.tsx
  - Total expenses (large card)
  - Expense growth trend (line chart)
  - Expense breakdown by category (donut chart)
  - Department expenses (horizontal bar)
  - Monthly trends (line chart)
  - Top expense categories (ranked table)
  - Drill-down: Click category → filtered transactions (Phase 6)
  - Click → route to /expenses
- [ ] git commit: "Expense analytics"

#### 5.4 – Chart Integration
- [ ] Reuse ECharts configurations from Phase 3
- [ ] Add interactive filtering (e.g., by dimension)
- [ ] All charts responsive
- [ ] Dark mode compatible
- [ ] git commit: "Chart integration"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard
# - Budget widget visible with data
# - Change toggle: Monthly → Quarterly
# - Click department → drill-down
# - Click profitability dimension selector
# - Click expense category → should link to filtered view
# - All responsive
```

### Success Criteria
- ✅ Three major analytics sections created
- ✅ Interactive charts with drill-down
- ✅ Table views with sorting/filtering
- ✅ All responsive
- ✅ Dark mode compatible

**Next Phase**: Phase 6 (Transactions & Alerts)

---

## PHASE 6: TRANSACTIONS & ALERTS
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 2 ✅  
**Claude Sessions**: 1  
**Duration**: 3–4 hours  

### Objectives
- Create professional transaction table (TanStack Table v8)
- Create Financial Alerts panel
- Implement search, sort, filter, export, row details

### Checklist

#### 6.1 – Transactions Table
- [ ] Create components/dashboard/transactions/TransactionsTable.tsx
  - TanStack Table v8 with columns:
    - Date
    - Reference
    - Description
    - Account
    - Category
    - Type (Debit/Credit)
    - Amount (formatted currency)
    - Currency
    - Status (draft/posted/reconciled)
  - Features:
    - Search (across all text columns)
    - Sort (all columns)
    - Filter (status, type, category, account, date range)
    - Pagination (10/25/50 rows per page)
    - Column visibility toggle
    - Column resizing (dnd-kit)
    - Row selection (checkboxes)
    - Export: CSV, PDF, Excel
    - Click row → details drawer
  - Virtualization for large datasets (1000+ rows)
  - Loading skeleton
  - Empty state
- [ ] Create components/dashboard/transactions/TransactionDetailsDrawer.tsx
  - Full transaction details on drawer slide-out
  - Related entries (if double-entry)
  - Audit trail (created by, approved by, timestamps)
  - Attachment links
  - Actions: Edit, Reverse, Post (mock buttons)
- [ ] git commit: "Transactions table"

#### 6.2 – Financial Alerts
- [ ] Create components/dashboard/alerts/AlertsPanel.tsx
  - Alert list with severity badges:
    - Critical (red): Cash balance below threshold, etc.
    - Warning (yellow): Approaching limits, budget overages
    - Attention (blue): Overdue invoices, reconciliation needed
    - Information (gray): Reports ready, synced, etc.
  - Each alert: severity, icon, title, description, timestamp, action
  - Read/unread state (indicator)
  - Mark as read/unread
  - Dismiss/archive alert
  - Click alert → navigate to related entity (e.g., AR, budget)
  - Mock 8–10 alerts with realistic content
- [ ] Create lib/alerts/alertGenerator.ts (mock alert generation)
- [ ] git commit: "Alerts panel"

#### 6.3 – Export Functionality
- [ ] Create lib/export/csvExport.ts (table to CSV)
- [ ] Create lib/export/excelExport.ts (table to Excel, formatted)
- [ ] Create lib/export/pdfExport.ts (table to PDF)
- [ ] Export functions take TanStack Table data
- [ ] Format: proper headers, currency symbols, alignment
- [ ] git commit: "Export functionality"

#### 6.4 – Dashboard Integration
- [ ] Add Alerts panel to dashboard (Phase 2)
- [ ] Add Transactions widget to dashboard
- [ ] Both pull from mock service
- [ ] Both responsive
- [ ] git commit: "Dashboard widgets integration"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard
# - Transactions table visible
# - Search transactions
# - Filter by status
# - Sort by amount
# - Click row → details drawer
# - Export CSV/Excel
# - Alerts visible
# - Click alert → navigate
```

### Success Criteria
- ✅ Transaction table fully functional
- ✅ All TanStack Table features working
- ✅ Alerts panel working
- ✅ Export working
- ✅ Responsive layout
- ✅ Dark mode compatible

**Next Phase**: Phase 7 (Dashboard Customization)

---

## PHASE 7: DASHBOARD CUSTOMIZATION
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 2 ✅, Phase 6 ✅  
**Claude Sessions**: 1  
**Duration**: 2–3 hours  

### Objectives
- Implement full dashboard customization
- Add/remove widgets
- Reorder widgets (drag-drop)
- Resize widgets
- Save custom layouts
- Multiple layout profiles

### Checklist

#### 7.1 – Customization Framework
- [ ] Create lib/hooks/useDashboardCustomization.ts
  - Zustand store for widget state
  - Widgets: visible/hidden, order, size (grid spans 1–4)
  - Persist to localStorage
  - Profiles: "Default", "CFO View", "Accountant View", custom
- [ ] Create components/dashboard/CustomizeModal.tsx
  - Modal triggered by "Customize Dashboard" button
  - Widget gallery (all available widgets)
  - Toggle widget visibility (checkbox list)
  - Current widget order visualization
  - Drag-drop to reorder
  - Reset to default button
  - Save layout button
  - Load profile selector
- [ ] git commit: "Customization framework"

#### 7.2 – Drag-Drop Widget Management
- [ ] Use dnd-kit for drag-drop
- [ ] widgets reorderable via drag handle
- [ ] Resize widgets: grid span selector (1/2/3/4 columns)
- [ ] Drag-drop handles visible in customize mode
- [ ] Real-time preview as user drags
- [ ] Smooth animations
- [ ] git commit: "Drag-drop integration"

#### 7.3 – Layout Profiles
- [ ] Create predefined profiles:
  - "Default": All widgets visible
  - "CFO": Revenue, Profit, Cash, AR, AP, Budget, AI Insights
  - "Accountant": Transactions, AR, AP, Cash, Alerts
  - "Finance Manager": Revenue, Expenses, AR, AP, Budget, Transactions
- [ ] Users can save custom profiles
- [ ] Profile selector in header or settings
- [ ] Load profile → update widget visibility/order
- [ ] git commit: "Layout profiles"

#### 7.4 – Persistence
- [ ] Save layout to localStorage as JSON
- [ ] Load layout on page refresh
- [ ] Save layout on each change (debounced)
- [ ] Handle migration if widget schema changes
- [ ] git commit: "Persistence layer"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Click "Customize Dashboard"
# - Modal opens with widget gallery
# - Toggle widget visibility
# - Drag widgets to reorder
# - Resize widget (change grid span)
# - Click "Save"
# - Refresh page → layout persisted
# - Load profile → widgets change
```

### Success Criteria
- ✅ Customization modal fully functional
- ✅ Drag-drop reordering works
- ✅ Resize working
- ✅ Profiles working
- ✅ Persistence working
- ✅ Smooth animations

**Next Phase**: Phase 8 (AI Insights & Assistant)

---

## PHASE 8: AI INSIGHTS & ASSISTANT
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅  
**Claude Sessions**: 1  
**Duration**: 2–3 hours  

### Objectives
- Create AI Insights widget (UI only, mock insights)
- Create AI Finance Assistant chatbot (UI only, mock responses)
- Structure for future real AI API integration

### Checklist

#### 8.1 – AI Insights Widget
- [ ] Create components/dashboard/ai-insights/AIInsightsWidget.tsx
  - Insight card component:
    - Generated text (e.g., "Revenue increased 12.4%")
    - Confidence score (0–100%)
    - Category badge (revenue/expenses/cashflow/profitability)
    - Timestamp
    - "Explain" button → tooltip with more detail
    - "View Details" button → navigate to related view
    - "Compare" button → comparison view
    - Dismiss button
  - Default mock insights (6–8 cards):
    - "Revenue increased 12.4% compared with last month"
    - "The Dubai branch contributed 43% of total revenue"
    - "Operating expenses increased 8.7%, primarily payroll"
    - "Cash flow is expected to remain positive 90 days"
    - "AR collection rate improved to 94%"
    - "AP aging indicates 3 overdue invoices"
  - Confidence varies (80–99%)
  - Refreshable (button to generate new insights)
- [ ] git commit: "AI Insights widget"

#### 8.2 – AI Finance Assistant
- [ ] Create components/dashboard/ai-assistant/AIAssistant.tsx
  - Polished chat interface (side panel or modal)
  - Chat history
  - Input field with send button
  - Mock responses for example queries:
    - "How is the company performing?" → Revenue/profit summary
    - "Why did expenses increase?" → Top expense drivers
    - "Which branch is most profitable?" → Branch ranking
    - "Show overdue receivables" → List of overdue customers
    - "Compare this month with last month" → Period comparison
    - "What is my cash position?" → Cash summary
    - "Are we on budget?" → Budget vs actual summary
  - Response latency simulation (500ms delay)
  - Thinking indicator while "processing"
  - Cite source (e.g., "Based on AR data, updated 2 hours ago")
  - Suggestion buttons (quick prompts for common questions)
- [ ] Create lib/ai/mockAIResponses.ts (response templates)
- [ ] git commit: "AI Assistant component"

#### 8.3 – UI Accessibility
- [ ] Both widgets easily accessible from dashboard
- [ ] AI Assistant trigger button (chat icon in header)
- [ ] Keyboard navigation (Cmd+K for assistant, or button)
- [ ] Responsive on mobile (drawer or modal)
- [ ] Dark mode compatible
- [ ] git commit: "AI UI accessibility"

#### 8.4 – API Integration Abstraction
- [ ] Create lib/ai/aiService.ts (IAIService interface)
  - generateInsights() method
  - askQuestion() method
- [ ] Create MockAIService (uses mock responses)
- [ ] Create APIAIService (stub for real API)
- [ ] Singleton that switches based on env var
- [ ] Structure ready for real AI API (OpenAI, Claude, etc.)
- [ ] git commit: "AI service abstraction"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard
# - AI Insights widget visible
# - Click "Explain" → tooltip
# - Click "View Details" → navigate
# - Click AI Assistant button (header)
# - Chat interface opens
# - Type question
# - Mock response appears
# - Suggestion buttons work
```

### Success Criteria
- ✅ AI Insights widget displaying mock insights
- ✅ AI Assistant chatbot working with mock responses
- ✅ Service abstraction ready for real API
- ✅ Responsive and accessible
- ✅ Dark mode compatible

**Next Phase**: Phase 9 (Role-Based Dashboards)

---

## PHASE 9: ROLE-BASED DASHBOARDS
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 8 ✅  
**Claude Sessions**: 0.5  
**Duration**: 1–2 hours  

### Objectives
- Implement role-based dashboard configurations
- Create role selector (for demo)
- Dynamically show/hide widgets based on role

### Checklist

#### 9.1 – Role Definitions
- [ ] Create lib/permissions/roles.ts
  - Define roles: CFO, Finance Manager, Accountant, Management
  - Each role has widgets array (which widgets to show)
  - CFO: Revenue, Profit, CF, Forecast, AR, AP, Budget, Profitability, AI Insights
  - Finance Manager: Revenue, Expenses, AR, AP, Budget, Transactions, Alerts
  - Accountant: Transactions, AR, AP, Cash, Reconciliation (mock), Alerts
  - Management: Revenue, Profit, Cash, Branch Performance, AI Insights
- [ ] git commit: "Role definitions"

#### 9.2 – Role Selector (Mock)
- [ ] Create components/dashboard/RoleSelector.tsx
  - Dropdown/selector in header (for demo)
  - Shows current role
  - Allow switching roles
  - Persist selection to Zustand + localStorage
- [ ] Add to header navigation
- [ ] git commit: "Role selector"

#### 9.3 – Dynamic Widget Rendering
- [ ] Update DashboardGrid to check role
- [ ] Only render widgets in role's widget array
- [ ] Smooth transition when switching roles (widgets fade/slide)
- [ ] Maintain custom layout for each role
- [ ] git commit: "Dynamic widget rendering"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load dashboard with default role
# - Select different role from selector
# - Dashboard updates to show role-specific widgets
# - Switch back → original layout restored
# - Refresh page → role selection persisted
```

### Success Criteria
- ✅ Role definitions created
- ✅ Role selector working
- ✅ Dashboard dynamically updates based on role
- ✅ Layout persisted per role

**Next Phase**: Phase 10 (Internationalization & RTL)

---

## PHASE 10: INTERNATIONALIZATION & RTL
**Status**: 🟡 QUEUED  
**Depends On**: Phase 0 ✅, Phase 1 ✅  
**Claude Sessions**: 1  
**Duration**: 2–3 hours  

### Objectives
- Setup i18n (English + Arabic)
- RTL layout support for Arabic
- Multiple date/number/currency formats
- Test both languages fully

### Checklist

#### 10.1 – i18n Setup
- [ ] Install next-intl or similar
- [ ] Create localization files:
  - messages/en.json (English)
  - messages/ar.json (Arabic)
  - Include all UI strings (labels, placeholders, alerts, etc.)
- [ ] Setup i18n middleware
- [ ] Route structure: /en/dashboard, /ar/dashboard
- [ ] Create hooks/useTranslation.ts wrapper
- [ ] git commit: "i18n setup"

#### 10.2 – RTL Layout
- [ ] Update Tailwind config for RTL
- [ ] CSS grid/flexbox FlexDirection switches for RTL
- [ ] Sidebar position (left ↔ right)
- [ ] Text alignment (left ↔ right)
- [ ] Spacing mirrored (ml → mr, etc.)
- [ ] Icons (some flip for RTL)
- [ ] Test all pages in RTL
- [ ] git commit: "RTL layout"

#### 10.3 – Localization Data
- [ ] Create lib/localization/currencies.ts (currency symbols per locale)
- [ ] Create lib/localization/dateFormats.ts (date format per locale)
- [ ] Create lib/localization/numberFormats.ts (number separators per locale)
- [ ] Update formatters to use locale-specific formats
- [ ] Test AED in Arabic (١٢٣٬٤٥٦.٩٨)
- [ ] git commit: "Localization data"

#### 10.4 – Language Switcher
- [ ] Add language selector to header (EN/AR toggle)
- [ ] Clicking toggles language
- [ ] Redirects to localized route
- [ ] Persist language selection
- [ ] All content updates immediately
- [ ] git commit: "Language switcher"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Load /en/dashboard
# - All UI in English
# - Click language switcher
# - Redirect to /ar/dashboard
# - All UI in Arabic
# - Layout RTL
# - Sidebar on right
# - Refresh → language persisted
# - Test currencies: AED (AR format), USD (EN format)
```

### Success Criteria
- ✅ i18n infrastructure working
- ✅ English content complete
- ✅ Arabic content complete
- ✅ RTL layout correct
- ✅ Language switcher working
- ✅ Localization formatters working

**Next Phase**: Phase 11 (Responsive Optimization)

---

## PHASE 11: RESPONSIVE OPTIMIZATION
**Status**: 🟡 QUEUED  
**Depends On**: All prior phases ✅  
**Claude Sessions**: 0.5  
**Duration**: 1–2 hours  

### Objectives
- Optimize responsive design for all breakpoints
- Mobile-first adjustments
- Touch-friendly interface
- Performance optimization for mobile

### Checklist

#### 11.1 – Mobile Breakpoints
- [ ] Test at 320px (mobile), 480px (tablet), 768px (tablet), 1024px (desktop), 1920px (wide)
- [ ] Sidebar: visible (desktop) → collapse (tablet) → slide-out (mobile)
- [ ] Header filters: wrap on mobile
- [ ] Charts: maintain readability on mobile
- [ ] Tables: horizontal scroll OR card/list view on mobile
- [ ] KPI cards: stack single column on mobile
- [ ] modals/drawers: fullscreen on mobile
- [ ] git commit: "Mobile optimization"

#### 11.2 – Touch-Friendly Sizes
- [ ] Buttons: min 44px × 44px tap target
- [ ] Icons: min 24px × 24px
- [ ] Form inputs: min 44px height
- [ ] Spacing: touch-friendly on mobile
- [ ] Remove hover-only interactions (use tap + visual feedback)
- [ ] git commit: "Touch-friendly sizing"

#### 11.3 – Mobile Navigation
- [ ] Sidebar → slide-out drawer on mobile
- [ ] OR: Bottom navigation bar
- [ ] Hamburger menu toggle
- [ ] Back button for nested navigation
- [ ] Clear visual hierarchy
- [ ] git commit: "Mobile navigation"

#### 11.4 – Performance Optimization
- [ ] Code-split heavy routes (lazy load)
- [ ] Image optimization (if any images added)
- [ ] Web Vitals monitoring
- [ ] Lighthouse audit targeting 90+ score
- [ ] git commit: "Performance optimization"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Simulate 320px, 480px, 768px, 1024px, 1920px
# - All layouts responsive
# - Touch targets adequate
# - No horizontal scroll (except for tables)
# - Charts readable at all sizes
# - Run Lighthouse: target 90+ score
```

### Success Criteria
- ✅ Fully responsive at all breakpoints
- ✅ Touch-friendly interface
- ✅ Mobile navigation working
- ✅ Lighthouse score 90+

**Next Phase**: Phase 12 (Accessibility & Performance)

---

## PHASE 12: ACCESSIBILITY & PERFORMANCE
**Status**: 🟡 QUEUED  
**Depends On**: All prior phases ✅  
**Claude Sessions**: 1  
**Duration**: 2–3 hours  

### Objectives
- WCAG 2.2 compliance
- Keyboard navigation
- Screen reader friendly
- Performance optimization

### Checklist

#### 12.1 – Accessibility
- [ ] WCAG 2.2 Level AA compliance
- [ ] Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [ ] Focus visible at all times (outline/highlight)
- [ ] Semantic HTML (headings, lists, buttons, etc.)
- [ ] ARIA labels on interactive elements
- [ ] ARIA live regions for alerts/updates
- [ ] Color not sole indicator of status (use icons/text)
- [ ] Contrast ratio 4.5:1 for text (7:1 for large text)
- [ ] Reduced motion support (disable animations if prefers-reduced-motion)
- [ ] Screen reader testing (NVDA, JAWS if available)
- [ ] Form labels associated with inputs
- [ ] Error messages clear and accessible
- [ ] git commit: "Accessibility improvements"

#### 12.2 – Performance
- [ ] Lazy-load heavy charts (TanStack Query + Suspense)
- [ ] Code splitting on routes (dynamic imports)
- [ ] Memoize expensive calculations (useMemo)
- [ ] Optimize re-renders (useCallback, React.memo)
- [ ] Efficient TanStack Query caching strategy
- [ ] Lighthouse audit: target 95+ performance score
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] git commit: "Performance hardening"

#### 12.3 – Error Handling & Resilience
- [ ] All error states have user-friendly messages
- [ ] Fallback UI for failed data loads
- [ ] Retry logic for failed queries
- [ ] Service worker for offline support (optional, Phase 13+)
- [ ] Error logging (Sentry integration, mock)
- [ ] git commit: "Error handling"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run build         # ✅ Success
# Manual test:
# - Keyboard navigation: Tab through all interactive elements
# - Screen reader: Read dashboard content
# - Check contrast: axe, Lighthouse
# - Disable animations: system prefers-reduced-motion
# - Lighthouse audit: Performance > 95, Accessibility > 95
# - Check Core Web Vitals
```

### Success Criteria
- ✅ WCAG 2.2 Level AA compliant
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Lighthouse Accessibility > 95
- ✅ Lighthouse Performance > 95
- ✅ Core Web Vitals passing

**Next Phase**: Phase 13 (Testing & QA)

---

## PHASE 13: TESTING & QA
**Status**: 🟡 QUEUED  
**Depends On**: All prior phases ✅  
**Claude Sessions**: 1  
**Duration**: 3–4 hours  

### Objectives
- Comprehensive unit, component, and E2E tests
- Test major user flows
- Ensure CI/CD readiness
- Document testing strategy

### Checklist

#### 13.1 – Unit Tests
- [ ] Test utilities: formatCurrency, formatDate, calculateMargin, etc.
- [ ] Test calculations: ratios, aging buckets, etc.
- [ ] Test mock data generation (consistency)
- [ ] Jest configuration
- [ ] Coverage target: > 70%
- [ ] git commit: "Unit tests"

#### 13.2 – Component Tests
- [ ] Test KPI card rendering, props, interactions
- [ ] Test chart rendering and responsiveness
- [ ] Test filter interactions
- [ ] Test role-based widget visibility
- [ ] Test dark mode toggle
- [ ] Test language switcher
- [ ] React Testing Library
- [ ] Coverage target: > 60% for critical components
- [ ] git commit: "Component tests"

#### 13.3 – E2E Tests (Playwright)
- [ ] 14 major user flow tests:
  1. Load dashboard, verify KPIs visible
  2. Change date range, verify charts update
  3. Change company selector, verify data updates
  4. Change currency, verify formatting
  5. Filter transactions table, search and export
  6. Open transaction details drawer
  7. Customize dashboard (add/remove widget)
  8. Reorder widgets via drag-drop
  9. Hide widget
  10. Restore dashboard to default
  11. Switch dark mode, verify UI updates
  12. Switch role, verify widgets change
  13. Open AI Assistant, ask question, receive response
  14. Global search (Cmd+K), navigate result
- [ ] Playwright configuration (headless + headed)
- [ ] git commit: "E2E tests"

#### 13.4 – Test Infrastructure
- [ ] Jest config (jsconfig, testEnvironment)
- [ ] Playwright config (timeout, browsers)
- [ ] GitHub Actions CI/CD (run tests on push)
- [ ] Coverage reports
- [ ] Test database/mock data setup
- [ ] git commit: "Test infrastructure"

#### 13.5 – QA Documentation
- [ ] TEST.md guide (how to run tests locally)
- [ ] Test coverage report
- [ ] Known limitations / test gaps
- [ ] Manual testing checklist
- [ ] Browser compatibility list (Chrome, Safari, Firefox, Edge)
- [ ] git commit: "Test documentation"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm test              # ✅ All tests pass
npm run test:e2e      # ✅ All E2E tests pass
npm run build         # ✅ Production build success
# Coverage report: > 70% for utils, > 60% for components
```

### Success Criteria
- ✅ Unit tests: > 70% coverage (utilities)
- ✅ Component tests: > 60% coverage (critical components)
- ✅ E2E tests: 14 major flows tested and passing
- ✅ CI/CD pipeline configured
- ✅ All tests green on main branch

**Next Phase**: Phase 14 (Final Polish & Deployment)

---

## PHASE 14: FINAL POLISH & DEPLOYMENT
**Status**: 🟡 QUEUED  
**Depends On**: All prior phases ✅, Phase 13 ✅  
**Claude Sessions**: 1  
**Duration**: 2–3 hours  

### Objectives
- Final QA pass
- UI consistency review
- Documentation completion
- Production deployment readiness

### Checklist

#### 14.1 – Final QA
- [ ] TypeScript: `npm run type-check` ✅ Zero errors
- [ ] Lint: `npm run lint` ✅ Zero errors
- [ ] Tests: `npm test` ✅ All pass
- [ ] Build: `npm run build` ✅ Success
- [ ] Lighthouse: All scores > 90
- [ ] Accessibility: axe-core scan zero violations
- [ ] Responsive: Tested at 320px, 768px, 1024px, 1920px
- [ ] Dark mode: All components verified
- [ ] Light mode: All components verified
- [ ] i18n: English & Arabic fully functional
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Chrome Android
- [ ] git commit: "Final QA pass"

#### 14.2 – UI Consistency Review
- [ ] All cards have consistent shadows/radius
- [ ] Spacing consistent throughout (8px grid)
- [ ] Typography hierarchy correct (h1, h2, h3, body, small)
- [ ] Colors match design system
- [ ] Buttons consistent (primary, secondary, danger)
- [ ] Hover/active states consistent
- [ ] Loading states consistent (skeleton format)
- [ ] Error states consistent (icon + message)
- [ ] Empty states professional and on-brand
- [ ] git commit: "UI consistency verification"

#### 14.3 – Documentation Completion
- [ ] README.md: comprehensive, up-to-date
- [ ] DEVELOPMENT.md: dev workflow, commands
- [ ] TESTING.md: test running, coverage
- [ ] ARCHITECTURE.md: design decisions, data flow
- [ ] DEPLOYMENT.md: VPS setup, PM2, monitoring
- [ ] CHANGELOG.md: version history
- [ ] API_INTEGRATION.md: how to connect real API
- [ ] git commit: "Documentation completion"

#### 14.4 – Production Deployment
- [ ] VPS directory ready: /opt/accounts-dashboard
- [ ] PM2 ecosystem.config.cjs configured (port 3115)
- [ ] .env.production configured
- [ ] deploy.sh executable and tested
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] GitHub SSH key setup
- [ ] First deploy via deploy.sh
- [ ] Verify running: curl localhost:3115
- [ ] Monitor: PM2 logs
- [ ] git commit: "Production deployment ready"

#### 14.5 – Monitoring & Maintenance
- [ ] PM2 configured with crash protection
- [ ] Error logging setup (console.error + logging strategy)
- [ ] Performance monitoring baseline (Lighthouse scores)
- [ ] Monitoring checklist for ongoing maintenance
- [ ] git commit: "Monitoring setup"

### Verification
```bash
npm run lint          # ✅ Zero errors
npm run type-check    # ✅ Zero errors
npm run test          # ✅ All pass
npm run test:e2e      # ✅ All pass
npm run build         # ✅ Success
# Manual verification:
# - All UI consistent
# - All responsive
# - All accessible
# - All dark mode
# - All i18n
# Deploy to VPS:
bash /opt/accounts-dashboard/deploy.sh
# Verify running:
curl https://accounts-dashboard.ddotsmedia.com
```

### Success Criteria
- ✅ All tests passing
- ✅ All linting passing
- ✅ All TypeScript passing
- ✅ All Lighthouse scores > 90
- ✅ UI consistency verified
- ✅ Documentation complete
- ✅ Deployed to VPS successfully
- ✅ Running in PM2 (accounts-web)
- ✅ Accessible via domain

---

## SUMMARY

| Phase | Name | Status | Sessions |
|-------|------|--------|----------|
| 0 | Foundation | 🟡 | 1–2 |
| 1 | App Shell | 🟡 | 1 |
| 2 | Dashboard Grid | 🟡 | 1–2 |
| 3 | Charts | 🟡 | 1–2 |
| 4 | AR/AP/CF | 🟡 | 1 |
| 5 | Budget/Prof/Exp | 🟡 | 1–2 |
| 6 | Transactions | 🟡 | 1 |
| 7 | Customization | 🟡 | 1 |
| 8 | AI Insights | 🟡 | 1 |
| 9 | Role-Based | 🟡 | 0.5 |
| 10 | i18n & RTL | 🟡 | 1 |
| 11 | Responsive | 🟡 | 0.5 |
| 12 | Accessibility | 🟡 | 1 |
| 13 | Testing | 🟡 | 1 |
| 14 | Polish & Deploy | 🟡 | 1 |

**Total**: 14 Phases, 12–14 Claude Code sessions, 4–6 weeks (3 sessions/week)

---

## NEXT STEP

**Ready to begin Phase 0 via Claude Code.**

Execute first Claude Code session with prompt from ACCOUNTS-DASHBOARD-EXECUTION.md (Session 1).

Should I proceed? 🚀

---

**Last Updated**: 2024-08-19  
**Project Owner**: Ddotsmedia Technologies  
**Repository**: ddotsmedia/accounts-dashboard
