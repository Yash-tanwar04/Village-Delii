import React, { useState } from 'react';
import { Layers, ShieldCheck, Cpu, Clock, Maximize, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../../data/brand';

export function StoreBlueprint() {
  const [activeZone, setActiveZone] = useState('all');

  const zones = [
    { id: 'produce', name: 'Fresh Produce Market', x: 80, y: 70, w: 140, h: 100, label: 'Produce Zone' },
    { id: 'bakery', name: 'Artisan Bakery Ovens', x: 250, y: 70, w: 150, h: 100, label: 'Bakery & Chakki' },
    { id: 'meals', name: 'Quick Meals & Beverage Bar', x: 430, y: 70, w: 150, h: 100, label: 'Meals & Juices' },
    { id: 'groceries', name: 'Pantry & Groceries Aisles', x: 80, y: 200, w: 320, h: 140, label: 'Pantry Aisles' },
    { id: 'tech', name: 'Smart Billing & Express Flow', x: 430, y: 200, w: 150, h: 65, label: 'Tech Checkout' },
    { id: 'lounge', name: 'Hospitality Lounge', x: 430, y: 275, w: 150, h: 65, label: 'Lounge Seating' },
  ];

  const differentiators = BRAND.differentiators.items;

  return (
    <section
      id="blueprint"
      className="py-28 bg-[#172B3A] text-[#F7F4ED] relative overflow-hidden border-b border-[#E5D8C5]/20"
    >
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #C86B4A 1px, transparent 1px), linear-gradient(to bottom, #C86B4A 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C86B4A]/30 text-xs font-mono uppercase tracking-widest text-[#C86B4A]">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 05 • Architectural Blueprint</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {BRAND.differentiators.title}
          </h2>

          <p className="text-base sm:text-lg text-[#E5D8C5]/85 leading-relaxed">
            {BRAND.differentiators.lead}
          </p>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Interactive 2D Floor Plan Blueprint */}
          <div className="lg:col-span-7 bg-[#101713] rounded-3xl border-2 border-[#C86B4A]/40 p-6 sm:p-8 shadow-2xl relative">
            
            {/* Blueprint Header HUD */}
            <div className="flex items-center justify-between border-b border-[#C86B4A]/20 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono tracking-wider text-[#C86B4A] font-bold">
                  STORE BLUEPRINT // SCALE 1:100
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#E5D8C5]/60">
                INTEGRATED FORMAT
              </span>
            </div>

            {/* SVG Architectural Diagram */}
            <div className="w-full aspect-[16/10] bg-[#0E1511] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center p-4">
              <svg
                viewBox="0 0 660 380"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Store Outer Wall Boundary */}
                <rect
                  x="50"
                  y="40"
                  width="560"
                  height="300"
                  rx="16"
                  stroke="#C86B4A"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                />

                {/* Main Entrance Indication */}
                <path
                  d="M 280 340 L 380 340"
                  stroke="#22C55E"
                  strokeWidth="5"
                />
                <text x="330" y="365" textAnchor="middle" fill="#22C55E" fontSize="10" fontFamily="monospace">
                  ▼ AUTOMATIC ENTRANCE
                </text>

                {/* Individual Zones */}
                {zones.map((zone) => {
                  const isActive = activeZone === 'all' || activeZone === zone.id;
                  return (
                    <g
                      key={zone.id}
                      onClick={() => setActiveZone(zone.id)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.w}
                        height={zone.h}
                        rx="8"
                        fill={isActive ? 'rgba(200, 169, 107, 0.12)' : 'rgba(255, 255, 255, 0.02)'}
                        stroke={isActive ? '#C86B4A' : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth={isActive ? '2' : '1'}
                      />
                      <text
                        x={zone.x + zone.w / 2}
                        y={zone.y + zone.h / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)'}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {zone.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Blueprint Floor Plan Controls */}
            <div className="mt-4 pt-4 border-t border-[#C86B4A]/20 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-[#E5D8C5]/70">
                Click any zone above to inspect layout
              </span>
              <button
                onClick={() => setActiveZone('all')}
                className="text-[11px] font-mono text-[#C86B4A] hover:underline cursor-pointer"
              >
                Highlight Entire Format
              </button>
            </div>

          </div>

          {/* Right: 6 Core Differentiators Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1 mb-2">
              <span className="text-xs font-mono text-[#C86B4A] uppercase tracking-wider font-bold">
                Operational Foundation
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Engineered for Modern Reliability
              </h3>
            </div>

            <div className="space-y-3">
              {differentiators.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C86B4A]/40 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="w-6 h-6 rounded-lg bg-[#C86B4A]/20 text-[#C86B4A] font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    <h4 className="font-serif text-base font-bold text-white group-hover:text-[#C86B4A] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#E5D8C5]/80 leading-relaxed pl-9">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
