import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/how-it-works';
import '@/lib/site/css/site-std.css';

export const metadata: Metadata = {
  title: 'How it works · Healing Homes',
  description: 'You pay in steps as your home is built, and watch every step from home. Every photo and receipt is in our app.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="std" />;
}
