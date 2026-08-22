# Advanced International Accounts Dashboard
## Strategic Implementation Plan

---

## PROJECT OVERVIEW

**Objective**: Build an enterprise-grade financial accounting dashboard supporting:
- Multiple accounting standards (IFRS, US GAAP, GCC/UAE local compliance)
- Real-time multi-currency transactions with FX settlement
- Advanced financial analytics and forecasting
- Regulatory reporting (EBITDA, IFRS/FASB compliance)
- Role-based audit trails with blockchain-ready logging

**Platform**: `accounts-dashboard.ddotsmedia.com` (Port: 3115)
**Database**: PostgreSQL (Port 5439, DB: `accounts_prod`)
**Cache**: Redis (Port 6391)
**Search**: Elasticsearch 8.x (Port 9203) for transaction search
**Queue**: BullMQ with Redis for async reporting jobs

---

## PHASE BREAKDOWN (16 Phases)

### **PHASE 0: Infrastructure & Database Schema**
**Objectives**: Set up VPS resources, design enterprise schema
**Duration**: 3 Claude Code sessions

#### 0.1 – VPS Setup & Environment
- [ ] Reserve port 3115 (app), 5439 (PostgreSQL), 6391 (Redis), 9203 (ES)
- [ ] Create PostgreSQL DB: `accounts_prod` with UUID extensions
- [ ] Redis instance for caching + job queue
- [ ] Elasticsearch cluster for transaction search
- [ ] PM2 ecosystem config: `accounts-dashboard id:XX port:3115`
- [ ] Docker Compose file for local dev (PostgreSQL, Redis, ES)

**Deliverable**: `/opt/accounts-dashboard/.env.production`, PM2 config, docker-compose.yml

---

#### 0.2 – Core Database Schema
**Multi-Tenant, IFRS-Aligned Structure**

```sql
-- Core Tables (additive, ON CONFLICT DO NOTHING)
accounts              -- Chart of accounts (GL accounts)
  ├─ account_id (UUID)
  ├─ code (VARCHAR, unique per tenant)
  ├─ name, description
  ├─ type (asset/liability/equity/revenue/expense)
  ├─ standard (IFRS/GAAP/Local)
  ├─ is_active, created_at, updated_at

journal_entries       -- Atomic transaction log
  ├─ entry_id (UUID)
  ├─ entry_date, posting_date
  ├─ reference, description
  ├─ status (draft/posted/reconciled/reversed)
  ├─ created_by, approved_by
  ├─ audit_hash (SHA256 for immutability)

entry_lines           -- Debit/credit splits (always balanced)
  ├─ line_id (UUID)
  ├─ entry_id (FK)
  ├─ account_id (FK)
  ├─ debit_amount, credit_amount
  ├─ currency, exchange_rate
  ├─ cost_center_id (for P&L drill-down)
  ├─ tax_code, tax_amount

trial_balances        -- Materialized view, refreshed hourly
  ├─ period_id (YYYY-MM)
  ├─ account_id, standard
  ├─ opening_balance, debit_sum, credit_sum, closing_balance
  ├─ fx_variance (multi-currency adjustment)

reconciliations       -- Bank/GL matching
  ├─ reconciliation_id
  ├─ account_id, reference
  ├─ matched_entries (JSONB array)
  ├─ status (pending/complete)
  ├─ variance_amount

financial_statements  -- Pre-calculated P&L, Balance Sheet, CF
  ├─ statement_id
  ├─ period_id, type (income_statement/balance_sheet/cash_flow)
  ├─ data (JSONB, hierarchical structure)
  ├─ generated_at

audit_log             -- Immutable event stream
  ├─ log_id, timestamp, user_id
  ├─ action (create_entry/post/reconcile/reverse)
  ├─ table_name, record_id, changes (JSONB)
  ├─ ip_address, user_agent (for forensics)

fx_rates              -- Historical exchange rates
  ├─ rate_date, from_currency, to_currency
  ├─ rate, source (ECB/Reuters/Manual)
```

**Deliverable**: Drizzle schema at `src/db/schema.ts`, migrations at `src/db/migrations/`

---

#### 0.3 – Authentication & RBAC
**Hierarchical Permissions Model**

```
Roles:
├─ Super Admin (all permissions)
├─ CFO (posting, reconciliation, reporting)
├─ Accountant (entry creation, GL maintenance)
├─ Auditor (read-only + export)
├─ Cost Center Manager (limited to cost center)
└─ API User (webhook-triggered entries)

Permissions (47 total):
├─ journal_entries:create
├─ journal_entries:post
├─ journal_entries:reverse
├─ reconciliations:reconcile
├─ financial_statements:view
├─ audit_log:export
└─ fx_rates:update
```

**Deliverable**: Better Auth configuration, Drizzle permission tables

---

### **PHASE 1: Core Application Scaffold & APIs**
**Duration**: 2 sessions

#### 1.1 – Next.js 16 + tRPC Setup
- [ ] `create-next-app` with TypeScript strict mode
- [ ] tRPC v11 with protected procedures
- [ ] Drizzle ORM + migrations ready
- [ ] Dark mode + Tailwind 4.0
- [ ] Command palette (Cmd+K) for quick GL lookup
- [ ] Mobile-first responsive design

**Stack**: 
- Frontend: Next.js 16 (App Router), React 19, TypeScript
- API: tRPC v11 with server-side validation (Zod)
- Styling: Tailwind 4.0, shadcn/ui components
- Icons: Lucide React

#### 1.2 – Dashboard Layout & Navigation
- [ ] Sidebar with GL account search (Algolia-style)
- [ ] Top nav: Date range picker (quarterly/YTD), currency selector
- [ ] Global metrics: Revenue, EBITDA, Cash, Debt Ratio (cards, mini charts)
- [ ] Quick actions: Create entry, Reconcile, Export statement
- [ ] Mobile collapse sidebar pattern

**Deliverable**: Layout components, routing structure

---

### **PHASE 2: Chart of Accounts Management**
**Duration**: 1–2 sessions

#### 2.1 – GL Account Maintenance
- [ ] Create/edit/archive GL accounts with IFRS categorization
- [ ] Bulk account import (CSV: code, name, type, standard)
- [ ] Account hierarchy (parent-child nesting for rollup)
- [ ] Reorder accounts via drag-drop (rank column)
- [ ] Search GL (by code, name, IFRS category)
- [ ] Account usage stats (# transactions, last posted date)

**API Endpoints**:
- `POST /api/accounts.create`
- `POST /api/accounts.bulkImport`
- `GET /api/accounts.list` (searchable, paginated)
- `PATCH /api/accounts.update`
- `POST /api/accounts.archive`

**Deliverable**: Full GL management UI + tRPC procedures

---

### **PHASE 3: Journal Entry Recording (Core)**
**Duration**: 2–3 sessions | **HIGH PRIORITY**

#### 3.1 – Entry Creation Workflow
- [ ] Multi-line entry form (auto-balanced double-entry)
- [ ] Debit/Credit split editor (TanStack Table v8)
- [ ] Real-time balance check: `∑Debit = ∑Credit`
- [ ] GL account selector with autocomplete (50K+ accounts searchable)
- [ ] Multi-currency support:
  - Base currency (AED/USD auto-detect by tenant)
  - Line-level FX rates from live API (ECB, Open Exchange Rates)
  - FX gain/loss automatic calculation
- [ ] Cost center / department allocation (for P&L drill-down)
- [ ] Attachments (PDF, CSV, images) with virus scanning
- [ ] Draft save & restore (localStorage + server backup)

#### 3.2 – Entry Posting & Reversal
- [ ] Status workflow: `Draft → Posted → Reconciled → Reversed`
- [ ] Approval routing (CFO approval required for entries > threshold)
- [ ] Posting date lock (immutability after posting)
- [ ] Reversal: auto-generate reversing entries (dated next period)
- [ ] Batch posting (select N entries, post all in transaction)

#### 3.3 – Entry Search & Filters
- [ ] Elasticsearch index on entries (real-time indexing via BullMQ)
- [ ] Filter by: date range, account, reference, amount range, status
- [ ] Advanced search: `account:1010 AND date:[2024-01-01 TO 2024-12-31] AND amount:>50000`
- [ ] Export results: CSV, JSON, PDF (with signatures)

**Deliverable**: Full entry creation flow, ES integration, APIs

---

### **PHASE 4: Trial Balance & GL Reports**
**Duration**: 2 sessions

#### 4.1 – Trial Balance Dashboard
- [ ] Real-time trial balance by period (YYYY-MM)
- [ ] Opening balance, debits, credits, closing balance
- [ ] Multi-standard view toggle (IFRS vs GAAP columns side-by-side)
- [ ] Drill-down: Click account → see all transactions
- [ ] Multi-currency section (FX gains/losses consolidated)
- [ ] Export to Excel (formatted, locked cells)

#### 4.2 – GL Account Aging
- [ ] AP/AR aging (by invoice date, due date)
- [ ] GL account statement (like bank statement)
- [ ] Reconciliation status per account (% reconciled)

**Deliverable**: tRPC queries + React components + Excel export

---

### **PHASE 5: Reconciliation Engine**
**Duration**: 2–3 sessions

#### 5.1 – Bank Reconciliation
- [ ] Import bank statements (CSV, OFX, ISO 20022)
- [ ] Match transactions (GL entries ↔ bank statement)
- [ ] AI-powered matching (fuzzy amount/date matching)
- [ ] Manual exception handling (unmatched items)
- [ ] Variance tracking & journal entry auto-creation
- [ ] Audit trail: who reconciled what, when

#### 5.2 – AP/AR Reconciliation
- [ ] Invoice-to-payment matching
- [ ] Partial payment support
- [ ] Deduction tracking (early pay discount, writeoff)
- [ ] Aged exception report

**Deliverable**: Reconciliation UI, matching algorithms, OCR for statement parsing

---

### **PHASE 6: Financial Statement Generation**
**Duration**: 2–3 sessions | **CRITICAL**

#### 6.1 – Automated Statement Generation
- [ ] **Income Statement** (P&L):
  - Revenue, COGS, Gross Margin %
  - Operating Expenses (SG&A breakdown)
  - EBITDA, EBIT, Net Income
  - YTD vs Prior Year comparison
  
- [ ] **Balance Sheet**:
  - Assets (Current/Non-Current)
  - Liabilities (Current/Non-Current)
  - Equity
  - Quick Ratio, Current Ratio, Debt Ratio
  
- [ ] **Cash Flow Statement** (Indirect method):
  - Operating, Investing, Financing activities
  - Free cash flow, Cash position trends

#### 6.2 – Statement Configuration
- [ ] Drag-drop line item reordering
- [ ] Custom subtotal definitions (e.g., "Operating Income")
- [ ] Consolidation rules (for multi-entity)
- [ ] Rounding precision per statement type
- [ ] Notes to financial statements (rich text, linked to GL entries)

**Deliverable**: Statement templates, auto-calc formulas, version history

---

### **PHASE 7: Multi-Currency & FX Management**
**Duration**: 2 sessions

#### 7.1 – Exchange Rate Management
- [ ] FX rates table (ECB, Reuters, Bloomberg integration)
- [ ] Historical rates (for period-end conversion)
- [ ] Manual rate override (for inter-company transfers)
- [ ] Realized vs Unrealized FX gain/loss GL accounts

#### 7.2 – Consolidation Currency
- [ ] Consolidation currency setting (AED, USD, etc.)
- [ ] Period-end conversion (all transactions in reporting currency)
- [ ] FX variance accounts auto-populated
- [ ] Multi-entity roll-up (sum consolidated statements)

**Deliverable**: FX APIs, consolidation engine

---

### **PHASE 8: Advanced Analytics & Dashboards**
**Duration**: 2–3 sessions

#### 8.1 – Financial KPIs
- [ ] Revenue trends (monthly/quarterly ECharts line chart)
- [ ] Expense breakdown (pie/donut by category)
- [ ] Profitability waterfall (Gross → EBIT → Net)
- [ ] Cash flow forecast (based on AR/AP aging)
- [ ] Key ratios:
  - Liquidity: Current, Quick, Cash
  - Solvency: Debt/Equity, Debt/EBITDA
  - Profitability: ROS, ROA, ROE
  - Efficiency: Asset Turnover, Receivables Days

#### 8.2 – Variance Analysis
- [ ] Actuals vs Budget (budget upload)
- [ ] Variance drill-down (click variance → drill to GL lines)
- [ ] Trend analysis (3-year comparison)
- [ ] Forecast vs Actuals (for forecast model)

#### 8.3 – Cost Center P&L
- [ ] Departmental P&L statements
- [ ] Cost allocation rules (driver-based: headcount, sqft, usage %)
- [ ] Department contribution margin analysis

**Deliverable**: ECharts dashboards, KPI calculations, forecast models

---

### **PHASE 9: Audit & Compliance**
**Duration**: 2 sessions

#### 9.1 – Audit Trail & Logging
- [ ] Immutable audit log (every CRUD action logged)
- [ ] User + IP + timestamp for forensics
- [ ] Reversibility: can show entry state at any point in time
- [ ] Export audit report (CSV) for external auditor

#### 9.2 – Regulatory Compliance
- [ ] IFRS 16 (Lease accounting) data capture
- [ ] Revenue recognition (IFRS 15) journal templates
- [ ] Deferred tax calculations
- [ ] Related-party transaction disclosure
- [ ] Regulatory filing templates:
  - VAT return (UAE, GCC-specific)
  - Income tax return
  - Zakat (Islamic compliance)

**Deliverable**: Audit tables, compliance templates, export formats

---

### **PHASE 10: Reporting & Exports**
**Duration**: 1–2 sessions

#### 10.1 – Multi-Format Exports
- [ ] PDF (financial statements with signatures, watermark)
- [ ] Excel (multiple sheets, named ranges, formulas)
- [ ] XBRL (for regulatory filing)
- [ ] JSON (API consumption)
- [ ] Email scheduling (auto-send weekly/monthly to stakeholders)

#### 10.2 – Report Builder
- [ ] Custom report templates (drag-drop columns, aggregations)
- [ ] Scheduled reports (daily/weekly/monthly)
- [ ] Report versioning (audit trail of changes)

**Deliverable**: Export engines, template system

---

### **PHASE 11: Data Import & Integration**
**Duration**: 2 sessions

#### 11.1 – GL Import Wizards
- [ ] CSV bulk import (GL, customers, vendors, items)
- [ ] Mapping tool (map CSV columns → DB fields)
- [ ] Validation preview (before commit)
- [ ] Error handling & rollback

#### 11.2 – Third-Party Integrations
- [ ] **Bank feeds**: Plaid, Wise, FIR API
- [ ] **ERP sync**: SAP, Oracle, NetSuite (tRPC webhooks)
- [ ] **Tax software**: TurboTax, Thomson Reuters
- [ ] **Payroll**: BambooHR → auto-create payroll entries

**Deliverable**: Import flows, integration adapters

---

### **PHASE 12: User Management & Teams**
**Duration**: 1 session

#### 12.1 – Org Structure
- [ ] Multi-entity support (holding company + subsidiaries)
- [ ] Department/cost center hierarchy
- [ ] User → cost center assignment
- [ ] Delegated approval chains (approval routing)

#### 12.2 – Role-Based Access Control
- [ ] 47 granular permissions (create, post, reverse, etc.)
- [ ] Role templates (CFO, Accountant, Auditor, Controller)
- [ ] Custom roles + permission matrix
- [ ] Time-based access (e.g., "can only create entries after 9 AM")

**Deliverable**: User mgmt UI, RBAC tables

---

### **PHASE 13: Mobile App (iOS/Android)**
**Duration**: 2–3 sessions (optional, lower priority)

#### 13.1 – React Native / Expo Build
- [ ] Journal entry quick-create (mobile optimized)
- [ ] Expense receipt capture (camera + OCR)
- [ ] Approval workflows (on-the-go approval)
- [ ] Real-time notifications (entry posted, reconciliation alert)
- [ ] Offline mode (queue entries, sync when online)

**Deliverable**: React Native app, App Store/Play Store ready

---

### **PHASE 14: Performance & Optimization**
**Duration**: 1–2 sessions

#### 14.1 – Database Optimization
- [ ] Indexes on: entry_date, account_id, status, created_by
- [ ] Materialized views for trial balance (refreshed hourly)
- [ ] Partitioning by period (monthly or quarterly)
- [ ] Query optimization (EXPLAIN ANALYZE for slow queries)

#### 14.2 – Frontend Performance
- [ ] Code splitting (React lazy load routes)
- [ ] Image optimization (TanStack Query caching)
- [ ] Virtual scrolling for large GL lists
- [ ] Service Worker for offline capability

#### 14.3 – Caching Strategy
- [ ] Redis cache for: GL accounts, FX rates, trial balances
- [ ] Cache invalidation on posting (smart, not blanket)
- [ ] Stale-while-revalidate for slow endpoints

**Deliverable**: Performance benchmarks, optimized queries

---

### **PHASE 15: Testing & QA**
**Duration**: 2 sessions

#### 15.1 – Automated Testing
- [ ] Unit tests: GL posting logic, FX calculations
- [ ] Integration tests: Journal entry workflow end-to-end
- [ ] E2E tests: Playwright (entry creation → posting → reconciliation)

#### 15.2 – UAT Preparation
- [ ] Test data migration (historical transactions)
- [ ] User training materials
- [ ] Cutover checklist

**Deliverable**: Test suite, UAT scripts

---

### **PHASE 16: Deployment & Monitoring**
**Duration**: 1 session

#### 16.1 – VPS Deployment
- [ ] PM2 configuration with crash protection
- [ ] Nginx reverse proxy + SSL
- [ ] Backup strategy (pg_dump daily, S3 storage)
- [ ] Database replication (standby instance)

#### 16.2 – Monitoring & Alerts
- [ ] Prometheus + Grafana dashboards
- [ ] APM (Application Performance Monitoring)
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring + alerting (PagerDuty)

**Deliverable**: Deployment scripts, monitoring setup

---

## TECHNOLOGY STACK SUMMARY

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind 4.0, shadcn/ui |
| **API** | tRPC v11, Zod validation |
| **ORM** | Drizzle with PostgreSQL |
| **Database** | PostgreSQL 15 (5439), Redis 7.x (6391) |
| **Search** | Elasticsearch 8.x (9203) |
| **Queue** | BullMQ + Redis |
| **Charts** | ECharts, Recharts |
| **Auth** | Better Auth v1.6.23 with RBAC |
| **Export** | exceljs, pdfkit, XBRL |
| **Deployment** | PM2 (id:XX, port:3115), Nginx, Docker Compose |

---

## CLAUDE CODE SESSION PLAN

### **Session 1-2: Infrastructure & Schema**
```
Prompt: "Set up PostgreSQL accounts_prod DB, Drizzle schema with 
journal_entries, trial_balances, audit_log tables, Redis cache, 
Elasticsearch index for transactions. Additive migrations only."
```

### **Session 3-4: Scaffold & APIs**
```
Prompt: "Next.js 16 app with tRPC v11, Better Auth RBAC (47 permissions),
dashboard layout, GL account management CRUD, mobile-first."
```

### **Session 5-7: Journal Entry Engine**
```
Prompt: "Multi-line journal entry form (TanStack Table), FX calculator,
balance validation, Elasticsearch indexing, approval workflow, batch posting."
```

### **Session 8-9: Financial Statements**
```
Prompt: "Auto-calculate P&L, Balance Sheet, CF statements. Trial balance
materialized view. Statement configuration UI (drag-drop). Period-end closing."
```

### **Session 10-12: Reconciliation & Analytics**
```
Prompt: "Bank reconciliation (CSV/OFX import), AI fuzzy matching, 
AP/AR reconciliation. KPI dashboards (ECharts), variance analysis, 
cost center P&L."
```

### **Session 13-14: Compliance & Exports**
```
Prompt: "Audit trail (immutable log), IFRS 16/15 templates, VAT/tax 
compliance, PDF/Excel/XBRL exports, regulatory filing helpers."
```

### **Session 15-16: Optimization & Monitoring**
```
Prompt: "DB indexing, query optimization, Redis caching strategy, 
Prometheus monitoring, Sentry error tracking, backup automation."
```

---

## INTERNATIONAL COMPLIANCE MODULES

### **IFRS Standard**
- GL account mappings to IAS/IFRS classifications
- Deferred tax calculations
- Lease accounting (IFRS 16)
- Revenue recognition (IFRS 15)
- Consolidation rules

### **US GAAP**
- GL mappings to ASC structure
- Segment reporting (ASC 280)
- Stock compensation (ASC 718)

### **UAE/GCC Regulatory**
- VAT return (Fed Tax Authority 201)
- Zakat calculations (Islamic compliance)
- EMIR reporting (Central Bank)
- Related-party disclosures (DFSA)

### **Multi-Currency**
- Functional vs Presentation currency
- FX revaluation (period-end)
- Consolidation currency translation

---

## SECURITY & GOVERNANCE

✅ **Data Encryption**
- TLS 1.3 in transit
- AES-256 at rest (PostgreSQL pgcrypto)
- API key rotation (monthly)

✅ **Access Control**
- 47 granular permissions (role-based)
- IP whitelisting (CFO only)
- Session timeout (30 min idle)
- MFA support (TOTP)

✅ **Audit & Compliance**
- Immutable audit log (SHA256 hash chain)
- Export for external auditors
- GxP compliance (for healthcare clients)

✅ **Backup & Disaster Recovery**
- Daily pg_dump to S3
- Point-in-time recovery (7-day retention)
- RTO: 2 hours, RPO: 1 hour

---

## COST ESTIMATE (VPS Infrastructure)

| Component | Cost/Month | Notes |
|-----------|-----------|-------|
| PostgreSQL hosting (5GB→50GB) | Included | Hostinger VPS |
| Redis (6GB) | Included | Same VPS |
| Elasticsearch (50GB) | $20–50 | Cloud-hosted (Elastic.co) or self-hosted |
| Domain + SSL | $12 | Hostinger |
| Backups (S3) | $5–10 | 100GB stored |
| **Total** | **~$50–75/mo** | Scalable to $300+ for 500GB data |

---

## SUCCESS METRICS

- [ ] **Response time**: < 200ms (p95) for GL queries
- [ ] **Uptime**: 99.9% (4.3 hrs/mo downtime budget)
- [ ] **Audit trail**: 100% immutability (tamper-proof)
- [ ] **User adoption**: 95% accountants can post entry in < 2 min
- [ ] **Regulatory**: Pass external audit (unqualified opinion)

---

## NEXT STEPS

1. **Decide**: Build all 16 phases or prioritize (Phases 0–6 = MVP)
2. **Allocate**: ~16–20 Claude Code sessions (4–6 weeks at 3 sessions/week)
3. **Start**: Phase 0.1 (VPS setup) — I'm ready to execute via Claude Code
4. **Review**: CLAUDE.md + TASKS.md per project after each session
