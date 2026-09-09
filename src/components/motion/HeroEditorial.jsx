import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroEditorial() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const croissantGroupRef = useRef(null);
  const orangeLeftRef = useRef(null);
  const bagRef = useRef(null);
  const orangeRightRef = useRef(null);
  const milkRef = useRef(null);
  const tomatoesRef = useRef(null);
  const leaf1Ref = useRef(null);
  const leaf2Ref = useRef(null);
  const [timeStr, setTimeStr] = useState('');

  // Live IST Clock (Requested by user)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTimeStr(istTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to next section
  const scrollToManifesto = () => {
    const manifesto = document.getElementById('manifesto-section') || document.querySelector('section:nth-of-type(2)');
    if (manifesto) {
      manifesto.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  // Smooth scroll to 24/7 Celestial window
  const scrollToTwentyFour = () => {
    window.scrollBy({ top: window.innerHeight * 2.2, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Initial Mount: Subtle smooth lift
      gsap.from('.hero-mount-elem', {
        y: 20,
        duration: 1.0,
        stagger: 0.05,
        ease: 'power3.out',
      });

      // 2. Organic Floating Levitation Loops
      if (croissantGroupRef.current) {
        gsap.to(croissantGroupRef.current, {
          y: -8,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orangeLeftRef.current) {
        gsap.to(orangeLeftRef.current, {
          y: -6,
          duration: 4.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }

      if (orangeRightRef.current) {
        gsap.to(orangeRightRef.current, {
          y: -8,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.2,
        });
      }

      if (milkRef.current) {
        gsap.to(milkRef.current, {
          y: 7,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4,
        });
      }

      if (tomatoesRef.current) {
        gsap.to(tomatoesRef.current, {
          y: -7,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.6,
        });
      }

      if (leaf1Ref.current && leaf2Ref.current) {
        gsap.to([leaf1Ref.current, leaf2Ref.current], {
          y: -12,
          rotate: 6,
          duration: 2.8,
          stagger: 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. Scroll Parallax: STRICTLY ZERO OPACITY FADE
      // User directive: "it should not fade on scroll the text can animate but not fade"
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      });

      if (headlineRef.current) {
        scrollTl.to(headlineRef.current, { y: -50, ease: 'none' }, 0);
      }
      if (croissantGroupRef.current) {
        scrollTl.to(croissantGroupRef.current, { y: -80, rotate: -4, ease: 'none' }, 0);
      }
      if (orangeLeftRef.current) {
        scrollTl.to(orangeLeftRef.current, { y: -50, rotate: 4, ease: 'none' }, 0);
      }
      if (orangeRightRef.current) {
        scrollTl.to(orangeRightRef.current, { y: -65, rotate: -4, ease: 'none' }, 0);
      }
      if (milkRef.current) {
        scrollTl.to(milkRef.current, { y: 35, ease: 'none' }, 0);
      }
      if (tomatoesRef.current) {
        scrollTl.to(tomatoesRef.current, { y: 30, ease: 'none' }, 0);
      }
      if (leaf1Ref.current && leaf2Ref.current) {
        scrollTl.to([leaf1Ref.current, leaf2Ref.current], { y: -90, ease: 'none' }, 0);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  // Multi-Plane 3D Interactive Mouse Parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to('.hero-leaf-depth', {
      x: x * 30,
      y: y * 25,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (croissantGroupRef.current) {
      gsap.to(croissantGroupRef.current, {
        x: x * 18,
        y: y * 14,
        rotate: x * 3,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (tomatoesRef.current) {
      gsap.to(tomatoesRef.current, {
        x: x * 18,
        y: y * 14,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (orangeLeftRef.current) {
      gsap.to(orangeLeftRef.current, {
        x: x * 14,
        y: y * 12,
        duration: 0.85,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (orangeRightRef.current) {
      gsap.to(orangeRightRef.current, {
        x: x * 16,
        y: y * 14,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (milkRef.current) {
      gsap.to(milkRef.current, {
        x: x * 12,
        y: y * 10,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        x: x * 6,
        y: y * 4,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const elements = [
      croissantGroupRef.current,
      orangeLeftRef.current,
      orangeRightRef.current,
      milkRef.current,
      tomatoesRef.current,
      headlineRef.current,
    ];
    gsap.to(elements, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1.2,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    gsap.to('.hero-leaf-depth', {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[660px] lg:min-h-screen bg-[#F7F4ED] text-[#172B3A] flex flex-col justify-between pt-20 sm:pt-22 pb-6 px-6 sm:px-12 overflow-hidden select-none border-b border-[#E5D8C5]/60"
      style={{
        background: 'radial-gradient(ellipse at 50% 48%, #FDFBF7 0%, #F7F4ED 65%, #F2ECE0 100%)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .font-editorial-script {
          font-family: 'Caveat', cursive, 'Playfair Display', serif;
        }
      `}</style>

      {/* ── 1. VECTOR TERRACOTTA CONNECTING MILESTONE ARC ── */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        preserveAspectRatio="none"
      >
        <path
          d="M -40 450 C 220 220, 360 260, 480 470 C 620 660, 860 660, 1000 470 C 1140 310, 1260 250, 1480 440"
          stroke="#E09A7B"
          strokeWidth="1.6"
          opacity="0.85"
        />
        {/* Milestone Node 1 near croissant */}
        <circle cx="178" cy="380" r="5" fill="#C86B4A" />
        {/* Milestone Node 2 near tomatoes */}
        <circle cx="1025" cy="475" r="6" fill="#C86B4A" />
        <circle cx="1025" cy="475" r="2.5" fill="#F7F4ED" />
      </svg>

      {/* ── 2. INDIVIDUAL 3D STILL-LIFE STUDIO FOOD ELEMENTS ── */}

      {/* Croissant + Crumbs + Roasted Coffee Beans Group */}
      <div
        ref={croissantGroupRef}
        className="absolute z-10 w-[170px] sm:w-[230px] md:w-[280px] lg:w-[330px] pointer-events-none select-none filter drop-shadow-[0_18px_26px_rgba(23,43,58,0.11)] will-change-transform"
        style={{ top: '18%', left: '11%' }}
      >
        <img
          src="/assets/images/hero/items/croissant_group_retina.png"
          alt="Artisanal butter croissant with golden crumbs and roasted coffee beans"
          className="w-full h-auto object-contain transform -rotate-6"
          loading="eager"
        />
      </div>

      {/* Orange Left (Whole sunkist citrus with stem & leaf) */}
      <div
        ref={orangeLeftRef}
        className="absolute z-10 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[230px] pointer-events-none select-none filter drop-shadow-[0_20px_30px_rgba(23,43,58,0.12)] will-change-transform"
        style={{ top: '34%', left: '-1%' }}
      >
        <img
          src="/assets/images/hero/items/orange_left_retina.png"
          alt="Fresh Farm Citrus Orange"
          className="w-full h-auto object-contain transform rotate-6"
          loading="eager"
        />
      </div>

      {/* Kraft Paper Grocery Bag (Village Deli) */}
      <div
        ref={bagRef}
        className="absolute z-10 w-[190px] sm:w-[260px] md:w-[330px] lg:w-[380px] pointer-events-none select-none filter drop-shadow-[0_25px_45px_rgba(23,43,58,0.14)] will-change-transform"
        style={{ bottom: '-10px', left: '-10px' }}
      >
        <img
          src="/assets/images/hero/items/bag_perfect.png"
          alt="Village Deli Branded Kraft Grocery Bag"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Orange Top Right (Whole sunkist orange with green leaves) */}
      <div
        ref={orangeRightRef}
        className="absolute z-10 w-[125px] sm:w-[170px] md:w-[210px] lg:w-[240px] pointer-events-none select-none filter drop-shadow-[0_20px_30px_rgba(23,43,58,0.12)] will-change-transform"
        style={{ top: '10%', right: '19%' }}
      >
        <img
          src="/assets/images/hero/items/orange_top_right_retina.png"
          alt="Fresh Sunkist Orange with Leaves"
          className="w-full h-auto object-contain transform -rotate-6"
          loading="eager"
        />
      </div>

      {/* Milk Bottle (Cold-chain farm milk in vintage glass bottle) */}
      <div
        ref={milkRef}
        className="absolute z-10 w-[110px] sm:w-[150px] md:w-[185px] lg:w-[210px] pointer-events-none select-none filter drop-shadow-[0_20px_30px_rgba(23,43,58,0.10)] will-change-transform"
        style={{ top: '35%', right: '4.5%' }}
      >
        <img
          src="/assets/images/hero/items/milk_bottle_retina.png"
          alt="Cold-Chain Glass Milk Bottle"
          className="w-full h-auto object-contain transform rotate-10"
          loading="eager"
        />
      </div>

      {/* Vine Tomatoes (Ripe red tomatoes on green vine) */}
      <div
        ref={tomatoesRef}
        className="absolute z-10 w-[130px] sm:w-[175px] md:w-[215px] lg:w-[245px] pointer-events-none select-none filter drop-shadow-[0_18px_26px_rgba(23,43,58,0.13)] will-change-transform"
        style={{ top: '53%', right: '13%' }}
      >
        <img
          src="/assets/images/hero/items/tomatoes_retina.png"
          alt="Vine Ripe Farm Tomatoes"
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Floating Citrus Leaves */}
      <div
        ref={leaf1Ref}
        className="hero-leaf-depth absolute z-10 w-[30px] sm:w-[42px] md:w-[50px] pointer-events-none select-none filter drop-shadow-[0_8px_14px_rgba(23,43,58,0.1)] will-change-transform"
        style={{ top: '29%', right: '27%' }}
      >
        <img src="/assets/images/hero/items/leaf_top_retina.png" alt="Floating Leaf" className="w-full h-auto" />
      </div>

      <div
        ref={leaf2Ref}
        className="hero-leaf-depth absolute z-10 w-[34px] sm:w-[45px] md:w-[56px] pointer-events-none select-none filter drop-shadow-[0_10px_16px_rgba(23,43,58,0.1)] will-change-transform"
        style={{ top: '44%', right: '20%' }}
      >
        <img src="/assets/images/hero/items/leaf_mid_retina.png" alt="Floating Leaf" className="w-full h-auto transform -rotate-15" />
      </div>

      {/* ── 3. TOP UTILITY ROW: ACTIVE STATUS & LIVE IST CLOCK ── */}
      <div className="hero-mount-elem relative z-30 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#172B3A]/10 text-xs font-mono text-[#172B3A]">
        {/* Left: Brand Network Status */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C86B4A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C86B4A]"></span>
          </span>
          <span className="font-bold tracking-widest uppercase">VILLAGE DELI NETWORK</span>
          <span className="text-[#C86B4A]">•</span>
          <span className="text-[#202321]/70 hidden sm:inline">HARYANA 2026 DEPLOYMENT</span>
        </div>

        {/* Right: Live IST Clock & Hub Tagline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-[#E5D8C5] shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span className="font-bold text-[#172B3A]">{timeStr || '05:45:00 pm'}</span>
            <span className="text-[10px] text-[#202321]/60 font-semibold">IST</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[#202321]/75">
            <Compass className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span className="font-semibold">24/7 Gateway Hub ✦</span>
          </div>
        </div>
      </div>

      {/* ── 4. CORNER EDITORIAL BADGES (NATIVE VECTOR) ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-start justify-between pointer-events-none">
        {/* Top-Left: Fresh Things / Brighter People & 24/7 Badge */}
        <div className="hero-mount-elem flex flex-col items-start space-y-1 text-left pointer-events-auto">
          <div className="w-5 h-0.5 bg-[#C86B4A] mb-1" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#172B3A] font-semibold leading-snug">
            Fresh Things<br />Brighter People
          </span>

          {/* Interactive 24/7 Circle Badge */}
          <button
            onClick={scrollToTwentyFour}
            title="Jump down to 24/7 Celestial Scroll"
            className="mt-2.5 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#172B3A]/30 bg-white/60 backdrop-blur-xs flex items-center justify-center font-serif text-sm font-bold text-[#172B3A] hover:border-[#C86B4A] hover:text-[#C86B4A] hover:scale-105 transition-all duration-300 card-pop-subtle cursor-pointer shadow-xs"
          >
            24/7
          </button>
        </div>

        {/* Top-Right: The Everyday Stop */}
        <div className="hero-mount-elem text-right space-y-1 pointer-events-auto">
          <div className="w-5 h-0.5 bg-[#C86B4A] ml-auto mb-1" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#172B3A] font-semibold block leading-snug">
            The<br />Everyday<br />Stop
          </span>
        </div>
      </div>

      {/* ── 5. CENTER MASTER TYPOGRAPHY (100% NATIVE CRISP VECTOR FONTS) ── */}
      <div
        ref={headlineRef}
        className="relative z-20 max-w-4xl mx-auto w-full text-center my-auto py-2 sm:py-3 select-none will-change-transform"
      >
        {/* Eyebrow badge */}
        <div className="hero-mount-elem inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-[0.26em] text-[#172B3A] mb-2 sm:mb-3">
          <span className="text-[#C86B4A] text-sm leading-none">✦</span>
          <span className="font-semibold">A 24/7 NEIGHBOURHOOD SANCTUARY</span>
          <span className="text-[#C86B4A] text-sm leading-none">✦</span>
        </div>

        {/* Main Serif Headline: 100% Razor-Sharp Web Fonts */}
        <div className="hero-mount-elem space-y-0 sm:space-y-1">
          <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[6.6rem] text-[#172B3A] tracking-tight leading-[0.93] drop-shadow-xs">
            Always
          </h1>

          <div className="relative inline-block mt-0.5 sm:mt-1">
            <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[6.6rem] text-[#172B3A] tracking-tight leading-[0.93] drop-shadow-xs">
              Here{' '}
              <span className="relative inline-block">
                For
                <svg
                  viewBox="0 0 100 8"
                  className="absolute left-1/2 -translate-x-1/2 top-[100%] w-[115%] h-auto text-[#C86B4A] pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 2 4 Q 50 2.5 98 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.92"
                  />
                </svg>
              </span>{' '}
              You<span className="text-[#C86B4A]">.</span>
            </h1>
          </div>
        </div>

        {/* Script Subheading: Freshly Always. */}
        <p className="hero-mount-elem font-editorial-script text-3xl sm:text-4xl md:text-5xl text-[#C86B4A] tracking-wide mt-3 sm:mt-4 font-semibold">
          Freshly Always.
        </p>

        {/* Category Navigation Links */}
        <div className="hero-mount-elem flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm md:text-base font-serif text-[#172B3A] mt-4 sm:mt-5">
          <Link to="/offerings" className="hover:text-[#C86B4A] transition-colors font-medium cursor-pointer">
            Groceries
          </Link>
          <span className="text-[#C86B4A] text-[8px]">●</span>
          <Link to="/offerings" className="hover:text-[#C86B4A] transition-colors font-medium cursor-pointer">
            Bakery
          </Link>
          <span className="text-[#C86B4A] text-[8px]">●</span>
          <Link to="/offerings" className="hover:text-[#C86B4A] transition-colors font-medium cursor-pointer">
            Quick Meals
          </Link>
          <span className="text-[#C86B4A] text-[8px]">●</span>
          <Link to="/offerings" className="hover:text-[#C86B4A] transition-colors font-medium cursor-pointer">
            Beverages
          </Link>
          <span className="text-[#C86B4A] text-[8px]">●</span>
          <Link to="/offerings" className="hover:text-[#C86B4A] transition-colors font-medium cursor-pointer">
            Essentials
          </Link>
        </div>

        {/* Primary CTA Button: Explore Now */}
        <div className="hero-mount-elem mt-5 sm:mt-7">
          <Link
            to="/offerings"
            data-cursor="EXPLORE"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#172B3A] text-white hover:bg-[#223d52] text-xs sm:text-sm font-semibold tracking-wider shadow-lg transition-all duration-300 card-pop cursor-pointer hover:shadow-xl hover:scale-105"
          >
            <span>Explore Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>

      {/* ── 6. BOTTOM UTILITY ROW: SCROLL INDICATOR & REGION ANNOTATION ── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-end justify-between pt-1 pointer-events-none">
        {/* Left symmetry space */}
        <div className="w-28 hidden sm:block pointer-events-none" />

        {/* Bottom Center: Scroll to Explore Mouse Pill */}
        <div className="hero-mount-elem flex flex-col items-center pointer-events-auto">
          <button
            onClick={scrollToManifesto}
            title="Scroll to Explore"
            className="flex flex-col items-center gap-1.5 cursor-pointer group card-pop-subtle"
          >
            <div className="w-5 h-8 rounded-full border-2 border-[#172B3A]/40 flex justify-center pt-1.5 group-hover:border-[#C86B4A] transition-colors bg-white/40">
              <div className="w-1 h-2 rounded-full bg-[#172B3A] group-hover:bg-[#C86B4A] animate-bounce" />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-[#172B3A]/70 font-semibold group-hover:text-[#C86B4A] transition-colors">
              Scroll to Explore
            </span>
          </button>
        </div>

        {/* Bottom Right: Haryana -> North India (01/06 and Good Food Brighter Days completely removed) */}
        <div className="hero-mount-elem flex flex-col items-end space-y-1 text-right pointer-events-auto">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#172B3A]/75 flex items-center gap-1.5 font-semibold">
            <span>HARYANA</span>
            <span className="text-[#C86B4A]">→</span>
            <span>NORTH INDIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
