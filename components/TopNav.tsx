'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ChevronDown, 
  MapPin, 
  X,
  Phone,
  Scissors,
  Utensils,
  Package,
  HeartPulse,
  BookOpen,
  Bath,
  ShieldCheck,
  Menu,
  User,
  ShoppingBag,
  PawPrint,
  CalendarDays,
  Mail
} from 'lucide-react';
import { ALL_GUIDE_ITEMS, PRODUCT_CATEGORIES } from '@/lib/taxonomy-data';
import { CategoryNode } from '@/lib/types';

const UPSTREAM_NAV = [
  { n: "01", label: "HOME", to: "/" },
  { n: "02", label: "ABOUT US", to: "/about" },
  { n: "03", label: "SERVICES", to: "/services" },
  { n: "04", label: "OUR PROCESS", to: "/process" },
  { n: "05", label: "PRICING", to: "/pricing" },
  { n: "06", label: "SHOP", to: "/shop" },
  { n: "07", label: "GALLERY", to: "/gallery" },
  { n: "08", label: "BOOK", to: "/book" },
  { n: "09", label: "CONTACT", to: "/contact" },
  { n: "10", label: "FAQ / POLICIES", to: "/faq" },
  { n: "11", label: "LEARN", to: "/guides" },
] as const;

const ANIMAL_CATEGORIES = PRODUCT_CATEGORIES.filter((category) =>
  ['fish-and-aquatics', 'bird', 'reptile', 'small-animal'].includes(category.slug),
);

function getAnimalMenuSection(category: CategoryNode) {
  const nestedGroup = category.children?.length === 1 && category.children[0].children?.length
    ? category.children[0]
    : category;
  const parentPath = nestedGroup === category
    ? [category.slug]
    : [category.slug, nestedGroup.slug];

  return {
    title: nestedGroup.name,
    links: nestedGroup.children?.length
      ? nestedGroup.children.map((item) => ({
          title: item.name,
          path: `/${[...parentPath, item.slug].join('/')}`,
        }))
      : [{ title: nestedGroup.name, path: `/${parentPath.join('/')}` }],
  };
}

interface TopNavProps {
  onBookClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onBookClick }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeAnimalCategory, setActiveAnimalCategory] = useState(ANIMAL_CATEGORIES[0]?.slug || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const selectedAnimalCategory = ANIMAL_CATEGORIES.find((category) => category.slug === activeAnimalCategory) || ANIMAL_CATEGORIES[0];
  const animalMenuSection = selectedAnimalCategory ? getAnimalMenuSection(selectedAnimalCategory) : null;

  // Search filter across all guides and categories computed via useMemo
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_GUIDE_ITEMS
      .filter(item => item.name.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchQuery]);

  // Click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (url: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveMenu(null);
    router.push(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 rounded-none font-sans w-full" ref={navRef}>
      {/* =========================================================================
          TIER 1 (GLOBAL SITE CHROME): Faithful to upstream repo (site-chrome.tsx)
          Includes hamburger menu, global brand, site routing, search, login & bag
         ========================================================================= */}
      <div className="bg-cream text-ink text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-gold/25 w-full">
        <div className="w-full flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Left: Hamburger Drawer Trigger + Upstream Brand Title + Global Desktop Nav */}
          <div className="flex items-center gap-3 lg:gap-6 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open global site menu"
              className="flex h-9 w-9 items-center justify-center rounded text-ink hover:bg-black/5 transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5 text-ink" />
            </button>

            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <PawPrint className="w-4 h-4 text-gold-deep" />
              <span className="font-extrabold tracking-[0.16em] uppercase text-ink text-xs sm:text-sm group-hover:text-gold-deep transition-colors">
                ALL ABOUT PAWZ
              </span>
            </Link>

            {/* Global desktop routes from repo */}
            <nav className="hidden xl:flex items-center gap-4 text-[11px] font-bold tracking-wider text-ink-soft uppercase pl-4 border-l border-gold/30">
              <Link href="/services" className="hover:text-black transition-colors">Services</Link>
              <Link href="/process" className="hover:text-black transition-colors">Process</Link>
              <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
              <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
              <Link href="/gallery" className="hover:text-black transition-colors">Gallery</Link>
              <Link href="/book" className="hover:text-black transition-colors">Book</Link>
              <Link href="/guides" className="text-gold-deep hover:text-black transition-colors">Guides</Link>
            </nav>
          </div>

          {/* Center: Global Header Search Bar */}
          <div className="flex-1 max-w-lg mx-2 hidden md:block">
            <div className="relative">
              <div className="flex items-center bg-white border border-gold/40 px-3 py-1.5 shadow-xs">
                <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search shop, breeds, and care guides..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full text-xs bg-transparent focus:outline-none text-black placeholder-neutral-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-black">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Salon Phone + Customer Login / Account + Bag */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <a
              href="tel:9017221114"
              className="hidden lg:flex items-center gap-1.5 text-ink-soft hover:text-gold-deep font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-deep" />
              <span>(901) 722-1114</span>
            </a>

            <Link
              href="/account"
              className="flex items-center gap-1.5 text-ink-soft hover:text-black text-xs font-bold transition-colors"
            >
              <User className="w-4 h-4 text-ink shrink-0" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>

            <Link
              href="/shop"
              className="relative flex items-center gap-1.5 text-ink-soft hover:text-black text-xs font-bold transition-colors"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-ink shrink-0" />
                <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-deep px-1 text-[9px] font-bold text-white">
                  0
                </span>
              </div>
              <span className="hidden sm:inline ml-1">Bag</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar (Full width, Logo in Far Left Corner, Zero Hang-off) */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 lg:gap-6 w-full">
          
          {/* Logo Pinned in Far Left Corner */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="text-left group cursor-pointer shrink-0">
              <span className="text-2xl font-black tracking-tight text-black block leading-none">
                All About Pawz
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 block mt-1">
                Pet Grooming & Supply · Educational Guides
              </span>
            </Link>
          </div>

          {/* Primary Category Navigation Tabs (Flush next to Logo) */}
          <nav className="hidden xl:flex items-center gap-0.5 lg:gap-1 text-xs font-semibold text-neutral-800 ml-4 lg:ml-6 flex-1 min-w-0">
              
              {/* TAB 1: Grooming Guides (58 Guides) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'grooming-guides' ? null : 'grooming-guides')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'grooming-guides' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 text-blue-600" />
                  <span>Grooming Guides</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'grooming-guides' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'grooming-guides' && (
                  <div className="absolute left-0 mt-2 w-[1040px] bg-white shadow-2xl border-2 border-black p-7 z-50 rounded-none animate-in fade-in duration-100 max-h-[82vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200">
                      <div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Clinical Care Library</div>
                        <h4 className="text-base font-black text-black">Grooming Guides: 58 Breed, Coat & Technique Guides</h4>
                      </div>
                      <Link href="/guides#grooming" onClick={() => setActiveMenu(null)} className="text-xs font-bold text-blue-600 hover:underline">
                        Explore Full Grooming Index ↗
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-6 text-xs">
                      {/* Col 1: First Timer & Coat Types */}
                      <div className="space-y-3 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>First-Timer Series</span>
                          <span className="text-[10px] text-neutral-500 font-normal">5 Guides</span>
                        </div>
                        <div className="space-y-1">
                          <Link href="/puppys-first-groom" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Puppy&apos;s First Groom Prep</Link>
                          <Link href="/kittens-first-groom" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Kitten&apos;s First Touch</Link>
                          <Link href="/adult-rescues-first" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Adult Rescue&apos;s First Salon</Link>
                          <Link href="/what-to-bring-to-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">What to Bring to Salon</Link>
                          <Link href="/vaccination-rules-for-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-semibold text-blue-600">Rabies & Vaccine Rules</Link>
                        </div>

                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black pt-3 flex items-center justify-between">
                          <span>Coat-Type Guides</span>
                          <span className="text-[10px] text-neutral-500 font-normal">5 Guides</span>
                        </div>
                        <div className="space-y-1">
                          <Link href="/double-coat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-bold">Double-Coat: Never Shave</Link>
                          <Link href="/curly-hypoallergenic-coat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Curly & Hypoallergenic</Link>
                          <Link href="/long-silky-coat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Long & Silky Detangling</Link>
                          <Link href="/short-smooth-coat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Short & Smooth Shine</Link>
                          <Link href="/hairless-cat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Hairless Cat Hygiene</Link>
                        </div>
                      </div>

                      {/* Col 2: Dog Breeds Part 1 */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>Dog Breeds A–G</span>
                          <span className="text-[10px] text-neutral-500 font-normal">15 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/doodle-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-blue-600 font-bold hover:underline">Doodle Grooming (Featured)</Link>
                          <Link href="/golden-retriever-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Golden Retriever</Link>
                          <Link href="/labrador-retriever-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Labrador Retriever</Link>
                          <Link href="/poodle-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Poodle (Toy, Mini, Standard)</Link>
                          <Link href="/french-bulldog-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">French Bulldog</Link>
                          <Link href="/german-shepherd-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">German Shepherd</Link>
                          <Link href="/yorkshire-terrier-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Yorkshire Terrier</Link>
                          <Link href="/beagle-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Beagle</Link>
                          <Link href="/boxer-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Boxer</Link>
                          <Link href="/cavalier-king-charles-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Cavalier King Charles</Link>
                          <Link href="/corgi-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Pembroke Welsh Corgi</Link>
                          <Link href="/australian-shepherd-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Australian Shepherd</Link>
                          <Link href="/cocker-spaniel-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Cocker Spaniel</Link>
                          <Link href="/dachshund-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Dachshund (Smooth/Wire)</Link>
                          <Link href="/bernese-mountain-dog-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Bernese Mountain Dog</Link>
                        </div>
                      </div>

                      {/* Col 3: Dog Breeds Part 2 */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black flex items-center justify-between">
                          <span>Dog Breeds H–Z</span>
                          <span className="text-[10px] text-neutral-500 font-normal">15 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/shih-tzu-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Shih Tzu</Link>
                          <Link href="/siberian-husky-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Siberian Husky</Link>
                          <Link href="/maltese-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Maltese</Link>
                          <Link href="/maltipoo-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Maltipoo</Link>
                          <Link href="/miniature-schnauzer-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Miniature Schnauzer</Link>
                          <Link href="/pomeranian-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Pomeranian</Link>
                          <Link href="/pug-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Pug Wrinkle Care</Link>
                          <Link href="/rottweiler-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Rottweiler</Link>
                          <Link href="/great-dane-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Great Dane</Link>
                          <Link href="/bichon-frise-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Bichon Frise</Link>
                          <Link href="/havanese-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Havanese</Link>
                          <Link href="/boston-terrier-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Boston Terrier</Link>
                          <Link href="/chihuahua-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Chihuahua</Link>
                          <Link href="/shiba-inu-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Shiba Inu</Link>
                          <Link href="/samoyed-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Samoyed Cloud Care</Link>
                        </div>
                      </div>

                      {/* Col 4: Cats & Topic Guides */}
                      <div className="space-y-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>Cat Breeds</span>
                          <span className="text-[10px] text-neutral-500 font-normal">10 Guides</span>
                        </div>
                        <div className="space-y-0.5">
                          <Link href="/persian-cat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Persian Flat-Face Grooming</Link>
                          <Link href="/maine-coon-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Maine Coon Tuft Care</Link>
                          <Link href="/ragdoll-cat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Ragdoll Plush Fur</Link>
                          <Link href="/sphynx-cat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-semibold text-blue-600">Sphynx Skin Hygiene</Link>
                          <Link href="/bengal-cat-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Bengal Rosette Shine</Link>
                          <Link href="/british-shorthair-grooming" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">British Shorthair</Link>
                        </div>

                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black pt-2 flex items-center justify-between">
                          <span>Clinical Techniques</span>
                          <span className="text-[10px] text-neutral-500 font-normal">8 Guides</span>
                        </div>
                        <div className="space-y-0.5">
                          <Link href="/how-to-demat-dog-without-pain" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-semibold">Pain-Free De-Matting</Link>
                          <Link href="/how-to-trim-black-dog-nails" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-semibold">Trimming Black Nails</Link>
                          <Link href="/how-to-clean-dog-ears" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Ear Yeast Cleansing</Link>
                          <Link href="/fear-free-grooming-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Fear-Free Salon Protocols</Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 p-3">
                      <span>Low-stress handling certified. All techniques reviewed for canine and feline comfort.</span>
                      <Link href="/guides#grooming" onClick={() => setActiveMenu(null)} className="font-bold text-black hover:text-blue-600">Browse Full 58 Grooming Guides ↗</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 2: Grooming Essentials (11 Home Care Tools - Clean Bath Icon, Zero Sparkles) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'grooming-essentials' ? null : 'grooming-essentials')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'grooming-essentials' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <Bath className="w-3.5 h-3.5 text-blue-600" />
                  <span>Grooming Essentials</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'grooming-essentials' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'grooming-essentials' && (
                  <div className="absolute left-0 mt-2 w-[880px] bg-white shadow-2xl border-2 border-black p-7 z-50 rounded-none animate-in fade-in duration-100">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200">
                      <div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Home Care Arsenal</div>
                        <h4 className="text-base font-black text-black">Grooming Essentials: 11 Tools & Formulations Needed for Home Care</h4>
                      </div>
                      <Link href="/grooming-essentials" onClick={() => setActiveMenu(null)} className="text-xs font-bold text-blue-600 hover:underline">
                        Explore Department Hub ↗
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-xs">
                      {/* Col 1 */}
                      <div className="space-y-2 border-r border-neutral-100 pr-4">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold">
                          Bath & Skin Formulations (4)
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <Link href="/grooming-essentials/shampoos-and-conditioners" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Shampoos & Conditioners</Link>
                          <Link href="/grooming-essentials/medicated-shampoos" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Medicated Shampoos (Chlorhexidine/Ketoconazole)</Link>
                          <Link href="/grooming-essentials/shower-and-bath-supplies" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Shower & Bath Supplies (Sprayers & Mats)</Link>
                          <Link href="/grooming-essentials/deodorizers" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Deodorizers & Coat Refreshers</Link>
                        </div>
                      </div>

                      {/* Col 2 */}
                      <div className="space-y-2 border-r border-neutral-100 pr-4">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black">
                          Blades, Brushes & Hair Control (4)
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <Link href="/grooming-essentials/shedding-tools" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Shedding Tools (Rakes & Undercoat Blades)</Link>
                          <Link href="/grooming-essentials/dematting-tools" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Dematting Tools & Safety Splitters</Link>
                          <Link href="/grooming-essentials/electric-clippers-and-blades" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Electric Clippers & Blades</Link>
                          <Link href="/grooming-essentials/hair-removal-mitts-and-rollers" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Hair Removal Mitts & Rollers</Link>
                        </div>
                      </div>

                      {/* Col 3 */}
                      <div className="space-y-2">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold">
                          Safety, Shears & Hygiene (3)
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <Link href="/grooming-essentials/styptic-gels-and-powders" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Styptic Gels & Powders (Quick Stop)</Link>
                          <Link href="/grooming-essentials/scissors" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Scissors & Ball-Tip Safety Shears</Link>
                          <Link href="/grooming-essentials/grooming-wipes" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Grooming Wipes (Eyes, Ears, Paws)</Link>
                          <div className="pt-2">
                            <Link href="/grooming-essentials" onClick={() => setActiveMenu(null)} className="block p-2 bg-neutral-50 border border-gold/40 text-neutral-900 font-semibold hover:bg-neutral-100">
                              Home Grooming Checklist & Protocol ↗
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 p-3">
                      <span>Veterinary-approved equipment standards for safe, low-stress home care.</span>
                      <Link href="/grooming-essentials" onClick={() => setActiveMenu(null)} className="font-bold text-black hover:text-blue-600">All 11 Grooming Essentials ↗</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 3: Feeding & Nutrition (35 Hardware & Diet Guides) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'feeding-nutrition' ? null : 'feeding-nutrition')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'feeding-nutrition' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5 text-blue-600" />
                  <span>Feeding & Nutrition</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'feeding-nutrition' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'feeding-nutrition' && (
                  <div className="absolute left-0 mt-2 w-[1040px] bg-white shadow-2xl border-2 border-black p-7 z-50 rounded-none animate-in fade-in duration-100 max-h-[82vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200">
                      <div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Hydration Hardware & Clinical Diets</div>
                        <h4 className="text-base font-black text-black">Feeding & Nutrition: 35 Hardware & Diet Guides</h4>
                      </div>
                      <Link href="/feeding-and-watering" onClick={() => setActiveMenu(null)} className="text-xs font-bold text-blue-600 hover:underline">
                        View Feeding & Nutrition Hub ↗
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-6 text-xs">
                      {/* Col 1: Hardware (8) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>Feeding Hardware</span>
                          <span className="text-[10px] text-neutral-500 font-normal">8 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/feeding-and-watering/bowls-and-dishes" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Bowls & Dishes (Stainless/Ceramic)</Link>
                          <Link href="/feeding-and-watering/fountains" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Filtered Water Fountains</Link>
                          <Link href="/feeding-and-watering/lick-mats" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Calming Lick Mats</Link>
                          <Link href="/feeding-and-watering/automatic-feeders" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Automatic Timed Feeders</Link>
                          <Link href="/feeding-and-watering/water-bottles" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Travel Water Bottles</Link>
                          <Link href="/feeding-and-watering/food-storage" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Airtight Food Storage</Link>
                          <Link href="/feeding-and-watering/feeding-mats" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Silicone Spill Mats</Link>
                          <Link href="/feeding-and-watering/nursing-supplies" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Kitten & Puppy Nursing Bottles</Link>
                        </div>
                      </div>

                      {/* Col 2: Life Stage & Breed Size (8) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black flex items-center justify-between">
                          <span>Diet Finders</span>
                          <span className="text-[10px] text-neutral-500 font-normal">8 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="text-[10px] font-bold text-neutral-500 uppercase">By Life Stage</div>
                          <Link href="/puppy-diet-finder" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Puppy Growth Diet Finder</Link>
                          <Link href="/adult-dog-diet-finder" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Adult Dog Maintenance Diet</Link>
                          <Link href="/senior-dog-diet-finder" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Senior Kidney & Joint Diet</Link>
                          <Link href="/all-life-stages-dog-food" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">All Life Stages Evaluation</Link>
                          
                          <div className="text-[10px] font-bold text-neutral-500 uppercase pt-2">By Breed Size</div>
                          <Link href="/small-breed-dog-food" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Small & Toy Breed Kibble</Link>
                          <Link href="/medium-breed-dog-food" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Medium Breed Metabolic Diet</Link>
                          <Link href="/large-breed-puppy-food" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Large Breed Growth Formula</Link>
                          <Link href="/giant-breed-dog-food" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Giant Breed Joint Nutrition</Link>
                        </div>
                      </div>

                      {/* Col 3: Comparisons & Transitions (6) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>Diet Comparisons</span>
                          <span className="text-[10px] text-neutral-500 font-normal">6 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/raw-vs-kibble" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Raw Food vs Dry Kibble</Link>
                          <Link href="/wet-vs-dry-dog-food" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Wet Canned vs Dry Kibble</Link>
                          <Link href="/grain-free-truth" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Grain-Free & DCM Truths</Link>
                          <Link href="/senior-dog-weight-loss" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Senior Dog Weight Management</Link>
                          <Link href="/7-day-food-transition-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium font-bold text-blue-600">7-Day Food Transition Protocol</Link>
                          <Link href="/food-allergies-elimination-diet" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Novel Protein Elimination Diet</Link>
                        </div>
                      </div>

                      {/* Col 4: Breed Diets & Treats (13) */}
                      <div className="space-y-2">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black flex items-center justify-between">
                          <span>Breed Diets & Treats</span>
                          <span className="text-[10px] text-neutral-500 font-normal">13 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/goldendoodle-diet-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Goldendoodle Sensitive Gut</Link>
                          <Link href="/french-bulldog-diet-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">French Bulldog Digestion</Link>
                          <Link href="/german-shepherd-diet-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">German Shepherd EPI Care</Link>
                          <Link href="/labrador-retriever-diet-guide" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Labrador Calorie Control</Link>
                          <div className="text-[10px] font-bold text-neutral-500 uppercase pt-2">Treats & Chew Supplies</div>
                          <Link href="/treats/snacks" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Healthy Low-Calorie Snacks</Link>
                          <Link href="/treats/biscuits" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Oven-Baked Dental Biscuits</Link>
                          <Link href="/treats/cookies" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600">Wholesome Pet Cookies</Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 p-3">
                      <span>Calorie calculators and guaranteed analysis review based on AAFCO standards.</span>
                      <Link href="/guides#nutrition" onClick={() => setActiveMenu(null)} className="font-bold text-black hover:text-blue-600">Full Nutrition Library ↗</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 4: Supplies & Gear (35 Guides: Beds, Apparel, Collars, Travel) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'supplies-gear' ? null : 'supplies-gear')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'supplies-gear' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Supplies & Gear</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'supplies-gear' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'supplies-gear' && (
                  <div className="absolute left-0 mt-2 w-[1040px] bg-white shadow-2xl border-2 border-black p-7 z-50 rounded-none animate-in fade-in duration-100 max-h-[82vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200">
                      <div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Hardware & Lifestyle Supplies</div>
                        <h4 className="text-base font-black text-black">Supplies & Gear: 35 Furniture, Apparel & Travel Guides</h4>
                      </div>
                      <Link href="/beds-and-furniture" onClick={() => setActiveMenu(null)} className="text-xs font-bold text-blue-600 hover:underline">
                        Explore Supplies Catalog ↗
                      </Link>
                    </div>

                    <div className="grid grid-cols-4 gap-6 text-xs">
                      {/* Col 1: Beds & Furniture (9) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>Beds & Furniture</span>
                          <span className="text-[10px] text-neutral-500 font-normal">9 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/beds" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Orthopedic Memory Beds</Link>
                          <Link href="/furniture-style-crates" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Furniture-Style Crates</Link>
                          <Link href="/stairs-and-steps" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Stairs & Non-Slip Steps</Link>
                          <Link href="/sofas-and-chairs" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Sofas & Lounge Chairs</Link>
                          <Link href="/bed-pillows" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Bed Pillows & Bolsters</Link>
                          <Link href="/bed-mats" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Crate Mats & Cooling Pads</Link>
                          <Link href="/bed-liners" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Waterproof Bed Liners</Link>
                          <Link href="/bed-covers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Washable Replacement Covers</Link>
                          <Link href="/bed-blankets" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Calming Bed Blankets</Link>
                        </div>
                      </div>

                      {/* Col 2: Apparel & Accessories (10) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black flex items-center justify-between">
                          <span>Apparel & Wearables</span>
                          <span className="text-[10px] text-neutral-500 font-normal">10 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/apparel-and-accessories/raincoats" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Waterproof Raincoats</Link>
                          <Link href="/apparel-and-accessories/sweaters" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Warm Fleece Sweaters</Link>
                          <Link href="/apparel-and-accessories/hoodies" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Comfort Cotton Hoodies</Link>
                          <Link href="/apparel-and-accessories/lifejackets" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Buoyant Swim Lifejackets</Link>
                          <Link href="/apparel-and-accessories/shirts" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">UV & Sun Shirts</Link>
                          <Link href="/apparel-and-accessories/hats" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Sun Protection Hats</Link>
                          <Link href="/apparel-and-accessories/dresses" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Pet Outfits & Dresses</Link>
                          <Link href="/apparel-and-accessories/hair-accessories" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Bows & Topknot Bands</Link>
                          <Link href="/apparel-and-accessories/sunglasses" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Doggles & Eye Protection</Link>
                          <Link href="/apparel-and-accessories/necklaces-and-pendants" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Necklaces & Charms</Link>
                        </div>
                      </div>

                      {/* Col 3: Collars, Harnesses & Leashes (7) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-3">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold flex items-center justify-between">
                          <span>Collars & Leashes</span>
                          <span className="text-[10px] text-neutral-500 font-normal">7 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/collars-harnesses-and-leashes/harnesses" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">No-Pull & Tactical Harnesses</Link>
                          <Link href="/collars-harnesses-and-leashes/leashes" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Standard & Rope Leashes</Link>
                          <Link href="/collars-harnesses-and-leashes/collars" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Martingale & Flat Collars</Link>
                          <Link href="/collars-harnesses-and-leashes/activity-trackers" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Smart Health Trackers</Link>
                          <Link href="/collars-harnesses-and-leashes/location-trackers" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">GPS Pet Location Trackers</Link>
                          <Link href="/collars-harnesses-and-leashes/muzzles" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Basket & Safety Muzzles</Link>
                          <Link href="/collars-harnesses-and-leashes/id-tags-and-collar-accessories" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">ID Tags & Bell Charms</Link>
                        </div>
                      </div>

                      {/* Col 4: Travel, Outdoor & Toys (9) */}
                      <div className="space-y-2">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black flex items-center justify-between">
                          <span>Travel, Outdoor & Toys</span>
                          <span className="text-[10px] text-neutral-500 font-normal">9 Guides</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/travel-and-outdoor/strollers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">All-Terrain Pet Strollers</Link>
                          <Link href="/travel-and-outdoor/carriers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Airline-Approved Carriers</Link>
                          <Link href="/travel-and-outdoor/car-travel-accessories" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Car Seat Covers & Seatbelts</Link>
                          <Link href="/travel-and-outdoor/backpack-carriers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Hiking Backpack Carriers</Link>
                          <Link href="/travel-and-outdoor/bicycle-trailers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Bicycle Tow Trailers</Link>
                          <Link href="/travel-and-outdoor/bicycle-carriers" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Front Handlebar Baskets</Link>
                          <Link href="/travel-and-outdoor/slings" onClick={() => setActiveMenu(null)} className="block py-0.5 text-neutral-700 hover:text-blue-600 font-medium">Hands-Free Puppy Slings</Link>
                          <Link href="/chew-toys" onClick={() => setActiveMenu(null)} className="block py-1 text-blue-600 font-bold hover:underline">Chew Toys & Enrichment</Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 p-3">
                      <span>Tested for orthopedic joint support, crash safety, and durability.</span>
                      <Link href="/beds-and-furniture" onClick={() => setActiveMenu(null)} className="font-bold text-black hover:text-blue-600">All Supplies & Hardware ↗</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 5: Health & Wellness (15 Guides: Wellness Supplies, Vaccines, Climate) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'health-wellness' ? null : 'health-wellness')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'health-wellness' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <HeartPulse className="w-3.5 h-3.5 text-blue-600" />
                  <span>Health & Wellness</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'health-wellness' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'health-wellness' && (
                  <div className="absolute left-0 mt-2 w-[860px] bg-white shadow-2xl border-2 border-black p-7 z-50 rounded-none animate-in fade-in duration-100">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200">
                      <div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Clinical Care & Prevention</div>
                        <h4 className="text-base font-black text-black">Health & Wellness: 15 Clinical & Supplement Guides</h4>
                      </div>
                      <Link href="/wellness" onClick={() => setActiveMenu(null)} className="text-xs font-bold text-blue-600 hover:underline">
                        View Wellness Hub ↗
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-xs">
                      {/* Col 1: Wellness Supplies (7) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-4">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold">
                          Wellness Supplies (7)
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/wellness/supplements-and-vitamins" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Supplements & Multivitamins</Link>
                          <Link href="/wellness/hip-and-joint-care" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Glucosamine & Hip/Joint Chews</Link>
                          <Link href="/wellness/itch-remedies" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Allergy & Itch Sprays</Link>
                          <Link href="/wellness/flea-and-tick" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Veterinary Flea & Tick Defense</Link>
                          <Link href="/wellness/dental-care" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Enzymatic Dental Chews & Rinses</Link>
                          <Link href="/wellness/calming-aids" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">L-Theanine & Calming Chews</Link>
                          <Link href="/wellness/first-aid" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Pet First Aid Kits & Antiseptic</Link>
                        </div>
                      </div>

                      {/* Col 2: Vaccination Schedules & Laws (4) */}
                      <div className="space-y-2 border-r border-neutral-100 pr-4">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black">
                          Vaccines & Rabies Laws (4)
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <Link href="/puppy-vaccination-schedule" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Puppy Vaccine Schedule (Weeks 6–16)</Link>
                          <Link href="/kitten-vaccination-schedule" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Kitten Core Vaccine Series</Link>
                          <Link href="/adult-dog-vaccine-boosters" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Adult Dog Annual Boosters & Titers</Link>
                          <Link href="/vaccination-rules-for-grooming" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-bold text-blue-600">Core Rabies & Vaccine Mandate ↗</Link>
                        </div>
                      </div>

                      {/* Col 3: Seasonal Climate Protocols (4) */}
                      <div className="space-y-2">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold">
                          Climate & Seasonal Care (4)
                        </div>
                        <div className="space-y-1.5 pt-1 text-neutral-600">
                          <Link href="/flea-tick-prevention-midsouth" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Seasonal Flea & Tick Protocol</Link>
                          <Link href="/heartworm-prevention-tennessee" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Mosquito & Heartworm Protection</Link>
                          <Link href="/hot-spot-treatment-dogs" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Summer Humidity Hot Spot Treatment</Link>
                          <Link href="/ear-infection-prevention-dogs" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Post-Swim Ear Yeast Prevention</Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 p-3">
                      <span>Reviewed by Dr. Michael Vance, DVM · Clinical Veterinary Consultant.</span>
                      <Link href="/wellness" onClick={() => setActiveMenu(null)} className="font-bold text-black hover:text-blue-600">Full Health Library ↗</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* TAB 6: Buying Guides (12 Equipment Evaluations) */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === 'buying-guides' ? null : 'buying-guides')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer rounded-none border border-transparent ${
                    activeMenu === 'buying-guides' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Buying Guides</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'buying-guides' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'buying-guides' && (
                  <div className="absolute left-0 mt-2 w-[840px] bg-white shadow-2xl border-2 border-black p-7 z-50 rounded-none animate-in fade-in duration-100">
                    <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200">
                      <div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Hardware Selection Standards</div>
                        <h4 className="text-base font-black text-black">Buying Guides: 12 Expert Equipment Evaluations & Checklists</h4>
                      </div>
                      <Link href="/guides#buying-guides" onClick={() => setActiveMenu(null)} className="text-xs font-bold text-blue-600 hover:underline">
                        View Buying Guides Index ↗
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-xs">
                      {/* Col 1 */}
                      <div className="space-y-2 border-r border-neutral-100 pr-4">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold">
                          Sizing & Wearables (5)
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/crate-sizing-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Dog Crate Sizing Formula</Link>
                          <Link href="/harness-fitting-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Harness Fitting: No-Pull vs Step-In</Link>
                          <Link href="/collar-buying-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Collar Sizing & Width Guide</Link>
                          <Link href="/bed-buying-by-sleep-style" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Orthopedic Bed Sleep Styles</Link>
                          <Link href="/brush-guide-by-coat-type" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Brush Guide by Coat Texture</Link>
                        </div>
                      </div>

                      {/* Col 2 */}
                      <div className="space-y-2 border-r border-neutral-100 pr-4">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-black">
                          Tools & Feeders (4)
                        </div>
                        <div className="space-y-1 pt-1">
                          <Link href="/clippers-vs-grinder" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Clippers vs Rotary Grinder</Link>
                          <Link href="/shampoo-guide-by-skin-type" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Shampoo by Skin Sensitivity</Link>
                          <Link href="/slow-feeder-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Slow Feeder Maze Bowls</Link>
                          <Link href="/water-fountain-guide" onClick={() => setActiveMenu(null)} className="block py-1 text-neutral-700 hover:text-blue-600 font-medium">Stainless vs Ceramic Fountains</Link>
                        </div>
                      </div>

                      {/* Col 3 */}
                      <div className="space-y-2">
                        <div className="font-bold text-black uppercase tracking-wider pb-1 border-b-2 border-gold">
                          Starter Checklists (3)
                        </div>
                        <div className="space-y-2 pt-1 text-neutral-600">
                          <Link href="/new-puppy-starter-kit" onClick={() => setActiveMenu(null)} className="block p-2 bg-neutral-50 border border-neutral-200 hover:border-gold font-semibold text-black">
                            New Puppy Starter Kit (First 30 Days) ↗
                          </Link>
                          <Link href="/new-kitten-starter-kit" onClick={() => setActiveMenu(null)} className="block p-2 bg-neutral-50 border border-neutral-200 hover:border-gold font-semibold text-black">
                            New Kitten Essentials Checklist ↗
                          </Link>
                          <Link href="/rescue-dog-essentials" onClick={() => setActiveMenu(null)} className="block p-2 bg-neutral-50 border border-neutral-200 hover:border-gold font-semibold text-black">
                            Rescue Dog Decompression Kit ↗
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 p-3">
                      <span>Tested by certified master groomers and veterinary technicians.</span>
                      <Link href="/guides#buying-guides" onClick={() => setActiveMenu(null)} className="font-bold text-black hover:text-blue-600">All Buying Guides ↗</Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setActiveMenu('animal-categories')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'animal-categories'}
                  onClick={() => setActiveMenu(activeMenu === 'animal-categories' ? null : 'animal-categories')}
                  className={`flex items-center gap-1 px-2.5 py-2 transition-colors cursor-pointer border border-transparent ${
                    activeMenu === 'animal-categories' ? 'bg-neutral-100 text-black border-neutral-300 font-bold' : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <PawPrint className="w-3.5 h-3.5 text-blue-600" />
                  <span>Other Pets</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'animal-categories' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'animal-categories' && selectedAnimalCategory && animalMenuSection && (
                  <div className="absolute left-0 top-full pt-2 z-50 w-[min(820px,calc(100vw-2rem))]">
                    <div className="grid grid-cols-[180px_1fr] bg-white border border-stone-300 shadow-2xl">
                      <div className="border-r border-stone-200 bg-stone-50 p-3" role="tablist" aria-label="Pet categories">
                        {ANIMAL_CATEGORIES.map((category) => (
                          <button
                            key={category.slug}
                            type="button"
                            role="tab"
                            aria-selected={activeAnimalCategory === category.slug}
                            onMouseEnter={() => setActiveAnimalCategory(category.slug)}
                            onFocus={() => setActiveAnimalCategory(category.slug)}
                            onClick={() => setActiveAnimalCategory(category.slug)}
                            className={`w-full px-3 py-2.5 text-left text-xs font-bold transition-colors ${
                              activeAnimalCategory === category.slug
                                ? 'bg-stone-900 text-white'
                                : 'text-stone-700 hover:bg-white hover:text-stone-950'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>

                      <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto" role="tabpanel">
                        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3 mb-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase text-stone-500">Browse by animal</p>
                            <h3 className="mt-1 text-lg font-black text-stone-950">{selectedAnimalCategory.name}</h3>
                          </div>
                          <Link
                            href={`/${selectedAnimalCategory.slug}`}
                            onClick={() => setActiveMenu(null)}
                            className="shrink-0 text-xs font-bold text-blue-700 hover:underline"
                          >
                            View all {selectedAnimalCategory.name} guides
                          </Link>
                        </div>

                        <h4 className="mb-3 text-[10px] font-bold uppercase text-stone-500">{animalMenuSection.title}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
                          {animalMenuSection.links.map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              onClick={() => setActiveMenu(null)}
                              className="border-b border-stone-100 py-2 text-xs font-medium text-stone-700 hover:text-blue-700"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </nav>

          {/* Search Box + Actions (Pinned to Far Right Corner, Zero Hang Off) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            
            {/* Search Input */}
            <div className="relative">
              <div className="flex items-center bg-neutral-100 border border-neutral-300 transition-colors rounded-none">
                <Search className="w-4 h-4 text-neutral-500 ml-2.5 sm:ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search 167+ guides..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-28 sm:w-36 md:w-44 lg:w-48 pl-2 pr-3 py-2 text-xs bg-transparent focus:outline-none text-black placeholder-neutral-500 rounded-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="mr-2 text-neutral-400 hover:text-black rounded-none">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 bg-white shadow-2xl border-2 border-black p-2 z-50 text-xs max-h-96 overflow-y-auto rounded-none">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Guides & Supplies ({searchResults.length})
                  </div>
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectResult(item.url)}
                      className="w-full text-left p-2.5 hover:bg-neutral-50 flex items-center justify-between text-black group cursor-pointer rounded-none border-b border-neutral-100 last:border-b-0"
                    >
                      <span className="font-semibold group-hover:text-blue-600 truncate mr-2">{item.name}</span>
                      <span className="text-[10px] text-neutral-400 shrink-0 font-medium">{item.group}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Appointment Action Button (Blue / Black / Yellow Accent) */}
            <button
              onClick={onBookClick}
              className="px-3.5 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer shrink-0 rounded-none whitespace-nowrap"
            >
              Book Appointment*
            </button>

          </div>

        </div>
      </div>

      {/* Slide-out Sidebar Drawer (Global Site Chrome Nav Model from upstream) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative z-50 flex w-[280px] sm:w-[320px] flex-col overflow-y-auto border-r border-gold/30 bg-cream p-6 shadow-2xl justify-between">
            <div>
              {/* Top Drawer Controls */}
              <div className="flex items-center justify-between pb-6 border-b border-gold/20">
                <div className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-gold-deep" />
                  <span className="font-extrabold text-sm tracking-wider uppercase text-ink">ALL ABOUT PAWZ</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded text-ink-soft hover:text-black hover:bg-black/5 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-3">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    if (onBookClick) onBookClick();
                    else router.push('/book');
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-gold-deep bg-cream-deep px-4 py-3 text-xs font-bold tracking-widest text-ink uppercase hover:bg-gold-deep hover:text-white transition-colors cursor-pointer"
                >
                  <CalendarDays className="h-4 w-4 text-black" />
                  BOOK APPOINTMENT
                </button>

                <Link
                  href="/account"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 border border-neutral-300 bg-white px-4 py-2.5 text-xs font-bold tracking-wider text-ink uppercase hover:bg-neutral-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  CUSTOMER ACCOUNT
                </Link>
              </div>

              {/* Numbered NAV Items (01 - 11) */}
              <nav className="py-6 border-b border-gold/20">
                <ul className="space-y-2">
                  {UPSTREAM_NAV.map((item) => (
                    <li key={item.to}>
                      <Link
                        href={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 py-1.5 px-2 hover:bg-black/5 transition-colors text-ink group"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 text-[10px] font-bold text-ink-soft group-hover:border-gold-deep group-hover:text-gold-deep">
                          {item.n}
                        </span>
                        <span className="text-xs font-bold tracking-widest uppercase group-hover:text-gold-deep transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Drawer Contact Footer */}
            <div className="pt-6 text-xs text-ink-soft space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-deep" />
                <a href="tel:9017221114" className="font-bold hover:text-black">(901) 722-1114</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-deep" />
                <a href="mailto:booking@aapawz.com" className="font-semibold hover:text-black">booking@aapawz.com</a>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">Tuesday–Saturday: 8am–5pm</p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
