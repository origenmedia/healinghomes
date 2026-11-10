import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/book';
import '@/lib/site/css/site-std.css';

export const metadata: Metadata = {
  title: 'Talk with Nathaniel · Healing Homes',
  description: 'Book a 30 minute call with Nathaniel about El Refugio, 9 homes near Lake Chapala, Mexico.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="std" />;
}
