import { MetadataRoute } from 'next';
import { getAllSlugs, getLocalCitySlugs, PRODUCT_CATEGORIES } from '@/lib/taxonomy-data';

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
  ];

  // Add all canonical product category top-level & subcategory paths
  PRODUCT_CATEGORIES.forEach((cat) => {
    routes.push({
      url: `${baseUrl}/${cat.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    cat.children?.forEach((sub) => {
      routes.push({
        url: `${baseUrl}/${cat.slug}/${sub.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  // Add all guide slugs
  const allSlugs = getAllSlugs();
  allSlugs.forEach((slug) => {
    // Avoid re-adding slugs already formatted as category children
    const isProductCategorySlug = PRODUCT_CATEGORIES.some(c => c.slug === slug);
    if (!isProductCategorySlug) {
      routes.push({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  });

  // Local Mid-South City Landing Pages
  const cities = getLocalCitySlugs();
  cities.forEach((city) => {
    routes.push({
      url: `${baseUrl}/grooming/${city}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  });

  return routes;
}
