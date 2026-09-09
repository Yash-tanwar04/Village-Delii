import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { BRAND } from '../../data/brand';

export function FinalBrandStatement() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-28 bg-[#172B3A] text-white relative overflow-hidden border-b border-[#E5D8C5]/20 text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C86B4A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Massive Brand Typographic Crown */}
        <div className="space-y-2">
          <h2 className="font-serif font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] text-white select-none">
            ALWAYS
          </h2>
          <h2 className="font-serif italic font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] text-[#C86B4A] select-none">
            HERE
          </h2>
          <h2 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white select-none">
            FOR YOU.
          </h2>
        </div>

        {/* Core Statement */}
        <p className="text-base sm:text-xl text-[#E5D8C5] max-w-2xl mx-auto leading-relaxed pt-4 font-normal">
          {BRAND.coreBrandStatement.statement}
        </p>

        {/* Signature Badges Joined */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base font-serif font-bold tracking-widest text-[#C86B4A] pt-2">
          <span>FRESH</span>
          <span className="text-white/40">•</span>
          <span>CONVENIENT</span>
          <span className="text-white/40">•</span>
          <span>TRUSTED</span>
          <span className="text-white/40">•</span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs">
            24/7
          </span>
        </div>

        {/* Final CTAs */}
        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/offerings"
            className="px-8 py-3.5 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Explore Village Deli</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/locations"
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C86B4A]" />
            <span>Find a Location</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
