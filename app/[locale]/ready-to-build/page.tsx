import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { Beat } from '@/components/notebook/Beat';
import { ImageSlot } from '@/components/notebook/ImageSlot';
import { SectionLabel } from '@/components/notebook/SectionLabel';
import { CtaButton } from '@/components/notebook/CtaButton';

type Step = { title: string; lines: string[] };

export default async function ReadyToBuild({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('readyToBuild');

  const fear = t.raw('fear.lines') as string[];
  const steps = t.raw('process.steps') as Step[];
  const standard = t.raw('standard.lines') as string[];
  const close = t.raw('close.lines') as string[];

  const stepImageSrcs = [
    '/process-1-design-modern-eco-home.png',
    '/process-2-construction-modern-eco-home.png',
    '/process-3-finished-modern-eco-home.png',
  ];
  const stepImageAlts = t.raw('process.imageAlts') as string[];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader locale={locale} />

      <main>
        {/* 1 · Recognition */}
        <Beat divider={false} className="pt-12 md:pt-16">
          <p className="font-serif text-2xl md:text-3xl text-text-primary leading-snug">
            {t('recognition.text')}
          </p>
        </Beat>

        {/* 2 · The fear, named */}
        <Beat>
          <div className="space-y-5">
            {fear.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 3 · A careful process (three steps) */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-border">
          <div className="max-w-2xl">
            <SectionLabel>{t('process.heading')}</SectionLabel>
          </div>
          <div className="mt-4 space-y-16 md:space-y-20">
            {steps.map((step, i) => (
              <div key={i} className="max-w-2xl">
                <div className="relative w-full aspect-[16/9] mb-2">
                  <Image
                    src={stepImageSrcs[i]}
                    alt={stepImageAlts[i]}
                    fill
                    sizes="(min-width: 768px) 42rem, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="mt-8 font-serif text-2xl md:text-3xl text-text-primary leading-tight">
                  {step.title}
                </h3>
                <div className="mt-5 space-y-5">
                  {step.lines.map((line, j) => (
                    <p
                      key={j}
                      className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 · The standard */}
        <Beat>
          <div className="relative w-full aspect-[3/2] my-6">
            <Image
              src="/home-builders-house-lake-chapala-mexico.jpg"
              alt={t('standard.imageAlt')}
              fill
              sizes="(min-width: 768px) 42rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="mt-10 space-y-5">
            {standard.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-primary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 5 · The close */}
        <Beat>
          <div className="space-y-5">
            {close.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-primary leading-relaxed"
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
