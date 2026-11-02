import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SitePage } from '@/components/site/SitePage';
import { html } from '@/lib/site/pages/el-refugio';
import '@/lib/site/css/site-refugio.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.healinghomes.mx'),
  openGraph: {
    title: 'El Refugio: 9 homes near Lake Chapala, Mexico',
    description: 'Your own water, food and power, with neighbors you trust. Finished homes from about US$365,000, land included.',
    images: [{ url: '/og/el-refugio-9.jpg', width: 1200, height: 630, alt: 'Concept image: El Refugio at sunrise, 9 white homes with brick domes around one green garden' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Refugio: 9 homes near Lake Chapala, Mexico',
    description: 'Your own water, food and power, with neighbors you trust. Finished homes from about US$365,000, land included.',
    images: ['/og/el-refugio-9.jpg'],
  },
  title: 'El Refugio · Healing Homes',
  description: '9 homes near Lake Chapala, Mexico, for 9 founding families. Your own water, food and power, with neighbors you trust. Finished homes from about US$365,000, land included.',
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SitePage html={html} theme="refugio" />;
}
