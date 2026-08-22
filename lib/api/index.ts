/**
 * API Service Index
 * Exports the configured dashboard service
 */

import { MockDashboardService } from './mockDataService';
import { setDashboardService } from './dashboardService';

// Initialize with mock service by default
const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

const mockService = new MockDashboardService();

if (useMockData) {
  setDashboardService(mockService);
}

export { dashboardService } from './dashboardService';
export type { IDashboardService } from './dashboardService';
export { MockDashboardService };
