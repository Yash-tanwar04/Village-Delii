import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  Navigation, 
  ArrowRight, 
  ExternalLink,
  List,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locations';

export function LocationsPage() {
  const [selectedId, setSelectedId] = useState(LOCATIONS_DATA.stores[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'map'
  const storeRefs = useRef({});
  const listContainerRef = useRef(null);

  const filteredStores = LOCATIONS_DATA.stores.filter((store) => {
    if (activeFilter === 'all') return true;
    return store.type.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const selectedStore = LOCATIONS_DATA.stores.find((s) => s.id === selectedId) || LOCATIONS_DATA.stores[0];
  const currentIndex = filteredStores.findIndex((s) => s.id === selectedStore.id);

  const handlePrevStore = () => {
    if (filteredStores.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredStores.length) % filteredStores.length;
    setSelectedId(filteredStores[prevIdx].id);
  };

  const handleNextStore = () => {
    if (filteredStores.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredStores.length;
    setSelectedId(filteredStores[nextIdx].id);
  };

  const handleListScroll = () => {
    const container = listContainerRef.current;
    if (!container || filteredStores.length === 0) return;

    // Top boundary: snap to first store
    if (container.scrollTop <= 20) {
      if (selectedId !== filteredStores[0].id) {
        setSelectedId(filteredStores[0].id);
      }
      return;
    }

    // Bottom boundary: snap to last store
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 30;
    if (isAtBottom) {
      const lastStore = filteredStores[filteredStores.length - 1];
      if (selectedId !== lastStore.id) {
        setSelectedId(lastStore.id);
      }
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height * 0.35;

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

  const mapSrc = selectedStore.coordinates
    ? 'https://maps.google.com/maps?q=' +
      selectedStore.coordinates.lat + ',' + selectedStore.coordinates.lng +
      '&hl=en&z=15&output=embed'
    : 'https://maps.google.com/maps?q=Gurgaon,Haryana&hl=en&z=12&output=embed';

  const scrollToStore = (id) => {
    setSelectedId(id);
    const el = storeRefs.current[id];
    const container = listContainerRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + container.scrollTop;
      const targetScroll = relativeTop - (container.clientHeight / 2) + (el.clientHeight / 2);
      container.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  };

  const viewOnMapMobile = (id) => {
    setSelectedId(id);
    setMobileView('map');
  };

  return (
    <div className="bg-[#F7F4ED] text-[#202321] min-h-screen flex flex-col relative pb-14 lg:pb-0">
      {/* ── HEADER ── */}
      <section
        style={{ paddingTop: 'calc(var(--navbar-height, 72px) + 1.25rem)' }}
        className="pb-4 px-4 sm:px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left shrink-0"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
              05 / LOCATIONS DIRECTORY
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#172B3A] tracking-tight">
              Find Your <span className="italic text-[#C86B4A] font-medium">Village Deli.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#202321]/75 font-light leading-relaxed">
              {LOCATIONS_DATA.subtitle}
            </p>
          </div>

          {/* Controls: Filter Tabs + Mobile Segmented Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E5D8C5] rounded-full text-xs font-mono overflow-x-auto max-w-full scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'expressway', label: 'Expressways' },
                { id: 'residential', label: 'Townships' },
                { id: 'commercial', label: 'Commercial' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={'px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ' +
                    (activeFilter === f.id
                      ? 'bg-[#172B3A] text-white font-medium shadow-xs'
                      : 'text-[#202321]/70 hover:text-[#172B3A]')}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Mobile View Switcher (List vs Map) */}
            <div className="lg:hidden flex items-center p-1 bg-white border border-[#E5D8C5] rounded-full text-xs font-mono shadow-2xs">
              <button
                onClick={() => setMobileView('list')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  mobileView === 'list'
                    ? 'bg-[#172B3A] text-white font-medium shadow-xs'
                    : 'text-[#202321]/70 hover:text-[#172B3A]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
              <button
                onClick={() => setMobileView('map')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  mobileView === 'map'
                    ? 'bg-[#172B3A] text-white font-medium shadow-xs'
                    : 'text-[#202321]/70 hover:text-[#172B3A]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPLIT DIRECTORY STAGE ── */}
      <div 
        className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[480px] lg:overflow-hidden lg:h-[calc(100vh-var(--navbar-height,72px)-185px)] lg:max-h-[calc(100vh-var(--navbar-height,72px)-185px)]"
      >

        {/* LEFT: INTERACTIVE MAP HUD (Desktop Always Visible, Mobile Controlled by View Switcher) */}
        <div className={`lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#E5D8C5] bg-white p-4 sm:p-5 shadow-xs transition-all ${
          mobileView === 'map' 
            ? 'flex h-[calc(100vh-var(--navbar-height,72px)-190px)] min-h-[440px] w-full' 
            : 'hidden lg:flex lg:h-full'
        }`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-[#E5D8C5] text-left">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#C86B4A] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#C86B4A]" />
                <span>Selected Store</span>
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#172B3A] mt-0.5">
                {selectedStore.name}
              </h3>
              <p className="text-xs text-[#202321]/70 font-light mt-0.5">
                {selectedStore.area}
              </p>
            </div>

            <a
              href={'https://maps.google.com/?q=' + encodeURIComponent(selectedStore.address)}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 sm:px-4 py-2 rounded-full bg-[#172B3A] text-white hover:bg-[#C86B4A] font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>Directions</span>
            </a>
          </div>

          {/* Map Viewport */}
          <div className="relative flex-1 my-3 rounded-xl overflow-hidden border border-[#E5D8C5] bg-[#172B3A]/5">
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
          </div>

          {/* Bottom Meta & Store Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-[#E5D8C5] text-xs font-mono text-[#202321]/70">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C86B4A]" />
                <span>{selectedStore.hours}</span>
              </div>

              {/* Prev / Next Store Switcher */}
              <div className="flex items-center gap-1 bg-[#F7F4ED] px-2 py-0.5 rounded-full border border-[#E5D8C5]">
                <button
                  onClick={handlePrevStore}
                  title="Previous Store"
                  className="p-1 text-[#172B3A] hover:text-[#C86B4A] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-[#172B3A]/80 font-bold px-1">
                  {currentIndex + 1} / {filteredStores.length}
                </span>
                <button
                  onClick={handleNextStore}
                  title="Next Store"
                  className="p-1 text-[#172B3A] hover:text-[#C86B4A] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <a
                href={'https://maps.google.com/?q=' + encodeURIComponent(selectedStore.address)}
                target="_blank"
                rel="noreferrer"
                className="text-[#C86B4A] hover:text-[#172B3A] font-semibold flex items-center gap-1 transition-colors text-[11px] sm:text-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: EDITORIAL DIRECTORY LIST (Desktop Always Visible, Mobile Controlled by View Switcher) */}
        <div className={`lg:col-span-5 flex flex-col text-left min-h-0 ${
          mobileView === 'list' 
            ? 'flex w-full' 
            : 'hidden lg:flex lg:h-full lg:max-h-full lg:overflow-hidden'
        }`}>
          <div className="flex items-center justify-between pb-2.5 px-1 text-xs font-mono text-[#202321]/60 shrink-0">
            <span className="font-semibold uppercase tracking-wider text-[#C86B4A]">
              Store Locations
            </span>
            <span>{filteredStores.length} Nodes</span>
          </div>

          <div
            id="locations-store-list"
            ref={listContainerRef}
            data-lenis-prevent
            onScroll={handleListScroll}
            className="flex-1 min-h-0 lg:overflow-y-auto space-y-3 lg:pr-2 pt-1 pb-20 select-none"
          >
            {filteredStores.map((store, idx) => {
              const isSelected = store.id === selectedId;

              return (
                <div
                  key={store.id}
                  ref={(el) => (storeRefs.current[store.id] = el)}
                  onClick={() => scrollToStore(store.id)}
                  className={'p-4 sm:p-5 rounded-xl border cursor-pointer text-left transition-all ' +
                    (isSelected
                      ? 'bg-[#172B3A] text-white border-[#172B3A] shadow-md ring-1 ring-[#C86B4A]/50'
                      : 'bg-white border-[#E5D8C5] text-[#172B3A] hover:border-[#C86B4A]/50 hover:shadow-xs')}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#C86B4A]">
                      0{idx + 1}
                    </span>
                    <span className={'text-[11px] font-mono px-2.5 py-0.5 rounded-full ' +
                      (isSelected ? 'bg-white/10 text-[#E5D8C5]' : 'bg-[#F7F4ED] text-[#202321]/70 border border-[#E5D8C5]')}>
                      {store.hours}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-bold mb-1 leading-snug">
                    {store.name}
                  </h4>

                  <p className={'text-xs sm:text-sm font-light leading-relaxed mb-3 ' +
                    (isSelected ? 'text-[#E5D8C5]/85' : 'text-[#202321]/75')}>
                    {store.address}
                  </p>

                  <div className={'pt-2.5 border-t flex items-center justify-between text-xs font-mono ' +
                    (isSelected ? 'border-white/10 text-white/80' : 'border-[#E5D8C5] text-[#202321]/60')}>
                    <span className="text-[10px] uppercase tracking-wider font-semibold">
                      {store.type}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewOnMapMobile(store.id);
                        }}
                        className={`lg:hidden px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                          isSelected
                            ? 'bg-white/15 text-white hover:bg-white/25'
                            : 'bg-[#F7F4ED] text-[#172B3A] border border-[#E5D8C5] hover:border-[#C86B4A]'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-[#C86B4A]" />
                        <span>Map</span>
                      </button>
                      <span className={'hidden lg:flex font-semibold items-center gap-1 ' + (isSelected ? 'text-[#C86B4A]' : 'text-[#172B3A]')}>
                        <span>{isSelected ? 'Viewing' : 'Select'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating View Switcher Button on Mobile (Always within thumb reach) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 shadow-xl">
        <button
          onClick={() => setMobileView(mobileView === 'list' ? 'map' : 'list')}
          className="px-5 py-2.5 rounded-full bg-[#172B3A] text-white font-mono text-xs font-semibold flex items-center gap-2 border border-white/20 shadow-2xl hover:bg-[#C86B4A] transition-colors cursor-pointer"
        >
          {mobileView === 'list' ? (
            <>
              <MapPin className="w-4 h-4 text-[#C86B4A]" />
              <span>Map View</span>
            </>
          ) : (
            <>
              <List className="w-4 h-4 text-[#C86B4A]" />
              <span>Store List ({filteredStores.length})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
