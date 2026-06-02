import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { Beat } from '@/components/notebook/Beat';
import { ImageSlot } from '@/components/notebook/ImageSlot';
import { DoorCard } from '@/components/notebook/DoorCard';
import { CtaButton } from '@/components/notebook/CtaButton';
import { Marginalia } from '@/components/notebook/Marginalia';
import { ArchitecturalDiagram } from '@/components/notebook/ArchitecturalDiagram';
import { FadeIn } from '@/components/notebook/FadeIn';
import { PaperGrain } from '@/components/notebook/PaperGrain';

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
      <PaperGrain />
      <SiteHeader locale={locale} />

      <main className="relative z-10">
        {/* 1 · Hero */}
        <section className="relative flex min-h-[82vh] overflow-hidden">
          {/* Mobile hero — visible below md only */}
          <Image
            src="/lake-chapala-modern-home-terrace-mobile.png"
            alt={t('hero.imageAlt')}
            fill
            priority
            sizes="100vw"
            className="block md:hidden object-cover object-center"
          />
          {/* Desktop hero — visible at md and up */}
          <Image
            src="/lake-chapala-modern-home-terrace.png"
            alt={t('hero.imageAlt')}
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
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] display-carved text-balance">
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
                className="font-serif text-2xl md:text-3xl text-text-primary leading-snug text-balance"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 3 · The longing */}
        <Beat>
          <FadeIn>
          <div className="relative w-full aspect-[6/7] my-4">
            <Image
              src="/woman-gardening-ajijic-lake-chapala.png"
              alt={t('longing.imageAlt')}
              fill
              sizes="(min-width: 768px) 42rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mt-10 space-y-5">
            <Marginalia>{t('notes.longing')}</Marginalia>
            {longing.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
          </FadeIn>
        </Beat>

        {/* 4 · The reveal */}
        <Beat>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary leading-tight tracking-tight text-balance display-carved">
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
          <FadeIn>
          <div className="relative w-full aspect-[3/2] my-6">
            <Image
              src="/Ajijic_Malecon_Sunset.jpg"
              alt={t('place.imageAlt')}
              fill
              sizes="(min-width: 768px) 56rem, 100vw"
              className="object-cover object-center"
            />
          </div>
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
          <ArchitecturalDiagram label={t('diagrams.plan')}>
            <svg viewBox="0 0 300 200" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="45" y="70" width="110" height="80" strokeWidth="1.5"/>
              <line x1="110" y1="70" x2="110" y2="150" strokeWidth="1"/>
              <line x1="95" y1="110" x2="235" y2="110" strokeWidth="0.75" strokeDasharray="3 5"/>
              <line x1="235" y1="110" x2="228" y2="106" strokeWidth="0.75"/>
              <line x1="235" y1="110" x2="228" y2="114" strokeWidth="0.75"/>
              <path d="M255 72 q8 12 0 24 q-8 12 0 24 q8 12 0 24" strokeWidth="1.25"/>
            </svg>
          </ArchitecturalDiagram>
          </FadeIn>
        </Beat>

        {/* 6 · Meeting the builder */}
        <Beat wide>
          <FadeIn>
          <div className="relative w-full max-w-md aspect-[9/16] my-6">
            <Image
              src="/home-builder-lake-chapala-ajijic-with-his-son.jpg"
              alt={t('builder.imageAlt')}
              fill
              sizes="(min-width: 768px) 28rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mt-10 space-y-5">
            <Marginalia>{t('notes.builder')}</Marginalia>
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
          </FadeIn>
        </Beat>

        {/* 7 · How I work */}
        <Beat wide>
          <FadeIn>
          <div className="relative w-full aspect-[16/9] my-6">
            <Image
              src="/home-building-process-lake-chapala-mexico.jpg"
              alt={t('howIWork.imageAlt')}
              fill
              sizes="(min-width: 768px) 56rem, 100vw"
              className="object-cover object-center"
            />
          </div>
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
          <ArchitecturalDiagram label={t('diagrams.section')}>
            <svg viewBox="0 0 300 200" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <line x1="30" y1="160" x2="270" y2="160" strokeWidth="1.5"/>
              <line x1="80" y1="160" x2="80" y2="60" strokeWidth="1.5"/>
              <line x1="80" y1="60" x2="210" y2="60" strokeWidth="1.5"/>
              <line x1="86" y1="67" x2="204" y2="67" strokeWidth="1"/>
              <line x1="210" y1="60" x2="210" y2="67" strokeWidth="1"/>
              <circle cx="252" cy="46" r="5" strokeWidth="1"/>
              <line x1="248" y1="51" x2="150" y2="160" strokeWidth="0.75" strokeDasharray="3 5"/>
            </svg>
          </ArchitecturalDiagram>
          </FadeIn>
        </Beat>

        {/* 8 · Why I build this way */}
        <Beat>
          <FadeIn>
          <div className="relative w-full aspect-[3/2] my-6">
            <Image
              src="/home-builder-on-site-lake-chapala-ajijic.jpg"
              alt={t('why.imageAlt')}
              fill
              sizes="(min-width: 768px) 42rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mt-10 space-y-5">
            <Marginalia>{t('notes.why')}</Marginalia>
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
          </FadeIn>
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
          <p className="font-serif text-2xl md:text-3xl text-text-primary leading-snug text-balance">
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
          <div className="relative space-y-5">
            <Marginalia>{t('notes.close')}</Marginalia>
            {close.map((line, i) => (
              <p
                key={i}
                className="font-serif text-xl md:text-2xl text-text-primary leading-snug text-balance"
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
