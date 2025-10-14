# Deployment Checklist - Wayback Wednesday

## ✅ Pre-Deployment Completed

- [x] Backend API completely rebuilt
- [x] Security vulnerabilities fixed (Resend moved to backend)
- [x] All code committed to GitHub
- [x] Build errors resolved
- [x] Documentation created

---

## 🎯 What to Do Now (In Order)

### 1. Create Supabase Project (5 min)

**URL**: https://supabase.com

Steps:

1. Click "New Project"
2. Name: `wayback-wednesday`
3. Database Password: CREATE AND SAVE IT!
4. Region: US East (or closest to you)
5. Click "Create Project"
6. Wait ~2 minutes

### 2. Run Database Schema (2 min)

In Supabase Dashboard:

1. Click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Open file: `api/supabase-schema.sql`
4. Copy entire contents
5. Paste into SQL Editor
6. Click "Run" (bottom right)
7. Should see: "Success. No rows returned"
8. Click "Table Editor" → Verify 5 tables exist

### 3. Get Supabase Credentials (3 min)

In Supabase Dashboard:

**Settings → API**:

```
Project URL: https://xxxx.supabase.co
→ Copy this

API Keys:
anon/public: eyJh...
→ Copy for frontend (SAFE)

service_role: eyJh...
→ Copy for backend (SECRET!)
```

**Settings → Database**:

```
Connection string → URI tab
postgresql://postgres:[YOUR-PASSWORD]@...
→ Replace [YOUR-PASSWORD] with your database password
→ Copy for backend
```

### 4. Set Up Backend Locally (5 min)

```bash
cd api

# Create .env file (DO NOT COMMIT!)
cp .env.example .env

# Edit api/.env with your credentials
# Use any text editor
```

Paste into `api/.env`:

```bash
NODE_ENV=development
PORT=3001

SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_SERVICE_KEY=eyJh[your-service-role-key]
DATABASE_URL=postgresql://postgres:[password]@[host]/postgres

# Get these from respective dashboards
STRIPE_SECRET_KEY=sk_test_[from-stripe-dashboard]
STRIPE_WEBHOOK_SECRET=whsec_[setup-after-railway-deploy]
RESEND_API_KEY=re_[from-resend-dashboard]
EMAIL_FROM="Wayback Wednesday <noreply@yourdomain.com>"
CONTACT_TO=robsanchez124@gmail.com

FRONTEND_URL=http://localhost:5173
```

Install & Test:

```bash
npm install
npm run db:seed
npm run dev
```

Should see:

```
✅ Environment validated successfully
✅ Supabase client initialized
✅ PostgreSQL connected
🚀 Server started on port 3001
```

Test: http://localhost:3001/api/health

### 5. Deploy Backend to Railway (10 min)

**URL**: https://railway.app

Steps:

1. New Project → "Deploy from GitHub repo"
2. Select: `pitosanchez/wayback-wednesday`
3. Settings:
   - Root Directory: `/api`
   - Build Command: `npm run build`
   - Start Command: `npm start`
4. Click "Variables" tab
5. Add ALL variables from `api/.env` (use production values)
6. Click "Deploy"
7. Wait ~3 minutes
8. Click "Settings" → "Networking" → "Generate Domain"
9. Copy Railway URL: `https://[app-name].up.railway.app`

Test: `https://[your-app].up.railway.app/api/health`

### 6. Configure Stripe Webhook (5 min)

**URL**: https://dashboard.stripe.com

Steps:

1. Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://[railway-url]/webhooks/stripe`
4. Description: "Wayback Wednesday Orders"
5. Events to send:
   - [x] checkout.session.completed
   - [x] payment_intent.succeeded
   - [x] payment_intent.payment_failed
6. Click "Add endpoint"
7. Click on the webhook you just created
8. Click "Signing secret" → "Reveal"
9. Copy secret (starts with `whsec_`)
10. Add to Railway: `STRIPE_WEBHOOK_SECRET=whsec_...`
11. Redeploy Railway app

### 7. Update Frontend Environment (3 min)

In root folder, edit `.env.local`:

```bash
# Backend API
VITE_API_BASE_URL=https://[your-railway-app].up.railway.app

# Supabase (Safe for frontend)
VITE_SUPABASE_URL=https://[your-project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJh[your-anon-key]

# Stripe (Safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_[your-key]

# Keep Firebase for now (gradual migration)
VITE_FIREBASE_API_KEY=...
# ... other Firebase vars
```

**CRITICAL**: Delete this line if it exists:

```bash
# ❌ REMOVE THIS:
# VITE_RESEND_API_KEY=...
```

### 8. Deploy Frontend (5 min)

**Vercel**: https://vercel.com/dashboard

Steps:

1. Go to your project
2. Settings → Environment Variables
3. Delete: `VITE_RESEND_API_KEY` ❌
4. Add: `VITE_API_BASE_URL` = Railway URL
5. Add: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
6. Deployments → Redeploy latest

OR **GitHub Pages**:

1. Settings → Secrets and variables → Actions
2. Update secrets
3. Push to trigger deployment

### 9. Test Everything (10 min)

- [ ] Visit your live site
- [ ] Test contact form (you should receive email)
- [ ] Test event booking (check Supabase table)
- [ ] Test adding to cart
- [ ] Test checkout flow
- [ ] Check Railway logs (no errors)
- [ ] Check Supabase logs (queries working)
- [ ] Check Resend dashboard (emails sent)

---

## 🔗 Quick Links

| Service      | Dashboard                                        | Get What                           |
| ------------ | ------------------------------------------------ | ---------------------------------- |
| **Supabase** | https://supabase.com/dashboard                   | URL, Keys, DB Connection           |
| **Railway**  | https://railway.app                              | Deploy backend, get API URL        |
| **Stripe**   | https://dashboard.stripe.com                     | API keys, Products, Webhook secret |
| **Resend**   | https://resend.com                               | API key (backend only!)            |
| **Vercel**   | https://vercel.com/dashboard                     | Deploy frontend                    |
| **GitHub**   | https://github.com/pitosanchez/wayback-wednesday | Code repo                          |

---

## 🚨 Critical Security Reminders

**NEVER Add to Frontend .env**:

- ❌ `RESEND_API_KEY`
- ❌ `STRIPE_SECRET_KEY`
- ❌ `SUPABASE_SERVICE_KEY`
- ❌ `DATABASE_URL`
- ❌ Any `_SECRET` or `_KEY` that's not `PUBLISHABLE` or `ANON`

**Safe for Frontend**:

- ✅ `VITE_API_BASE_URL`
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ `VITE_STRIPE_PUBLISHABLE_KEY`

---

## ✅ Success Criteria

After deployment, you should have:

1. **Backend API** running on Railway

   - Health endpoint returns OK
   - Logs show no errors
   - Database connected

2. **Frontend** deployed (Vercel/GitHub Pages)

   - No console errors
   - Forms submit successfully
   - API calls work

3. **Emails** sending via Resend

   - Contact forms deliver
   - Booking confirmations send
   - Check Resend dashboard

4. **Stripe** webhooks working
   - Payments process
   - Orders save to database
   - Webhooks logged in Railway

---

## 🐛 Troubleshooting

### Build Still Failing?

- Check GitHub Actions logs for specific error
- Verify no `.env` files are committed
- Ensure all imports are correct

### CORS Errors?

- Backend `FRONTEND_URL` must match frontend domain EXACTLY
- No trailing slashes
- Include `https://`

### Emails Not Sending?

- Verify Resend API key in Railway
- Check Resend dashboard for errors
- Verify `EMAIL_FROM` uses verified domain

### Database Not Connecting?

- Check `DATABASE_URL` is correct
- Verify Supabase project is active
- Review Railway logs

---

## 📞 Need Help?

Read in order:

1. `QUICK_START.md` - Fast track guide
2. `BACKEND_MIGRATION_GUIDE.md` - Detailed steps
3. `DEPLOYMENT_SETUP.md` - Service configuration
4. `api/README.md` - Backend API docs

---

**Current Status**: Build errors fixed ✅  
**Next Step**: Create Supabase project and follow this checklist!

Ready to deploy! 🚀
