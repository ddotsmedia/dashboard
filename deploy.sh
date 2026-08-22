#!/bin/bash

# Deployment script for accounts-web application
# Usage: ./deploy.sh

set -e  # Exit on any error

echo "=========================================="
echo "Starting Deployment for accounts-web"
echo "=========================================="
echo ""

# Step 1: Pull latest code
echo "Step 1/5: Pulling latest code from repository..."
git pull origin main
if [ $? -eq 0 ]; then
  echo "✓ Code pulled successfully"
else
  echo "✗ Failed to pull code"
  exit 1
fi
echo ""

# Step 2: Install production dependencies
echo "Step 2/5: Installing production dependencies..."
npm install --production
if [ $? -eq 0 ]; then
  echo "✓ Dependencies installed successfully"
else
  echo "✗ Failed to install dependencies"
  exit 1
fi
echo ""

# Step 3: Run linter
echo "Step 3/5: Running ESLint..."
npm run lint
if [ $? -eq 0 ]; then
  echo "✓ Lint passed"
else
  echo "⚠ Lint warnings/errors found (not blocking deployment)"
fi
echo ""

# Step 4: Type checking
echo "Step 4/5: Running TypeScript type checker..."
npm run type-check
if [ $? -eq 0 ]; then
  echo "✓ Type check passed"
else
  echo "✗ Type check failed"
  exit 1
fi
echo ""

# Step 5: Build application
echo "Step 5/5: Building application for production..."
npm run build
if [ $? -eq 0 ]; then
  echo "✓ Build completed successfully"
else
  echo "✗ Build failed"
  exit 1
fi
echo ""

# Step 6: Restart PM2
echo "Restarting PM2 process 'accounts-web'..."
pm2 restart accounts-web
if [ $? -eq 0 ]; then
  echo "✓ PM2 process restarted successfully"
else
  echo "✗ Failed to restart PM2 process"
  exit 1
fi
echo ""

# Step 7: Verify deployment
echo "Verifying deployment..."
sleep 2
pm2 status accounts-web
if [ $? -eq 0 ]; then
  echo ""
  echo "=========================================="
  echo "✅ Deployment complete and verified!"
  echo "=========================================="
  echo ""
  echo "Application Status:"
  pm2 info accounts-web
  echo ""
  echo "Recent Logs:"
  pm2 logs accounts-web --lines 10
else
  echo "✗ Deployment verification failed"
  exit 1
fi
