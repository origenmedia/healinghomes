import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/home';
import '@/lib/site/css/site-home.css';

export const metadata: Metadata = {
  title: 'Healing Homes · Villages in Mexico',
  description:
    'Healing Homes builds small villages at Lake Chapala, Mexico. Every family owns its land, catches its own water, makes its own power and grows its own food.',
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="home" />;
}
