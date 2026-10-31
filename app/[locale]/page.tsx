import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ScrollFilm } from '@/components/film/ScrollFilm';
import { footer } from '@/lib/site/pages/home';
import { BOOK_CALL } from '@/lib/site/links';
import '@/lib/site/css/site-home.css';
import '@/lib/site/css/scroll-film.css';

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
  title: 'Healing Homes · A place to feel human again',
  description:
    '12 homes above Lake Chapala, Mexico, with their own water, food and power. Every age is welcome. Finished homes from US$321,000, land included.',
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
                <span>The village, the three home designs, the water and the plan.</span>
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
              <Link href="/en/contact?topic=list" className="btn light">
                Become a founding family
              </Link>
              <a href={BOOK_CALL} className="call">
                Talk with Nathaniel
              </a>
            </div>
            <p className="inv">
              Thinking about investing? <Link href="/en/contact?topic=invest">Let&apos;s talk.</Link>
            </p>
          </div>
        </section>
      </main>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
