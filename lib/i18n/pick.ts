import type { AbstractIntlMessages } from 'next-intl';

// Copies only the given message paths ('site.nav', 'home.wordmark', 'signin')
// out of the full message tree, so a page sends the browser just what its
// client components read.
export function pickMessages(messages: AbstractIntlMessages, paths: string[]): AbstractIntlMessages {
  const out: Record<string, unknown> = {};
  for (const path of paths) {
    const parts = path.split('.');
    let src: unknown = messages;
    let dst: Record<string, unknown> = out;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      if (typeof src !== 'object' || src === null || !(key in src)) break;
      const value = (src as Record<string, unknown>)[key];
      if (i === parts.length - 1) {
        dst[key] = value;
      } else {
        if (typeof dst[key] !== 'object' || dst[key] === null) dst[key] = {};
        dst = dst[key] as Record<string, unknown>;
        src = value;
      }
    }
  }
  return out as AbstractIntlMessages;
}
