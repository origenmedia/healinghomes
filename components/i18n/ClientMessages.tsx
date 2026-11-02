import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/i18n/pick';

// Gives the client components under it only the message keys they read. The
// locale layout sends no messages at all, so the old site's copy never reaches
// the browser on pages that don't use it.
export async function ClientMessages({
  locale,
  keys,
  children,
}: {
  locale: string;
  keys: string[];
  children: React.ReactNode;
}) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={pickMessages(messages, keys)}>
      {children}
    </NextIntlClientProvider>
  );
}
