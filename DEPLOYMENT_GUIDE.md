# Wayback Wednesday - Production Deployment Guide

## 🚀 Quick Start Checklist

### Prerequisites

- [x] Node.js 20+ installed
- [x] npm or yarn package manager
- [x] Git repository set up
- [ ] Firebase account created
- [ ] Stripe account created
- [ ] Domain name (optional)

## 📋 Step-by-Step Deployment

### 1. Environment Configuration

Create a `.env` file in your project root:

```env
# Firebase Configuration (REQUIRED)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration (REQUIRED)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key

# Admin Authentication (REQUIRED)
VITE_ADMIN_PASS_HASH=your_password_hash
VITE_ADMIN_SESSION_HOURS=12

# Preview Gate (OPTIONAL)
VITE_PREVIEW_TOKEN=your_secure_token
```

### 2. Firebase Setup

#### A. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Name it "wayback-wednesday-prod"
4. Enable Google Analytics (optional)

#### B. Enable Services

1. **Authentication**

   - Go to Authentication > Sign-in method
   - Enable Email/Password provider

2. **Firestore Database**

   - Go to Firestore Database
   - Click "Create Database"
   - Choose production mode
   - Select your region

3. **Storage**
   - Go to Storage
   - Click "Get Started"
   - Choose production mode

#### C. Deploy Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (select existing project)
firebase init

# Deploy rules
firebase deploy --only firestore:rules,storage:rules
```

### 3. Stripe Setup

#### A. Get API Keys

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers > API keys
3. Copy your publishable key
4. Add to `.env` file

#### B. Configure Webhooks

1. Go to Developers > Webhooks
2. Add endpoint: `https://your-api-domain.com/api/webhooks/stripe`
3. Select events:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - checkout.session.completed
4. Copy webhook secret to backend `.env`

### 4. Backend API Deployment

#### A. Deploy to Railway/Render/Heroku

```bash
# Navigate to API directory
cd api

# Install dependencies
npm install

# Set environment variables in hosting platform:
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - FIREBASE_PROJECT_ID
# - FIREBASE_CLIENT_EMAIL
# - FIREBASE_PRIVATE_KEY

# Deploy (example for Railway)
railway up
```

### 5. Frontend Deployment

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

#### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Option C: Firebase Hosting

```bash
# Build project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 🔒 Security Checklist

- [x] Environment variables properly configured
- [x] Firebase security rules deployed
- [x] HTTPS enforced on all endpoints
- [x] Content Security Policy headers configured
- [x] Admin authentication with SHA-256 hashing
- [x] Rate limiting on API endpoints
- [x] Stripe webhook signature verification
- [ ] SSL certificate configured
- [ ] Domain verification
- [ ] Regular security audits scheduled

## 🎯 Performance Optimization

### Image Optimization

- All images converted to WebP format
- Lazy loading implemented
- Responsive images with srcset

### Code Splitting

```javascript
// Already implemented with dynamic imports
const AdminPanel = lazy(() => import("./pages/Admin"));
```

### Caching Strategy

- Static assets: 1 year cache
- API responses: Short-lived cache
- Service worker for offline support (optional)

## 📊 Monitoring & Analytics

### 1. Set up monitoring

- Google Analytics (optional)
- Sentry for error tracking
- Uptime monitoring (UptimeRobot, Pingdom)

### 2. Performance monitoring

- Lighthouse CI
- Web Vitals tracking
- Real User Monitoring (RUM)

## 🚨 Troubleshooting

### Common Issues

#### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Firebase Connection Issues

- Verify API keys are correct
- Check Firebase project settings
- Ensure services are enabled

#### Stripe Payment Failures

- Verify webhook endpoint is accessible
- Check webhook secret is correct
- Ensure API keys match environment (test vs live)

## 📝 Post-Deployment

### 1. Test Critical Paths

- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Payment processing
- [ ] Order confirmation
- [ ] Admin dashboard access

### 2. Configure DNS (if custom domain)

```
Type: A
Name: @
Value: [Your hosting IP]

Type: CNAME
Name: www
Value: [Your domain]
```

### 3. Enable maintenance mode (if needed)

Set `VITE_PREVIEW_TOKEN` and share with team for preview access.

## 🎉 Launch Checklist

- [ ] All environment variables configured
- [ ] Database populated with products
- [ ] Payment processing tested
- [ ] SSL certificate active
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Team trained on admin panel
- [ ] Customer support ready
- [ ] Marketing materials prepared
- [ ] Social media announcements scheduled

## 📞 Support

For deployment issues:

1. Check deployment logs
2. Verify environment variables
3. Review browser console for errors
4. Check network tab for failed requests

## 🔄 Updates & Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Security audit
npm audit fix

# Rebuild and deploy
npm run build
vercel --prod
```

### Database Backup

```bash
# Export Firestore data
firebase firestore:export gs://your-backup-bucket/backup-$(date +%Y%m%d)
```

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: September 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
