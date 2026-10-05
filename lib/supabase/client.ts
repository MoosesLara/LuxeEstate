import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase browser client — safe to use in Client Components.
 * For Server Components / Route Handlers, use `createServerClient()` instead.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
