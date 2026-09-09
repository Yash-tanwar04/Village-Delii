import React, { useEffect, useRef } from 'react';
import { Route, TrendingUp, ShieldCheck, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPANSION } from '../../data/expansion';

gsap.registerPlugin(ScrollTrigger);

export function ExpansionMap() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const haryanaNodeRef = useRef(null);
  const raysRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map route drawing on scroll
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1.2,
          },
        });

        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'power1.inOut',
        })
        .fromTo(
          haryanaNodeRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
          '-=0.3'
        )
        .fromTo(
          raysRef.current.children,
          { opacity: 0, strokeDashoffset: 80 },
          { opacity: 0.6, strokeDashoffset: 0, stagger: 0.1, duration: 0.8 },
          '-=0.2'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expansion"
      ref={containerRef}
      className="py-28 bg-[#F7F4ED] text-[#202321] relative overflow-hidden border-b border-[#E5D8C5]"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-mono uppercase tracking-widest text-[#A8B29B]">
            <TrendingUp className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>Section 06 • Regional Network</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
            {EXPANSION.title}
          </h2>

          <p className="font-serif text-2xl sm:text-3xl text-[#A8B29B] italic font-medium">
            "{EXPANSION.tagline}"
          </p>

          <p className="text-lg font-bold text-[#172B3A]">
            {EXPANSION.subheading}
          </p>

          <p className="text-sm sm:text-base text-[#202321]/80 leading-relaxed max-w-2xl">
            {EXPANSION.description}
          </p>
        </div>

        {/* Abstract Editorial Map Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Animated Abstract Geographic Route SVG */}
          <div className="lg:col-span-7 bg-[#172B3A] rounded-3xl border border-[#E5D8C5] p-6 sm:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-xs font-mono text-[#C86B4A] font-bold">
                REGIONAL CORRIDOR MAP // ABSTRACT
              </span>
              <span className="text-[11px] font-mono text-[#E5D8C5]/60">
                PUNJAB ➔ HARYANA ➔ NORTH INDIA
              </span>
            </div>

            <div className="w-full aspect-[16/11] relative flex items-center justify-center">
              <svg
                viewBox="0 0 540 380"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Regional Outline Contours (Abstract) */}
                <path
                  d="M 120 70 Q 180 40 260 70 T 360 110 T 420 190 T 390 300 T 260 340 T 130 280 T 90 160 Z"
                  fill="rgba(111, 125, 74, 0.08)"
                  stroke="#E5D8C5"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Punjab Territory Anchor */}
                <circle cx="170" cy="110" r="14" fill="#C86B4A" fillOpacity="0.2" />
                <circle cx="170" cy="110" r="6" fill="#C86B4A" />
                <text x="170" y="90" textAnchor="middle" fill="#C86B4A" fontSize="12" fontWeight="bold" fontFamily="serif">
                  Punjab Flagship
                </text>

                {/* Animated Primary Route Line from Punjab to Haryana */}
                <path
                  ref={pathRef}
                  d="M 170 110 C 210 160, 240 180, 290 230"
                  stroke="#C86B4A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Haryana Territory Node (Illuminates) */}
                <g ref={haryanaNodeRef}>
                  <circle cx="290" cy="230" r="28" fill="#A8B29B" fillOpacity="0.25" />
                  <circle cx="290" cy="230" r="16" fill="#A8B29B" fillOpacity="0.5" />
                  <circle cx="290" cy="230" r="7" fill="#F7F4ED" />
                  <text x="290" y="275" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="serif">
                    Haryana Expansion Hub
                  </text>
                  <text x="290" y="292" textAnchor="middle" fill="#C86B4A" fontSize="10" fontFamily="sans-serif">
                    Highways & Townships
                  </text>
                </g>

                {/* Subsequent Radiating Routes towards North India */}
                <g ref={raysRef}>
                  <line x1="290" y1="230" x2="390" y2="190" stroke="#C86B4A" strokeWidth="1.5" strokeDasharray="6 3" />
                  <line x1="290" y1="230" x2="410" y2="270" stroke="#C86B4A" strokeWidth="1.5" strokeDasharray="6 3" />
                  <line x1="290" y1="230" x2="250" y2="320" stroke="#C86B4A" strokeWidth="1.5" strokeDasharray="6 3" />
                </g>
                <text x="415" y="185" fill="#E5D8C5" fontSize="10" fontFamily="monospace">➔ North India Transit</text>
              </svg>
            </div>
          </div>

          {/* Right: Narrative & Strategic Positioning */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E5D8C5] shadow-sm space-y-3">
              <span className="text-xs font-mono text-[#A8B29B] font-bold block">
                Phased Regional Evolution
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#172B3A]">
                Built for High-Growth Arteries
              </h3>
              <p className="text-xs sm:text-sm text-[#202321]/75 leading-relaxed">
                Village Deli connects major highway corridors, daily transit intersections, suburban gated communities, and fast-growing satellite cities.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#172B3A] text-white border border-[#C86B4A]/30 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C86B4A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Strategic Collaboration</span>
              </div>
              <h4 className="font-serif text-xl font-bold">
                {EXPANSION.collaboration.title}
              </h4>
              <p className="text-xs text-[#E5D8C5] leading-relaxed">
                {EXPANSION.collaboration.narrative}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
