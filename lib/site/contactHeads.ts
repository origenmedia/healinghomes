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
    lede: 'Be one of the first 12. Nathaniel reads every message and writes back within a day.',
    title: 'Become a founding family · Healing Homes',
  },
  call: {
    eyebrow: 'A 20 minute call',
    head: 'Talk with Nathaniel',
    lede: 'Tell us when suits you. Nathaniel writes back within a day with times for a 20 minute call.',
    title: 'Talk with Nathaniel · Healing Homes',
  },
  invest: {
    eyebrow: 'Investors',
    head: 'Thinking about investing?',
    lede: "Tell Nathaniel a little about what you're looking for, and he'll set up a call.",
    title: 'Investors · Healing Homes',
  },
  question: {
    eyebrow: 'Questions',
    head: "Let's talk.",
    lede: 'Ask anything. Nathaniel reads every message himself and writes back within a day.',
    title: "Let's talk · Healing Homes",
  },
};
