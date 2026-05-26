'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LocaleSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();
  const otherLocale = locale === 'en' ? 'es' : 'en';
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <div className="flex items-center gap-1 text-xs font-sans tracking-[0.15em] uppercase">
      <span
        className={locale === 'en' ? 'text-text-primary font-medium' : 'text-text-dim'}
      >
        {locale === 'en' ? (
          'EN'
        ) : (
          <Link href={pathname.replace(`/${locale}`, '/en')} className="hover:text-text-muted transition-colors">
            EN
          </Link>
        )}
      </span>
      <span className="text-text-dim select-none" aria-hidden>|</span>
      <span
        className={locale === 'es' ? 'text-text-primary font-medium' : 'text-text-dim'}
      >
        {locale === 'es' ? (
          'ES'
        ) : (
          <Link href={otherPath} className="hover:text-text-muted transition-colors">
            ES
          </Link>
        )}
      </span>
    </div>
  );
}
