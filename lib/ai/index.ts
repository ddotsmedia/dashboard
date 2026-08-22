/**
 * AI Module Exports
 * Central entry point for all AI service functionality
 */

// Service
export { aiService, MockAIService, APIAIService } from './aiService';
export type { IAIService, AIContext } from './aiService';

// Categories
export {
  INSIGHT_CATEGORIES,
  getCategoryInfo,
  getAllCategories,
  getCategoryColor,
  getCategoryIcon,
} from './insightCategories';
export type { InsightCategory, CategoryInfo } from './insightCategories';

// Mock Data
export {
  generateMockInsights,
  getInsightsByCategory,
  getHighConfidenceInsights,
  getMostRecentInsight,
  getTotalInsightCount,
} from './mockInsights';
export type { AIInsightWithCategory } from './mockInsights';

// Mock Responses
export { MOCK_RESPONSES, getRandomMockResponse } from './mockAIResponses';
