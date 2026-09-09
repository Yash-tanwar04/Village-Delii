import React, { useEffect, useRef } from 'react';
import { Wheat, Citrus, Flame, Zap, Armchair, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from '../../data/experience';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSequence() {
  const containerRef = useRef(null);

  const experiencesData = [
    {
      ...EXPERIENCES.items[0],
      icon: Wheat,
      badge: "Onsite Chakki Mill",
      image: "/assets/images/store-interior.jpg",
      direction: "left",
      quote: "Stone-ground milling at low temperature preserves natural vitamins, aroma and dietary fiber."
    },
    {
      ...EXPERIENCES.items[1],
      icon: Citrus,
      badge: "Cold-Pressed Juices",
      image: "/assets/images/hero-scenery.jpg",
      direction: "right",
      quote: "100% raw juice extracted slowly to retain live enzymes and nutrients without added sugars."
    },
    {
      ...EXPERIENCES.items[2],
      icon: Flame,
      badge: "Artisanal Ovens",
      image: "/assets/images/store-approach.jpg",
      direction: "left",
      quote: "Freshly prepared batches of artisanal sourdough loaves, morning croissants, and tea cakes."
    },
    {
      ...EXPERIENCES.items[3],
      icon: Zap,
      badge: "Frictionless Flow",
      image: "/assets/images/store-night.jpg",
      direction: "right",
      quote: "Wide aisles and instant contactless billing designed for people on the move."
    },
    {
      ...EXPERIENCES.items[4],
      icon: Armchair,
      badge: "Neighbourhood Hospitality",
      image: "/assets/images/store-interior.jpg",
      direction: "left",
      quote: "Comfortable oak seating, charging points, and a serene ambiance to recharge your mind."
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.exp-full-viewport');

      panels.forEach((panel, i) => {
        const textCol = panel.querySelector('.exp-text');
        const imgCol = panel.querySelector('.exp-img');

        gsap.fromTo(
          textCol,
          {
            x: i % 2 === 0 ? -70 : 70,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 75%',
              end: 'top 25%',
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          imgCol,
          {
            scale: 0.9,
            clipPath: 'inset(10% round 32px)',
          },
          {
            scale: 1,
            clipPath: 'inset(0% round 32px)',
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 80%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="experience" ref={containerRef} className="bg-[#F7F4ED] text-[#202321]">
      {/* Intro Pin Header */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-left border-b border-[#E5D8C5]">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A8B29B] font-bold">
            Section 03 • Sensory Craft & Rituals
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
            {EXPERIENCES.title}
          </h2>
          <p className="font-serif text-2xl sm:text-3xl text-[#A8B29B] italic font-medium">
            "{EXPERIENCES.subtitle}"
          </p>
          <p className="text-base sm:text-lg text-[#202321]/80 leading-relaxed pt-2">
            {EXPERIENCES.intro}
          </p>
        </div>
      </section>

      {/* 5 Full-Screen Viewport Sequences */}
      {experiencesData.map((exp, idx) => {
        const Icon = exp.icon;
        const isEven = idx % 2 === 0;

        return (
          <section
            key={exp.id}
            className="exp-full-viewport min-h-[90vh] flex items-center justify-center py-16 px-6 border-b border-[#E5D8C5] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Text Side */}
              <div
                className={`exp-text lg:col-span-6 space-y-6 text-left ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#172B3A] text-[#C86B4A] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#A8B29B] block">Ritual 0{idx + 1} of 05</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#172B3A]/5 text-[#172B3A] border border-[#E5D8C5]">
                      {exp.badge}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172B3A] leading-tight">
                  {exp.title}
                </h3>

                <p className="text-lg font-medium text-[#A8B29B]">
                  {exp.description}
                </p>

                <p className="text-sm sm:text-base text-[#202321]/80 leading-relaxed max-w-lg">
                  {exp.details}
                </p>

                <div className="p-4 rounded-2xl bg-white border-l-4 border-[#A8B29B] shadow-xs max-w-lg">
                  <p className="text-xs sm:text-sm italic text-[#202321]/85">
                    "{exp.quote}"
                  </p>
                </div>
              </div>

              {/* Masked Large Visual Side */}
              <div
                className={`exp-img lg:col-span-6 relative ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border border-[#E5D8C5] bg-[#172B3A]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] block mb-1">
                      {exp.feature}
                    </span>
                    <h4 className="font-serif text-xl font-bold">
                      {exp.title}
                    </h4>
                  </div>
                </div>
              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
}
