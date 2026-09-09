import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, ArrowRight, CheckCircle2, Building, Fuel, TrendingUp, Landmark, Sparkles, ArrowUpRight, ShieldCheck, Mail, Eye } from 'lucide-react';
import { PARTNERS_DATA } from '../data/partners';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

export function PartnerPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const partnerImages = [
    '/assets/images/store-approach.jpg',
    '/assets/images/store-night.jpg',
    '/assets/images/store-interior.jpg',
    '/assets/images/ghibli-day.jpg',
  ];

  const partnerIcons = [Building, Fuel, TrendingUp, Landmark];

  const partnerFootprints = [
    '2,500 – 6,000 SQ. FT. · PRIME EXPRESSWAYS & TRANSIT NODES',
    '1,800 – 4,500 SQ. FT. · 24/7 HIGHWAY FUEL ARTERIES',
    '3,000 – 8,000 SQ. FT. · HIGH-DENSITY COMMERCIAL PLAZAS',
    'CUSTOM NODES · STATE COOPERATIVES & CIVIC NETWORKS',
  ];

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      {/* ── TOP EDITORIAL ANCHOR ── */}
      <section className="pt-32 pb-20 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#C86B4A]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>06 / COMMERCIAL ALLIANCES</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.2rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>Partner With</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.12}>Village Deli.</TextReveal>
                </span>
              </h1>
              <p className="font-serif text-2xl sm:text-3xl text-[#C86B4A] italic font-medium">
                "{PARTNERS_DATA.subtitle}"
              </p>
              <p className="text-base sm:text-lg text-[#202321]/80 font-light max-w-2xl pt-1 leading-relaxed">
                {PARTNERS_DATA.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right font-mono text-xs text-[#202321]/70 space-y-1">
              <div className="text-[#C86B4A] font-bold text-sm">4 COMMERCIAL TRACKS</div>
              <div>HOVER TO EXPLORE LEASE MODELS & ADVANTAGES</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK SELECTOR STRIP (RESPONSIVE ON HOVER) ── */}
      <div className="sticky top-20 z-30 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#E5D8C5] py-3.5 px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold mr-2">
              Explore Track:
            </span>
            {PARTNERS_DATA.categories.map((cat, idx) => {
              const Icon = partnerIcons[idx];
              const isActive = activeIdx === idx;
              return (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={'px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ' +
                    (isActive
                      ? 'bg-[#172B3A] text-white font-bold shadow-md scale-105'
                      : 'bg-white border border-[#E5D8C5] text-[#172B3A] hover:bg-[#E5D8C5]/60')}
                >
                  <Icon className={'w-3.5 h-3.5 ' + (isActive ? 'text-[#C86B4A]' : 'text-[#172B3A]')} />
                  <span>0{idx + 1}. {cat.title}</span>
                </button>
              );
            })}
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#202321]/60">
            <Eye className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>Hover over any track below to reveal details</span>
          </div>
        </div>
      </div>

      {/* ── 4 HOVER-REVEAL EDITORIAL TRACKS ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-left">
        <div className="mb-10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
              Commercial Partnership Tracks
            </span>
            <span className="text-xs font-mono text-[#202321]/50 hidden sm:inline">
              [ HOVER REVEAL ACTIVATED ]
            </span>
          </div>
          <p className="text-xs font-mono text-[#202321]/70">
            Glide your cursor over any tier to inspect architectural suitability, commercial advantages, and photo previews.
          </p>
        </div>

        <div className="border-t border-[#172B3A]/20 divide-y divide-[#172B3A]/15">
          {PARTNERS_DATA.categories.map((cat, idx) => {
            const isExpanded = activeIdx === idx;
            const Icon = partnerIcons[idx];

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={'card-pop group py-8 sm:py-10 cursor-pointer rounded-2xl px-6 my-2 ' +
                  (isExpanded
                    ? 'bg-white shadow-xl border border-[#172B3A]/15 ring-1 ring-[#C86B4A]/20 -translate-y-0.5'
                    : 'bg-white/40 hover:bg-white/80 opacity-75 hover:opacity-100 border border-transparent')}
              >
                {/* Header Row with Micro-Interactions */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-baseline gap-4 sm:gap-8">
                    <span className={'font-mono text-sm sm:text-base font-bold transition-colors duration-300 ' +
                      (isExpanded ? 'text-[#C86B4A]' : 'text-[#172B3A]/40 group-hover:text-[#C86B4A]')}>
                      0{idx + 1} / TRACK
                    </span>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172B3A] group-hover:text-[#C86B4A] transition-colors duration-300">
                          {cat.title}
                        </h3>
                        {isExpanded && (
                          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#C86B4A]/10 text-[#C86B4A] font-bold border border-[#C86B4A]/30">
                            Active Preview
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-[#202321]/70">
                        {cat.description}
                      </p>
                      <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-[#202321]/50 uppercase">
                        <span>{partnerFootprints[idx]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div
                      className={'w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ' +
                        (isExpanded
                          ? 'bg-[#C86B4A] border-[#C86B4A] text-white rotate-12 scale-110 shadow-md'
                          : 'border-[#172B3A]/20 text-[#172B3A] group-hover:border-[#C86B4A] group-hover:text-[#C86B4A]')}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Hover-Revealed Drawer Details */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-[#172B3A]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in transition-all duration-500">
                    {/* Left: Detailed Criteria & Benefits */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                          Ideal Property & Partner Profile
                        </span>
                        <p className="text-base text-[#202321]/85 font-light leading-relaxed">
                          {cat.suitableFor}
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#172B3A] font-bold block">
                          Key Commercial Advantages
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {cat.benefits.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#202321]/85 font-light p-2 rounded-lg bg-[#F7F4ED]/60 border border-[#E5D8C5]/50">
                              <CheckCircle2 className="w-4 h-4 text-[#C86B4A] shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                        {idx === 3 && (
                          <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#E5D8C5] flex items-center gap-4 shadow-xs">
                            <span className="text-[11px] font-mono text-[#172B3A] font-bold uppercase tracking-wider">
                              Model Alliance:
                            </span>
                            <div className="flex items-center gap-2 bg-[#F7F4ED] p-1 rounded-lg border border-[#E5D8C5]">
                              <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-6 w-auto object-contain rounded" />
                              <div className="h-5 w-px bg-gray-300" />
                              <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-6 w-auto object-contain rounded" />
                            </div>
                            <span className="text-[11px] font-mono text-[#202321]/65 hidden sm:inline">
                              Haryana State Institutional Co-op
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <Link
                          to={'/contact?track=' + cat.id}
                          data-cursor="ENQUIRE"
                          className="px-6 py-3 rounded-full bg-[#172B3A] text-[#F7F4ED] hover:bg-[#C86B4A] text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-md hover:scale-105 duration-200"
                        >
                          <span>Initiate Partnership Inquiry</span>
                          <ArrowRight className="w-4 h-4 text-[#C86B4A]" />
                        </Link>
                        <span className="text-xs font-mono text-[#202321]/50">
                          24–48h Commercial Feasibility Review
                        </span>
                      </div>
                    </div>

                    {/* Right: Architectural Photographic Context Frame with Hover Zoom */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden shadow-xl border border-[#E5D8C5] bg-[#172B3A] group/img">
                        <img
                          src={partnerImages[idx]}
                          alt={cat.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/90 via-[#172B3A]/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] block mb-1">
                            Village Deli Architectural Standard
                          </span>
                          <h4 className="font-serif text-lg font-bold">
                            {cat.title}
                          </h4>
                          <span className="text-xs font-mono text-[#E5D8C5]/80 block mt-1">
                            {partnerFootprints[idx]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM STAKEHOLDER CONCIERGE ── */}
      <section className="py-20 bg-[#172B3A] text-white text-center px-6 border-t border-[#E5D8C5]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
            Direct Commercial Concierge
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-bold">
            Looking for a Bespoke Institutional Alliance?
          </h3>
          <p className="text-sm sm:text-base text-[#E5D8C5] max-w-xl mx-auto font-light leading-relaxed">
            Our corporate expansion and real estate acquisitions division evaluates site feasibility within 24–48 hours. Let's discuss turnkey formats and lease terms.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-[#C86B4A] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#b55c3c] hover:text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105 duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Connect With Real Estate & Expansion</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
