import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Clock, Send, ShieldCheck, MessageSquare } from 'lucide-react';
import { CONTACT_DATA } from '../data/contact';
import { BRAND } from '../data/brand';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

export function ContactPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trackParam = searchParams.get('track') || '';

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    interest: trackParam ? (trackParam.includes('career') ? 'Careers' : 'Franchise / Partnership') : 'General Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const channels = [
    {
      title: '24/7 Customer Hotline',
      value: '+91 124 000 0000',
      action: 'tel:+911240000000',
      sub: 'Always answered by store duty managers',
      icon: Clock,
    },
    {
      title: 'Partnerships & Commercial Desk',
      value: 'connect@villagedeli.in',
      action: 'mailto:connect@villagedeli.in',
      sub: '24-48 hr evaluation for property & fuel leases',
      icon: Mail,
    },
    {
      title: 'Regional Operations Hub',
      value: 'Gurgaon, Haryana Corridor',
      action: '/locations',
      sub: 'Central North India supply & distribution depot',
      icon: MapPin,
    },
  ];

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">
      {/* ── TOP EDITORIAL ANCHOR ── */}
      <section className="pt-32 pb-20 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute top-1/4 -right-16 w-[550px] h-[550px] rounded-full bg-[#C86B4A]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>08 / DIRECT CONCIERGE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>Let's</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.12}>Connect.</TextReveal>
                </span>
              </h1>
              <p className="text-base sm:text-xl text-[#202321]/80 font-light max-w-2xl pt-1 leading-relaxed">
                {CONTACT_DATA.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right font-mono text-xs text-[#202321]/70 space-y-1">
              <div className="text-[#C86B4A] font-bold text-sm">24-48 HR TURNAROUND</div>
              <div>DEDICATED COMMERCIAL & CAREER DESK</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASYMMETRIC EDITORIAL SPLIT ── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT 50%: DIRECT CHANNELS WITH HOVER REVEALS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                Direct Channels
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B3A] leading-snug">
                Every conversation begins with a shared vision for everyday life.
              </h2>
              <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
                Whether you represent an expressway fuel station, own commercial property in a growing Haryana township, or want to discuss career opportunities — our executive team responds promptly.
              </p>
            </div>

            {/* Interactive Channel Cards with Hover Reveals */}
            <div className="space-y-4 pt-2">
              {channels.map((ch, idx) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={idx}
                    href={ch.action}
                    className="card-pop group block p-5 rounded-2xl bg-white border border-[#E5D8C5] shadow-xs relative overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#172B3A]/5 border border-[#172B3A]/10 flex items-center justify-center text-[#C86B4A] group-hover:bg-[#C86B4A] group-hover:text-white transition-all duration-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#202321]/50 block">
                          {ch.title}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors truncate mt-0.5">
                          {ch.value}
                        </h4>
                        <p className="text-xs text-[#202321]/65 font-light mt-0.5">
                          {ch.sub}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-transparent group-hover:border-[#C86B4A]/30 flex items-center justify-center text-[#C86B4A] opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    {/* Bottom hover highlight line */}
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#C86B4A] transition-all duration-400" />
                  </a>
                );
              })}
            </div>

            {/* Institutional Guarantee Badge */}
            <div className="p-6 rounded-2xl bg-[#172B3A]/5 border border-[#172B3A]/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#172B3A]">
                <ShieldCheck className="w-4 h-4 text-[#C86B4A]" />
                <span>CONFIDENTIALITY & SLA GUARANTEE</span>
              </div>
              <p className="text-xs text-[#202321]/70 font-light leading-relaxed">
                All commercial and partnership inquiries are evaluated under strict confidentiality by our regional business development directors within 24 to 48 business hours.
              </p>
            </div>
          </div>

          {/* RIGHT 50%: STREAMLINED EDITORIAL FORM */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[32px] bg-white border border-[#E5D8C5] shadow-xl text-left">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#A8B29B]/20 text-[#172B3A] flex items-center justify-center mx-auto mb-4 border border-[#A8B29B]">
                    <CheckCircle2 className="w-8 h-8 text-[#C86B4A]" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#172B3A]">
                    Enquiry Received.
                  </h3>
                  <p className="text-sm sm:text-base text-[#202321]/75 max-w-md mx-auto font-light leading-relaxed">
                    Thank you for reaching out to Village Deli. Our regional concierge team has been notified and will connect with you within 24–48 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-[#172B3A] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#C86B4A] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                      Direct Concierge Form
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                      Tell Us About Your Project
                    </h3>
                  </div>

                  {/* Interest Track Selector Pills */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-mono font-bold text-[#172B3A] uppercase tracking-wider block">
                      {CONTACT_DATA.formFields.interestLabel}:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_DATA.interestOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({ ...formData, interest: opt })}
                          className={'px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ' +
                            (formData.interest === opt
                              ? 'bg-[#172B3A] text-white font-bold shadow-xs'
                              : 'bg-[#172B3A]/5 text-[#172B3A] hover:bg-[#E5D8C5]/50')}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-[#172B3A]">
                        {CONTACT_DATA.formFields.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/30 text-sm focus:outline-none focus:border-[#C86B4A] focus:ring-1 focus:ring-[#C86B4A] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-[#172B3A]">
                        {CONTACT_DATA.formFields.mobile} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 Mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/30 text-sm focus:outline-none focus:border-[#C86B4A] focus:ring-1 focus:ring-[#C86B4A] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-[#172B3A]">
                        {CONTACT_DATA.formFields.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/30 text-sm focus:outline-none focus:border-[#C86B4A] focus:ring-1 focus:ring-[#C86B4A] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-semibold text-[#172B3A]">
                        {CONTACT_DATA.formFields.city} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Gurgaon, Ambala, Panipat"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/30 text-sm focus:outline-none focus:border-[#C86B4A] focus:ring-1 focus:ring-[#C86B4A] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-mono font-semibold text-[#172B3A]">
                      Message / Proposal Details (Optional)
                    </label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Brief details about location, site square footage, franchise query, or career background..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/30 text-sm focus:outline-none focus:border-[#C86B4A] focus:ring-1 focus:ring-[#C86B4A] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#C86B4A] hover:bg-[#b55c3c] text-[#172B3A] hover:text-white font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{CONTACT_DATA.submitButtonText}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
