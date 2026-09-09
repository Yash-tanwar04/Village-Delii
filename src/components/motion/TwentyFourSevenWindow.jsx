import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Sunrise, Sunset, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Continuous multi-stop color palette for seamless diurnal background transition
// Starts at website background #F7F4ED at Dawn, transitions smoothly to Ink/Midnight Blue at Night
const BG_STOPS = [
  [0.00, [247, 244, 237]], // #F7F4ED: Website signature porcelain background (Dawn)
  [0.20, [244, 239, 230]], // #F4EFE6: Sun-warmed morning light
  [0.35, [237, 227, 210]], // #EDE3D2: High Noon radiance & warm sand
  [0.50, [212, 188, 171]], // #D4BCAB: Golden hour amber glow
  [0.62, [143, 115, 121]], // #8F7379: Dusk twilight rose-slate
  [0.74, [59, 72, 90]],    // #3B485A: Blue hour as sun dips and moon rises
  [0.88, [23, 43, 58]],    // #172B3A: Village Deli signature Ink Blue
  [1.00, [13, 25, 36]],    // #0D1924: Velvety deep midnight blue
];

const TEXT_STOPS = [
  [0.00, [23, 43, 58]],     // #172B3A: Crisp dark ink on porcelain
  [0.42, [28, 48, 64]],     // Deep slate
  [0.58, [210, 198, 182]],  // Warm cream
  [0.72, [247, 244, 237]],  // #F7F4ED: Porcelain
  [1.00, [255, 255, 255]],  // Pure white on midnight blue
];

function interpolateStops(p, stops) {
  if (p <= stops[0][0]) return stops[0][1];
  if (p >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, c0] = stops[i];
    const [p1, c1] = stops[i + 1];
    if (p >= p0 && p <= p1) {
      const factor = (p - p0) / (p1 - p0);
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * factor),
        Math.round(c0[1] + (c1[1] - c0[1]) * factor),
        Math.round(c0[2] + (c1[2] - c0[2]) * factor),
      ];
    }
  }
  return stops[0][1];
}

export function getDiurnalBgColor(p) {
  const [r, g, b] = interpolateStops(p, BG_STOPS);
  return `rgb(${r}, ${g}, ${b})`;
}

export function getDiurnalTextColor(p) {
  const [r, g, b] = interpolateStops(p, TEXT_STOPS);
  return `rgb(${r}, ${g}, ${b})`;
}

export function TwentyFourSevenWindow() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const PHASES = [
    {
      id: 'dawn',
      time: '06:00 AM',
      period: 'DAWN AWAKENING',
      audience: 'Early Risers & Morning Commuters',
      headline: 'Starting Your Day: First Ovens & Stone Milling',
      message:
        'Warm sourdough loaves fresh from live store ovens, stone-chakki MP Sharbati flour ground on demand for daily household needs, and steaming barista espresso as Haryana stirs.',
      craft: 'Live Stone-Chakki Milling · Stone Deck Oven Crusts · Fresh Barista Espresso',
      skyGradient: 'from-[#222338] via-[#7E4334] to-[#D99557]',
      glowColor: '#D99557',
      icon: Sunrise,
    },
    {
      id: 'midday',
      time: '01:00 PM',
      period: 'HIGH NOON RADIANCE',
      audience: 'Midday Movement & Busy Families',
      headline: 'Grabbing a Quick Meal: High-Speed Lunch & Natural Vitality',
      message:
        'Chef-prepared gourmet deli wraps, toasted panini sandwiches, and 100% cold-pressed Valencia orange and raw sugarcane juice crafted to keep highway travellers energized without the wait.',
      craft: 'Raw Cold-Pressed Extraction · Chef-Crafted Wraps · Under 60s Checkout',
      skyGradient: 'from-[#173852] via-[#2F6B8A] to-[#B87F58]',
      glowColor: '#F5B862',
      icon: Sun,
    },
    {
      id: 'dusk',
      time: '07:30 PM',
      period: 'TWILIGHT SANCTUARY',
      audience: 'Evening Commute & Heading Home',
      headline: 'Picking Up Groceries: Farm-Inspected Dinner Essentials',
      message:
        'Audited regional farm vegetables harvested within 24 hours, pure cold-chain dairy milk, unpolished pulses, and comforting dinner staples on your commute home.',
      craft: 'Farm-Inspected Daily Harvest · Pure Dairy & Malai Paneer · Heirloom Pantry Staples',
      skyGradient: 'from-[#1C1D30] via-[#5C3247] to-[#C86B4A]',
      glowColor: '#C86B4A',
      icon: Sunset,
    },
    {
      id: 'night',
      time: '02:30 AM',
      period: 'THE UNBROKEN NIGHT WATCH',
      audience: 'Night Owls, Highway Travelers & Late Shifts',
      headline: 'Late-Night Stops: The Constant 24/7 Haven',
      message:
        'When everything else across North India goes dark, our warm amber lights stay on. A safe, secure, well-lit sanctuary with hot refreshments, clean restrooms, and midnight provisions whenever you need us.',
      craft: 'Always Open 24/7/365 · 100% Arabica Night Roast · Safe Highway Oasis',
      skyGradient: 'from-[#080E14] via-[#0E1A24] to-[#172B3A]',
      glowColor: '#4A87A8',
      icon: Moon,
    },
  ];

  // GSAP ScrollTrigger: Lock the site with pin: true and pinSpacing: true
  // The screen stays completely stationary while the user scrolls through the 24 hours!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=1100', // Refined snappy scroll distance for 4 phases
        pin: true,
        pinSpacing: true,
        scrub: 0.15,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          const idx = Math.min(PHASES.length - 1, Math.floor(p * PHASES.length));
          setActivePhaseIndex(idx);
          if (container) {
            container.style.backgroundColor = getDiurnalBgColor(p);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [PHASES.length]);

  const current = PHASES[activePhaseIndex];
  const CurrentIcon = current.icon;
  const isDaytime = scrollProgress < 0.58;
  const dynamicBg = getDiurnalBgColor(scrollProgress);
  const dynamicTextColor = getDiurnalTextColor(scrollProgress);

  // Sun and Moon positions along parabolic celestial arc
  const sunX = 15 + scrollProgress * 72;
  const sunY = 72 - Math.sin(Math.PI * Math.min(1, scrollProgress * 1.35)) * 52;
  const isSunVisible = scrollProgress < 0.78;

  const moonProg = Math.max(0, (scrollProgress - 0.52) / 0.48);
  const moonX = 25 + moonProg * 45;
  const moonY = 76 - Math.sin(Math.PI * moonProg) * 54;
  const isMoonVisible = scrollProgress > 0.52;

  return (
    <section
      ref={containerRef}
      style={{ backgroundColor: dynamicBg }}
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-between py-10 sm:py-12 px-6 overflow-hidden select-none"
    >
      {/* Background Twinkling Starlight Matrix - emerges as sun sets and moon rises */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{ opacity: Math.max(0, (scrollProgress - 0.45) * 2.2) }}
      >
        {[
          { t: 12, l: 14, s: 2 }, { t: 22, l: 36, s: 1.5 }, { t: 8, l: 72, s: 2.5 },
          { t: 38, l: 80, s: 1.5 }, { t: 28, l: 58, s: 2 }, { t: 68, l: 16, s: 2 },
          { t: 78, l: 86, s: 2 }, { t: 52, l: 42, s: 1 }, { t: 18, l: 90, s: 3 },
          { t: 62, l: 68, s: 2 }, { t: 82, l: 28, s: 1.5 }, { t: 10, l: 46, s: 2.5 },
        ].map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.t + '%',
              left: star.l + '%',
              width: star.s + 'px',
              height: star.s + 'px',
              animationDuration: (2 + (idx % 3)) + 's',
            }}
          />
        ))}
      </div>

      {/* ── TOP HEADER WITH SCROLL PROGRESS TRACKER ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b text-left transition-colors duration-300"
        style={{ borderColor: isDaytime ? 'rgba(23,43,58,0.15)' : 'rgba(255,255,255,0.18)' }}
      >
        <div className="space-y-1">
          <div
            className={
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest transition-all duration-300 ' +
              (isDaytime
                ? 'bg-white/80 border border-[#C86B4A]/30 text-[#C86B4A] shadow-xs'
                : 'bg-white/10 border border-white/15 text-[#C86B4A]')
            }
          >
            <CurrentIcon className="w-3.5 h-3.5" />
            <span>03 / 24/7 CELESTIAL PINNED SCROLL</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-200"
            style={{ color: dynamicTextColor }}
          >
            Always Open. Always Ready.
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#172B3A] border border-white/20 shadow-md backdrop-blur-md text-white">
            <span className="w-2 h-2 rounded-full bg-[#C86B4A] animate-pulse" />
            <span className="font-bold text-[#F5B862]">{current.time}</span>
            <span className="text-white/40">•</span>
            <span className="uppercase text-[#E5D8C5] tracking-wider">{current.period}</span>
          </div>

          <div
            className={
              'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ' +
              (isDaytime
                ? 'bg-[#172B3A]/8 border-[#172B3A]/15 text-[#172B3A]'
                : 'bg-white/10 border-white/15 text-white/85')
            }
          >
            <span className="text-[#C86B4A] font-bold">Scroll: {Math.round(scrollProgress * 100)}%</span>
            <span>(Screen Locked In Place)</span>
          </div>
        </div>
      </div>

      {/* ── CELESTIAL SKY DOME (PINNED IN VIEW WHILE SUN & MOON MOVE) ── */}
      <div
        className={
          'relative z-10 max-w-7xl mx-auto w-full flex-1 my-3 aspect-[16/8] sm:aspect-[21/9] rounded-[32px] overflow-hidden border shadow-2xl p-6 sm:p-8 flex flex-col justify-between bg-black/40 backdrop-blur-md transition-colors duration-500 ' +
          (isDaytime ? 'border-[#172B3A]/20' : 'border-white/20')
        }
      >
        {/* Dynamic Sky Gradient */}
        <div
          className={'absolute inset-0 transition-all duration-700 opacity-90 bg-gradient-to-b ' + current.skyGradient}
        />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

        {/* Celestial Orbital Arc */}
        <svg viewBox="0 0 1000 400" className="w-full h-full absolute inset-0 pointer-events-none">
          <path
            d="M 50 360 Q 500 40 950 360"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <line x1="0" y1="360" x2="1000" y2="360" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>

        {/* Dynamic Sun */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200"
          style={{
            left: sunX + '%',
            top: sunY + '%',
            opacity: isSunVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 shadow-[0_0_50px_rgba(251,191,36,0.8)] border border-yellow-100 flex items-center justify-center">
              <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-amber-900/80" />
            </div>
          </div>
        </div>

        {/* Dynamic Moon */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200"
          style={{
            left: moonX + '%',
            top: moonY + '%',
            opacity: isMoonVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cyan-300/20 blur-xl animate-pulse" />
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-slate-200 to-white shadow-[0_0_45px_rgba(255,255,255,0.85)] border border-white flex items-center justify-center">
              <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-800" />
            </div>
          </div>
        </div>

        {/* Top HUD inside Dome */}
        <div className="relative z-20 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
            <span className="text-[10px] uppercase tracking-widest text-[#F5B862] font-bold">
              AUDIENCE: {current.audience.toUpperCase()}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-white/80 bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>SCROLL TO MOVE SUN & MOON (LOCKED IN VIEW)</span>
          </div>
        </div>

        {/* Bottom Narrative Message (Direct from PDF) */}
        <div className="relative z-20 max-w-2xl text-left space-y-1.5 bg-black/50 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#F5B862] font-bold block">
            {current.period} · {current.time}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
            {current.headline}
          </h3>
          <p className="text-xs sm:text-sm text-[#E5D8C5]/90 font-light leading-relaxed">
            {current.message}
          </p>
          <div className="pt-1 text-[11px] font-mono text-[#F5B862] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86B4A]" />
            <span>{current.craft}</span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TIME SCRUBBER TILES ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-2 text-left">
        {PHASES.map((p, idx) => {
          const Icon = p.icon;
          const isActive = activePhaseIndex === idx;
          return (
            <div
              key={p.id}
              className={
                'p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-1 card-pop-subtle ' +
                (isDaytime
                  ? isActive
                    ? 'bg-[#172B3A] border-[#C86B4A] text-white shadow-lg'
                    : 'bg-white/80 border-[#172B3A]/12 text-[#172B3A] shadow-xs hover:bg-white'
                  : isActive
                    ? 'bg-white/20 border-white text-white shadow-lg backdrop-blur-md'
                    : 'bg-black/35 border-white/15 text-white/70 hover:bg-black/50 backdrop-blur-md')
              }
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    'font-mono text-xs font-bold ' +
                    (isActive
                      ? 'text-[#F5B862]'
                      : isDaytime
                        ? 'text-[#C86B4A]'
                        : 'text-white/60')
                  }
                >
                  {p.time}
                </span>
                <Icon
                  className={
                    'w-3.5 h-3.5 ' +
                    (isActive
                      ? 'text-[#F5B862]'
                      : isDaytime
                        ? 'text-[#172B3A]/60'
                        : 'text-white/50')
                  }
                />
              </div>
              <div>
                <h4
                  className={
                    'font-serif text-sm font-bold leading-tight ' +
                    (isActive ? 'text-white' : isDaytime ? 'text-[#172B3A]' : 'text-white/95')
                  }
                >
                  {p.period}
                </h4>
                <span
                  className={
                    'text-[10px] font-mono block truncate ' +
                    (isActive ? 'text-[#E5D8C5]' : isDaytime ? 'text-[#202321]/60' : 'text-[#E5D8C5]/65')
                  }
                >
                  {p.audience}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
