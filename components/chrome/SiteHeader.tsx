import { Wordmark } from '@/components/brand/Wordmark';
import { LocaleSwitch } from '@/components/chrome/LocaleSwitch';

export function SiteHeader({ locale }: { locale: string }) {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-6 md:py-8">
      <Wordmark size="base" />
      <LocaleSwitch locale={locale} />
    </header>
  );
}
