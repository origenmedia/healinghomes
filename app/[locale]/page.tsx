import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { ScrollFilm } from '@/components/film/ScrollFilm';
import { footer } from '@/lib/site/pages/home';
import '@/lib/site/css/site-home.css';
import '@/lib/site/css/scroll-film.css';

export const metadata: Metadata = {
  title: 'Healing Homes · A place to feel human again',
  description:
    '12 homes above Lake Chapala, Mexico, with their own water, food and power. Every age is welcome. Founding families choose first.',
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
            <h2>See it closer.</h2>
            <div className="links">
              <Link href="/en/el-refugio">
                <b>El Refugio</b>
                <span>The village, the three homes, the water and the plan.</span>
              </Link>
              <Link href="/en/how-it-works">
                <b>How it works</b>
                <span>A bank trust holds your money. You pay as it is built.</span>
              </Link>
              <Link href="/en/my-story">
                <b>My story</b>
                <span>Who builds it, and why here.</span>
              </Link>
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
