# Wayback Wednesday API

Production-ready backend API with Supabase, PostgreSQL, Stripe, and Resend.

## Tech Stack

- **Runtime**: Node.js 20+
- **Server**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM
- **Auth**: Supabase Auth
- **Email**: Resend (transactional, SECURE - backend only)
- **Payments**: Stripe (Checkout + Webhooks)
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**CRITICAL**: Never commit `.env` file! It's in `.gitignore`.

### 3. Set Up Supabase

1. Create project at https://supabase.com
2. Go to Project Settings → API
   - Copy `URL` → `SUPABASE_URL`
   - Copy `service_role` key → `SUPABASE_SERVICE_KEY`
3. Go to Project Settings → Database
   - Copy connection string → `DATABASE_URL`

### 4. Run Database Migrations

```bash
# Generate migrations from schema
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 5. Configure External Services

#### Stripe Setup
1. Dashboard: https://dashboard.stripe.com
2. Get API keys: Developers → API keys
   - Copy `Secret key` → `STRIPE_SECRET_KEY`
3. Create products & prices
4. Set up webhook:
   - Developers → Webhooks → Add endpoint
   - URL: `https://your-api.railway.app/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

#### Resend Setup
1. Dashboard: https://resend.com
2. API Keys → Create
   - Copy API key → `RESEND_API_KEY`
3. Domains → Add your domain
4. Add DNS records (DKIM, SPF, DMARC)
5. Verify domain
6. Set `EMAIL_FROM` to match verified domain

### 6. Run Development Server

```bash
npm run dev
```

Server will start on http://localhost:3001

## API Endpoints

### Health Check
```bash
GET /api/health

curl http://localhost:3001/api/health
```

### Contact Form (Secure)
```bash
POST /api/contact
Body: { name: string, email: string, message: string }

curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Hello!"}'
```

### Event Booking (Secure)
```bash
POST /api/bookings
Body: { name, email, bookingType, eventDate, eventTime, notes, ... }

curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","bookingType":"DJ Set","eventDate":"2025-06-15","eventTime":"8:00 PM"}'
```

### Checkout Session
```bash
POST /api/checkout/session
Body: { lineItems: [{priceId, quantity}], mode, successUrl, cancelUrl }

curl -X POST http://localhost:3001/api/checkout/session \
  -H "Content-Type: application/json" \
  -d '{
    "lineItems":[{"priceId":"price_123","quantity":1}],
    "mode":"payment",
    "successUrl":"http://localhost:5173/success",
    "cancelUrl":"http://localhost:5173/cancel"
  }'
```

### Events CRUD
```bash
GET /api/events - Get all events
POST /api/events - Create event (admin)
PUT /api/events/:id - Update event (admin)  
DELETE /api/events/:id - Delete event (admin)
```

### Stripe Webhook
```bash
POST /webhooks/stripe
- Automatically called by Stripe
- Handles: checkout.session.completed, payment_intent.succeeded
- Creates order records in database
- Sends confirmation emails
```

## Local Development

### Test Stripe Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/webhooks/stripe

# Copy the webhook secret to .env as STRIPE_WEBHOOK_SECRET
```

### Database Migrations

```bash
# After changing schema files
npm run db:generate   # Generate migrations
npm run db:migrate    # Apply to database
```

## Deployment

### Railway (Backend API)

1. Connect GitHub repo
2. Add environment variables (see .env.example)
3. Deploy automatically on push to main
4. Custom domain: `api.yourdomain.com`

**Environment Variables** to set in Railway:
- All variables from `.env.example`
- `NODE_ENV=production`
- `FRONTEND_URL=https://your-vercel-app.vercel.app`

### Vercel/Netlify (Frontend)

Environment Variables:
```bash
VITE_API_BASE_URL=https://your-api.railway.app
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**DO NOT SET** in frontend:
- ❌ RESEND_API_KEY
- ❌ STRIPE_SECRET_KEY
- ❌ SUPABASE_SERVICE_KEY
- ❌ DATABASE_URL

## Security Notes

### API Key Safety

**BACKEND ONLY** (Never expose to frontend):
- `SUPABASE_SERVICE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `DATABASE_URL`

**FRONTEND SAFE** (Public keys):
- `VITE_SUPABASE_URL` ✅
- `VITE_SUPABASE_ANON_KEY` ✅
- `VITE_STRIPE_PUBLISHABLE_KEY` ✅

### CORS Configuration

Backend `FRONTEND_URL` must match frontend domain exactly:
- Local: `http://localhost:5173`
- Production: `https://your-app.vercel.app` (no trailing slash)

## Troubleshooting

### "CORS error"
- Check `FRONTEND_URL` in backend .env matches frontend origin exactly
- Ensure credentials: true in both frontend requests and backend CORS config

### "Webhook signature verification failed"
- Ensure `/webhooks/stripe` uses `express.raw()`, not `express.json()`
- Verify `STRIPE_WEBHOOK_SECRET` matches webhook endpoint secret in Stripe dashboard
- In development, use `stripe listen` to get correct secret

### "Email not sending"
- Verify domain in Resend dashboard
- Check DNS records are added
- Ensure `EMAIL_FROM` uses verified domain

## Support

For issues, check:
- Supabase logs: Dashboard → Logs
- Railway logs: Dashboard → Deployments → View logs
- Stripe events: Dashboard → Events

## License

Private

