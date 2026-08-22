/**
 * User & Auth Types
 */

export type Role = 'cfo' | 'finance-manager' | 'accountant' | 'management';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  department?: string;
  company?: string;
  permissions: Permissions;
  preferences: UserPreferences;
  lastLogin?: Date;
  active: boolean;
}

export interface Permissions {
  canViewDashboard: boolean;
  canViewAnalytics: boolean;
  canViewTransactions: boolean;
  canViewReceivables: boolean;
  canViewPayables: boolean;
  canViewCashFlow: boolean;
  canViewBudget: boolean;
  canViewProfitability: boolean;
  canViewReports: boolean;
  canViewAIInsights: boolean;
  canEditSettings: boolean;
  canExportData: boolean;
  canApproveTransactions: boolean;
  canManageUsers: boolean;
  canConfigureAlerts: boolean;
  [key: string]: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: 'AED' | 'USD' | 'EUR';
  dateFormat: string;
  timeZone: string;
  notificationPreferences: NotificationPreferences;
  dashboardLayout?: 'default' | 'compact' | 'expanded';
  defaultFilters?: Record<string, unknown>;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  criticalAlerts: boolean;
  weeklyDigest: boolean;
  customAlerts: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}

export type RolePermissionMap = {
  [key in Role]: Permissions;
};

export const DEFAULT_PERMISSIONS: RolePermissionMap = {
  cfo: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewTransactions: true,
    canViewReceivables: true,
    canViewPayables: true,
    canViewCashFlow: true,
    canViewBudget: true,
    canViewProfitability: true,
    canViewReports: true,
    canViewAIInsights: true,
    canEditSettings: true,
    canExportData: true,
    canApproveTransactions: true,
    canManageUsers: true,
    canConfigureAlerts: true,
  },
  'finance-manager': {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewTransactions: true,
    canViewReceivables: true,
    canViewPayables: true,
    canViewCashFlow: true,
    canViewBudget: true,
    canViewProfitability: true,
    canViewReports: true,
    canViewAIInsights: true,
    canEditSettings: false,
    canExportData: true,
    canApproveTransactions: true,
    canManageUsers: false,
    canConfigureAlerts: true,
  },
  accountant: {
    canViewDashboard: true,
    canViewAnalytics: false,
    canViewTransactions: true,
    canViewReceivables: true,
    canViewPayables: true,
    canViewCashFlow: false,
    canViewBudget: false,
    canViewProfitability: false,
    canViewReports: false,
    canViewAIInsights: false,
    canEditSettings: false,
    canExportData: true,
    canApproveTransactions: false,
    canManageUsers: false,
    canConfigureAlerts: false,
  },
  management: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewTransactions: false,
    canViewReceivables: true,
    canViewPayables: true,
    canViewCashFlow: true,
    canViewBudget: true,
    canViewProfitability: true,
    canViewReports: true,
    canViewAIInsights: true,
    canEditSettings: false,
    canExportData: true,
    canApproveTransactions: false,
    canManageUsers: false,
    canConfigureAlerts: false,
  },
};
