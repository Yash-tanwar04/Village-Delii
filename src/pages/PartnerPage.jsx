import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Building2, Fuel, TrendingUp, Landmark, Sparkles, Send } from 'lucide-react';

export function PartnerPage() {
  const [partnerType, setPartnerType] = useState('Property Owners & Landlords');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partnerType: 'Property Owners & Landlords',
    propertyDetails: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tracks = [
    {
      num: '01',
      title: 'Property Owners & Landlords',
      desc: 'Have a strategically located property? Let\'s explore the opportunity.',
      icon: Building2,
      note: 'Prime highway frontages, township retail, and high-footfall plots.',
    },
    {
      num: '02',
      title: 'Fuel Station Operators',
      desc: 'Bring a complete convenience experience to your customers.',
      icon: Fuel,
      note: 'High-volume petrol stations, highway expressways, and urban mobility hubs.',
    },
    {
      num: '03',
      title: 'Franchisees & Business Partners',
      desc: 'Build and grow with a future-ready retail format.',
      icon: TrendingUp,
      note: 'Experienced retail operators seeking a scalable round-the-clock convenience model.',
    },
    {
      num: '04',
      title: 'Institutional & Corporate Alliances',
      desc: 'Explore state, institutional and network-level collaboration opportunities.',
      icon: Landmark,
      note: 'State initiatives, cooperatives (e.g. HarHith & Vita), and commercial campuses.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      
      {/* ── 01. EDITORIAL HERO ── */}
      <section
        style={{ paddingTop: 'calc(var(--navbar-height, 72px) + 2rem)' }}
        className="pb-16 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-semibold block">
              06 / PARTNERSHIPS
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#172B3A] leading-tight">
              Partner With
              <span className="block italic text-[#C86B4A] font-medium mt-1">
                Village Deli.
              </span>
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#172B3A]/85 italic">
              "Let's Build the Future of Convenience Together."
            </p>
            <p className="text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed pt-1">
              Village Deli is building a scalable retail network across high-potential locations. We are looking to connect with the right partners, property owners and business stakeholders who share our vision.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. FOUR PARTNERSHIP TRACKS (PDF PAGE 17) ── */}
      <section className="py-20 px-6 bg-[#F7F4ED] border-b border-[#E5D8C5]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
              FOUR STRATEGIC TRACKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#172B3A]">
              Collaboration Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.num}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs hover:border-[#C86B4A]/60 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#C86B4A]">
                        {track.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#F7F4ED] border border-[#E5D8C5] flex items-center justify-center text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#172B3A] leading-snug group-hover:text-[#C86B4A] transition-colors">
                      {track.title}
                    </h3>

                    <p className="text-sm text-[#202321]/80 font-light leading-relaxed">
                      {track.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#E5D8C5] text-xs text-[#202321]/60 font-light">
                    {track.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 03. CLEAN PARTNERSHIP INQUIRY FLOW ── */}
      <section className="py-20 px-6 bg-[#E5D8C5]/20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5D8C5] shadow-sm text-left">
            <div className="space-y-3 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                DIRECT INQUIRY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#172B3A]">
                Initiate a Partnership
              </h2>
              <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
                Provide your contact details and property overview. Our commercial acquisitions team will review and respond within 24–48 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#172B3A] text-white text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#C86B4A] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold">Inquiry Received</h3>
                <p className="text-sm text-[#E5D8C5]/80 max-w-md mx-auto font-light">
                  Thank you for reaching out. A representative from our real estate and business partnerships team will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-wider transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      Partner Type *
                    </label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    >
                      <option value="Property Owners & Landlords">Property Owners & Landlords</option>
                      <option value="Fuel Station Operators">Fuel Station Operators</option>
                      <option value="Franchisees & Business Partners">Franchisees & Business Partners</option>
                      <option value="Institutional & Corporate Alliances">Institutional & Corporate Alliances</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                    Property / Location Details
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Highway frontage, size in sq. ft., city/corridor"
                    value={formData.propertyDetails}
                    onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more about your proposal or specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#172B3A] hover:bg-[#C86B4A] text-white font-medium text-sm tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C86B4A]" />
                  <span>Submit Partnership Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
