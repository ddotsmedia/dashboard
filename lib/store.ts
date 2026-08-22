/**
 * Zustand Store Configuration
 * Global state management with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role } from '@/types/user';

/**
 * Filter State
 */
export interface FilterSlice {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  company: string;
  branch: string;
  currency: 'AED' | 'USD' | 'EUR';
  comparisonPeriod: 'YoY' | 'QoQ' | 'MoM' | 'none';
  setDateRange: (startDate: Date, endDate: Date) => void;
  setCompany: (company: string) => void;
  setBranch: (branch: string) => void;
  setCurrency: (currency: 'AED' | 'USD' | 'EUR') => void;
  setComparisonPeriod: (period: 'YoY' | 'QoQ' | 'MoM' | 'none') => void;
  resetFilters: () => void;
}

/**
 * UI State
 */
export interface UISlice {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

/**
 * Auth State
 */
export interface AuthSlice {
  currentUser: User | null;
  currentRole: Role | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: User | null) => void;
  setCurrentRole: (role: Role | null) => void;
  logout: () => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
}

// Default values
const DEFAULT_DATE_RANGE = {
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 12)),
  endDate: new Date(),
};

const DEFAULT_MOCK_USER: User = {
  id: 'user-001',
  email: 'mammikutty@al-watan.ae',
  name: 'Finance Manager',
  role: 'FinanceManager',
  department: 'Finance',
  company: 'Al-Watan',
  permissions: {
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
  preferences: {
    theme: 'dark',
    language: 'en',
    currency: 'AED',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Asia/Dubai',
    notificationPreferences: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      criticalAlerts: true,
      weeklyDigest: true,
      customAlerts: true,
    },
  },
  lastLogin: new Date(),
  active: true,
};

/**
 * Combined Store Type
 */
type Store = FilterSlice & UISlice & AuthSlice;

/**
 * Zustand Store with Persistence
 */
export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Filter Slice
      dateRange: DEFAULT_DATE_RANGE,
      company: 'Al-Watan',
      branch: 'Main Branch',
      currency: 'AED',
      comparisonPeriod: 'YoY',
      setDateRange: (startDate, endDate) =>
        set({ dateRange: { startDate, endDate } }),
      setCompany: (company) => set({ company }),
      setBranch: (branch) => set({ branch }),
      setCurrency: (currency) => set({ currency }),
      setComparisonPeriod: (comparisonPeriod) => set({ comparisonPeriod }),
      resetFilters: () =>
        set({
          dateRange: DEFAULT_DATE_RANGE,
          company: 'Al-Watan',
          branch: 'Main Branch',
          currency: 'AED',
          comparisonPeriod: 'YoY',
        }),

      // UI Slice
      sidebarOpen: true,
      theme: 'system',
      notifications: [],
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: `notification-${Date.now()}`,
              timestamp: new Date(),
            },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Auth Slice
      currentUser: DEFAULT_MOCK_USER,
      currentRole: 'FinanceManager',
      isAuthenticated: true,
      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isAuthenticated: user !== null,
          currentRole: user?.role || null,
        }),
      setCurrentRole: (role) => set({ currentRole: role }),
      logout: () =>
        set({
          currentUser: null,
          currentRole: null,
          isAuthenticated: false,
          notifications: [],
        }),
    }),
    {
      name: 'dashboard-store',
      partialize: (state) => ({
        dateRange: state.dateRange,
        company: state.company,
        branch: state.branch,
        currency: state.currency,
        comparisonPeriod: state.comparisonPeriod,
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        currentUser: state.currentUser,
        currentRole: state.currentRole,
      }),
    }
  )
);

/**
 * Selector Hooks (performance optimization)
 */
export const useFilters = () =>
  useStore((state) => ({
    dateRange: state.dateRange,
    company: state.company,
    branch: state.branch,
    currency: state.currency,
    comparisonPeriod: state.comparisonPeriod,
    setDateRange: state.setDateRange,
    setCompany: state.setCompany,
    setBranch: state.setBranch,
    setCurrency: state.setCurrency,
    setComparisonPeriod: state.setComparisonPeriod,
    resetFilters: state.resetFilters,
  }));

export const useUI = () =>
  useStore((state) => ({
    sidebarOpen: state.sidebarOpen,
    theme: state.theme,
    notifications: state.notifications,
    setSidebarOpen: state.setSidebarOpen,
    setTheme: state.setTheme,
    toggleSidebar: state.toggleSidebar,
    addNotification: state.addNotification,
    removeNotification: state.removeNotification,
    clearNotifications: state.clearNotifications,
  }));

export const useAuth = () =>
  useStore((state) => ({
    currentUser: state.currentUser,
    currentRole: state.currentRole,
    isAuthenticated: state.isAuthenticated,
    setCurrentUser: state.setCurrentUser,
    setCurrentRole: state.setCurrentRole,
    logout: state.logout,
  }));
