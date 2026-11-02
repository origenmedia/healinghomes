import { ClientMessages } from '@/components/i18n/ClientMessages';

// Old page, redirected to My story. Its client header reads the menu labels and the wordmark.
const KEYS = ['site.nav', 'home.wordmark', 'home.subtitle'];

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <ClientMessages locale={locale} keys={KEYS}>
      {children}
    </ClientMessages>
  );
}
