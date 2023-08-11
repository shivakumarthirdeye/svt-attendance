module.exports = {
  apps: [
    {
      name: 'SVT-Attendance',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
