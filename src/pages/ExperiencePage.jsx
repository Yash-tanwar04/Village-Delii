import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Wheat, Droplets, Flame, Zap, Coffee, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../data/experience';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  '/assets/images/store-interior.jpg',
  '/assets/images/hero-scenery.jpg',
  '/assets/images/store-approach.jpg',
  '/assets/images/store-night.jpg',
  '/assets/images/ghibli-day.jpg',
];
const ICONS = [Wheat, Droplets, Flame, Zap, Coffee];
// How many vh of scroll per experience panel
const PANEL_VH = 80;

export function ExperiencePage() {
  const sectionRef    = useRef(null);
  const imgPanelRef   = useRef(null);   // sticky left column root
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the left image column while the right text column scrolls
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end:   'bottom bottom',
        pin:   imgPanelRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const idx = Math.min(
            EXPERIENCES.items.length - 1,
            Math.floor(self.progress * EXPERIENCES.items.length)
          );
          setActiveIdx(idx);
        },
      });

      // Animate each text panel in on scroll
      section.querySelectorAll('.story-panel').forEach((el, i) => {
        gsap.from(el.querySelectorAll('.reveal-item'), {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const current = EXPERIENCES.items[activeIdx] || EXPERIENCES.items[0];
  const CurrentIcon = ICONS[activeIdx] || Wheat;

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip">

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-[#C86B4A]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>03 / THE SENSORY RITUALS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>The Village Deli</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.12}>Experience.</TextReveal>
                </span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[#C86B4A] italic font-medium">"{EXPERIENCES.subtitle}"</p>
              <p className="text-base sm:text-lg text-[#202321]/80 font-light max-w-2xl pt-1 leading-relaxed">{EXPERIENCES.intro}</p>
            </div>
            <div className="lg:col-span-4 lg:text-right font-mono text-xs text-[#202321]/70 space-y-1">
              <div className="text-[#C86B4A] font-bold">5 SIGNATURE RITUALS</div>
              <div>ONSITE FRESHNESS — ALWAYS OPEN</div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[#202321]/60">
            <ChevronDown className="w-4 h-4 text-[#C86B4A] animate-bounce" />
            <span>SCROLL TO EXPLORE EACH RITUAL</span>
          </div>
        </div>
      </section>

      {/* ─── PINNED SCROLL: Left image fixed, right text scrolls ─────────── */}
      {/*
        Total height = PANEL_VH * count + 100vh (initial view)
        Left sticky image panel is pinned by GSAP ScrollTrigger (pinSpacing:false)
        Right column just contains stacked tall panels
      */}
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: (PANEL_VH * EXPERIENCES.items.length + 100) + 'vh' }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex gap-8 lg:gap-14 relative">

          {/* ── LEFT: Sticky image stage ── */}
          <div
            ref={imgPanelRef}
            className="hidden lg:flex flex-col gap-4 w-[42%] shrink-0 py-10"
            style={{ height: '100vh' }}
          >
            {/* Image viewport */}
            <div className="relative flex-1 rounded-[32px] overflow-hidden border border-[#172B3A]/18 shadow-2xl bg-[#172B3A]">
              {EXPERIENCES.items.map((item, idx) => (
                <img
                  key={item.id}
                  src={IMAGES[idx]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                  style={{ opacity: activeIdx === idx ? 1 : 0, transform: activeIdx === idx ? 'scale(1.04)' : 'scale(1)' }}
                />
              ))}

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/90 via-[#172B3A]/15 to-transparent pointer-events-none" />

              {/* Top badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#C86B4A]">
                  <CurrentIcon className="w-3.5 h-3.5" />
                  <span>RITUAL 0{activeIdx + 1} / 05</span>
                </div>
                <span className="text-xs font-mono text-[#E5D8C5]/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                  {current.feature}
                </span>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left z-10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] block">
                  Active Focus
                </span>
                <h3 className="font-serif text-2xl font-bold transition-all duration-500">{current.title}</h3>
                <p className="text-xs text-[#E5D8C5]/80 line-clamp-2 font-light">{current.description}</p>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 py-2">
              {EXPERIENCES.items.map((_, i) => (
                <div
                  key={i}
                  className={'h-1.5 rounded-full transition-all duration-400 ' +
                    (activeIdx === i ? 'w-9 bg-[#C86B4A]' : 'w-3 bg-[#172B3A]/20')} />
              ))}
            </div>

            {/* Counter */}
            <div className="text-center font-mono text-sm font-bold text-[#172B3A]">
              <span className="text-[#C86B4A]">0{activeIdx + 1}</span>
              <span className="text-[#172B3A]/30"> / 05</span>
            </div>
          </div>

          {/* ── RIGHT: Scrolling story panels ── */}
          <div className="flex-1 py-10 space-y-0">
            {EXPERIENCES.items.map((item, idx) => {
              const Icon = ICONS[idx];
              return (
                <div
                  key={item.id}
                  className="story-panel text-left"
                  style={{ minHeight: PANEL_VH + 'vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}
                >
                  {/* Mobile image (only on small screens) */}
                  <div className="lg:hidden mb-8 rounded-2xl overflow-hidden aspect-video bg-[#172B3A]">
                    <img src={IMAGES[idx]} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-6 max-w-lg">
                    {/* Step label */}
                    <div className="reveal-item flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#C86B4A]">0{idx + 1} / RITUAL</span>
                      <div className="h-px w-10 bg-[#C86B4A]/50" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[#202321]/55">{item.feature}</span>
                    </div>

                    {/* Big title */}
                    <h2 className="reveal-item font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#172B3A] leading-[1.05]">
                      {item.title}
                    </h2>

                    {/* Italic tagline */}
                    <p className="reveal-item font-serif text-xl sm:text-2xl text-[#C86B4A] italic font-medium">
                      "{item.description}"
                    </p>

                    {/* Body */}
                    <p className="reveal-item text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed">
                      {item.details}
                    </p>

                    {/* Footer badge */}
                    <div className="reveal-item pt-4 border-t border-[#E5D8C5] flex items-center gap-5 text-xs font-mono text-[#172B3A]">
                      <span className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C86B4A]" />
                        Authentic Onsite Ritual
                      </span>
                      <span className="text-[#E5D8C5]">•</span>
                      <span className="font-bold text-[#C86B4A]">Open 24/7</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 24/7 Commitment ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#172B3A] text-white text-center px-6 border-t border-[#E5D8C5]/20">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono tracking-widest text-[#C86B4A]">
            <Clock className="w-3.5 h-3.5" />
            <span>NEVER CLOSED</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-5xl font-bold">
            Experience It Any Hour of the Day or Night
          </h3>
          <p className="text-sm sm:text-base text-[#E5D8C5] max-w-xl mx-auto font-light leading-relaxed">
            Fresh stone-chakki milling, warm baked breads, cold pressed juices, and our oak lounge are waiting for you 24 hours a day, 7 days a week.
          </p>
          <div className="pt-4 flex justify-center">
            <Link to="/locations" data-cursor="LOCATIONS"
              className="px-8 py-3.5 rounded-full bg-[#C86B4A] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#b55c3c] transition-colors flex items-center gap-2 shadow-lg">
              <span>Find Your Nearest Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
