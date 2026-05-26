import Link from 'next/link';

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-sans text-sm text-voice hover:text-voice-hover transition-colors group"
    >
      <span>{children}</span>
      <span
        className="inline-block transition-transform group-hover:translate-x-1"
        aria-hidden
      >
        &rarr;
      </span>
    </Link>
  );
}
