import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  ChefHat, 
  Truck, 
  Building2, 
  Send, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Store Managers & Supervisors',
    experience: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const opportunityTracks = [
    {
      num: '01',
      title: 'Store Managers & Supervisors',
      desc: 'Lead daily store operations, guide team members, and maintain the highest standards of customer care and product freshness.',
      icon: Building2,
    },
    {
      num: '02',
      title: 'Retail Associates & Cashiers',
      desc: 'Create a warm, welcoming shopping atmosphere and ensure swift, friendly service for our everyday and late-night guests.',
      icon: Users,
    },
    {
      num: '03',
      title: 'Bakers & Deli Chefs',
      desc: 'Bring fresh food to life through live baking, artisanal pastry preparation, and wholesome deli meals prepared fresh on-site.',
      icon: ChefHat,
    },
    {
      num: '04',
      title: 'Supply Chain & Logistics',
      desc: 'Coordinate farm-fresh produce transport, cooperative dairy routing, and timely inventory flow across our regional hubs.',
      icon: Truck,
    },
    {
      num: '05',
      title: 'Corporate & Regional Operations',
      desc: 'Drive real estate acquisitions, regional store launches, commercial partnerships, and organizational growth across North India.',
      icon: Briefcase,
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
              07 / CAREERS & PEOPLE
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#172B3A] leading-tight">
              Build the Future With
              <span className="block italic text-[#C86B4A] font-medium mt-1">
                Village Deli.
              </span>
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#172B3A]/85 italic">
              "Village Deli is growing — and we are looking for people who want to grow with us."
            </p>
            <p className="text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed pt-1">
              From store operations and customer experience to food craft, supply chain, and corporate management, there are opportunities to become an essential part of our journey.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. FIVE OPPORTUNITY TRACKS (PDF PAGE 18) ── */}
      <section className="py-20 px-6 bg-[#F7F4ED] border-b border-[#E5D8C5]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
              OPPORTUNITY AREAS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#172B3A]">
              Where You Can Make an Impact
            </h2>
            <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
              Explore key functions across our stores, culinary kitchens, and regional distribution networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {opportunityTracks.map((track) => {
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

                    <p className="text-sm text-[#202321]/75 font-light leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 03. CLEAN APPLICATION FORM ── */}
      <section className="py-20 px-6 bg-[#E5D8C5]/20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E5D8C5] shadow-sm text-left">
            <div className="space-y-3 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                APPLY TODAY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#172B3A]">
                Join the Team
              </h2>
              <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
                Submit your credentials and area of interest. Our talent acquisition team will review your application and be in touch.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#172B3A] text-white text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#C86B4A] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold">Application Received</h3>
                <p className="text-sm text-[#E5D8C5]/80 max-w-md mx-auto font-light">
                  Thank you for your interest in Village Deli. Our recruitment team reviews submissions regularly and will reach out if your profile matches current openings.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-wider transition-colors"
                >
                  Submit Another Application
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
                      Opportunity Track *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    >
                      {opportunityTracks.map((t) => (
                        <option key={t.num} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                    Years of Experience / Background
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., 3 years in retail / recent graduate"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                    Message or Portfolio / Resume Link
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly share your experience, skills, or link to your CV / LinkedIn profile..."
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
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
