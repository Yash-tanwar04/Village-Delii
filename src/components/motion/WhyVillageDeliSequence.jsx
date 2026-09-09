import React, { useEffect, useRef, useState } from 'react';
import { Clock, Sprout, Utensils, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '../../data/brand';

gsap.registerPlugin(ScrollTrigger);

export function WhyVillageDeliSequence() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const pillars = [
    {
      ...BRAND.whyNow.pillars[0],
      number: "01",
      icon: Clock,
      headline: "Round-the-clock access for today's always-on lifestyle.",
      themeColor: "#C86B4A",
      bgClass: "bg-[#172B3A] text-white",
    },
    {
      ...BRAND.whyNow.pillars[1],
      number: "02",
      icon: Sprout,
      headline: "Fresh produce, local staples and products designed around everyday needs.",
      themeColor: "#A8B29B",
      bgClass: "bg-[#202321] text-white",
    },
    {
      ...BRAND.whyNow.pillars[2],
      number: "03",
      icon: Utensils,
      headline: "Quick meals, bakery, beverages and convenient food options.",
      themeColor: "#C86B4A",
      bgClass: "bg-[#172B3A] text-white",
    },
    {
      ...BRAND.whyNow.pillars[3],
      number: "04",
      icon: ShoppingBag,
      headline: "From groceries and essentials to personal care and everyday products.",
      themeColor: "#E5D8C5",
      bgClass: "bg-[#202321] text-white",
    },
    {
      ...BRAND.whyNow.pillars[4],
      number: "05",
      icon: ShieldCheck,
      headline: "Hygienic, reliable and consistent products you can depend on.",
      themeColor: "#A8B29B",
      bgClass: "bg-[#172B3A] text-white",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned step transitions
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            pillars.length - 1,
            Math.floor(progress * pillars.length)
          );
          setActiveStep(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const current = pillars[activeStep];
  const Icon = current.icon;

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden py-16 px-6 transition-colors duration-700 ${current.bgClass}`}
    >
      {/* Subtle Background Watermark Number */}
      <div className="absolute right-6 sm:right-16 bottom-0 font-serif font-black text-[22vw] leading-none opacity-10 select-none pointer-events-none text-[#C86B4A]">
        {current.number}
      </div>

      <div className="max-w-5xl mx-auto w-full text-left relative z-10 space-y-8">
        
        {/* Step Indicator & Category Tag */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 text-[#C86B4A] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                {BRAND.whyNow.title}
              </span>
              <span className="text-xs text-white/60">
                Pillar {current.number} of 05
              </span>
            </div>
          </div>

          {/* Quick Clickable Dots */}
          <div className="flex items-center gap-2">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === idx ? 'w-8 bg-[#C86B4A]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={p.title}
              />
            ))}
          </div>
        </div>

        {/* Massive Bold Headline Takeover */}
        <div className="space-y-4">
          <h2 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.0] text-white">
            {current.title}
          </h2>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#C86B4A] italic font-medium max-w-3xl leading-snug">
            "{current.description}"
          </p>
        </div>

        {/* Narrative Context */}
        <div className="pt-4 max-w-2xl text-sm sm:text-base text-[#E5D8C5]/85 leading-relaxed">
          {BRAND.whyNow.lead}
        </div>

      </div>
    </section>
  );
}
