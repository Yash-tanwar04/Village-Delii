import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export function ExploreEditorialIndex() {
  const [hoveredOffering, setHoveredOffering] = useState(0);

  const offerings = [
    {
      num: '01',
      title: 'Groceries & Daily Needs',
      desc: 'Daily essentials, wholesomely sourced grains, unpolished pulses, and premium pantry goods curated for modern living.',
    },
    {
      num: '02',
      title: 'Farm-Fresh Produce',
      desc: 'Seasonal fruits and crisp vegetables selected every morning for everyday kitchen freshness.',
    },
    {
      num: '03',
      title: 'Fresh Bakery',
      desc: 'Warm artisanal sourdough loaves, flaky butter croissants, and teatime treats baked daily in store ovens.',
    },
    {
      num: '04',
      title: 'Quick Meals & Grab-and-Go',
      desc: 'Chef-prepared toasted deli sandwiches, nutritious wraps, and warm savoury snacks ready when you are.',
    },
    {
      num: '05',
      title: 'Beverages & Refreshments',
      desc: 'Barista-pulled espresso, raw cold-pressed citrus, herbal infusions, and sparkling refreshments.',
    },
    {
      num: '06',
      title: 'Dairy & Packaged Essentials',
      desc: 'Pure farm-fresh milk, cultured yoghurt, artisanal paneer, and household personal care provisions.',
    },
  ];

  const brandChapters = [
    {
      num: '01',
      label: 'About Village Deli',
      detail: 'Our brand ethos, 24/7 availability & HarHith-Vita collaboration',
      path: '/about',
    },
    {
      num: '02',
      label: 'The Experience',
      detail: '5 onsite sensory rituals: live stone chakki, deck ovens & oak lounge',
      path: '/experience',
    },
    {
      num: '03',
      label: 'Store Directory',
      detail: 'Locate 24/7 stores across Dwarka Expressway, Sohna Road & highway corridors',
      path: '/locations',
    },
    {
      num: '04',
      label: 'Regional Expansion',
      detail: '6 strategic retail formats connecting North India mobility corridors',
      path: '/expansion',
    },
    {
      num: '05',
      label: 'Partner With Us',
      detail: 'Property leases, fuel station alliances & institutional tracks',
      path: '/partner',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ── PART A: WHAT WE OFFER — EDITORIAL SPLIT INDEX ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#172B3A]/10 text-left">
          
          {/* Left Column: Quiet, dignified editorial anchor */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
                02 / WHAT WE OFFER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B3A] leading-tight">
                Everything You Need.
                <span className="block italic text-[#C86B4A] font-medium mt-1">
                  All Under One Roof.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed max-w-md">
              Village Deli brings together the products and services that make everyday life simpler.
              From farm-fresh produce to live bakery and 24/7 household essentials, quality is never compromised.
            </p>

            <div className="pt-2">
              <Link
                to="/offerings"
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wider text-[#172B3A] hover:text-[#C86B4A] transition-colors group"
              >
                <span>Explore Full Retail Directory</span>
                <ArrowRight className="w-4 h-4 text-[#C86B4A] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Numbered Editorial Typographic List */}
          <div className="lg:col-span-7 divide-y divide-[#172B3A]/10">
            {offerings.map((item, idx) => (
              <div
                key={item.num}
                onMouseEnter={() => setHoveredOffering(idx)}
                className="py-5 sm:py-6 group transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#C86B4A]">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#202321]/70 font-light leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/offerings"
                    className="shrink-0 p-2 rounded-full border border-transparent group-hover:border-[#C86B4A]/30 text-[#172B3A]/40 group-hover:text-[#C86B4A] transition-all"
                    title={`View ${item.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── PART B: BRAND CHAPTERS — HORIZONTAL MONOGRAPH INDEX ── */}
        <div className="pt-16 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block mb-1">
                03 / BRAND MONOGRAPH
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                Explore Every Chapter
              </h3>
            </div>
            <span className="text-xs font-mono text-[#202321]/50">
              EDITORIAL CHAPTER DIRECTORY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {brandChapters.map((ch) => (
              <Link
                key={ch.path}
                to={ch.path}
                className="p-5 rounded-2xl bg-white/70 border border-[#E5D8C5] hover:border-[#C86B4A]/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#C86B4A]">
                    {ch.num}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#172B3A]/40 group-hover:text-[#C86B4A] transition-colors" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                    {ch.label}
                  </h4>
                  <p className="text-xs text-[#202321]/65 font-light leading-relaxed mt-1">
                    {ch.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

