/**
 * Supabase client initialization.
 *
 * This file creates a single shared Supabase client for the entire app.
 * We read the project URL and anon key from Vite environment variables.
 */

import { createClient } from '@supabase/supabase-js';

// Read values from environment variables.
// In Vite, only variables prefixed with "VITE_" are exposed to the client.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Basic safety check – helps catch misconfigured env vars during development.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase configuration. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

/**
 * Single Supabase client instance used by the React app.
 * The anon key is public and used from the browser, protected by RLS policies.:contentReference[oaicite:15]{index=15}
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);