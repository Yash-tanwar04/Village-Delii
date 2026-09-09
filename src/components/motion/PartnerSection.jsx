import React, { useState } from 'react';
import { Building, Fuel, Briefcase, Handshake, ArrowRight, X, Send, CheckCircle2 } from 'lucide-react';
import { PARTNERS_DATA } from '../../data/partners';

export function PartnerSection() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    proposal: '',
  });

  const partnerDetails = [
    {
      ...PARTNERS_DATA.categories[0],
      icon: Building,
      image: "/assets/images/store-approach.jpg",
      highlight: "Prime highway frontages, ground-floor township retail, and high-footfall corner plots.",
    },
    {
      ...PARTNERS_DATA.categories[1],
      icon: Fuel,
      image: "/assets/images/hero-scenery.jpg",
      highlight: "High-volume petrol pumps, expressways, and urban mobility hubs.",
    },
    {
      ...PARTNERS_DATA.categories[2],
      icon: Briefcase,
      image: "/assets/images/store-interior.jpg",
      highlight: "Experienced retail operators and regional entrepreneurs seeking scalable formats.",
    },
    {
      ...PARTNERS_DATA.categories[3],
      icon: Handshake,
      image: "/assets/images/network-expansion.jpg",
      highlight: "State initiatives, agricultural cooperatives, corporate campuses, and transit authorities.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="partner" className="py-28 bg-[#172B3A] text-[#F7F4ED] border-b border-[#E5D8C5]/20">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C86B4A]/30 text-xs font-mono uppercase tracking-widest text-[#C86B4A]">
            <Handshake className="w-3.5 h-3.5" />
            <span>Section 09 • Strategic Alliances</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {PARTNERS_DATA.title}
          </h2>

          <p className="font-serif text-2xl sm:text-3xl text-[#C86B4A] italic font-medium">
            "{PARTNERS_DATA.subtitle}"
          </p>

          <p className="text-base sm:text-lg text-[#E5D8C5]/80 leading-relaxed pt-2">
            {PARTNERS_DATA.description}
          </p>
        </div>

        {/* 4 Large Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerDetails.map((partner, idx) => {
            const Icon = partner.icon;

            return (
              <div
                key={partner.id}
                onClick={() => {
                  setSelectedTrack(partner);
                  setSubmitted(false);
                }}
                className="group relative rounded-[36px] overflow-hidden bg-[#202321] border border-[#C86B4A]/30 shadow-2xl h-[420px] flex flex-col justify-end p-8 cursor-pointer transition-all duration-500 hover:border-[#C86B4A] hover:-translate-y-1.5"
              >
                {/* Background Image with Zoom on Hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A] via-[#172B3A]/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-white/10 text-[#C86B4A] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono text-[#E5D8C5]/60">
                      Track 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-white group-hover:text-[#C86B4A] transition-colors inline-block relative">
                    <span>{partner.title}</span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#C86B4A] mt-1" />
                  </h3>

                  <p className="text-sm text-[#E5D8C5] max-w-md">
                    {partner.description}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-xs font-semibold text-[#C86B4A]">
                    <span>Submit Proposal for this Track</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Enquiry Drawer / Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#202321] text-white rounded-[32px] border border-[#C86B4A]/50 p-8 sm:p-10 max-w-xl w-full text-left relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedTrack(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#C86B4A] uppercase tracking-wider font-bold">
                Partnership Track Inquiry
              </span>
              <h3 className="font-serif text-3xl font-bold text-white">
                {selectedTrack.title}
              </h3>
              <p className="text-xs text-[#E5D8C5]/80">
                {selectedTrack.highlight}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#A8B29B]/20 border border-[#A8B29B] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C86B4A] mx-auto" />
                <h4 className="font-serif text-xl font-bold">Proposal Dispatched</h4>
                <p className="text-xs text-[#E5D8C5]">
                  Our business development team will review your property or commercial proposal and connect within 24 to 48 hours.
                </p>
                <button
                  onClick={() => setSelectedTrack(null)}
                  className="px-5 py-2 rounded-full bg-[#172B3A] text-[#C86B4A] font-semibold text-xs border border-[#C86B4A]/40"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#E5D8C5] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Singh"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C86B4A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#E5D8C5] mb-1">Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C86B4A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#E5D8C5] mb-1">City / Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Gurgaon, NH-48"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C86B4A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#E5D8C5] mb-1">Property / Proposal Brief *</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.proposal}
                    onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                    placeholder="Location details, plot size, highway frontage or commercial space..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C86B4A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Partnership Proposal</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
