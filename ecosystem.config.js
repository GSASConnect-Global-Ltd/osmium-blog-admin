module.exports = {
  apps: [{
    name: 'orrel-admin',
    script: 'npm',
    args: 'start',
    instances: 1,  // Change from 'max' to 1 for now
    exec_mode: 'fork',  // Change from 'cluster' to 'fork'
    env: {
      NODE_ENV: 'production',
      PORT: 8007
    },
    error_file: '/var/log/orrel-admin/err.log',
    out_file: '/var/log/orrel-admin/out.log',
    time: true,
    autorestart: true,
    watch: false
    }]
   };
