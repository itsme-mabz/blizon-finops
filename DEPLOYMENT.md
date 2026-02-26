# Blizon Deployment Guide

Complete deployment instructions for blizon.tech on Ubuntu server with nginx, PM2, and SSL.

## Prerequisites Checklist
- ✅ Ubuntu server
- ✅ Node.js v22.20.0 installed
- ✅ nginx installed and running
- ✅ PM2 installed
- ✅ SSL certificates (Let's Encrypt)
- ✅ Git installed

## Deployment Steps

### 1. Connect to Server
```bash
ssh apple@your-server-ip
```

### 2. Clone Repository
```bash
# Navigate to deployment directory
cd /var/www

# Clone the repository (replace with your actual repo URL)
sudo git clone https://github.com/your-username/blizon.git blizon

# Or if repo already exists, pull latest
cd /var/www/blizon
sudo git pull origin main

# Set proper ownership
sudo chown -R apple:apple /var/www/blizon
```

### 3. Install Dependencies & Build
```bash
cd /var/www/blizon

# Install dependencies
npm install --production=false

# Build the Next.js app
npm run build

# Create logs directory
mkdir -p logs
```

### 4. Update nginx Configuration
```bash
# Backup existing config
sudo cp /etc/nginx/sites-available/blizon.tech /etc/nginx/sites-available/blizon.tech.backup

# Copy new nginx config
sudo cp /var/www/blizon/nginx.conf /etc/nginx/sites-available/blizon.tech

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx
```

### 5. Start Application with PM2
```bash
cd /var/www/blizon

# Start the app using PM2 with ecosystem config
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup

# Follow the command that PM2 outputs (usually starts with 'sudo env PATH=...')
```

### 6. Verify Deployment
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs blizon-tech --lines 50

# Check if app is responding on port 5000
curl http://localhost:5000

# Check nginx status
sudo systemctl status nginx

# Visit your site
# https://blizon.tech
```

## Post-Deployment Commands

### View Application Logs
```bash
# Real-time logs
pm2 logs blizon-tech

# Last 100 lines
pm2 logs blizon-tech --lines 100

# Error logs only
pm2 logs blizon-tech --err

# Check log files directly
tail -f /var/www/blizon/logs/pm2-out.log
tail -f /var/www/blizon/logs/pm2-error.log
```

### Manage PM2 Process
```bash
# Restart app
pm2 restart blizon-tech

# Stop app
pm2 stop blizon-tech

# Delete from PM2
pm2 delete blizon-tech

# Monitor in real-time
pm2 monit
```

### Update/Redeploy Application
```bash
cd /var/www/blizon

# Pull latest code
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart PM2 app
pm2 restart blizon-tech

# Or restart with zero downtime (if using cluster mode)
pm2 reload blizon-tech
```

### nginx Management
```bash
# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/blizon.tech.access.log
sudo tail -f /var/log/nginx/blizon.tech.error.log
```

## Troubleshooting

### App Not Starting
```bash
# Check PM2 logs
pm2 logs blizon-tech --err

# Check if port 5000 is already in use
sudo lsof -i :5000

# Check Node.js version
node -v  # Should be v22.20.0
```

### nginx Errors
```bash
# Test nginx config
sudo nginx -t

# Check nginx error logs
sudo tail -50 /var/log/nginx/error.log
sudo tail -50 /var/log/nginx/blizon.tech.error.log
```

### 502 Bad Gateway
```bash
# Check if PM2 app is running
pm2 status

# Check if app is listening on port 5000
curl http://localhost:5000

# Restart both services
pm2 restart blizon-tech
sudo systemctl reload nginx
```

### SSL Certificate Renewal
```bash
# Certificates auto-renew via certbot
# Test renewal
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# After renewal, reload nginx
sudo systemctl reload nginx
```

## Environment Variables (if needed later)

If you need to add environment variables:

1. Create `.env.production` file:
```bash
cd /var/www/blizon
nano .env.production
```

2. Add your variables:
```
NODE_ENV=production
PORT=5000
NEXT_PUBLIC_API_URL=https://api.blizon.tech
```

3. Update ecosystem.config.js to load env file

4. Restart PM2:
```bash
pm2 restart blizon-tech
```

## Performance Monitoring

### Check System Resources
```bash
# CPU and Memory usage
pm2 monit

# Detailed process info
pm2 show blizon-tech

# System resources
htop
```

### Check Application Performance
```bash
# Response time
curl -w "@-" -o /dev/null -s https://blizon.tech <<'EOF'
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
      time_redirect:  %{time_redirect}\n
   time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
         time_total:  %{time_total}\n
EOF
```

## Security Checklist

- ✅ SSL/TLS certificates installed and auto-renewing
- ✅ Security headers configured in nginx
- ✅ Gzip compression enabled
- ✅ Static file caching configured
- ✅ PM2 running as non-root user
- ✅ Logs directory created with proper permissions

## Backup Strategy

```bash
# Backup before major updates
cd /var/www
sudo tar -czf blizon-backup-$(date +%Y%m%d).tar.gz blizon/

# Backup nginx config
sudo cp /etc/nginx/sites-available/blizon.tech /etc/nginx/sites-available/blizon.tech.backup.$(date +%Y%m%d)
```

## Quick Reference

```bash
# Start from scratch
cd /var/www/blizon && npm install && npm run build && pm2 restart blizon-tech

# Full restart
pm2 restart blizon-tech && sudo systemctl reload nginx

# Check everything is working
pm2 status && sudo systemctl status nginx && curl http://localhost:5000
```

## Support

For issues, check:
1. PM2 logs: `pm2 logs blizon-tech`
2. nginx error logs: `sudo tail -50 /var/log/nginx/blizon.tech.error.log`
3. Application logs: `/var/www/blizon/logs/`
