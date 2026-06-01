import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return NextResponse.json({ error: 'too_long' }, { status: 400 });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message, source: 'website' });

    if (error) {
      console.error('contact_messages insert failed:', error.message);
      return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
  } catch (err) {
    console.error('contact handler error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }

  // TODO (Brevo): once the Brevo API key is configured, send a transactional
  // notification to hello@healinghomes.mx and a warm auto-reply to the sender.
  // Deferred on purpose; the message is already safely stored in Supabase.

  return NextResponse.json({ ok: true });
}
