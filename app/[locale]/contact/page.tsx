import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { SiteContactForm } from '@/components/site/SiteContactForm';
import { html } from '@/lib/site/pages/contact';
import '@/lib/site/css/site-std.css';

export const metadata: Metadata = {
  title: 'Talk with Nathaniel · Healing Homes',
  description: 'Become a founding family at El Refugio, or talk with Nathaniel on a 20 minute call.',
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <SitePage html={html} theme="std">
      <SiteContactForm />
    </SitePage>
  );
}
