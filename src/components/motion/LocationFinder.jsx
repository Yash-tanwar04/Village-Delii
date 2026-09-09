import React, { useState } from 'react';
import { MapPin, Clock, Search, Navigation, Phone, AlertCircle, Compass } from 'lucide-react';
import { LOCATIONS_DATA } from '../../data/locations';

export function LocationFinder() {
  const [query, setQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');

  const filtered = LOCATIONS_DATA.stores.filter((store) => {
    const matchQuery = 
      store.name.toLowerCase().includes(query.toLowerCase()) ||
      store.area.toLowerCase().includes(query.toLowerCase()) ||
      store.city.toLowerCase().includes(query.toLowerCase()) ||
      store.address.toLowerCase().includes(query.toLowerCase());

    const matchRegion = 
      filterRegion === 'all' ? true : store.state.toLowerCase() === filterRegion.toLowerCase();

    return matchQuery && matchRegion;
  });

  const getDirectionsUrl = (store) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`;
  };

  return (
    <section id="locations" className="py-28 bg-[#172B3A] text-[#F7F4ED] border-b border-[#E5D8C5]/20">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C86B4A]/30 text-xs font-mono uppercase tracking-widest text-[#C86B4A]">
            <Compass className="w-3.5 h-3.5" />
            <span>Section 11 • Retail Outlets</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {LOCATIONS_DATA.title}
          </h2>

          <p className="text-base sm:text-lg text-[#E5D8C5]/80 leading-relaxed">
            {LOCATIONS_DATA.subtitle}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-[#C86B4A] pt-1">
            <Clock className="w-4 h-4" />
            <span>{LOCATIONS_DATA.hoursNote}</span>
          </div>
        </div>

        {/* Confirmation Notice regarding Gurgaon locations per PDF Page 14 */}
        <div className="mb-10 p-5 rounded-2xl bg-amber-900/30 border border-amber-500/40 text-amber-200 flex items-start gap-3 text-xs max-w-4xl">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Official Pre-Publishing Note (PDF Page 14):</strong>
            {LOCATIONS_DATA.confirmationNotice}
          </div>
        </div>

        {/* Search & Region Filters */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-center max-w-4xl">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, sector, or landmark (e.g. Sector 114)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C86B4A] shadow-inner"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="md:col-span-5 flex items-center gap-2">
            <button
              onClick={() => setFilterRegion('all')}
              className={`flex-1 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterRegion === 'all'
                  ? 'bg-[#C86B4A] text-[#172B3A]'
                  : 'bg-white/5 text-[#E5D8C5] hover:bg-white/10'
              }`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setFilterRegion('haryana')}
              className={`flex-1 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterRegion === 'haryana'
                  ? 'bg-[#A8B29B] text-white'
                  : 'bg-white/5 text-[#E5D8C5] hover:bg-white/10'
              }`}
            >
              Haryana (5)
            </button>
            <button
              onClick={() => setFilterRegion('punjab')}
              className={`flex-1 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filterRegion === 'punjab'
                  ? 'bg-[#C86B4A] text-[#172B3A]'
                  : 'bg-white/5 text-[#E5D8C5] hover:bg-white/10'
              }`}
            >
              Punjab (1)
            </button>
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((store) => {
            const isActive = store.status === 'active';

            return (
              <div
                key={store.id}
                className="rounded-[28px] bg-[#202321] border border-[#C86B4A]/25 p-7 flex flex-col justify-between shadow-xl hover:border-[#C86B4A] transition-all group text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                      <span>{store.statusLabel}</span>
                    </span>

                    <span className="text-[10px] font-mono text-[#E5D8C5]/60 bg-white/5 px-2.5 py-0.5 rounded-md">
                      {store.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#C86B4A] transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-xs text-[#A8B29B] font-semibold mt-0.5">
                      {store.area}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-[#E5D8C5]/80 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#C86B4A] shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#E5D8C5]/80">
                    <Clock className="w-3.5 h-3.5 text-[#A8B29B] shrink-0" />
                    <span className="font-mono text-white">{store.hours}</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                  <a
                    href={getDirectionsUrl(store)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full bg-white/10 hover:bg-[#C86B4A] hover:text-[#172B3A] text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={`tel:${store.phone}`}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-[#C86B4A] border border-white/10 transition-colors"
                    title="Call Store"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
