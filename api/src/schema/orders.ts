import { pgTable, uuid, varchar, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id'), // Optional - from Supabase auth
  stripe_session_id: varchar('stripe_session_id', { length: 255 }),
  stripe_payment_intent_id: varchar('stripe_payment_intent_id', { length: 255 }),
  customer_email: varchar('customer_email', { length: 255 }),
  total_cents: integer('total_cents').notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // pending, completed, refunded, cancelled
  created_at: timestamp('created_at').defaultNow(),
  fulfilled_at: timestamp('fulfilled_at')
});

export const order_items = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: uuid('order_id').notNull().references(() => orders.id),
  product_id: integer('product_id'),
  product_name: varchar('product_name', { length: 255 }).notNull(),
  quantity: integer('quantity').notNull(),
  price_cents: integer('price_cents').notNull(),
  size: varchar('size', { length: 20 }),
  color: varchar('color', { length: 50 })
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof order_items.$inferSelect;
export type NewOrderItem = typeof order_items.$inferInsert;

