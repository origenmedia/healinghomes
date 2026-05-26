'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const t = useTranslations('signin');
  const params = useParams();
  const locale = (params.locale as string) ?? 'en';

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('errorInvalidEmail'));
      return;
    }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/${locale}`,
      },
    });
    if (signInError) {
      setError(t('errorGeneric'));
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
        <Link href={`/${locale}`} className="font-serif text-4xl text-text-primary">
          Healing Homes
        </Link>
        <p className="text-text-secondary text-center max-w-md leading-relaxed">
          {t('linkSent', { email })}
        </p>
        <button
          onClick={() => { setSent(false); setEmail(''); }}
          className="text-sm text-text-muted hover:text-text-secondary transition-colors"
        >
          {t('tryAgain')}
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
      <Link href={`/${locale}`} className="font-serif text-4xl text-text-primary">
        Healing Homes
      </Link>
      <p className="text-text-muted text-center max-w-sm leading-relaxed">
        {t('intro')}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <label htmlFor="email" className="sr-only">{t('emailLabel')}</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          required
          autoFocus
          autoComplete="email"
          className="border border-border bg-surface px-4 py-3 text-text-primary text-base focus:outline-none focus:border-voice transition-colors"
        />
        {error && <p className="text-sm text-text-secondary">{error}</p>}
        <button
          type="submit"
          disabled={loading || !email}
          className="bg-voice text-page px-4 py-3 font-medium hover:bg-voice-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('sending') : t('sendLink')}
        </button>
      </form>
    </main>
  );
}
