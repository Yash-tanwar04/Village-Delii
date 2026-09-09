import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { BRAND } from '../../data/brand';

export function FinalBrandStatement() {
  const promiseTenets = [
    { label: 'Built for People', sub: 'Designed for Life' },
    { label: 'Trusted Today', sub: 'Leading Tomorrow' },
    { label: 'Scalable & Sustainable', sub: 'Community Driven' },
    { label: 'Local at Heart', sub: 'Future in Mind' },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#172B3A] text-white relative overflow-hidden border-b border-[#E5D8C5]/15 text-center">
      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Editorial Eyebrow */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
            THE VILLAGE DELI PROMISE
          </span>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white select-none">
            Always Here <span className="italic text-[#C86B4A] font-medium">For You.</span>
          </h2>
        </div>

        {/* Core Statement from PDF Page 16 */}
        <p className="text-base sm:text-lg text-[#E5D8C5]/90 max-w-2xl mx-auto leading-relaxed font-light">
          More than a store. It's a promise of convenience, quality, and care — wherever you are, whatever the hour.
        </p>

        {/* 4 Tenets from PDF Page 16 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-y border-white/10 py-6 text-center">
          {promiseTenets.map((tenet, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white">
                {tenet.label}
              </h4>
              <p className="text-[11px] font-mono text-[#C86B4A] uppercase tracking-wider">
                {tenet.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Final Clean CTAs */}
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            to="/about"
            className="px-7 py-3 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-semibold text-xs sm:text-sm tracking-wider transition-colors flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Know More About Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/locations"
            className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm transition-colors border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C86B4A]" />
            <span>Find a Location</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
