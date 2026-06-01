import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation helpers. Use these instead of next/link so that
// translated route names resolve correctly per locale.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
