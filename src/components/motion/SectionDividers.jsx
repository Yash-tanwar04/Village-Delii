import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── 01. Hero → 24/7 Living Window ──────────────────────────────────────
   Seamless, elegant editorial transition line. No empty space or bloat.
──────────────────────────────────────────────────────────────────────────── */
export function DividerHeroToTwentyFour() {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 95%',
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div id="twenty-four-seven" className="relative w-full bg-[#F7F4ED] pt-6 pb-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#C86B4A]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#172B3A] font-bold">
            01 / 24/7 LIVING RHYTHM
          </span>
        </div>
        <div ref={lineRef} className="flex-1 h-px bg-[#172B3A]/15 mx-6" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#202321]/50 hidden sm:inline-block">
          ROUND-THE-CLOCK SANCTUARY
        </span>
      </div>
    </div>
  );
}

/* ─── 03. Pinned Experience → Typographic Offerings ──────────────────────
   Simple section header with drawing rule.
──────────────────────────────────────────────────────────────────────────── */
export function DividerExperienceToOfferings() {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 88%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-[#F7F4ED] pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold block mb-1">
              03 / PRODUCT DIRECTORY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">What We Offer</h3>
          </div>
          <span className="text-xs font-mono text-[#202321]/55">6 CURATED CATEGORIES • ZERO COMPROMISE</span>
        </div>
        <div ref={lineRef} className="w-full h-0.5 bg-[#C86B4A]/55" />
      </div>
    </div>
  );
}

/* ─── 04. Typographic Offerings → 24/7 Window ────────────────────────────
   Color field horizon: Porcelain → Ink Blue, with 24/7 typographic watermark.
──────────────────────────────────────────────────────────────────────────── */
export function DividerOfferingsToTwentyFour() {
  const markRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(markRef.current, {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: markRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #F7F4ED 0%, #1B3244 60%, #172B3A 100%)', paddingTop: '5rem', paddingBottom: '3rem' }}>

      {/* Scrolling watermark */}
      <div ref={markRef}
        className="text-[9rem] sm:text-[14rem] font-serif font-black tracking-tighter text-white/[0.04] leading-none absolute -top-16 left-0 whitespace-nowrap pointer-events-none will-change-transform">
        24 / 7 CONSTANT
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C86B4A] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#C86B4A]">
            04 / THE LIVING RHYTHM
          </span>
          <span className="text-[#E5D8C5]/30">•</span>
          <span className="text-xs font-mono text-[#E5D8C5]/65">NIGHT SHIFT TO DAWN HARVEST</span>
        </div>
        <span className="text-xs font-mono text-[#E5D8C5]/50">NEVER CLOSED · ALWAYS READY ✦</span>
      </div>
    </div>
  );
}

/* ─── 05. 24/7 Window → Explore Directory ───────────────────────────────
   Smooth gradient dawn transition from dark celestial sky to Porcelain.
──────────────────────────────────────────────────────────────────────────── */
export function DividerTwentyFourToExplore() {
  return (
    <div
      className="relative w-full pt-12 pb-6"
      style={{ background: 'linear-gradient(to bottom, #0D1924 0%, #172B3A 25%, #E5D8C5 80%, #F7F4ED 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#172B3A]/20">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C86B4A]" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#172B3A]">
              04 / BRAND DIRECTORY
            </span>
          </div>
          <span className="text-xs font-mono text-[#202321]/65">ALL VILLAGE DELI DIMENSIONS</span>
        </div>
      </div>
    </div>
  );
}
