import { supabase } from './lib/supabase.js';
import { logger } from './lib/logger.js';

async function seed() {
  logger.info('🌱 Starting database seed...');

  try {
    // Seed products
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id')
      .eq('name', 'WB Clemente Black Tee')
      .single();

    if (!existingProducts) {
      const { error: productError } = await supabase
        .from('products')
        .insert([
          {
            name: 'WB Clemente Black Tee',
            description: 'Limited edition black tee featuring the iconic WB Clemente design',
            base_price: 5500, // $55.00 in cents
            category: 'Apparel',
            stripe_price_id: 'price_example_1',
            featured: 1
          },
          {
            name: 'Vintage Cassette Hoodie',
            description: 'Premium black hoodie featuring a vintage Sony cassette tape design',
            base_price: 7500, // $75.00
            category: 'Apparel',
            stripe_price_id: 'price_example_2',
            featured: 1
          }
        ]);

      if (productError) {
        logger.error('Product seed failed', productError);
      } else {
        logger.info('✅ Products seeded');
      }
    } else {
      logger.info('Products already exist, skipping');
    }

    // Seed featured event
    const { data: existingEvent } = await supabase
      .from('events')
      .select('id')
      .eq('title', 'This Is How It Should Be Done')
      .single();

    if (!existingEvent) {
      const { error: eventError } = await supabase
        .from('events')
        .insert([{
          title: 'This Is How It Should Be Done',
          date: '2025-11-11',
          time: '7:00 PM',
          location: 'El Barrio Art Space PS 109',
          description: 'G-Bo Double R Documentary Screening - An intimate look at the journey and impact of G-Bo The Pro',
          price: 'See TicketLeap',
          status: 'upcoming',
          category: 'special'
        }]);

      if (eventError) {
        logger.error('Event seed failed', eventError);
      } else {
        logger.info('✅ Events seeded');
      }
    } else {
      logger.info('Events already exist, skipping');
    }

    logger.info('🎉 Seed completed successfully!');
    process.exit(0);
    
  } catch (error) {
    logger.error('Seed failed', error);
    process.exit(1);
  }
}

seed();

