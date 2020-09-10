module.exports = {
  apps: [
    {
      name: 'scREAD backend',
      script: 'main.js',
      port: 8889,
      watch: ['server', '.server/index.js', 'public', '.env'],
      args: 'start',
      max_memory_restart: '60G',
      ignore_watch: ['node_modules'],
      log_date_format: 'YYYY-MM=DD HH:mm:ss',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
