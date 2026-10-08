import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideDataBySlug, getAllSlugs } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getGuideDataBySlug(slug);

  if (!data) {
    return {
      title: 'Guide Not Found | All About Pawz',
      description: 'The requested pet care guide could not be found.',
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: data.canonicalUrl,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: data.canonicalUrl,
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

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const data = getGuideDataBySlug(slug);

  if (!data) {
    notFound();
  }

  return <SeoPageTemplate data={data} />;
}
