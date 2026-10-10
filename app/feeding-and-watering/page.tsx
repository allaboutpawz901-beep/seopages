import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideDataBySlug } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';
import { seoAsset, seoUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const data = getGuideDataBySlug('feeding-and-watering');

  if (!data) {
    return {
      title: 'Feeding & Watering Guides & Supplies | All About Pawz',
      description: 'Comprehensive pet feeding and hydration equipment standards, bowls, and nutritional hardware.',
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: seoUrl('/feeding-and-watering'),
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: seoUrl('/feeding-and-watering'),
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

export default function FeedingAndWateringPage() {
  const data = getGuideDataBySlug('feeding-and-watering');

  if (!data) {
    notFound();
  }

  return <SeoPageTemplate data={data} />;
}
