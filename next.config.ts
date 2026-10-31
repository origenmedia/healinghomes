import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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
    return old.map(([from, to]) => ({ source: `/:locale/${from}`, destination: `/en/${to}`, permanent: false }));
  },
};

export default withNextIntl(nextConfig);
