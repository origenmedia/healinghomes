import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ScrollFilm } from '@/components/film/ScrollFilm';
import { footer } from '@/lib/site/pages/home';
import '@/lib/site/css/site-home.css';
import '@/lib/site/css/scroll-film.css';
import { BOOKING_URL } from '@/lib/site/booking';

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
  title: 'El Refugio: 9 homes near Lake Chapala, Mexico · Healing Homes',
  description:
    'Your own water, food and power, with neighbors you trust. Every age is welcome. Finished homes from about US$365,000, land included.',
};

// The home page is the film. Details live on the inner pages.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="hh-site hh-home">
      <main>
        <ScrollFilm />
        <section className="sf-after">
          <div className="wrap">
            <h2>Learn more about El Refugio.</h2>
            <div className="links">
              <Link href="/en/el-refugio">
                <b>El Refugio</b>
                <span>The 9 homes, the garden and what the families share.</span>
              </Link>
              <Link href="/en/how-it-works">
                <b>How it works</b>
                <span>You pay in steps as your home is built, and watch every step from home.</span>
              </Link>
              <Link href="/en/my-story">
                <b>My story</b>
                <span>Who builds it, and why here.</span>
              </Link>
            </div>
            <div className="next">
              <a href={BOOKING_URL} className="btn light">
                Become a founding family
              </a>
              <a href={BOOKING_URL} className="call">
                Talk with Nathaniel
              </a>
            </div>
            <p className="inv">
              Thinking about investing? <a href={BOOKING_URL}>Let&apos;s talk.</a>
            </p>
          </div>
        </section>
      </main>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
