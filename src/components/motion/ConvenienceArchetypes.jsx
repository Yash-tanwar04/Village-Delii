import React, { useEffect, useRef } from 'react';
import { Route, Fuel, Building2, Home, Train, Briefcase, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPANSION } from '../../data/expansion';

gsap.registerPlugin(ScrollTrigger);

export function ConvenienceArchetypes() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const archetypes = [
    {
      ...EXPANSION.archetypes.items[0],
      icon: Route,
      image: "/assets/images/hero-scenery.jpg",
      tag: "Mobility & Commute",
    },
    {
      ...EXPANSION.archetypes.items[1],
      icon: Fuel,
      image: "/assets/images/store-approach.jpg",
      tag: "Refuel & Refresh",
    },
    {
      ...EXPANSION.archetypes.items[2],
      icon: Building2,
      image: "/assets/images/store-interior.jpg",
      tag: "Local Living",
    },
    {
      ...EXPANSION.archetypes.items[3],
      icon: Home,
      image: "/assets/images/store-night.jpg",
      tag: "Doorstep Access",
    },
    {
      ...EXPANSION.archetypes.items[4],
      icon: Train,
      image: "/assets/images/hero-scenery.jpg",
      tag: "High Footfall",
    },
    {
      ...EXPANSION.archetypes.items[5],
      icon: Briefcase,
      image: "/assets/images/store-interior.jpg",
      tag: "Workplace & Retail",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.archetype-card');
      const totalCards = cards.length;

      // Pinned horizontal glide for the 6 location archetypes
      gsap.to(cards, {
        xPercent: -100 * (totalCards - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalCards - 1),
          end: () => `+=${trackRef.current.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#172B3A] text-[#F7F4ED] flex flex-col justify-center overflow-hidden py-16"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block mb-1">
            Section 07 • Location Formats
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {EXPANSION.archetypes.title}
          </h2>
          <p className="text-sm sm:text-base text-[#E5D8C5]/80 mt-1 max-w-xl">
            {EXPANSION.archetypes.subtitle}
          </p>
        </div>
        <div className="text-xs font-mono text-[#C86B4A] flex items-center gap-2">
          <span>6 Strategic Archetypes</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {/* Horizontal Strip */}
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center w-full overflow-visible px-6 gap-6"
      >
        {archetypes.map((arch, idx) => {
          const Icon = arch.icon;

          return (
            <div
              key={arch.id}
              className="archetype-card w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] shrink-0"
            >
              <div className="rounded-[32px] overflow-hidden bg-[#202321] border border-[#C86B4A]/30 shadow-2xl h-[480px] flex flex-col justify-between text-left relative group">
                
                {/* Environmental Image */}
                <div className="relative h-3/5 w-full overflow-hidden">
                  <img
                    src={arch.image}
                    alt={arch.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202321] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-[#C86B4A] font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#E5D8C5]">
                      {arch.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between -mt-4 bg-[#202321] rounded-t-2xl z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#A8B29B]/20 text-[#C86B4A] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#C86B4A] transition-colors">
                        {arch.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#E5D8C5]/80 leading-relaxed">
                      {arch.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#C86B4A]">
                    <span>Round-the-clock convenience</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
