import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, MapPin, Sparkles, Clock, Compass, Image as ImageIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND } from '../../data/brand';
import { ConstellationCanvas } from './ConstellationCanvas';

gsap.registerPlugin(ScrollTrigger);

export function HeroMotion() {
  const containerRef = useRef(null);
  const [visualMode, setVisualMode] = useState('constellation'); // 'constellation' | 'photo'
  const textAlwaysRef = useRef(null);
  const textHereRef = useRef(null);
  const textForYouRef = useRef(null);
  const imageFrameRef = useRef(null);
  const badgesRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial entrance animation
      const tlEnter = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tlEnter
        .from([textAlwaysRef.current, textHereRef.current, textForYouRef.current], {
          y: 80,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
        })
        .from(
          imageFrameRef.current,
          {
            scale: 0.85,
            opacity: 0,
            duration: 1.4,
            ease: 'expo.out',
          },
          '-=0.9'
        )
        .from(
          [badgesRef.current, ctaRef.current, scrollIndicatorRef.current],
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
          },
          '-=0.6'
        );

      // 2. ScrollTrigger Scrub: The Everyday in Motion
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tlScroll
        // ALWAYS shifts horizontally
        .to(textAlwaysRef.current, {
          xPercent: -35,
          opacity: 0.4,
          ease: 'none',
        }, 0)
        // HERE expands and centers
        .to(textHereRef.current, {
          scale: 1.25,
          color: '#A8B29B',
          ease: 'none',
        }, 0)
        // FOR YOU shifts inward
        .to(textForYouRef.current, {
          xPercent: 20,
          opacity: 0.7,
          ease: 'none',
        }, 0)
        // Image expands from masked pill to wide cinematic canvas
        .to(imageFrameRef.current, {
          scale: 1.15,
          borderRadius: '24px',
          ease: 'none',
        }, 0)
        // Reveal badges with champagne accent
        .to(badgesRef.current, {
          y: -20,
          opacity: 1,
          scale: 1.05,
          ease: 'none',
        }, 0.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F7F4ED] text-[#202321] flex flex-col justify-between overflow-hidden pt-24 pb-8"
    >
      {/* Subtle organic background ambient glow */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#A8B29B]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-[#C86B4A]/15 blur-3xl pointer-events-none" />

      {/* Top Brand Subtitle & 24/7 Status */}
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A8B29B]">
          <span className="w-2 h-2 rounded-full bg-[#A8B29B] animate-pulse" />
          <span>The Everyday, in Motion</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#172B3A]/5 text-[#172B3A] border border-[#E5D8C5]">
          <Clock className="w-3.5 h-3.5 text-[#C86B4A]" />
          <span>Always Open • 24/7</span>
        </div>
      </div>

      {/* Main Core Hero Stage */}
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Kinetic Massive Editorial Typography */}
          <div className="lg:col-span-7 space-y-1 sm:space-y-2 text-left select-none">
            
            <div className="overflow-hidden">
              <h1
                ref={textAlwaysRef}
                className="font-serif font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#172B3A] leading-[0.9]"
              >
                ALWAYS
              </h1>
            </div>

            <div className="overflow-hidden flex items-center gap-4">
              <h1
                ref={textHereRef}
                className="font-serif italic font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#A8B29B] leading-[0.9]"
              >
                HERE
              </h1>
              <span className="hidden sm:inline-block h-0.5 flex-1 bg-[#E5D8C5]" />
            </div>

            <div className="overflow-hidden">
              <h1
                ref={textForYouRef}
                className="font-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#172B3A] leading-[0.95]"
              >
                FOR YOU.
              </h1>
            </div>

            {/* Brand Statement Subtext */}
            <div className="pt-4 max-w-xl">
              <p className="text-sm sm:text-base md:text-lg text-[#202321]/80 leading-relaxed font-normal">
                {BRAND.heroDescription}
              </p>
            </div>
          </div>

          {/* Masked Editorial Store Window / 3D Celestial Constellation Visual */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end">
            {/* View Switcher Pill */}
            <div className="mb-3 flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E5D8C5] shadow-xs z-20">
              <button
                type="button"
                onClick={() => setVisualMode('constellation')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  visualMode === 'constellation'
                    ? 'bg-[#172B3A] text-[#F7F4ED] shadow-xs'
                    : 'text-[#202321]/70 hover:text-[#172B3A]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span>3D Constellation</span>
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('photo')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  visualMode === 'photo'
                    ? 'bg-[#172B3A] text-[#F7F4ED] shadow-xs'
                    : 'text-[#202321]/70 hover:text-[#172B3A]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#A8B29B]" />
                <span>Store Vista</span>
              </button>
            </div>

            <div
              ref={imageFrameRef}
              className="relative w-full max-w-md aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-[#E5D8C5] bg-[#172B3A]"
            >
              {visualMode === 'constellation' ? (
                <ConstellationCanvas
                  compact={true}
                  height="h-full"
                  className="w-full h-full"
                  showControls={true}
                />
              ) : (
                <>
                  <img
                    src="/assets/images/store-approach.jpg"
                    alt="Village Deli Modern Exterior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/85 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Architectural Badge */}
                  <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-1 pointer-events-none">
                    <span className="text-[11px] uppercase tracking-widest text-[#C86B4A] font-bold block">
                      Neighbourhood Convenience
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold">
                      Village Deli
                    </h3>
                    <p className="text-xs text-[#E5D8C5] line-clamp-2">
                      {BRAND.subheading}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Revealed Signature Badges & Action CTAs */}
        <div className="mt-8 pt-6 border-t border-[#E5D8C5]/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Badges */}
          <div
            ref={badgesRef}
            className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-wider text-[#172B3A]"
          >
            <span className="text-[#A8B29B] font-bold">FRESH.</span>
            <span className="text-[#E5D8C5]">•</span>
            <span className="text-[#172B3A]">CONVENIENT.</span>
            <span className="text-[#E5D8C5]">•</span>
            <span className="text-[#C86B4A] font-bold">TRUSTED.</span>
            <span className="text-[#E5D8C5]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#172B3A] text-[#C86B4A] font-mono text-xs">
              24/7
            </span>
          </div>

          {/* Primary and Secondary CTAs */}
          <div ref={ctaRef} className="flex items-center gap-3">
            <Link
              to="/offerings"
              className="px-6 py-3 rounded-full bg-[#172B3A] text-[#F7F4ED] hover:bg-[#A8B29B] font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-md group cursor-pointer"
            >
              <span>Explore Village Deli</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C86B4A]" />
            </Link>

            <Link
              to="/locations"
              className="px-6 py-3 rounded-full bg-white text-[#172B3A] hover:bg-[#E5D8C5]/30 font-semibold text-xs sm:text-sm transition-all duration-300 border border-[#E5D8C5] flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#A8B29B]" />
              <span>Find a Location</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={() => scrollToSection('moments')}
        className="relative z-10 flex flex-col items-center gap-1.5 text-xs text-[#A8B29B] font-medium cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-widest text-[#202321]/60">Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#C86B4A]" />
      </div>
    </section>
  );
}
