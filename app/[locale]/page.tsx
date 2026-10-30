import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Film } from '@/components/film/Film';
import { header, footer } from '@/lib/site/pages/home';
import '@/lib/site/css/site-home.css';
import '@/lib/site/css/film.css';

export const metadata: Metadata = {
  title: 'Healing Homes · A place to feel human again',
  description:
    '12 homes above Lake Chapala, Mexico, with their own water, food and power. Founding families choose first.',
};

// The home page is the film. Details live on the inner pages.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="hh-site hh-home">
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: header }} />
      <main>
        <Film />
      </main>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  );
}
