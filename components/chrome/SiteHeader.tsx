'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';

const NAV_LINKS = [
  { href: '/coming-to-mexico', key: 'comingToMexico' },
  { href: '/ready-to-build', key: 'readyToBuild' },
  { href: '/rescuing-a-build', key: 'rescuingABuild' },
  { href: '/contact', key: 'contact' },
] as const;

export function SiteHeader({
  locale,
  isHome = false,
}: {
  locale: string;
  isHome?: boolean;
}) {
  const t = useTranslations('site');
  const tHome = useTranslations('home');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          transparent ? 'bg-transparent' : 'bg-page'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 md:py-5">
          {/* Wordmark */}
          <Link href="/" className="no-underline">
            <div className="flex flex-col items-start gap-0.5">
              <span
                className={`font-serif font-normal text-2xl leading-none transition-colors duration-300 ${
                  transparent ? 'text-white' : 'text-text-primary'
                }`}
              >
                {tHome('wordmark')}
              </span>
              <span
                className={`font-sans font-medium text-[0.6rem] tracking-[0.3em] uppercase leading-none transition-colors duration-300 ${
                  transparent ? 'text-white/70' : 'text-text-muted'
                }`}
              >
                {tHome('subtitle')}
              </span>
            </div>
          </Link>

          {/* Desktop nav — hidden while transparent over the hero */}
          <nav
            className={`hidden md:flex items-center gap-8 motion-safe:transition-opacity motion-safe:duration-300 ${
              transparent ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Main"
          >
            {NAV_LINKS.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-serif text-sm transition-colors duration-200 ${
                    active
                      ? 'text-voice'
                      : 'text-text-muted hover:text-voice'
                  }`}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button — hidden while transparent over the hero */}
          <button
            type="button"
            className={`md:hidden p-2 -mr-2 motion-safe:transition-opacity motion-safe:duration-300 ${
              transparent ? 'opacity-0 pointer-events-none' : 'text-text-primary opacity-100'
            }`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            tabIndex={transparent ? -1 : undefined}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* Spacer so content doesn't hide behind fixed header (non-home pages) */}
      {!isHome && <div className="h-[60px] md:h-[68px]" />}

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-page flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="no-underline" onClick={closeMenu}>
              <div className="flex flex-col items-start gap-0.5">
                <span className="font-serif font-normal text-2xl text-text-primary leading-none">
                  {tHome('wordmark')}
                </span>
                <span className="font-sans font-medium text-[0.6rem] tracking-[0.3em] text-text-muted uppercase leading-none">
                  {tHome('subtitle')}
                </span>
              </div>
            </Link>
            <button
              type="button"
              className="p-2 -mr-2 text-text-primary"
              onClick={closeMenu}
              aria-label="Close menu"
              autoFocus
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav
            className="flex-1 flex flex-col justify-center px-6 gap-10"
            aria-label="Main"
          >
            {NAV_LINKS.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`font-serif text-2xl ${
                    active ? 'text-voice' : 'text-text-primary'
                  }`}
                >
                  {t(`nav.${key}`)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
