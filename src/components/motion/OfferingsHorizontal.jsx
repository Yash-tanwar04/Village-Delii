import React, { useEffect, useRef } from 'react';
import { ShoppingBag, Apple, Croissant, Sandwich, CupSoda, Milk, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OFFERINGS } from '../../data/offerings';

gsap.registerPlugin(ScrollTrigger);

export function OfferingsHorizontal() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const icons = {
    groceries: ShoppingBag,
    'fresh-produce': Apple,
    'fresh-bakery': Croissant,
    'quick-meals': Sandwich,
    beverages: CupSoda,
    'dairy-essentials': Milk,
  };

  const images = {
    groceries: "/assets/images/store-interior.jpg",
    'fresh-produce': "/assets/images/hero-scenery.jpg",
    'fresh-bakery': "/assets/images/store-approach.jpg",
    'quick-meals': "/assets/images/store-interior.jpg",
    beverages: "/assets/images/store-night.jpg",
    'dairy-essentials': "/assets/images/network-expansion.jpg",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.horizontal-panel');
      const totalPanels = panels.length;

      // GSAP Horizontal scroll pinned to vertical scrolling
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalPanels - 1),
          end: () => `+=${trackRef.current.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Scale active panel while previous & next remain partially visible
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector('.panel-inner'),
          { scale: 0.92, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offerings"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#172B3A] text-[#F7F4ED] flex flex-col justify-center overflow-hidden py-16"
    >
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block mb-1">
            Section 02 • Core Retail Categories
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {OFFERINGS.title}
          </h2>
          <p className="font-serif text-xl sm:text-2xl text-[#E5D8C5] italic mt-1">
            "{OFFERINGS.tagline}"
          </p>
        </div>
        <div className="text-xs font-mono text-[#C86B4A] flex items-center gap-2">
          <span>Scroll Vertically to Glide Horizontally</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {/* Horizontal Track Canvas */}
      <div
        ref={trackRef}
        className="flex flex-nowrap items-center w-full overflow-visible px-6 gap-6"
      >
        {OFFERINGS.categories.map((cat, idx) => {
          const Icon = icons[cat.id] || ShoppingBag;
          const bgImg = images[cat.id] || "/assets/images/store-interior.jpg";

          return (
            <div
              key={cat.id}
              className="horizontal-panel w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[35vw] shrink-0"
            >
              <div className="panel-inner rounded-[32px] overflow-hidden bg-[#202321] border border-[#C86B4A]/30 shadow-2xl transition-all duration-300 flex flex-col h-[520px] text-left relative group">
                
                {/* Large Category Visual Canvas */}
                <div className="relative h-2/3 w-full overflow-hidden">
                  <img
                    src={bgImg}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202321] via-[#202321]/20 to-transparent" />
                  
                  {/* Category Index & Tag Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-[#C86B4A] font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#E5D8C5]">
                      {cat.tag}
                    </span>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-10 -mt-6 bg-[#202321] rounded-t-3xl">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-[#A8B29B]/20 text-[#C86B4A] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#C86B4A] transition-colors">
                        {cat.title}
                      </h3>
                    </div>

                    <p className="text-sm font-medium text-[#E5D8C5] mb-2">
                      {cat.description}
                    </p>

                    <p className="text-xs text-[#E5D8C5]/70 leading-relaxed line-clamp-2">
                      {cat.details}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#C86B4A]">
                    <span>Always Stocked 24/7</span>
                    <span>Direct Fresh Supply</span>
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
