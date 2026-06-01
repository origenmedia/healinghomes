import { createClient } from '@supabase/supabase-js';

// Server-only admin client for privileged writes such as the public contact
// form. It uses the Supabase service key and must never be imported into a
// client component. The service key bypasses row level security.
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.'
    );
  }

  return createClient(url, serviceKey, {
    db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'healinghomes' },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
