import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── 01. Hero → Brand Manifesto ──────────────────────────────────────────
   Central spine dot + outward rule. Tight vertical footprint.
──────────────────────────────────────────────────────────────────────────── */
export function DividerHeroToManifesto() {
  const lineLeftRef  = useRef(null);
  const lineRightRef = useRef(null);
  const nodeRef      = useRef(null);
  const labelRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: nodeRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      });
      tl.from(nodeRef.current,  { scale: 0, duration: 0.4, ease: 'back.out(2)' })
        .from([lineLeftRef.current, lineRightRef.current], { scaleX: 0, duration: 0.7, stagger: 0.04, ease: 'power3.out' }, '-=0.15')
        .from(labelRef.current, { opacity: 0, y: 6, duration: 0.4 }, '-=0.3');
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-[#F7F4ED] pt-4 pb-5 overflow-hidden">
      {/* Incoming spine from hero */}
      <div className="w-px h-8 mx-auto bg-gradient-to-b from-[#C86B4A]/80 to-[#C86B4A]/30 mb-1" />

      <div className="max-w-7xl mx-auto px-6 flex items-center">
        <div ref={lineLeftRef}
          className="flex-1 h-px origin-right"
          style={{ background: 'linear-gradient(to left, rgba(23,43,58,0.35), transparent)' }} />

        <div ref={nodeRef}
          className="mx-4 flex items-center gap-2 px-3 py-1 rounded-full border border-[#C86B4A]/45 bg-white/85 text-[11px] font-mono tracking-widest text-[#172B3A] shadow-xs whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A] animate-pulse" />
          <span className="font-bold">01 / BRAND ETHOS</span>
          <span className="text-[#C86B4A]">•</span>
          <span className="text-[10px] text-[#C86B4A] font-bold">ALWAYS HERE FOR YOU ✦</span>
        </div>

        <div ref={lineRightRef}
          className="flex-1 h-px origin-left"
          style={{ background: 'linear-gradient(to right, rgba(23,43,58,0.35), transparent)' }} />
      </div>

      <div ref={labelRef} className="text-center mt-1.5">
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#202321]/45">
          FRESH · CONVENIENT · TRUSTED · 24/7
        </span>
      </div>
    </div>
  );
}

/* ─── 02. Brand Manifesto → Pinned Experience ─────────────────────────────
   Horizontal kinetic ticker. Single border line above & below.
──────────────────────────────────────────────────────────────────────────── */
export function DividerManifestoToExperience() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(tickerRef.current, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: tickerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-[#F7F4ED] border-y border-[#172B3A]/13 py-3 overflow-hidden">
      <div ref={tickerRef}
        className="whitespace-nowrap flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.22em] text-[#172B3A]/65 font-semibold will-change-transform">
        {[
          '02 / THE EXPERIENCE',
          'STONE GROUND CHAKKI',
          'COLD PRESSED CITRUS',
          'LIVE ARTISANAL OVEN',
          'QUICK & CONVENIENT',
          'OAK SEATING & BARISTA',
          'ALWAYS OPEN 24/7',
          '02 / THE EXPERIENCE',
          'STONE GROUND CHAKKI',
          'LIVE ARTISANAL OVEN',
        ].map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            <span className="text-[#C86B4A]">✦</span>
          </React.Fragment>
        ))}
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
