import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Create Supabase client with service role key (backend only)
export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Helper to verify user JWT tokens from frontend
export async function verifyUserToken(token: string) {
  const { data, error } = await supabase.auth.getUser(token);
  
  if (error || !data.user) {
    return null;
  }
  
  return data.user;
}

console.log('✅ Supabase client initialized');

