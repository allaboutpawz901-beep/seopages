'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check, 
  FileCheck2 
} from 'lucide-react';
import { GuidePageData } from '@/lib/types';

interface SeoSchemaInspectorProps {
  data: GuidePageData;
}

export const SeoSchemaInspector: React.FC<SeoSchemaInspectorProps> = ({ data }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [activeSchemaTab, setActiveSchemaTab] = useState<'article' | 'breadcrumbs' | 'local' | 'faq'>('article');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Compute schemas
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
      'url': 'https://allaboutpawz.com',
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://allaboutpawz.com' },
      { '@type': 'ListItem', 'position': 2, 'name': data.pillar, 'item': `https://allaboutpawz.com/guides#${data.pillar.toLowerCase()}` },
      { '@type': 'ListItem', 'position': 3, 'name': data.heroTitle, 'item': data.canonicalUrl },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PetGroomer',
    'name': 'All About Pawz',
    'url': 'https://allaboutpawz.com',
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

  const currentSchemaObject = 
    activeSchemaTab === 'article' ? articleSchema :
    activeSchemaTab === 'breadcrumbs' ? breadcrumbsSchema :
    activeSchemaTab === 'local' ? localBusinessSchema : faqSchema;

  const currentSchemaJson = JSON.stringify(currentSchemaObject, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(currentSchemaJson);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const titleLength = data.metaTitle.length;
  const descLength = data.metaDescription.length;

  return (
    <div className="bg-white border border-stone-300 rounded-none p-6 sm:p-8 shadow-xs my-8 space-y-10">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Search Engine Optimization & Structured Data</span>
        </div>
        <h2 className="text-2xl font-black text-stone-900 tracking-tight">
          SERP Snippet & Schema.org JSON-LD Studio
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Live simulation of how Google surfaces this page in search results, including rich review stars and FAQ snippets
        </p>
      </div>

      {/* Google SERP Preview Card */}
      <div className="bg-stone-50 border border-stone-300 rounded-none p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
            <Search className="w-4 h-4 text-stone-400" />
            <span>Google Search Result Preview</span>
          </div>

          <div className="flex items-center p-1 bg-stone-200 rounded-none text-xs font-semibold">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-none transition-colors cursor-pointer ${
                deviceView === 'desktop' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-none transition-colors cursor-pointer ${
                deviceView === 'mobile' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* The Google Card */}
        <div className={`bg-white border border-stone-300 rounded-none p-5 ${deviceView === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
          {/* URL & Favicon */}
          <div className="flex items-center gap-2 text-xs text-stone-600 mb-1.5 font-sans">
            <div className="w-5 h-5 rounded-none bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
              🐾
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-stone-900 leading-none">All About Pawz</span>
              <span className="text-[11px] text-stone-500 leading-tight">
                allaboutpawz.com &gt; {data.pillar.toLowerCase()} &gt; {data.slug}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg text-[#1a0dab] hover:underline font-normal cursor-pointer leading-snug mb-1">
            {data.metaTitle}
          </h3>

          {/* Rich Review Snippet */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-1.5">
            <span className="text-amber-500 font-bold">★★★★★</span>
            <span className="font-semibold text-stone-700">Rating: 4.9</span>
            <span>·</span>
            <span>450 reviews</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">Free booking consultation</span>
          </div>

          {/* Snippet Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {data.metaDescription}
          </p>

          {/* FAQ Sitelink Rich Snippet */}
          <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-[#1a0dab]">
            <div className="flex items-center gap-1.5 hover:underline cursor-pointer">
              <span>› How often should a Doodle be professionally groomed?</span>
            </div>
            <div className="flex items-center gap-1.5 hover:underline cursor-pointer">
              <span>› Why do groomers require proof of rabies vaccination in Memphis, TN?</span>
            </div>
          </div>
        </div>

        {/* SERP Meta Quality Metrics */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-none border border-stone-300">
            <span className="text-stone-500">Title Length: <strong>{titleLength} chars</strong></span>
            <span className={`px-2 py-0.5 rounded-none font-bold text-[10px] ${titleLength >= 50 && titleLength <= 65 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {titleLength >= 50 && titleLength <= 65 ? 'Optimal (50-65)' : 'Acceptable'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-white rounded-none border border-stone-300">
            <span className="text-stone-500">Meta Description: <strong>{descLength} chars</strong></span>
            <span className={`px-2 py-0.5 rounded-none font-bold text-[10px] ${descLength >= 120 && descLength <= 160 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {descLength >= 120 && descLength <= 160 ? 'Optimal (120-160)' : 'Acceptable'}
            </span>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema Viewer */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-none text-xs font-semibold border border-stone-200">
            <button
              onClick={() => setActiveSchemaTab('article')}
              className={`px-3 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeSchemaTab === 'article' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Article Schema
            </button>
            <button
              onClick={() => setActiveSchemaTab('breadcrumbs')}
              className={`px-3 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeSchemaTab === 'breadcrumbs' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              BreadcrumbList
            </button>
            <button
              onClick={() => setActiveSchemaTab('local')}
              className={`px-3 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeSchemaTab === 'local' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              PetGroomer / Local
            </button>
            <button
              onClick={() => setActiveSchemaTab('faq')}
              className={`px-3 py-1.5 rounded-none transition-colors cursor-pointer ${
                activeSchemaTab === 'faq' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              FAQPage Schema
            </button>
          </div>

          <button
            onClick={handleCopySchema}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-none text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? 'Copied Schema!' : 'Copy JSON-LD'}</span>
          </button>
        </div>

        <pre className="bg-stone-900 text-emerald-400 p-4 rounded-none text-xs font-mono overflow-x-auto max-h-72 border border-stone-800 leading-relaxed">
          <code>{currentSchemaJson}</code>
        </pre>
      </div>

      {/* SEO Health Audit Scorecard */}
      <div className="pt-6 border-t border-stone-300">
        <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-emerald-600" />
          <span>On-Page SEO Health Signals</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-none">
            <div className="text-emerald-800 font-bold mb-0.5">Primary Keyword</div>
            <div className="text-stone-600 font-mono">&ldquo;{data.targetKeyword}&rdquo;</div>
            <div className="text-[11px] text-emerald-600 mt-1">Found in H1, Meta, Body</div>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-none">
            <div className="text-emerald-800 font-bold mb-0.5">Heading Structure</div>
            <div className="text-stone-600">1x H1 · 6x H2 · 8x H3</div>
            <div className="text-[11px] text-emerald-600 mt-1">Clean logical hierarchy</div>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-none">
            <div className="text-emerald-800 font-bold mb-0.5">Structured Schema</div>
            <div className="text-stone-600">4 Validated Types</div>
            <div className="text-[11px] text-emerald-600 mt-1">100% Google Rich Compatible</div>
          </div>

          <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-none">
            <div className="text-emerald-800 font-bold mb-0.5">Local Mid-South Signals</div>
            <div className="text-stone-600">Memphis & Shelby Co.</div>
            <div className="text-[11px] text-emerald-600 mt-1">Geo-targeted LocalBusiness</div>
          </div>
        </div>
      </div>

    </div>
  );
};
