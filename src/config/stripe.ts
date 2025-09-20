import { loadStripe } from "@stripe/stripe-js";

// Stripe configuration with environment variable support
// IMPORTANT: This is a demo key - replace with your real Stripe test key!
// Get your key from: https://dashboard.stripe.com/test/apikeys
const DEMO_STRIPE_KEY = "pk_test_51234567890abcdef";
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || DEMO_STRIPE_KEY;

// Validate Stripe configuration
if (STRIPE_PUBLISHABLE_KEY === DEMO_STRIPE_KEY) {
  console.error(
    "🚨 STRIPE SETUP REQUIRED: You're using a demo key that won't work!\n" +
      "Please follow these steps:\n" +
      "1. Go to https://dashboard.stripe.com (sign up if needed)\n" +
      "2. Copy your test publishable key (starts with pk_test_)\n" +
      "3. Create a .env.local file in your project root\n" +
      "4. Add: VITE_STRIPE_PUBLISHABLE_KEY=your_key_here\n" +
      "5. Restart the dev server\n" +
      "See STRIPE_SETUP_GUIDE.md for detailed instructions!"
  );
}

// Initialize Stripe
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const stripeConfig = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  currency: "usd",
  country: "US",
};

// Get Stripe configuration with validation
export const getStripeConfig = () => {
  if (!STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY === "") {
    throw new Error(
      "Stripe publishable key is required. Please set VITE_STRIPE_PUBLISHABLE_KEY in your environment."
    );
  }

  const isTestMode = STRIPE_PUBLISHABLE_KEY.startsWith("pk_test_");
  const isLiveMode = STRIPE_PUBLISHABLE_KEY.startsWith("pk_live_");

  if (!isTestMode && !isLiveMode) {
    console.warn("⚠️ Invalid Stripe key format detected.");
  }

  return {
    publishableKey: STRIPE_PUBLISHABLE_KEY,
    currency: "usd",
    country: "US",
    mode: isLiveMode ? "live" : "test",
  };
};
