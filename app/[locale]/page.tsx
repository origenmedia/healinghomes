import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Wordmark } from '@/components/brand/Wordmark';
import { LocaleSwitch } from '@/components/chrome/LocaleSwitch';
import { SectionLabel } from '@/components/notebook/SectionLabel';
import { PrincipleZone } from '@/components/notebook/PrincipleZone';
import { PullQuote } from '@/components/notebook/PullQuote';
import { ArrowLink } from '@/components/notebook/ArrowLink';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const year = new Date().getFullYear().toString();

  return (
    <div className="min-h-screen">
      {/* ─── Top chrome ─── */}
      <header className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-6 md:py-8">
        <Wordmark size="base" locale={locale} />
        <nav className="flex items-center gap-6">
          <LocaleSwitch locale={locale} />
          <Link
            href={`/${locale}/signin`}
            className="font-sans text-xs tracking-[0.15em] uppercase text-voice hover:text-voice-hover transition-colors"
          >
            {t('signInPrompt')}
          </Link>
        </nav>
      </header>

      <main>
        {/* ─── Hero zone ─── */}
        <section className="flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-16 pb-24 md:pt-28 md:pb-36 lg:pt-36 lg:pb-44 min-h-[70vh]">
          <PullQuote>{t('tagline')}</PullQuote>
          <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed mt-8 max-w-xl">
            {t('heroSupporting')}
          </p>
          <div className="mt-10">
            <ArrowLink href={`/${locale}/contact`}>{t('heroCta')}</ArrowLink>
          </div>
        </section>

        {/* ─── Practice ─── */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-border">
          <SectionLabel>{t('practiceLabel')}</SectionLabel>
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary leading-snug max-w-2xl">
            {t('practiceHeadline')}
          </h2>
          <div className="mt-10 md:mt-12 space-y-6 max-w-prose">
            <p className="font-serif text-base md:text-lg text-text-secondary leading-relaxed">
              {t('practiceP1')}
            </p>
            <p className="font-serif text-base md:text-lg text-text-secondary leading-relaxed">
              {t('practiceP2')}
            </p>
            <p className="font-serif text-base md:text-lg text-text-secondary leading-relaxed">
              {t('practiceP3')}
            </p>
          </div>
        </section>

        {/* ─── Three Principles ─── */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-border">
          <SectionLabel>{t('principlesLabel')}</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            <PrincipleZone
              name={t('firmitasName')}
              subtitle={t('firmitasSub')}
              paragraphs={[t('firmitasP1'), t('firmitasP2')]}
              href="/principles/firmitas"
              locale={locale}
            />
            <PrincipleZone
              name={t('utilitasName')}
              subtitle={t('utilitasSub')}
              paragraphs={[t('utilitasP1'), t('utilitasP2')]}
              href="/principles/utilitas"
              locale={locale}
            />
            <PrincipleZone
              name={t('venustasName')}
              subtitle={t('venustasSub')}
              paragraphs={[t('venustasP1'), t('venustasP2')]}
              href="/principles/venustas"
              locale={locale}
            />
          </div>
        </section>

        {/* ─── Founder ─── */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-border">
          <SectionLabel>{t('founderLabel')}</SectionLabel>
          <p className="font-serif text-base md:text-lg text-text-secondary leading-relaxed max-w-prose italic">
            {t('founderText')}
          </p>
          <div className="mt-8">
            <ArrowLink href={`/${locale}/about`}>{t('founderReadMore')}</ArrowLink>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-border">
          <SectionLabel>{t('contactLabel')}</SectionLabel>
          <p className="font-serif text-xl md:text-2xl text-text-primary leading-snug max-w-xl">
            {t('contactText')}
          </p>
          <div className="mt-8">
            <ArrowLink href={`/${locale}/contact`}>{t('contactCta')}</ArrowLink>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <Wordmark size="sm" locale={locale} />
          </div>
          <nav className="flex flex-col gap-3">
            {[
              { label: t('footerPractice'), href: `/${locale}#practice` },
              { label: t('footerPrinciples'), href: `/${locale}#principles` },
              { label: t('footerProjects'), href: `/${locale}/projects` },
              { label: t('footerInvestors'), href: `/${locale}/investors` },
              { label: t('footerContact'), href: `/${locale}/contact` },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-text-muted hover:text-voice transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col justify-between gap-6">
            <LocaleSwitch locale={locale} />
            <p className="font-sans text-xs text-text-dim">
              {t('footerCopyright', { year })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
