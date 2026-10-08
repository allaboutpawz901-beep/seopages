'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Search
} from 'lucide-react';
import { PRODUCT_CATEGORIES, GUIDES_DIRECTORY } from '@/lib/taxonomy-data';

interface DirectoryDrawerProps {
  currentSlug: string;
  onSelectSlug: (slug: string) => void;
  onClose?: () => void;
}

export const DirectoryDrawer: React.FC<DirectoryDrawerProps> = ({
  currentSlug,
  onSelectSlug,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'guides' | 'products'>('guides');
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({
    'Grooming': true,
    'Nutrition': true,
    'Health & Wellness': true,
    'Buying Guides': true,
    'Local Mid-South': true,
    'Feeding & Watering': true,
    'Grooming Essentials: Needed for Home Care': true,
  });

  const togglePillar = (name: string) => {
    setExpandedPillars(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-white border border-stone-300 rounded-none p-6 sm:p-8 shadow-xs my-8">
      {/* Directory Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-300">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Complete Taxonomy Architecture</span>
          </div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            All About Pawz SEO Pages & Category Directory
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Select any guide, breed profile, local city, or product line to generate its Amazon-styled SEO page
          </p>
        </div>

        {/* Search input & Tab filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter 100+ articles..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-none focus:outline-none focus:ring-1 focus:ring-stone-900 text-stone-800 w-full sm:w-56"
            />
          </div>

          <div className="flex items-center p-1 bg-stone-100 rounded-none text-xs font-semibold border border-stone-200">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-3 py-1 rounded-none transition-colors cursor-pointer ${
                activeTab === 'guides' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              SEO Guides (80+)
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1 rounded-none transition-colors cursor-pointer ${
                activeTab === 'products' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Products (10 Cats)
            </button>
          </div>
        </div>
      </div>

      {/* Directory Content Tree */}
      <div className="mt-6">
        {activeTab === 'guides' ? (
          <div className="space-y-6">
            {GUIDES_DIRECTORY.map((pillar) => {
              const isExpanded = expandedPillars[pillar.pillar] !== false;
              const matchesFilter = !filterQuery || pillar.pillar.toLowerCase().includes(filterQuery.toLowerCase()) ||
                pillar.subcategories.some(sub => 
                  sub.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                  sub.items.some(item => item.name.toLowerCase().includes(filterQuery.toLowerCase()))
                );

              if (!matchesFilter) return null;

              return (
                <div key={pillar.pillar} className="border border-stone-300 rounded-none overflow-hidden bg-stone-50/50">
                  {/* Pillar Banner */}
                  <button
                    onClick={() => togglePillar(pillar.pillar)}
                    className="w-full px-5 py-3.5 bg-stone-100/90 hover:bg-stone-200/80 flex items-center justify-between text-left transition-colors rounded-none cursor-pointer border-b border-stone-300"
                  >
                    <div className="flex items-center gap-2.5">
                      {isExpanded ? (
                        <FolderOpen className="w-4 h-4 text-orange-600 shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                      <span className="font-extrabold text-stone-900 text-sm">
                        {pillar.pillar}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        ({pillar.anchor})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-stone-600">
                      {pillar.subcategories.reduce((acc, s) => acc + s.items.length, 0)} articles
                    </span>
                  </button>

                  {/* Subcategories */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 space-y-5 bg-white">
                      {pillar.subcategories.map((sub) => {
                        const subFilteredItems = sub.items.filter(item =>
                          !filterQuery || item.name.toLowerCase().includes(filterQuery.toLowerCase())
                        );

                        if (filterQuery && subFilteredItems.length === 0) return null;

                        return (
                          <div key={sub.name}>
                            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                              <span>📁</span>
                              <span>{sub.name}</span>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {subFilteredItems.map((item) => {
                                const isCurrent = currentSlug === item.slug;
                                return (
                                  <button
                                    key={item.slug}
                                    onClick={() => onSelectSlug(item.slug)}
                                    className={`p-2.5 rounded-none text-left text-xs transition-all flex items-center justify-between group border cursor-pointer ${
                                      isCurrent
                                        ? 'bg-orange-50 border-orange-500 text-orange-950 font-bold'
                                        : 'bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <FileText className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-orange-600' : 'text-stone-400'}`} />
                                      <span className="truncate">{item.name}</span>
                                    </div>
                                    {isCurrent ? (
                                      <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-600 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Products Taxonomy Tree */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isFiltered = !filterQuery || 
                cat.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                cat.children?.some(c => c.name.toLowerCase().includes(filterQuery.toLowerCase()));

              if (!isFiltered) return null;

              return (
                <div key={cat.slug} className="border border-stone-300 rounded-none p-5 bg-stone-50">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-300">
                    <button
                      onClick={() => onSelectSlug(cat.slug)}
                      className="font-extrabold text-stone-900 text-sm hover:text-orange-600 transition-colors text-left cursor-pointer"
                    >
                      {cat.name}
                    </button>
                    <span className="text-[10px] font-bold text-stone-600 bg-white px-2 py-0.5 rounded-none border border-stone-300">
                      {cat.children ? `${cat.children.length} sub` : 'Leaf'}
                    </span>
                  </div>

                  {cat.children ? (
                    <ul className="space-y-1.5">
                      {cat.children.map((sub) => (
                        <li key={sub.slug}>
                          <button
                            onClick={() => onSelectSlug(sub.slug)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-none text-xs flex items-center justify-between transition-colors border cursor-pointer ${
                              currentSlug === sub.slug
                                ? 'bg-orange-100 border-orange-400 text-orange-950 font-bold'
                                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-950'
                            }`}
                          >
                            <span>{sub.name}</span>
                            <ChevronRight className="w-3 h-3 opacity-40" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-400 italic">Direct product leaf category</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
