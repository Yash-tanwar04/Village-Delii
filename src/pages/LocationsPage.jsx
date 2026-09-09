import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Navigation, Sparkles, AlertCircle, ArrowRight, ExternalLink, Phone, ChevronDown } from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locations';
import { TextReveal, CardPop } from '../components/motion/MotionPrimitives';

export function LocationsPage() {
  const [selectedId, setSelectedId] = useState(LOCATIONS_DATA.stores[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const storeRefs = useRef({});
  const listContainerRef = useRef(null);

  const filteredStores = LOCATIONS_DATA.stores.filter((store) => {
    if (activeFilter === 'all') return true;
    return store.type.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const selectedStore = LOCATIONS_DATA.stores.find((s) => s.id === selectedId) || LOCATIONS_DATA.stores[0];

  // Auto Scroll-Reveal inside the fixed list container:
  // As the user scrolls the locations list, calculate which card is at the center
  const handleListScroll = () => {
    const container = listContainerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height * 0.4;

    let closestStore = null;
    let minDistance = Infinity;

    filteredStores.forEach((store) => {
      const el = storeRefs.current[store.id];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestStore = store;
      }
    });

    if (closestStore && closestStore.id !== selectedId) {
      setSelectedId(closestStore.id);
    }
  };

  // Real Google Maps embed URL
  const mapSrc = selectedStore.coordinates
    ? 'https://maps.google.com/maps?q=' +
      selectedStore.coordinates.lat + ',' + selectedStore.coordinates.lng +
      '&hl=en&z=15&output=embed'
    : 'https://maps.google.com/maps?q=Gurgaon,Haryana&hl=en&z=12&output=embed';

  const scrollToStore = (id) => {
    setSelectedId(id);
    const el = storeRefs.current[id];
    if (el && listContainerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-hidden min-h-screen flex flex-col">
      {/* ── COMPACT TOP HEADER ── */}
      <section className="pt-24 pb-4 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5D8C5] text-xs font-mono tracking-widest text-[#C86B4A] mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>04 / 24/7 STORE DIRECTORY</span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#172B3A]">
              Find Your <span className="italic text-[#C86B4A]">Village Deli.</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#C86B4A] font-bold">Filter:</span>
            {[
              { id: 'all',         label: 'All Locations' },
              { id: 'expressway',  label: 'Expressways' },
              { id: 'residential', label: 'Townships' },
              { id: 'commercial',  label: 'Commercial' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={'card-pop-subtle px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ' +
                  (activeFilter === f.id
                    ? 'bg-[#C86B4A] text-white font-bold shadow-xs scale-105'
                    : 'bg-white border border-[#E5D8C5] text-[#172B3A] hover:bg-[#E5D8C5]/50')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIXED SPLIT STAGE: SCREEN DOES NOT MOVE, MAP REMAINS PINNED 100% OF TIME ── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch overflow-hidden">

        {/* LEFT 60%: PERMANENTLY VISIBLE GOOGLE MAP (NEVER MOVES OR DISAPPEARS) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-[420px] sm:h-[480px] lg:h-[calc(100vh-210px)] bg-white p-4 sm:p-5 rounded-[28px] border border-[#172B3A]/15 shadow-xl">
          {/* Active Store HUD Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#172B3A]/10 text-left">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C86B4A] font-bold uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C86B4A] animate-ping" />
                <span>ACTIVE STORE LOCATION</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B3A] mt-0.5">
                {selectedStore.name}
              </h3>
              <p className="text-xs text-[#202321]/70 font-mono">
                {selectedStore.area}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={'https://maps.google.com/?q=' + encodeURIComponent(selectedStore.address)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-[#C86B4A] text-[#172B3A] hover:bg-[#b55c3c] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Real Google Maps Iframe */}
          <div className="relative flex-1 my-3 rounded-[20px] overflow-hidden border border-[#172B3A]/20 bg-[#172B3A]">
            <iframe
              key={selectedId}
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={'Map of ' + selectedStore.name}
              className="w-full h-full"
            />

            {/* Live 24/7 Overlay Tag */}
            <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono text-white tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span>LIVE 24/7 CORRIDOR MAP</span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-10 flex justify-between items-center text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
              <span>{selectedStore.hours}</span>
              <span className="text-[#C86B4A] font-bold">ALWAYS OPEN ✦</span>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#172B3A]/10 text-xs font-mono">
            <span className="text-[#202321]/60">
              Helpline: <strong className="text-[#172B3A]">{selectedStore.phone}</strong>
            </span>
            <a
              href={'https://maps.google.com/?q=' + encodeURIComponent(selectedStore.address)}
              target="_blank"
              rel="noreferrer"
              className="text-[#C86B4A] hover:text-[#172B3A] font-bold flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Google Maps</span>
            </a>
          </div>
        </div>

        {/* RIGHT 40%: LOCATIONS SCROLL CONTAINER (ONLY THIS LIST SCROLLS, SCREEN REMAINS STATIONARY) */}
        <div className="lg:col-span-5 flex flex-col h-[420px] sm:h-[480px] lg:h-[calc(100vh-210px)] text-left">
          <div className="flex items-center justify-between pb-3 px-1 text-xs font-mono text-[#202321]/60 shrink-0">
            <span className="font-bold uppercase tracking-wider text-[#C86B4A]">
              Scroll List Below ↓ (Map Updates Live)
            </span>
            <span>{filteredStores.length} Stores</span>
          </div>

          {/* Independent Scrollable List */}
          <div
            ref={listContainerRef}
            onScroll={handleListScroll}
            className="flex-1 overflow-y-auto space-y-4 pr-2 pb-12 select-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredStores.map((store, idx) => {
              const isSelected = store.id === selectedId;

              return (
                <div
                  key={store.id}
                  ref={(el) => (storeRefs.current[store.id] = el)}
                  onClick={() => scrollToStore(store.id)}
                  className={'card-pop p-6 rounded-[22px] border cursor-pointer text-left ' +
                    (isSelected
                      ? 'bg-[#172B3A] text-white border-[#172B3A] shadow-xl scale-[1.01]'
                      : 'bg-white border-[#E5D8C5] text-[#172B3A] hover:border-[#C86B4A]/50 hover:shadow-md')}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={'font-mono text-xs font-bold ' + (isSelected ? 'text-[#C86B4A]' : 'text-[#C86B4A]')}>
                      LOCATION 0{idx + 1}
                    </span>
                    <span className={'inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full ' +
                      (isSelected ? 'bg-white/10 text-white' : 'bg-[#172B3A]/5 text-[#172B3A]')}>
                      <Clock className="w-3 h-3 text-[#C86B4A]" />
                      <span>{store.hours}</span>
                    </span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-bold mb-1 leading-snug">
                    {store.name}
                  </h4>

                  <p className={'text-xs sm:text-sm font-light leading-relaxed mb-4 ' +
                    (isSelected ? 'text-[#E5D8C5]/85' : 'text-[#202321]/75')}>
                    {store.address}
                  </p>

                  <div className={'pt-3 border-t flex items-center justify-between text-xs font-mono ' +
                    (isSelected ? 'border-white/15 text-white/80' : 'border-[#E5D8C5] text-[#202321]/65')}>
                    <span className="text-[10px] uppercase font-bold text-[#A8B29B]">
                      {store.type}
                    </span>
                    <span className={'font-bold flex items-center gap-1 ' + (isSelected ? 'text-[#C86B4A]' : 'text-[#172B3A]')}>
                      <span>{isSelected ? 'Active on Map ✓' : 'View Location'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
