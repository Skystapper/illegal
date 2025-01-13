# AWS Lightsail Next.js Deployment Guide

## Initial Setup

### AWS Lightsail Instance Specifications
- **Plan**: $5/month
- **RAM**: 512 MB
- **Storage**: 20 GB SSD
- **Transfer**: 1 TB
- **Operating System**: Linux/Unix (Bitnami)
- **Processor**: 1 vCPU

### Creating AWS Lightsail Instance
1. Go to AWS Lightsail Console.
2. Click "Create instance."
3. Choose instance location.
4. Select platform: Linux/Unix.
5. Select blueprint: Node.js.
6. Choose instance plan: $5 USD/month.
7. Name your instance.
8. Click "Create instance."

### Initial Access Setup

#### Download SSH Key
1. Download the SSH key from the AWS Console.
2. Save the key to your local machine.
3. Set proper permissions for the key:

```bash
chmod 400 path/to/your-key.pem
```

#### Connect to Instance
```bash
# Using SSH key
ssh -i path/to/your-key.pem bitnami@your-public-ip

# Or using the browser-based SSH
# Use AWS Console -> Connect using SSH button
```

#### Initial System Updates
```bash
# Update package list
sudo apt-get update

# Upgrade installed packages
sudo apt-get upgrade

# Install essential tools
sudo apt-get install htop git
```

### Check System Resources
```bash
# Check memory
free -h

# Check disk space
df -h

# Check CPU
htop
```

### Important System Locations
- Home directory: `/home/bitnami`
- Web root: `/home/bitnami/htdocs`
- Node.js location: `/opt/bitnami/node`
- Nginx config: `/etc/nginx`
- System services: `/etc/systemd/system`

### Network Configuration
1. Go to AWS Lightsail Console.
2. Select your instance.
3. Go to "Networking" tab.
4. Default open ports:
   - SSH (22)
   - HTTP (80)
   - HTTPS (443)

### System Limitations
- RAM: Limited to 512 MB.
- Swap: ~634 MB.
- CPU: 1 vCPU.
- Storage: 20 GB SSD.

### Memory Management
```bash
# View memory usage
free -h

# Current memory output example:
#                total        used        free      shared  buff/cache   available
# Mem:           447Mi       171Mi       166Mi        68Ki       122Mi       276Mi
# Swap:          634Mi       408Mi       226Mi
```

## Project Setup

### Initial Project Setup
```bash
# Navigate to web directory
cd /home/bitnami/htdocs

# Clone your project
git clone https://github.com/your-username/your-repo.git project_name
cd project_name

# Install Node.js dependencies
npm install

# If you get memory errors during install:
NODE_OPTIONS="--max-old-space-size=300" npm install
```

### Database Setup

#### Access MySQL
```bash
# Login to MySQL as root
mysql -u root -p
```

#### Create Database and User
```sql
# Inside MySQL prompt:

# Create database
CREATE DATABASE project_db;

# Create user and set password
CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON project_db.* TO 'db_user'@'localhost';

# Apply privileges
FLUSH PRIVILEGES;

# Verify database creation
SHOW DATABASES;
```

#### Test Database Connection
```bash
# Try connecting with new user
mysql -u db_user -p project_db
```

### Environment Setup

#### Create Environment Files
```bash
# Create .env file
nano .env
```

Add to `.env`:
```plaintext
DATABASE_URL="mysql://db_user:your_password@localhost:3306/project_db"
```

#### Create .env.local
```bash
nano .env.local
```

Add to `.env.local`:
```plaintext
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your_secret_key"
DATABASE_URL="mysql://db_user:your_password@localhost:3306/project_db"
```

### Prisma Setup

#### Initialize Prisma
```bash
# Install Prisma CLI
npm install prisma --save-dev

# Initialize Prisma with MySQL
npx prisma init --datasource-provider mysql
```

#### Run Migrations
```bash
# Generate Prisma Client
npx prisma generate

# Run initial migration
npx prisma migrate dev --name init

# If you get memory errors:
NODE_OPTIONS="--max-old-space-size=300" npx prisma migrate dev --name init
```

#### Verify Database Tables
```bash
# Check tables in MySQL
mysql -u db_user -p project_db -e "SHOW TABLES;"

# Or use Prisma Studio
npx prisma studio
```

#### Common Database Issues

##### Connection Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Check MySQL logs
sudo tail -f /var/log/mysql/error.log
```

##### Permission Issues
```sql
# Inside MySQL prompt:
SHOW GRANTS FOR 'db_user'@'localhost';
```

##### Reset Root Password (if needed)
```bash
# Stop MySQL
sudo systemctl stop mysql

# Start in safe mode
sudo mysqld_safe --skip-grant-tables &

# Connect without password
mysql -u root

# Reset password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

## Build and Service Setup

### Build Next.js Application
```bash
# Navigate to project directory
cd /home/bitnami/htdocs/project_name

# Set memory limit for build process
export NODE_OPTIONS="--max-old-space-size=300"

# Install dependencies (if not done already)
npm install

# Build the application
npm run build

# Test the build
npm start

# If the test runs successfully, press Ctrl+C to stop it
```

#### Common Build Issues

##### Memory Errors During Build
```bash
# Clear cache and node_modules
rm -rf .next
rm -rf node_modules
npm cache clean --force

# Reinstall and rebuild with memory limit
export NODE_OPTIONS="--max-old-space-size=300"
npm install
npm run build
```

##### Build Fails Due to Missing Dependencies
```bash
# Check for errors in package.json
cat package.json

# Verify node_modules
ls -la node_modules

# Reinstall dependencies
npm install
```

### Create System Service for Next.js

#### Create Service File
```bash
sudo nano /etc/systemd/system/nextjs.service
```

#### Add Service Configuration
```ini
[Unit]
Description=Next.js App
After=network.target

[Service]
Type=simple
User=bitnami
WorkingDirectory=/home/bitnami/htdocs/project_name
Environment=NODE_ENV=production
Environment=PORT=3000
Environment="NODE_OPTIONS=--max-old-space-size=300"
Environment=PATH=/opt/bitnami/node/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/opt/bitnami/node/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

#### Enable and Start Service
```bash
# Reload systemd
sudo systemctl daemon-reload

# Start service
sudo systemctl start nextjs

# Enable on boot
sudo systemctl enable nextjs

# Check status
sudo systemctl status nextjs
```

### Nginx Setup

#### Step 1: Stop and disable Apache
```bash
# Stop Apache
sudo /opt/bitnami/ctlscript.sh stop apache

# Disable Apache
sudo systemctl disable apache2
```

#### Step 2: Install and configure Nginx
```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/nginx.conf
```

#### Step 3: Add Nginx configuration
```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
}

http {
    sendfile on;
    tcp_nopush on;
    types_hash_max_size 2048;
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

#### Step 4: Start Nginx
```bash
# Test configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Service Management Commands

#### Next.js Service
```bash
# Check service status
sudo systemctl status nextjs

# Restart service
sudo systemctl restart nextjs

# View logs
sudo journalctl -u nextjs -f
```

#### Nginx Service
```bash
# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Verify Setup

#### Check running services
```bash
# Check Next.js
curl http://localhost:3000

# Check Nginx
curl http://localhost
```

#### Monitor memory usage
```bash
# View memory usage
free -h

# Monitor processes
top
```

#### Access your application
- Open browser and visit: http://[YOUR_PUBLIC_IP]
- Your app should now be accessible without specifying a port
