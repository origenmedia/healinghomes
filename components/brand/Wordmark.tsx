import { useTranslations } from 'next-intl';
import Link from 'next/link';

type WordmarkSize = 'sm' | 'base' | 'lg';

const sizeMap: Record<WordmarkSize, { heading: string; sub: string }> = {
  sm: {
    heading: 'text-lg',
    sub: 'text-[0.5rem] tracking-[0.3em]',
  },
  base: {
    heading: 'text-2xl',
    sub: 'text-[0.6rem] tracking-[0.3em]',
  },
  lg: {
    heading: 'text-4xl md:text-5xl',
    sub: 'text-xs tracking-[0.3em]',
  },
};

export function Wordmark({
  size = 'base',
  locale,
  linked = true,
}: {
  size?: WordmarkSize;
  locale: string;
  linked?: boolean;
}) {
  const t = useTranslations('home');
  const s = sizeMap[size];

  const content = (
    <div className="flex flex-col items-start gap-0.5">
      <span className={`font-serif font-normal ${s.heading} text-text-primary leading-none`}>
        {t('wordmark')}
      </span>
      <span className={`font-sans font-medium ${s.sub} text-text-muted uppercase leading-none`}>
        {t('subtitle')}
      </span>
    </div>
  );

  if (!linked) return content;

  return (
    <Link href={`/${locale}`} className="no-underline">
      {content}
    </Link>
  );
}
