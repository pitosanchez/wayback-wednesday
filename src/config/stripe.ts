import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
// In production, use environment variables
const STRIPE_PUBLISHABLE_KEY = "pk_test_51234567890abcdef"; // Demo key - replace with real key

// Initialize Stripe
export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const stripeConfig = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  currency: "usd",
  country: "US",
};

// Demo configuration - in production, these would come from environment variables
export const getStripeConfig = () => {
  const publishableKey =
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Stripe publishable key is required");
  }

  return {
    publishableKey,
    currency: "usd",
    country: "US",
  };
};
