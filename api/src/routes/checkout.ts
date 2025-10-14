import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { stripe } from '../lib/stripe.js';
import { logger } from '../lib/logger.js';

export const checkoutRouter = Router();

const LineItemSchema = z.object({
  priceId: z.string().startsWith('price_'),
  quantity: z.number().int().positive()
});

const CreateSessionSchema = z.object({
  lineItems: z.array(LineItemSchema).min(1),
  mode: z.enum(['payment', 'subscription']).default('payment'),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  customerEmail: z.string().email().optional()
});

/**
 * POST /api/checkout/session
 * Create Stripe Checkout Session
 */
checkoutRouter.post('/checkout/session', async (req: Request, res: Response) => {
  try {
    const parsed = CreateSessionSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      });
    }

    const { lineItems, mode, successUrl, cancelUrl, customerEmail } = parsed.data;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: lineItems.map(item => ({
        price: item.priceId,
        quantity: item.quantity
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ['US']
      }
    };

    // Add customer email if provided
    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    logger.info('Checkout session created', { sessionId: session.id });

    res.json({ ok: true, url: session.url, sessionId: session.id });
    
  } catch (error) {
    logger.error('Checkout session creation failed', error);
    res.status(500).json({
      ok: false,
      error: 'STRIPE_SESSION_FAILED',
      message: 'Failed to create checkout session'
    });
  }
});

