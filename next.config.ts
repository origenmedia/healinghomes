import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { BOOKING_URL } from './lib/site/booking';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    // Pages from the earlier site send visitors to the page that now covers
    // the same ground. Temporary (307) so they can come back if needed.
    const old: [string, string][] = [
      ['building-here', 'how-it-works'],
      ['construir-aqui', 'how-it-works'],
      ['ready-to-build', 'how-it-works'],
      ['listo-para-construir', 'how-it-works'],
      ['coming-to-mexico', 'my-story'],
      ['vivir-en-mexico', 'my-story'],
      ['rescuing-a-build', 'contact'],
      ['rescatar-una-obra', 'contact'],
      ['gallery', 'el-refugio'],
      ['galeria', 'el-refugio'],
    ];
    // The credits page from the earlier site goes to the home page.
    const credits = ['credits', 'creditos'].map((from) => ({ source: `/:locale/${from}`, destination: '/en', permanent: false }));
    // English only for now: every Spanish address goes to its English page.
    // Remove these when the Spanish pages are written.
    const es: [string, string][] = [
      ['contacto', 'contact'],
      ['como-funciona', 'how-it-works'],
      ['mi-historia', 'my-story'],
      ['privacidad', 'privacy'],
    ];
    const spanish = [
      ...es.map(([from, to]) => ({ source: `/es/${from}`, destination: `/en/${to}`, permanent: false })),
      { source: '/es', destination: '/en', permanent: false },
      { source: '/es/:path*', destination: '/en/:path*', permanent: false },
    ];
    // Old links to the call, founding families and investor forms (shared
    // before the booking page) go to the booking page.
    const booking = ['call', 'list', 'invest'].map((topic) => ({
      source: '/:locale/contact',
      has: [{ type: 'query' as const, key: 'topic', value: topic }],
      destination: BOOKING_URL,
      permanent: false,
    }));
    return [
      ...booking,
      ...old.map(([from, to]) => ({ source: `/:locale/${from}`, destination: `/en/${to}`, permanent: false })),
      ...credits,
      ...spanish,
    ];
  },
};

export default withNextIntl(nextConfig);
