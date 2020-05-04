module.exports = {
  apps: [
    {
      name: 'api-server-koajs',
      script: 'main.js',
      port: 9001,
      watch: ['server', '.server/index.js', 'public', '.env'],
      args: 'start',
      max_memory_restart: '250M',
      ignore_watch: ['node_modules'],
      log_date_format: 'YYYY-MM=DD HH:mm:ss',
      env: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
