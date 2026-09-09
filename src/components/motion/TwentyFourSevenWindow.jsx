import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Sunrise, Sunset, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun3D } from '../3d/Sun3D';
import { Moon3D } from '../3d/Moon3D';

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
  [1.00, [23, 43, 58]],    // #172B3A: Blends seamlessly with FinalBrandStatement & Footer
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

// Curated constellation strictly confined to the upper header sky area
const TOP_NIGHT_STARS = [
  // Original reference dots visible in user screenshot:
  { t: 33, l: 72, s: 2.5, dur: 2.1, delay: 0.1 },
  { t: 74, l: 90, s: 3.0, dur: 2.5, delay: 0.6 },

  // Surrounding the top-right header area & time pill:
  { t: 18, l: 65, s: 1.5, dur: 1.8, delay: 0.3 },
  { t: 45, l: 68, s: 2.0, dur: 2.6, delay: 1.2 },
  { t: 22, l: 78, s: 1.5, dur: 2.2, delay: 0.8 },
  { t: 55, l: 82, s: 2.0, dur: 3.0, delay: 0.4 },
  { t: 15, l: 85, s: 2.5, dur: 1.9, delay: 1.5 },
  { t: 38, l: 93, s: 1.5, dur: 2.5, delay: 0.9 },
  { t: 62, l: 95, s: 2.0, dur: 2.8, delay: 0.2 },
  { t: 82, l: 78, s: 1.5, dur: 2.1, delay: 1.1 },
  { t: 85, l: 86, s: 2.0, dur: 2.7, delay: 0.7 },

  // Center sky expanse (between title and right tracker):
  { t: 16, l: 48, s: 2.5, dur: 2.3, delay: 0.5 },
  { t: 32, l: 52, s: 1.5, dur: 1.7, delay: 1.3 },
  { t: 65, l: 50, s: 2.0, dur: 2.9, delay: 0.2 },
  { t: 24, l: 58, s: 3.0, dur: 2.1, delay: 0.9 },
  { t: 78, l: 56, s: 1.5, dur: 2.4, delay: 1.4 },
  { t: 48, l: 61, s: 2.0, dur: 3.2, delay: 0.6 },
  { t: 82, l: 64, s: 1.5, dur: 1.9, delay: 0.3 },

  // Left header sky (surrounding "24/7. Day or Night"):
  { t: 12, l: 4, s: 2.0, dur: 2.5, delay: 0.4 },
  { t: 36, l: 7, s: 1.5, dur: 1.9, delay: 1.0 },
  { t: 68, l: 5, s: 2.5, dur: 2.8, delay: 0.7 },
  { t: 84, l: 11, s: 1.5, dur: 2.2, delay: 1.3 },
  { t: 15, l: 16, s: 2.5, dur: 2.4, delay: 0.2 },
  { t: 42, l: 20, s: 1.5, dur: 3.1, delay: 0.8 },
  { t: 72, l: 18, s: 2.0, dur: 2.0, delay: 1.6 },
  { t: 20, l: 28, s: 2.0, dur: 2.6, delay: 0.5 },
  { t: 58, l: 30, s: 1.5, dur: 1.8, delay: 1.2 },
  { t: 82, l: 26, s: 2.5, dur: 2.7, delay: 0.1 },
  { t: 14, l: 38, s: 3.0, dur: 2.2, delay: 0.9 },
  { t: 40, l: 42, s: 1.5, dur: 2.9, delay: 0.4 },
  { t: 76, l: 39, s: 2.0, dur: 1.9, delay: 1.5 },

  // Perimeter ambient stars:
  { t: 8, l: 96, s: 1.5, dur: 2.3, delay: 1.0 },
  { t: 88, l: 3, s: 2.0, dur: 2.5, delay: 0.8 },
  { t: 26, l: 44, s: 1.5, dur: 2.0, delay: 1.7 },
  { t: 58, l: 75, s: 2.5, dur: 2.4, delay: 0.5 },
];

export function TwentyFourSevenWindow() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const PHASES = [
    {
      id: 'dawn',
      time: '06:00 AM',
      period: 'DAWN AWAKENING',
      audience: 'Starting Your Day',
      headline: 'Starting Your Day',
      message:
        'Warm artisanal bakery, freshly ground flours, and fresh brewed coffee to begin your morning with calm and care.',
      skyGradient: 'from-[#222338] via-[#7E4334] to-[#D99557]',
      glowColor: '#D99557',
      icon: Sunrise,
    },
    {
      id: 'midday',
      time: '01:00 PM',
      period: 'MIDDAY MOVEMENT',
      audience: 'Grabbing a Quick Meal',
      headline: 'Grabbing a Quick Meal',
      message:
        'Chef-prepared deli sandwiches, fresh salad wraps, and 100% cold-pressed juices crafted for quick refreshment on the go.',
      skyGradient: 'from-[#173852] via-[#2F6B8A] to-[#B87F58]',
      glowColor: '#F5B862',
      icon: Sun,
    },
    {
      id: 'dusk',
      time: '07:30 PM',
      period: 'TWILIGHT SANCTUARY',
      audience: 'Picking Up Groceries',
      headline: 'Picking Up Groceries',
      message:
        'Farm-fresh produce, cold-chain dairy milk, unadulterated staples, and evening household essentials on your commute home.',
      skyGradient: 'from-[#1C1D30] via-[#5C3247] to-[#C86B4A]',
      glowColor: '#C86B4A',
      icon: Sunset,
    },
    {
      id: 'night',
      time: '02:30 AM',
      period: 'NIGHT HAVEN',
      audience: 'Late-Night Stops',
      headline: 'Late-Night Stops',
      message:
        'Always open, always ready. A warm, safe, well-lit haven offering hot refreshments and provisions whenever you need us.',
      skyGradient: 'from-[#080E14] via-[#0E1A24] to-[#172B3A]',
      glowColor: '#4A87A8',
      icon: Moon,
    },
  ];

  // GSAP ScrollTrigger: Pin below the navbar dynamically
  // The screen stays completely stationary below the navbar while scrolling through the 24 hours
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const getNavH = () => {
        const rootH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'));
        return !isNaN(rootH) && rootH > 0 ? rootH : 72;
      };

      ScrollTrigger.create({
        trigger: container,
        start: () => `top ${getNavH()}px`,
        end: '+=1000',
        pin: true,
        pinSpacing: true,
        scrub: 0.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
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
  const sunOpacity = Math.max(0, Math.min(1, (0.76 - scrollProgress) / 0.12));

  const moonProg = Math.max(0, (scrollProgress - 0.52) / 0.48);
  const moonX = 25 + moonProg * 45;
  const moonY = 76 - Math.sin(Math.PI * moonProg) * 54;
  const moonOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.52) / 0.14));

  return (
    <section
      ref={containerRef}
      id="twenty-four-seven-window"
      style={{ 
        backgroundColor: dynamicBg,
        height: 'calc(100vh - var(--navbar-height, 72px))',
      }}
      className="relative w-full min-h-[520px] sm:min-h-[580px] flex flex-col justify-between py-3 sm:py-5 px-3.5 sm:px-12 overflow-hidden select-none"
    >
      {/* ── NIGHT SKY TWINKLING STARS (Confined strictly to the top header region) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-44 sm:h-48 md:h-52 pointer-events-none transition-opacity duration-700 z-0 overflow-hidden"
        style={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.45) * 2.2)) }}
        aria-hidden="true"
      >
        {TOP_NIGHT_STARS.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white animate-star-twinkle"
            style={{
              top: `${star.t}%`,
              left: `${star.l}%`,
              width: `${star.s}px`,
              height: `${star.s}px`,
              animationDuration: `${star.dur}s`,
              animationDelay: `${star.delay}s`,
              '--twinkle-dur': `${star.dur}s`,
              '--twinkle-delay': `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── TOP HEADER WITH TIME TRACKER ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center sm:items-end justify-between gap-3 pb-2.5 sm:pb-3 border-b text-left transition-colors duration-300"
        style={{ borderColor: isDaytime ? 'rgba(23,43,58,0.15)' : 'rgba(255,255,255,0.18)' }}
      >
        <div className="space-y-0.5 sm:space-y-1">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
            ALWAYS OPEN · ALWAYS READY
          </span>
          <h2
            className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-200 leading-tight"
            style={{ color: dynamicTextColor }}
          >
            24/7. Day or Night. We’re Here.
          </h2>
          <p
            className="text-xs font-light transition-colors duration-200 opacity-75 hidden sm:block"
            style={{ color: dynamicTextColor }}
          >
            Starting your day · Grabbing a quick meal · Picking up groceries · Late-night stops.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#172B3A] border border-white/20 shadow-md backdrop-blur-md text-white text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C86B4A] animate-pulse" />
            <span className="font-bold text-[#F5B862]">{current.time}</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="uppercase text-[#E5D8C5] tracking-wider hidden sm:inline">{current.period}</span>
          </div>
        </div>
      </div>

      {/* ── CELESTIAL SKY DOME (PINNED IN VIEW WHILE SUN & MOON MOVE) ── */}
      <div
        className={
          'relative z-10 max-w-7xl mx-auto w-full flex-1 my-2 sm:my-3 min-h-[220px] sm:min-h-[260px] rounded-2xl sm:rounded-[28px] overflow-hidden border shadow-xl p-4 sm:p-7 flex flex-col justify-between bg-black/40 backdrop-blur-md transition-colors duration-500 ' +
          (isDaytime ? 'border-[#172B3A]/15' : 'border-white/15')
        }
      >
        {/* Dynamic Sky Gradient */}
        <div
          className={'absolute inset-0 transition-all duration-700 opacity-90 bg-gradient-to-b ' + current.skyGradient}
        />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />

        {/* Celestial Orbital Arc */}
        <svg viewBox="0 0 1000 400" className="w-full h-full absolute inset-0 pointer-events-none">
          <path
            d="M 50 360 Q 500 40 950 360"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <line x1="0" y1="360" x2="1000" y2="360" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>

        {/* Real 3D Celestial Sun */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 z-10"
          style={{
            left: sunX + '%',
            top: sunY + '%',
            opacity: sunOpacity,
            visibility: sunOpacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <Sun3D />
        </div>

        {/* Real 3D Celestial Moon */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 z-10"
          style={{
            left: moonX + '%',
            top: moonY + '%',
            opacity: moonOpacity,
            visibility: moonOpacity > 0.01 ? 'visible' : 'hidden',
          }}
        >
          <Moon3D />
        </div>

        {/* Top subtle indicator inside Dome */}
        <div className="relative z-20 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[#F5B862]">
            <CurrentIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold">
              {current.period}
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono text-white/70 bg-black/40 px-2.5 sm:px-3 py-1 rounded-full border border-white/10">
            <span>Scroll 24 hrs</span>
          </div>
        </div>

        {/* Bottom Narrative Message */}
        <div className="relative z-20 max-w-lg text-left space-y-1 bg-black/60 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10">
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#F5B862] font-semibold block">
            {current.period} · {current.time}
          </span>
          <h3 className="font-serif text-base sm:text-xl font-bold text-white leading-tight">
            {current.headline}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#E5D8C5]/90 font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
            {current.message}
          </p>
        </div>
      </div>

      {/* ── BOTTOM TIME SCRUBBER TILES ── */}
      {/* Mobile: Sleek 4-phase horizontal timeline pills */}
      <div className="md:hidden relative z-10 w-full flex items-center justify-between gap-1.5 pt-0.5">
        {PHASES.map((p, idx) => {
          const isActive = activePhaseIndex === idx;
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className={
                'flex-1 py-1.5 px-1.5 rounded-lg text-center transition-all duration-300 border flex items-center justify-center gap-1 ' +
                (isActive
                  ? 'bg-[#172B3A] border-[#C86B4A] text-white shadow-xs'
                  : isDaytime
                    ? 'bg-white/80 border-[#172B3A]/10 text-[#172B3A]/70'
                    : 'bg-black/35 border-white/15 text-white/60')
              }
            >
              <Icon className={'w-2.5 h-2.5 ' + (isActive ? 'text-[#F5B862]' : 'opacity-60')} />
              <span className="text-[9px] font-mono font-bold leading-none">
                {p.time.replace(':00', '').replace(':30', '')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop: Full 4-column rich tiles */}
      <div className="hidden md:grid relative z-10 max-w-7xl mx-auto w-full grid-cols-4 gap-2.5 text-left">
        {PHASES.map((p, idx) => {
          const Icon = p.icon;
          const isActive = activePhaseIndex === idx;
          return (
            <div
              key={p.id}
              className={
                'p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-1 ' +
                (isDaytime
                  ? isActive
                    ? 'bg-[#172B3A] border-[#C86B4A] text-white shadow-md'
                    : 'bg-white/85 border-[#172B3A]/10 text-[#172B3A] shadow-xs'
                  : isActive
                    ? 'bg-white/20 border-white text-white shadow-md backdrop-blur-md'
                    : 'bg-black/35 border-white/15 text-white/70 backdrop-blur-md')
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
