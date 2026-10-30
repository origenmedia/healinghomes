import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/el-refugio';
import '@/lib/site/css/site-refugio.css';

export const metadata: Metadata = {
  title: 'El Refugio · Healing Homes',
  description: '12 homes around one garden, one pool and one long table, above Lake Chapala, Mexico. Each home has its own water, food and power. Homes from $336,000.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="refugio" />;
}
