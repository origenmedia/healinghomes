'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// The home page film. One continuous camera flight, rendered twice: wide for
// computers, tall (9:16) for phones. The scroll sets the video time, so the
// visitor drives the camera; nothing plays by itself. Captions are real HTML
// over the picture. See the Scroll Film Sites playbook in the brain.

type Chapter = { at: [number, number]; title: string; sub?: string; still: string; end?: boolean };

// Times are seconds into the film, measured from the built file. The film opens
// on a city crowd bowed over phones. Lightning strikes, the power fails from the
// far end of the street toward you, the phones die one by one, and in the dark a
// gold line draws the lake. Then dawn, Nathaniel at his plan table, the build,
// the app, the finished wall and door, rain to glass, the garden, the long table,
// the fire and the stars.
const CHAPTERS: Chapter[] = [
  { at: [0, 1.5], title: 'Life is speeding up.', still: 'rush' },
  { at: [1.5, 4.9], title: 'The future is unpredictable.', still: 'citystorm' },
  { at: [4.9, 8.6], title: "What's your plan?", still: 'answer' },
  { at: [8.6, 15.42], title: 'A place to feel human again.', sub: 'El Refugio: 12 homes above Lake Chapala, near Guadalajara, Mexico.', still: 'lake' },
  { at: [15.42, 38.63], title: "I'm Nathaniel.", sub: 'I build homes in Mexico.', still: 'nathaniel' },
  { at: [38.63, 44.13], title: 'Your home, built by hand.', still: 'build' },
  { at: [44.13, 52.32], title: 'The whole build, on your phone.', sub: 'You pay in steps as your home is built, and watch every step from home.', still: 'app' },
  { at: [52.32, 59.07], title: 'Thick earth walls.', sub: 'Cool on hot days. Warm on cold nights.', still: 'lane' },
  { at: [59.07, 73.6], title: 'Your own water.', sub: 'Rain from your roof, cleaned for drinking and stored under your home.', still: 'storm' },
  { at: [73.6, 79.1], title: 'Your own food. Your own power.', sub: 'A gardener does the hard work. Solar keeps the lights on.', still: 'garden' },
  { at: [79.1, 89.6], title: 'Every age is welcome.', sub: 'Grandparents, parents and kids. Neighbors who know your name.', still: 'dusk' },
  { at: [89.6, 94.5], title: 'Dinner from the garden, with your neighbors.', still: 'table' },
  { at: [94.5, 104.45], title: 'A warm fire under a sky full of stars.', still: 'fire' },
  { at: [104.45, 106.95], title: 'Be one of the first 12 families.', sub: 'Finished homes from US$321,000, land included. Pick your lot before anyone else.', still: 'night', end: true },
];
// Seconds, matching the film file. Chapter times are scaled to the real length.
const DURATION = 106.95;
// From the lake on, every picture is a concept image of homes not built yet.
const FIRST_CONCEPT = 3;
// Extra scroll (in svh) that holds the last screen before the page moves on.
const HOLD = 60;

export function ScrollFilm() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [tall, setTall] = useState<boolean | null>(null);
  const [still, setStill] = useState(false);

  // Pick the film for this screen shape, and honour reduced motion.
  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 3/4)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setTall(mq.matches);
      setStill(rm.matches);
    };
    update();
    mq.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      rm.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || tall === null) return;
    const caps = Array.from(el.querySelectorAll<HTMLElement>('[data-cap]'));
    const stills = Array.from(el.querySelectorAll<HTMLElement>('[data-still]'));
    let target = 0;
    let shown = -1;
    let raf = 0;
    let ready = false;

    const progress = () => {
      const r = el.getBoundingClientRect();
      const span = el.offsetHeight - window.innerHeight * (1 + HOLD / 100);
      return Math.min(1, Math.max(0, -r.top / span));
    };

    // Seek one step at a time: never ask for a new frame while the last one is
    // still decoding. This is what keeps a fast flick on a phone from freezing.
    const seek = () => {
      if (!v || !ready || v.seeking) return;
      if (Math.abs(v.currentTime - target) > 0.02) v.currentTime = target;
    };

    const frame = () => {
      raf = 0;
      const p = progress();
      // Use the real length of the file; chapter times are scaled to match it.
      const len = v && v.duration > 0 && Number.isFinite(v.duration) ? v.duration : DURATION;
      target = p * (len - 0.05);
      const at = (target * DURATION) / len;
      el.style.setProperty('--film', String(p));
      el.classList.toggle('in', el.getBoundingClientRect().top < window.innerHeight * 0.5);
      let idx = 0;
      CHAPTERS.forEach((c, i) => {
        if (at >= c.at[0]) idx = i;
      });
      // The sticky join button shows through the film and hides on the last
      // screen, which has its own buttons. The section after the film has them too.
      el.classList.toggle('ask', p > 0.08 && idx < CHAPTERS.length - 1);
      el.classList.toggle('ending', idx === CHAPTERS.length - 1);
      el.classList.toggle('concept', idx >= FIRST_CONCEPT);
      if (idx !== shown) {
        shown = idx;
        caps.forEach((c, i) => c.classList.toggle('on', i === idx));
        stills.forEach((s, i) => s.classList.toggle('on', i === idx));
      }
      seek();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onReady = () => {
      ready = true;
      el.classList.add('playing');
      frame();
    };
    // iOS paints a seeked frame only after the video has played once.
    const prime = () => {
      if (!v) return;
      v.play()
        .then(() => v.pause())
        .catch(() => {});
    };
    if (v && !still) {
      v.addEventListener('loadeddata', onReady, { once: true });
      v.addEventListener('seeked', seek);
      window.addEventListener('touchstart', prime, { once: true, passive: true });
      if (v.readyState >= 2) onReady();
    }
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('touchstart', prime);
      v?.removeEventListener('seeked', seek);
      cancelAnimationFrame(raf);
    };
  }, [tall, still]);

  const kind = tall ? 'tall' : 'wide';

  return (
    <div className={`sf${still ? ' is-still' : ''}`} ref={root} style={{ height: `${Math.round((DURATION / 5) * 125) + HOLD}svh` }}>
      <div className="sf-stage">
        {tall !== null && !still && (
          <video
            key={kind}
            ref={video}
            className="sf-video"
            src={`/film/film-${kind}.mp4`}
            poster={`/film/film-${kind}-poster.jpg`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        <div className="sf-stills" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <picture key={c.still} data-still className={i === 0 ? 'on' : undefined}>
              <source media="(max-aspect-ratio: 3/4)" srcSet={`/film/${c.still}-tall.webp`} />
              <img src={`/film/${c.still}-wide.webp`} alt="" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
            </picture>
          ))}
        </div>
        <div className="sf-shade" aria-hidden="true" />
        <div className="sf-endshade" aria-hidden="true" />

        <header className="sf-top">
          <Link href="/en" className="sf-mark" aria-label="Healing Homes, home">
            Healing Homes<small>VILLAGES IN MEXICO</small>
          </Link>
          <nav aria-label="Main">
            <Link href="/en/el-refugio">El Refugio</Link>
            <Link href="/en/how-it-works">How it works</Link>
            <Link href="/en/my-story">My story</Link>
            <Link href="/en/contact?topic=call" className="sf-call">
              Talk with Nathaniel
            </Link>
          </nav>
        </header>
        <span className="sf-concept">Concept images</span>

        <div className="sf-caps">
          {CHAPTERS.map((c, i) => (
            <div key={c.title} data-cap className={`sf-cap${c.end ? ' end' : ''}${i === 0 ? ' on' : ''}`}>
              {c.end && <span className="sf-eyebrow">Founding families</span>}
              <h2>{c.title}</h2>
              {c.sub && <p>{c.sub}</p>}
              {i === CHAPTERS.length - 1 && (
                <div className="sf-cta">
                  <Link href="/en/contact?topic=list" className="main">
                    Become a founding family
                  </Link>
                  <Link href="/en/contact?topic=call" className="quiet">
                    Talk with Nathaniel
                  </Link>
                  <Link href="/en/contact?topic=invest" className="inv">
                    Investing? Let&apos;s talk.
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
        <span className="sf-line" aria-hidden="true" />
        <span className="sf-hint" aria-hidden="true">
          Scroll
        </span>
      </div>
      <Link href="/en/contact?topic=list" className="sf-ask">
        Become a founding family
      </Link>
    </div>
  );
}
