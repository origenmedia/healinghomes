import type { ComponentProps } from 'react';
import { Link } from '@/lib/i18n/navigation';

type Href = ComponentProps<typeof Link>['href'];

// Primary call to action. Lake Chapala Blue, sharp corners, paper-toned label.
export function CtaButton({
  href,
  children,
}: {
  href: Href;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 bg-voice text-page font-sans font-medium text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-voice-deep motion-safe:hover:-translate-y-0.5 transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-voice"
    >
      <span>{children}</span>
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden
      >
        &rarr;
      </span>
    </Link>
  );
}
