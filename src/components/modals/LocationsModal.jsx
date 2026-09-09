import React, { useState } from 'react';
import { X, MapPin, Phone, Navigation, Clock, AlertCircle, Search, CheckCircle2 } from 'lucide-react';
import { LOCATIONS_DATA } from '../../data/locations';
import { useStore } from '../../store/useStore';

export function LocationsModal() {
  const [filterState, setFilterState] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const closeModal = useStore((state) => state.closeModal);

  const filteredStores = LOCATIONS_DATA.stores.filter((store) => {
    const matchesState = filterState === 'all' || store.state.toLowerCase() === filterState.toLowerCase();
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F7F4ED] rounded-3xl shadow-2xl border border-[#C86B4A]/40 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#C86B4A]/30 flex items-center justify-between bg-[#EFEBE3]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172B3A] text-[#F7F4ED] text-[10px] font-bold tracking-widest uppercase mb-1">
              <Clock className="w-3 h-3 text-[#C86B4A]" /> 24/7 CONVENIENCE
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#172B3A]">
              {LOCATIONS_DATA.title}
            </h2>
            <p className="text-xs text-[#202321]/75">
              {LOCATIONS_DATA.subtitle}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-[#C86B4A] hover:text-white flex items-center justify-center text-[#172B3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Confirmation Warning Banner from PDF Page 14 */}
        <div className="bg-[#FFF4E5] px-6 py-2.5 border-b border-[#C86B4A]/30 flex items-start gap-2 text-xs text-[#8A501F]">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C86B4A]" />
          <span>
            <strong>Client Confirmation Notice:</strong> {LOCATIONS_DATA.confirmationNotice}
          </span>
        </div>

        {/* Search & State Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-[#C86B4A]/20 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#A8B29B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by area, sector, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['all', 'Haryana', 'Punjab'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterState(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  filterState === tab
                    ? 'bg-[#172B3A] text-white'
                    : 'bg-white text-[#172B3A] border border-[#C86B4A]/40 hover:bg-[#E8EFEA]'
                }`}
              >
                {tab === 'all' ? 'All Hubs' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Store Listings Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="p-5 rounded-2xl bg-white border border-[#C86B4A]/30 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8B29B]">
                    {store.type}
                  </span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      store.status === 'active'
                        ? 'bg-[#E8EFEA] text-[#172B3A]'
                        : 'bg-[#FFF0DA] text-[#C86B4A] border border-[#C86B4A]/20'
                    }`}
                  >
                    {store.statusLabel}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#172B3A]">
                  {store.name}
                </h3>

                <p className="text-xs text-[#202321]/80 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C86B4A] flex-shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#172B3A] font-medium pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#A8B29B]" />
                  <span>{store.hours}</span>
                </div>
              </div>

              {/* Action Buttons: Google Maps Directions & Direct Call */}
              <div className="pt-3 border-t border-[#C86B4A]/20 flex items-center gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#172B3A] text-white hover:bg-[#C86B4A] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C86B4A]" />
                  Get Directions
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="py-2 px-3 rounded-xl bg-[#E8EFEA] text-[#172B3A] hover:bg-[#C86B4A] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C86B4A]" />
                  Call Us
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
