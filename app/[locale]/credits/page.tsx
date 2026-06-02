import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('credits');
  const items = t.raw('items') as Array<{
    title: string;
    photographer: string;
    source: string;
    license: string;
    licenseUrl: string;
  }>;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader locale={locale} />

      <main className="flex-1 px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary leading-tight tracking-tight">
            {t('heading')}
          </h1>
          <p className="mt-6 font-serif text-lg text-text-secondary leading-relaxed">
            {t('intro')}
          </p>

          <ul className="mt-14 space-y-8">
            {items.map((item, i) => (
              <li key={i} className="font-sans text-sm text-text-secondary leading-relaxed">
                &ldquo;{item.title}&rdquo; by {item.photographer}, via {item.source}.
                Licensed under{' '}
                <a
                  href={item.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-voice hover:text-voice-hover underline underline-offset-2 transition-colors"
                >
                  {item.license}
                </a>
                .
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
