/**
 * Supabase client singleton
 * This is the ONLY place where we instantiate Supabase
 * All data access must go through here
 */

import { createClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  // Check if we have env vars for Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If no Supabase config, return null (will fall back to seed data)
  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  // Create singleton client
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }

  return supabaseClient
}

export function isSupabaseEnabled(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
