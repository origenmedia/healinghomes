import { useTranslations } from 'next-intl';
import { Wordmark } from '@/components/brand/Wordmark';
import { LocaleSwitch } from '@/components/chrome/LocaleSwitch';

export function SiteFooter({ locale }: { locale: string }) {
  const t = useTranslations('site');
  const year = new Date().getFullYear().toString();

  return (
    <footer className="border-t border-border px-6 md:px-12 lg:px-20 py-12 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Wordmark size="sm" />
        <div className="flex flex-col gap-4 md:items-end">
          <LocaleSwitch locale={locale} />
          <p className="font-sans text-xs text-text-dim">
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
