import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // "Talk with Nathaniel" now books the call directly; old links follow.
        source: '/:locale/contact',
        has: [{ type: 'query', key: 'topic', value: 'call' }],
        destination: 'https://app.leadszen.io/book/leadszen-house/el-refugio-project',
        permanent: false,
      },
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
