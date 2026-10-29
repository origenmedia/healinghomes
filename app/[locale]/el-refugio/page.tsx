import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/el-refugio';
import '@/lib/site/css/site-refugio.css';

export const metadata: Metadata = {
  title: 'El Refugio · Healing Homes',
  description: '14 finished homes on 10 hectares above Lake Chapala. Each home catches its own rain, makes its own power and has its own garden.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="refugio" />;
}
