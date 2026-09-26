'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  // Runs the full width of the grid instead of pairing with a neighbor.
  wide?: boolean;
};

const WIDE_SIZES = '(min-width: 1152px) 72rem, 100vw';
const HALF_SIZES = '(min-width: 1152px) 36rem, (min-width: 768px) 50vw, 100vw';

// A quiet photo grid on paper. Every photo opens a full-screen viewer,
// also on paper: arrow keys or a swipe move between photos, Escape closes.
export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const t = useTranslations('gallery.viewer');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const count = photos.length;
  const isOpen = active !== null;

  const step = useCallback(
    (delta: number) =>
      setActive((i) => (i === null ? null : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  };

  const control =
    'p-2 text-text-primary hover:text-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-voice';

  return (
    <>
      <div className="grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={photo.wide ? 'md:col-span-2' : undefined}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-haspopup="dialog"
              className="group relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden bg-surface-inset focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-voice"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={i === 0 ? 'eager' : undefined}
                fetchPriority={i === 0 ? 'high' : undefined}
                sizes={photo.wide ? WIDE_SIZES : HALF_SIZES}
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="mt-4 flex items-baseline gap-4 font-sans text-sm leading-relaxed text-text-secondary">
              <span className="text-xs tabular-nums tracking-[0.15em] text-text-dim">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{photo.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={t('label')}
        onClose={() => setActive(null)}
        onKeyDown={onKeyDown}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-page p-0 text-text-primary"
      >
        {active !== null && (
          <div
            className="flex h-full flex-col"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 md:py-5">
              <p className="font-sans text-xs font-medium tracking-[0.3em] tabular-nums text-text-muted">
                {active + 1} / {count}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label={t('close')}
                className={`-mr-2 ${control}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* The current photo, with its neighbors mounted unseen so the next step
                is instant. Edge to edge on phones, where every pixel counts. */}
            <div className="relative min-h-0 flex-1 md:mx-12 lg:mx-20">
              {photos.map((photo, i) => {
                const gap = Math.abs(i - active);
                if (Math.min(gap, count - gap) > 1) return null;
                const current = i === active;
                return (
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={current ? photo.alt : ''}
                    aria-hidden={current ? undefined : true}
                    fill
                    sizes="100vw"
                    className={`object-contain motion-safe:transition-opacity motion-safe:duration-300 ${
                      current ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-6 px-6 md:px-12 lg:px-20 py-4 md:py-6">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t('previous')}
                className={`-ml-2 ${control}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="11 6 5 12 11 18" />
                </svg>
              </button>
              <p
                aria-live="polite"
                className="font-sans text-sm leading-relaxed text-text-secondary text-center"
              >
                {photos[active].caption}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t('next')}
                className={`-mr-2 ${control}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
