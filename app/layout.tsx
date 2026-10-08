import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'All About Pawz - SEO Pages & Guides Template Hub',
  description: 'Production-ready Amazon-styled SEO page template and interactive article engine for All About Pawz pet care, grooming, and supplies in Memphis and Shelby County.',
  openGraph: {
    title: 'All About Pawz - SEO Pages & Guides Template Hub',
    description: 'Production-ready Amazon-styled SEO page template and interactive article engine for All About Pawz pet care, grooming, and supplies in Memphis and Shelby County.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All About Pawz - SEO Pages & Guides Template Hub',
    description: 'Production-ready Amazon-styled SEO page template and interactive article engine for All About Pawz pet care, grooming, and supplies in Memphis and Shelby County.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
