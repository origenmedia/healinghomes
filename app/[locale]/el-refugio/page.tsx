import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/el-refugio';
import '@/lib/site/css/site-refugio.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.healinghomes.mx'),
  openGraph: {
    title: 'El Refugio, 12 homes above Lake Chapala',
    description: 'A place to feel human again. Finished homes from US$321,000, land included.',
    images: [{ url: '/og/el-refugio.jpg', width: 1200, height: 630, alt: 'Lake Chapala at dawn in the mist, Mexico' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Refugio, 12 homes above Lake Chapala',
    description: 'A place to feel human again. Finished homes from US$321,000, land included.',
    images: ['/og/el-refugio.jpg'],
  },
  title: 'El Refugio · Healing Homes',
  description: '12 homes around one garden, one pool and one long table, above Lake Chapala, Mexico. Each home has its own water, food and power. Finished homes from US$321,000, land included.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="refugio" />;
}
