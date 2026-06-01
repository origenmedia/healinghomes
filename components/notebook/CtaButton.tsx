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
      className="inline-flex items-center justify-center bg-voice text-page font-sans text-sm md:text-base px-7 py-3.5 hover:bg-voice-hover transition-colors"
    >
      {children}
    </Link>
  );
}
