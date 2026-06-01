'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const labelClass =
  'font-sans text-xs font-medium tracking-[0.15em] uppercase text-text-muted';
const fieldClass =
  'border border-border bg-surface px-4 py-3 text-text-primary text-base focus:outline-none focus:border-voice transition-colors';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('invalidEmail'));
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setError(t('error'));
    }
  }

  if (status === 'sent') {
    return (
      <p className="font-serif text-xl md:text-2xl text-text-primary leading-snug max-w-xl">
        {t('success')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClass}>
          {t('nameLabel')}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClass}>
          {t('emailLabel')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          {t('messageLabel')}
        </label>
        <textarea
          id="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={`${fieldClass} resize-y`}
        />
      </div>

      {error && (
        <p className="font-sans text-sm text-text-secondary">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || !name || !email || !message}
        className="self-start bg-voice text-page px-7 py-3.5 font-sans font-medium hover:bg-voice-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>
    </form>
  );
}
