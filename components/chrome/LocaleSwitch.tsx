'use client';

import { Link, usePathname } from '@/lib/i18n/navigation';

export function LocaleSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-sans tracking-[0.15em] uppercase">
      {locale === 'en' ? (
        <span className="text-text-primary font-medium">EN</span>
      ) : (
        <Link
          href={pathname}
          locale="en"
          className="text-text-dim hover:text-text-muted transition-colors"
        >
          EN
        </Link>
      )}
      <span className="text-text-dim select-none" aria-hidden>
        |
      </span>
      {locale === 'es' ? (
        <span className="text-text-primary font-medium">ES</span>
      ) : (
        <Link
          href={pathname}
          locale="es"
          className="text-text-dim hover:text-text-muted transition-colors"
        >
          ES
        </Link>
      )}
    </div>
  );
}
