import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Heart, Clock, Award, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '../data/brand';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const containerRef = useRef(null);
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous Marquee 1
      gsap.to(marqueeRef1.current, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      // Continuous Marquee 2
      gsap.to(marqueeRef2.current, {
        xPercent: 50,
        duration: 32,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triptych = [
    {
      num: '01',
      title: 'Freshness As A Principle',
      subtitle: 'Onsite Stone Milling & Live Ovens',
      desc: 'We reject warehouse staleness. Flours ground live on stone chakkis, crusty breads straight from store deck ovens, and cold-pressed pure citrus juice crafted in full view.',
      badge: 'UNADULTERATED',
      icon: Sparkles,
    },
    {
      num: '02',
      title: '24/7 Unbroken Certainty',
      subtitle: 'Never Closed, Never Dark',
      desc: 'Whether at 3:00 AM on the Dwarka Expressway or 1:00 PM on the Sohna Corridor, our warm amber lights, clean amenities, and specialty barista espresso never shut down.',
      badge: 'ALWAYS OPEN',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Dignified Everyday Living',
      subtitle: 'Elevated Community Hospitality',
      desc: 'Convenience should not mean compromise. From solid oak lounge seating to certified regional produce and HarHith + Vita alliances, everyday retail is elevated into community sanctuary.',
      badge: 'TRUSTED ALLIANCE',
      icon: ShieldCheck,
    },
  ];

  const comparison = [
    { feature: 'Wheat Flour & Atta', traditional: 'Packaged months ago in distant warehouses', villageDeli: 'Live stone-chakki ground in-store daily on demand' },
    { feature: 'Bakery & Morning Bread', traditional: 'Factory pre-sliced loaves with chemical shelf-extenders', villageDeli: 'Fresh European sourdough & artisanal pastries from live ovens' },
    { feature: 'Operating Hours', traditional: 'Closed by 10:00 PM or unpredictable highway timings', villageDeli: 'Unconditionally open 24/7/365 with staffed security' },
    { feature: 'Customer Lounge & Coffee', traditional: 'Standing vending machine or dusty plastic counters', villageDeli: 'Comfortable solid oak seating, specialty espresso, sparkling restrooms' },
    { feature: 'Produce & Sourcing', traditional: 'Middleman wholesale lots with inconsistent grading', villageDeli: 'Directly audited farm harvests & HarHith government alliances' },
  ];

  return (
    <div ref={containerRef} className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      
      {/* ── 01. GRAND EDITORIAL HERO (FORMAT BACKGROUND #F7F4ED — NAVBAR FULLY VISIBLE) ── */}
      <section className="relative pt-32 pb-20 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-[#C86B4A]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-8 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>01 / THE BRAND MANIFESTO</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.2rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>More Than a Store.</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.15}>A Part of Your Everyday Life.</TextReveal>
                </span>
              </h1>

              <p className="font-serif text-2xl sm:text-3xl text-[#C86B4A] italic font-medium max-w-2xl pt-1">
                "{BRAND.aboutIntro.motto}"
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right space-y-4">
              <p className="text-sm sm:text-base text-[#202321]/80 font-light leading-relaxed max-w-sm ml-auto">
                {BRAND.aboutIntro.concept} {BRAND.aboutIntro.description}
              </p>

              {/* State Alliance Badge with Official Logos */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2.5 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold">STATE ALLIANCE:</span>
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg w-fit ml-auto sm:ml-0 shadow-xs border border-[#E5D8C5]">
                  <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-5 w-auto object-contain rounded" />
                  <div className="h-4 w-px bg-gray-300" />
                  <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-5 w-auto object-contain rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KINETIC MOVING TEXT TICKER BANNER 1 ── */}
      <div className="py-3.5 bg-[#C86B4A] overflow-hidden whitespace-nowrap border-b border-[#172B3A]/20 select-none">
        <div ref={marqueeRef1} className="inline-block will-change-transform">
          {[
            'ALWAYS HERE FOR YOU',
            'FRESH · CONVENIENT · TRUSTED · 24/7',
            'ONSITE STONE-CHAKKI MILLING',
            'LIVE EUROPEAN OVEN BAKES',
            '100% PURE COLD EXTRACTION',
            'OAK LOUNGE SANCTUARY',
            'ALWAYS HERE FOR YOU',
            'FRESH · CONVENIENT · TRUSTED · 24/7',
          ].map((item, idx) => (
            <span key={idx} className="mx-6 inline-flex items-center gap-6 font-serif font-black text-2xl sm:text-3xl text-[#172B3A] tracking-wider">
              <span>{item}</span>
              <span className="text-white/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 02. ETHOS TRIPTYCH: 3 POPPING ARCHITECTURAL CARDS ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-left">
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
            The Three Pillars of Our Ethos
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
            How We Redefine Modern Convenience
          </h2>
          <p className="text-base sm:text-lg text-[#202321]/75 font-light leading-relaxed">
            We asked ourselves what a neighbourhood store should feel like if it were designed from scratch for the lives we actually lead today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {triptych.map((item) => {
            const Icon = item.icon;
            return (
              <CardPop
                key={item.num}
                className="p-8 sm:p-10 rounded-[32px] bg-white border border-[#E5D8C5] shadow-sm flex flex-col justify-between space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#172B3A]/10">
                    <span className="font-mono text-sm font-bold text-[#C86B4A]">
                      {item.num} / ETHOS
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#172B3A]/5 text-[#172B3A] font-semibold group-hover:bg-[#C86B4A] group-hover:text-white transition-colors duration-300">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#172B3A]/5 border border-[#172B3A]/10 flex items-center justify-center text-[#C86B4A] group-hover:bg-[#C86B4A] group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono uppercase tracking-wider text-[#202321]/60">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base leading-relaxed font-light text-[#202321]/80">
                  {item.desc}
                </p>
              </CardPop>
            );
          })}
        </div>
      </section>

      {/* ── 03. THE VILLAGE DELI STANDARD: COMPARISON MATRIX ── */}
      <section className="py-24 bg-[#E5D8C5]/30 border-y border-[#E5D8C5] text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
              The Quality Benchmark
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#172B3A] leading-tight">
              The Village Deli Standard
            </h2>
            <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
              Why settle for pre-packaged staleness when your daily provisions can be ground, pressed, and baked right where you buy them?
            </p>
          </div>

          {/* Clean Editorial Comparison Table (Popping Cards) */}
          <div className="space-y-4">
            {comparison.map((row, idx) => (
              <CardPop
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-4 flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#C86B4A]">0{idx + 1}</span>
                  <h4 className="font-serif text-xl font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">{row.feature}</h4>
                </div>

                <div className="lg:col-span-4 text-xs sm:text-sm text-[#202321]/60 font-light border-l border-[#E5D8C5] pl-4">
                  <span className="text-[10px] font-mono text-[#202321]/40 block uppercase mb-1">Traditional Retail:</span>
                  {row.traditional}
                </div>

                <div className="lg:col-span-4 text-xs sm:text-sm text-[#172B3A] font-semibold bg-[#172B3A]/[0.03] p-3 rounded-xl border-l-2 border-[#C86B4A] group-hover:bg-[#C86B4A]/10 transition-colors">
                  <span className="text-[10px] font-mono text-[#C86B4A] block uppercase mb-1">The Village Deli Way:</span>
                  {row.villageDeli}
                </div>
              </CardPop>
            ))}
          </div>
        </div>
      </section>

      {/* ── KINETIC MOVING TEXT TICKER BANNER 2 ── */}
      <div className="py-3 bg-[#172B3A] overflow-hidden whitespace-nowrap border-b border-[#E5D8C5]/20 select-none">
        <div ref={marqueeRef2} className="inline-block will-change-transform">
          {[
            'HARYANA CORRIDORS',
            'PUNJAB HIGHWAY HERITAGE',
            'HARHITH + VITA ALLIANCE',
            'DWARKA EXPRESSWAY',
            'SOHNA ARTERIAL',
            '24/7 SANCTUARY',
            'HARYANA CORRIDORS',
            'PUNJAB HIGHWAY HERITAGE',
          ].map((item, idx) => (
            <span key={idx} className="mx-6 inline-flex items-center gap-4 font-mono text-xs sm:text-sm text-[#E5D8C5]/80 uppercase tracking-widest">
              <span>{item}</span>
              <span className="text-[#C86B4A]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 04. WHY NOW: 5 STRATEGIC PILLARS (BENTO MODULAR POPPING GRID) ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-left border-b border-[#E5D8C5]">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-mono tracking-widest text-[#C86B4A]">
            <Compass className="w-3.5 h-3.5" />
            <span>02 / STRATEGIC IMPERATIVE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
            {BRAND.whyNow.title}
          </h2>
          <p className="text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed">
            {BRAND.whyNow.lead}
          </p>
        </div>

        {/* Bento Grid with Card Pop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {BRAND.whyNow.pillars.map((pillar, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <CardPop
                key={pillar.id}
                className={(isWide ? 'md:col-span-7' : 'md:col-span-5') + ' p-8 rounded-[28px] bg-white border border-[#E5D8C5] shadow-xs flex flex-col justify-between space-y-6'}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-[#C86B4A]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#172B3A]/5 text-[#172B3A] group-hover:bg-[#C86B4A] group-hover:text-white transition-colors duration-300">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#172B3A]/10 flex items-center justify-between text-xs font-mono text-[#C86B4A]">
                  <span>VILLAGE DELI PILLAR</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardPop>
            );
          })}
        </div>
      </section>

      {/* ── 05. REGIONAL PROMISE & NORTH INDIA BLUEPRINT ── */}
      <section className="py-24 bg-[#172B3A] text-white text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
              03 / THE REGIONAL COMMITMENT
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F7F4ED] leading-tight">
              {BRAND.promise.title}
            </h2>
            <p className="font-serif text-xl sm:text-2xl italic text-[#C86B4A]">
              "{BRAND.promise.subtitle}"
            </p>
            <p className="text-base text-[#E5D8C5] leading-relaxed font-light">
              {BRAND.promise.statement}
            </p>
          </div>

          {/* 4 Popping Promise Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND.promise.pillars.map((item, idx) => (
              <CardPop key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:bg-white/10">
                <span className="text-xs font-mono text-[#C86B4A] font-bold block">
                  PROMISE 0{idx + 1}
                </span>
                <h4 className="font-serif text-xl font-bold text-white leading-snug">
                  {item}
                </h4>
              </CardPop>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-8 border-t border-white/20 flex flex-wrap gap-4">
            <Link
              to="/offerings"
              className="px-8 py-3.5 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <span>Explore What We Offer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/locations"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2 hover:scale-105"
            >
              <span>Find Nearest 24/7 Store</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
