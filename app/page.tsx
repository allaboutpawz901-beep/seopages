import type { Metadata } from 'next';
import { getGuideDataBySlug } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';

export const metadata: Metadata = {
  title: 'All About Pawz | Pet Grooming, Nutrition & Comprehensive Care Guides',
  description: 'Premier fear-free pet grooming salon, veterinary-backed nutrition guidance, and clinical pet care guides.',
  alternates: {
    canonical: 'https://www.aapawz.com',
  },
  openGraph: {
    title: 'All About Pawz | Pet Grooming & Care Guides',
    description: 'Premier fear-free pet grooming salon, veterinary-backed nutrition guidance, and comprehensive care guides.',
    url: 'https://www.aapawz.com',
    siteName: 'All About Pawz',
    type: 'website',
  },
};

export default function HomePage() {
  // Flagship featured guide data on homepage
  const flagshipData = getGuideDataBySlug('doodle-grooming');

  return <SeoPageTemplate data={flagshipData} />;
}
