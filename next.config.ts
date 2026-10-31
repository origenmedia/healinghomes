import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale/building-here',
        destination: '/:locale/ready-to-build',
        permanent: true,
      },
      {
        source: '/:locale/construir-aqui',
        destination: '/:locale/listo-para-construir',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
