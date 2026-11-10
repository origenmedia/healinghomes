'use client';

import { useEffect } from 'react';

const SRC = 'https://app.leadszen.io/embed.js';

type LeadsZenWindow = Window & { LeadsZenEmbed?: { scan: () => void } };

// Mounts the LeadsZen booking embed into any [data-leadszen-inline] element on
// the page. LeadsZen's script builds the iframe and resizes it to fit, so the
// booking form never shows an inner scrollbar.
export function LeadsZenEmbed() {
  useEffect(() => {
    const w = window as LeadsZenWindow;
    if (w.LeadsZenEmbed) {
      w.LeadsZenEmbed.scan();
      return;
    }
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return null;
}
