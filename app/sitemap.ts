import type { MetadataRoute } from 'next';

const BASE = 'https://www.healinghomes.mx';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ['/en', 1],
    ['/en/el-refugio', 0.9],
    ['/en/how-it-works', 0.8],
    ['/en/my-story', 0.7],
    ['/en/contact', 0.6],
    ['/en/privacy', 0.2],
  ];
  return pages.map(([path, priority]) => ({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: 'monthly', priority }));
}
