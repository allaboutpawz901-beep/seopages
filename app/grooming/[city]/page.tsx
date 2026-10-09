import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideDataBySlug, getLocalCitySlugs } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';

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
      canonical: `https://www.aapawz.com/grooming/${city}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://www.aapawz.com/grooming/${city}`,
      siteName: 'All About Pawz',
      images: [
        {
          url: data.heroImageUrl,
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
      images: [data.heroImageUrl],
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
    canonicalUrl: `https://www.aapawz.com/grooming/${city}`,
  };

  return <SeoPageTemplate data={cityData} />;
}
