import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
import { logger } from '../lib/logger.js';

export const eventsRouter = Router();

const EventSchema = z.object({
  title: z.string().min(1).max(255),
  date: z.string(), // YYYY-MM-DD
  time: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  price: z.string().optional(),
  status: z.enum(['upcoming', 'live', 'past']).default('upcoming'),
  category: z.enum(['music', 'culture', 'community', 'special']).default('music')
});

/**
 * GET /api/events
 * Get all events
 */
eventsRouter.get('/events', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      logger.error('Events query error', error);
      return res.status(500).json({ ok: false, error: 'DB_QUERY_FAILED' });
    }

    res.json({ ok: true, events: data });
    
  } catch (error) {
    logger.error('Get events error', error);
    res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
});

/**
 * POST /api/events
 * Create new event (admin only - add auth middleware later)
 */
eventsRouter.post('/events', async (req: Request, res: Response) => {
  try {
    const parsed = EventSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      });
    }

    const eventData = {
      title: parsed.data.title,
      date: parsed.data.date,
      time: parsed.data.time || null,
      location: parsed.data.location || null,
      description: parsed.data.description || null,
      image_url: parsed.data.imageUrl || null,
      price: parsed.data.price || null,
      status: parsed.data.status,
      category: parsed.data.category
    };

    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) {
      logger.error('Event insert error', error);
      return res.status(500).json({ ok: false, error: 'DB_INSERT_FAILED' });
    }

    logger.info('Event created', { eventId: data.id });
    res.json({ ok: true, event: data });
    
  } catch (error) {
    logger.error('Create event error', error);
    res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
});

/**
 * PUT /api/events/:id
 * Update event (admin only)
 */
eventsRouter.put('/events/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = EventSchema.partial().safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      });
    }

    const { data, error } = await supabase
      .from('events')
      .update(parsed.data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Event update error', error);
      return res.status(500).json({ ok: false, error: 'DB_UPDATE_FAILED' });
    }

    res.json({ ok: true, event: data });
    
  } catch (error) {
    logger.error('Update event error', error);
    res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
});

/**
 * DELETE /api/events/:id
 * Delete event (admin only)
 */
eventsRouter.delete('/events/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Event delete error', error);
      return res.status(500).json({ ok: false, error: 'DB_DELETE_FAILED' });
    }

    res.json({ ok: true });
    
  } catch (error) {
    logger.error('Delete event error', error);
    res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
});

