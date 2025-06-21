import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log Supabase env variables (mask anon key for security)
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', (supabaseAnonKey || '').slice(0, 8) + '...');

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
