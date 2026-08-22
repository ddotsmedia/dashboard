/**
 * PM2 Ecosystem Configuration File
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 start ecosystem.config.cjs --env development
 *   pm2 restart ecosystem.config.cjs
 *
 * Documentation:
 *   https://pm2.keymetrics.io/docs/usage/application-declaration/
 */

module.exports = {
  apps: [
    {
      // Application name
      name: 'accounts-web',

      // Application entry point
      script: './node_modules/.bin/next',

      // Arguments to pass to the script
      args: 'start',

      // Number of instances to run
      instances: 2,

      // Execution mode: cluster or fork
      exec_mode: 'cluster',

      // Environment variables for production
      env: {
        NODE_ENV: 'production',
        PORT: 3115,
        NEXT_PUBLIC_API_URL: 'https://api.al-watan.ae',
        NEXT_PUBLIC_LOCALE: 'en',
      },

      // Environment variables for development
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
        NEXT_PUBLIC_LOCALE: 'en',
        NEXT_DEBUG: 'false',
      },

      // Port to listen on
      port: 3115,

      // Process events
      listen_timeout: 3000,
      kill_timeout: 5000,

      // Memory and CPU limits
      max_memory_restart: '512M',

      // Restart strategy
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 5000,

      // Error handling
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Merge logs from multiple instances
      merge_logs: true,

      // Watch for file changes in development
      watch: false,
      ignore_watch: [
        'node_modules',
        '.next',
        'logs',
        '.git',
        'public',
      ],

      // Graceful shutdown
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 30000,

      // Environment-specific restart settings
      env_production: {
        restart_delay: 5000,
      },

      env_development: {
        watch: ['app', 'components', 'lib', 'config', 'types'],
        restart_delay: 1000,
      },

      // Application working directory
      cwd: '/var/www/accounts-dashboard',

      // Advanced settings
      instances: 2,
      instance_var: 'INSTANCE_ID',

      // Health check
      listen_timeout: 10000,
      wait_ready: true,

      // Logging format
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Max argument size
      max_argument_size: 4096,
    },
  ],

  /**
   * Deploy Configuration (optional)
   * For deploy automation using PM2 Deploy
   */
  deploy: {
    production: {
      user: 'root',
      host: '194.164.151.202',
      ref: 'origin/main',
      repo: 'https://github.com/your-org/accounts-dashboard.git',
      path: '/var/www/accounts-dashboard',
      'post-deploy': 'npm install --production && npm run build && pm2 restart accounts-web',
      'pre-deploy-local': 'echo "Deploy initiated from local machine"',
    },
    development: {
      user: 'root',
      host: '194.164.151.202',
      ref: 'origin/develop',
      repo: 'https://github.com/your-org/accounts-dashboard.git',
      path: '/var/www/accounts-dashboard-dev',
      'post-deploy': 'npm install && npm run build && pm2 restart accounts-web-dev',
    },
  },

  /**
   * Monitoring and Updates
   * Keep PM2 daemon alive, monitoring processes
   */
  monitor_interval: 5000,
  max_memory_restart: '512M',
};
