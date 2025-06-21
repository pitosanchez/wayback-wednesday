export interface StripeConfig {
  publishableKey: string;
  secretKey?: string;
}

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  payment_status: string;
}

export interface PaymentFormData {
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface BillingDetails {
  name: string;
  email: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: PaymentIntent;
  error?: string;
}
