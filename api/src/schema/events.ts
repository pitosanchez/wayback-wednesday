import { pgTable, uuid, varchar, date, text, timestamp } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  date: date('date').notNull(),
  time: varchar('time', { length: 50 }),
  location: varchar('location', { length: 255 }),
  description: text('description'),
  image_url: text('image_url'),
  price: varchar('price', { length: 100 }),
  status: varchar('status', { length: 20 }).default('upcoming'), // upcoming, live, past
  category: varchar('category', { length: 50 }).default('music'), // music, culture, community, special
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

