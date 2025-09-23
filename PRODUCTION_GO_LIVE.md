# gbothepro.com – Production Go‑Live Checklist

This is the exact step‑by‑step guide to take gbothepro.com to production.

---

## 1) Frontend (Vercel)

1. Import repo into Vercel (Project name: `gbothepro`).
2. Build settings
   - Framework: Vite (auto)
   - Build command: `npm run build`
   - Output directory: `dist`
3. Domain
   - Add `gbothepro.com` as Production domain.
   - Let Vercel manage DNS/SSL or point DNS as instructed.
4. Environment variables (set for both Production and Preview):
   - `VITE_FIREBASE_API_KEY=…`
   - `VITE_FIREBASE_AUTH_DOMAIN=…`
   - `VITE_FIREBASE_PROJECT_ID=…`
   - `VITE_FIREBASE_STORAGE_BUCKET=…`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID=…`
   - `VITE_FIREBASE_APP_ID=…`
   - `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_…` (use live key when going live)
   - `VITE_API_URL=https://api.gbothepro.com`
   - `VITE_ADMIN_PASS_HASH=bc53dff8eed6f48184cd92d59053ee0e09640e4c07d973170d76e7fcb64cd765`
   - `VITE_ADMIN_SESSION_HOURS=12`
   - `VITE_MAINTENANCE_ENABLED=false`
   - `VITE_PREVIEW_TOKEN=` (optional; only if re‑enabling the gate)
5. Redeploy the Production deployment so Vite inlines the env vars.

---

## 2) Backend API (Stripe + Orders)

Choose a host (Railway/Render/Heroku/Fly). Example assumptions below:

1. Deploy `api/` service
   - Node: 20
   - Start: `npm run start`
2. API environment variables
   - `STRIPE_SECRET_KEY=sk_test_…`
   - `STRIPE_WEBHOOK_SECRET=whsec_…` (after webhook is created)
   - `FRONTEND_URL=https://gbothepro.com`
   - `FIREBASE_PROJECT_ID=…`
   - `FIREBASE_CLIENT_EMAIL=…@…iam.gserviceaccount.com`
   - `FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n…\n-----END PRIVATE KEY-----\n"`
   - `PORT=3001`
   - `NODE_ENV=production`
3. Custom domain for API
   - Expose e.g. `https://api.gbothepro.com` and point DNS accordingly.

---

## 3) Stripe (Test first, then Live)

1. Dashboard → Developers → API keys → copy test keys.
   - Frontend: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_…`
   - Backend: `STRIPE_SECRET_KEY=sk_test_…`
2. Webhooks → Add endpoint:
   - URL: `https://api.gbothepro.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
   - Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` (API env).
3. Run an end‑to‑end payment with `4242 4242 4242 4242`.

> Go‑Live: swap to `pk_live_…` and `sk_live_…`, create a Live webhook endpoint, update `STRIPE_WEBHOOK_SECRET`, redeploy API, then redeploy frontend.

---

## 4) Firebase

1. Create project in Firebase Console.
2. Enable
   - Authentication (Email/Password)
   - Firestore
   - Storage
3. Deploy security rules

```bash
npm i -g firebase-tools
firebase login
firebase use <your-project-id>
firebase deploy --only firestore:rules,storage:rules
```

4. Copy Firebase web config values into Vercel env (`VITE_FIREBASE_*`).

---

## 5) Security & Visibility

- Under‑construction gate: `VITE_MAINTENANCE_ENABLED=false`
- `public/robots.txt` blocks admin routes (already present).
- Admin sign‑in uses a SHA‑256 hash; no plaintext passwords rendered.
- Force HTTPS (Vercel does this by default).
- Optional (recommended): CSP/HSTS headers; 2FA for admin; CAPTCHA on admin sign‑in.

---

## 6) Production Verification Checklist

- Home page renders; no construction screen.
- Shop → Add to cart → Checkout (Stripe test) succeeds.
- Admin sign‑in at `/#/admin-signin` works; Dashboard & Analytics visible.
- API logs show CORS permitting `https://gbothepro.com`.
- Stripe Dashboard shows payments & successful webhook deliveries.
- Firestore/Storage reachable; no console errors.

---

## 7) Performance/SEO After Launch (quick wins)

- Code‑split large routes; lazy‑load heavy components.
- Compress hero video; provide poster; image `srcset` + WebP/AVIF.
- Add page titles/descriptions per route; OG/Twitter meta; sitemap.xml.
- Add error boundaries, Sentry (frontend), and uptime monitoring.

---

## 8) Troubleshooting

- "Missing VITE_ADMIN_PASS_HASH": set it in Vercel env (Production + Preview) and redeploy.
- Construction screen visible: ensure `VITE_MAINTENANCE_ENABLED=false` and redeploy.
- Stripe errors: verify publishable/secret keys belong to the same mode (test vs live); confirm webhook secret.
- CORS: ensure API `FRONTEND_URL` is `https://gbothepro.com`.

---

## 9) Credentials & Secrets

- Do not commit `.env` or secrets; keep them in Vercel/API host env.
- Admin password is validated via hash (`VITE_ADMIN_PASS_HASH`). Rotate periodically.

---

## 10) Going Live (switch from test to live payments)

1. Update keys: `pk_live_…`, `sk_live_…`, and Live webhook.
2. Redeploy API, then redeploy frontend.
3. Verify a $0.50–$1.00 live charge with a real card if desired.

---

Prepared for: gbothepro.com
Last updated: 2025-09-23
