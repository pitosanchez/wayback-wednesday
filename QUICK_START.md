# Quick Start Guide - Complete Backend Migration

## ✅ What's Been Completed

### Backend Infrastructure (Ready to Deploy)
- ✅ Complete Express + TypeScript API
- ✅ Supabase integration (PostgreSQL + Auth)
- ✅ Drizzle ORM setup
- ✅ Stripe payment processing
- ✅ Secure Resend email service (backend only)
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Zod validation on all endpoints
- ✅ Comprehensive error handling
- ✅ Database schema ready
- ✅ Seed script for initial data

### Security Fixes
- ✅ Removed Resend from frontend (was exposing API key!)
- ✅ Booking form now calls secure backend API
- ✅ Contact form uses backend API
- ✅ All sensitive keys in backend `.env` only
- ✅ `.env.example` files created (safe to commit)
- ✅ `.gitignore` properly configured

### Documentation
- ✅ Complete deployment guide
- ✅ Backend API documentation
- ✅ Security audit report
- ✅ Migration guide
- ✅ MCP setup guide

---

## 🚀 Next Steps (What YOU Need to Do)

### Step 1: Create Supabase Project (5 min)

1. Go to: **https://supabase.com**
2. Sign in with GitHub
3. Click "New Project"
4. Configure:
   - Name: `wayback-wednesday`
   - Database Password: (create strong password - SAVE IT!)
   - Region: US East
   - Click "Create Project"
5. Wait ~2 minutes for provisioning

### Step 2: Run Database Schema (2 min)

1. In Supabase Dashboard → **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `api/supabase-schema.sql`
4. Paste and click "Run"
5. Verify: Green success message
6. Check **Table Editor** → Should see 5 tables:
   - products
   - events  
   - bookings
   - orders
   - order_items

### Step 3: Get Credentials (3 min)

In Supabase Dashboard:

**Settings → API**:
```
Project URL: [copy this]
anon/public key: [copy this]
service_role key: [copy this - keep secret!]
```

**Settings → Database**:
```
Connection string (URI): [copy this]
Replace [YOUR-PASSWORD] with your database password
```

### Step 4: Set Up Local Backend (3 min)

```bash
cd api

# Create .env file
cp .env.example .env

# Edit api/.env and paste your credentials:
nano .env
# Or use your favorite editor

# Install dependencies
npm install
```

### Step 5: Seed Database & Start Backend (2 min)

```bash
# Still in api/ folder
npm run db:seed

# Start development server
npm run dev
```

You should see:
```
✅ Environment validated successfully
✅ Supabase client initialized
✅ PostgreSQL connected
🚀 Server started on port 3001
```

Test: Open http://localhost:3001/api/health

### Step 6: Update Frontend Environment (2 min)

In root folder:

```bash
# If .env.local doesn't exist:
cp .env.example .env.local

# Edit .env.local
```

Add:
```bash
VITE_API_BASE_URL=http://localhost:3001
VITE_SUPABASE_URL=[from supabase]
VITE_SUPABASE_ANON_KEY=[from supabase]
```

**DELETE** if it exists:
```bash
# ❌ Remove this line (security risk):
# VITE_RESEND_API_KEY=...
```

### Step 7: Install Frontend Dependencies (1 min)

```bash
npm install
```

This adds `@supabase/supabase-js` and removes `resend` from frontend.

### Step 8: Test Locally (5 min)

```bash
# Start frontend
npm run dev
```

Visit: http://localhost:5173

Test:
- ✅ Contact form (should send email via backend)
- ✅ Event booking form (should save to database)
- ✅ Events calendar (will show sample event)

Check backend terminal - you should see:
```
POST /api/contact 200
POST /api/bookings 200
```

---

## 📦 What You Need from Each Service

### Stripe Setup

**Dashboard**: https://dashboard.stripe.com

**What to Get**:
1. **API Keys** (Developers → API keys):
   - `Publishable key` (pk_test_...) → Frontend
   - `Secret key` (sk_test_...) → Backend

2. **Create Products**:
   - Go to Products → Add product
   - For each item (tees, hoodies, hats, etc.)
   - Add price → Copy `price_id`

3. **Webhook** (after Railway deployment):
   - Developers → Webhooks → Add endpoint
   - URL: `https://[railway-url]/webhooks/stripe`
   - Events: checkout.session.completed, payment_intent.succeeded
   - Copy signing secret → Backend

### Resend Setup

**Dashboard**: https://resend.com

**What to Get**:
1. **API Key**:
   - API Keys → Create
   - Copy → Backend `RESEND_API_KEY`

2. **Domain** (for production):
   - Domains → Add domain
   - Add DNS records to your registrar
   - Verify

### Railway Setup

**Dashboard**: https://railway.app

**What to Do**:
1. New Project → Deploy from GitHub
2. Select your repo
3. Root directory: `/api`
4. Add environment variables (all from api/.env.example)
5. Deploy
6. Get URL → Use for frontend `VITE_API_BASE_URL`

---

## 🎯 Current Status

### ✅ Completed
- MCP servers configured
- Complete backend API built
- Database schema designed
- Security vulnerabilities fixed
- Resend moved to backend (SECURE!)
- Documentation written
- Code committed to GitHub

### ⏳ Remaining (Requires Your Action)
- Create Supabase project
- Run database schema
- Deploy backend to Railway
- Configure Stripe webhook
- Update frontend environment variables
- Test deployed version

---

## 📚 Documentation Index

| File | Purpose |
|------|---------|
| `BACKEND_MIGRATION_GUIDE.md` | Step-by-step migration instructions |
| `DEPLOYMENT_SETUP.md` | Complete deployment guide with all service links |
| `SECURITY_AUDIT.md` | Security fixes and best practices |
| `api/README.md` | Backend API documentation |
| `MCP_SETUP.md` | MCP server usage guide |

---

## 🆘 Need Help?

1. Read `BACKEND_MIGRATION_GUIDE.md` first
2. Check `api/README.md` for API documentation  
3. Review `DEPLOYMENT_SETUP.md` for service setup
4. All credentials go in `.env` files (NEVER commit!)

---

## 🎉 Benefits of This Migration

### Security
- No more exposed API keys in frontend
- Proper authentication with Supabase
- Rate limiting prevents abuse
- Input validation on all endpoints

### Reliability
- Real database (not localStorage)
- Data persists across sessions
- Proper error handling
- Transaction support

### Scalability
- PostgreSQL can handle growth
- Connection pooling
- Indexed queries
- Professional architecture

### Maintainability
- TypeScript throughout
- Zod schemas for validation
- Clear separation of concerns
- Comprehensive documentation

Ready to deploy! Follow `BACKEND_MIGRATION_GUIDE.md` for next steps. 🚀

