import { MetadataRoute } from 'next';
import { GUIDES_DIRECTORY, getProductCategoryPaths } from '@/lib/taxonomy-data';
import { SEO_SITE_URL, seoUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    {
      url: SEO_SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: seoUrl('/guides'),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: seoUrl('/dog-breeds'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  getProductCategoryPaths().forEach((path) => {
    routes.push({
      url: seoUrl(path),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: path.split('/').length <= 2 ? 0.9 : 0.85,
    });
  });

  GUIDES_DIRECTORY.forEach((pillar) => {
    pillar.subcategories.forEach((subcategory) => {
      subcategory.items.forEach((item) => {
        routes.push({
          url: seoUrl(item.path),
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      });
    });
  });

  return routes;
}
