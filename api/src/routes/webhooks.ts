import { Router, Request, Response } from 'express';
import { stripe } from '../lib/stripe.js';
import { supabase } from '../lib/supabase.js';
import { sendOrderConfirmation } from '../lib/mail.js';
import { env } from '../lib/env.js';
import { logger } from '../lib/logger.js';
import Stripe from 'stripe';

export const webhooksRouter = Router();

/**
 * POST /webhooks/stripe
 * Handle Stripe webhook events
 * IMPORTANT: This route must use express.raw() middleware, not express.json()
 */
webhooksRouter.post('/webhooks/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    logger.warn('Webhook called without signature');
    return res.status(400).send('Missing stripe-signature header');
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const error = err as Error;
    logger.error('Webhook signature verification failed', error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        logger.info('Checkout session completed', { sessionId: session.id });

        // Create order record in database
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([{
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent as string,
            customer_email: session.customer_details?.email || session.customer_email,
            total_cents: session.amount_total || 0,
            status: 'completed'
          }])
          .select()
          .single();

        if (orderError) {
          logger.error('Failed to create order record', orderError);
        } else {
          logger.info('Order record created', { orderId: order.id });

          // Send order confirmation email
          if (session.customer_details?.email) {
            try {
              await sendOrderConfirmation({
                email: session.customer_details.email,
                orderNumber: order.id,
                items: [], // TODO: Get items from session line_items
                total: (session.amount_total || 0) / 100
              });
            } catch (emailError) {
              logger.warn('Order confirmation email failed', { error: emailError });
            }
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.info('Payment intent succeeded', { paymentIntentId: paymentIntent.id });
        
        // Update order status if exists
        await supabase
          .from('orders')
          .update({ status: 'completed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.warn('Payment intent failed', { paymentIntentId: paymentIntent.id });
        
        await supabase
          .from('orders')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        logger.info('Subscription event', { type: event.type, subscriptionId: subscription.id });
        // TODO: Handle subscription logic
        break;
      }

      default:
        logger.debug('Unhandled event type', { type: event.type });
    }

    // Always return 200 to acknowledge receipt
    res.json({ received: true, eventType: event.type });
    
  } catch (error) {
    logger.error('Webhook handler error', error);
    // Still return 200 to prevent Stripe from retrying
    res.json({ received: true, error: 'Handler error' });
  }
});
