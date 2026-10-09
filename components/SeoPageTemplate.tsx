'use client';

import React, { useState } from 'react';
import { GuidePageData } from '@/lib/types';
import { TopNav } from '@/components/TopNav';
import { HeroBanner } from '@/components/HeroBanner';
import { IncentivesRow } from '@/components/IncentivesRow';
import { WhyFeaturesCol } from '@/components/WhyFeaturesCol';
import { ArticleBodyView } from '@/components/ArticleBodyView';
import { BookingModal } from '@/components/BookingModal';
import { Footer } from '@/components/Footer';

interface SeoPageTemplateProps {
  data: GuidePageData;
}

export const SeoPageTemplate: React.FC<SeoPageTemplateProps> = ({ data }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(data.serviceCity || 'Memphis, TN');

  const handleBookCity = (city: string) => {
    setSelectedCity(city);
    setIsBookingModalOpen(true);
  };

  // Structured Data schemas for this specific page
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.metaTitle,
    'description': data.metaDescription,
    'image': [data.heroImageUrl],
    'datePublished': '2026-01-15T08:00:00+08:00',
    'dateModified': '2026-10-07T12:00:00+08:00',
    'author': {
      '@type': 'Person',
      'name': data.author.name,
      'jobTitle': data.author.role,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'All About Pawz',
      'url': 'https://www.aapawz.com',
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': data.canonicalUrl,
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.aapawz.com' },
      { '@type': 'ListItem', 'position': 2, 'name': data.pillar, 'item': `https://www.aapawz.com/guides#${data.pillar.toLowerCase()}` },
      { '@type': 'ListItem', 'position': 3, 'name': data.heroTitle, 'item': data.canonicalUrl },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PetGroomer',
    'name': 'All About Pawz',
    'url': 'https://www.aapawz.com',
    'telephone': '+1-901-555-PAWZ',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Memphis',
      'addressRegion': 'TN',
      'postalCode': '38138',
      'addressCountry': 'US',
    },
    'areaServed': ['Memphis, TN', 'Bartlett, TN', 'Collierville, TN', 'Germantown, TN', 'Shelby County, TN'],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '450',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white" id="top">
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Navigation */}
      <TopNav onBookClick={() => setIsBookingModalOpen(true)} />

      {/* Main Website Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 w-full">
        
        {/* Amazon-styled Hero Section (Screenshot 3) */}
        <HeroBanner
          data={data}
          onBookClick={() => setIsBookingModalOpen(true)}
        />

        {/* Amazon-styled 3-Card Incentives / Care Standards Row (Screenshot 1) */}
        <IncentivesRow
          data={data}
          onExploreClick={() => {
            const el = document.getElementById('guide-content');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Amazon-styled "Why Choose All About Pawz" 2-Column Section (Screenshot 2) */}
        <WhyFeaturesCol
          data={data}
          onLearnMore={() => setIsBookingModalOpen(true)}
        />

        {/* Longform Editorial Guide: TOC, Step-by-Step, Comparison Table, Supplies, FAQs */}
        <ArticleBodyView
          data={data}
          onBookCity={handleBookCity}
        />

      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultCity={selectedCity}
        guideTitle={data.heroTitle}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
};
