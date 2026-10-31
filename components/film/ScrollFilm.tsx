'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// The home page film. One continuous camera flight, rendered twice: wide for
// computers, tall (9:16) for phones. The scroll sets the video time, so the
// visitor drives the camera; nothing plays by itself. Captions are real HTML
// over the picture. See the Scroll Film Sites playbook in the brain.

type Chapter = { at: [number, number]; title: string; sub?: string; still: string; concept?: boolean };

// Times are seconds into the film. Each leg is 5 seconds. The film opens on the
// lake at dawn, flies into the mist, finds Nathaniel at his plan table, then one
// home's lines become stakes on the ground and the build runs until the wall
// becomes the finished street wall and door. From the door on: the home, rain to
// glass, the garden, the long table, the fire and the stars.
const CHAPTERS: Chapter[] = [
  { at: [0, 5], title: 'A place to feel human again.', sub: '12 homes above Lake Chapala, near Guadalajara, Mexico.', still: 'lake' },
  { at: [5, 17], title: "I'm Nathaniel.", sub: 'I build homes at Lake Chapala, with respected local architects.', still: 'nathaniel' },
  { at: [17, 30], title: 'Built by hand, by master masons.', sub: 'You pay in steps as your home is built, and watch every step from home.', still: 'build', concept: true },
  { at: [30, 40], title: 'Thick earth walls.', sub: 'Cool in May. Warm in January.', still: 'lane' },
  { at: [40, 50], title: 'Your own water.', sub: 'Rain from your roof, cleaned for drinking and stored under your home.', still: 'storm' },
  { at: [50, 55], title: 'Your own food. Your own power.', sub: "Our gardener does the hard work. Solar keeps your lights on when the town's go out.", still: 'garden' },
  { at: [55, 65], title: 'Every age is welcome.', sub: 'Grandparents on the porch. Kids on the path. Neighbors who know your name.', still: 'dusk' },
  { at: [65, 74], title: 'Picked at 5. On the table at 7.', still: 'table' },
  { at: [74, 82.5], title: "More stars than you've seen in years.", still: 'fire' },
  { at: [82.5, 85], title: '12 founding families. One long table.', sub: 'Finished homes from $321,000, land included. Founding families pick their lots first.', still: 'night' },
];
const DURATION = 85;

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
      const span = el.offsetHeight - window.innerHeight;
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
      // The sticky join button shows through the film, hides while the last
      // screen's own buttons are up, and comes back once the film is past.
      const past = el.getBoundingClientRect().bottom < window.innerHeight * 0.9;
      el.classList.toggle('ask', past || (p > 0.08 && idx < CHAPTERS.length - 1));
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
    <div className={`sf${still ? ' is-still' : ''}`} ref={root} style={{ height: `${(DURATION / 5) * 125}svh` }}>
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

        <div className="sf-caps">
          {CHAPTERS.map((c, i) => (
            <div key={c.title} data-cap className={`sf-cap${i === 0 ? ' on' : ''}`}>
              {c.concept && <span className="sf-tag">Concept</span>}
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
