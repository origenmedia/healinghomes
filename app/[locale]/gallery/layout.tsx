import { ClientMessages } from '@/components/i18n/ClientMessages';

// Old page, redirected to El Refugio. Its client header and photo viewer read these messages.
const KEYS = ['site.nav', 'home.wordmark', 'home.subtitle', 'gallery.viewer'];

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <ClientMessages locale={locale} keys={KEYS}>
      {children}
    </ClientMessages>
  );
}
