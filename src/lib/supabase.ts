// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('PUBLIC_SUPABASE_URL no está definida. Verifica tu archivo .env')
}

if (!supabaseAnonKey) {
  throw new Error('PUBLIC_SUPABASE_ANON_KEY no está definida. Verifica tu archivo .env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)