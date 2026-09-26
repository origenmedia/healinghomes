import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { Beat } from '@/components/notebook/Beat';
import { SectionLabel } from '@/components/notebook/SectionLabel';
import { CtaButton } from '@/components/notebook/CtaButton';
import { PhotoGallery } from '@/components/gallery/PhotoGallery';
import { brand } from '@/lib/brand';

type PhotoCopy = { caption: string; alt: string };

// The builder's own home above Lake Chapala, in viewing order. Captions and
// alt text live in messages under gallery.photos, in the same order.
const PHOTO_SRCS = [
  '/gallery/modern-hillside-homes-lake-chapala-aerial.jpg',
  '/gallery/modern-home-roof-terrace-lake-chapala-from-above.jpg',
  '/gallery/modern-home-living-room-lake-chapala-view.jpg',
  '/gallery/modern-home-kitchen-lake-chapala.jpg',
  '/gallery/modern-home-dining-room-lake-chapala.jpg',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });
  const [first] = t.raw('photos') as PhotoCopy[];

  return {
    metadataBase: new URL(`https://www.${brand.domain}`),
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: PHOTO_SRCS[0], width: 1600, height: 1200, alt: first.alt }],
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gallery');

  const copy = t.raw('photos') as PhotoCopy[];
  // The first photo runs full width; the rest pair up two by two.
  const photos = PHOTO_SRCS.map((src, i) => ({ src, ...copy[i], wide: i === 0 }));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader locale={locale} />

      <main className="flex-1">
        {/* 1 · The standard */}
        <section className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-12 md:pb-16">
          <div className="max-w-2xl">
            <SectionLabel>{t('label')}</SectionLabel>
            <h1 className="font-serif text-4xl md:text-5xl text-text-primary leading-tight tracking-tight text-balance display-carved">
              {t('headline')}
            </h1>
            <p className="mt-6 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </section>

        {/* 2 · The photos */}
        <section className="px-6 md:px-12 lg:px-20 pb-20 md:pb-32">
          <PhotoGallery photos={photos} />
        </section>

        {/* 3 · The close */}
        <Beat divider>
          <p className="font-serif text-xl md:text-2xl text-text-primary leading-snug text-balance">
            {t('close.text')}
          </p>
          <div className="mt-10">
            <CtaButton href="/contact">{t('close.cta')}</CtaButton>
          </div>
        </Beat>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
