import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Wheat, 
  Droplets, 
  Flame, 
  Zap, 
  Coffee, 
  CheckCircle2,
  Clock,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ExperiencePage() {
  const [activePillar, setActivePillar] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const showcaseRef = useRef(null);

  const pillars = [
    {
      num: '01',
      title: 'Freshly Ground, On Demand',
      shortTitle: 'Freshly Ground',
      tagline: 'Authentic stone-milled freshness',
      craftBadge: 'STONE CHAKKI MILLING',
      desc: 'Experience the aroma and taste of freshly ground flours and spices, prepared right in front of you on our onsite traditional stone chakkis.',
      sensoryNotes: ['Onsite Stone Chakki', '100% Whole Grains', 'Zero Additives / Preservatives'],
      icon: Wheat,
      image: '/assets/images/ghibli-produce.jpg',
    },
    {
      num: '02',
      title: 'Freshly Pressed, Every Day',
      shortTitle: 'Freshly Pressed',
      tagline: '100% pure fruit & sugarcane extraction',
      craftBadge: 'COLD EXTRACTION',
      desc: 'Cold-pressed juices and fresh sugarcane juice squeezed live—100% natural, unadulterated, with zero added sugar or preservatives.',
      sensoryNotes: ['Pure Sugarcane & Citrus', 'Cold-Chain Preserved', '100% Raw & Unpasteurized'],
      icon: Droplets,
      image: '/assets/images/ghibli-store-front.jpg',
    },
    {
      num: '03',
      title: 'Freshly Baked, All Day Long',
      shortTitle: 'Freshly Baked',
      tagline: 'Warm crusts straight from live deck ovens',
      craftBadge: 'LIVE DECK OVEN',
      desc: 'Warm, crusty artisanal breads and delectable morning pastries baked fresh in our in-store deck ovens throughout the day.',
      sensoryNotes: ['Artisanal Sourdough & Loaves', 'Warm Morning Pastries', 'Baked Throughout The Day'],
      icon: Flame,
      image: '/assets/images/ghibli-bakery.jpg',
    },
    {
      num: '04',
      title: 'Quick, Easy & Convenient',
      shortTitle: 'Quick & Easy',
      tagline: 'Frictionless everyday efficiency',
      craftBadge: 'GRAB & GO DELI',
      desc: 'Grab what you need and be on your way in minutes, with fast checkouts, intuitive layouts, and grab-and-go convenience.',
      sensoryNotes: ['Chef-Crafted Sandwiches', 'Express Self-Checkouts', 'Designed For Commuters'],
      icon: Zap,
      image: '/assets/images/ghibli-transit.jpg',
    },
    {
      num: '05',
      title: 'Relax, Refresh & Recharge',
      shortTitle: 'Relax & Recharge',
      tagline: 'Welcoming community sanctuary',
      craftBadge: '24/7 SANCTUARY',
      desc: 'Comfortable seating, clean restrooms, and a welcoming atmosphere that makes every stop feel like a breath of fresh air.',
      sensoryNotes: ['Dedicated Seating Lounge', 'Spotless Sanitized Restrooms', 'Safe & Well-Lit 24/7'],
      icon: Coffee,
      image: '/assets/images/ghibli-cafe.jpg',
    },
  ];

  const activePillarRef = useRef(0);
  activePillarRef.current = activePillar;

  const isAnimatingRef = useRef(false);
  const scrollTriggerRef = useRef(null);

  const getNavH = () => {
    const rootH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'));
    return !isNaN(rootH) && rootH > 0 ? rootH : 72;
  };

  const jumpToPillar = (idx) => {
    if (idx < 0 || idx >= pillars.length) return;
    setActivePillar(idx);
    const targetProgress = (idx + 0.5) / pillars.length;
    setScrollProgress(targetProgress);
    const st = scrollTriggerRef.current;
    if (st) {
      const targetY = st.start + targetProgress * (st.end - st.start);
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  // ── GSAP ScrollTrigger: Lock screen & Calibrated Scroll Reveal ──
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: 'experience-scroll-lock',
        trigger: container,
        start: () => `top ${getNavH()}px`,
        end: '+=750',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          // 5 pillars evenly distributed across the 750px pin distance (150px per pillar)
          // 0.00 - 0.20 -> Pillar 0
          // 0.20 - 0.40 -> Pillar 1
          // 0.40 - 0.60 -> Pillar 2
          // 0.60 - 0.80 -> Pillar 3
          // 0.80 - 1.00 -> Pillar 4
          const idx = Math.min(pillars.length - 1, Math.floor(p * pillars.length));
          if (activePillarRef.current !== idx) {
            setActivePillar(idx);
          }
        },
      });
      scrollTriggerRef.current = st;
    }, container);

    return () => {
      ctx.revert();
    };
  }, [pillars.length]);

  return (
    <div className="bg-[#F7F4ED] text-[#202321] min-h-screen">
      
      {/* ── 01. EDITORIAL HERO ── */}
      <section
        style={{ paddingTop: 'calc(var(--navbar-height, 72px) + 2rem)' }}
        className="pb-10 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
              03 / THE VILLAGE DELI EXPERIENCE
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#172B3A] leading-tight">
              Everyday Convenience.
              <span className="block italic text-[#C86B4A] font-medium mt-1">
                Extraordinary Experience.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#202321]/80 font-light leading-relaxed pt-1">
              At Village Deli, we've designed our stores to offer more than just quick shopping. Experience fresh in-store preparation and a welcoming space to relax and recharge round the clock.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. PINNED / LOCKED SCROLL-REVEAL SHOWCASE ── */}
      <section
        ref={showcaseRef}
        id="experience-cards-showcase"
        style={{ height: 'calc(100vh - var(--navbar-height, 72px))' }}
        className="relative w-full min-h-[580px] flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 lg:px-12 bg-[#F7F4ED] overflow-hidden select-none text-left border-b border-[#E5D8C5]"
      >
        {/* Top Pinned Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5D8C5] pb-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C86B4A] animate-pulse" />
              <span>Scroll-Reveal Showcase</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#172B3A] mt-0.5">
              Crafted in View. Always Fresh.
            </h2>
          </div>

          {/* Progress Tracker & Status */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5D8C5] shadow-xs">
              <span className="font-bold text-[#C86B4A]">0{activePillar + 1}</span>
              <span className="text-[#202321]/30">/</span>
              <span className="text-[#202321]/60">05</span>
              <span className="text-[#202321]/20">•</span>
              <span className="text-[11px] uppercase tracking-wider text-[#172B3A] font-semibold">
                {pillars[activePillar].shortTitle}
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-24 h-1.5 rounded-full bg-[#172B3A]/10 overflow-hidden">
                <div 
                  className="h-full bg-[#C86B4A] transition-all duration-150 rounded-full"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-[#202321]/50 font-mono">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* ── DESKTOP & TABLET HORIZONTAL ACCORDION (md and up) ── */}
        <div className="hidden md:flex gap-3 flex-1 my-3 min-h-[420px] max-h-[560px] select-none">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isExpanded = activePillar === idx;

            return (
              <div
                key={pillar.num}
                onClick={() => jumpToPillar(idx)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-[flex,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded
                    ? 'flex-[4.2] shadow-2xl border border-[#172B3A] bg-[#172B3A]'
                    : 'flex-1 bg-[#FBF9F4] hover:bg-[#F3EDE2] border border-[#E5D8C5] hover:border-[#C86B4A]/50 shadow-xs'
                }`}
                style={{ minWidth: isExpanded ? '340px' : '72px' }}
              >
                {/* Background Photography with Cinematic Zoom on Open/Close */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700 ease-out ${
                    isExpanded
                      ? 'opacity-100 scale-100 filter-none'
                      : 'opacity-0 scale-110 pointer-events-none'
                  }`}
                />
                
                {/* Editorial Ink Overlay Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#172B3A] via-[#172B3A]/85 to-[#172B3A]/40 z-10 transition-opacity duration-500 ease-out ${
                    isExpanded ? 'opacity-100 pointer-events-none' : 'opacity-0 pointer-events-none'
                  }`}
                />

                {/* ── EXPANDED CARD VIEW LAYER (Orchestrated Staggered Entrance) ── */}
                <div
                  className={`absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-7 text-white z-20 ${
                    isExpanded ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  {/* Top Meta Bar */}
                  <div
                    className={`flex items-center justify-between border-b border-white/15 pb-3 transition-all duration-500 ease-out ${
                      isExpanded
                        ? 'opacity-100 translate-y-0 delay-150'
                        : 'opacity-0 -translate-y-3 duration-250 delay-0'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#C86B4A] text-[#172B3A]">
                        PILLAR {pillar.num}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#E5D8C5] font-semibold">
                        {pillar.craftBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#E5D8C5]/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-[#C86B4A]" />
                      <span>OPEN 24/7</span>
                    </div>
                  </div>

                  {/* Bottom Content Narrative */}
                  <div className="space-y-3.5 max-w-xl">
                    <div
                      className={`space-y-1 transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'opacity-100 translate-y-0 delay-220'
                          : 'opacity-0 translate-y-4 duration-250 delay-0'
                      }`}
                    >
                      <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
                        {pillar.tagline}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <p
                      className={`text-xs sm:text-sm text-[#E5D8C5]/90 font-light leading-relaxed transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'opacity-100 translate-y-0 delay-300'
                          : 'opacity-0 translate-y-3 duration-250 delay-0'
                      }`}
                    >
                      {pillar.desc}
                    </p>

                    {/* Sensory Detail Badges */}
                    <div
                      className={`flex flex-wrap gap-2 pt-1 transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'opacity-100 translate-y-0 delay-360'
                          : 'opacity-0 translate-y-2 duration-200 delay-0'
                      }`}
                    >
                      {pillar.sensoryNotes.map((note, nIdx) => (
                        <span
                          key={nIdx}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/95 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#C86B4A]" />
                          <span>{note}</span>
                        </span>
                      ))}
                    </div>

                    {/* Action CTA */}
                    <div
                      className={`pt-2 transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'opacity-100 translate-y-0 delay-420'
                          : 'opacity-0 translate-y-2 duration-200 delay-0'
                      }`}
                    >
                      <Link
                        to="/locations"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-semibold text-xs tracking-wider transition-colors shadow-sm"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Find Stores With This Craft</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ── COLLAPSED CARD VIEW LAYER (Spine Entrance & Exit) ── */}
                <div
                  className={`absolute inset-0 w-full h-full flex flex-col justify-between items-center py-6 px-3 z-15 transition-all duration-400 ease-out ${
                    isExpanded
                      ? 'opacity-0 scale-90 pointer-events-none duration-150 delay-0'
                      : 'opacity-100 scale-100 delay-250 pointer-events-auto'
                  }`}
                >
                  {/* Top Numeral */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-mono text-sm font-bold text-[#C86B4A]">
                      {pillar.num}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]/60" />
                  </div>

                  {/* Vertical Serif Typography */}
                  <div className="flex-1 flex items-center justify-center w-full my-auto">
                    <span
                      style={{
                        transform: 'rotate(-90deg)',
                        width: 'max-content',
                      }}
                      className="font-serif text-xs lg:text-sm font-bold text-[#172B3A] tracking-widest uppercase select-none block"
                    >
                      {pillar.shortTitle}
                    </span>
                  </div>

                  {/* Bottom Icon */}
                  <div className="w-9 h-9 rounded-full bg-[#172B3A]/5 border border-[#172B3A]/10 flex items-center justify-center text-[#172B3A] group-hover:border-[#C86B4A] transition-colors">
                    <Icon className="w-4 h-4 text-[#C86B4A]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE SCROLL-DRIVEN VIEW (< md) ── */}
        <div className="md:hidden flex-1 my-2 min-h-0 flex flex-col justify-between">
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg border border-[#172B3A] bg-[#172B3A] text-white">
            {pillars.map((pillar, idx) => {
              const isPillarActive = activePillar === idx;
              return (
                <div
                  key={pillar.num}
                  className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out ${
                    isPillarActive
                      ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto z-20'
                      : idx < activePillar
                      ? 'opacity-0 scale-95 -translate-x-8 pointer-events-none z-10'
                      : 'opacity-0 scale-95 translate-x-8 pointer-events-none z-10'
                  }`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A] via-[#172B3A]/85 to-[#172B3A]/40 z-10" />

                  <div className="relative z-20 flex items-center justify-between border-b border-white/15 pb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#C86B4A] text-[#172B3A]">
                      0{idx + 1} / 05
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E5D8C5]">
                      {pillar.craftBadge}
                    </span>
                  </div>

                  <div className="relative z-20 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
                      {pillar.tagline}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#E5D8C5]/90 font-light leading-relaxed line-clamp-3">
                      {pillar.desc}
                    </p>

                    <div className="pt-2">
                      <Link
                        to="/locations"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C86B4A]"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Find Stores With This Craft</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM PILLAR SCRUBBER BAR ── */}
        <div className="pt-3 border-t border-[#E5D8C5] flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            {pillars.map((p, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={p.num}
                  onClick={() => jumpToPillar(idx)}
                  className={'px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ' +
                    (isActive
                      ? 'bg-[#172B3A] text-white font-bold shadow-xs ring-1 ring-[#C86B4A]'
                      : 'bg-white border border-[#E5D8C5] text-[#172B3A]/70 hover:border-[#C86B4A]/50 hover:text-[#172B3A]')}
                >
                  <span className="font-bold text-[#C86B4A]">{p.num}</span>
                  <span className="hidden sm:inline">{p.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-[#202321]/60 flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline">Scroll to cycle through all 5</span>
            <span className="sm:hidden">Scroll to cycle</span>
            <ArrowRight className="w-3 h-3 text-[#C86B4A]" />
          </div>
        </div>
      </section>

      {/* ── 03. THE 24/7 IN-STORE STANDARDS ── */}
      <section className="py-14 bg-white border-b border-[#E5D8C5] px-6 text-left">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
              AUTHENTICITY & SERVICE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
              Our Promise to Every Guest
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-[#E5D8C5] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#172B3A] text-[#C86B4A] flex items-center justify-center font-bold text-xs font-mono">
                01
              </div>
              <h4 className="font-serif text-lg font-bold text-[#172B3A]">
                Live On-Site Craft
              </h4>
              <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                Flours freshly stone-milled, citrus squeezed without concentrate, and loaves baked right before your eyes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-[#E5D8C5] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#172B3A] text-[#C86B4A] flex items-center justify-center font-bold text-xs font-mono">
                02
              </div>
              <h4 className="font-serif text-lg font-bold text-[#172B3A]">
                Frictionless Convenience
              </h4>
              <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                In and out in minutes when you are on the go, with rapid express billing and pre-packaged chef meals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-[#E5D8C5] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#172B3A] text-[#C86B4A] flex items-center justify-center font-bold text-xs font-mono">
                03
              </div>
              <h4 className="font-serif text-lg font-bold text-[#172B3A]">
                Hospitable Sanctuary
              </h4>
              <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
                Clean, climate-controlled, well-lit spaces with comfortable seating and sanitized restrooms open 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. BOTTOM EDITORIAL CTA ── */}
      <section className="py-16 bg-[#172B3A] text-white text-center px-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
            ALWAYS OPEN · ALWAYS READY
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold">
            Experience It Any Hour of the Day or Night
          </h3>
          <p className="text-xs sm:text-sm text-[#E5D8C5]/85 font-light max-w-xl mx-auto leading-relaxed">
            Fresh stone-chakki milling, warm baked breads, cold-pressed juices, and our comfortable lounge are waiting for you 24 hours a day, 7 days a week.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/locations"
              className="px-7 py-3 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-semibold text-xs sm:text-sm tracking-wider transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Find Your Nearest Store</span>
            </Link>
            <Link
              to="/offerings"
              className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm transition-colors border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <span>View What We Offer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
