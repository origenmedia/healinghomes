import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/how-it-works';
import '@/lib/site/css/site-std.css';

export const metadata: Metadata = {
  title: 'How it works · Healing Homes',
  description: 'A bank trust, payments one stage at a time, and every photo and receipt in our app. How your money stays safe from far away.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="std" />;
}
