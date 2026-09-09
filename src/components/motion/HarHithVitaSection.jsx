import React from 'react';
import { ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EXPANSION } from '../../data/expansion';

export function HarHithVitaSection() {
  const { collaboration } = EXPANSION;

  return (
    <section className="py-24 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5]">
      <div className="max-w-5xl mx-auto px-6 text-left">
        <div className="rounded-[36px] bg-white border border-[#E5D8C5] p-8 sm:p-14 shadow-xl space-y-8 relative overflow-hidden">
          
          {/* Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#A8B29B]/10 rounded-bl-[100px] pointer-events-none" />

          {/* Badge & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D8C5]/60 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2.5 bg-white p-2 rounded-2xl border border-[#E5D8C5] shadow-md">
                <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-9 w-auto object-contain rounded" />
                <div className="h-7 w-px bg-gray-300" />
                <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-9 w-auto object-contain rounded" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                  Strategic State Alliance
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#172B3A]">
                  {collaboration.title}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-semibold text-[#172B3A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>{collaboration.subtitle}</span>
            </div>
          </div>

          {/* Narrative Content from PDF Page 11 */}
          <div className="space-y-4 text-base sm:text-lg text-[#202321]/85 leading-relaxed font-normal">
            <p className="font-medium text-[#172B3A]">
              {collaboration.narrative}
            </p>
            <p className="text-sm sm:text-base text-[#202321]/75">
              {collaboration.vision}
            </p>
          </div>

          {/* Slogan Banner */}
          <div className="p-5 rounded-2xl bg-[#172B3A] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <span className="font-serif text-base sm:text-lg font-bold text-[#C86B4A] italic">
              "{collaboration.banner}"
            </span>
            <span className="text-xs font-mono text-[#E5D8C5]/80">
              Haryana State Footprint
            </span>
          </div>

          {/* Preserved Confirmation Note per PDF Page 11 */}
          <div className="p-4 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs text-[#202321]/75 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#A8B29B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#172B3A]">Documentation Notice (PDF Page 11):</strong> {collaboration.legalNotice}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
