import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Route, Fuel, Building2, Home, Train, Briefcase, 
  Handshake, CheckCircle2, Navigation, Compass, ShieldCheck, MapPin, 
  ExternalLink, ChevronRight, Eye, Milestone, Clock, Layers, Award
} from 'lucide-react';
import gsap from 'gsap';
import { EXPANSION } from '../data/expansion';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

export function ExpansionPage() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [hoveredNode, setHoveredNode] = useState(null);
  const tickerRef = useRef(null);
  const reverseTickerRef = useRef(null);
  const chapterContentRef = useRef(null);

  // Marquee Continuous Ticker Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(tickerRef.current, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(reverseTickerRef.current, {
        xPercent: 50,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });
    });
    return () => ctx.revert();
  }, []);

  // Smooth fade when chapter changes
  useEffect(() => {
    if (chapterContentRef.current) {
      gsap.fromTo(
        chapterContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeChapter]);

  // 3 Strategic Regional Horizons
  const chapters = [
    {
      id: 1,
      num: '01',
      title: 'The Punjab Heritage',
      subtitle: 'Proving Ground of 24/7 Highway Hospitality',
      corridor: 'Grand Trunk Road (NH-44)',
      period: 'ESTABLISHED & EXPANDING',
      description: 'The foundation of the Village Deli philosophy. Born along the legendary Grand Trunk Road, this format demonstrated that long-distance travellers and local communities cherish an authentic, round-the-clock oasis offering live stone-chakki milling, warm hearth baking, clean washroom lounges, and pure food hospitality.',
      nodes: [
        { name: 'Punjab Highway Flagship', status: 'Operational 24/7', role: 'Original Heritage Anchor' },
        { name: 'Ambala Highway Oasis', status: 'Inter-State Junction', role: 'Transit Rest Stop' },
        { name: 'Karnal Agricultural Spine', status: 'Active Node', role: 'Farm-Direct Gateway' }
      ],
      metrics: {
        density: '80,000+ Vehicles Daily',
        footprint: '4,500 – 6,500 SQ. FT.',
        signature: 'Live Stone Chakki Milling · Hearth Bakes · Oak Lounge'
      },
      image: '/assets/images/ghibli-day.jpg',
      badge: 'HERITAGE BLUEPRINT'
    },
    {
      id: 2,
      num: '02',
      title: 'Haryana 2026 Corridors',
      subtitle: 'High-Density Transit & Urban Neighbourhoods',
      corridor: 'Dwarka Expressway, Sohna Arterial & NH-48',
      period: 'ACTIVE DEPLOYMENT 2026',
      description: 'The primary growth engine of Village Deli. Integrating directly with Haryana\'s premier modern transport corridors, high-density residential townships, and corporate clusters. Designed for seamless grab-and-go convenience, midnight commuters, early airport travellers, and residential household pantry replenishment.',
      nodes: [
        { name: 'Sector 114 (Delhi-Gurgaon Border)', status: 'Q2 2026 Flagship', role: 'Expressway Gateway' },
        { name: 'Sector 83 (NH-48 New Gurgaon)', status: 'Township Anchor', role: 'Mega-Residential Node' },
        { name: 'K.D. Square (Sohna Arterial)', status: 'Commercial Axis', role: 'Daily Suburban Hub' },
        { name: 'JMS Marine Square (Sector 102)', status: 'Transit Interchange', role: 'Urban Lifestyle Node' }
      ],
      metrics: {
        density: '250,000+ Vehicles Daily',
        footprint: '2,500 – 5,000 SQ. FT.',
        signature: '24/7 Drive-Through · Stone Atta Pickup · Cold-Chain Dairy'
      },
      image: '/assets/images/store-approach.jpg',
      badge: 'IMMEDIATE FOCUS'
    },
    {
      id: 3,
      num: '03',
      title: 'Connected North India',
      subtitle: 'The Inter-State Integrated Network',
      corridor: 'NCR Ring, Western Expressways & Beyond',
      period: 'VISION 2026–2028',
      description: 'An interconnected ecosystem linking Punjab, Haryana, Chandigarh, and Delhi NCR into a singular continuum of 24/7 convenience and clean food. Partnering with state institutions and green mobility hubs to ensure travellers never have to compromise on nutrition, hygiene, or comfort on North Indian journeys.',
      nodes: [
        { name: 'Chandigarh Highway Link', status: 'Planned Pipeline', role: 'Northern Corridor' },
        { name: 'Delhi-Mumbai Expressway Hub', status: 'Feasibility Stage', role: 'Mobility Plaza' },
        { name: 'Western Peripheral Arteries', status: 'Site Selection', role: 'Transit Connector' }
      ],
      metrics: {
        density: 'Regional Scale',
        footprint: 'Modular Formats',
        signature: 'Standardized 24/7 Availability · EV Mobility Plazas'
      },
      image: '/assets/images/network-expansion.jpg',
      badge: 'REGIONAL HORIZON'
    }
  ];

  // 6 Archetype Formats with rich details and imagery
  const archetypeDetails = [
    {
      ...EXPANSION.archetypes.items[0],
      icon: Route,
      footprint: '3,000 – 6,000 sq.ft',
      target: 'Highway commuters, holidaying families, inter-state fleet',
      feature: 'Dedicated drive-in parking, clean washrooms, 24/7 hot bakery & cold pressed bar',
      image: '/assets/images/store-night.jpg'
    },
    {
      ...EXPANSION.archetypes.items[1],
      icon: Fuel,
      footprint: '1,500 – 3,000 sq.ft',
      target: 'Commuters refuelling, quick highway pit-stops, EV charge wait times',
      feature: 'Express checkout under 2 minutes, grab-and-go deli bowls, barista coffee',
      image: '/assets/images/hero-scenery.jpg'
    },
    {
      ...EXPANSION.archetypes.items[2],
      icon: Building2,
      footprint: '2,000 – 4,000 sq.ft',
      target: 'Local neighbourhood families, evening stroll footfall',
      feature: 'Fresh cold-pressed cooking oils, stone-chakki atta, daily morning sourdough',
      image: '/assets/images/store-interior.jpg'
    },
    {
      ...EXPANSION.archetypes.items[3],
      icon: Home,
      footprint: '2,500 – 4,500 sq.ft',
      target: 'Residents of gated societies and integrated luxury townships',
      feature: '24/7 midnight grocery pantry, pure farm dairy, doorstep replenishment',
      image: '/assets/images/empty-landscape.jpg'
    },
    {
      ...EXPANSION.archetypes.items[4],
      icon: Train,
      footprint: '1,200 – 2,500 sq.ft',
      target: 'Rapid transit passengers, metro & interchange commuters',
      feature: 'High-speed touchless checkout, fresh snack packs, energy juices',
      image: '/assets/images/ghibli-night.jpg'
    },
    {
      ...EXPANSION.archetypes.items[5],
      icon: Briefcase,
      footprint: '2,500 – 5,000 sq.ft',
      target: 'Office professionals, coworking teams, business meetings',
      feature: 'Oak seating booths, artisanal sandwiches, premium coffee and working snacks',
      image: '/assets/images/store-approach.jpg'
    }
  ];

  // Interactive Highway Corridor Schematic Milestones
  const highwayMilestones = [
    {
      name: 'GT Road / NH-44',
      region: 'Punjab Spine',
      status: 'OPERATIONAL',
      specs: 'Flagship Store · 24/7 Chakki & Hearth Bakes',
      badge: 'HERITAGE'
    },
    {
      name: 'Ambala Highway Junction',
      region: 'Haryana North',
      status: 'OPERATIONAL',
      specs: 'Highway Oasis · 80,000+ Daily Vehicles',
      badge: 'TRANSIT'
    },
    {
      name: 'Sector 114 Delhi Border',
      region: 'Dwarka Expressway',
      status: 'Q2 2026 FIT-OUT',
      specs: 'Prime Gateway · 150,000+ Daily Commuters',
      badge: 'IMMEDIATE'
    },
    {
      name: 'JMS Marine Square',
      region: 'Sector 102 Artery',
      status: 'UNDER DEVELOPMENT',
      specs: 'Transit Hub · High Footfall Commercial',
      badge: 'PIPELINE'
    },
    {
      name: 'K.D. Square Sohna',
      region: 'Sohna Road',
      status: 'ACTIVE LEASE',
      specs: 'Suburban Hub · Township Replenishment',
      badge: 'URBAN'
    },
    {
      name: 'Sector 83 Artery',
      region: 'NH-48 New Gurgaon',
      status: 'SITE SECURED',
      specs: 'Residential Anchor · 24/7 Dining & Deli',
      badge: 'EXPANSION'
    }
  ];

  const currentChapter = chapters.find(c => c.id === activeChapter) || chapters[1];

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      
      {/* ── 01. EDITORIAL MONOGRAPH HERO ── */}
      <section className="pt-32 pb-20 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute top-0 right-1/4 w-[650px] h-[650px] rounded-full bg-[#C86B4A]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>05 / REGIONAL EXPANSION BLUEPRINT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-5">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.4rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>Growing Across</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.12}>North India.</TextReveal>
                </span>
              </h1>
              
              <p className="font-serif text-2xl sm:text-3xl text-[#C86B4A] italic font-medium max-w-2xl">
                "{EXPANSION.subheading}"
              </p>
              
              <p className="text-base sm:text-lg text-[#202321]/80 font-light max-w-2xl pt-1 leading-relaxed">
                {EXPANSION.description}
              </p>
            </div>

            {/* Live Master Metric Blocks with Card Pop */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-left">
              <CardPop className="p-4 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86B4A] block mb-1">
                  HOURS ACTIVE
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A] block">
                  24 / 7
                </span>
                <span className="text-[11px] font-mono text-[#202321]/60">Always Open & Staffed</span>
              </CardPop>

              <CardPop className="p-4 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86B4A] block mb-1">
                  RETAIL FORMATS
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A] block">
                  06
                </span>
                <span className="text-[11px] font-mono text-[#202321]/60">Living Archetypes</span>
              </CardPop>

              <CardPop className="p-4 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86B4A] block mb-1.5">
                    STATE ALLIANCE
                  </span>
                  <div className="flex items-center gap-2 bg-[#F7F4ED] p-1 rounded-lg w-fit mb-1.5 border border-[#E5D8C5]">
                    <img src="/assets/images/harhith-logo.jpg" alt="HarHith Store" className="h-4.5 w-auto object-contain rounded" />
                    <div className="h-4 w-px bg-gray-300" />
                    <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-4.5 w-auto object-contain rounded" />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#202321]/70">HarHith + Vita Alliance</span>
              </CardPop>

              <CardPop className="p-4 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86B4A] block mb-1">
                  QUALITY PROMISE
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A] block">
                  100%
                </span>
                <span className="text-[11px] font-mono text-[#202321]/60">Live Stone-Ground</span>
              </CardPop>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. KINETIC DUAL-RIBBON MARQUEE TICKER ── */}
      <div className="border-y border-[#172B3A]/20 select-none overflow-hidden">
        {/* Ribbon 1: Moving Forward */}
        <div className="py-3 bg-[#C86B4A] text-[#172B3A] overflow-hidden whitespace-nowrap">
          <div ref={tickerRef} className="inline-block will-change-transform">
            {[
              'DWARKA EXPRESSWAY CORRIDOR',
              'PUNJAB GRAND TRUNK HERITAGE',
              'SOHNA ROAD ARTERIAL',
              'HARHITH + VITA ALLIANCE',
              'NH-48 TOWNSHIP SPINE',
              '24/7 ROADSIDE SANCTUARY',
              'DWARKA EXPRESSWAY CORRIDOR',
              'PUNJAB GRAND TRUNK HERITAGE',
              'SOHNA ROAD ARTERIAL',
            ].map((item, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-6 font-serif font-black text-xl sm:text-2xl tracking-wider">
                <span>{item}</span>
                <span className="text-white/60">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Ribbon 2: Moving Reverse with High-Precision Coordinates & Nodes */}
        <div className="py-2.5 bg-[#172B3A] text-[#E5D8C5] overflow-hidden whitespace-nowrap border-t border-white/10">
          <div ref={reverseTickerRef} className="inline-block will-change-transform">
            {[
              'SECTOR 114 DELHI BORDER FLAGSHIP',
              'AMBALA HIGHWAY OASIS',
              'K.D. SQUARE SOHNA',
              'JMS MARINE SQUARE SEC 102',
              'SECTOR 83 TOWNSHIP ANCHOR',
              'LIVE STONE CHAKKI MILLING',
              'SECTOR 114 DELHI BORDER FLAGSHIP',
              'AMBALA HIGHWAY OASIS',
            ].map((item, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-[#E5D8C5]/80">
                <span>{item}</span>
                <span className="text-[#C86B4A]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 03. STRATEGIC REGIONAL GROWTH TRILOGY (INTERACTIVE CHAPTER MONOGRAPH) ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-left border-b border-[#E5D8C5]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>THE EXPANSION CHAPTERS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
              Three Regional Horizons
            </h2>
            <p className="text-base text-[#202321]/75 font-light leading-relaxed">
              From our founding Grand Trunk roots in Punjab to Haryana\'s 2026 urban arteries, leading into a connected North Indian highway network.
            </p>
          </div>

          {/* Chapter Selector Tabs (Hover & Click Enabled) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white border border-[#E5D8C5] shadow-xs">
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onMouseEnter={() => setActiveChapter(ch.id)}
                  onClick={() => setActiveChapter(ch.id)}
                  className={'px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ' +
                    (isActive
                      ? 'bg-[#172B3A] text-white shadow-md scale-105'
                      : 'text-[#172B3A]/70 hover:text-[#172B3A] hover:bg-[#F7F4ED]')}
                >
                  <span className={isActive ? 'text-[#C86B4A]' : 'text-[#202321]/40'}>
                    {ch.num}.
                  </span>
                  <span>{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Active Chapter Showcase */}
        <div 
          ref={chapterContentRef}
          className="rounded-[36px] overflow-hidden border border-[#172B3A]/15 bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Left Column: Editorial Narrative & Node Verification */}
          <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86B4A] px-2.5 py-1 rounded-full bg-[#C86B4A]/10 border border-[#C86B4A]/30">
                  {currentChapter.badge}
                </span>
                <span className="text-[#172B3A]/30">•</span>
                <span className="text-xs font-mono text-[#202321]/60 uppercase tracking-wider">
                  {currentChapter.corridor}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#172B3A] leading-tight">
                {currentChapter.title}
              </h3>

              <p className="font-serif text-xl sm:text-2xl text-[#C86B4A] italic font-medium">
                "{currentChapter.subtitle}"
              </p>

              <p className="text-base text-[#202321]/80 font-light leading-relaxed">
                {currentChapter.description}
              </p>
            </div>

            {/* Verified Store Anchors Grid */}
            <div className="space-y-3 pt-6 border-t border-[#172B3A]/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#172B3A] font-bold block">
                  Key Corridor Anchors & Nodes
                </span>
                <span className="text-[11px] font-mono text-[#202321]/50">
                  Verified Locations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentChapter.nodes.map((node, nIdx) => (
                  <div 
                    key={nIdx} 
                    className="p-3.5 rounded-xl bg-[#F7F4ED]/70 border border-[#E5D8C5] hover:border-[#C86B4A]/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-[#C86B4A] shrink-0" />
                      <span className="font-serif text-sm font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                        {node.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#202321]/60 pl-6">
                      <span>{node.role}</span>
                      <span className="text-[#C86B4A] font-bold">{node.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Specifications Strip */}
            <div className="pt-6 border-t border-[#172B3A]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-[10px] font-mono text-[#202321]/50 uppercase block">Daily Traffic Density</span>
                  <span className="text-base sm:text-lg font-bold font-serif text-[#172B3A]">{currentChapter.metrics.density}</span>
                </div>
                <div className="h-8 w-px bg-[#172B3A]/10" />
                <div>
                  <span className="text-[10px] font-mono text-[#202321]/50 uppercase block">Typical Store Footprint</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#C86B4A]">{currentChapter.metrics.footprint}</span>
                </div>
              </div>

              <Link
                to="/locations"
                className="px-5 py-2.5 rounded-full bg-[#172B3A] text-white hover:bg-[#C86B4A] text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 shadow-xs hover:scale-105 duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span>Explore Interactive Map</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photographic Viewport */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full overflow-hidden bg-[#172B3A] group">
            <img
              src={currentChapter.image}
              alt={currentChapter.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/95 via-[#172B3A]/30 to-transparent pointer-events-none" />

            {/* Glassmorphic Badge Overlay */}
            <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-[#172B3A]/70 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
              <span className="text-[#C86B4A] mr-1.5">●</span>
              <span>CHAPTER {currentChapter.num}</span>
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white text-left space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] block">
                Signature Architectural Offering
              </span>
              <h4 className="font-serif text-2xl font-bold text-white leading-tight">
                {currentChapter.title}
              </h4>
              <p className="text-xs font-mono text-[#E5D8C5]/90 pt-1 leading-relaxed">
                {currentChapter.metrics.signature}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Overview Quick-Switch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {chapters.map((ch) => {
            const isSelected = activeChapter === ch.id;
            return (
              <div
                key={ch.id}
                onMouseEnter={() => setActiveChapter(ch.id)}
                onClick={() => setActiveChapter(ch.id)}
                className={'card-pop p-5 rounded-2xl border cursor-pointer flex flex-col justify-between gap-3 ' +
                  (isSelected
                    ? 'bg-[#172B3A] text-white border-[#172B3A] shadow-lg -translate-y-1'
                    : 'bg-white border-[#E5D8C5] text-[#172B3A] hover:bg-white/90 hover:border-[#C86B4A]/50')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#C86B4A]">
                    CHAPTER {ch.num}
                  </span>
                  <span className={'text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ' + 
                    (isSelected ? 'bg-white/15 text-[#E5D8C5]' : 'bg-[#172B3A]/5 text-[#172B3A]')}>
                    {ch.period}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold leading-tight mb-1">{ch.title}</h4>
                  <p className={'text-xs font-light line-clamp-2 ' + (isSelected ? 'text-[#E5D8C5]/80' : 'text-[#202321]/70')}>
                    {ch.corridor}
                  </p>
                </div>

                <div className={'pt-2 border-t flex items-center justify-between text-[11px] font-mono ' + 
                  (isSelected ? 'border-white/15 text-[#C86B4A]' : 'border-[#E5D8C5] text-[#172B3A]')}>
                  <span>{isSelected ? 'Active View' : 'Hover to Inspect'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 04. INTERACTIVE HIGHWAY CORRIDOR PULSE (SLEEK SCHEMATIC ROAD MAP) ── */}
      <section className="py-24 bg-[#172B3A] text-white text-left relative overflow-hidden border-b border-[#E5D8C5]/20">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C86B4A]/30 text-xs font-mono tracking-widest text-[#C86B4A]">
                <Milestone className="w-3.5 h-3.5" />
                <span>NORTH INDIA CORRIDOR ARTERY</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
                The Highway Pulse
              </h2>
              <p className="text-base text-[#E5D8C5]/80 font-light leading-relaxed">
                A connected line of hospitality. Inspect our key nodes across Punjab and Haryana. Hover over any waypoint to view site status.
              </p>
            </div>

            <div className="text-right font-mono text-xs text-[#E5D8C5]/60 hidden md:block">
              <span>UNBROKEN 24/7 NETWORK</span>
              <div className="text-[#C86B4A] font-bold">CONNECTING COMMUTERS & TOWNSHIPS</div>
            </div>
          </div>

          {/* Schematic Waypoint Track */}
          <div className="relative pt-6 pb-2">
            {/* Background connecting glowing rail line */}
            <div className="hidden lg:block absolute top-[52px] left-8 right-8 h-1 bg-gradient-to-r from-[#C86B4A] via-[#E5D8C5]/40 to-[#C86B4A] rounded-full opacity-40 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
              {highwayMilestones.map((ms, idx) => {
                const isHovered = hoveredNode === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredNode(idx)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={'card-pop p-5 rounded-2xl cursor-pointer flex flex-col justify-between gap-4 border ' +
                      (isHovered 
                        ? 'bg-white/15 border-[#C86B4A] shadow-xl -translate-y-2' 
                        : 'bg-white/5 border-white/10 hover:border-white/25')}
                  >
                    {/* Node Dot / Marker */}
                    <div className="flex items-center justify-between">
                      <div className={'w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ' +
                        (isHovered ? 'bg-[#C86B4A] text-white shadow-md' : 'bg-white/10 text-[#E5D8C5]')}>
                        0{idx + 1}
                      </div>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#C86B4A]/20 text-[#C86B4A] border border-[#C86B4A]/30">
                        {ms.badge}
                      </span>
                    </div>

                    {/* Node Title & Region */}
                    <div>
                      <span className="text-[10px] font-mono text-[#E5D8C5]/60 uppercase block">
                        {ms.region}
                      </span>
                      <h4 className="font-serif text-base font-bold text-white mt-1 leading-snug">
                        {ms.name}
                      </h4>
                    </div>

                    {/* Operational Details */}
                    <div className="pt-3 border-t border-white/10 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#C86B4A] block">
                        {ms.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#E5D8C5]/70 block leading-tight">
                        {ms.specs}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. THE 6 LIVING RETAIL FORMATS (HOVER REVEAL GALLERY) ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-left border-b border-[#E5D8C5]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>03 / ARCHITECTURAL ARCHETYPES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
              {EXPANSION.archetypes.title}
            </h2>
            <p className="text-base sm:text-lg text-[#202321]/75 font-light leading-relaxed">
              {EXPANSION.archetypes.subtitle}
            </p>
          </div>

          <div className="text-xs font-mono text-[#202321]/60 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#C86B4A]" />
            <span>Hover over any format card to view operational parameters</span>
          </div>
        </div>

        {/* 6 Luxury Architectural Cards with Hover Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archetypeDetails.map((arch, idx) => {
            const Icon = arch.icon;
            return (
              <div
                key={arch.id}
                className="card-pop group rounded-[30px] bg-white border border-[#E5D8C5] shadow-xs overflow-hidden flex flex-col justify-between"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#172B3A]">
                  <img
                    src={arch.image}
                    alt={arch.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A]/85 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-[#172B3A] font-mono text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                      FORMAT 0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-mono text-xs text-[#C86B4A] font-bold">
                      {arch.footprint}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                      {arch.title}
                    </h3>
                    <p className="text-sm text-[#202321]/80 font-light leading-relaxed">
                      {arch.description}
                    </p>
                  </div>

                  {/* Hover-Revealed Deep Specs Drawer */}
                  <div className="pt-4 border-t border-[#172B3A]/10 space-y-2 text-xs font-mono">
                    <div className="text-[#202321]/60">
                      <span className="font-bold text-[#172B3A] block">Target Audience:</span>
                      <span>{arch.target}</span>
                    </div>
                    <div className="text-[#202321]/60 pt-1">
                      <span className="font-bold text-[#C86B4A] block">Signature Amenity:</span>
                      <span>{arch.feature}</span>
                    </div>
                  </div>

                  {/* Footer Tag */}
                  <div className="pt-3 border-t border-[#172B3A]/10 flex items-center justify-between text-[11px] font-mono text-[#172B3A] font-bold">
                    <span>24/7 OPERATIONAL STANDARD</span>
                    <CheckCircle2 className="w-4 h-4 text-[#C86B4A]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 06. HARHITH + VITA SOVEREIGN ALLIANCE SHOWCASE ── */}
      <section className="py-24 bg-[#172B3A] text-white text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Official Dual Partner Seals Banner */}
          <div className="mb-12 inline-flex flex-wrap items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl shadow-md">
                <img src="/assets/images/harhith-logo.jpg" alt="HarHith Store" className="h-11 sm:h-14 w-auto object-contain rounded-lg" />
              </div>
              <span className="text-white/40 text-xl font-light">×</span>
              <div className="bg-white p-2 rounded-2xl shadow-md">
                <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-11 sm:h-14 w-auto object-contain rounded-lg" />
              </div>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                Official State Government Alliance
              </span>
              <span className="text-sm font-serif font-bold text-white block">
                Haryana Agro Industries Corp. & Dairy Development Federation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C86B4A]/30 text-xs font-mono tracking-widest text-[#C86B4A]">
                <Handshake className="w-3.5 h-3.5" />
                <span>STATE PUBLIC-PRIVATE ALLIANCE</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl font-bold leading-tight text-white">
                {EXPANSION.collaboration.title}
              </h2>

              <p className="font-serif text-2xl text-[#C86B4A] italic">
                "{EXPANSION.collaboration.subtitle}"
              </p>

              <p className="text-base text-[#E5D8C5] leading-relaxed font-light">
                {EXPANSION.collaboration.narrative}
              </p>

              <p className="text-sm text-[#E5D8C5]/80 leading-relaxed font-light">
                {EXPANSION.collaboration.vision}
              </p>

              {/* Official Legal Notice from PDF */}
              <div className="pt-4 border-t border-white/15">
                <span className="text-xs font-mono tracking-wider text-[#E5D8C5]/60 block italic">
                  {EXPANSION.collaboration.legalNotice}
                </span>
              </div>
            </div>

            {/* Right Card Column: 3 Pillar Impact Box */}
            <div className="lg:col-span-5">
              <div className="p-8 sm:p-10 rounded-[32px] bg-white/5 border border-white/15 backdrop-blur-md space-y-6 shadow-2xl">
                <div>
                  <div className="flex items-center gap-3 bg-white p-2 rounded-xl mb-4 shadow-sm w-fit">
                    <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-7 w-auto object-contain rounded" />
                    <div className="h-6 w-px bg-gray-200" />
                    <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-7 w-auto object-contain rounded" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] block mb-1">
                    Collaborative Impact
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    "{EXPANSION.collaboration.banner}"
                  </h3>
                </div>

                <div className="space-y-4 pt-2 text-xs font-mono text-[#E5D8C5]">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C86B4A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold mb-0.5">State-Wide Highway Accessibility</strong>
                      <span className="text-[#E5D8C5]/75">Deploying modern 24/7 retail points across Haryana\'s major highway nodes.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C86B4A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold mb-0.5">Fresh Dairy Cold-Chain Integration</strong>
                      <span className="text-[#E5D8C5]/75">Direct daily sourcing with Vita ensuring pure cooperative milk & dairy.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C86B4A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold mb-0.5">Community Economic Empowerment</strong>
                      <span className="text-[#E5D8C5]/75">Supporting regional enterprise, local farmers, and modern employment.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                  <Link
                    to="/partner"
                    data-cursor="PARTNER"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C86B4A] hover:text-white transition-colors"
                  >
                    <span>Inspect Commercial Formats</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] font-mono text-[#E5D8C5]/50">HARYANA GOVT PARTNERSHIP</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 07. EXPANSION INQUIRY CALL TO ACTION ── */}
      <section className="py-20 bg-[#F7F4ED] text-[#202321] text-center px-6 border-t border-[#E5D8C5]">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
            Acquisitions & Real Estate
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#172B3A]">
            Have a Prime Highway or Township Site?
          </h3>
          <p className="text-sm sm:text-base text-[#202321]/75 max-w-xl mx-auto font-light leading-relaxed">
            We are actively evaluating highway parcels, fuel station co-locations, and retail ground floors across Haryana and Punjab.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/partner"
              className="px-8 py-3.5 rounded-full bg-[#172B3A] text-white font-bold text-xs sm:text-sm tracking-wider hover:bg-[#C86B4A] transition-all flex items-center gap-2 shadow-lg hover:scale-105 duration-200"
            >
              <Briefcase className="w-4 h-4 text-[#C86B4A]" />
              <span>Explore 4 Partnership Tracks</span>
            </Link>

            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white border border-[#E5D8C5] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#E5D8C5]/50 transition-all flex items-center gap-2 shadow-xs hover:scale-105 duration-200"
            >
              <span>Submit Property Proposal</span>
              <ArrowRight className="w-4 h-4 text-[#C86B4A]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
