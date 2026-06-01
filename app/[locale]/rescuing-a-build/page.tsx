import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { Beat } from '@/components/notebook/Beat';
import { ImageSlot } from '@/components/notebook/ImageSlot';
import { CtaButton } from '@/components/notebook/CtaButton';

export default async function RescuingABuild({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('rescuingABuild');

  const recognition = t.raw('recognition.lines') as string[];
  const lived = t.raw('lived.lines') as string[];
  const rescue = t.raw('rescue.lines') as string[];
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

        {/* 2 · I have lived it */}
        <Beat>
          <ImageSlot
            kind="real"
            aspect="wide"
            label="Optional but strong. A real photo of the builder's own first build mid-disaster, before he finished it. Proof he survived exactly this."
          />
          <div className="mt-10 space-y-5">
            {lived.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 3 · How a rescue works */}
        <Beat>
          <div className="space-y-5">
            {rescue.map((line, i) => (
              <p
                key={i}
                className="font-serif text-lg md:text-xl text-text-primary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </Beat>

        {/* 4 · The close */}
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
