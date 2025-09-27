#!/bin/bash
cd /var/www/orrel-admin
git pull origin main
npm ci --production
npm run build
pm2 restart orrel-admin
echo "Orrel Admin panel deployed successfully!"
