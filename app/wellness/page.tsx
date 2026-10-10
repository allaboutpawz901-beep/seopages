import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideDataBySlug } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';
import { seoAsset, seoUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const data = getGuideDataBySlug('wellness');

  if (!data) {
    return {
      title: 'Pet Wellness Guides | All About Pawz',
      description: 'Supplements, itch remedies, hip and joint care, dental and ear care.',
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: seoUrl('/wellness'),
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: seoUrl('/wellness'),
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

export default function WellnessPage() {
  const data = getGuideDataBySlug('wellness');

  if (!data) {
    notFound();
  }

  return <SeoPageTemplate data={data} />;
}
