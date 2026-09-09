import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

export function SectionDivider() {
  return (
    <section className="relative z-20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Decorative botanical badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFEA] text-[#172B3A] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
        EXPLORE THE WORLD OF VILLAGE DELI
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#172B3A] tracking-tight">
        Everyday Convenience. Extraordinary Experience.
      </h2>

      <p className="mt-3 text-sm sm:text-base text-[#202321]/80 max-w-2xl mx-auto font-sans">
        Discover our 6 core offerings, onsite craft experiences, expanding North India store network, and strategic partnership avenues below.
      </p>

      {/* Elegant linen/gold divider rule */}
      <div className="mt-8 flex items-center justify-center gap-4 max-w-xs mx-auto">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C86B4A]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#C86B4A]"></div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C86B4A]"></div>
      </div>
    </section>
  );
}
