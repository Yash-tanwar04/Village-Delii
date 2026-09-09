import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ArrowUpRight, Plus } from 'lucide-react';

export function OfferingsPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const categories = [
    {
      id: 'groceries',
      num: '01',
      title: 'Groceries & Daily Needs',
      tag: 'PANTRY & STAPLES',
      desc: 'Everyday staples and household essentials. Wholesome flours, grains, culinary essentials, condiments, and packaged goods curated for daily living.',
      image: '/assets/images/ghibli-produce.jpg',
    },
    {
      id: 'fresh-produce',
      num: '02',
      title: 'Farm-Fresh Produce',
      tag: 'FARM TO SHELF',
      desc: 'Fresh fruits and vegetables selected for everyday quality. Hand-inspected each morning to ensure peak freshness for your household kitchen.',
      image: '/assets/images/ghibli-store-front.jpg',
    },
    {
      id: 'fresh-bakery',
      num: '03',
      title: 'Fresh Bakery',
      tag: 'BAKED DAILY',
      desc: 'Freshly prepared bakery products, every day. Warm crusty sourdough loaves, buttery morning croissants, and teatime treats baked on schedule.',
      image: '/assets/images/ghibli-bakery.jpg',
    },
    {
      id: 'quick-meals',
      num: '04',
      title: 'Quick Meals & Grab-and-Go',
      tag: 'CHEF PREPARED',
      desc: 'Hot, tasty, and convenient food for people on the go. Gourmet deli sandwiches, wholesome wraps, and savory snacks crafted for quick pickup.',
      image: '/assets/images/ghibli-transit.jpg',
    },
    {
      id: 'beverages',
      num: '05',
      title: 'Beverages & Refreshments',
      tag: 'FRESH & CHILLED',
      desc: 'Refreshing beverages for every moment of the day. Specialty barista coffee, 100% cold-pressed fruit juices, herbal teas, and chilled tonics.',
      image: '/assets/images/ghibli-night.jpg',
    },
    {
      id: 'dairy-essentials',
      num: '06',
      title: 'Dairy & Packaged Essentials',
      tag: 'DAILY FRESH',
      desc: 'Everyday dairy products and essential household items. Fresh milk, cultured yoghurt, paneer, and daily personal care provisions in stock 24/7.',
      image: '/assets/images/ghibli-cafe.jpg',
    },
  ];

  const current = categories[activeIdx >= 0 ? activeIdx : 0] || categories[0];

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      
      {/* ── 01. EDITORIAL HERO ── */}
      <section
        style={{ paddingTop: 'calc(var(--navbar-height, 72px) + 2rem)' }}
        className="pb-12 sm:pb-16 px-4 sm:px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
              02 / WHAT WE OFFER
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#172B3A] leading-tight">
              Everything You Need.
              <span className="block italic text-[#C86B4A] font-medium mt-1">
                All Under One Roof.
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#202321]/80 font-light leading-relaxed pt-2">
              Village Deli brings together the products and services that make everyday life simpler.
              Six curated categories available 24 hours a day, 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. EDITORIAL CATEGORY NAVIGATOR ── */}
      <section className="py-10 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 text-left border-b border-[#E5D8C5]">
        
        {/* ── MOBILE VIEW: IN-PLACE EXPANDABLE ACCORDION (lg:hidden) ── */}
        <div className="lg:hidden space-y-3.5">
          <div className="flex items-center justify-between pb-2 px-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#C86B4A] font-semibold">
              Explore 6 Categories
            </span>
            <span className="text-[11px] font-mono text-[#172B3A]/50">
              Tap to view details
            </span>
          </div>

          {categories.map((cat, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={cat.id}
                className={
                  'rounded-2xl transition-all duration-300 overflow-hidden border ' +
                  (isOpen
                    ? 'bg-white border-[#C86B4A]/50 shadow-md ring-1 ring-[#C86B4A]/20'
                    : 'bg-white/80 border-[#E5D8C5] hover:border-[#172B3A]/20 shadow-xs')
                }
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => setActiveIdx(isOpen ? -1 : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={
                        'font-mono text-xs font-bold shrink-0 ' +
                        (isOpen ? 'text-[#C86B4A]' : 'text-[#172B3A]/40')
                      }
                    >
                      {cat.num}
                    </span>
                    <div>
                      <h3
                        className={
                          'font-serif text-base sm:text-lg font-bold transition-colors leading-snug ' +
                          (isOpen ? 'text-[#172B3A]' : 'text-[#172B3A]/85')
                        }
                      >
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86B4A] block mt-0.5 font-semibold">
                        {cat.tag}
                      </span>
                    </div>
                  </div>

                  <div
                    className={
                      'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ' +
                      (isOpen
                        ? 'bg-[#C86B4A] text-white rotate-45 shadow-xs'
                        : 'bg-[#172B3A]/5 text-[#172B3A]/60')
                    }
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Expanded In-Place Details */}
                {isOpen && (
                  <div className="px-4 pb-5 pt-1 space-y-3.5 border-t border-[#172B3A]/5 bg-white">
                    <p className="text-xs sm:text-sm text-[#202321]/80 font-light leading-relaxed pt-1">
                      {cat.desc}
                    </p>

                    {/* Image Banner */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#172B3A] shadow-inner">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#172B3A]/85 text-[#F7F4ED] font-medium backdrop-blur-xs">
                          {cat.tag}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Info & Link */}
                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#202321]/70 border-t border-[#172B3A]/5">
                      <span className="font-semibold text-[#172B3A]/60 tracking-wider">AVAILABLE 24/7</span>
                      <Link
                        to="/locations"
                        className="inline-flex items-center gap-1 font-bold text-[#C86B4A] hover:text-[#172B3A] transition-colors py-1 px-2 rounded-md hover:bg-[#C86B4A]/5"
                      >
                        <span>Find in Store</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DESKTOP SPLIT VIEW (hidden lg:grid lg:grid-cols-12) ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Category selector list */}
          <div className="lg:col-span-6 divide-y divide-[#172B3A]/10">
            {categories.map((cat, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={
                    'py-6 px-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ' +
                    (isActive ? 'bg-white shadow-xs border border-[#E5D8C5]' : 'hover:bg-white/60')
                  }
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={
                        'font-mono text-xs sm:text-sm font-bold ' +
                        (isActive ? 'text-[#C86B4A]' : 'text-[#172B3A]/40')
                      }
                    >
                      {cat.num}
                    </span>
                    <div>
                      <h3
                        className={
                          'font-serif text-xl sm:text-2xl font-bold transition-colors ' +
                          (isActive ? 'text-[#172B3A]' : 'text-[#172B3A]/70 group-hover:text-[#172B3A]')
                        }
                      >
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86B4A] block mt-0.5">
                        {cat.tag}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={
                      'w-4 h-4 transition-transform ' +
                      (isActive
                        ? 'text-[#C86B4A] translate-x-1'
                        : 'text-[#172B3A]/20 group-hover:text-[#172B3A]/60')
                    }
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Category Editorial Spotlight */}
          <div 
            style={{ top: 'calc(var(--navbar-height, 72px) + 1.5rem)' }}
            className="lg:col-span-6 lg:sticky"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5D8C5] shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#172B3A]/10 pb-4">
                <span className="text-xs font-mono font-bold text-[#C86B4A]">
                  CATEGORY {current.num} / 06
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#172B3A]/5 text-[#172B3A] font-semibold">
                  {current.tag}
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                  {current.title}
                </h2>
                <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* 1 Strong Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#172B3A]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#202321]/70">
                <span>AVAILABLE 24/7 IN STORES</span>
                <Link
                  to="/locations"
                  className="inline-flex items-center gap-1.5 font-bold text-[#C86B4A] hover:text-[#172B3A] transition-colors"
                >
                  <span>Find in Store</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 03. CLOSING CTA ── */}
      <section className="py-14 sm:py-16 bg-[#172B3A] text-white text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="font-serif text-2xl sm:text-4xl font-bold">
            Available 24 Hours a Day, 7 Days a Week
          </h3>
          <p className="text-sm sm:text-base text-[#E5D8C5]/85 font-light max-w-xl mx-auto leading-relaxed">
            Visit your nearest Village Deli location along key North Indian transit and neighborhood corridors.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/locations"
              className="px-7 py-3 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-semibold text-xs sm:text-sm tracking-wider transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Find Nearest Location</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
