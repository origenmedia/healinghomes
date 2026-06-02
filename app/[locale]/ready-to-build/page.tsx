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

  const stepImages = [
    'AI storybook illustration: the complete design of a modern eco home, settled on screen before the build.',
    'AI storybook illustration: foundation and frame rising from the ground up. Within this step, a real screenshot or mockup of the portal for the tracked-week-by-week line.',
    'AI storybook illustration: the finished home. Light, stone, rooms, complete.',
  ];

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
                <ImageSlot kind="ai" aspect="wide" label={stepImages[i]} />
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
          <ImageSlot
            kind="real"
            aspect="wide"
            label="The strongest craft proof on the site. Real photos of the actual finished home: the stone, the light, the rooms."
          />
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
