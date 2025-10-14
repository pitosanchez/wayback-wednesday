# Backend Migration Guide: Firebase → Supabase + Secure API

## What Changed

### Before (Insecure)
- Events & Bookings: localStorage (not persistent)
- Auth: Firebase Auth
- Email: Resend called from FRONTEND ❌ (API key exposed!)
- Cart: localStorage only
- No real backend database

### After (Secure)
- Events & Bookings: Supabase PostgreSQL ✅
- Auth: Supabase Auth (keep Firebase as fallback during migration)
- Email: Resend called from BACKEND ONLY ✅ (API key secure!)
- Cart: localStorage + PostgreSQL for orders
- Full backend API with security

---

## Step-by-Step Migration

### Step 1: Create Supabase Project (5 min)

1. Go to https://supabase.com
2. Sign in with GitHub
3. Click "New Project"
4. Fill in:
   - Organization: Your name or company
   - Name: `wayback-wednesday`
   - Database Password: Create strong password (save it!)
   - Region: US East (or closest to you)
   - Pricing: Free tier is fine to start

5. Wait for project to provision (~2 minutes)

### Step 2: Run Database Schema (3 min)

1. In Supabase Dashboard → SQL Editor
2. Click "New query"
3. Copy entire contents of `api/supabase-schema.sql`
4. Paste into editor
5. Click "Run" (bottom right)
6. Verify: "Success. No rows returned" message
7. Go to Table Editor → Should see: products, events, bookings, orders, order_items

### Step 3: Get Supabase Credentials (2 min)

In Supabase Dashboard:

**A. API Credentials**:
1. Settings → API
2. Copy these values:

```
Project URL: https://[project-ref].supabase.co
  → Use for: SUPABASE_URL (both frontend & backend)

anon/public key: eyJh...
  → Use for: VITE_SUPABASE_ANON_KEY (frontend - SAFE)
  
service_role key: eyJh...
  → Use for: SUPABASE_SERVICE_KEY (backend ONLY - NEVER frontend!)
```

**B. Database Connection**:
1. Settings → Database
2. Connection string → URI
3. Copy the full string
4. Replace `[YOUR-PASSWORD]` with your database password
5. Save as `DATABASE_URL` (backend only)

### Step 4: Set Up Backend Environment (5 min)

1. Navigate to api folder:
```bash
cd api
```

2. Create `.env` file (DO NOT COMMIT):
```bash
cp .env.example .env
```

3. Edit `api/.env` with your credentials:
```bash
NODE_ENV=development
PORT=3001

# From Supabase (Step 3)
SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_SERVICE_KEY=eyJh[your-service-role-key]
DATABASE_URL=postgresql://postgres:[password]@[host]/postgres

# From Stripe Dashboard
STRIPE_SECRET_KEY=sk_test_[your-key]
STRIPE_WEBHOOK_SECRET=whsec_[get-after-webhook-setup]

# From Resend Dashboard
RESEND_API_KEY=re_[your-key]
EMAIL_FROM="Wayback Wednesday <noreply@yourdomain.com>"
CONTACT_TO=robsanchez124@gmail.com

# Your frontend URL
FRONTEND_URL=http://localhost:5173
```

### Step 5: Install Backend Dependencies (2 min)

```bash
cd api
npm install
```

This installs:
- Express, Supabase client, Drizzle ORM
- Stripe, Resend
- Security packages (helmet, cors, rate-limit)
- TypeScript, Zod validation

### Step 6: Seed Database (1 min)

```bash
npm run db:seed
```

This creates:
- Sample products
- Featured documentary event

### Step 7: Start Backend Server (1 min)

```bash
npm run dev
```

You should see:
```
✅ Environment validated successfully
✅ Supabase client initialized
✅ Stripe client initialized
✅ Resend email service initialized
✅ PostgreSQL connected
🚀 Server started on port 3001
```

Test: http://localhost:3001/api/health

### Step 8: Update Frontend Environment (3 min)

1. In root folder, create `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local`:
```bash
# Backend API
VITE_API_BASE_URL=http://localhost:3001

# Supabase (Safe for frontend)
VITE_SUPABASE_URL=https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJh[your-anon-key]

# Stripe (Safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_[your-key]

# DO NOT ADD:
# VITE_RESEND_API_KEY ❌ DELETED FOR SECURITY
```

### Step 9: Test Locally (5 min)

```bash
# Frontend (in root folder)
npm run dev
```

Visit: http://localhost:5173

Test these features:
- ✅ Contact form → Should call backend `/api/contact`
- ✅ Event booking → Should call backend `/api/bookings`
- ✅ View events calendar
- ✅ Add to cart (still localStorage for now)

Check backend terminal for logs:
- Should see API requests coming in
- No errors

---

## Deployment to Production

### Deploy Backend to Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub repo
3. Select `pitosanchez/wayback-wednesday`
4. Settings:
   - Root Directory: `/api`
   - Build Command: `npm run build`
   - Start Command: `npm start`

5. Add Environment Variables (same as local but production values):
```
NODE_ENV=production
PORT=3001
SUPABASE_URL=[supabase project url]
SUPABASE_SERVICE_KEY=[service role key]
DATABASE_URL=[supabase connection string]
STRIPE_SECRET_KEY=sk_live_[production key]
STRIPE_WEBHOOK_SECRET=[will get after webhook setup]
RESEND_API_KEY=re_[your key]
EMAIL_FROM="Wayback Wednesday <noreply@yourdomain.com>"
CONTACT_TO=robsanchez124@gmail.com
FRONTEND_URL=https://pitosanchez.github.io/wayback-wednesday
```

6. Deploy
7. Get Railway URL: `https://[your-app].up.railway.app`

### Configure Stripe Webhook

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint
3. Endpoint URL: `https://[your-railway-url]/webhooks/stripe`
4. Select events:
   - checkout.session.completed
   - payment_intent.succeeded
   - payment_intent.payment_failed
5. Add endpoint
6. Copy "Signing secret" (starts with `whsec_`)
7. Add to Railway: `STRIPE_WEBHOOK_SECRET=whsec_...`
8. Redeploy Railway app

### Deploy Frontend

**If using Vercel**:
1. Vercel Dashboard → Your project
2. Settings → Environment Variables
3. Delete: `VITE_RESEND_API_KEY` ❌
4. Add: `VITE_API_BASE_URL=https://[railway-url]`
5. Redeploy

**If using GitHub Pages**:
1. GitHub repo → Settings → Secrets
2. Update GitHub Actions secrets
3. Push to trigger deployment

---

## Verification Checklist

After deployment, verify:

- [ ] Backend health: `https://[railway-url]/api/health` returns OK
- [ ] Contact form works (check Resend dashboard for email)
- [ ] Event booking works (check Supabase table)
- [ ] Events display from database
- [ ] No console errors in browser
- [ ] No exposed API keys in frontend source code
- [ ] Stripe checkout works
- [ ] Webhook receives events (check Railway logs)

---

## Rollback Plan

If something goes wrong:

1. Keep old Firebase code temporarily
2. Switch frontend back to Firebase
3. Debug issues
4. Gradual migration user-by-user

---

## Timeline

- Local setup: ~20 minutes
- Testing locally: ~10 minutes
- Railway deployment: ~10 minutes
- Stripe/Resend config: ~10 minutes
- Frontend deployment: ~5 minutes
- Verification: ~10 minutes

**Total**: ~1 hour end-to-end

---

## Support

Questions? Check:
- `api/README.md` - Backend documentation
- `DEPLOYMENT_SETUP.md` - Detailed deployment guide
- `SECURITY_AUDIT.md` - Security best practices

Ready to deploy! 🚀

