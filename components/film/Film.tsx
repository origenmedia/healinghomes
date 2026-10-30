'use client';

import Link from 'next/link';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { PlanDrawing, WaterDrawing, Seats } from './drawings';

// The home page film: eleven pinned scenes, phone first (9:16 frames, words in the
// lower third). Every effect is CSS driven by one number per scene, --p, from 0 to 1,
// which this component sets from the scroll position. Nothing plays by itself.

type Img = { name: string; wide?: boolean; alt: string };
type Cap = { at: [number, number]; title: string; sub?: string };
type Scene = {
  id: string;
  screens: number;
  clock: [string, string?, number?];
  caps: Cap[];
  body: ReactNode;
  paper?: boolean;
  bg?: string;
};

const range = (a: number, b: number) => ({ '--a': a, '--b': b }) as CSSProperties;

function Pic({ img, className, style }: { img: Img; className?: string; style?: CSSProperties }) {
  const base = `/film/${img.name}`;
  return (
    <img
      className={`lay ${className ?? ''}`}
      style={style}
      src={`${base}-720.webp`}
      srcSet={img.wide ? `${base}-720.webp 720w, ${base}-1080.webp 1080w` : undefined}
      sizes="(min-aspect-ratio: 9/16) 56.25vh, 100vw"
      width={720}
      height={1280}
      alt={img.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

const I = {
  dawn: { name: 'village-dawn', alt: 'The village from above at first light, the lake beyond' },
  rush: { name: 'rush', wide: true, alt: 'City traffic at night through a rainy car window' },
  plans: { name: 'plans', wide: true, alt: 'Architect sketches of the three homes, each behind an earth wall with one wood door' },
  villageSketch: { name: 'village-sketch', wide: true, alt: 'Sketch of 12 homes in two rows around one garden, one pool and one long table' },
  tierraSketch: { name: 'tierra-sketch', alt: 'Sketch of Casa Tierra' },
  tierraReal: { name: 'tierra-real', alt: 'Casa Tierra, earth wall, brick dome and stone spout, late morning' },
  room: { name: 'room', wide: true, alt: 'Living room under a curved brick ceiling with lime plaster walls and a wood table' },
  storm: { name: 'storm', wide: true, alt: 'A summer storm pouring from the stone spout into the courtyard basin' },
  glass: { name: 'glass', wide: true, alt: 'A glass filling with clean water at the kitchen tap' },
  soil: { name: 'soil', wide: true, alt: 'Hands pulling carrots from a garden bed beside a basket of vegetables' },
  basket: { name: 'basket', wide: true, alt: 'A woman carrying a full basket along the garden path' },
  powerDay: { name: 'power-day', wide: true, alt: 'A home with solar panels on the roof in late sun' },
  powerDusk: { name: 'power-dusk', wide: true, alt: 'The same home at dusk with the lamps on' },
  table: { name: 'table', alt: 'Neighbors at the long table under brick vaults at dusk, the fire circle glowing' },
  kitchen: { name: 'kitchen', wide: true, alt: 'A couple at home looking at photos of their build on a phone' },
} satisfies Record<string, Img>;

const SCENES: Scene[] = [
  {
    id: 'what',
    bg: 'village-dawn',
    screens: 2,
    clock: ['6:40 am'],
    caps: [{ at: [0, 1.01], title: 'A place to feel human again.', sub: '12 homes above Lake Chapala, Mexico, with their own water, food and power.' }],
    body: <Pic img={I.dawn} className="zoom" />,
  },
  {
    id: 'why',
    bg: 'rush',
    screens: 3,
    clock: ['Anywhere else', '7:00 am', 0.5],
    caps: [
      { at: [0, 0.45], title: 'Life is speeding up.', sub: 'Prices. Headlines. Work that changes overnight.' },
      { at: [0.55, 1.01], title: 'Here, life slows down.', sub: 'A place to rest, and to ride out any storm.' },
    ],
    body: (
      <>
        <Pic img={I.rush} className="drift" />
        <div className="lay fade" style={range(0.38, 0.56)}>
          <img className="lay soft" src="/film/village-dawn-thumb.webp" alt="" aria-hidden="true" />
          <div className="lay fade" style={range(0.5, 0.72)}>
            <Pic img={I.dawn} />
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'who',
    screens: 2,
    clock: ['7:30 am'],
    caps: [
      { at: [0, 0.5], title: "I'm Nathaniel. I build homes here at Lake Chapala.", sub: "We're drawing El Refugio now, with our architects, engineers and master masons." },
      { at: [0.5, 1.01], title: "Here's what we're drawing." },
    ],
    paper: true,
    body: <Pic img={I.plans} className="zoom" />,
  },
  {
    id: 'village',
    screens: 3,
    clock: ['8:00 am'],
    caps: [{ at: [0.05, 1.01], title: '12 homes around one garden, one pool and one long table.', sub: 'Garden · Pool · Long table · Orchard' }],
    paper: true,
    body: (
      <>
        <div className="lay paperbg" />
        <div className="lay fadeout" style={range(0.55, 0.7)}>
          <PlanDrawing />
        </div>
        <div className="lay wipe" style={{ '--w0': 0.55, '--wl': 0.35 } as CSSProperties}>
          <Pic img={I.villageSketch} />
        </div>
        <span className="inkline" style={{ '--w0': 0.55, '--wl': 0.35 } as CSSProperties} />
      </>
    ),
  },
  {
    id: 'home',
    bg: 'tierra-real',
    screens: 3,
    clock: ['11:00 am', '11:30 am', 0.62],
    caps: [
      { at: [0, 0.62], title: 'Thick earth walls. Cool in May. Warm in January.' },
      { at: [0.62, 1.01], title: 'Step inside.', sub: 'Lime plaster walls. Warm wood. A curved brick ceiling.' },
    ],
    body: (
      <>
        <Pic img={I.tierraSketch} />
        <div className="lay wipe" style={{ '--w0': 0.06, '--wl': 0.4 } as CSSProperties}>
          <Pic img={I.tierraReal} />
        </div>
        <span className="inkline" style={{ '--w0': 0.06, '--wl': 0.4 } as CSSProperties} />
        <div className="lay fade" style={range(0.58, 0.72)}>
          <Pic img={I.room} className="zoom" />
        </div>
      </>
    ),
  },
  {
    id: 'water',
    bg: 'storm',
    screens: 3,
    clock: ['3:00 pm', '4:00 pm', 0.72],
    caps: [{ at: [0, 1.01], title: 'Your own water.', sub: 'Rain from your roof, cleaned for drinking and stored under your home.' }],
    body: (
      <>
        <Pic img={I.storm} className="zoom" />
        <div className="rain lay" aria-hidden="true" />
        <div className="lay fade paperbg" style={range(0.34, 0.42)}>
          <WaterDrawing />
        </div>
        <div className="lay fade" style={range(0.7, 0.8)}>
          <Pic img={I.glass} />
        </div>
      </>
    ),
  },
  {
    id: 'food',
    bg: 'soil',
    screens: 2,
    clock: ['5:30 pm'],
    caps: [{ at: [0, 1.01], title: 'Your own food.', sub: 'Pick dinner from the garden. Our gardener does the hard work. Love to garden? Your own beds are waiting.' }],
    body: (
      <>
        <Pic img={I.soil} />
        <div className="lay fade" style={range(0.45, 0.62)}>
          <Pic img={I.basket} className="zoom" />
        </div>
      </>
    ),
  },
  {
    id: 'power',
    bg: 'power-dusk',
    screens: 2,
    clock: ['6:30 pm', '7:45 pm', 0.55],
    caps: [{ at: [0, 1.01], title: 'Your own power.', sub: "Solar panels and batteries on every home. Your lights stay on, even when the town's go out." }],
    body: (
      <>
        <Pic img={I.powerDay} />
        <div className="lay fade" style={range(0.35, 0.75)}>
          <Pic img={I.powerDusk} />
        </div>
      </>
    ),
  },
  {
    id: 'life',
    bg: 'table',
    screens: 3,
    clock: ['7:00 pm', '9:30 pm', 0.6],
    caps: [
      { at: [0, 0.58], title: 'Picked at 5. On the table at 7.' },
      { at: [0.62, 1.01], title: "More stars than you've seen in years." },
    ],
    body: (
      <>
        <Pic img={I.table} className="tilt" />
        <div className="lay night fade" style={range(0.5, 0.75)} />
        <div className="lay stars fade" style={range(0.6, 0.85)} aria-hidden="true" />
      </>
    ),
  },
  {
    id: 'trust',
    bg: 'kitchen',
    screens: 2,
    clock: ['Back home', 'El Refugio', 0.62],
    caps: [{ at: [0, 1.01], title: 'Watch your home being built, from anywhere.', sub: 'Every photo, every receipt and every payment on your phone. Your money moves only when each step is done.' }],
    body: (
      <>
        <Pic img={I.kitchen} />
        <div className="appcard" aria-hidden="true">
          <b>Your home</b>
          <span>Casa Raíz · sample build</span>
          <div className="row">
            <span className="thumb" />
            <span>
              <b>New photos</b>
              <span>Your walls are up.</span>
            </span>
          </div>
          <div className="pay">
            <span>Next payment, after your approval</span>
            <b>$18,400</b>
          </div>
        </div>
        <div className="grow" />
      </>
    ),
  },
  {
    id: 'join',
    screens: 2,
    clock: ['Next morning'],
    caps: [],
    paper: true,
    body: (
      <>
        <div className="lay paperbg" />
        <Seats />
        <div className="joincap">
          <h2>12 founding families. One long table.</h2>
          <p>Be one of the first 12. Choose your lot first, at the founding price. Homes from $336,000.</p>
          <div className="cta">
            <Link className="main" href="/en/contact?topic=list">Become a founding family</Link>
            <Link className="quiet" href="/en/contact?topic=call">Talk with Nathaniel</Link>
          </div>
          <p className="inv">
            Thinking about investing? <Link href="/en/contact?topic=invest">Let&apos;s talk.</Link>
          </p>
        </div>
      </>
    ),
  },
];

export function Film() {
  const root = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current!;
    const secs = Array.from(el.querySelectorAll<HTMLElement>('.sc'));
    const caps = secs.map((s) => Array.from(s.querySelectorAll<HTMLElement>('.cap p')));
    let raf = 0;
    let lastClock = '';

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r0 = el.getBoundingClientRect();
      const total = el.offsetHeight - vh;
      const overall = Math.min(1, Math.max(0, -r0.top / total));
      el.style.setProperty('--film', String(overall));
      el.classList.toggle('in', r0.top < vh * 0.5 && r0.bottom > vh * 0.5);
      el.classList.toggle('ask', overall > 0.12 && overall < 0.9);

      secs.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const p = Math.min(1, Math.max(0, -r.top / (s.offsetHeight - vh)));
        s.style.setProperty('--p', p.toFixed(4));
        caps[i].forEach((c) => c.classList.toggle('on', p >= +c.dataset.a! && p < +c.dataset.b!));
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) {
          const [t0, t1, at] = SCENES[i].clock;
          const t = t1 && p >= (at ?? 0.5) ? t1 : t0;
          if (t !== lastClock && clock.current) {
            clock.current.textContent = t;
            lastClock = t;
          }
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="film" ref={root}>
      <span className="clock" ref={clock} aria-hidden="true">
        6:40 am
      </span>
      <span className="pencil" aria-hidden="true" />
      {SCENES.map((s) => (
        <section key={s.id} className={`sc sc-${s.id}${s.paper ? ' is-paper' : ''}`} style={{ height: `${s.screens * 100}svh` }} aria-label={s.caps[0]?.title ?? '12 founding families'}>
          <div className="st">
              {s.bg && <div className="bgblur" style={{ backgroundImage: `url(/film/${s.bg}-thumb.webp)` }} aria-hidden="true" />}
            <div className="fr">
              {s.body}
              {s.caps.length > 0 && (
                <div className="cap">
                  {s.caps.map((c, j) => (
                    <p key={j} data-a={c.at[0]} data-b={c.at[1]} className={j === 0 ? 'on' : undefined}>
                      <span className="t">{c.title}</span>
                      {c.sub && <span className="s">{c.sub}</span>}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
      <Link className="askbar" href="/en/contact?topic=list">
        Become a founding family
      </Link>
    </div>
  );
}
