'use client';

import React from 'react';
import Image from 'next/image';
import { 
  MonitorCheck, 
  TrendingUp, 
  Shapes, 
  ArrowUpRight 
} from 'lucide-react';
import { GuidePageData } from '@/lib/types';

interface WhyFeaturesColProps {
  data: GuidePageData;
  onLearnMore?: () => void;
}

export const WhyFeaturesCol: React.FC<WhyFeaturesColProps> = ({ data, onLearnMore }) => {
  return (
    <section className="my-14 lg:my-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: 3 Structured Feature Pillars (All Square) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight mb-10 text-balance">
            {data.whyHeadline}
          </h2>

          <div className="space-y-9 mb-10 w-full">
            {/* Feature 1 */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 mt-0.5 text-stone-950 rounded-none border border-stone-300 bg-stone-50">
                <MonitorCheck className="w-7 h-7 stroke-[1.6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-950 mb-2 tracking-tight">
                  {data.whyFeatures[0]?.title || 'Care from a team more pet owners trust'}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  {data.whyFeatures[0]?.description || 'The All About Pawz brand helps pet parents feel confident. Ranked among the most trusted pet grooming salons and care providers in Memphis and Shelby County.'}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 mt-0.5 text-stone-950 rounded-none border border-stone-300 bg-stone-50">
                <TrendingUp className="w-7 h-7 stroke-[1.6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-950 mb-2 tracking-tight">
                  {data.whyFeatures[1]?.title || 'Care with tools and programs that help pets thrive'}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  {data.whyFeatures[1]?.description || 'It takes dedication to keep coats healthy and mat-free. That’s why we provide every client with salon-grade deshedding, hypoallergenic botanicals, and personalized home brushing routines.'}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 mt-0.5 text-stone-950 rounded-none border border-stone-300 bg-stone-50">
                <Shapes className="w-7 h-7 stroke-[1.6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-950 mb-2 tracking-tight">
                  {data.whyFeatures[2]?.title || 'Full-service salon with high-impact, optional services'}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  {data.whyFeatures[2]?.description || 'We provide pet parents of all dog and cat breeds with a range of optional services at exceptional value: including blueberry facials, teeth enzyme cleaning, and Mid-South allergy mud baths.'}
                </p>
              </div>
            </div>
          </div>

          {/* Learn More Button (Square) */}
          <button
            onClick={onLearnMore}
            className="px-7 py-3 border border-stone-900 text-stone-950 hover:bg-stone-950 hover:text-white transition-colors text-sm font-bold cursor-pointer rounded-none"
          >
            {data.whyCtaText}
          </button>
        </div>

        {/* Right Column: 2 Customer Story Cards (Square Cards, Square Avatars) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {data.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F6F5F2] border border-stone-300 p-7 lg:p-8 flex flex-col justify-between rounded-none shadow-xs"
            >
              {/* Quote Text */}
              <blockquote className="text-base sm:text-lg font-bold text-stone-950 leading-snug mb-6">
                {item.quote}
              </blockquote>

              {/* Founder / Parent Lockup */}
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-12 h-12 overflow-hidden bg-stone-300 shrink-0 rounded-none border border-stone-400">
                    <Image
                      src={item.avatarUrl}
                      alt={item.authorName}
                      fill
                      className="object-cover rounded-none"
                      sizes="48px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-950">
                      {item.authorName}
                    </div>
                    <div className="text-xs text-stone-600">
                      {item.authorRole}
                    </div>
                  </div>
                </div>

                {/* See story link */}
                <button
                  onClick={onLearnMore}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-950 hover:text-orange-600 transition-colors cursor-pointer rounded-none"
                >
                  <span>{item.storyLinkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
