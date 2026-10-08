'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-black text-white tracking-tight">
                All About Pawz
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Memphis & Shelby County&apos;s trusted destination for professional salon grooming, veterinary-backed nutrition guidance, and fear-free pet care supplies.
            </p>

            <div className="p-3.5 bg-stone-950/70 border border-stone-800 text-xs text-stone-400 space-y-1 rounded-none">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Tennessee Rabies Compliance</span>
              </div>
              <p className="text-[11px] leading-normal text-stone-400">
                To protect all pets and technicians, verified veterinary proof of rabies vaccination is mandatory for salon entry under Shelby County health ordinances.
              </p>
            </div>
          </div>

          {/* Pillar 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Feeding & Watering
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/feeding-and-watering" className="hover:text-white transition-colors font-bold text-orange-400">
                  Feeding & Watering Overview
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/water-bottles" className="hover:text-white transition-colors">
                  Water Bottles
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/nursing-supplies" className="hover:text-white transition-colors">
                  Nursing Supplies
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/lick-mats" className="hover:text-white transition-colors">
                  Lick Mats
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/fountains" className="hover:text-white transition-colors">
                  Fountains
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/food-storage" className="hover:text-white transition-colors">
                  Food Storage
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/feeding-mats" className="hover:text-white transition-colors">
                  Feeding Mats
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/bowls-and-dishes" className="hover:text-white transition-colors">
                  Bowls & Dishes
                </Link>
              </li>
              <li>
                <Link href="/feeding-and-watering/automatic-feeders" className="hover:text-white transition-colors">
                  Automatic Feeders
                </Link>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Grooming Essentials */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Grooming Essentials
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <Link href="/grooming-essentials" className="hover:text-white transition-colors font-bold text-orange-400">
                  All Grooming Essentials
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/styptic-gels-and-powders" className="hover:text-white transition-colors">
                  Styptic Gels & Powders
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/shower-and-bath-supplies" className="hover:text-white transition-colors">
                  Shower & Bath Supplies
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/shedding-tools" className="hover:text-white transition-colors">
                  Shedding Tools
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/shampoos-and-conditioners" className="hover:text-white transition-colors">
                  Shampoos & Conditioners
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/scissors" className="hover:text-white transition-colors">
                  Scissors & Shears
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/hair-removal-mitts-and-rollers" className="hover:text-white transition-colors">
                  Hair Removal Mitts & Rollers
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/grooming-wipes" className="hover:text-white transition-colors">
                  Grooming Wipes
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/electric-clippers-and-blades" className="hover:text-white transition-colors">
                  Electric Clippers & Blades
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/deodorizers" className="hover:text-white transition-colors">
                  Deodorizers
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/dematting-tools" className="hover:text-white transition-colors">
                  Dematting Tools
                </Link>
              </li>
              <li>
                <Link href="/grooming-essentials/medicated-shampoos" className="hover:text-white transition-colors">
                  Medicated Shampoos
                </Link>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Guides & Care */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Grooming & Health
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/doodle-grooming" className="hover:text-white transition-colors">
                  Doodle Grooming
                </Link>
              </li>
              <li>
                <Link href="/puppys-first-groom" className="hover:text-white transition-colors">
                  Puppy&apos;s First Salon Visit
                </Link>
              </li>
              <li>
                <Link href="/7-day-food-transition-guide" className="hover:text-white transition-colors">
                  7-Day Food Transition
                </Link>
              </li>
              <li>
                <Link href="/flea-tick-prevention-midsouth" className="hover:text-white transition-colors">
                  Mid-South Flea & Tick
                </Link>
              </li>
              <li>
                <Link href="/crate-sizing-guide" className="hover:text-white transition-colors">
                  Crate Sizing & Dividers
                </Link>
              </li>
              <li>
                <Link href="/vaccination-rules-for-grooming" className="hover:text-white transition-colors">
                  Rabies Verification Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Mid-South Service */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Mid-South Service
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>Greater Memphis, Bartlett, Collierville & Shelby County, TN</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>(901) 555-PAWZ</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="truncate">allaboutpawz901@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>Mon - Sat: 7:30 AM - 5:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 All About Pawz. All rights reserved. Memphis, Tennessee.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/guides" className="hover:text-stone-300">All Guides Directory</Link>
            <Link href="/grooming/memphis-tn" className="hover:text-stone-300">Memphis Salon</Link>
            <Link href="/vaccination-rules-for-grooming" className="hover:text-stone-300">Rabies Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
