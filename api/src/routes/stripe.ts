import { Router } from "express";
import Stripe from "stripe";
import { z } from "zod";
import { validateRequest } from "../middleware/validation";

const router = Router();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Validation schemas
const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("usd"),
  metadata: z
    .object({
      orderId: z.string().optional(),
      userId: z.string().optional(),
    })
    .optional(),
});

const createCheckoutSessionSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive().int(),
      image: z.string().url().optional(),
    })
  ),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  customerEmail: z.string().email().optional(),
  metadata: z
    .object({
      orderId: z.string().optional(),
      userId: z.string().optional(),
    })
    .optional(),
});

// Create payment intent
router.post(
  "/create-payment-intent",
  validateRequest(createPaymentIntentSchema),
  async (req, res) => {
    try {
      const { amount, currency, metadata } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error("Payment intent creation failed:", error);
      res.status(500).json({
        error: "Failed to create payment intent",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Create checkout session
router.post(
  "/create-checkout-session",
  validateRequest(createCheckoutSessionSchema),
  async (req, res) => {
    try {
      const { items, successUrl, cancelUrl, customerEmail, metadata } =
        req.body;

      const lineItems = items.map(
        (item: {
          name: string;
          price: number;
          quantity: number;
          image?: string;
        }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : undefined,
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        })
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: customerEmail,
        metadata,
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
      });

      res.json({
        sessionId: session.id,
        url: session.url,
      });
    } catch (error) {
      console.error("Checkout session creation failed:", error);
      res.status(500).json({
        error: "Failed to create checkout session",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Retrieve payment intent
router.get("/payment-intent/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    res.json({
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100, // Convert from cents
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    });
  } catch (error) {
    console.error("Failed to retrieve payment intent:", error);
    res.status(404).json({ error: "Payment intent not found" });
  }
});

// Cancel payment intent
router.post("/cancel-payment-intent/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(req.params.id);
    res.json({
      id: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error("Failed to cancel payment intent:", error);
    res.status(400).json({ error: "Failed to cancel payment" });
  }
});

export { router as stripeRouter };
