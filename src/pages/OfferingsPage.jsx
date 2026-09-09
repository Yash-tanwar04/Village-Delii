import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShoppingBag, Apple, Croissant, Sandwich, CupSoda, Milk, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { OFFERINGS } from '../data/offerings';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

export function OfferingsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const images = [
    '/assets/images/store-interior.jpg',
    '/assets/images/hero-scenery.jpg',
    '/assets/images/store-approach.jpg',
    '/assets/images/store-night.jpg',
    '/assets/images/store-interior.jpg',
    '/assets/images/ghibli-day.jpg',
  ];

  const categoryIcons = [ShoppingBag, Apple, Croissant, Sandwich, CupSoda, Milk];

  const categoryHighlights = [
    {
      staples: ['Stone-chakki whole wheat atta', 'Unpolished heirloom pulses & dal', 'Cold-pressed mustard & olive oil', 'Authentic regional spices'],
      guarantee: '100% Unadulterated & Zero Preservatives',
    },
    {
      staples: ['Crisp daily greens & spinach', 'Audited regional farm root vegetables', 'Hydroponic basil & kitchen herbs', 'Orchard seasonal handpicked fruit'],
      guarantee: 'Farm-Inspected & Harvested Within 24 Hours',
    },
    {
      staples: ['Crusty French sourdough boules', 'Golden morning butter croissants', 'Seeded multigrain artisanal loaves', 'Traditional spiced tea rusks'],
      guarantee: 'Baked Daily in Onsite Stone Deck Ovens',
    },
    {
      staples: ['Chef gourmet toasted paninis', 'Artisanal deli wraps with fresh greens', 'High-protein grain & salad bowls', 'Highway grab-and-go snack packs'],
      guarantee: 'Prepared Fresh Daily by Store Chefs',
    },
    {
      staples: ['Raw cold-pressed Valencia orange', 'Fresh crushed sugarcane & ginger', 'Barista-pulled double shot espresso', 'Spiced kadak masala chai'],
      guarantee: 'Zero Added Sugar & Freshly Pulled to Order',
    },
    {
      staples: ['Pure farm milk & clotted cream', 'Fresh artisanal malai paneer', 'Cultured natural set yoghurt & curd', 'Essential household toiletries'],
      guarantee: 'Cold-Chain Certified & Always in Stock 24/7',
    },
  ];

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      {/* ── TOP HERO ANCHOR (FORMAT BACKGROUND #F7F4ED — NAVBAR FULLY VISIBLE) ── */}
      <section className="pt-32 pb-20 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute top-1/4 -right-16 w-[550px] h-[550px] rounded-full bg-[#C86B4A]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>02 / THE INTEGRATED MARKETPLACE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.2rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>Everything You Need.</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.15}>All Under One Roof.</TextReveal>
                </span>
              </h1>
              <p className="text-base sm:text-xl text-[#202321]/80 font-light max-w-2xl pt-2 leading-relaxed">
                {OFFERINGS.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right font-mono text-xs text-[#202321]/70 space-y-1">
              <div className="text-[#C86B4A] font-bold text-sm">6 RETAIL PILLARS</div>
              <div>ALWAYS FRESH · ALWAYS 24/7</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY CATEGORY NAV BAR ── */}
      <div className="sticky top-20 z-30 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#E5D8C5] py-3.5 px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold mr-2">
              Browse Category:
            </span>
            {OFFERINGS.categories.map((cat, idx) => {
              const Icon = categoryIcons[idx];
              return (
                <a
                  key={cat.id}
                  href={'#category-' + cat.id}
                  className="card-pop-subtle px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white border border-[#E5D8C5] text-[#172B3A] hover:bg-[#C86B4A] hover:text-white hover:border-[#C86B4A] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>0{idx + 1}. {cat.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CATEGORY SECTIONS WITH GOURMET DETAILS & POPPING CARDS ── */}
      <div className="divide-y divide-[#E5D8C5]">
        {OFFERINGS.categories.map((cat, idx) => {
          const Icon = categoryIcons[idx];
          const highlight = categoryHighlights[idx];
          const isEven = idx % 2 === 0;

          return (
            <section
              key={cat.id}
              id={'category-' + cat.id}
              className="relative py-24 px-6 overflow-hidden bg-[#F7F4ED]"
            >
              {/* Giant Background Numeral */}
              <div
                className={'absolute top-1/2 -translate-y-1/2 text-[24vw] font-serif font-black text-[#172B3A]/[0.025] select-none pointer-events-none leading-none ' +
                  (isEven ? 'right-6' : 'left-6')}
              >
                0{idx + 1}
              </div>

              <div className="max-w-7xl mx-auto w-full relative z-10 text-left">
                <div className={'grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ' +
                  (!isEven ? 'lg:flex-row-reverse' : '')}>

                  {/* Narrative Column */}
                  <div className={'lg:col-span-6 space-y-6 ' + (!isEven ? 'lg:order-2' : '')}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5D8C5] text-xs font-mono tracking-widest text-[#C86B4A] shadow-xs">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.tag.toUpperCase()}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-xs tracking-widest text-[#202321]/60 block uppercase">
                        CATEGORY 0{idx + 1} OF 06
                      </span>
                      <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#172B3A] leading-[1.05]">
                        <TextReveal>{cat.title}</TextReveal>
                      </h2>
                    </div>

                    <p className="font-serif text-xl sm:text-2xl text-[#C86B4A] italic font-medium">
                      "{cat.description}"
                    </p>

                    <p className="text-base text-[#202321]/80 font-light leading-relaxed">
                      {cat.details}
                    </p>

                    {/* Curated Staples Box with Card Pop */}
                    <CardPop className="p-6 rounded-2xl bg-white border border-[#E5D8C5] shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#172B3A]/10 pb-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold">
                          Curated In-Store Staples:
                        </span>
                        <span className="text-[10px] font-mono text-[#202321]/60">24/7 SHELF ACCESS</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {highlight.staples.map((staple, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-[#172B3A]">
                            <Check className="w-3.5 h-3.5 text-[#C86B4A] shrink-0" />
                            <span>{staple}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#172B3A]/10 flex items-center gap-2 text-xs font-mono text-[#172B3A] font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#A8B29B]" />
                        <span>{highlight.guarantee}</span>
                      </div>
                    </CardPop>
                  </div>

                  {/* Visual Canvas Column with Card Pop */}
                  <div className={'lg:col-span-6 ' + (!isEven ? 'lg:order-1' : '')}>
                    <CardPop className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[32px] overflow-hidden shadow-xl border border-[#E5D8C5] bg-[#172B3A]">
                      <img
                        src={images[idx]}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/85 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-6 left-6 right-6 text-white text-left flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] block mb-1">
                            Village Deli Standard
                          </span>
                          <h4 className="font-serif text-2xl font-bold">
                            {cat.title}
                          </h4>
                        </div>
                        <span className="font-mono text-3xl font-extrabold text-white/40">
                          0{idx + 1}
                        </span>
                      </div>
                    </CardPop>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── FOOTER CALLOUT ── */}
      <section className="py-24 bg-[#172B3A] text-white text-center px-6 border-t border-white/15">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
            Visit in Person
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-bold">
            Experience the Taste & Freshness Today
          </h3>
          <p className="text-sm sm:text-base text-[#E5D8C5] font-light max-w-xl mx-auto leading-relaxed">
            Find the nearest 24/7 store along your commute across Dwarka Expressway, Sohna Road, or the GT Corridor.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              to="/locations"
              className="px-8 py-3.5 rounded-full bg-[#C86B4A] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#b55c3c] hover:text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <span>Find Nearest Location</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
