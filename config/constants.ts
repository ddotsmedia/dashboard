/**
 * Application Constants
 */

export const APP_NAME = 'Accounts Dashboard';
export const APP_VERSION = '0.1.0';
export const APP_DESCRIPTION = 'Enterprise Financial Dashboard';

export const CURRENCIES = ['AED', 'USD', 'EUR'] as const;
export const DEFAULT_CURRENCY = 'AED';

export const LANGUAGES = ['en', 'ar'] as const;
export const DEFAULT_LANGUAGE = 'en';

export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
  TIME: 'HH:mm:ss',
  DATETIME: 'MMM dd, yyyy HH:mm',
};

export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

export const ROLES = ['CFO', 'FinanceManager', 'Accountant', 'Management', 'Viewer'] as const;

export const TRANSACTION_TYPES = ['revenue', 'expense', 'transfer', 'payment', 'receipt'] as const;
export const TRANSACTION_STATUSES = ['draft', 'posted', 'reconciled'] as const;

export const ALERT_TYPES = ['critical', 'warning', 'attention', 'info'] as const;
export const AI_INSIGHT_CATEGORIES = ['trend', 'anomaly', 'forecast', 'recommendation'] as const;

export const BUDGET_STATUSES = ['on-track', 'at-risk', 'over-budget', 'under-utilized'] as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000;

export const CHART_COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#22c55e',
  WARNING: '#ca8a04',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};

export const FINANCIAL_COLORS = {
  REVENUE: '#10b981',
  EXPENSE: '#f97316',
  PROFIT: '#6366f1',
  LOSS: '#ef4444',
};

export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
};

export const FEATURE_FLAGS = {
  ENABLE_AI_INSIGHTS: true,
  ENABLE_FORECASTING: true,
  ENABLE_EXPORT: true,
  ENABLE_ALERTS: true,
};
