// The contact page head changes with the topic (?topic=list|call|invest).
// The server renders it into the page HTML, and the form keeps it in step.
export type Topic = 'call' | 'list' | 'invest' | 'question';

export const TOPIC_IDS: Topic[] = ['list', 'call', 'invest', 'question'];

export function toTopic(value: unknown): Topic {
  return TOPIC_IDS.includes(value as Topic) ? (value as Topic) : 'question';
}

export const HEADS: Record<Topic, { eyebrow: string; head: string; lede: string; title: string }> = {
  list: {
    eyebrow: 'Founding families',
    head: 'Become a founding family',
    lede: 'Be one of the first 9. Every message is read, and a member of our team will reach out very soon.',
    title: 'Become a founding family · Healing Homes',
  },
  call: {
    eyebrow: 'A 20 minute call',
    head: 'Talk with Nathaniel',
    lede: 'Tell us when suits you. A member of our team will reach out very soon with times for a 20 minute call.',
    title: 'Talk with Nathaniel · Healing Homes',
  },
  invest: {
    eyebrow: 'Investors',
    head: 'Thinking about investing?',
    lede: "Tell us a little about what you're looking for, and we'll set up a call.",
    title: 'Investors · Healing Homes',
  },
  question: {
    eyebrow: 'Questions',
    head: "Let's talk.",
    lede: 'Ask anything. Every message is read, and a member of our team will reach out very soon.',
    title: "Let's talk · Healing Homes",
  },
};
