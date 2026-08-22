# Deployment Guide

## Production Environment

**Server Details:**
- **Host**: 194.164.151.202
- **Port**: 3115
- **Application Name**: accounts-web
- **Process Manager**: PM2

## Prerequisites

Before deploying, ensure the server has:

- **Node.js 18+** or higher
- **npm 9+** or higher
- **PM2** (Process manager)
- **Nginx** (Reverse proxy)
- **Git** (for pulling code)
- **SSL/TLS certificates** (Let's Encrypt/Certbot)
- **Sudo access** for system configuration

### Install Prerequisites on Server

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ (using NodeSource repository)
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

## Deployment Steps

### 1. SSH into Server

```bash
ssh user@194.164.151.202
cd /var/www/accounts-dashboard
```

### 2. Pull Latest Code

```bash
git pull origin main
```

### 3. Install Production Dependencies

```bash
npm install --production
```

### 4. Run Quality Checks

```bash
# Lint code
npm run lint

# Type checking
npm run type-check
```

### 5. Build Application

```bash
npm run build
```

### 6. Restart with PM2

```bash
pm2 restart accounts-web
```

### 7. Verify Deployment

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs accounts-web

# Test endpoint
curl http://localhost:3115
```

## Automated Deployment Script

Use the included `deploy.sh` script for one-command deployment:

```bash
chmod +x deploy.sh
./deploy.sh
```

The script handles:
- Pulling latest code
- Installing dependencies
- Running linter and type checker
- Building application
- Restarting PM2
- Confirming completion

## Nginx Reverse Proxy Configuration

Create `/etc/nginx/sites-available/accounts-web`:

```nginx
upstream accounts_web {
    server localhost:3115;
}

server {
    listen 80;
    listen [::]:80;
    server_name api.al-watan.ae;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.al-watan.ae;

    # SSL Certificate Configuration
    ssl_certificate /etc/letsencrypt/live/api.al-watan.ae/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.al-watan.ae/privkey.pem;

    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/accounts-web-access.log combined;
    error_log /var/log/nginx/accounts-web-error.log;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=general:10m rate=100r/s;
    limit_req zone=general burst=200 nodelay;

    # Reverse Proxy to Node.js
    location / {
        proxy_pass http://accounts_web;
        proxy_http_version 1.1;

        # Proxy Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static Assets Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://accounts_web;
    }

    # Next.js Static Files
    location /.next/ {
        expires 1d;
        add_header Cache-Control "public";
        proxy_pass http://accounts_web;
    }
}
```

### Enable Nginx Site

```bash
sudo ln -s /etc/nginx/sites-available/accounts-web /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

## SSL/TLS Certificate Setup

### Install SSL Certificate with Certbot

```bash
# For automatic setup (Let's Encrypt)
sudo certbot --nginx -d api.al-watan.ae

# Or manual setup
sudo certbot certonly --standalone -d api.al-watan.ae
```

### Auto-Renewal

Certbot automatically sets up renewal via cron. Verify:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

## PM2 Configuration

The project includes `ecosystem.config.cjs` for PM2. Deploy with:

```bash
pm2 start ecosystem.config.cjs --env production
```

Or restart existing instance:

```bash
pm2 restart accounts-web
```

## Monitoring & Logs

### View Real-time Logs

```bash
# All PM2 logs
pm2 logs

# Specific app logs
pm2 logs accounts-web

# Last 100 lines
pm2 logs accounts-web --lines 100
```

### Monitor Process Status

```bash
# View all processes
pm2 status

# View detailed info
pm2 info accounts-web

# Save PM2 process list
pm2 save

# Resurrect on server restart
pm2 startup
```

### Check System Resources

```bash
# CPU and memory usage
pm2 monit

# Specific application memory
ps aux | grep node
```

### Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/accounts-web-access.log

# Error logs
tail -f /var/log/nginx/accounts-web-error.log
```

## Environment Variables

Set production environment variables in `.env.local` or `ecosystem.config.cjs`:

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.al-watan.ae
PORT=3115
```

Or in PM2 config's `env` section:

```javascript
env: {
  NODE_ENV: 'production',
  NEXT_PUBLIC_API_URL: 'https://api.al-watan.ae',
  PORT: 3115
}
```

## Rollback Procedure

If deployment fails or issues occur, rollback to previous version:

### Quick Rollback (Git-based)

```bash
cd /var/www/accounts-dashboard

# View git log
git log --oneline -10

# Rollback to previous commit
git reset --hard <commit-hash>

# Reinstall and rebuild
npm install --production
npm run build

# Restart PM2
pm2 restart accounts-web
```

### Using PM2 Graceful Reload

For zero-downtime deployment:

```bash
pm2 gracefulReload accounts-web
```

### Keeping Previous Builds

Save previous build before deploying:

```bash
# Backup current build
cp -r dist dist-backup-$(date +%Y%m%d_%H%M%S)

# Deploy new version
git pull && npm install --production && npm run build

# If needed, restore backup
rm -rf dist
mv dist-backup-<timestamp> dist
pm2 restart accounts-web
```

## Troubleshooting Deployment

### Application Won't Start

```bash
# Check logs
pm2 logs accounts-web

# Verify Node version
node --version

# Check port availability
sudo netstat -tulpn | grep 3115

# Manually start to see errors
cd /var/www/accounts-dashboard
npm run build
npm start
```

### Nginx Not Proxying Correctly

```bash
# Test nginx configuration
sudo nginx -t

# Check if Node.js app is running
curl http://localhost:3115

# Check Nginx logs
tail -f /var/log/nginx/accounts-web-error.log
```

### Out of Disk Space

```bash
# Check disk usage
df -h

# Clean npm cache
npm cache clean --force

# Remove old PM2 logs
pm2 flush
```

### High Memory Usage

```bash
# Check process memory
pm2 monit

# Increase max memory in ecosystem.config.cjs
# then restart

# Clear node cache
pm2 kill
pm2 resurrect
```

## Deployment Checklist

- [ ] Code reviewed and merged to main
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] Database migrations complete (if needed)
- [ ] SSL certificate valid and configured
- [ ] Nginx configuration tested
- [ ] PM2 process started successfully
- [ ] Health check endpoint returns 200
- [ ] Logs show no errors
- [ ] Monitor first 30 minutes of deployment
- [ ] Performance metrics acceptable

## Performance Optimization

### Enable Caching Headers

Already configured in Nginx config above. Verify:

```bash
curl -I https://api.al-watan.ae/
# Look for Cache-Control headers
```

### Monitor Performance

```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://api.al-watan.ae/

# Monitor PM2 resources
pm2 monit
```

### Database Connection Pool

Ensure database connection limits are appropriate:

```javascript
// In your database config
const poolConfig = {
  max: 10,
  min: 2,
  idle: 10000,
  acquire: 30000,
};
```

## Disaster Recovery

### Backup Strategy

```bash
# Daily backup of application
0 2 * * * tar -czf /backup/dashboard-$(date +\%Y\%m\%d).tar.gz /var/www/accounts-dashboard

# Database backup (if applicable)
0 3 * * * mysqldump -u user -p'password' database > /backup/db-$(date +\%Y\%m\%d).sql
```

### Restore from Backup

```bash
# Restore application
cd /var/www
tar -xzf /backup/dashboard-20240101.tar.gz

# Restart
pm2 restart accounts-web
```

## Support & Monitoring

For issues or questions:

- Check logs: `pm2 logs accounts-web`
- Review Nginx logs: `/var/log/nginx/accounts-web-error.log`
- Check server resources: `top`, `htop`, `pm2 monit`
- Review application metrics and uptime
