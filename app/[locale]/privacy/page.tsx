import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/privacy';
import '@/lib/site/css/site-std.css';

export const metadata: Metadata = {
  title: 'Privacy notice · Healing Homes',
  description: 'How Healing Homes takes care of your personal information.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="std" />;
}
