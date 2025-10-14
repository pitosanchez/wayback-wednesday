import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
import { sendBookingEmail } from '../lib/mail.js';
import { logger } from '../lib/logger.js';

export const bookingsRouter = Router();

const BookingSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  bookingType: z.string().min(1),
  eventDate: z.string(), // YYYY-MM-DD format
  eventTime: z.string(),
  duration: z.number().int().positive().optional(),
  locationType: z.enum(['In-Person', 'Virtual']).optional(),
  venueAddress: z.string().optional(),
  budget: z.string().optional(),
  notes: z.string().max(2000).optional(),
  testTo: z.string().email().optional(),
});

/**
 * POST /api/bookings
 * Create a new event booking request
 */
bookingsRouter.post('/bookings', async (req: Request, res: Response) => {
  try {
    const parsed = BookingSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      });
    }

    const bookingData = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      organization: parsed.data.organization || null,
      booking_type: parsed.data.bookingType,
      event_date: parsed.data.eventDate,
      event_time: parsed.data.eventTime,
      duration: parsed.data.duration || null,
      location_type: parsed.data.locationType || null,
      venue_address: parsed.data.venueAddress || null,
      budget: parsed.data.budget || null,
      notes: parsed.data.notes || null,
      status: 'pending'
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      logger.error('Database insert error', error);
      return res.status(500).json({
        ok: false,
        error: 'DB_INSERT_FAILED',
        message: 'Failed to save booking request'
      });
    }

    // Send notification email (don't fail if email fails)
    try {
      await sendBookingEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        bookingType: parsed.data.bookingType,
        eventDate: parsed.data.eventDate,
        eventTime: parsed.data.eventTime,
        notes: parsed.data.notes,
        testTo: parsed.data.testTo
      });
      logger.info('Booking email sent', { bookingId: data.id });
    } catch (emailError) {
      logger.warn('Email failed but booking saved', { error: emailError, bookingId: data.id });
    }

    res.json({ ok: true, booking: data });
    
  } catch (error) {
    logger.error('Booking creation error', error);
    res.status(500).json({
      ok: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred'
    });
  }
});

/**
 * GET /api/bookings
 * Get all bookings (admin only - add auth middleware later)
 */
bookingsRouter.get('/bookings', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Database query error', error);
      return res.status(500).json({ ok: false, error: 'DB_QUERY_FAILED' });
    }

    res.json({ ok: true, bookings: data });
    
  } catch (error) {
    logger.error('Get bookings error', error);
    res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
});

