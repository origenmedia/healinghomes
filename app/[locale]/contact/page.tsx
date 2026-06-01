import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/chrome/SiteHeader';
import { SiteFooter } from '@/components/chrome/SiteFooter';
import { ContactForm } from '@/components/contact/ContactForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader locale={locale} />

      <main className="flex-1 px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary leading-tight tracking-tight">
            {t('header')}
          </h1>
          <p className="mt-6 font-serif text-lg md:text-xl text-text-secondary leading-relaxed">
            {t('intro')}
          </p>
          <div className="mt-10 md:mt-12">
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
