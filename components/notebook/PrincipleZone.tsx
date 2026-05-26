import Link from 'next/link';

export function PrincipleZone({
  name,
  subtitle,
  paragraphs,
  href,
  locale,
}: {
  name: string;
  subtitle: string;
  paragraphs: string[];
  href: string;
  locale: string;
}) {
  return (
    <div className="border-t border-border pt-8 md:pt-10">
      <Link
        href={`/${locale}${href}`}
        className="group inline-block mb-6"
      >
        <h3 className="font-serif text-2xl md:text-3xl text-text-primary leading-tight group-hover:text-voice transition-colors">
          {name}
        </h3>
        <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-text-muted mt-1">
          {subtitle}
        </p>
      </Link>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="font-serif text-base md:text-lg text-text-secondary leading-relaxed mt-4 max-w-prose"
        >
          {p}
        </p>
      ))}
    </div>
  );
}
