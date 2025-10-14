import { pgTable, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  base_price: integer('base_price').notNull(), // in cents
  category: varchar('category', { length: 100 }),
  image_url: text('image_url'),
  stripe_price_id: varchar('stripe_price_id', { length: 255 }),
  featured: integer('featured').default(0), // 0 or 1 for boolean
  tags: text('tags'), // JSON string array
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

