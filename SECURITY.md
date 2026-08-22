# Security Guide

## Overview

This document outlines security best practices, threat mitigation strategies, and compliance requirements for the Dashboard application. Security is a continuous process that requires diligent implementation and regular auditing.

## Environment Variables and Secrets Management

### Critical Rule: Never Commit .env Files

Environment files containing sensitive information must NEVER be committed to version control.

### Protected Files

These files must be in `.gitignore`:
```
.env
.env.local
.env.*.local
.env.production
.env.staging
.env.development
.env.test
.secrets
.credentials
*.pem
*.key
```

### Verify .gitignore

```bash
# Check if .env files are ignored
cat .gitignore | grep "\.env"

# Verify no .env files committed
git ls-files | grep "\.env"
```

### Environment Variable Categories

#### Development Environment
```env
# These are safe to commit or use in development
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_MOCK_API=true
REACT_APP_LOG_LEVEL=debug
REACT_APP_ENABLE_DEVTOOLS=true
```

#### Production Environment
```env
# NEVER commit these - use environment variable injection in deployment
API_KEY=[sensitive-production-key]
DATABASE_URL=[sensitive-database-url]
JWT_SECRET=[sensitive-jwt-secret]
ENCRYPTION_KEY=[sensitive-encryption-key]
OAUTH_CLIENT_SECRET=[sensitive-oauth-secret]
```

### Secure Secrets Management Strategies

#### 1. Environment Variable Injection (Recommended)
```bash
# During deployment, inject secrets from secure vault
docker run \
  -e API_KEY=$(aws secretsmanager get-secret-value --secret-id api-key) \
  my-dashboard-app
```

#### 2. HashiCorp Vault
```bash
# Retrieve secrets from Vault
vault kv get secret/dashboard/production
```

#### 3. AWS Secrets Manager
```typescript
// Retrieve secrets at runtime
import AWS from 'aws-sdk';

const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName: string) {
  try {
    const data = await secretsManager
      .getSecretValue({ SecretId: secretName })
      .promise();
    return JSON.parse(data.SecretString || '');
  } catch (error) {
    console.error(`Failed to retrieve secret: ${secretName}`);
    throw error;
  }
}
```

#### 4. GitHub Secrets (For CI/CD)
```yaml
# .github/workflows/deploy.yml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
    JWT_SECRET: ${{ secrets.JWT_SECRET }}
  run: npm run deploy
```

### Rotating Secrets

- [ ] Establish secret rotation schedule (every 90 days minimum)
- [ ] Maintain secret history for backward compatibility
- [ ] Test rotation process before production
- [ ] Monitor for failed authentication after rotation
- [ ] Document rotation procedure
- [ ] Automate secret rotation if possible
- [ ] Alert on suspicious secret access

## Dependency Management

### npm Audit and Vulnerability Management

#### Running Security Audits

```bash
# Check for vulnerabilities in dependencies
npm audit

# Get detailed vulnerability report
npm audit --long

# Check specific package
npm audit --package lodash

# Export audit results to JSON
npm audit --json > audit-report.json
```

#### Understanding Audit Output

```
| Package | Severity | Type | CVSS Score |
|---------|----------|------|-----------|
| lodash  | high     | CWE  | 7.5       |
```

#### Remediation Steps

```bash
# Update vulnerable package
npm update lodash@latest

# Or install specific version
npm install lodash@4.17.21

# Update all dependencies (use cautiously)
npm update

# Audit again after update
npm audit
```

### Automated Dependency Checking

#### GitHub Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "security-team"
    commit-message:
      prefix: "security: "
      include: "scope"
```

#### Pre-Commit Hook

```bash
#!/bin/bash
# .husky/pre-commit

echo "Running npm audit..."
npm audit

if [ $? -ne 0 ]; then
  echo "Security vulnerabilities found. Fix with: npm audit fix"
  exit 1
fi
```

### Dependency Policies

- [ ] Review all new dependencies for security history
- [ ] Avoid unmaintained packages
- [ ] Use pinned versions for production (not ^, ~)
- [ ] Regularly update dependencies (weekly)
- [ ] Test updates thoroughly before deployment
- [ ] Monitor CVE databases for known vulnerabilities
- [ ] Subscribe to security mailing lists for key packages

## HTTPS Enforcement

### Development Environment

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365

# Use in development server
npm run dev -- --https --cert cert.pem --key key.pem
```

### Production Environment

#### Automatic HTTPS Redirection

```typescript
// middleware/https-redirect.ts
export function httpsRedirect(req: Request, res: Response, next: Function) {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
}

// Apply middleware
app.use(httpsRedirect);
```

#### HSTS Header Configuration

```typescript
// middleware/security-headers.ts
import helmet from 'helmet';

app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  })
);
```

### Deployment Checklist

- [ ] SSL/TLS certificate installed and valid
- [ ] Certificate from trusted CA (not self-signed)
- [ ] HTTPS enforced with 301 redirect
- [ ] HSTS header configured (min-age: 31536000)
- [ ] Certificate renewal automated
- [ ] No mixed content (HTTP resources on HTTPS page)
- [ ] Certificate expiration monitored
- [ ] Certificate chain complete
- [ ] TLS version 1.2+ only
- [ ] Strong cipher suites configured

## CORS Policy Configuration

### Understanding CORS

Cross-Origin Resource Sharing (CORS) controls which domains can access your API. Misconfiguration can expose your application to attacks.

### Safe CORS Configuration

```typescript
// server/middleware/cors.ts
import cors from 'cors';

const allowedOrigins = [
  'https://dashboard.example.com',
  'https://app.example.com',
  // Development only:
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
].filter(Boolean);

const corsOptions = {
  origin: (origin: string, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600, // Preflight cache 10 minutes
};

app.use(cors(corsOptions));
```

### CORS Header Best Practices

| Header | Purpose | Value |
|--------|---------|-------|
| Access-Control-Allow-Origin | Allowed origins | Specific domain (not *) |
| Access-Control-Allow-Methods | Allowed HTTP methods | GET, POST, PUT, DELETE |
| Access-Control-Allow-Headers | Allowed request headers | Content-Type, Authorization |
| Access-Control-Allow-Credentials | Allow cookies | true or false |
| Access-Control-Max-Age | Preflight cache time | 600 (seconds) |

### Never Use Wildcard (*) CORS

```typescript
// DANGEROUS - Never do this in production
app.use(cors({ origin: '*' })); // ❌ Allows any origin

// CORRECT - Explicit allowlist
app.use(cors({ origin: 'https://example.com' })); // ✓ Secure
```

### Testing CORS

```bash
# Test preflight request
curl -X OPTIONS https://api.example.com/data \
  -H "Origin: https://app.example.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

### CORS Configuration Checklist

- [ ] Whitelist specific domains (never use *)
- [ ] Credentials only when necessary
- [ ] Methods limited to required operations
- [ ] Headers list minimal but complete
- [ ] Preflight cache set appropriately
- [ ] No sensitive data in CORS responses
- [ ] Regular audit of allowed origins
- [ ] Remove development origins in production

## XSS Prevention (Cross-Site Scripting)

### React Default Protection

React escapes values by default, preventing most XSS attacks:

```typescript
// Safe - React escapes the value
const message = "<script>alert('xss')</script>";
const element = <div>{message}</div>; // Displays text, not script

// Output: <div>&lt;script&gt;alert('xss')&lt;/script&gt;</div>
```

### Dangerous Patterns to Avoid

#### 1. Dangerous: innerHTML

```typescript
// DANGEROUS - Never do this
const element = document.getElementById('container');
element.innerHTML = userInput; // ❌ Can execute scripts

// CORRECT - Use React state or textContent
const [content, setContent] = useState(userInput);
<div>{content}</div> // ✓ Automatically escaped
```

#### 2. Dangerous: dangerouslySetInnerHTML

```typescript
// DANGEROUS - Only use for trusted content
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // ❌ Risk

// CORRECT - Parse and sanitize if necessary
import DOMPurify from 'dompurify';
const sanitized = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitized }} /> // ✓ Safer
```

#### 3. Dangerous: eval()

```typescript
// DANGEROUS - Never use eval
eval(userInput); // ❌ Massive security risk

// CORRECT - Use safe alternatives
const result = JSON.parse(userInput); // ✓ Safer for JSON
```

### XSS Prevention Best Practices

1. **Content Security Policy (CSP)**

```typescript
// middleware/csp.ts
import helmet from 'helmet';

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.example.com'],
      styleSrc: ["'self'", "'unsafe-inline'"], // Minimize unsafe-inline
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.example.com'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
```

2. **Input Validation**

```typescript
// utils/validation.ts
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 1000); // Limit length
};

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

3. **Output Encoding**

```typescript
// React automatically encodes:
const userInput = '<img src=x onerror="alert(1)">';
<p>{userInput}</p> // Safe - text content only

// For HTML attributes:
<div data-value={userInput} /> // Safe - React escapes attributes
```

4. **Security Headers**

```typescript
import helmet from 'helmet';

app.use(helmet());

app.use(
  helmet({
    xssFilter: true, // Enable X-XSS-Protection header
    noSniff: true, // Prevent MIME sniffing
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);
```

### XSS Testing

```bash
# Test for XSS vulnerabilities
<img src=x onerror="alert('XSS')">
<svg onload="alert('XSS')">
<iframe src="javascript:alert('XSS')">
<body onload="alert('XSS')">
```

## CSRF Protection (Future Implementation)

### What is CSRF?

Cross-Site Request Forgery (CSRF) tricks users into performing unwanted actions. Protection requires validating that requests originate from your application.

### Future Implementation Plan

```typescript
// middleware/csrf.ts (Future)
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: false });

// GET request - send token to client
app.get('/form', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// POST request - verify token
app.post('/form', csrfProtection, (req, res) => {
  // Token verified by middleware
  res.json({ success: true });
});
```

### Client-Side Implementation

```typescript
// hooks/useCsrfToken.ts (Future)
export function useCsrfToken() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setToken(data.csrfToken));
  }, []);

  return token;
}

// Usage in form
export function MyForm() {
  const csrfToken = useCsrfToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/form', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### CSRF Protection Checklist (Future)

- [ ] CSRF tokens generated for all forms
- [ ] Tokens validated server-side
- [ ] Tokens unique per user session
- [ ] Tokens expire appropriately
- [ ] Token stored securely (not in URL)
- [ ] POST/PUT/DELETE require token verification
- [ ] GET requests don't modify data
- [ ] Testing for CSRF vulnerabilities automated

## Rate Limiting

### Rate Limit Implementation

```typescript
// middleware/rate-limit.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from 'redis';

const client = redis.createClient();

const apiLimiter = rateLimit({
  store: new RedisStore({
    client: client,
    prefix: 'rl:', // Rate limit key prefix
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
      retryAfter: req.rateLimit.resetTime,
    });
  },
});

// Apply to all API routes
app.use('/api/', apiLimiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
});

app.post('/auth/login', authLimiter, loginHandler);
```

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1629638460
```

### Distributed Rate Limiting

For multi-server deployments, use Redis:

```typescript
// Shared rate limit store across all servers
const store = new RedisStore({
  client: redisClient,
  prefix: 'api-limit:',
});

const limiter = rateLimit({
  store: store,
  windowMs: 60000,
  max: 100,
});
```

### Rate Limiting Checklist

- [ ] Rate limits configured for all endpoints
- [ ] Stricter limits for sensitive operations
- [ ] Distributed rate limiting for multi-server deployments
- [ ] Rate limit headers returned
- [ ] User-friendly rate limit error messages
- [ ] Monitoring for rate limit violations
- [ ] Whitelist for internal/trusted IPs (if applicable)
- [ ] Rate limits documented in API docs

## Audit Logging (Future Implementation)

### Audit Log Strategy

```typescript
// services/audit-logger.ts (Future)
interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  changes?: Record<string, any>;
  result: 'success' | 'failure';
  errorMessage?: string;
}

class AuditLogger {
  async log(entry: AuditLog): Promise<void> {
    // Store in immutable log database
    await auditLogDatabase.insert(entry);
    
    // Alert on sensitive operations
    if (this.isSensitiveAction(entry.action)) {
      await this.alertSecurityTeam(entry);
    }
  }

  private isSensitiveAction(action: string): boolean {
    return ['DELETE', 'GRANT_PERMISSION', 'EXPORT_DATA'].includes(action);
  }
}
```

### Loggable Events

- User login/logout
- Permission grants/revocations
- Data access and modifications
- Failed authentication attempts
- API key generation/rotation
- Configuration changes
- Bulk operations
- User account changes

### Audit Log Retention

- [ ] Logs retained for minimum 1 year
- [ ] Compliance with data retention regulations
- [ ] Logs stored securely (encrypted)
- [ ] Logs immutable (append-only)
- [ ] Regular audit log reviews
- [ ] Automated alerting for suspicious activity
- [ ] Restricted access to audit logs

## Security Headers

### Complete Security Headers Configuration

```typescript
// middleware/security-headers.ts
import helmet from 'helmet';

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-cdn.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'"],
        connectSrc: ["'self'", 'https://api.example.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true,
  })
);
```

### Header Descriptions

| Header | Purpose | Value |
|--------|---------|-------|
| Strict-Transport-Security | Force HTTPS | max-age=31536000; includeSubDomains |
| X-Content-Type-Options | Prevent MIME sniffing | nosniff |
| X-Frame-Options | Prevent clickjacking | DENY |
| X-XSS-Protection | Enable browser XSS filter | 1; mode=block |
| Content-Security-Policy | Control resource loading | directives... |
| Referrer-Policy | Control referrer info | strict-origin-when-cross-origin |

## Security Testing

### Automated Security Testing

```bash
# OWASP Dependency Check
dependency-check.sh --project "Dashboard" --scan .

# SonarQube analysis
sonar-scanner \
  -Dsonar.projectKey=dashboard \
  -Dsonar.sources=src

# Snyk vulnerability scanning
snyk test
```

### Manual Security Testing

- [ ] Test for injection vulnerabilities
- [ ] Test for broken authentication
- [ ] Test for sensitive data exposure
- [ ] Test for XML external entities (XXE)
- [ ] Test for broken access control
- [ ] Test for security misconfiguration
- [ ] Test for XSS vulnerabilities
- [ ] Test for insecure deserialization
- [ ] Test for using components with known vulnerabilities
- [ ] Test for insufficient logging and monitoring

### Penetration Testing

- [ ] Annual penetration testing
- [ ] Pre-release security assessment
- [ ] Third-party security audit
- [ ] Bug bounty program (consider implementing)

## Incident Response

### Security Incident Procedures

1. **Detect**: Monitor logs for suspicious activity
2. **Assess**: Determine scope and severity
3. **Contain**: Isolate affected systems
4. **Eradicate**: Remove malicious code/access
5. **Recover**: Restore systems to normal
6. **Lessons Learned**: Document and improve

### Incident Response Team

- [ ] Security lead
- [ ] Engineering lead
- [ ] DevOps/Infrastructure
- [ ] Legal/Compliance
- [ ] Communications

### Incident Response Checklist

- [ ] Incident response plan documented
- [ ] Team trained on procedures
- [ ] Contact information current
- [ ] Communication templates prepared
- [ ] Rollback procedures documented
- [ ] Post-incident review process established

## Security Compliance

### Compliance Requirements

- [ ] OWASP Top 10 mitigations
- [ ] GDPR data privacy (if applicable)
- [ ] SOC 2 requirements (if applicable)
- [ ] Industry-specific regulations
- [ ] Regular security audits
- [ ] Vulnerability remediation SLA
- [ ] Privacy policy updated
- [ ] Terms of service reviewed

### Regular Security Reviews

- [ ] Quarterly: Dependency audits
- [ ] Quarterly: Security headers review
- [ ] Semi-annual: Penetration testing
- [ ] Annual: Full security assessment
- [ ] Monthly: Log analysis for suspicious activity

## Developer Security Checklist

Before committing code:

- [ ] No secrets in code
- [ ] No hardcoded passwords/tokens
- [ ] Input properly validated
- [ ] Output properly escaped
- [ ] HTTPS used for external requests
- [ ] Proper error handling (no stack traces exposed)
- [ ] Dependencies up-to-date
- [ ] No console.log with sensitive data
- [ ] Authentication/authorization verified
- [ ] SQL injection prevention (if using database)
- [ ] No eval() or similar dangerous functions
- [ ] Code reviewed by another developer

## Security Monitoring

### Tools and Services

1. **Application Monitoring**: Sentry, DataDog
2. **Dependency Monitoring**: Snyk, Dependabot
3. **Infrastructure Monitoring**: CloudWatch, New Relic
4. **Log Aggregation**: ELK Stack, Splunk
5. **Threat Intelligence**: OWASP, CVE Database

### Alerting Rules

- [ ] Multiple failed login attempts
- [ ] Unusual API access patterns
- [ ] High error rates
- [ ] Spike in data access
- [ ] Configuration changes
- [ ] Dependency vulnerability discovered
