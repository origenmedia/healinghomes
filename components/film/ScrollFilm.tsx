'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// The home page film. One continuous camera flight through El Refugio, the
// 9 family village near Lake Chapala. The scroll sets the video time, so the
// visitor drives the camera; nothing plays by itself. Captions are real HTML
// over the picture. See the Scroll Film Sites playbook in the brain.

type Chapter = {
  at: [number, number];
  title?: string;
  sub?: string;
  eyebrow?: string;
  still: string;
  end?: boolean;
  side?: 'right';
  // A single "Become a founding family" button under the words.
  cta?: 'join';
  // A quiet beat with no words on screen.
  silent?: boolean;
};

// Times are seconds into the film, measured from the built file. Sunrise over
// the village, Nathaniel at his plan table, the build, the app, the finished
// home, rain to glass, the solar roofs, the garden, the garden pantry, the
// long table, past the temazcal to the fire, and the stars.
const CHAPTERS: Chapter[] = [
  { at: [0, 4], title: 'Your own water, food and power, with neighbors you trust.', sub: 'El Refugio: 9 homes near Lake Chapala, Mexico.', still: 'sunrise' },
  { at: [4, 11.4], eyebrow: '9 founding families', title: 'Finished homes from about US$365,000, land included.', still: 'village9', cta: 'join' },
  { at: [11.4, 32.9], title: "I'm Nathaniel.", sub: 'I build homes in Mexico.', still: 'nathaniel' },
  { at: [32.9, 38.4], title: 'Your home, built by hand.', still: 'build' },
  { at: [38.4, 45.3], title: 'The whole build, on your phone.', sub: 'You pay in steps as your home is built, and watch every step from home.', still: 'app', side: 'right' },
  { at: [45.3, 51], title: 'A finished home, ready to live in.', still: 'home' },
  { at: [51, 60.6], title: 'Your own water.', sub: 'Rain from your roof, cleaned for drinking and stored under your home.', still: 'storm' },
  { at: [60.6, 66.4], title: 'Your own power.', sub: "Solar on every roof. When the town's lights go out, yours stay on.", still: 'roofs' },
  { at: [66.4, 73.2], title: 'Your own food.', sub: 'A gardener tends the garden. You pick what you need.', still: 'gardener' },
  { at: [73.2, 78.6], title: 'A garden pantry for all 9 families.', sub: 'Shelves of jars, grains and water.', still: 'pantry' },
  { at: [78.6, 81.9], title: 'Dinner from the garden, with your neighbors.', still: 'table' },
  { at: [81.9, 85.4], title: 'Every age is welcome.', sub: 'Grandparents, parents and kids. Neighbors who know your name.', still: 'table' },
  { at: [85.4, 88.4], still: 'temazcal', silent: true },
  { at: [88.4, 96.6], title: 'A warm fire under a sky full of stars.', still: 'fire' },
  { at: [96.6, 100.29], eyebrow: 'Founding families', title: 'Ready for hard times. Made for good ones.', sub: 'Be one of the first 9 families. Finished homes from about US$365,000, land included.', still: 'night', end: true },
];
// Seconds, matching the film file. Chapter times are scaled to the real length.
const DURATION = 100.29;
// Every picture is a concept image of homes not built yet.
const FIRST_CONCEPT = 0;
// The sticky join button shows from this chapter on (the first screens have their own).
const ASK_FROM = 2;
// Extra scroll (in svh) that holds the last screen before the page moves on.
const HOLD = 60;
// Until a wide film for computers is made, computers play the phone film in a
// centered column with the words beside it. Set to true once film-wide.mp4
// and the -wide stills match this film.
const WIDE_FILM = false;

export function ScrollFilm() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [tall, setTall] = useState<boolean | null>(null);
  const [still, setStill] = useState(false);
  const [side, setSide] = useState(false);

  // Pick the film for this screen shape, and honour reduced motion.
  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 3/4)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setTall(mq.matches);
      setStill(rm.matches);
      // On computers the words sit beside the column when there is room for them.
      const col = Math.min(window.innerWidth, (window.innerHeight * 9) / 16);
      setSide((window.innerWidth - col) / 2 >= 300);
    };
    update();
    mq.addEventListener('change', update);
    rm.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      rm.removeEventListener('change', update);
      window.removeEventListener('resize', update);
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
    let revealed = false;
    // The stills stay up until the video shows the frame for this scroll
    // position, so a jump straight to the end never flashes the opening.
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.classList.add('playing');
    };

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
      else reveal();
    };
    const onSeeked = () => {
      reveal();
      seek();
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
      // The sticky join button shows through the film and hides on the screens
      // that have their own buttons. The section after the film has them too.
      el.classList.toggle('ask', idx >= ASK_FROM && idx < CHAPTERS.length - 1);
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
      frame();
    };
    // iOS paints a seeked frame only after the video has played once.
    const prime = () => {
      if (!v) return;
      v.play()
        .then(() => v.pause())
        .catch(() => {});
    };
    // Load the whole film into memory before the scroll drives it. Streaming
    // it while scrubbing made every seek wait on the network, so the film
    // jumped from scene to scene. The stills show until it is in.
    let blobUrl = '';
    let dead = false;
    if (v && !still) {
      const file = `/film/film-${WIDE_FILM && tall === false ? 'wide' : 'tall'}.mp4`;
      v.addEventListener('loadeddata', onReady, { once: true });
      v.addEventListener('seeked', onSeeked);
      window.addEventListener('touchstart', prime, { once: true, passive: true });
      fetch(file)
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.blob();
        })
        .then((b) => {
          if (dead) return;
          blobUrl = URL.createObjectURL(b);
          v.src = blobUrl;
        })
        .catch(() => {
          if (!dead) v.src = file;
        });
    }
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('touchstart', prime);
      v?.removeEventListener('seeked', onSeeked);
      v?.removeEventListener('loadeddata', onReady);
      cancelAnimationFrame(raf);
      dead = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [tall, still]);

  const kind = WIDE_FILM && tall === false ? 'wide' : 'tall';
  const column = !WIDE_FILM && tall === false;

  return (
    <div
      className={`sf${still ? ' is-still' : ''}${column ? ' column' : ''}${column && side ? ' side' : ''}`}
      ref={root}
      style={{ height: `${Math.round((DURATION / 5) * 125) + HOLD}svh` }}
    >
      <h1 className="sf-vh">El Refugio: 9 homes near Lake Chapala, Mexico</h1>
      <div className="sf-stage">
        {tall !== null && !still && (
          <video
            key={kind}
            ref={video}
            className="sf-video"
            poster={`/film/film-${kind}-poster.jpg`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        <div className="sf-stills" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <picture key={i} data-still className={i === 0 ? 'on' : undefined}>
              {WIDE_FILM && <source media="(max-aspect-ratio: 3/4)" srcSet={`/film/${c.still}-tall.webp`} />}
              <img
                src={`/film/${c.still}-${WIDE_FILM ? 'wide' : 'tall'}.webp`}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
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
            <div
              key={i}
              data-cap
              aria-hidden={c.silent ? true : undefined}
              className={`sf-cap${c.end ? ' end' : ''}${c.side === 'right' ? ' right' : ''}${c.silent ? ' silent' : ''}${i === 0 ? ' on' : ''}`}
            >
              {c.eyebrow && <span className="sf-eyebrow">{c.eyebrow}</span>}
              {c.title && <h2>{c.title}</h2>}
              {c.sub && <p>{c.end ? c.sub.split(/(?<=\.)\s+/).map((line) => <span key={line}>{line}</span>) : c.sub}</p>}
              {c.cta === 'join' && (
                <div className="sf-cta">
                  <Link href="/en/contact?topic=list" className="main">
                    Become a founding family
                  </Link>
                </div>
              )}
              {c.end && (
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
