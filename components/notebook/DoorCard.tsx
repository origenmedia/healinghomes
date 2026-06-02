import type { ComponentProps } from 'react';
import { Link } from '@/lib/i18n/navigation';

type Href = ComponentProps<typeof Link>['href'];

export function DoorCard({
  href,
  label,
  icon,
  children,
}: {
  href: Href;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-border bg-surface p-10 md:p-12 hover:border-voice transition-colors duration-300 ease-in-out"
    >
      {icon && (
        <div className="mb-5 w-11 text-text-secondary">{icon}</div>
      )}
      <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-voice mb-6">
        {label}
      </p>
      <p className="font-serif text-lg md:text-xl text-text-primary leading-snug flex-1">
        {children}
      </p>
      <span
        className="mt-8 inline-block text-voice transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        aria-hidden
      >
        &rarr;
      </span>
    </Link>
  );
}
