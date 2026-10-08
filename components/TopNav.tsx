'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ChevronDown, 
  MapPin, 
  X,
  LayoutGrid
} from 'lucide-react';
import { GUIDES_DIRECTORY, PRODUCT_CATEGORIES } from '@/lib/taxonomy-data';

interface TopNavProps {
  onBookClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onBookClick }) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search items index
  const searchIndex = React.useMemo(() => {
    const list: { name: string; url: string; group: string }[] = [];
    
    GUIDES_DIRECTORY.forEach(pillar => {
      pillar.subcategories.forEach(sub => {
        sub.items.forEach(item => {
          list.push({ 
            name: item.name, 
            url: item.path.startsWith('/') ? item.path : `/${item.slug}`, 
            group: pillar.pillar 
          });
        });
      });
    });

    PRODUCT_CATEGORIES.forEach(cat => {
      list.push({ name: `${cat.name} (Category)`, url: `/${cat.slug}`, group: 'Products' });
      cat.children?.forEach(sub => {
        list.push({ name: `${sub.name}`, url: `/${sub.slug}`, group: cat.name });
      });
    });

    return list;
  }, []);

  const searchResults = searchQuery.trim()
    ? searchIndex.filter(i => 
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.group.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10)
    : [];

  const handleSelectResult = (url: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 rounded-none" ref={navRef}>
      {/* Top Utility Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800 rounded-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-stone-100 font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Memphis & Shelby County, TN
            </span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-400 hidden sm:inline">Professional Salon & Fear-Free Pet Care</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300 text-xs font-medium">
            <span>Rabies Verification Mandatory</span>
            <span className="text-stone-600 hidden md:inline">·</span>
            <span className="hidden md:inline">(901) 555-PAWZ</span>
          </div>
        </div>
      </div>

      {/* Main Amazon-Style Navigation Bar (All Square) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-10 shrink-0">
            <Link href="/" className="text-left group cursor-pointer">
              <span className="text-2xl font-black tracking-tight text-stone-950 font-sans block leading-none">
                All About Pawz
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-500 block mt-1">
                Grooming & Supplies · Mid-South
              </span>
            </Link>

            {/* Enterprise Nav Dropdowns & Mega Menu (Square corners) */}
            <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-stone-800">
              
              {/* Enterprise Mega Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'megamenu' ? null : 'megamenu')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 font-bold transition-colors cursor-pointer rounded-none border text-xs uppercase tracking-wider ${
                    activeMenu === 'megamenu' 
                      ? 'bg-orange-600 text-white border-orange-600' 
                      : 'bg-stone-950 text-white hover:bg-stone-800 border-stone-950'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Enterprise Mega Menu</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === 'megamenu' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'megamenu' && (
                  <div className="absolute left-0 mt-2 w-[1140px] bg-white shadow-2xl border-2 border-stone-900 p-8 z-50 rounded-none animate-in fade-in duration-100 max-h-[82vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                      <div>
                        <div className="text-xs font-black text-orange-600 uppercase tracking-widest">Enterprise Taxonomy Architecture</div>
                        <h3 className="text-lg font-black text-stone-950">All About Pawz: Master Directory & Catalog</h3>
                      </div>
                      <div className="text-xs text-stone-500 font-medium">
                        300+ Canonical SEO Profiles · Veterinary-Approved Care Hardware
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-6 text-xs">
                      {/* Column 1: Feeding & Watering */}
                      <div className="space-y-3 border-r border-stone-100 pr-4">
                        <div className="font-black text-stone-950 uppercase tracking-wider pb-1 border-b-2 border-orange-500 flex items-center justify-between">
                          <span>Feeding & Watering</span>
                          <span className="text-[10px] bg-stone-100 px-1 py-0.5 text-stone-600">8 Guides</span>
                        </div>
                        <div className="space-y-1">
                          <Link href="/feeding-and-watering" onClick={() => setActiveMenu(null)} className="block py-1 text-orange-600 font-bold hover:underline">Overview & Clinical Standard</Link>
                          <Link href="/feeding-and-watering/water-bottles" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Water Bottles</Link>
                          <Link href="/feeding-and-watering/nursing-supplies" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Nursing Supplies</Link>
                          <Link href="/feeding-and-watering/lick-mats" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Lick Mats</Link>
                          <Link href="/feeding-and-watering/fountains" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Fountains</Link>
                          <Link href="/feeding-and-watering/food-storage" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Food Storage</Link>
                          <Link href="/feeding-and-watering/feeding-mats" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Feeding Mats</Link>
                          <Link href="/feeding-and-watering/bowls-and-dishes" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Bowls & Dishes</Link>
                          <Link href="/feeding-and-watering/automatic-feeders" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Automatic Feeders</Link>
                        </div>
                      </div>

                      {/* Column 2: Grooming Essentials (Home Care) */}
                      <div className="space-y-3 border-r border-stone-100 pr-4">
                        <div className="font-black text-stone-950 uppercase tracking-wider pb-1 border-b-2 border-orange-500 flex items-center justify-between">
                          <span>Grooming Essentials</span>
                          <span className="text-[10px] bg-stone-100 px-1 py-0.5 text-stone-600">11 Tools</span>
                        </div>
                        <div className="space-y-1">
                          <Link href="/grooming-essentials" onClick={() => setActiveMenu(null)} className="block py-1 text-orange-600 font-bold hover:underline">Home Care Arsenal Overview</Link>
                          <Link href="/grooming-essentials/styptic-gels-and-powders" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Styptic Gels & Powders</Link>
                          <Link href="/grooming-essentials/shower-and-bath-supplies" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Shower & Bath Supplies</Link>
                          <Link href="/grooming-essentials/shedding-tools" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Shedding Tools</Link>
                          <Link href="/grooming-essentials/shampoos-and-conditioners" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Shampoos & Conditioners</Link>
                          <Link href="/grooming-essentials/scissors" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Scissors & Ball-Tip Shears</Link>
                          <Link href="/grooming-essentials/hair-removal-mitts-and-rollers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Hair Removal Mitts & Rollers</Link>
                          <Link href="/grooming-essentials/grooming-wipes" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Grooming Wipes</Link>
                          <Link href="/grooming-essentials/electric-clippers-and-blades" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Electric Clippers & Blades</Link>
                          <Link href="/grooming-essentials/deodorizers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Deodorizers</Link>
                          <Link href="/grooming-essentials/dematting-tools" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Dematting Tools</Link>
                          <Link href="/grooming-essentials/medicated-shampoos" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Medicated Shampoos</Link>
                        </div>
                      </div>

                      {/* Column 3: Furniture, Apparel & Travel */}
                      <div className="space-y-3 border-r border-stone-100 pr-4">
                        <div className="font-black text-stone-950 uppercase tracking-wider pb-1 border-b-2 border-stone-900 flex items-center justify-between">
                          <span>Furniture & Gear</span>
                          <span className="text-[10px] bg-stone-100 px-1 py-0.5 text-stone-600">Hardware</span>
                        </div>
                        <div className="space-y-1">
                          <div className="font-bold text-stone-500 text-[10px] uppercase mt-1 mb-0.5">Beds & Crates</div>
                          <Link href="/beds" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Orthopedic Beds</Link>
                          <Link href="/furniture-style-crates" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Furniture-Style Crates</Link>
                          <Link href="/crate-sizing-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600 font-semibold text-orange-600">Crate Sizing Formula</Link>
                          <div className="font-bold text-stone-500 text-[10px] uppercase mt-2 mb-0.5">Apparel & Travel</div>
                          <Link href="/raincoats" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Raincoats & Lifejackets</Link>
                          <Link href="/sweaters" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Sweaters & Hoodies</Link>
                          <Link href="/carriers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Pet Travel Carriers</Link>
                          <Link href="/strollers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Strollers & Trailers</Link>
                          <Link href="/harness-fitting-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Harness Fitting Guide</Link>
                        </div>
                      </div>

                      {/* Column 4: Breed & Coat Guides */}
                      <div className="space-y-3 border-r border-stone-100 pr-4">
                        <div className="font-black text-stone-950 uppercase tracking-wider pb-1 border-b-2 border-stone-900 flex items-center justify-between">
                          <span>Grooming Guides</span>
                          <span className="text-[10px] bg-stone-100 px-1 py-0.5 text-stone-600">Clinical</span>
                        </div>
                        <div className="space-y-1">
                          <Link href="/puppys-first-groom" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Puppy&apos;s First Groom Prep</Link>
                          <Link href="/kittens-first-groom" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Kitten&apos;s Gentle Touch</Link>
                          <Link href="/doodle-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600 font-bold text-orange-600">Doodle Coat Line Brushing</Link>
                          <Link href="/golden-retriever-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Golden Retriever Grooming</Link>
                          <Link href="/siberian-husky-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Husky Undercoat Deshedding</Link>
                          <Link href="/double-coat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600 font-semibold">Double-Coat: Never Shave</Link>
                          <Link href="/matted-coats-prevention-dematting-vs-shave-down" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Matted Coats Triage</Link>
                          <Link href="/nail-trimming-grinder-vs-clipper-black-nail-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Nail Grinder vs Clipper</Link>
                          <Link href="/vaccination-rules-for-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Rabies Ordinance Rules</Link>
                        </div>
                      </div>

                      {/* Column 5: Nutrition & Local Mid-South */}
                      <div className="space-y-3">
                        <div className="font-black text-stone-950 uppercase tracking-wider pb-1 border-b-2 border-orange-500 flex items-center justify-between">
                          <span>Nutrition & Local</span>
                          <span className="text-[10px] bg-orange-100 text-orange-800 px-1 py-0.5">Memphis TN</span>
                        </div>
                        <div className="space-y-1">
                          <Link href="/7-day-food-transition-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600 font-semibold">7-Day Transition Plan</Link>
                          <Link href="/puppy-diet-finder" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Puppy Growth Diet Finder</Link>
                          <Link href="/wet-vs-dry-vs-raw-vs-freeze-dried" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Wet vs Dry vs Raw Diets</Link>
                          <Link href="/flea-tick-prevention-midsouth" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Mid-South Flea & Tick</Link>
                          <div className="font-bold text-stone-500 text-[10px] uppercase mt-2 mb-0.5">Salon Locations</div>
                          <Link href="/grooming/memphis-tn" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-950 font-bold hover:text-orange-600">Memphis Salon Hub</Link>
                          <Link href="/grooming/bartlett-tn" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Bartlett Salon</Link>
                          <Link href="/grooming/collierville-tn" onClick={() => setActiveMenu(null)} className="block py-0.5 text-stone-700 hover:text-orange-600">Collierville Salon</Link>
                          <Link href="/grooming/shelby-county" onClick={() => setActiveMenu(null)} className="block py-0.5 text-orange-600 font-bold hover:underline">Shelby County Concierge</Link>
                        </div>
                      </div>
                    </div>

                    {/* Mega Menu Footer Banner */}
                    <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between bg-stone-50 p-4 border border-stone-200">
                      <div className="text-xs text-stone-700">
                        <span className="font-bold text-stone-950">Fear-Free Handling & Veterinary Standards:</span> Every product and guide strictly tested for low-stress handling and safety compliance.
                      </div>
                      <Link 
                        href="/guides" 
                        onClick={() => setActiveMenu(null)}
                        className="px-4 py-2 bg-stone-950 text-white font-bold text-xs hover:bg-orange-600 transition-colors shrink-0"
                      >
                        Browse All Guides Index ↗
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Feeding & Watering Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'feeding' ? null : 'feeding')}
                  className={`flex items-center gap-1 px-3 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'feeding' ? 'bg-stone-100 text-stone-950 border-stone-300' : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Feeding & Watering</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'feeding' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'feeding' && (
                  <div className="absolute left-0 mt-2 w-[540px] bg-white shadow-2xl border border-stone-300 p-6 z-50 grid grid-cols-2 gap-6 rounded-none animate-in fade-in duration-100">
                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Hydration & Nursing</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/feeding-and-watering" onClick={() => setActiveMenu(null)} className="block py-1 text-orange-600 font-bold hover:underline">All Feeding & Watering</Link>
                        <Link href="/feeding-and-watering/water-bottles" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Water Bottles</Link>
                        <Link href="/feeding-and-watering/nursing-supplies" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Nursing Supplies</Link>
                        <Link href="/feeding-and-watering/fountains" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Fountains</Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Bowls, Mats & Storage</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/feeding-and-watering/lick-mats" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Lick Mats</Link>
                        <Link href="/feeding-and-watering/bowls-and-dishes" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Bowls & Dishes</Link>
                        <Link href="/feeding-and-watering/feeding-mats" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Feeding Mats</Link>
                        <Link href="/feeding-and-watering/food-storage" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Food Storage</Link>
                        <Link href="/feeding-and-watering/automatic-feeders" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Automatic Feeders</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Grooming Essentials Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'essentials' ? null : 'essentials')}
                  className={`flex items-center gap-1 px-3 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'essentials' ? 'bg-stone-100 text-stone-950 border-stone-300' : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Grooming Essentials</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'essentials' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'essentials' && (
                  <div className="absolute left-0 mt-2 w-[620px] bg-white shadow-2xl border border-stone-300 p-6 z-50 grid grid-cols-2 gap-6 rounded-none animate-in fade-in duration-100">
                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Hygiene & Safety</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/grooming-essentials" onClick={() => setActiveMenu(null)} className="block py-1 text-orange-600 font-bold hover:underline">All Grooming Essentials</Link>
                        <Link href="/grooming-essentials/styptic-gels-and-powders" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Styptic Gels & Powders</Link>
                        <Link href="/grooming-essentials/shower-and-bath-supplies" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Shower & Bath Supplies</Link>
                        <Link href="/grooming-essentials/grooming-wipes" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Grooming Wipes</Link>
                        <Link href="/grooming-essentials/deodorizers" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Deodorizers</Link>
                        <Link href="/grooming-essentials/hair-removal-mitts-and-rollers" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Hair Removal Mitts & Rollers</Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Coat & Tooling Hardware</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/grooming-essentials/shedding-tools" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Shedding Tools</Link>
                        <Link href="/grooming-essentials/dematting-tools" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Dematting Tools</Link>
                        <Link href="/grooming-essentials/scissors" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Scissors & Shears</Link>
                        <Link href="/grooming-essentials/electric-clippers-and-blades" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Electric Clippers & Blades</Link>
                        <Link href="/grooming-essentials/shampoos-and-conditioners" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Shampoos & Conditioners</Link>
                        <Link href="/grooming-essentials/medicated-shampoos" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Medicated Shampoos</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Grooming Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'grooming' ? null : 'grooming')}
                  className={`flex items-center gap-1 px-3.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'grooming' ? 'bg-stone-100 text-stone-950 border-stone-300' : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Grooming Guides</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'grooming' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'grooming' && (
                  <div className="absolute left-0 mt-2 w-[720px] bg-white shadow-2xl border border-stone-300 p-6 z-50 grid grid-cols-3 gap-6 rounded-none animate-in fade-in duration-100">
                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">First-Timer Series</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/puppys-first-groom" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Puppy&apos;s First Groom</Link>
                        <Link href="/kittens-first-groom" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Kitten&apos;s First Groom</Link>
                        <Link href="/adult-rescues-first" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Adult Rescue&apos;s First Salon</Link>
                        <Link href="/what-to-bring-to-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">What to Bring to Salon</Link>
                        <Link href="/vaccination-rules-for-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Rabies & Vaccine Rules</Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Popular Dog Breeds</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/doodle-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-orange-600 font-bold">Doodle Grooming (Featured)</Link>
                        <Link href="/golden-retriever-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Golden Retriever</Link>
                        <Link href="/poodle-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Poodle Grooming</Link>
                        <Link href="/siberian-husky-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Siberian Husky Deshedding</Link>
                        <Link href="/french-bulldog-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">French Bulldog Skin Folds</Link>
                        <Link href="/shih-tzu-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Shih Tzu Coat Styling</Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Coat Care & Standards</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/double-coat-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Double-Coat: Never Shave</Link>
                        <Link href="/matted-coats-prevention-dematting-vs-shave-down" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Matted Coats Dematting</Link>
                        <Link href="/deshedding-blowing-coat-seasons" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Seasonal Deshedding</Link>
                        <Link href="/nail-trimming-grinder-vs-clipper-black-nail-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Nail Trimming & Grinding</Link>
                        <Link href="/persian-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Persian Cat Grooming</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nutrition Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'nutrition' ? null : 'nutrition')}
                  className={`flex items-center gap-1 px-3.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'nutrition' ? 'bg-stone-100 text-stone-950 border-stone-300' : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Nutrition & Diets</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'nutrition' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'nutrition' && (
                  <div className="absolute left-0 mt-2 w-[540px] bg-white shadow-2xl border border-stone-300 p-6 z-50 grid grid-cols-2 gap-6 rounded-none animate-in fade-in duration-100">
                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Diet Finders & Plans</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/7-day-food-transition-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">7-Day Food Transition Plan</Link>
                        <Link href="/puppy-diet-finder" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Puppy Growth Diet Finder</Link>
                        <Link href="/senior-pet-diet-finder" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Senior Pet Diet Finder</Link>
                        <Link href="/small-breed-diet-finder" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Small Breed Metabolism Diet</Link>
                        <Link href="/large-breed-diet-finder" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Large Breed Skeletal Care</Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Food Comparisons</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/wet-vs-dry-vs-raw-vs-freeze-dried" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Wet vs Dry vs Raw Food</Link>
                        <Link href="/grain-free-vs-grain-inclusive" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Grain-Free vs Grain-Inclusive</Link>
                        <Link href="/limited-ingredient-allergy-diets" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Limited Ingredient Allergy Food</Link>
                        <Link href="/reading-a-pet-food-label" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">How to Read a Pet Food Label</Link>
                        <Link href="/training-treats-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Training Treats & Rewards</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Buying Guides Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'buying' ? null : 'buying')}
                  className={`flex items-center gap-1 px-3.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'buying' ? 'bg-stone-100 text-stone-950 border-stone-300' : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>Buying Guides</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'buying' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'buying' && (
                  <div className="absolute left-0 mt-2 w-[480px] bg-white shadow-2xl border border-stone-300 p-6 z-50 grid grid-cols-2 gap-6 rounded-none animate-in fade-in duration-100">
                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">How to Choose</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/crate-sizing-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Crate Sizing & Dividers</Link>
                        <Link href="/harness-fitting-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Harness Fitting Guide</Link>
                        <Link href="/bed-buying-by-sleep-style" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Orthopedic Bed Selection</Link>
                        <Link href="/brush-guide-by-coat-type" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Brushes by Coat Type</Link>
                        <Link href="/clippers-vs-grinder" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Clippers vs Nail Grinder</Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Checklists</div>
                      <div className="space-y-1.5 text-xs">
                        <Link href="/new-puppy-starter-kit" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">New Puppy Starter Kit</Link>
                        <Link href="/new-kitten-starter-kit" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">New Kitten Essentials</Link>
                        <Link href="/rescue-dog-essentials" onClick={() => setActiveMenu(null)} className="block py-1 text-stone-700 hover:text-orange-600 font-medium">Rescue Dog Starter Kit</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Local Mid-South Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'local' ? null : 'local')}
                  className={`flex items-center gap-1 px-3.5 py-2 transition-colors cursor-pointer text-stone-900 font-bold rounded-none border border-transparent ${
                    activeMenu === 'local' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'hover:bg-stone-50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>Local Memphis, TN</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'local' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'local' && (
                  <div className="absolute right-0 mt-2 w-[340px] bg-white shadow-2xl border border-stone-300 p-6 z-50 rounded-none animate-in fade-in duration-100">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Mid-South Service Areas</div>
                    <div className="space-y-2 text-xs">
                      <Link href="/grooming/memphis-tn" onClick={() => setActiveMenu(null)} className="block p-2 hover:bg-stone-50 font-bold text-stone-900 flex items-center justify-between rounded-none border border-stone-100">
                        <span>Memphis, TN</span>
                        <span className="text-[10px] text-stone-400 font-normal">Poplar & East Memphis</span>
                      </Link>
                      <Link href="/grooming/bartlett-tn" onClick={() => setActiveMenu(null)} className="block p-2 hover:bg-stone-50 font-bold text-stone-900 flex items-center justify-between rounded-none border border-stone-100">
                        <span>Bartlett, TN</span>
                        <span className="text-[10px] text-stone-400 font-normal">Hwy 64 & Day Rd</span>
                      </Link>
                      <Link href="/grooming/collierville-tn" onClick={() => setActiveMenu(null)} className="block p-2 hover:bg-stone-50 font-bold text-stone-900 flex items-center justify-between rounded-none border border-stone-100">
                        <span>Collierville, TN</span>
                        <span className="text-[10px] text-stone-400 font-normal">Town Square Area</span>
                      </Link>
                      <Link href="/grooming/arlington-tn" onClick={() => setActiveMenu(null)} className="block p-2 hover:bg-stone-50 font-bold text-stone-900 flex items-center justify-between rounded-none border border-stone-100">
                        <span>Arlington, TN</span>
                        <span className="text-[10px] text-stone-400 font-normal">Lakeland & Arlington</span>
                      </Link>
                      <Link href="/grooming/shelby-county" onClick={() => setActiveMenu(null)} className="block p-2 hover:bg-stone-50 font-bold text-orange-600 flex items-center justify-between rounded-none border border-orange-100">
                        <span>All Shelby County</span>
                        <span className="text-[10px] text-orange-600 font-semibold">Mobile & Salon</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* All Guides Hub Link */}
              <Link href="/guides" className="px-3.5 py-2 hover:bg-stone-50 text-stone-700 transition-colors rounded-none">
                All Guides Directory
              </Link>

            </nav>
          </div>

          {/* Search Box + Actions (Square) */}
          <div className="flex items-center gap-3">
            
            {/* Search Input (Square) */}
            <div className="relative">
              <div className="flex items-center bg-stone-100 border border-stone-300 transition-colors rounded-none">
                <Search className="w-4 h-4 text-stone-500 ml-3.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles & guides..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-36 md:w-56 pl-2.5 pr-4 py-2 text-xs bg-transparent focus:outline-none text-stone-900 placeholder-stone-500 rounded-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="mr-2 text-stone-400 hover:text-stone-700 rounded-none">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown (Square) */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white shadow-2xl border border-stone-300 p-2 z-50 text-xs max-h-96 overflow-y-auto rounded-none">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Guides & Supplies ({searchResults.length})
                  </div>
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectResult(item.url)}
                      className="w-full text-left p-2.5 hover:bg-stone-50 flex items-center justify-between text-stone-900 group cursor-pointer rounded-none border-b border-stone-50 last:border-b-0"
                    >
                      <span className="font-semibold group-hover:text-orange-600 truncate mr-2">{item.name}</span>
                      <span className="text-[10px] text-stone-400 shrink-0 font-medium">{item.group}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Log in link (Square) */}
            <button
              onClick={onBookClick}
              className="hidden md:inline-flex text-xs font-bold text-stone-700 hover:text-stone-950 px-3 py-2 cursor-pointer rounded-none"
            >
              Sign in
            </button>

            {/* Orange Action Button (100% Square) */}
            <button
              onClick={onBookClick}
              className="px-6 py-3 bg-[#FF6200] hover:bg-[#E65800] active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer shrink-0 rounded-none"
            >
              Book Appointment*
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
