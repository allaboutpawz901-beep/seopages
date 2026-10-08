import type { Metadata } from 'next';
import { getGuideDataBySlug } from '@/lib/taxonomy-data';
import { SeoPageTemplate } from '@/components/SeoPageTemplate';

export const metadata: Metadata = {
  title: 'All About Pawz | Pet Grooming, Nutrition & Supplies in Memphis, TN',
  description: 'Mid-South’s premier fear-free pet grooming salon, veterinary-backed nutrition guidance, and premium supplies in Memphis and Shelby County, TN.',
  alternates: {
    canonical: 'https://allaboutpawz.com',
  },
  openGraph: {
    title: 'All About Pawz | Pet Grooming & Care Memphis, TN',
    description: 'Mid-South’s premier fear-free pet grooming salon, veterinary-backed nutrition guidance, and premium supplies.',
    url: 'https://allaboutpawz.com',
    siteName: 'All About Pawz',
    type: 'website',
  },
};

export default function HomePage() {
  // Flagship featured guide data on homepage
  const flagshipData = getGuideDataBySlug('doodle-grooming');

  return <SeoPageTemplate data={flagshipData} />;
}
