/**
 * API Types
 * Request/response types for API communication
 */

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetails;
  timestamp: Date;
  requestId?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationInfo;
  error?: ErrorDetails;
  timestamp: Date;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ErrorDetails {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export interface DashboardFilters {
  dateRange?: {
    from: Date;
    to: Date;
  };
  companyId?: string;
  branchId?: string;
  departmentId?: string;
  currency?: 'AED' | 'USD' | 'EUR';
  comparisonPeriod?: 'none' | 'previousPeriod' | 'previousYear';
}

export interface TransactionFilters extends DashboardFilters {
  type?: 'revenue' | 'expense' | 'transfer' | 'payment' | 'receipt';
  status?: 'draft' | 'posted' | 'reconciled';
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  pageSize?: number;
  sortBy?: 'date' | 'amount' | 'description';
  sortOrder?: 'asc' | 'desc';
}

export interface ARFilters extends DashboardFilters {
  customerId?: string;
  minDaysOutstanding?: number;
  agingBucket?: string;
  status?: 'current' | 'overdue';
}

export interface APFilters extends DashboardFilters {
  supplierId?: string;
  minDaysPayable?: number;
  agingBucket?: string;
  status?: 'current' | 'overdue';
}

export interface BudgetFilters extends DashboardFilters {
  department?: string;
  status?: 'on-track' | 'at-risk' | 'over-budget';
  year?: number;
  month?: number;
}

export interface ReportFilters extends DashboardFilters {
  reportType?: string;
  format?: 'pdf' | 'excel' | 'csv' | 'html';
  includeCharts?: boolean;
  includeTrends?: boolean;
}

export interface ChartDataRequest {
  type: 'pie' | 'bar' | 'line' | 'area' | 'scatter';
  filters: DashboardFilters;
  metrics?: string[];
  groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface BulkOperationRequest {
  operation: 'update' | 'delete' | 'approve' | 'reject';
  ids: string[];
  data?: Record<string, unknown>;
}

export interface BulkOperationResponse {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    id: string;
    error: string;
  }>;
}

export interface ExportRequest {
  format: 'pdf' | 'excel' | 'csv';
  filters: DashboardFilters;
  includeCharts?: boolean;
  includeSummary?: boolean;
}

export interface ExportResponse {
  success: boolean;
  downloadUrl?: string;
  fileSize?: number;
  generatedAt: Date;
}

export interface SearchRequest {
  query: string;
  filters?: DashboardFilters;
  searchIn?: ('transactions' | 'customers' | 'suppliers' | 'products')[];
  limit?: number;
}

export interface SearchResult<T> {
  type: string;
  result: T;
  relevance: number;
  matchField: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValue?: unknown;
  newValue?: unknown;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface NotificationEvent {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  read: boolean;
  timestamp: Date;
}

export interface SyncStatusResponse {
  lastSync: Date;
  nextSync: Date;
  status: 'synced' | 'syncing' | 'pending' | 'error';
  pendingChanges: number;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  services: {
    api: ServiceStatus;
    database: ServiceStatus;
    cache: ServiceStatus;
  };
  version: string;
}

export interface ServiceStatus {
  status: 'up' | 'down';
  responseTime: number;
  lastChecked: Date;
  error?: string;
}
