import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Sun, Compass, CheckCircle2, ShieldCheck, Heart, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '../../data/brand';

gsap.registerPlugin(ScrollTrigger);

export function IntroCollage() {
  const containerRef = useRef(null);
  const manifestoTextRef = useRef(null);
  const artworkCropRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle parallax on the cropped slice-of-life fragment
      gsap.to(artworkCropRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Staggered manifesto typography reveal
      gsap.from(manifestoTextRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: manifestoTextRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tenets = [
    {
      num: '01',
      title: 'Same-Day Ground',
      label: 'FRESHNESS',
      summary: 'Milled stone-chakki flours and live bakery deck ovens in full view.',
      hoverReveal: '100% whole grain nutrient retention, zero preservatives or additives.',
      icon: Sparkles,
    },
    {
      num: '02',
      title: 'Constant 24/7',
      label: 'CERTAINTY',
      summary: 'Never closed. From highway junctions to quiet neighbourhood streets.',
      hoverReveal: 'Always staffed, brilliantly illuminated, safe sanctuary for travellers.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Everyday Dignity',
      label: 'COMMUNITY',
      summary: 'Warm solid oak seating, hygienic restrooms, and barista coffee.',
      hoverReveal: 'An elevated living experience built with deep respect for everyday life.',
      icon: Heart,
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative pt-6 pb-20 bg-[#F7F4ED] text-[#202321] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Layout: 60% Manifesto Typography + 40% Cropped Ghibli Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT 60%: THE BRAND MANIFESTO */}
          <div ref={manifestoTextRef} className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-mono uppercase tracking-widest text-[#172B3A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>The Brand Ethos</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#172B3A] leading-[1.05]">
                {BRAND.aboutIntro.title}
              </h2>

              <p className="font-serif text-2xl sm:text-3xl text-[#C86B4A] italic font-medium">
                "{BRAND.aboutIntro.motto}"
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#202321]/80 leading-relaxed font-light">
              {BRAND.aboutIntro.concept} {BRAND.aboutIntro.description}
            </p>

            {/* 3 Core Editorial Tenets with Interactive Hover Reveals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#172B3A]/15">
              {tenets.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.num}
                    className="card-pop group p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#E5D8C5] flex flex-col justify-between space-y-3 cursor-default relative overflow-hidden"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#C86B4A] font-bold block">
                          {t.num} / {t.label}
                        </span>
                        <Icon className="w-3.5 h-3.5 text-[#172B3A]/40 group-hover:text-[#C86B4A] transition-colors" />
                      </div>

                      <h4 className="font-serif text-base font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                        {t.title}
                      </h4>

                      <p className="text-xs text-[#202321]/70 leading-snug">
                        {t.summary}
                      </p>
                    </div>

                    {/* Smooth Hover Reveal Detail */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-400 overflow-hidden pt-0 group-hover:pt-2 border-t border-transparent group-hover:border-[#172B3A]/10 text-[11px] font-mono text-[#C86B4A]">
                      <span>✦ {t.hoverReveal}</span>
                    </div>

                    {/* Expanding Bottom Accent Line */}
                    <div className="w-6 group-hover:w-full h-0.5 bg-[#C86B4A] transition-all duration-400" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 40%: CROPPED SLICE-OF-LIFE CANVAS */}
          <div className="lg:col-span-5 relative">
            <div className="group relative aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl border border-[#E5D8C5] bg-[#172B3A]">
              <img
                ref={artworkCropRef}
                src="/assets/images/ghibli-day.jpg"
                alt="Village Deli Morning Life in Haryana"
                className="w-full h-[120%] object-cover object-center will-change-transform transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/80 via-transparent to-black/10 pointer-events-none" />

              {/* Top Corner Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/20 text-xs text-[#172B3A] shadow-xs">
                <Sun className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span className="font-mono text-[11px] font-bold">MORNING SLICE OF LIFE</span>
              </div>

              {/* Bottom Information Bar with Hover Reveal Tag */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-1 z-10">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#E5D8C5]/80">
                  <span>HARYANA HIGHWAY GRID</span>
                  <span className="text-[#C86B4A] font-bold">EVERYDAY SANCTUARY ✦</span>
                </div>

                <h3 className="font-serif text-2xl font-bold leading-tight">
                  Where Daily Life Meets Everyday Quality.
                </h3>

                {/* Subtle Hover Reveal Indicator */}
                <div className="max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 overflow-hidden pt-1 text-xs font-mono text-[#F5B862]">
                  <span>✦ Onsite Bakery · Fresh Produce · Oak Seating</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
