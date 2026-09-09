import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, BookOpen, ShoppingBag, Flame, MapPin, Route, Handshake, Users, ArrowRight } from 'lucide-react';

export function ExploreEditorialIndex() {
  const dimensions = [
    {
      num: '01',
      title: 'About Village Deli',
      tagline: 'Brand Ethos & Promise',
      desc: 'Built around making everyday living easier. A 24/7 modern convenience sanctuary combining operational excellence with community care.',
      topics: 'Brand Manifesto · Ethos Triptych · Quality Benchmark · Strategic Pillars',
      path: '/about',
      badge: 'MANIFESTO',
      icon: BookOpen,
      cols: 'lg:col-span-7',
      accent: 'border-[#C86B4A]/30 bg-white/90',
    },
    {
      num: '02',
      title: 'What We Offer',
      tagline: '6 Curated Retail Pillars',
      desc: 'Stone-ground flours, farm-fresh produce, live European bakery, chef grab-and-go meals, cold-pressed juices, and daily essentials.',
      topics: 'Pantry Staples · Fresh Farm Produce · Artisan Bakery · Quick Meals',
      path: '/offerings',
      badge: 'MARKETPLACE',
      icon: ShoppingBag,
      cols: 'lg:col-span-5',
      accent: 'border-[#172B3A]/15 bg-white/70',
    },
    {
      num: '03',
      title: 'The Experience',
      tagline: '5 Onsite Sensory Rituals',
      desc: 'Stone-chakki milling, raw cold-pressed citrus, daily live deck ovens, frictionless speed checkout, and welcoming solid oak lounge seating.',
      topics: 'Live Milling · Cold Extraction · Deck Ovens · Oak Lounge Hospitality',
      path: '/experience',
      badge: 'CRAFT ATELIER',
      icon: Flame,
      cols: 'lg:col-span-5',
      accent: 'border-[#172B3A]/15 bg-white/70',
    },
    {
      num: '04',
      title: 'Store Directory',
      tagline: 'Interactive Locator',
      desc: 'Find Village Deli across Dwarka Expressway, Sohna Road, GT Road, and key North Indian transit intersections with verified 24/7 navigation.',
      topics: 'Stationary Map View · Highway Interchanges · Live Hours · Direct Navigation',
      path: '/locations',
      badge: '24/7 NETWORK',
      icon: MapPin,
      cols: 'lg:col-span-7',
      accent: 'border-[#C86B4A]/30 bg-white/90',
    },
    {
      num: '05',
      title: 'Our Expansion',
      tagline: 'Punjab → Haryana Blueprint',
      desc: 'From our Punjab highway heritage to 2026 expansion across Haryana mobility hubs, townships, and our HarHith + Vita state collaboration.',
      topics: '3 Regional Horizons · 6 Format Archetypes · HarHith Alliance',
      path: '/expansion',
      badge: 'REGIONAL BLUEPRINT',
      icon: Route,
      cols: 'lg:col-span-4',
      accent: 'border-[#172B3A]/15 bg-white/70',
    },
    {
      num: '06',
      title: 'Partner With Us',
      tagline: '4 Commercial Tracks',
      desc: 'Collaborate with Village Deli as a property owner, fuel station network operator, regional retail franchisee, or institutional state alliance.',
      topics: 'Property Lease · Fuel Station Networks · Franchisee Models · Direct Concierge',
      path: '/partner',
      badge: 'ALLIANCES',
      icon: Handshake,
      cols: 'lg:col-span-4',
      accent: 'border-[#172B3A]/15 bg-white/70',
    },
    {
      num: '07',
      title: 'Careers',
      tagline: 'Build the Future With Us',
      desc: 'Join a high-velocity retail organization across operations, culinary craft, store management, technology systems, and business development.',
      topics: '6 Opportunity Tracks · Frontline Empowerment · Rapid Growth · Merit Culture',
      path: '/careers',
      badge: 'TALENT & CULTURE',
      icon: Users,
      cols: 'lg:col-span-4',
      accent: 'border-[#172B3A]/15 bg-white/70',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#F7F4ED] text-[#202321] overflow-hidden border-b border-[#E5D8C5]">
      {/* Background typographic watermark */}
      <div className="absolute top-8 right-8 text-[15vw] font-serif font-black text-[#172B3A]/[0.025] select-none pointer-events-none leading-none">
        DIMENSIONS
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-mono tracking-widest text-[#C86B4A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 / THE VILLAGE DELI COMPENDIUM</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#172B3A] leading-[1.05]">
              Every Dimension of Your Everyday Sanctuary.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#202321]/75 max-w-md font-light leading-relaxed">
            Hover over any dimension to inspect chapter highlights, or click through to explore our comprehensive editorial chapters.
          </p>
        </div>

        {/* ── THE EDITORIAL MAGAZINE DIRECTORY GRID (WITH HOVER REVEALS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            return (
              <Link
                key={dim.path}
                to={dim.path}
                data-cursor="EXPLORE"
                className={dim.cols + ' card-pop group relative p-8 sm:p-10 rounded-[28px] border shadow-xs cursor-pointer flex flex-col justify-between overflow-hidden ' + dim.accent}
              >
                {/* Top Row: Numeral + Badge + Arrow Action */}
                <div className="flex items-center justify-between pb-6 border-b border-[#172B3A]/10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-[#C86B4A]">
                      {dim.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#172B3A]/5 text-[#172B3A] font-semibold group-hover:bg-[#C86B4A] group-hover:text-white transition-colors duration-300">
                      {dim.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#172B3A]/20 flex items-center justify-center text-[#172B3A] group-hover:bg-[#C86B4A] group-hover:border-[#C86B4A] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Center Content */}
                <div className="my-6 space-y-2">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#C86B4A] font-bold">
                    <Icon className="w-4 h-4" />
                    <span>{dim.tagline}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#172B3A] group-hover:text-[#C86B4A] transition-colors duration-300">
                    {dim.title}
                  </h3>

                  <p className="text-sm text-[#202321]/80 font-light leading-relaxed pt-1">
                    {dim.desc}
                  </p>

                  {/* Dynamic Hover Reveal Topics Drawer */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-400 overflow-hidden pt-0 group-hover:pt-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172B3A]/5 border border-[#C86B4A]/30 text-[11px] font-mono text-[#C86B4A]">
                      <span>✦ {dim.topics}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Indicator + Expanding Accent Line */}
                <div className="pt-4 border-t border-[#172B3A]/10 flex items-center justify-between text-xs font-mono text-[#202321]/60">
                  <span className="group-hover:text-[#172B3A] font-semibold transition-colors flex items-center gap-1">
                    <span>Explore Chapter</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[#C86B4A] font-bold">24/7 ACCESS</span>
                </div>

                {/* Expanding Bottom Terracotta Highlight Accent */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-[#C86B4A] transition-all duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
