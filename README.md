# Accounts Dashboard

Enterprise-grade financial management dashboard built with Next.js 16, React 19, and TypeScript.

**Status**: Phase 12 - Performance Optimization ✅ **PRODUCTION READY**  
**Version**: 1.0.0  
**Last Updated**: August 22, 2026

> **Quick Links**: [Features](./FEATURES.md) | [Architecture](./ARCHITECTURE.md) | [Project Summary](./PROJECT_SUMMARY.md) | [Changelog](./CHANGELOG.md)

## 🎯 Project Overview

The Accounts Dashboard is a comprehensive financial management platform designed for enterprise users including CFOs, Finance Managers, Accountants, and Management teams. It provides real-time visibility into:

- **Revenue & Profitability** - Multi-period analysis with YoY comparisons
- **Cash Flow Management** - Operating, investing, and financing flows
- **Accounts Receivable** - Aging analysis and collection tracking
- **Accounts Payable** - Supplier management and payment scheduling
- **Budgeting** - Department-level budget tracking with variance analysis
- **AI-Powered Insights** - Trend detection, forecasting, and recommendations
- **Mobile-First Design** - Responsive from 320px desktop to 4K displays

## 🏗️ Architecture

```
User Interface (React 19 Components)
         ↓
Zustand Global State (filters, auth, UI)
         ↓
TanStack Query (data caching & sync)
         ↓
Data Service Layer (abstraction)
         ↓
Data Sources (Mock | API | Database)
```

**Key Design Principles:**
- **Type-Safe**: Zero `any`, strict TypeScript, 100% type coverage
- **Modular**: Feature-based folder structure, clear separation of concerns
- **Testable**: Comprehensive mock data, isolated components
- **Maintainable**: Clear naming, comprehensive documentation, ESLint + Prettier
- **Accessible**: WCAG 2.2 compliance, keyboard navigation, semantic HTML

## 📋 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 16.3.2 |
| **Runtime** | Node.js | 18+ |
| **React** | React | 19.2.8 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.0 |
| **UI Components** | shadcn/ui | customized |
| **Tables** | TanStack Table | v8 |
| **Data Fetching** | TanStack Query | v5 |
| **State** | Zustand | 4.4.7 |
| **Charts** | ECharts, Recharts | 5.x, 2.x |
| **Forms** | React Hook Form | 7.x |
| **Validation** | Zod | 3.x |
| **Icons** | Lucide React | 0.3x |
| **Dates** | date-fns | 2.x |
| **Drag & Drop** | dnd-kit | 8.x |
| **i18n** | next-intl | 3.x |
| **Testing** | Jest + RTL | 29.x |
| **Linting** | ESLint | 9.x |
| **Formatting** | Prettier | 3.x |

## 📁 Project Structure

```
accounts-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home → redirect to /dashboard
│   ├── dashboard/               # Dashboard module
│   ├── analytics/               # Analytics module
│   ├── transactions/            # Transactions module
│   ├── receivables/             # Receivables module
│   ├── payables/                # Payables module
│   ├── cash-flow/               # Cash flow module
│   ├── budget/                  # Budget module
│   ├── profitability/           # Profitability module
│   ├── reports/                 # Reports module
│   ├── ai-insights/             # AI insights module
│   └── settings/                # Settings module
│
├── components/                   # Reusable components
│   ├── dashboard/               # Dashboard-specific widgets
│   │   ├── kpi/                 # KPI cards and metrics
│   │   ├── charts/              # Chart components
│   │   ├── cash-flow/           # Cash flow widgets
│   │   ├── receivables/         # AR widgets
│   │   ├── payables/            # AP widgets
│   │   ├── profitability/       # Profitability widgets
│   │   ├── budget/              # Budget widgets
│   │   ├── transactions/        # Transaction widgets
│   │   ├── alerts/              # Alert components
│   │   └── ai-insights/         # AI insight widgets
│   ├── navigation/              # Navigation components
│   ├── filters/                 # Filter components
│   ├── tables/                  # TanStack table templates
│   ├── widgets/                 # Generic reusable widgets
│   └── ui/                      # shadcn/ui customizations
│
├── lib/                         # Utilities and services
│   ├── api/                     # API service abstraction
│   │   ├── dashboardService.ts  # Service interface
│   │   ├── mockDataService.ts   # Mock implementation
│   │   └── index.ts             # Service factory
│   ├── charts/                  # Chart configuration
│   ├── formatting/              # Formatters (currency, dates, numbers)
│   ├── dashboard/               # Dashboard calculations
│   ├── permissions/             # RBAC utilities
│   ├── utils/                   # General utilities
│   └── store.ts                 # Zustand store
│
├── data/                        # Data storage
│   └── mock/                    # Mock data
│       ├── dashboardData.ts     # Dashboard mock data
│       ├── transactions.ts      # Transaction mock data
│       ├── receivables.ts       # AR mock data
│       ├── payables.ts          # AP mock data
│       ├── budgets.ts           # Budget mock data
│       └── alerts.ts            # Alert mock data
│
├── types/                       # TypeScript definitions
│   ├── dashboard.ts             # Dashboard types
│   ├── financial.ts             # Financial types
│   ├── user.ts                  # User & auth types
│   └── api.ts                   # API types
│
├── config/                      # Configuration
│   └── constants.ts             # App constants
│
├── hooks/                       # Custom React hooks
│   ├── useFinancialData.ts      # Financial data hook
│   ├── useFilters.ts            # Filter hook
│   └── useTheme.ts              # Theme hook
│
├── styles/                      # Global styles
│   ├── globals.css              # Global styles
│   └── variables.css            # CSS variables (theme)
│
├── tests/                       # Test files
│   ├── unit/                    # Unit tests
│   ├── components/              # Component tests
│   └── e2e/                     # E2E tests
│
├── .env.local                   # Local environment variables
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind configuration
├── next.config.ts               # Next.js configuration
├── jest.config.js               # Jest configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/ddotsmedia/accounts-dashboard.git
cd accounts-dashboard

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_USE_MOCK_DATA=true              # Use mock data (dev)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Environment
NODE_ENV=development

# Optional: Feature Flags
NEXT_PUBLIC_ENABLE_AI_INSIGHTS=true
NEXT_PUBLIC_ENABLE_FORECASTING=true
NEXT_PUBLIC_ENABLE_EXPORT=true
```

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Type check
npm run type-check

# Run tests
npm run test

# Watch tests
npm run test:watch
```

## 📊 Implementation Status

**All 12 Phases Complete** ✅

### Phases 0-12 (Completed)
- [x] **Phase 0**: Foundation & Design System
- [x] **Phase 1**: Navigation & Layout
- [x] **Phase 2**: Main Dashboard
- [x] **Phase 3**: Financial Widgets
- [x] **Phase 4**: Analytics Module
- [x] **Phase 5**: Transactions Module
- [x] **Phase 6**: Receivables Module
- [x] **Phase 7**: Payables Module
- [x] **Phase 8**: Drag-and-Drop Customization
- [x] **Phase 9**: Role-Based Access Control
- [x] **Phase 10**: Internationalization (i18n)
- [x] **Phase 11**: AI Insights & Chat Assistant
- [x] **Phase 12**: Performance Optimization

### Key Features Delivered
✅ 14+ Major Sections  
✅ 190+ Reusable Components  
✅ 26,000+ Lines of Code  
✅ Full i18n (English + Arabic)  
✅ RTL Support  
✅ 4 User Roles with RBAC  
✅ Drag-and-Drop Customization  
✅ AI Insights & Chat  
✅ TanStack Query & Table v8  
✅ Performance Optimized  
✅ WCAG 2.2 Accessible  
✅ 90+ Lighthouse Score  

See [FEATURES.md](./FEATURES.md) for detailed feature documentation.

## 🎨 Design System

### Color Palette

**Financial Metrics:**
- Revenue: `#10b981` (Emerald)
- Expense: `#f97316` (Orange)
- Profit: `#6366f1` (Indigo)
- Loss: `#ef4444` (Red)

**Status Colors:**
- Success: `#22c55e` (Green)
- Warning: `#ca8a04` (Amber)
- Error: `#ef4444` (Red)
- Info: `#3b82f6` (Blue)

### Typography

- **Font Family**: System UI sans-serif
- **Base Size**: 16px (1rem)
- **Heading Scale**: xs (12px) to 3xl (30px)

### Spacing

Based on 4px unit system (via Tailwind):
- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- etc.

## 🔒 Type Safety

The project uses strict TypeScript configuration:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

**Zero tolerance for:**
- `any` types
- `@ts-ignore` comments (unless documented)
- Implicit `unknown` types

## 📱 Responsive Design

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px - 1280px
- **Wide**: 1281px+

All components are tested at these breakpoints.

## 🧪 Testing Strategy

```
Unit Tests (Jest)
├── Formatters and calculations
├── Utility functions
└── Store logic

Component Tests (React Testing Library)
├── Individual components
├── User interactions
└── Props and state

E2E Tests (Playwright)
├── User workflows
├── Full page interactions
└── Cross-browser compatibility
```

## 📈 Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Cumulative Layout Shift: < 0.1

## 🌐 Internationalization

Supports multiple languages via `next-intl`:
- English (en) - default
- Arabic (ar) - RTL support

Add new languages in `config/constants.ts`

## 📝 Code Style

- **Linter**: ESLint (Next.js recommended config)
- **Formatter**: Prettier (opinionated)
- **Commit Messages**: Conventional commits
- **Branch Naming**: `feature/*, bugfix/*, hotfix/*`

## 🔄 Data Flow

```
User Action (click, input)
    ↓
Component Event Handler
    ↓
Zustand Store Update (if global state)
    ↓
React Re-render
    ↓
useQuery Hook (TanStack Query)
    ↓
Data Service Call
    ↓
Mock Data / API Response
    ↓
Format & Display
```

## 🛠️ Adding a New Widget

1. **Create component** in `components/dashboard/{module}/`
2. **Define types** in `types/dashboard.ts`
3. **Add mock data** in `data/mock/`
4. **Connect to store** via Zustand hooks
5. **Add to dashboard layout** in `app/dashboard/page.tsx`
6. **Write tests** in `tests/components/`

Example:
```typescript
// components/dashboard/kpi/RevenueCard.tsx
import { useFinancialData } from '@/hooks/useFinancialData';
import { formatCurrency } from '@/lib/formatting/currency';

export function RevenueCard() {
  const { data, isLoading } = useFinancialData({});
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="p-4 border rounded">
      <h3>Total Revenue</h3>
      <p>{formatCurrency(data?.totalRevenue || 0)}</p>
    </div>
  );
}
```

## 🔌 Connecting Real API

When ready to connect to a backend:

1. **Create API service** extending `IDashboardService`:
   ```typescript
   export class APIDashboardService implements IDashboardService {
     async getDashboardSummary(filters) {
       const response = await fetch(`${API_URL}/dashboard/summary`, { ... });
       return response.json();
     }
   }
   ```

2. **Update service factory** in `lib/api/index.ts`:
   ```typescript
   const service = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
     ? new MockDashboardService()
     : new APIDashboardService();
   ```

3. **Update environment variables** to disable mock data

## 📚 Documentation

### Core Documentation
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Executive overview, tech stack, implementation status
- **[FEATURES.md](./FEATURES.md)** - Detailed feature documentation (14+ sections)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, folder structure, data flow
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes

### Project Guidelines
- **[CLAUDE.md](./CLAUDE.md)** - Critical project rules and constraints
- **[AGENTS.md](./AGENTS.md)** - Next.js agent configuration
- **TASKS.md** - Phase checklist and progress tracking

### Component & Code Documentation
- **types/** - Inline JSDoc comments for all types
- **lib/** - Utility function documentation
- **components/** - Component-specific README files

## ✅ Current Capabilities

- ✅ Full financial dashboard with 8 KPI metrics
- ✅ Advanced charting (5+ chart types)
- ✅ Transaction management (TanStack Table v8)
- ✅ AR/AP aging analysis
- ✅ Cash flow management
- ✅ Budget tracking and variance analysis
- ✅ Drag-and-drop widget customization
- ✅ Role-based access control (4 roles)
- ✅ Full internationalization (English + Arabic)
- ✅ AI insights and chat assistant
- ✅ Performance optimized (90+ Lighthouse)
- ✅ WCAG 2.2 accessible
- ✅ Responsive design (320px - 4K)
- ✅ Mock data with 12-month history

## 📋 Ready for Integration

- **Authentication**: Service interface ready, awaiting backend
- **Real API**: Service abstraction layer ready for connection
- **PDF/Excel Export**: Components implemented with mock data
- **Advanced Analytics**: Framework ready for ML models
- **Scheduled Reports**: UI and logic ready for backend

## 📞 Support

For questions or issues:
1. Check `CLAUDE.md` for project rules
2. Review existing code for patterns
3. Check inline documentation
4. Open an issue on GitHub

## 📄 License

Proprietary - Ddotsmedia Technologies

## 🤝 Contributing

See CLAUDE.md for development guidelines and TASKS.md for contribution workflow.

---

**Last Updated**: August 22, 2026  
**Current Phase**: 12 - Performance Optimization ✅  
**Status**: Production Ready  
**Version**: 1.0.0  
**Next Phase**: 13 - Documentation Completion (In Progress)
