# API Integration Guide

## Overview

This document outlines the API architecture, mock data strategy, and integration patterns for the Dashboard application. It provides guidance on transitioning from the mock service layer to production APIs.

## Mock Data Architecture

The application currently uses `MockDashboardService` to simulate API responses during development. This architecture provides:

### Benefits of Mock Layer
- **Development Independence**: Frontend development proceeds without backend availability
- **Consistent Testing**: Predictable responses ensure reliable test environments
- **Reduced Dependencies**: No external API keys or authentication required during development
- **Performance**: Instant responses without network latency
- **Offline Capability**: Full functionality without internet connectivity

### Current Mock Service Structure

```
services/
├── MockDashboardService.ts
├── types/
│   ├── dashboard.ts
│   ├── transaction.ts
│   └── alert.ts
└── hooks/
    ├── useDashboardData.ts
    ├── useTransactions.ts
    └── useAlerts.ts
```

The mock service is injected at the service layer, allowing seamless replacement with real API calls without changing component code.

## Transitioning from Mock to Real API

### Step-by-Step Migration Strategy

#### 1. Create API Client Layer
Create a new `services/api/` directory with typed HTTP client:

```typescript
// services/api/client.ts
import axios, { AxiosInstance } from 'axios';

interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(config: ApiConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Add auth interceptor
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  private handleError(error: any) {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        error.response.data?.message || 'API Error',
        error.response.data
      );
    }
    throw new NetworkError('Network request failed');
  }

  async get<T>(endpoint: string, params?: Record<string, any>) {
    const response = await this.client.get<T>(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: Record<string, any>) {
    const response = await this.client.post<T>(endpoint, data);
    return response.data;
  }
}

export default ApiClient;
```

#### 2. Create Service Adapter
Implement a service adapter that matches the MockDashboardService interface:

```typescript
// services/DashboardService.ts
import ApiClient from './api/client';

class DashboardService {
  constructor(private apiClient: ApiClient) {}

  async getSummary() {
    return this.apiClient.get('/dashboard/summary');
  }

  async getTransactions(filter?: TransactionFilter) {
    return this.apiClient.get('/transactions', filter);
  }

  async getAlerts() {
    return this.apiClient.get('/alerts');
  }
}

export default DashboardService;
```

#### 3. Update Dependency Injection
Modify initialization to use real API based on environment:

```typescript
// services/index.ts
const isProduction = process.env.NODE_ENV === 'production';
const apiClient = new ApiClient({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
});

export const dashboardService = isProduction
  ? new DashboardService(apiClient)
  : new MockDashboardService();
```

#### 4. Hook Updates
Hooks automatically benefit from the service layer abstraction—no changes required:

```typescript
// hooks/useDashboardData.ts remains unchanged
export function useDashboardData() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardService.getSummary();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
}
```

## API Endpoints (Specification)

### Authentication

All endpoints require Bearer token authentication:

```bash
Authorization: Bearer {token}
```

Tokens are obtained from the authentication service and stored in localStorage (client-side) or session storage (server-side).

### 1. Dashboard Summary
**Endpoint**: `GET /api/dashboard/summary`

**Description**: Retrieve aggregated dashboard metrics and KPIs

**Query Parameters**:
- `period` (optional): `day`, `week`, `month`, `year` (default: `month`)
- `currency` (optional): ISO 4217 code (default: user's preferred currency)

**Response (200 OK)**:
```json
{
  "totalBalance": 125450.50,
  "totalIncome": 8500.00,
  "totalExpenses": 2150.75,
  "transactionCount": 247,
  "alertCount": 3,
  "topCategories": [
    { "category": "Groceries", "amount": 850.00, "percentage": 39.5 },
    { "category": "Utilities", "amount": 625.00, "percentage": 29.0 },
    { "category": "Transport", "amount": 475.00, "percentage": 22.0 }
  ],
  "monthlyTrend": [
    { "month": "2025-06", "income": 7200, "expenses": 1950 },
    { "month": "2025-07", "income": 8500, "expenses": 2150 }
  ],
  "lastUpdated": "2025-08-22T10:30:00Z"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

### 2. Transactions
**Endpoint**: `GET /api/transactions`

**Description**: List transactions with filtering and pagination

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 100)
- `type` (optional): `income`, `expense`, `transfer`
- `category` (optional): Filter by category
- `status` (optional): `completed`, `pending`, `failed`
- `dateFrom` (optional): ISO 8601 date string
- `dateTo` (optional): ISO 8601 date string
- `minAmount` (optional): Minimum transaction amount
- `maxAmount` (optional): Maximum transaction amount
- `search` (optional): Search in description/recipient

**Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "txn_12345",
      "type": "expense",
      "amount": 125.50,
      "currency": "USD",
      "category": "Groceries",
      "description": "Weekly groceries",
      "recipient": "Whole Foods Market",
      "status": "completed",
      "date": "2025-08-22T14:30:00Z",
      "method": "card",
      "tags": ["food", "weekly"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 247,
    "pages": 13
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid query parameters
- `401 Unauthorized`: Missing/invalid authentication
- `429 Too Many Requests`: Rate limit exceeded

---

### 3. Alerts
**Endpoint**: `GET /api/alerts`

**Description**: Retrieve user alerts and notifications

**Query Parameters**:
- `status` (optional): `active`, `dismissed`, `resolved`
- `severity` (optional): `info`, `warning`, `critical`
- `type` (optional): `spending`, `security`, `news`, `milestone`

**Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "alert_789",
      "type": "spending",
      "severity": "warning",
      "title": "Monthly spending threshold exceeded",
      "message": "You've exceeded your monthly budget by $125.50",
      "actionUrl": "/dashboard/budgets",
      "dismissible": true,
      "createdAt": "2025-08-22T10:00:00Z",
      "status": "active"
    }
  ],
  "summary": {
    "critical": 1,
    "warning": 2,
    "info": 5
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid authentication
- `429 Too Many Requests`: Rate limit exceeded

---

### 4. AI Insights
**Endpoint**: `POST /api/ai/insights`

**Description**: Generate AI-powered financial insights

**Request Body**:
```json
{
  "type": "spending_analysis",
  "period": "month",
  "categories": ["Groceries", "Transport"],
  "compareWith": "previous_period"
}
```

**Response (200 OK)**:
```json
{
  "insight": "Your grocery spending has increased by 15% compared to last month. Consider meal planning to optimize expenses.",
  "confidence": 0.87,
  "recommendation": "Create a weekly meal budget",
  "impactEstimate": 125.50,
  "generatedAt": "2025-08-22T10:30:00Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: Missing/invalid authentication
- `503 Service Unavailable`: AI service temporarily unavailable

---

### 5. AI Chat
**Endpoint**: `POST /api/ai/chat`

**Description**: Interactive chat endpoint for financial assistance

**Request Body**:
```json
{
  "message": "What should I do about my high grocery spending?",
  "context": {
    "recentTransactions": true,
    "budget": true
  }
}
```

**Response (200 OK)**:
```json
{
  "message": "Based on your recent transactions, I notice you spend about $850 monthly on groceries...",
  "suggestions": [
    "Meal planning",
    "Use loyalty programs",
    "Buy generic brands"
  ],
  "followUpQuestions": [
    "Would you like to set a grocery budget?"
  ],
  "conversationId": "conv_12345",
  "timestamp": "2025-08-22T10:30:00Z"
}
```

**Error Responses**:
- `400 Bad Request`: Invalid message format
- `401 Unauthorized`: Missing/invalid authentication
- `429 Too Many Requests`: Rate limit exceeded (AI chat has separate limits)

## Authentication

### Bearer Token Mechanism

1. **Obtaining Token**: Authenticate via login endpoint (not specified here)
2. **Storing Token**: Store in localStorage with expiration
3. **Sending Token**: Include in `Authorization` header for all requests
4. **Refreshing Token**: Implement token refresh mechanism before expiration

```typescript
// utils/auth.ts
export function setAuthToken(token: string, expiresIn: number) {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_token_expires', 
    (Date.now() + expiresIn * 1000).toString());
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem('auth_token');
  const expires = localStorage.getItem('auth_token_expires');
  
  if (!token || !expires) return null;
  if (parseInt(expires) < Date.now()) {
    clearAuthToken();
    return null;
  }
  
  return token;
}

export function clearAuthToken() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token_expires');
}
```

### Token Refresh Strategy

```typescript
// Implement in API client interceptor
async refreshToken() {
  try {
    const response = await this.client.post('/auth/refresh', {
      refreshToken: localStorage.getItem('refresh_token')
    });
    setAuthToken(response.data.token, response.data.expiresIn);
    return response.data.token;
  } catch (error) {
    clearAuthToken();
    window.location.href = '/login';
    throw error;
  }
}
```

## Error Handling

### HTTP Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | Success | Proceed normally |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validate client request parameters |
| 401 | Unauthorized | Re-authenticate user |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Endpoint or resource doesn't exist |
| 429 | Too Many Requests | Implement exponential backoff |
| 500 | Server Error | Retry with exponential backoff |
| 503 | Service Unavailable | Retry with exponential backoff |

### Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "User-friendly error message",
    "details": {
      "field": "amount",
      "reason": "Exceeds available balance"
    },
    "requestId": "req_12345",
    "timestamp": "2025-08-22T10:30:00Z"
  }
}
```

### Error Handling in Hooks

```typescript
// Example error handling pattern
export function useDashboardData() {
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dashboardService.getSummary();
        setData(result);
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            // Handle unauthorized - redirect to login
            window.location.href = '/login';
          } else if (err.status === 429) {
            // Handle rate limit - implement backoff
            setTimeout(() => fetchData(), 5000);
          } else {
            setError(err);
          }
        }
      }
    };

    fetchData();
  }, []);

  return { error };
}
```

## Rate Limiting

### Rate Limit Specification
- **Limit**: 100 requests per minute per user
- **Window**: 60-second rolling window
- **Quota Reset**: Automatic reset every 60 seconds

### Rate Limit Headers

Response headers include rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1629638460
```

### Client-Side Rate Limit Handling

```typescript
// services/api/rateLimiter.ts
class RateLimiter {
  private queue: (() => Promise<any>)[] = [];
  private isProcessing = false;
  private remaining = 100;
  private resetTime = Date.now() + 60000;

  async execute<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    // Check if rate limit window has reset
    if (Date.now() > this.resetTime) {
      this.remaining = 100;
      this.resetTime = Date.now() + 60000;
    }

    if (this.remaining <= 0) {
      const waitTime = this.resetTime - Date.now();
      setTimeout(() => this.processQueue(), Math.max(100, waitTime));
      return;
    }

    this.isProcessing = true;
    const request = this.queue.shift();

    if (request) {
      this.remaining--;
      await request();
    }

    this.isProcessing = false;
    this.processQueue();
  }

  updateFromHeaders(headers: Record<string, string>) {
    const limit = parseInt(headers['x-ratelimit-limit'] || '100');
    this.remaining = parseInt(headers['x-ratelimit-remaining'] || '100');
    this.resetTime = parseInt(headers['x-ratelimit-reset'] || '0') * 1000;
  }
}

export default RateLimiter;
```

### Exponential Backoff Strategy

```typescript
// utils/retry.ts
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts = 3
): Promise<T> {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
        const jitter = Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay + jitter));
      }
    }
  }

  throw lastError;
}
```

## API Response Caching

### Cache Strategy

- **Dashboard Summary**: 5 minutes
- **Transactions**: 2 minutes (user can force refresh)
- **Alerts**: 1 minute
- **AI Insights**: No caching (fresh each time)

```typescript
// utils/cache.ts
class Cache {
  private store: Map<string, { data: any; expiresAt: number }> = new Map();

  set(key: string, data: any, ttlSeconds: number) {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  get<T>(key: string): T | null {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.data;
  }

  clear(key?: string) {
    if (key) {
      this.store.delete(key);
    } else {
      this.store.clear();
    }
  }
}

export default new Cache();
```

## Environment Configuration

### Development
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000
REACT_APP_MOCK_API=true
```

### Staging
```env
REACT_APP_API_URL=https://staging-api.example.com/api
REACT_APP_API_TIMEOUT=30000
REACT_APP_MOCK_API=false
```

### Production
```env
REACT_APP_API_URL=https://api.example.com/api
REACT_APP_API_TIMEOUT=30000
REACT_APP_MOCK_API=false
```

## Testing API Integration

### Unit Testing with Mock Responses

```typescript
// __tests__/services/DashboardService.test.ts
import { MockAdapter } from 'axios-mock-adapter';
import apiClient from 'services/api/client';
import DashboardService from 'services/DashboardService';

describe('DashboardService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(apiClient.client);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('getSummary returns dashboard data', async () => {
    const mockData = { totalBalance: 100000 };
    mockAxios.onGet('/dashboard/summary').reply(200, mockData);

    const service = new DashboardService(apiClient);
    const result = await service.getSummary();

    expect(result).toEqual(mockData);
  });

  test('handles 429 rate limit error', async () => {
    mockAxios.onGet('/dashboard/summary').reply(429, {
      error: { code: 'RATE_LIMIT_EXCEEDED' }
    });

    const service = new DashboardService(apiClient);
    await expect(service.getSummary()).rejects.toThrow();
  });
});
```

## Monitoring & Logging

### API Request Logging

```typescript
// Implement in API client
private setupLogging() {
  this.client.interceptors.request.use((config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  });

  this.client.interceptors.response.use(
    (response) => {
      console.log(`[API] ✓ ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error(`[API] ✗ ${error.response?.status} ${error.config?.url}`);
      return Promise.reject(error);
    }
  );
}
```

## Deployment Checklist

- [ ] API endpoints deployed to production
- [ ] Authentication tokens configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] CORS headers configured correctly
- [ ] API key/secrets in environment variables
- [ ] Error logging and monitoring enabled
- [ ] Performance metrics tracked (latency, error rates)
- [ ] Fallback to mock service documented
- [ ] API documentation deployed
- [ ] Team trained on new API integration
