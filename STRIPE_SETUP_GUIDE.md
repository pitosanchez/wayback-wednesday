# 🔧 Stripe Setup Guide - Fix Payment Error

## Current Issue

You're seeing: **"Invalid API Key provided: pk\*test\*\*\***\*\*\***\*\***cdef"\*\*

This is because the app is using a demo/placeholder Stripe key that isn't valid.

## ✅ Quick Fix (5 minutes)

### Step 1: Get Your Real Stripe Test Key

1. **Go to Stripe Dashboard**:
   👉 https://dashboard.stripe.com

2. **Sign up or Log in**:

   - If you don't have an account, sign up for free
   - If you have an account, just log in

3. **Get Your Test Key**:
   - Click on **"Developers"** in the left sidebar
   - Click on **"API keys"**
   - You'll see two test keys:
     - **Publishable key** (starts with `pk_test_`)
     - **Secret key** (starts with `sk_test_`)
   - Copy the **Publishable key** (the one starting with `pk_test_`)

### Step 2: Add Your Key to the Project

Create a file called `.env.local` in your project root with this content:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_[paste your key here]
```

**Example format** (don't use this exact key):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51OqRsTABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```

### Step 3: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run dev
```

## 🎯 Test Your Setup

After adding your real key and restarting:

1. Go to the Shop page
2. Add an item to cart
3. Go to Checkout
4. Use Stripe's test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/34`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

## 📝 Important Notes

### Test Mode vs Live Mode

- **Test keys** (start with `pk_test_`): For development and testing
- **Live keys** (start with `pk_live_`): For real payments in production
- Always use test keys during development!

### Security Tips

- ✅ Never commit `.env` or `.env.local` files to Git
- ✅ The `.gitignore` already excludes these files
- ✅ Only share test keys, never live keys
- ✅ Rotate keys if accidentally exposed

## 🚨 Troubleshooting

### Still Getting the Error?

1. **Check the key format**:

   - Must start with `pk_test_`
   - Should be about 100+ characters long
   - No spaces or line breaks

2. **Check the file name**:

   - Must be `.env.local` (with the dot)
   - Must be in the project root (same folder as `package.json`)

3. **Clear browser cache**:

   ```bash
   # Hard refresh in browser:
   # Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   # Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   ```

4. **Verify the key is loaded**:
   - Open browser DevTools Console
   - Look for any Stripe-related errors
   - The demo key warning should disappear

### Need a Stripe Account?

- Sign up free at: https://dashboard.stripe.com/register
- No credit card required for test mode
- Takes 2 minutes to set up

## ✅ Success Indicators

You'll know it's working when:

- No more "Invalid API Key" error
- Checkout page loads without errors
- You can enter card details
- Test payments process successfully

## 📚 Additional Resources

- [Stripe Test Cards](https://stripe.com/docs/testing#cards)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [Stripe Quick Start](https://stripe.com/docs/development/quickstart)

---

**Need more help?** The key issue is simply that you need to replace the demo key with your real Stripe test key. Once you do that, everything will work!
