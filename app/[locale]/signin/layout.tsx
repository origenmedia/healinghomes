import { ClientMessages } from '@/components/i18n/ClientMessages';

// The sign in page is a client component that reads the signin messages.
const KEYS = ['signin'];

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <ClientMessages locale={locale} keys={KEYS}>
      {children}
    </ClientMessages>
  );
}
