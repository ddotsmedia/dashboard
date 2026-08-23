module.exports = {
  apps: [
    {
      name: 'accounts-web',
      script: './.next/standalone/server.js',
      cwd: '/opt/accounts-dashboard',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3115,
      },
      max_memory_restart: '512M',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'public'],
      error_file: '/var/log/pm2/accounts-web-error.log',
      out_file: '/var/log/pm2/accounts-web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      shutdown_with_message: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};
