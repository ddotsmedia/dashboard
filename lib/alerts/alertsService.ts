/**
 * Alerts Service
 * Handles alert operations: retrieval, dismissal, marking as read, filtering by resource
 */

import type { Alert } from '@/types/dashboard';
import { alertsMock } from '@/data/mock/dashboardData';

// In-memory storage for alert states (read/dismissed status)
// In a real app, this would be persisted to a database
const alertStates: Map<string, { read: boolean; dismissed: boolean }> = new Map();

// Initialize alert states from mock data
alertsMock.forEach((alert) => {
  alertStates.set(alert.id, {
    read: alert.read ?? false,
    dismissed: alert.dismissed ?? false,
  });
});

/**
 * Get all alerts, optionally filtered by severity
 * Returns alerts that haven't been dismissed
 */
export async function getAlerts(severity?: string): Promise<Alert[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let alerts = alertsMock.filter((alert) => {
    const state = alertStates.get(alert.id);
    return !state?.dismissed;
  });

  // Apply severity filter if provided
  if (severity && severity !== 'all') {
    alerts = alerts.filter((alert) => {
      const type = alert.type || alert.severity?.toLowerCase();
      return type === severity.toLowerCase();
    });
  }

  // Merge alert state from in-memory storage
  return alerts.map((alert) => {
    const state = alertStates.get(alert.id);
    return {
      ...alert,
      read: state?.read ?? false,
      dismissed: state?.dismissed ?? false,
    };
  });
}

/**
 * Dismiss an alert by ID
 */
export async function dismissAlert(alertId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  const state = alertStates.get(alertId);
  if (state) {
    state.dismissed = true;
  } else {
    alertStates.set(alertId, { read: false, dismissed: true });
  }
}

/**
 * Mark an alert as read by ID
 */
export async function markAlertAsRead(alertId: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  const state = alertStates.get(alertId);
  if (state) {
    state.read = true;
  } else {
    alertStates.set(alertId, { read: true, dismissed: false });
  }
}

/**
 * Get alerts filtered by resource type and ID
 * e.g., getAlertsByResource('receivable', 'cust-001')
 */
export async function getAlertsByResource(resourceType: string, resourceId?: string): Promise<Alert[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const alerts = alertsMock.filter((alert) => {
    const state = alertStates.get(alert.id);
    if (state?.dismissed) return false;
    if (!alert.resourceType) return false;
    if (alert.resourceType !== resourceType) return false;
    if (resourceId && alert.resourceId !== resourceId) return false;
    return true;
  });

  // Merge alert state from in-memory storage
  return alerts.map((alert) => {
    const state = alertStates.get(alert.id);
    return {
      ...alert,
      read: state?.read ?? false,
      dismissed: state?.dismissed ?? false,
    };
  });
}

/**
 * Get count of unread alerts
 */
export async function getUnreadAlertCount(): Promise<number> {
  const alerts = await getAlerts();
  return alerts.filter((alert) => !alert.read).length;
}
