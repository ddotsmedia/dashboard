/**
 * AI Service
 * Interface and implementations for AI-powered insights and chat functionality
 * Supports both mock (development) and API (production) modes
 */

import type { AIInsight } from '@/types/dashboard';
import { generateMockInsights, getInsightsByCategory } from './mockInsights';
import { MOCK_RESPONSES } from './mockAIResponses';
import type { InsightCategory } from './insightCategories';

/**
 * Context for AI question answering
 */
export interface AIContext {
  timeRange?: {
    from: Date;
    to: Date;
  };
  filters?: {
    category?: InsightCategory;
    branchId?: string;
    departmentId?: string;
  };
  userId?: string;
}

/**
 * AI Service Interface
 * Defines contract for insight generation and question answering
 */
export interface IAIService {
  /**
   * Generate insights based on current data
   * @param filters - Optional filters for insights
   * @returns Promise of AI insights array
   */
  generateInsights(filters?: {
    category?: InsightCategory;
    limit?: number;
    maxDaysOld?: number;
  }): Promise<AIInsight[]>;

  /**
   * Ask the AI a question in natural language
   * @param question - User's question
   * @param context - Additional context for answering
   * @returns Promise of AI response text
   */
  askQuestion(question: string, context?: AIContext): Promise<string>;

  /**
   * Check if service is ready
   * @returns Promise that resolves when service is ready
   */
  isReady(): Promise<boolean>;
}

/**
 * Mock AI Service Implementation
 * Used in development mode for testing without backend
 */
export class MockAIService implements IAIService {
  private delay: number;

  constructor(delayMs: number = 750) {
    this.delay = delayMs;
  }

  /**
   * Simulate network delay
   */
  private async simulateDelay(): Promise<void> {
    const randomDelay = this.delay + Math.random() * 500; // 500ms variance
    return new Promise((resolve) => setTimeout(resolve, randomDelay));
  }

  /**
   * Generate mock insights
   */
  async generateInsights(filters?: {
    category?: InsightCategory;
    limit?: number;
    maxDaysOld?: number;
  }): Promise<AIInsight[]> {
    await this.simulateDelay();

    const insights = generateMockInsights({
      category: filters?.category,
      limit: filters?.limit || 10,
      maxDaysOld: filters?.maxDaysOld || 7,
    });

    // Convert to AIInsight format (remove insightCategory field)
    return insights.map(({ insightCategory, ...insight }) => insight);
  }

  /**
   * Answer questions using mock response library
   */
  async askQuestion(question: string, _context?: AIContext): Promise<string> {
    await this.simulateDelay();

    // Simple keyword matching for routing to appropriate response
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('performance') || lowerQuestion.includes('health') || lowerQuestion.includes('how is')) {
      return MOCK_RESPONSES.performance();
    } else if (lowerQuestion.includes('expense') || lowerQuestion.includes('cost')) {
      return MOCK_RESPONSES.expenses();
    } else if (lowerQuestion.includes('branch') || lowerQuestion.includes('location')) {
      return MOCK_RESPONSES.topBranch();
    } else if (lowerQuestion.includes('receivable') || lowerQuestion.includes('overdue') || lowerQuestion.includes('ar ')) {
      return MOCK_RESPONSES.overdueAR();
    } else if (lowerQuestion.includes('compare') || lowerQuestion.includes('month') || lowerQuestion.includes('period')) {
      return MOCK_RESPONSES.comparison();
    } else if (lowerQuestion.includes('cash') || lowerQuestion.includes('liquidity') || lowerQuestion.includes('position')) {
      return MOCK_RESPONSES.cashPosition();
    } else if (lowerQuestion.includes('budget') || lowerQuestion.includes('variance')) {
      return MOCK_RESPONSES.budget();
    }

    // Default response for unmatched questions
    return `I understand you're asking about: "${question}"

Based on available data, I can help with questions about:
- Overall company performance and financial health
- Expense trends and cost management
- Branch or department profitability
- Accounts receivable and collection status
- Period-over-period comparisons
- Cash position and liquidity
- Budget performance and variances

Could you rephrase your question to match one of these areas?

*Mock AI Service - Limited to predefined responses in development mode*`;
  }

  /**
   * Mock service is always ready
   */
  async isReady(): Promise<boolean> {
    return true;
  }
}

/**
 * API AI Service Implementation (Stub)
 * Used in production mode, makes actual API calls
 * This is a stub implementation - actual API integration handled separately
 */
export class APIAIService implements IAIService {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = '/api', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Generate insights via API
   */
  async generateInsights(filters?: {
    category?: InsightCategory;
    limit?: number;
    maxDaysOld?: number;
  }): Promise<AIInsight[]> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify(filters || {}),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.insights || [];
    } catch (error) {
      console.error('Error generating insights:', error);
      throw error;
    }
  }

  /**
   * Ask question via API
   */
  async askQuestion(question: string, context?: AIContext): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          question,
          context: context || {},
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response || '';
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  }

  /**
   * Check API health
   */
  async isReady(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

/**
 * Determine which service to use based on environment
 */
function createAIService(): IAIService {
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;

  if (useMockData) {
    console.log('Using Mock AI Service (development mode)');
    return new MockAIService();
  } else {
    console.log('Using API AI Service (production mode)');
    return new APIAIService(apiBaseUrl, apiKey);
  }
}

/**
 * Singleton instance of AI service
 * Automatically selects appropriate implementation based on environment
 */
export const aiService = createAIService();
