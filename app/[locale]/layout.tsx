import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n/routing';
import { ThemeProvider } from '@/lib/theme/provider';
import { AuthProvider } from '@/lib/auth/context';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  // No messages go to the browser from here. The few pages with client
  // components that read messages add them with <ClientMessages> in their own
  // layout, so the old site's copy is not in every page's source.
  return (
    <NextIntlClientProvider messages={{}} locale={locale}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
