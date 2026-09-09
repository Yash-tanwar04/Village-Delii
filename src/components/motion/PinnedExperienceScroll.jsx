import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Wheat, Droplets, Flame, Zap, Coffee, CheckCircle2, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PinnedExperienceScroll() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const rituals = [
    {
      step: '01',
      title: 'Freshly Ground',
      tagline: 'Onsite Stone-Chakki Milling',
      description:
        'Live traditional stone milling grinding premium MP Sharbati whole wheat flour on demand. Nutrient-dense, completely unadulterated, and tailored to daily household needs.',
      details: ['Stone-chakki live milling', 'MP Sharbati whole wheat', 'Zero preservatives or bleaches', 'Fresh custom daily batches'],
      metric: { label: 'Purity Standard', val: '100%', sub: 'Whole Grain Nutrient Retention' },
      image: '/assets/images/store-interior.jpg',
      aspect: 'Flour & Grains',
      icon: Wheat,
    },
    {
      step: '02',
      title: 'Freshly Pressed',
      tagline: 'Cold Extraction Pure Juice',
      description:
        '100% natural, freshly cold-pressed citrus, sugarcane, and seasonal fruits with zero added sugar or chemical preservatives. Pure natural vitality crafted right before your eyes.',
      details: ['Pure raw cold extraction', 'Zero added sugars or syrups', 'Immediate pour freshness', 'Nutrient-rich seasonal fruit'],
      metric: { label: 'Extraction Temp', val: '4°C', sub: 'Cold-Pressed Enzyme Integrity' },
      image: '/assets/images/hero-scenery.jpg',
      aspect: 'Juices & Press',
      icon: Droplets,
    },
    {
      step: '03',
      title: 'Freshly Baked',
      tagline: 'Live Daily Oven Craft',
      description:
        'Warm sourdough loaves, crusty European baguettes, buttery French croissants, and regional spiced tea rusks baking in live store ovens continuously from early dawn.',
      details: ['Live in-store stone deck ovens', 'Crusty sourdough & brioche', 'Morning & evening fresh batches', 'Golden crust & aroma guarantee'],
      metric: { label: 'Oven Warmth', val: '240°C', sub: 'Stone Deck Daily Crust Craft' },
      image: '/assets/images/store-approach.jpg',
      aspect: 'Bakery & Ovens',
      icon: Flame,
    },
    {
      step: '04',
      title: 'Quick & Convenient',
      tagline: 'Frictionless Grab-and-Go',
      description:
        'Chef-crafted gourmet deli wraps, toasted panini sandwiches, wholesome protein grain bowls, and instant refreshments designed for highway travellers and busy families.',
      details: ['Chef-crafted daily bowls', 'Freshly packed artisan wraps', 'Frictionless rapid checkout', 'Highway & commuter ready'],
      metric: { label: 'Checkout Pace', val: '< 60s', sub: 'Frictionless Grab & Journey' },
      image: '/assets/images/store-night.jpg',
      aspect: 'Fast Delights',
      icon: Zap,
    },
    {
      step: '05',
      title: 'Relax & Refresh',
      tagline: 'Oak Lounge & Barista Hospitality',
      description:
        'Modern solid oak seating, high-speed connectivity, sparkling clean hygienic amenities, and barista-pulled specialty espresso to rejuvenate on your journey.',
      details: ['Barista-pulled espresso & chai', 'Comfortable solid oak seating', 'Immaculate travel rest stop', 'Welcoming community sanctuary'],
      metric: { label: 'Hospitality Roast', val: 'Specialty', sub: '100% Arabica Barista Pull' },
      image: '/assets/images/ghibli-day.jpg',
      aspect: 'Oak Lounge',
      icon: Coffee,
    },
  ];

  // GSAP ScrollTrigger: Refined snappy scroll distance (+=900px total, ~180px per card)
  // Cards switch promptly with a light flick of the wheel without feeling sluggish!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=900', // Refined concise scroll distance (snappy response!)
        pin: true,
        pinSpacing: true,
        scrub: 0.1, // Near-instantaneous response
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          const newIdx = Math.min(rituals.length - 1, Math.floor(p * rituals.length));
          setActiveIdx(newIdx);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [rituals.length]);

  const current = rituals[activeIdx];
  const CurrentIcon = current.icon;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[620px] bg-[#F7F4ED] text-[#202321] py-6 sm:py-8 px-6 overflow-hidden border-b border-[#E5D8C5] flex flex-col justify-between select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#172B3A]/10 text-left shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172B3A]/5 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#C86B4A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / SENSORY ATELIER PINNED SCROLL</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B3A]">
              The Village Deli Experience
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#172B3A] text-white">
              <span className="text-[#C86B4A] font-bold">Ritual 0{activeIdx + 1} / 05</span>
              <span className="text-white/40">•</span>
              <span className="uppercase text-[#E5D8C5] font-semibold">{current.aspect}</span>
            </div>

            <span className="hidden md:inline-block text-[#202321]/60 bg-white px-3 py-1.5 rounded-full border border-[#E5D8C5]">
              Scroll to step through ↓
            </span>
          </div>
        </div>

        {/* Horizontal Interactive Ritual Progress Pills */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 my-2 text-left shrink-0">
          {rituals.map((r, idx) => {
            const Icon = r.icon;
            const isActive = activeIdx === idx;
            return (
              <button
                key={r.step}
                onClick={() => setActiveIdx(idx)}
                className={'p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between relative overflow-hidden ' +
                  (isActive
                    ? 'bg-[#172B3A] text-white border-[#172B3A] shadow-md -translate-y-0.5'
                    : 'bg-white/80 border-[#E5D8C5] text-[#172B3A] hover:bg-white')}
              >
                <div className="truncate">
                  <span className={'font-mono text-[10px] font-bold block ' + (isActive ? 'text-[#C86B4A]' : 'text-[#202321]/50')}>
                    0{idx + 1}
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm font-bold truncate leading-tight">{r.title}</h4>
                </div>
                <Icon className={'w-3.5 h-3.5 shrink-0 ml-1 ' + (isActive ? 'text-[#C86B4A]' : 'text-[#172B3A]/60')} />

                {/* Bottom Active Indicator Line */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C86B4A]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Sensory Stage Box */}
        <div className="relative rounded-[24px] overflow-hidden border border-[#172B3A]/15 bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 text-left flex-1 min-h-[300px] mb-2">
          {/* Left: Narrative & Sensory Details */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86B4A]">
                  RITUAL {current.step} OF 05
                </span>
                <span className="text-[#172B3A]/30">•</span>
                <span className="text-xs font-mono text-[#202321]/60 uppercase tracking-wider">
                  {current.tagline}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#172B3A] leading-tight">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-[#202321]/80 font-light leading-relaxed max-w-xl">
                {current.description}
              </p>
            </div>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#172B3A]/10">
              {current.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#172B3A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C86B4A] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>

            {/* Sensory Metric & Read Story Link */}
            <div className="pt-3 border-t border-[#172B3A]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#172B3A]/5 border border-[#172B3A]/15 flex items-center justify-center text-[#C86B4A]">
                  <CurrentIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#172B3A] block">
                    {current.metric.label}: {current.metric.val}
                  </span>
                  <span className="text-[10px] text-[#202321]/60 font-mono block">
                    {current.metric.sub}
                  </span>
                </div>
              </div>

              <Link
                to="/experience"
                className="px-4 py-2 rounded-full bg-[#172B3A] text-white hover:bg-[#C86B4A] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>Read Story</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Atmosphere Image Frame */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden bg-[#172B3A]">
            {rituals.map((r, idx) => (
              <img
                key={r.step}
                src={r.image}
                alt={r.title}
                className={'absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ' +
                  (activeIdx === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none')}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/90 via-transparent to-black/20 pointer-events-none" />

            {/* Floating corner label */}
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between z-10 pointer-events-none">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] block mb-0.5">
                  {current.aspect}
                </span>
                <h4 className="font-serif text-lg font-bold">{current.title}</h4>
              </div>
              <span className="font-serif text-2xl italic text-[#E5D8C5]/70">
                0{activeIdx + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom subtle footer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#202321]/50 pt-1 shrink-0">
          <span>SCROLL WHEEL ADVANCES CARDS SNAPPILY</span>
          <span className="text-[#C86B4A] font-bold">5 ONSITE CRAFT FOCUS AREAS</span>
        </div>
      </div>
    </section>
  );
}
