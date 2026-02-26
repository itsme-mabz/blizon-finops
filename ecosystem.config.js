module.exports = {
  apps: [
    {
      name: 'blizon-tech',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 5000',
      cwd: '/var/www/blizon',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: '/var/www/blizon/logs/pm2-error.log',
      out_file: '/var/www/blizon/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
    },
  ],
};
