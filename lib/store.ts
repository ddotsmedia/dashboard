/**
 * Zustand Store Configuration
 * Global state management with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role } from '@/types/user';
import { DEFAULT_LAYOUT } from '@/config/defaultLayout';

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
  aiAssistantOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  toggleAIAssistant: () => void;
  setAIAssistantOpen: (open: boolean) => void;
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

/**
 * Layout State
 */
export interface Layout {
  widgetVisibility: Record<string, boolean>;
  widgetOrder: string[];
  widgetSizes: Record<string, 1 | 2 | 3 | 4>;
}

export interface DashboardSlice {
  widgetVisibility: Record<string, boolean>;
  widgetOrder: string[];
  widgetSizes: Record<string, 1 | 2 | 3 | 4>;
  savedLayouts: Record<string, Layout>;
  toggleWidget: (widgetId: string) => void;
  setWidgetOrder: (order: string[]) => void;
  setWidgetSize: (widgetId: string, size: 1 | 2 | 3 | 4) => void;
  resetLayout: () => void;
  saveLayout: (name: string, layout: Layout) => void;
  loadLayout: (name: string) => void;
  deleteLayout: (name: string) => void;
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
type Store = FilterSlice & UISlice & AuthSlice & DashboardSlice;

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
      aiAssistantOpen: false,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleAIAssistant: () => set((state) => ({ aiAssistantOpen: !state.aiAssistantOpen })),
      setAIAssistantOpen: (aiAssistantOpen) => set({ aiAssistantOpen }),
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

      // Dashboard Slice
      widgetVisibility: DEFAULT_LAYOUT.widgetVisibility,
      widgetOrder: DEFAULT_LAYOUT.widgetOrder,
      widgetSizes: DEFAULT_LAYOUT.widgetSizes,
      savedLayouts: {},
      toggleWidget: (widgetId) =>
        set((state) => ({
          widgetVisibility: {
            ...state.widgetVisibility,
            [widgetId]: !state.widgetVisibility[widgetId],
          },
        })),
      setWidgetOrder: (order) => set({ widgetOrder: order }),
      setWidgetSize: (widgetId, size) =>
        set((state) => ({
          widgetSizes: {
            ...state.widgetSizes,
            [widgetId]: size,
          },
        })),
      resetLayout: () =>
        set({
          widgetVisibility: DEFAULT_LAYOUT.widgetVisibility,
          widgetOrder: DEFAULT_LAYOUT.widgetOrder,
          widgetSizes: DEFAULT_LAYOUT.widgetSizes,
        }),
      saveLayout: (name, layout) =>
        set((state) => ({
          savedLayouts: {
            ...state.savedLayouts,
            [name]: layout,
          },
        })),
      loadLayout: (name) =>
        set((state) => {
          const layout = state.savedLayouts[name];
          if (!layout) return state;
          return {
            widgetVisibility: layout.widgetVisibility,
            widgetOrder: layout.widgetOrder,
            widgetSizes: layout.widgetSizes,
          };
        }),
      deleteLayout: (name) =>
        set((state) => {
          const { [name]: _, ...rest } = state.savedLayouts;
          return { savedLayouts: rest };
        }),
    }),
    {
      name: 'dashboard-customization',
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
        widgetVisibility: state.widgetVisibility,
        widgetOrder: state.widgetOrder,
        widgetSizes: state.widgetSizes,
        savedLayouts: state.savedLayouts,
        aiAssistantOpen: state.aiAssistantOpen,
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
    aiAssistantOpen: state.aiAssistantOpen,
    setSidebarOpen: state.setSidebarOpen,
    setTheme: state.setTheme,
    toggleSidebar: state.toggleSidebar,
    toggleAIAssistant: state.toggleAIAssistant,
    setAIAssistantOpen: state.setAIAssistantOpen,
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

/**
 * Dashboard Layout Selector Hooks
 */
export const useWidgetVisibility = () =>
  useStore((state) => ({
    widgetVisibility: state.widgetVisibility,
    toggleWidget: state.toggleWidget,
  }));

export const useWidgetOrder = () =>
  useStore((state) => ({
    widgetOrder: state.widgetOrder,
    setWidgetOrder: state.setWidgetOrder,
  }));

export const useWidgetSizes = () =>
  useStore((state) => ({
    widgetSizes: state.widgetSizes,
    setWidgetSize: state.setWidgetSize,
  }));

export const useSavedLayouts = () =>
  useStore((state) => ({
    savedLayouts: state.savedLayouts,
    saveLayout: state.saveLayout,
    loadLayout: state.loadLayout,
    deleteLayout: state.deleteLayout,
    resetLayout: state.resetLayout,
  }));

export const useDashboardLayout = () =>
  useStore((state) => ({
    widgetVisibility: state.widgetVisibility,
    widgetOrder: state.widgetOrder,
    widgetSizes: state.widgetSizes,
    savedLayouts: state.savedLayouts,
    toggleWidget: state.toggleWidget,
    setWidgetOrder: state.setWidgetOrder,
    setWidgetSize: state.setWidgetSize,
    resetLayout: state.resetLayout,
    saveLayout: state.saveLayout,
    loadLayout: state.loadLayout,
    deleteLayout: state.deleteLayout,
  }));
