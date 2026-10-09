import { MetadataRoute } from 'next';
import { GUIDES_DIRECTORY, getProductCategoryPaths } from '@/lib/taxonomy-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aapawz.com';
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dog-breeds`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  getProductCategoryPaths().forEach((path) => {
    routes.push({
      url: `${baseUrl}${path}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: path.split('/').length <= 2 ? 0.9 : 0.85,
    });
  });

  GUIDES_DIRECTORY.forEach((pillar) => {
    pillar.subcategories.forEach((subcategory) => {
      subcategory.items.forEach((item) => {
        routes.push({
          url: `${baseUrl}${item.path}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      });
    });
  });

  return routes;
}
