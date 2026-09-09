import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Minus, Check } from 'lucide-react';
import { BRAND } from '../../data/brand';

export function TypographicOfferings() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const categories = [
    {
      num: '01',
      title: 'Groceries',
      headline: 'Pantry Staples & Whole Grains',
      description: 'Carefully curated daily staples including unpolished pulses, stone-ground flours, cold-pressed cooking oils, heirloom spices, and organic grains.',
      items: ['Stone-chakki atta', 'Unpolished dal & lentils', 'Cold-pressed mustard & olive oil', 'Artisanal spices & condiments', 'Packaged healthy dry foods'],
    },
    {
      num: '02',
      title: 'Fresh Produce',
      headline: 'Farm-Inspected Daily Harvest',
      description: 'Crisp seasonal fruits, green leafy vegetables, herbs, and roots sourced directly from audited regional farms across Haryana and Punjab.',
      items: ['Seasonal organic greens', 'Daily root vegetables', 'Hydroponic herbs', 'Handpicked orchard fruits', 'Pre-washed cut salads'],
    },
    {
      num: '03',
      title: 'Fresh Bakery',
      headline: 'Live Onsite Oven Loaves',
      description: 'Oven-baked European sourdough loaves, crusty baguettes, seeded multigrain breads, buttery croissants, and warm tea-time rusks baked throughout the day.',
      items: ['Crusty sourdough loaves', 'Brioche & multigrain buns', 'Oven baked morning croissants', 'Flaky savoury pastries', 'Classic butter cookies & rusks'],
    },
    {
      num: '04',
      title: 'Quick Meals',
      headline: 'Chef-Prepared Grab-and-Go',
      description: 'Fast, wholesome, chef-made meals designed for travellers, commuters, and busy households seeking real nutrition without the wait.',
      items: ['Artisan deli wraps', 'Toasted gourmet sandwiches', 'Protein grain bowls', 'Warm comfort rolls', 'Fresh tossed lunch boxes'],
    },
    {
      num: '05',
      title: 'Beverages',
      headline: 'Cold-Pressed & Specialty Barista',
      description: 'Invigorating raw cold-pressed citrus blends, freshly pulled espresso drinks, spiced masala chai, botanical sodas, and nutrient smoothies.',
      items: ['Cold-pressed raw citrus', 'Barista pulled espresso & latte', 'Traditional spiced chai', 'Sparkling herbal tonics', 'Natural fruit & dairy shakes'],
    },
    {
      num: '06',
      title: 'Dairy & Essentials',
      headline: 'Fresh Milk & Daily Home Staples',
      description: 'Wholesome farm dairy alongside essential household and personal care items ensuring you never get caught without what you need.',
      items: ['Fresh milk & cream', 'Cultured yoghurt & curd', 'Artisan paneer & cheeses', 'Clean personal care basics', 'Everyday household provisions'],
    },
  ];

  return (
    <section className="relative w-full bg-[#F7F4ED] text-[#202321] py-16 px-6 select-none border-b border-[#172B3A]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Typographic Field: Oversized Interactive Rows */}
        <div className="divide-y divide-[#172B3A]/15 border-t border-b border-[#172B3A]/20">
          {categories.map((cat, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={cat.num}
                className={'transition-all duration-300 ' + (isExpanded ? 'bg-[#172B3A]/[0.03] py-8' : 'py-6 hover:bg-[#172B3A]/[0.02]')}
              >
                {/* Clickable Header Row */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-baseline gap-6 sm:gap-12">
                    <span className={'text-xs sm:text-sm font-mono tracking-widest font-bold transition-colors ' + (isExpanded ? 'text-[#C86B4A]' : 'text-[#202321]/40 group-hover:text-[#C86B4A]')}>
                      {cat.num}
                    </span>
                    <h3 className={'font-serif text-3xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-tight transition-all duration-300 ' + (isExpanded ? 'text-[#C86B4A] translate-x-2' : 'text-[#172B3A] group-hover:text-[#C86B4A] group-hover:translate-x-1')}>
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline-block text-xs font-mono uppercase tracking-wider text-[#202321]/60">
                      {cat.headline}
                    </span>
                    <div className={'w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ' + (isExpanded ? 'border-[#C86B4A] bg-[#C86B4A] text-white rotate-45' : 'border-[#172B3A]/20 text-[#172B3A] group-hover:border-[#C86B4A] group-hover:text-[#C86B4A]')}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanding Architectural Drawer (Zero Photos) */}
                {isExpanded && (
                  <div className="mt-8 pt-6 border-t border-[#172B3A]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left animate-fadeIn">
                    <div className="lg:col-span-6 space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                        CATEGORY OVERVIEW
                      </span>
                      <p className="text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#172B3A] font-bold block">
                        CURATED STAPLES (FROM PDF)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cat.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#202321]/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Link to Dedicated What We Offer Page */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <span className="text-xs font-mono text-[#202321]/60">
            6 CATEGORIES • AUDITED REGIONAL SUPPLIERS • CONTINUOUS FRESH BATCHES
          </span>

          <Link
            to="/offerings"
            data-cursor="CATALOG"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#172B3A] hover:text-[#C86B4A] transition-colors group"
          >
            <span>View Complete Product Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C86B4A]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
