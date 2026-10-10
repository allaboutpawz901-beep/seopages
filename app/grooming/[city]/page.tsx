import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideDataBySlug, getLocalCitySlugs } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';
import { seoAsset, seoUrl } from '@/lib/site-url';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

function getGuideSlugForCity(city: string) {
  return city === 'shelby-county' ? 'grooming-across-shelby-county' : `grooming-in-${city}`;
}

export async function generateStaticParams() {
  const cities = getLocalCitySlugs();
  return cities.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const slug = getGuideSlugForCity(city);
  const data = getGuideDataBySlug(slug);

  if (!data) {
    return {
      title: 'Local Grooming | All About Pawz',
      description: 'Professional pet grooming services in Shelby County, TN.',
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: seoUrl(`/grooming/${city}`),
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: seoUrl(`/grooming/${city}`),
      siteName: 'All About Pawz',
      images: [
        {
          url: seoAsset(data.heroImageUrl),
          width: 1200,
          height: 675,
          alt: data.heroImageAlt,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
      images: [seoAsset(data.heroImageUrl)],
    },
    keywords: [data.targetKeyword, ...data.secondaryKeywords],
  };
}

export default async function LocalCityPage({ params }: CityPageProps) {
  const { city } = await params;
  const slug = getGuideSlugForCity(city);
  const data = getGuideDataBySlug(slug);

  if (!data) {
    notFound();
  }

  // Adjust canonical for the city route
  const cityData = {
    ...data,
    canonicalUrl: seoUrl(`/grooming/${city}`),
  };

  return <SeoPageTemplate data={cityData} />;
}
