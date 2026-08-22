# ACCOUNTS DASHBOARD — INTEGRATED EXECUTION FRAMEWORK

## PROJECT SETUP

**Project Name**: Accounts Dashboard  
**Domain**: `accounts-dashboard.ddotsmedia.com`  
**VPS Port**: 3115  
**Repository**: `ddotsmedia/accounts-dashboard` (GitHub SSH)  
**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind 4.0 + shadcn/ui + TanStack Query/Table + ECharts  
**Database**: PostgreSQL (5439), Redis (6391) — *Phase 2+*  
**PM2 ID**: XX (to assign)  
**Deployment**: deploy.sh (git pull → build → pm2 restart)

---

## PHASE ROADMAP (Aligned with UI Spec + Strategic Plan)

### **PHASE 0: FOUNDATION & DESIGN SYSTEM** ✅ STEP 1
**Objective**: Initialize Next.js, design system, component library, mock data layer  
**Duration**: 1–2 Claude Code sessions  
**Status**: READY TO START

#### 0.1 – Project Initialization
- [ ] `create-next-app` with:
  - TypeScript strict mode
  - App Router
  - Tailwind 4.0
  - ESLint configured
- [ ] Remove boilerplate, keep clean structure
- [ ] Install core dependencies:
  ```json
  {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "typescript": "^5.x",
    "tailwindcss": "^4.0.0",
    "shadcn-ui": "latest",
    "echarts": "^5.x",
    "recharts": "^2.x",
    "@tanstack/react-query": "^5.x",
    "@tanstack/react-table": "^8.x",
    "zod": "^3.x",
    "react-hook-form": "^7.x",
    "zustand": "^4.x",
    "date-fns": "^3.x",
    "@dnd-kit/core": "^6.x",
    "lucide-react": "latest"
  }
  ```

#### 0.2 – Folder Structure
```
apps/
  web/
    app/
      layout.tsx
      page.tsx
      dashboard/
      analytics/
      transactions/
      receivables/
      payables/
      cash-flow/
      budget/
      profitability/
      reports/
      ai-insights/
      settings/
    
    components/
      dashboard/
        kpi/
          KPICard.tsx
          KPISummary.tsx
        charts/
          RevenueExpenseChart.tsx
          CashFlowChart.tsx
          ARAgingChart.tsx
          APAgingChart.tsx
          ExpenseBreakdown.tsx
          ProfitabilityChart.tsx
        cash-flow/
        receivables/
        payables/
        profitability/
        budget/
        transactions/
        alerts/
        ai-insights/
        navigation/
          MainLayout.tsx
          Sidebar.tsx
          Header.tsx
        filters/
        tables/
        widgets/
        ui/
      
    lib/
      api/
        dashboardService.ts
        mockDataService.ts
      charts/
        chartConfig.ts
        formatters.ts
      formatting/
        currency.ts
        numbers.ts
        dates.ts
      dashboard/
        calculations.ts
        ratios.ts
      permissions/
        rbac.ts
      utils/
    
    data/
      mock/
        dashboardData.ts
        transactions.ts
        receivables.ts
        payables.ts
        budgets.ts
        alerts.ts
    
    types/
      dashboard.ts
      financial.ts
      user.ts
      api.ts
    
    config/
      constants.ts
      features.ts
    
    hooks/
      useFinancialData.ts
      useCurrency.ts
      useDateRange.ts
      useDashboardCustomization.ts
    
    styles/
      globals.css
      variables.css
    
    tests/
      unit/
      components/
      e2e/
    
    .env.local (git ignored)
    tsconfig.json
    tailwind.config.ts
    next.config.js
    jest.config.js
    README.md
```

#### 0.3 – TypeScript Type Definitions
Create core type interfaces:
```typescript
// types/dashboard.ts
export interface DashboardSummary {
  totalRevenue: number;
  totalExpenses: number;
  grossProfit: number;
  netProfit: number;
  cashBalance: number;
  accountsReceivable: number;
  accountsPayable: number;
  currency: string;
}

export interface KPIMetric {
  label: string;
  value: number;
  currency: string;
  change: number;
  changePercent: number;
  comparisonPeriod: string;
  trend: 'up' | 'down' | 'flat';
  target?: number;
  sparklineData: number[];
}

export interface Transaction {
  id: string;
  date: Date;
  reference: string;
  description: string;
  account: string;
  category: string;
  type: 'debit' | 'credit';
  amount: number;
  currency: string;
  status: 'draft' | 'posted' | 'reconciled';
}

export interface ReceivableMetric {
  total: number;
  current: number;
  days1to30: number;
  days31to60: number;
  days61to90: number;
  days90plus: number;
  collectionRate: number;
  overdueAmount: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  action?: string;
}

export interface AIInsight {
  id: string;
  text: string;
  confidence: number;
  category: 'revenue' | 'expenses' | 'cashflow' | 'profitability';
  details?: Record<string, unknown>;
}

// More in types/financial.ts, types/user.ts, etc.
```

#### 0.4 – Design System & Theme
- [ ] Create Tailwind configuration with:
  - Semantic color palette (professional, not flashy)
  - Typography scale
  - Spacing system
  - Shadow system
  - Border radius tokens
- [ ] Light & dark theme CSS variables
- [ ] shadcn/ui component customization
- [ ] Custom component variants

```css
/* styles/variables.css - CSS variables for theming */
:root {
  /* Semantic Colors */
  --color-success: rgb(34 197 94);
  --color-warning: rgb(202 138 4);
  --color-error: rgb(239 68 68);
  --color-info: rgb(59 130 246);
  
  /* Financial Status */
  --color-revenue: rgb(16 185 129);
  --color-expense: rgb(249 115 22);
  --color-profit: rgb(99 102 241);
  
  /* Semantic Neutral */
  --color-text-primary: rgb(15 23 42);
  --color-text-secondary: rgb(100 116 139);
  --color-border: rgb(226 232 240);
  --color-bg: rgb(255 255 255);
}

[data-theme="dark"] {
  --color-text-primary: rgb(241 245 250);
  --color-text-secondary: rgb(148 163 184);
  --color-border: rgb(30 41 59);
  --color-bg: rgb(15 23 42);
}
```

#### 0.5 – Mock Data Architecture
- [ ] Create `data/mock/dashboardData.ts` with consistent financial relationships
- [ ] Generate 12+ months of historical data
- [ ] Create utility functions for data manipulation
- [ ] Export single source of truth for all mock data

```typescript
// data/mock/dashboardData.ts
export const mockDashboardData: DashboardSummary = {
  totalRevenue: 2845620,
  totalExpenses: 1284320,
  grossProfit: 1561300,
  netProfit: 1234540,
  cashBalance: 456789,
  accountsReceivable: 456200,
  accountsPayable: 234567,
  currency: 'AED'
};

export const generateMockChartData = (months: number = 12) => {
  // Generate realistic data with logical relationships
};
```

#### 0.6 – Data Service Layer
Create abstraction for future API integration:
```typescript
// lib/api/dashboardService.ts
export interface IDashboardService {
  getDashboardSummary(filters: DashboardFilters): Promise<DashboardSummary>;
  getTransactions(filters: TransactionFilters): Promise<Transaction[]>;
  getReceivables(filters: ARFilters): Promise<ReceivableMetric>;
  // etc.
}

export class MockDashboardService implements IDashboardService {
  async getDashboardSummary(filters: DashboardFilters) {
    return mockDashboardData;
  }
  // Implementation uses mock data
}

export class APIDashboardService implements IDashboardService {
  async getDashboardSummary(filters: DashboardFilters) {
    // Call real API endpoint
    const response = await fetch('/api/dashboard/summary', {
      method: 'POST',
      body: JSON.stringify(filters)
    });
    return response.json();
  }
}

// Singleton: switch between mock and real based on env
export const dashboardService = process.env.NEXT_PUBLIC_USE_MOCK_DATA
  ? new MockDashboardService()
  : new APIDashboardService();
```

#### 0.7 – Utilities & Formatters
```typescript
// lib/formatting/currency.ts
export const formatCurrency = (
  value: number,
  currency: string = 'AED',
  locale: string = 'en-AE'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString('en-AE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
```

#### 0.8 – Reusable Hooks
```typescript
// hooks/useFinancialData.ts
export const useFinancialData = (filters: DashboardFilters) => {
  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: () => dashboardService.getDashboardSummary(filters),
  });
};

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfDay(new Date()),
  });
  
  return { dateRange, setDateRange };
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState('AED');
  return { currency, setCurrency };
};
```

#### 0.9 – README & Documentation
Create comprehensive README with:
- Project overview
- Architecture explanation
- Installation steps
- Mock data structure
- Adding new widgets (template)
- Connecting real API (guide)
- Environment variables

**Deliverable**: Clean, typed, modular Next.js project ready for UI implementation.

---

### **PHASE 1: APPLICATION SHELL & NAVIGATION** ✅ STEP 2
**Duration**: 1 session

#### 1.1 – Main Layout Component
- [ ] `components/navigation/MainLayout.tsx`
  - Sidebar + main content + optional right panel
  - Responsive behavior (collapse on mobile)
  - Persist sidebar state to localStorage

#### 1.2 – Sidebar Navigation
- [ ] Navigation structure with icons
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
- [ ] Collapse/expand toggle
- [ ] Logo section

#### 1.3 – Header
- [ ] Company selector (dropdown)
- [ ] Branch selector (dropdown)
- [ ] Date range selector (with presets: Today, This Month, This Quarter, YTD, Custom)
- [ ] Comparison selector (None, Previous Period, Previous Year)
- [ ] Currency selector
- [ ] Global search (Ctrl/Cmd + K)
- [ ] Notifications icon + badge
- [ ] Theme switcher (light/dark/system)
- [ ] User profile menu

#### 1.4 – Responsive Behavior
- [ ] Desktop: Full sidebar visible
- [ ] Tablet: Collapsible sidebar
- [ ] Mobile: Bottom navigation or slide-out menu

**Deliverable**: Fully functional navigation shell with all filter states managed via Zustand.

---

### **PHASE 2: DASHBOARD GRID & KPI CARDS** ✅ STEP 3
**Duration**: 1–2 sessions

#### 2.1 – Dashboard Grid Layout
- [ ] Responsive grid (desktop: 4 columns, tablet: 2, mobile: 1)
- [ ] Widget customization framework (add/remove/resize/reorder)
- [ ] Draggable widget system (using dnd-kit)
- [ ] "Customize Dashboard" button

#### 2.2 – KPI Cards
Create professional KPI cards for:
1. Total Revenue
2. Total Expenses
3. Gross Profit
4. Net Profit
5. Cash & Bank
6. Accounts Receivable
7. Accounts Payable
8. Outstanding Invoices

Each card includes:
- Label
- Current value
- Currency symbol
- Percentage change (with color: green ↑, red ↓)
- Comparison period
- Sparkline mini-chart
- Hover effects
- Click → navigate to detailed view

**Deliverable**: 8 reusable KPI card components, responsive grid layout.

---

### **PHASE 3: FINANCIAL CHARTS** ✅ STEP 4
**Duration**: 1–2 sessions

#### 3.1 – Revenue vs Expense Chart
Large ECharts visualization:
- X-axis: dates (daily/weekly/monthly)
- Y-axis: amounts
- Series: Revenue (green), Expenses (orange), Gross Profit (blue)
- Features:
  - Tooltip on hover
  - Legend toggles
  - Responsive
  - Loading state
  - Empty state

#### 3.2 – Cash Flow Chart
ECharts bar/waterfall chart:
- Opening cash
- Cash inflow (positive)
- Cash outflow (negative)
- Net cash flow
- Closing cash

#### 3.3 – Additional Charts
- Expense breakdown (pie/donut)
- AR aging (stacked bar)
- AP aging (stacked bar)

**Deliverable**: Reusable ECharts configuration, responsive chart components.

---

### **PHASE 4: AR/AP & CASH FLOW WIDGETS** ✅ STEP 5
**Duration**: 1 session

#### 4.1 – AR Widget
- Total receivables
- Aging breakdown (Current, 1–30, 31–60, 61–90, 90+)
- Collection rate
- Overdue amount
- Top debtors table
- Due this week / due this month badges

#### 4.2 – AP Widget
- Total payables
- Aging breakdown
- Top suppliers
- Upcoming payments
- Overdue payments
- Due today badge

#### 4.3 – Cash Flow Widget
- Opening balance
- Inflows / Outflows
- Net cash
- 30/60/90-day forecast (clearly marked as forecast)

**Deliverable**: Three major widgets, click-through to detailed views.

---

### **PHASE 5: BUDGET, PROFITABILITY, EXPENSES** ✅ STEP 6
**Duration**: 1–2 sessions

#### 5.1 – Budget vs Actual
- Department breakdown table
- Budget, Actual, Variance, Utilization %
- Visual variance indicators
- Toggle: Monthly / Quarterly / Annual
- Drill-down by department

#### 5.2 – Profitability Analytics
- Analysis by: Company, Branch, Department, Product, Customer
- Revenue, Gross Profit, Net Profit, Margin %
- Interactive charts + ranking tables

#### 5.3 – Expense Analytics
- Total expenses
- Expense growth trend
- Categories (pie)
- Department expenses (bar)
- Monthly trends (line)
- Top expense categories (ranked table)

**Deliverable**: Three detailed analytics sections, all charts interactive.

---

### **PHASE 6: TRANSACTIONS & ALERTS** ✅ STEP 7
**Duration**: 1 session

#### 6.1 – Transactions Table
- TanStack Table v8 implementation
- Columns: Date, Reference, Description, Account, Category, Type, Amount, Currency, Status
- Features:
  - Search
  - Sort
  - Filter
  - Pagination
  - Column visibility toggle
  - Column resizing
  - Row selection
  - Export (CSV, PDF, Excel)
  - Click row → details drawer

#### 6.2 – Financial Alerts
- Alert panel showing:
  - Critical (cash warning, overspent)
  - Warning (approaching limits)
  - Attention (overdue invoices)
  - Information (reports ready)
- Each alert: severity, title, description, timestamp, action, read/unread

**Deliverable**: Full transaction table + alert system.

---

### **PHASE 7: DASHBOARD CUSTOMIZATION** ✅ STEP 8
**Duration**: 1 session

#### 7.1 – Customization Framework
- Add/remove widgets (widget catalog)
- Reorder widgets (drag-drop via dnd-kit)
- Resize widgets (grid-based, 1–4 column spans)
- Hide/show widgets
- Save layout (localStorage initially)
- Reset to default
- Multiple layout profiles

**Deliverable**: Fully functional dashboard customization.

---

### **PHASE 8: AI INSIGHTS & AI ASSISTANT** ✅ STEP 9
**Duration**: 1 session

#### 8.1 – AI Insights Widget
- Insight cards with:
  - Generated text (e.g., "Revenue increased 12.4%")
  - Confidence indicator (0–100%)
  - "Explain" button
  - "View Details" button
  - Timestamp

Mock insights:
- "Revenue increased 12.4% compared with last month"
- "Operating expenses exceeded budget by 8.7%"
- "Cash position remains positive for 90 days"

#### 8.2 – AI Finance Assistant
- Polished chat interface
- Users can ask:
  - "How is the company performing?"
  - "Why did expenses increase?"
  - "Show overdue receivables"
  - "Compare this month with last month"
- Mock responses (structured for real API later)

**Deliverable**: AI Insights widget + chatbot interface (UI only, mock data).

---

### **PHASE 9: ROLE-BASED DASHBOARDS** ✅ STEP 10
**Duration**: 0.5 sessions

#### 9.1 – Role Configuration
Define dashboard profiles:

**CFO**:
Revenue, Profit, Cash Flow, Forecast, AR, AP, Budget, Profitability, AI Insights

**Finance Manager**:
Revenue, Expenses, AR, AP, Budget, Transactions, Alerts

**Accountant**:
Transactions, AR, AP, Cash, Reconciliation, Alerts

**Management**:
Revenue, Profit, Cash, Branch Performance, AI Insights

#### 9.2 – Role Selector (Mock)
- Display selector showing current role
- Allow switching (for demo purposes)
- UI adapts to show only relevant widgets

**Deliverable**: Role-based widget filtering.

---

### **PHASE 10: INTERNATIONALIZATION & RTL** ✅ STEP 11
**Duration**: 1 session

#### 10.1 – i18n Setup
- next-intl or similar
- Support: English, Arabic
- RTL layout for Arabic
- Multiple date formats
- Multiple number/currency formats
- Multiple time zones

#### 10.2 – RTL Layout
- Sidebar position switches
- Text alignment switches
- Flex direction switches
- Mirrored spacing where needed

**Deliverable**: Full i18n support, bilingual UI.

---

### **PHASE 11: RESPONSIVE OPTIMIZATION** ✅ STEP 12
**Duration**: 0.5 sessions

#### 11.1 – Mobile Optimization
- Sidebar → bottom navigation or slide-out
- Charts → horizontal scroll or simplified views
- Tables → card/list view on mobile
- Single-column layout
- Touch-friendly sizes

**Deliverable**: Fully responsive design across all breakpoints.

---

### **PHASE 12: ACCESSIBILITY & PERFORMANCE** ✅ STEP 13
**Duration**: 1 session

#### 12.1 – Accessibility
- WCAG 2.2 compliance
- Keyboard navigation
- Visible focus states
- ARIA labels
- Screen reader friendly
- Sufficient contrast
- Reduced motion support

#### 12.2 – Performance
- Lazy-load heavy charts
- Avoid unnecessary client components
- Memoize expensive calculations
- Virtualize large tables
- Efficient selectors
- Skeleton loaders
- Suspense boundaries

**Deliverable**: Accessible, performant dashboard.

---

### **PHASE 13: TESTING & QA** ✅ STEP 14
**Duration**: 1 session

#### 13.1 – Unit Tests
- Utility functions
- Formatters
- Calculations

#### 13.2 – Component Tests
- KPI card rendering
- Chart responsiveness
- Filter interactions

#### 13.3 – E2E Tests (Playwright)
1. Load dashboard
2. Change date range
3. Change company
4. Change currency
5. Filter transactions
6. Open transaction details
7. Customize dashboard (add/remove widget)
8. Reorder widgets
9. Hide widget
10. Restore dashboard
11. Switch dark mode
12. Switch role
13. Open AI assistant
14. Search using Cmd+K

**Deliverable**: Comprehensive test suite, CI/CD ready.

---

## CLAUDE CODE SESSION CHECKLIST

**Session 1 - PHASE 0.1 to 0.5** (Foundation)
```
Prompt: "Initialize Next.js 16 dashboard project with TypeScript strict, 
Tailwind 4.0, shadcn/ui. Create complete folder structure per spec. 
Create all core type definitions (types/dashboard.ts, types/financial.ts, 
types/user.ts). Create design system (variables.css, tailwind config). 
Create mock data service layer and formatters. Do NOT build UI yet. 
Focus on clean architecture foundation. Run: npm run lint, tsc --noEmit, 
npm run build. Commit and push."
```

**Session 2 - PHASE 0.6 to 0.9 + PHASE 1**
```
Prompt: "Build MainLayout component with Sidebar, Header, responsive 
behavior. Implement all header filters (date range, company, branch, 
currency, global search). Create sidebar navigation with all menu items. 
Implement dark mode toggle. Use Zustand for global filter state. Mobile 
collapse behavior. localStorage persistence. Run tests, linting, build."
```

**Session 3 - PHASE 2**
```
Prompt: "Build responsive dashboard grid (4 cols desktop, 2 tablet, 1 mobile). 
Create 8 KPI cards: Revenue, Expenses, Gross Profit, Net Profit, Cash, AR, AP, 
Outstanding Invoices. Each card: value, currency, change%, trend indicator, 
sparkline, hover effect. Use TanStack Query. Pull data from mock service. 
Click card → navigate to detail view. Responsive sizing."
```

**Session 4 - PHASE 3**
```
Prompt: "Create ECharts components: Revenue vs Expense (line chart with 
3 series), Cash Flow (waterfall/bar), Expense Breakdown (donut), AR Aging 
(stacked bar), AP Aging (stacked bar). All charts: responsive, tooltips, 
legend toggles, loading states, empty states. Use ECharts theme that 
matches light/dark mode."
```

**Session 5 - PHASE 4 + 5**
```
Prompt: "Build AR widget (aging breakdown, collection rate, top debtors). 
Build AP widget (aging, top suppliers, upcoming payments). Build Cash Flow 
widget (inflow/outflow, forecast 30/60/90 days). Build Budget vs Actual table 
(departments, variance indicators). All widgets clickable → detail views."
```

**Session 6 - PHASE 6**
```
Prompt: "Build Transactions table with TanStack Table v8: Date, Reference, 
Description, Account, Category, Type, Amount, Currency, Status columns. 
Features: search, sort, filter, pagination, column visibility, column resize, 
row select, export (CSV/PDF/Excel), click row → details drawer. Create Financial 
Alerts panel with severity badges. Implement alert actions."
```

**Session 7 - PHASE 7**
```
Prompt: "Build dashboard customization: add/remove widgets (catalog), reorder 
(dnd-kit drag-drop), resize (grid spans), hide/show, save layout (localStorage), 
reset to default, multiple profiles. Customize Dashboard button opens modal with 
widget gallery. Implement full customization UX."
```

**Session 8 - PHASE 8**
```
Prompt: "Build AI Insights widget: insight cards with text, confidence %, 
Explain button, View Details. Build AI Finance Assistant chatbot: polished chat 
UI, mock responses. Users type: 'How is company performing?', 'Show overdue 
receivables', 'Compare month vs month'. Mock response structure ready for real 
API integration."
```

**Session 9 - PHASE 9 + 10 + 11**
```
Prompt: "Implement role-based dashboards: CFO, Finance Manager, Accountant, 
Management roles. Each role shows relevant widgets only. Add role selector 
(mock). Setup i18n: English + Arabic, RTL layout for Arabic. Implement responsive 
mobile layout: sidebar → bottom nav, single-column grid, card/list views for 
tables on mobile."
```

**Session 10 - PHASE 12 + 13**
```
Prompt: "Implement accessibility: WCAG 2.2 (keyboard nav, focus states, ARIA, 
screen reader friendly, contrast, reduced motion). Implement performance: 
lazy-load charts, avoid client components, memoize calculations, virtualize 
tables, skeleton loaders, Suspense. Run Lighthouse audit: target 90+ score."
```

**Session 11 - PHASE 14**
```
Prompt: "Add comprehensive tests: unit tests (utils, formatters, calculations), 
component tests (KPI cards, charts), E2E tests (Playwright) covering 14 major 
user flows. Setup Jest + React Testing Library. Ensure CI/CD ready. Run all 
tests, fix failures. Verify production build. Document testing strategy in README."
```

**Session 12 - Final Polish**
```
Prompt: "Final QA pass: fix TypeScript errors, lint errors, test failures. 
Verify all UI consistency across light/dark mode. Verify all breakpoints 
(mobile/tablet/desktop). Verify all interactions (clicks, hovers, animations). 
Verify accessibility (keyboard, screen reader). Verify performance (< 3s load). 
Create comprehensive README with architecture explanation, adding widgets guide, 
connecting real API guide. Commit final code, push to GitHub."
```

---

## DEPLOYMENT SETUP

```bash
# Create project directory on VPS
mkdir -p /opt/accounts-dashboard
cd /opt/accounts-dashboard

# Initialize git
git init
git remote add origin git@github.com:ddotsmedia/accounts-dashboard.git

# Create .env.production
cat > .env.production << 'EOF'
NEXT_PUBLIC_APP_NAME=Accounts Dashboard
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_API_BASE_URL=https://accounts-dashboard.ddotsmedia.com/api
NODE_ENV=production
EOF

# PM2 configuration
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [
    {
      name: 'accounts-web',
      script: 'npm',
      args: 'start',
      cwd: '/opt/accounts-dashboard',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        PORT: 3115,
        NODE_ENV: 'production'
      },
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/accounts-error.log',
      out_file: '/var/log/pm2/accounts-out.log',
      merge_logs: true
    }
  ]
};
EOF

# Deploy script
cat > deploy.sh << 'EOF'
#!/bin/bash
set -e
cd /opt/accounts-dashboard
git pull origin main || git pull origin master
npm install
npm run lint
npm run type-check
npm run build
pm2 restart accounts-web
echo "✅ Deployment complete"
EOF
chmod +x deploy.sh
```

---

## NEXT STEP

**Ready to start PHASE 0.1 via Claude Code.**

Would you like me to execute the first Claude Code session? I will:
1. Initialize Next.js 16 project
2. Create complete folder structure
3. Create all TypeScript type definitions
4. Create design system (variables.css, theme)
5. Create mock data layer
6. Create data service abstraction
7. Create reusable utilities & hooks
8. Verify TypeScript, lint, build
9. Commit and push to GitHub

Should I proceed? 🚀
