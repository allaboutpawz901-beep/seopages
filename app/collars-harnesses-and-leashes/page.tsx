import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideDataBySlug } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';
import { seoAsset, seoUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const data = getGuideDataBySlug('collars-harnesses-and-leashes');

  if (!data) {
    return {
      title: 'Collars, Harnesses & Leashes Guides | All About Pawz',
      description: 'Activity trackers, location trackers, ID tags, muzzles, leashes, harnesses, and collars.',
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: seoUrl('/collars-harnesses-and-leashes'),
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: seoUrl('/collars-harnesses-and-leashes'),
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

export default function CollarsHarnessesLeashesPage() {
  const data = getGuideDataBySlug('collars-harnesses-and-leashes');

  if (!data) {
    notFound();
  }

  return <SeoPageTemplate data={data} />;
}
