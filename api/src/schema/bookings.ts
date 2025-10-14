import { pgTable, uuid, varchar, date, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  organization: varchar('organization', { length: 255 }),
  booking_type: varchar('booking_type', { length: 100 }).notNull(),
  event_date: date('event_date').notNull(),
  event_time: varchar('event_time', { length: 50 }),
  duration: integer('duration'), // hours
  location_type: varchar('location_type', { length: 20 }), // In-Person, Virtual
  venue_address: text('venue_address'),
  budget: varchar('budget', { length: 100 }),
  notes: text('notes'),
  status: varchar('status', { length: 20 }).default('pending'), // pending, confirmed, cancelled
  created_at: timestamp('created_at').defaultNow()
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

