import type {
  PaymentFormData,
  PaymentIntent,
  CheckoutSession,
} from "../types/stripe";
import type { CartItem } from "../types/cart";

// Mock API base URL - in production, this would be your backend API
const API_BASE_URL = "/api";

// Convert cart items to Stripe line items format
export const convertCartToStripeLineItems = (cartItems: CartItem[]) => {
  return cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.price * 100), // Convert to cents
      product_data: {
        name: item.name,
        description: item.category,
        images: [item.image],
        metadata: {
          category: item.category,
          ...(item.size && { size: item.size }),
          ...(item.color && { color: item.color }),
        },
      },
    },
    quantity: item.quantity,
  }));
};

// Create Payment Intent (for direct card payments)
export const createPaymentIntent = async (
  paymentData: PaymentFormData
): Promise<PaymentIntent> => {
  try {
    // In a real application, this would make an API call to your backend
    // For demo purposes, we'll simulate the response
    const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(paymentData.amount * 100), // Convert to cents
        currency: paymentData.currency,
        description: paymentData.description,
        metadata: paymentData.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }

    return await response.json();
  } catch (error) {
    // For demo purposes, return a mock payment intent
    console.warn("Using mock payment intent for demo purposes");
    return {
      id: `pi_demo_${Date.now()}`,
      client_secret: `pi_demo_${Date.now()}_secret_demo`,
      amount: Math.round(paymentData.amount * 100),
      currency: paymentData.currency,
      status: "requires_payment_method",
    };
  }
};

// Create Checkout Session (for hosted checkout)
export const createCheckoutSession = async (
  cartItems: CartItem[]
): Promise<CheckoutSession> => {
  try {
    const lineItems = convertCartToStripeLineItems(cartItems);

    // In a real application, this would make an API call to your backend
    const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        line_items: lineItems,
        mode: "payment",
        success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/checkout/cancelled`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    return await response.json();
  } catch (error) {
    // For demo purposes, return a mock checkout session
    console.warn("Using mock checkout session for demo purposes");
    return {
      id: `cs_demo_${Date.now()}`,
      url: "#demo-checkout",
      payment_status: "unpaid",
    };
  }
};

// Retrieve checkout session
export const retrieveCheckoutSession = async (
  sessionId: string
): Promise<CheckoutSession> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/checkout-session/${sessionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve checkout session");
    }

    return await response.json();
  } catch (error) {
    // For demo purposes, return a mock session
    console.warn("Using mock session retrieval for demo purposes");
    return {
      id: sessionId,
      url: "",
      payment_status: "paid",
    };
  }
};
