# Complete Deployment Setup Guide

## Service Links & Configuration

### 1. Supabase (Database + Auth)
**Dashboard**: https://supabase.com/dashboard

**Setup Steps**:
1. Create new project: `wayback-wednesday`
2. Region: Choose closest to your users (e.g., US East)
3. Database password: Save securely (you'll need it)

**Get Credentials**:
- Go to Project Settings → API
  - `URL`: Copy to `SUPABASE_URL`
  - `anon/public`: Copy to frontend `VITE_SUPABASE_ANON_KEY`
  - `service_role`: Copy to backend `SUPABASE_SERVICE_KEY` (NEVER expose to frontend)

- Go to Project Settings → Database
  - Connection string → `DATABASE_URL`

**Run SQL Schema**:
1. Go to SQL Editor
2. New query
3. Paste contents of `api/supabase-schema.sql`
4. Run

---

### 2. Railway (Backend API Hosting)
**Dashboard**: https://railway.app

**Setup Steps**:
1. New Project → Deploy from GitHub
2. Select `pitosanchez/wayback-wednesday` repo
3. Root directory: `/api`
4. Build command: `npm run build`
5. Start command: `npm start`

**Environment Variables to Add**:
```
NODE_ENV=production
PORT=3001

SUPABASE_URL=[from supabase]
SUPABASE_SERVICE_KEY=[from supabase - service role key]
DATABASE_URL=[from supabase - connection string]

STRIPE_SECRET_KEY=[from stripe dashboard]
STRIPE_WEBHOOK_SECRET=[create webhook first, then copy secret]

RESEND_API_KEY=[from resend dashboard]
EMAIL_FROM="Wayback Wednesday <noreply@yourdomain.com>"
CONTACT_TO=robsanchez124@gmail.com

FRONTEND_URL=https://pitosanchez.github.io/wayback-wednesday
```

**Get Railway URL**:
- Settings → Networking → Generate Domain
- Your API will be at: `https://[your-app].up.railway.app`
- Optionally add custom domain: `api.yourdomain.com`

---

### 3. Stripe (Payment Processing)
**Dashboard**: https://dashboard.stripe.com

**Setup Steps**:

**A. API Keys**:
1. Developers → API keys
2. Copy `Publishable key` → Frontend `VITE_STRIPE_PUBLISHABLE_KEY`
3. Copy `Secret key` → Backend `STRIPE_SECRET_KEY`

**B. Create Products**:
1. Products → Add product
2. Create products for each item:
   - WB Clemente Black Tee ($55)
   - Vintage Cassette Hoodie ($75)
   - G-BO Space Invaders Tee ($55)
   - Wayback Snapback ($45)
   - Etc.

**C. Create Prices**:
1. For each product → Add price
2. One-time payment
3. Copy `price_id` (starts with `price_`)
4. Update frontend product configs with correct `price_id`

**D. Webhook Configuration**:
1. Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://[your-railway-app].up.railway.app/webhooks/stripe`
3. Listen to events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
4. Click "Add endpoint"
5. Copy "Signing secret" → Backend `STRIPE_WEBHOOK_SECRET`

---

### 4. Resend (Transactional Emails)
**Dashboard**: https://resend.com/emails

**Setup Steps**:

**A. Get API Key**:
1. API Keys → Create API Key
2. Name it: "Wayback Wednesday Backend"
3. Copy key → Backend `RESEND_API_KEY`
4. **NEVER put this in frontend!**

**B. Verify Domain** (Required for production):
1. Domains → Add Domain
2. Enter your domain (e.g., `waybackwednesday.com`)
3. Add DNS records to your domain registrar:
   - **DKIM**: TXT record
   - **SPF**: TXT record  
   - **DMARC**: TXT record
4. Verify (may take a few minutes)

**C. Configure Email**:
- `EMAIL_FROM`: Must use verified domain
  - Example: `"Wayback Wednesday <noreply@waybackwednesday.com>"`
  - Or use Resend's domain: `"Wayback Wednesday <onboarding@resend.dev>"`

---

### 5. Vercel (Frontend Hosting)
**Dashboard**: https://vercel.com/dashboard

**Current Deployment**: https://vercel.com/pitosanchez/wayback-wednesday

**Environment Variables to Update**:

**Remove** (Security Risk):
```
VITE_RESEND_API_KEY ❌ DELETE THIS!
```

**Add/Update**:
```
# Backend API
VITE_API_BASE_URL=https://[your-railway-app].up.railway.app

# Supabase (Frontend safe keys)
VITE_SUPABASE_URL=[from supabase]
VITE_SUPABASE_ANON_KEY=[from supabase - anon/public key]

# Stripe (Frontend safe keys)
VITE_STRIPE_PUBLISHABLE_KEY=[from stripe - publishable key]

# Keep existing Firebase vars for gradual migration
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

---

### 6. GitHub Pages (Alternative Frontend)
**Current**: https://pitosanchez.github.io/wayback-wednesday

**If using GitHub Pages**:
1. Settings → Pages
2. Source: GitHub Actions
3. Add secrets in Settings → Secrets and variables → Actions
4. Add same environment variables as Vercel

---

## Deployment Checklist

### Pre-Deployment

- [ ] Run `api/supabase-schema.sql` in Supabase SQL Editor
- [ ] Verify all tables created successfully
- [ ] Create `.env` files (DO NOT COMMIT)
- [ ] Test backend locally: `cd api && npm run dev`
- [ ] Test frontend locally: `npm run dev`

### Backend Deployment (Railway)

- [ ] Connect GitHub repo to Railway
- [ ] Set root directory to `/api`
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Test `/api/health` endpoint
- [ ] Verify database connection (check logs)

### Frontend Deployment

- [ ] Remove `VITE_RESEND_API_KEY` from environment
- [ ] Add `VITE_API_BASE_URL` (Railway URL)
- [ ] Add Supabase frontend keys
- [ ] Deploy
- [ ] Test all features

### External Services

- [ ] Stripe webhook endpoint configured
- [ ] Resend domain verified
- [ ] DNS records added
- [ ] Test email sending
- [ ] Test Stripe checkout flow
- [ ] Verify webhook events received

---

## Important Links Summary

| Service | Dashboard URL | Purpose |
|---------|--------------|---------|
| **Supabase** | https://supabase.com/dashboard | Database + Auth |
| **Railway** | https://railway.app | Backend API hosting |
| **Stripe** | https://dashboard.stripe.com | Payments |
| **Resend** | https://resend.com | Transactional emails |
| **Vercel** | https://vercel.com/dashboard | Frontend hosting |
| **GitHub** | https://github.com/pitosanchez/wayback-wednesday | Code repository |

---

## Security Checklist

### Backend Environment Variables (NEVER EXPOSE)
- ❌ `SUPABASE_SERVICE_KEY`
- ❌ `DATABASE_URL`
- ❌ `STRIPE_SECRET_KEY`
- ❌ `STRIPE_WEBHOOK_SECRET`
- ❌ `RESEND_API_KEY`

### Frontend Environment Variables (SAFE)
- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_ANON_KEY`
- ✅ `VITE_STRIPE_PUBLISHABLE_KEY`
- ✅ `VITE_API_BASE_URL`

### Files to NEVER Commit
- `api/.env`
- `.env.local`
- `.env.production`
- Any file with actual API keys

### Files SAFE to Commit
- `api/.env.example` (template only)
- `.env.example`
- All code files

---

## Testing

### Local Testing

```bash
# Backend
cd api
npm install
cp .env.example .env
# Fill in .env with your credentials
npm run db:seed
npm run dev

# Test in another terminal
curl http://localhost:3001/api/health
```

### Production Testing

```bash
# Health check
curl https://[railway-url]/api/health

# Contact form
curl -X POST https://[railway-url]/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Testing"}'
```

---

## Troubleshooting

### "CORS Error"
- Verify `FRONTEND_URL` in backend exactly matches frontend origin
- No trailing slashes
- Include protocol (https://)

### "Webhook signature failed"
- Ensure Stripe webhook secret is current
- Verify endpoint URL is correct
- Check Railway logs for errors

### "Email not sending"
- Verify Resend domain
- Check DNS records
- Ensure `EMAIL_FROM` uses verified domain

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Review Railway logs

---

## Next Steps After Deployment

1. Update Stripe products with correct prices
2. Test complete checkout flow
3. Test event booking flow
4. Monitor logs for errors
5. Set up monitoring/alerts
6. Document any custom configurations

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Railway Docs**: https://docs.railway.app
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs
- **Drizzle ORM**: https://orm.drizzle.team/docs/overview

