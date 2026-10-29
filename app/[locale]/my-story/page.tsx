import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/my-story';
import '@/lib/site/css/site-std.css';

export const metadata: Metadata = {
  title: 'My story · Healing Homes',
  description: 'Nathaniel Bunger has built homes since he was 18. Today he builds at Lake Chapala, where his family lives.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="std" />;
}
