import type {Metadata} from 'next';
import { SEO_SITE_URL } from '@/lib/site-url';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aapawz.com'),
  title: 'All About Pawz - SEO Pages & Guides Template Hub',
  description: 'Production-ready SEO page library and veterinary-reviewed pet care guide engine for All About Pawz grooming, canine nutrition, and premium supplies.',
  alternates: {
    canonical: SEO_SITE_URL,
  },
  openGraph: {
    title: 'All About Pawz - SEO Pages & Guides Template Hub',
    description: 'Production-ready SEO page library and veterinary-reviewed pet care guide engine for All About Pawz grooming, canine nutrition, and premium supplies.',
    url: SEO_SITE_URL,
    siteName: 'All About Pawz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All About Pawz - SEO Pages & Guides Template Hub',
    description: 'Production-ready SEO page library and veterinary-reviewed pet care guide engine for All About Pawz grooming, canine nutrition, and premium supplies.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
