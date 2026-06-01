import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // Localized route names. English slugs are canonical and match the copy spec.
  // Spanish slugs are sensible placeholders to refine during the Spanish
  // authoring pass; changing them here updates every link automatically.
  pathnames: {
    '/': '/',
    '/coming-to-mexico': {
      en: '/coming-to-mexico',
      es: '/vivir-en-mexico',
    },
    '/building-here': {
      en: '/building-here',
      es: '/construir-aqui',
    },
    '/rescuing-a-build': {
      en: '/rescuing-a-build',
      es: '/rescatar-una-obra',
    },
    '/contact': {
      en: '/contact',
      es: '/contacto',
    },
    '/signin': '/signin',
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
