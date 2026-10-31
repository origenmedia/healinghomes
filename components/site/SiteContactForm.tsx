'use client';

import { useEffect, useState } from 'react';

type Topic = 'call' | 'list' | 'invest' | 'question';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS: { id: Topic; label: string; prefix: string }[] = [
  { id: 'list', label: 'Become a founding family', prefix: 'Founding families list' },
  { id: 'call', label: 'Talk with Nathaniel (20 minute call)', prefix: 'Book a 20 minute call' },
  { id: 'invest', label: 'Talk about investing', prefix: 'Investor enquiry' },
  { id: 'question', label: 'Just a question', prefix: 'Question' },
];

// The page head and intro change with the topic. They live in the static page
// HTML (lib/site/pages/contact.ts) as #cf-head and #cf-lede.
const HEADS: Record<Topic, { eyebrow: string; head: string; lede: string }> = {
  list: {
    eyebrow: 'Founding families',
    head: 'Become a founding family',
    lede: 'Be one of the first 12. Nathaniel reads every message and writes back within a day.',
  },
  call: {
    eyebrow: 'A 20 minute call',
    head: 'Talk with Nathaniel',
    lede: 'Tell us when suits you. Nathaniel writes back within a day with times for a 20 minute call.',
  },
  invest: {
    eyebrow: 'Investors',
    head: 'Thinking about investing?',
    lede: "Tell Nathaniel a little about what you're looking for, and he'll set up a call.",
  },
  question: {
    eyebrow: 'Questions',
    head: "Let's talk.",
    lede: 'Ask anything. Nathaniel reads every message himself and writes back within a day.',
  },
};

const HOMES = ['Casa Semilla', 'Casa Raíz', 'Casa Tierra', 'Not sure yet'];
const WHEN = ['This year', 'In 1 to 2 years', 'Just dreaming'];

const PACKET = 'https://go.healinghomes.mx/el-refugio-founding/';

const THANKS: Record<Exclude<Topic, 'list'>, string> = {
  call: 'Thank you. Nathaniel will write back within a day with a few times for your call.',
  invest: 'Thank you. Nathaniel will write to you within a day to set up a call.',
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
  const [whatsapp, setWhatsapp] = useState('');
  const [home, setHome] = useState('');
  const [when, setWhen] = useState('');
  const [investing, setInvesting] = useState(() => topicFromUrl() === 'invest');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  // Keep the page head and intro in step with the chosen topic.
  useEffect(() => {
    const e = document.getElementById('cf-eyebrow');
    if (e) e.textContent = HEADS[topic].eyebrow;
    const h = document.getElementById('cf-head');
    const l = document.getElementById('cf-lede');
    if (h) h.textContent = HEADS[topic].head;
    if (l) l.textContent = HEADS[topic].lede;
  }, [topic]);

  function pickTopic(t: Topic) {
    setTopic(t);
    if (t === 'invest') setInvesting(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Please add your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please check your email address.');
      return;
    }
    setStatus('sending');
    // The API stores one message text, so the extra answers ride inside it.
    const prefix = TOPICS.find((x) => x.id === topic)!.prefix;
    const lines = [`[${prefix}]`];
    if (topic === 'list' && whatsapp.trim()) lines.push(`WhatsApp: ${whatsapp.trim()}`);
    if (topic === 'list') {
      if (home) lines.push(`Home: ${home}`);
      if (when) lines.push(`Move: ${when}`);
    }
    if (investing) lines.push('Also interested in investing: yes');
    lines.push('', message.trim().slice(0, 4000) || '(no message)');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: lines.join('\n') }),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('sent');
    } catch {
      setStatus('error');
      setError('Something went wrong and your message was not sent. Please try again, or write to hello@healinghomes.mx.');
    }
  }

  if (status === 'sent') {
    if (topic === 'list') {
      return (
        <div className="cf-thanks">
          <p>Welcome. Nathaniel will write to you personally within a day. While you wait, here is the founding families packet.</p>
          <p>
            <a className="btn" href={PACKET}>
              Open the founding families packet
            </a>
          </p>
        </div>
      );
    }
    return <p className="cf-thanks">{THANKS[topic]}</p>;
  }

  const button =
    status === 'sending'
      ? 'Sending'
      : topic === 'list'
        ? 'Join the founding families'
        : topic === 'call'
          ? 'Ask for a call'
          : 'Send';

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate>
      <fieldset className="cf-topics">
        <legend>What would you like?</legend>
        {TOPICS.map((t) => (
          <label key={t.id} className="cf-topic">
            <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => pickTopic(t.id)} />
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
      {topic === 'list' && (
        <>
          <label className="cf-field" htmlFor="cf-wa">
            <span>WhatsApp (optional)</span>
            <input id="cf-wa" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel" />
          </label>
          <fieldset className="cf-topics">
            <legend>Which home calls to you?</legend>
            {HOMES.map((h) => (
              <label key={h} className="cf-topic">
                <input type="radio" name="home" value={h} checked={home === h} onChange={() => setHome(h)} />
                <span>{h}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="cf-topics">
            <legend>When might you move?</legend>
            {WHEN.map((w) => (
              <label key={w} className="cf-topic">
                <input type="radio" name="when" value={w} checked={when === w} onChange={() => setWhen(w)} />
                <span>{w}</span>
              </label>
            ))}
          </fieldset>
        </>
      )}
      <label className="cf-topic cf-check">
        <input type="checkbox" checked={investing} onChange={(e) => setInvesting(e.target.checked)} />
        <span>I&apos;m also interested in investing</span>
      </label>
      <label className="cf-field" htmlFor="cf-message">
        <span>{topic === 'call' ? 'Good days and times for you (optional)' : 'Message (optional)'}</span>
        <textarea id="cf-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={4000} />
      </label>
      {error && (
        <p className="cf-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {button}
      </button>
    </form>
  );
}
