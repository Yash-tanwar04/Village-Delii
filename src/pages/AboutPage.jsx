import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Leaf, 
  Clock, 
  Heart
} from 'lucide-react';

export function AboutPage() {
  const [activeFoundation, setActiveFoundation] = useState(0);

  const whyVillageDeli = [
    {
      title: 'Curated Quality',
      desc: 'Everyday essentials and fresh choices, carefully selected from trusted sources.',
      icon: Leaf,
    },
    {
      title: '24/7 Availability',
      desc: 'Always open, always ready for your morning commute or late-night craving.',
      icon: Clock,
    },
    {
      title: 'Warm Experience',
      desc: 'A clean, comfortable and friendly space designed for community warmth.',
      icon: Heart,
    },
  ];

  const whyNowItems = [
    {
      title: '24/7 Lifestyle Needs',
      desc: 'Round-the-clock access for night-shift workers, highway travelers, and late-night cravings.',
    },
    {
      title: 'Fresh & Local First',
      desc: 'Farm-fresh produce and locally sourced dairy, prioritizing daily regional freshness.',
    },
    {
      title: 'Food for Every Craving',
      desc: 'In-store bakery, warm snacks, cold-pressed juices, and chef-curated grab-and-go deli meals.',
    },
    {
      title: 'One-Stop Simplicity',
      desc: 'Daily groceries, specialty beverages, and quick bites brought together under one roof.',
    },
    {
      title: 'Trusted Quality',
      desc: 'Clean ingredients, certified hygienic preparation, and vetted brands you can always rely on.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#202321] min-h-screen selection:bg-[#C86B4A]/20 selection:text-[#172B3A]">
      
      {/* ── HERO (EDITORIAL TYPOGRAPHIC COMPOSITION) ── */}
      <section
        style={{ paddingTop: 'calc(var(--navbar-height, 72px) + 2rem)' }}
        className="pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 border-b border-[#E5D8C5] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Top Editorial Metadata Bar */}
          <div className="flex items-center justify-between pb-6 sm:pb-10 text-[11px] font-mono tracking-[0.22em] text-[#C86B4A] uppercase font-semibold">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />
              <span>ABOUT VILLAGE DELI</span>
            </span>
            <span className="text-[#172B3A]/40 hidden sm:inline tracking-[0.25em]">
              PEOPLE / FOOD / EVERYDAY
            </span>
          </div>

          {/* Asymmetrical Grid: Typography Hero + Radial Geometry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Block */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold text-[#172B3A] tracking-tight leading-[1.08]">
                More Than a Store.
                <span className="block font-serif italic text-[#C86B4A] font-normal text-3xl sm:text-4xl lg:text-[52px] mt-1.5">
                  A Part of Your Everyday Life.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed max-w-2xl pt-1">
                Village Deli is a modern convenience destination bringing together everyday essentials, fresh food and warm experiences — whenever you go, whenever you need it.
              </p>
            </div>

            {/* Right Graphic: Subtle Concentric Trajectory Arcs & Typography Accent */}
            <div className="lg:col-span-4 relative flex items-center justify-center py-4 sm:py-0">
              <div className="relative w-60 h-60 sm:w-68 sm:h-68 flex items-center justify-center">
                
                {/* SVG Radial Trajectory Lines */}
                <svg 
                  className="absolute inset-0 w-full h-full text-[#E5D8C5]" 
                  viewBox="0 0 280 280" 
                  fill="none"
                >
                  <circle cx="140" cy="140" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
                  <circle cx="140" cy="140" r="95" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                  <circle cx="140" cy="140" r="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />
                  
                  {/* Diagonal Trajectory Beam */}
                  <line x1="20" y1="260" x2="260" y2="20" stroke="#C86B4A" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.4" />
                </svg>

                {/* Stacked Typographic Anchor */}
                <div className="relative z-10 text-right space-y-1 select-none pr-4">
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#172B3A]/70 font-semibold">
                    GOOD
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C86B4A] font-bold">
                    FOOD
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#172B3A]/70 font-semibold">
                    BRIGHTER
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C86B4A] font-bold">
                    DAYS
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── WHY VILLAGE DELI? (ARCHITECTURAL 3-COLUMN COMPOSITION) ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16 border-b border-[#E5D8C5] text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Section Header */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C86B4A] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />
                <span>WHY VILLAGE DELI?</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B3A] tracking-tight leading-tight">
                Convenience, <br className="hidden sm:inline" />
                with Care.
              </h2>
            </div>

            {/* Three Architectural Vertical Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5D8C5]">
              {whyVillageDeli.map((item, idx) => {
                const Icon = item.icon;
                const isHovered = activeFoundation === idx;

                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => setActiveFoundation(idx)}
                    className={`pt-6 sm:pt-0 sm:px-7 first:sm:pl-0 last:sm:pr-0 space-y-4 cursor-default transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-85'
                    }`}
                  >
                    {/* Minimal Circular Icon */}
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isHovered 
                        ? 'border-[#C86B4A] bg-[#C86B4A]/10 text-[#C86B4A]' 
                        : 'border-[#E5D8C5] bg-white text-[#172B3A]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#172B3A]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>


      {/* ── WHY NOW? (CONNECTED LINEAR TIMELINE SEQUENCE) ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16 border-b border-[#E5D8C5] text-left">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Header Row */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C86B4A] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />
              <span>WHY NOW?</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B3A] tracking-tight">
              A New Era of Everyday Needs.
            </h2>
          </div>

          {/* Connected Linear Sequence (Unnumbered, Editorial Spacing) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E5D8C5] border-t border-b border-[#E5D8C5] py-2">
            {whyNowItems.map((item) => (
              <div 
                key={item.title} 
                className="py-5 sm:py-6 sm:px-5 first:sm:pl-0 last:sm:pr-0 space-y-3 group hover:bg-white/50 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#202321]/75 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── STRATEGIC COLLABORATION (HARHITH × VITA) ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16 text-left">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Headline & Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C86B4A] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />
                <span>STRATEGIC COLLABORATION</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172B3A] tracking-tight leading-tight">
                Stronger Together.
              </h2>

              <p className="text-sm sm:text-base text-[#202321]/80 font-light leading-relaxed max-w-xl">
                In collaboration with Haryana HarHith and Vita, Village Deli is building a stronger, more connected future for communities across Haryana and beyond.
              </p>
            </div>

            {/* Right Partnership Branding: HarHith × Vita */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-3">
              <div className="flex items-center gap-5 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs">
                
                {/* HarHith Identity */}
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/images/harhith-logo.jpg" 
                    alt="HarHith Haryana" 
                    className="h-8 sm:h-9 w-auto object-contain" 
                    loading="lazy"
                  />
                </div>

                {/* Refined Multiplication Symbol */}
                <span className="text-[#C86B4A] font-light text-xl select-none">
                  ×
                </span>

                {/* Vita Identity */}
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/images/vita-logo.jpg" 
                    alt="Vita Dairy" 
                    className="h-8 sm:h-9 w-auto object-contain" 
                    loading="lazy"
                  />
                </div>

              </div>

              {/* Subtitle Monospace Line */}
              <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#172B3A]/60 font-semibold px-2">
                PEOPLE &nbsp;×&nbsp; PROGRESS &nbsp;×&nbsp; POSSIBILITY
              </div>
            </div>

          </div>

          {/* Bottom Transition Link */}
          <div className="pt-6 border-t border-[#E5D8C5] flex items-center justify-end text-xs font-mono">
            <Link
              to="/expansion"
              className="tracking-[0.2em] uppercase text-[11px] text-[#C86B4A] hover:text-[#172B3A] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>EXPLORE OUR EXPANSION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
