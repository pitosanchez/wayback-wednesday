import Stripe from 'stripe';
import { env } from './env.js';

// Initialize Stripe with latest API version
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

console.log('✅ Stripe client initialized');

