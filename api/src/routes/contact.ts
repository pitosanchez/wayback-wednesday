import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../lib/mail.js';
import { logger } from '../lib/logger.js';

export const contactRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Valid email required'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message too long')
});

/**
 * POST /api/contact
 * SECURE: Resend API key stays on backend, never exposed to frontend
 */
contactRouter.post('/contact', async (req: Request, res: Response) => {
  try {
    // Validate input
    const parsed = ContactSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      });
    }

    const { name, email, message } = parsed.data;

    // Send email via Resend (SECURE - backend only)
    await sendContactEmail({ name, email, message });

    logger.info('Contact form submitted', { name, email });

    res.json({ ok: true, message: 'Contact form submitted successfully' });
    
  } catch (error) {
    logger.error('Contact form error', error);
    res.status(500).json({
      ok: false,
      error: 'EMAIL_SEND_FAILED',
      message: 'Failed to send message. Please try again.'
    });
  }
});
