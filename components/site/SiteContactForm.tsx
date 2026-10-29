'use client';

import { useState } from 'react';

type Topic = 'call' | 'list' | 'invest' | 'question';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS: { id: Topic; label: string; prefix: string }[] = [
  { id: 'call', label: 'Book a 20 minute call', prefix: 'Book a 20 minute call' },
  { id: 'list', label: 'Join the founding families', prefix: 'Founding families list' },
  { id: 'invest', label: 'Send me the investor brief', prefix: 'Investor brief request' },
  { id: 'question', label: 'Just a question', prefix: 'Question' },
];

const THANKS: Record<Topic, string> = {
  call: 'Thank you. Nathaniel will write back within a day with a few times for your call.',
  list: 'Thank you. You are on the founding families list. We will write to you first when spots open.',
  invest: 'Thank you. Nathaniel will send you the investor brief within a day.',
  question: 'Thank you. Nathaniel will write back within a day.',
};

// Only ever rendered on the client (inside FormSlot), so reading the URL here is safe.
function topicFromUrl(): Topic {
  const t = new URLSearchParams(window.location.search).get('topic');
  return TOPICS.some((x) => x.id === t) ? (t as Topic) : 'call';
}

export function SiteContactForm() {
  const [topic, setTopic] = useState<Topic>(topicFromUrl);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please check your email address.');
      return;
    }
    setStatus('sending');
    const prefix = TOPICS.find((x) => x.id === topic)!.prefix;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: `[${prefix}]\n\n${message.trim() || '(no message)'}` }),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('sent');
    } catch {
      setStatus('error');
      setError('Something went wrong and your message was not sent. Please try again, or write to hello@healinghomes.mx.');
    }
  }

  if (status === 'sent') {
    return <p className="cf-thanks">{THANKS[topic]}</p>;
  }

  return (
    <form className="cf" onSubmit={handleSubmit}>
      <fieldset className="cf-topics">
        <legend>What would you like?</legend>
        {TOPICS.map((t) => (
          <label key={t.id} className="cf-topic">
            <input
              type="radio"
              name="topic"
              value={t.id}
              checked={topic === t.id}
              onChange={() => setTopic(t.id)}
            />
            <span>{t.label}</span>
          </label>
        ))}
      </fieldset>
      <label className="cf-field" htmlFor="cf-name">
        <span>Your name</span>
        <input id="cf-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
      </label>
      <label className="cf-field" htmlFor="cf-email">
        <span>Your email</span>
        <input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </label>
      <label className="cf-field" htmlFor="cf-message">
        <span>{topic === 'call' ? 'Good days and times for you, and anything you want to ask' : 'Anything you want to tell us (optional)'}</span>
        <textarea id="cf-message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      {error && <p className="cf-error" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : topic === 'call' ? 'Ask for a call' : 'Send'}
      </button>
    </form>
  );
}
