#!/bin/bash
set -e

echo "======================================"
echo "🚀 GAMING PLATFORM VPS DEPLOYMENT SCRIPT"
echo "======================================"

# 1. Update and install dependencies
echo "[1/6] Installing necessary packages (Node, PM2, Nginx, Redis)..."
sudo apt-get update
sudo apt-get install -y curl dirmngr apt-transport-https lsb-release ca-certificates nginx redis-server

# Install Node.js 20.x if not installed
if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2
if ! command -v pm2 >/dev/null 2>&1; then
    sudo npm install -g pm2
fi

# 2. Clone or update repository
REPO_DIR="/var/www/gaming-app"
if [ ! -d "$REPO_DIR" ]; then
    echo "[2/6] Cloning Github repository..."
    sudo mkdir -p /var/www
    sudo chown -R $USER:$USER /var/www
    git clone https://github.com/mhaseeb6662-spec/Gaming-app.git $REPO_DIR
else
    echo "[2/6] Updating existing repository..."
    cd $REPO_DIR
    git fetch origin
    git reset --hard origin/main
    git clean -fd
fi

cd $REPO_DIR

# 3. Setup Environment Variables
echo "[3/6] Setting up environment variables..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo 'DATABASE_URL="postgresql://postgres.heklltkyyjihbazfiyfo:GamePlatform%402026@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"' >> .env
fi
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo 'DATABASE_URL="postgresql://postgres.heklltkyyjihbazfiyfo:GamePlatform%402026@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"' >> backend/.env
fi

# 4. Build Frontend and Backend
echo "[4/6] Installing dependencies and building..."
rm -rf node_modules
npm install
mkdir -p prisma
cp backend/prisma/schema.prisma prisma/schema.prisma
npx prisma generate
npm run build

cd backend
rm -rf node_modules
npm install
# Push Prisma schema (this connects to the live database)
npx prisma generate
npm run build
cd ..

# 5. Start PM2 cluster
echo "[5/6] Starting PM2 process manager..."
pm2 start ecosystem.config.js
pm2 save
sudo pm2 startup | grep "sudo env" | bash || true

# 6. Setup Nginx
echo "[6/6] Configuring Nginx reverse proxy..."
sudo cp nginx.conf /etc/nginx/sites-available/gaming-app
sudo ln -sf /etc/nginx/sites-available/gaming-app /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "======================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "Make sure you edit /var/www/gaming-app/backend/.env with your real DATABASE_URL and JWT_SECRET!"
echo "======================================"
