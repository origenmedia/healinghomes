import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { Beat } from '@/components/notebook/Beat';
import { PullQuote } from '@/components/notebook/PullQuote';
import { CtaButton } from '@/components/notebook/CtaButton';
import { ThresholdMark } from '@/components/notebook/ThresholdMark';

type QA = { label: string; body: string };

export default async function ComingToMexico({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('comingToMexico');

  const recognition = t.raw('recognition.lines') as string[];
  const guide = t.raw('guide.lines') as string[];
  const mother = t.raw('mother.lines') as string[];
  const questions = t.raw('questions.items') as QA[];
  const close = t.raw('close.lines') as string[];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader locale={locale} />

      <main>
        {/* 1 · Recognition */}
        <Beat divider={false} className="pt-12 md:pt-16">
          <div className="space-y-5">
            {recognition.map((line, i) => (
              <p
                key={i}
                className="font-serif text-xl md:text-2xl text-text-primary leading-snug"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 2 · The guide */}
        <Beat>
          <div className="relative w-full max-w-md aspect-[2/3] my-6">
            <Image
              src="/home-builder-lake-chapala-ajijic-mexico.jpg"
              alt={t('guide.imageAlt')}
              fill
              sizes="(min-width: 768px) 28rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="mt-10 space-y-5">
            {guide.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 3 · The father */}
        <Beat>
          <Image
            src="/leaving-for-mexico-father-and-son.jpg"
            alt={t('father.imageAlt')}
            width={1536}
            height={2048}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="mx-auto my-8 h-auto w-auto max-h-[60vh] md:max-h-[520px] max-w-full"
          />
          <p className="mt-10 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('father.text')}
          </p>
        </Beat>

        {/* 4 · The pattern */}
        <Beat>
          <Image
            src="/family-dinner-ajijic-lake-chapala.jpg"
            alt={t('pattern.imageAlt')}
            width={1874}
            height={1405}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="mx-auto my-8 h-auto w-auto max-h-[60vh] md:max-h-[520px] max-w-full"
          />
          <p className="mt-10 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('pattern.text')}
          </p>
        </Beat>

        {/* 5 · The mother (peak) */}
        <Beat>
          <Image
            src="/mother-and-son-horseback-mexico.jpeg"
            alt={t('mother.imageAlt')}
            width={2880}
            height={5120}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="mx-auto my-8 h-auto w-auto max-h-[60vh] md:max-h-[520px] max-w-full"
          />
          <div className="mt-10 space-y-5">
            {mother.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-10 border-l-2 border-voice pl-6 md:pl-8">
            <PullQuote>{t('mother.quote')}</PullQuote>
          </div>
          <p className="mt-10 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('mother.after')}
          </p>
        </Beat>

        <ThresholdMark />

        {/* 6 · The real questions */}
        <Beat className="pt-10 md:pt-20">
          <p className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('questions.intro')}
          </p>
          <dl className="mt-10 space-y-8">
            {questions.map((q, i) => (
              <div key={i} className="border-t border-border pt-6">
                <dt className="font-serif text-xl md:text-2xl text-text-primary leading-snug">
                  {q.label}
                </dt>
                <dd className="mt-3 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
                  {q.body}
                </dd>
              </div>
            ))}
          </dl>
        </Beat>

        <ThresholdMark />

        {/* 7 · The life waiting */}
        <Beat className="pt-10 md:pt-20">
          <div className="relative w-full aspect-[16/9] my-6">
            <Image
              src="/life-in-mexico-lake-chapala-morning-garden.png"
              alt={t('lifeWaiting.imageAlt')}
              fill
              sizes="(min-width: 768px) 42rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <p className="mt-10 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('lifeWaiting.text')}
          </p>
        </Beat>

        {/* 8 · The close */}
        <Beat>
          <Image
            src="/builder-traveling-mexico-camera.png"
            alt={t('close.imageAlt')}
            width={686}
            height={852}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="mx-auto my-8 h-auto w-auto max-h-[60vh] md:max-h-[520px] max-w-full"
          />
          <div className="mt-10 space-y-5">
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
