import { Router } from "express";
import Stripe from "stripe";
import { Request, Response } from "express";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe webhook handler
router.post("/stripe", async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("💰 Payment succeeded:", paymentIntent.id);
        // Update order status in database
        await handlePaymentSuccess(paymentIntent);
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log("❌ Payment failed:", failedPayment.id);
        // Handle payment failure
        await handlePaymentFailure(failedPayment);
        break;

      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("✅ Checkout completed:", session.id);
        // Fulfill the order
        await fulfillOrder(session);
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        console.log("📊 Subscription event:", event.type, subscription.id);
        // Handle subscription changes
        await handleSubscriptionChange(subscription, event.type);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// Helper functions
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // TODO: Update order status in Firestore
  // TODO: Send confirmation email
  // TODO: Update inventory
  console.log("Processing successful payment:", {
    id: paymentIntent.id,
    amount: paymentIntent.amount / 100,
    currency: paymentIntent.currency,
    metadata: paymentIntent.metadata,
  });
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  // TODO: Update order status
  // TODO: Send failure notification
  console.log("Processing failed payment:", {
    id: paymentIntent.id,
    error: paymentIntent.last_payment_error?.message,
  });
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  // TODO: Create order in database
  // TODO: Send order confirmation
  // TODO: Update inventory
  console.log("Fulfilling order from checkout session:", {
    id: session.id,
    customerEmail: session.customer_email,
    amount: session.amount_total ? session.amount_total / 100 : 0,
    metadata: session.metadata,
  });
}

async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  eventType: string
) {
  // TODO: Update user subscription status
  console.log("Processing subscription change:", {
    type: eventType,
    id: subscription.id,
    status: subscription.status,
    customerId: subscription.customer,
  });
}

export { router as webhookRouter };
