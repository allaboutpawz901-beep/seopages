import { MetadataRoute } from 'next';
import { getAllSlugs, getLocalCitySlugs } from '@/lib/taxonomy-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://allaboutpawz.com';
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

  // Feeding & Watering Master Pillar & Subcategories
  const feedingSubcategories = [
    'water-bottles',
    'nursing-supplies',
    'lick-mats',
    'fountains',
    'food-storage',
    'feeding-mats',
    'bowls-and-dishes',
    'automatic-feeders',
  ];

  routes.push({
    url: `${baseUrl}/feeding-and-watering`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  feedingSubcategories.forEach((sub) => {
    routes.push({
      url: `${baseUrl}/feeding-and-watering/${sub}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  // All 100+ SEO Guides and Product Categories
  const slugs = getAllSlugs();
  slugs.forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
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
