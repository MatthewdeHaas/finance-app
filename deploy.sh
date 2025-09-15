#!/bin/bash
set -e

# CONFIG
USER=root
HOST=137.184.87.105
CLIENT_DIR=/var/www/projects_site/finance-app/client
APP_NAME=finance-backend

cd client

echo "Building project..."
npm run build

echo "Syncing files to server..."
rsync -avz --delete ./build/ $USER@$HOST:$CLIENT_DIR/build/

echo "Restarting PM2 app..."
ssh $USER@$HOST "pm2 reload $APP_NAME --update-env"

echo "Deploy complete!"
