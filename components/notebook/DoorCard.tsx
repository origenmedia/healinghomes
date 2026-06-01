import type { ComponentProps } from 'react';
import { Link } from '@/lib/i18n/navigation';

type Href = ComponentProps<typeof Link>['href'];

export function DoorCard({
  href,
  label,
  children,
}: {
  href: Href;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-border bg-surface p-8 md:p-10 hover:border-voice transition-colors"
    >
      <p className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-voice mb-5">
        {label}
      </p>
      <p className="font-serif text-lg md:text-xl text-text-primary leading-snug">
        {children}
      </p>
      <span
        className="mt-6 inline-block text-voice transition-transform group-hover:translate-x-1"
        aria-hidden
      >
        &rarr;
      </span>
    </Link>
  );
}
