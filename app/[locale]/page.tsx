import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-serif text-6xl text-text-primary tracking-tight">
          {t('wordmark')}
        </h1>
        <p className="text-xs text-text-muted tracking-widest">
          {t('subtitle')}
        </p>
      </div>
      <p className="font-serif italic text-xl text-text-secondary text-center max-w-lg leading-snug">
        {t('tagline')}
      </p>
      <Link
        href={`/${locale}/signin`}
        className="text-sm text-text-muted hover:text-voice transition-colors tracking-wider uppercase mt-8"
      >
        {t('signInPrompt')}
      </Link>
    </div>
  );
}
