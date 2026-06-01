import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { Beat } from '@/components/notebook/Beat';
import { ImageSlot } from '@/components/notebook/ImageSlot';
import { DoorCard } from '@/components/notebook/DoorCard';
import { CtaButton } from '@/components/notebook/CtaButton';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const recognition = t.raw('recognition.lines') as string[];
  const longing = t.raw('longing.lines') as string[];
  const reveal = t.raw('reveal.lines') as string[];
  const place = t.raw('place.lines') as string[];
  const builder = t.raw('builder.lines') as string[];
  const howIWork = t.raw('howIWork.lines') as string[];
  const why = t.raw('why.lines') as string[];
  const bigger = t.raw('bigger.lines') as string[];
  const close = t.raw('close.lines') as string[];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader locale={locale} />

      <main>
        {/* 1 · Hero */}
        <section className="relative flex min-h-[82vh] overflow-hidden">
          {/* Mobile hero — visible below md only */}
          <Image
            src="/hero-mobile.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="block md:hidden object-cover object-center"
          />
          {/* Desktop hero — visible at md and up */}
          <Image
            src="/hero-desktop.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />
          {/* Scrim — warm-black gradient over lower portion for headline legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[rgba(20,15,10,0.55)] via-[rgba(20,15,10,0.22)] to-transparent"
          />
          <div className="relative z-10 mt-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-32">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {t('hero.headline')}
            </h1>
          </div>
          {/* Scroll cue */}
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-50 motion-safe:animate-bounce"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </section>

        {/* 2 · Recognition */}
        <Beat className="pt-24 md:pt-36">
          <div className="space-y-8 md:space-y-10">
            {recognition.map((line, i) => (
              <p
                key={i}
                className="font-serif text-2xl md:text-3xl text-text-primary leading-snug"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 3 · The longing */}
        <Beat>
          <ImageSlot
            kind="ai"
            aspect="wide"
            label="Optional. A warm, painterly morning in the imagined life, same dream register as the hero. Or leave textless."
          />
          <div className="mt-10 space-y-5">
            {longing.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 4 · The reveal */}
        <Beat>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary leading-tight tracking-tight">
            {t('reveal.headline')}
          </h2>
          <div className="mt-8 space-y-5">
            {reveal.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 5 · The place */}
        <Beat wide>
          <ImageSlot
            kind="real"
            aspect="panorama"
            label="Real landscape of Lake Chapala: the lake, the town, the mountains, the light. True, un-glamorous images that match the honesty run."
          />
          <div className="mt-10 space-y-5">
            {place.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 6 · Meeting the builder */}
        <Beat wide>
          <ImageSlot
            kind="real"
            aspect="wide"
            label="The most important real photo on the site. The builder, on site or at his home, ideally a warm shot with his son. Must read unmistakably real."
          />
          <div className="mt-10 space-y-5">
            {builder.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-primary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <CtaButton href="/contact">{t('builder.cta')}</CtaButton>
          </div>
        </Beat>

        {/* 7 · How I work */}
        <Beat wide>
          <ImageSlot
            kind="real"
            aspect="wide"
            label="Real construction photos of actual builds, plus a real screenshot or clean mockup of the client portal. Documentary and grounded."
          />
          <div className="mt-10 space-y-5">
            {howIWork.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 8 · Why I build this way */}
        <Beat>
          <ImageSlot
            kind="real"
            aspect="wide"
            label="A real, candid photo of the builder on site or with people. The emotional why, anchored by a real human image."
          />
          <div className="mt-10 space-y-5">
            {why.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-primary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <CtaButton href="/contact">{t('why.cta')}</CtaButton>
          </div>
        </Beat>

        {/* 9 · The bigger thing */}
        <Beat>
          <div className="space-y-5">
            {bigger.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 10 · The three doors */}
        <Beat wide>
          <p className="font-serif text-2xl md:text-3xl text-text-primary leading-snug">
            {t('doors.leadIn')}
          </p>
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <DoorCard href="/coming-to-mexico" label={t('doors.coming.label')}>
              {t('doors.coming.text')}
            </DoorCard>
            <DoorCard href="/building-here" label={t('doors.building.label')}>
              {t('doors.building.text')}
            </DoorCard>
            <DoorCard href="/rescuing-a-build" label={t('doors.rescuing.label')}>
              {t('doors.rescuing.text')}
            </DoorCard>
          </div>
          <p className="mt-10 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('doors.closing')}
          </p>
        </Beat>

        {/* 11 · The close */}
        <Beat>
          <div className="space-y-5">
            {close.map((line, i) => (
              <p
                key={i}
                className="font-serif text-xl md:text-2xl text-text-primary leading-snug"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <CtaButton href="/contact">{t('close.cta')}</CtaButton>
          </div>
        </Beat>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
