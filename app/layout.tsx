import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aapawz.com'),
  title: 'All About Pawz - SEO Pages & Guides Template Hub',
  description: 'Production-ready SEO page library and veterinary-reviewed pet care guide engine for All About Pawz grooming, canine nutrition, and premium supplies.',
  alternates: {
    canonical: 'https://www.aapawz.com',
  },
  openGraph: {
    title: 'All About Pawz - SEO Pages & Guides Template Hub',
    description: 'Production-ready SEO page library and veterinary-reviewed pet care guide engine for All About Pawz grooming, canine nutrition, and premium supplies.',
    url: 'https://www.aapawz.com',
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
