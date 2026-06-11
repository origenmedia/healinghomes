import { useTranslations } from 'next-intl';
import { Wordmark } from '@/components/brand/Wordmark';
import { Link } from '@/lib/i18n/navigation';

const NAV_LINKS = [
  { href: '/coming-to-mexico', key: 'comingToMexico' },
  { href: '/ready-to-build', key: 'readyToBuild' },
  { href: '/rescuing-a-build', key: 'rescuingABuild' },
  { href: '/contact', key: 'contact' },
] as const;

export function SiteFooter({ locale }: { locale: string }) {
  const t = useTranslations('site');
  const year = new Date().getFullYear().toString();

  return (
    <footer className="border-t border-border px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Wordmark size="sm" />
        <div className="flex flex-col gap-4 md:items-end">
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer"
          >
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-xs text-text-muted hover:text-voice transition-colors"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/credits"
              className="font-sans text-xs text-text-muted hover:text-voice transition-colors"
            >
              {t('photoCredits')}
            </Link>
            <p className="font-sans text-xs text-text-dim">
              {t('copyright', { year })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
