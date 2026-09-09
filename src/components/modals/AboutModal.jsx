import React from 'react';
import { X, ShieldCheck, Heart, Sparkles, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { useStore } from '../../store/useStore';

export function AboutModal() {
  const closeModal = useStore((state) => state.closeModal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F7F4ED] rounded-3xl shadow-2xl border border-[#C86B4A]/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#C86B4A]/30 flex items-center justify-between bg-[#EFEBE3]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A] mb-1">
              ABOUT VILLAGE DELI
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#172B3A]">
              {BRAND.aboutIntro.title}
            </h2>
            <p className="text-xs text-[#202321]/75 font-serif italic">
              “{BRAND.aboutIntro.motto}”
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-[#C86B4A] hover:text-white flex items-center justify-center text-[#172B3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section 1: The Core Philosophy */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#172B3A]">
              Making Everyday Living Easier
            </h3>
            <p className="text-xs sm:text-sm text-[#202321]/85 leading-relaxed">
              {BRAND.aboutIntro.description}
            </p>
            <p className="text-xs sm:text-sm text-[#202321]/85 leading-relaxed">
              {BRAND.aboutIntro.callout}
            </p>
          </div>

          {/* Section 2: Why Village Deli, Why Now? (Page 6) */}
          <div className="space-y-4 pt-4 border-t border-[#C86B4A]/20">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#172B3A]">
                {BRAND.whyNow.title}
              </h3>
              <p className="text-xs text-[#202321]/80 mt-1">
                {BRAND.whyNow.lead}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {BRAND.whyNow.pillars.map((pillar) => (
                <div key={pillar.id} className="p-4 rounded-2xl bg-white border border-[#C86B4A]/30 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-[#172B3A]">{pillar.title}</div>
                  <p className="text-[11px] text-[#202321]/70">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: What Makes Us Different? (Page 10) */}
          <div className="space-y-4 pt-4 border-t border-[#C86B4A]/20">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#172B3A]">
                {BRAND.differentiators.title}
              </h3>
              <p className="text-xs text-[#202321]/80 mt-1">
                {BRAND.differentiators.lead}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BRAND.differentiators.items.map((diff, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-[#C86B4A]/25 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C86B4A] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#172B3A]">{diff.title}</div>
                    <div className="text-[11px] text-[#202321]/70">{diff.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Built for the Way North India Lives & Our Promise (Pages 15 & 16) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#C86B4A]/20">
            <div className="p-5 rounded-2xl bg-[#E8EFEA]/60 border border-[#A8B29B]/30 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#172B3A]">
                {BRAND.northIndiaVision.title}
              </h4>
              <p className="text-xs text-[#202321]/80 leading-relaxed">
                {BRAND.northIndiaVision.vision}
              </p>
              <div className="space-y-1.5 pt-2">
                {BRAND.northIndiaVision.pyramid.map((lvl, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/70">
                    <span className="font-bold text-[#172B3A]">{lvl.level}</span>
                    <span className="text-[11px] text-[#A8B29B]">{lvl.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFF4E5]/80 border border-[#C86B4A]/40 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#172B3A]">
                {BRAND.promise.title}
              </h4>
              <p className="text-xs font-serif italic text-[#C86B4A]">
                “{BRAND.promise.statement}”
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-[#172B3A]">
                {BRAND.promise.pillars.map((pil, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]"></span>
                    <span>{pil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
