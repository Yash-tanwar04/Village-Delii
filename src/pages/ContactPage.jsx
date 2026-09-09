import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, CheckCircle2, Send, Sparkles } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    inquiryType: 'General Inquiries',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const inquiryCategories = [
    'General Inquiries',
    'Partnership Opportunities',
    'Customer Feedback',
    'Press & Media',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
              08 / GET IN TOUCH
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#172B3A] leading-tight">
              Let's
              <span className="block italic text-[#C86B4A] font-medium mt-1">
                Connect.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#202321]/80 font-light leading-relaxed pt-1">
              Have a question, partnership proposal or business opportunity? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. CONTACT DETAILS & CLEAN FORM SPLIT ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: DIRECT INFO */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                COMMUNICATION DESK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B3A] leading-snug">
                We're always here, day or night.
              </h2>
              <p className="text-sm sm:text-base text-[#202321]/75 font-light leading-relaxed">
                Whether you are a customer with feedback, a property owner exploring a new site, or a partner seeking regional collaboration, our team is ready to respond.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-[#E5D8C5] flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] flex items-center justify-center text-[#172B3A] shrink-0">
                  <Clock className="w-5 h-5 text-[#C86B4A]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#202321]/60 block font-semibold">
                    Operating Hours
                  </span>
                  <strong className="text-base text-[#172B3A] block font-serif font-bold mt-0.5">
                    24 Hours a Day • 7 Days a Week
                  </strong>
                  <span className="text-xs text-[#202321]/70 font-light">Always open across all highway and urban locations.</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E5D8C5] flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] flex items-center justify-center text-[#172B3A] shrink-0">
                  <Mail className="w-5 h-5 text-[#C86B4A]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#202321]/60 block font-semibold">
                    Email Correspondence
                  </span>
                  <a href="mailto:connect@villagedeli.in" className="text-base text-[#172B3A] hover:text-[#C86B4A] transition-colors block font-serif font-bold mt-0.5">
                    connect@villagedeli.in
                  </a>
                  <span className="text-xs text-[#202321]/70 font-light">Response within 24–48 hours.</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E5D8C5] flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] flex items-center justify-center text-[#172B3A] shrink-0">
                  <Phone className="w-5 h-5 text-[#C86B4A]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#202321]/60 block font-semibold">
                    Customer Helpline
                  </span>
                  <a href="tel:+911240000000" className="text-base text-[#172B3A] hover:text-[#C86B4A] transition-colors block font-serif font-bold mt-0.5">
                    +91 124 000 0000
                  </a>
                  <span className="text-xs text-[#202321]/70 font-light">Direct assistance from store management.</span>
                </div>
              </div>
            </div>

            {/* Haryana HarHith & Vita Alliance Callout */}
            <div className="p-4 rounded-xl bg-[#172B3A] text-[#F7F4ED] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-[#E5D8C5]/70 uppercase tracking-widest">
                  STATE ALLIANCE
                </span>
                <p className="text-xs text-white font-medium">
                  Haryana HarHith & Vita Cooperative Partner
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-md shrink-0">
                <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-5 w-auto object-contain rounded" />
                <div className="h-4 w-px bg-gray-300" />
                <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-5 w-auto object-contain rounded" />
              </div>
            </div>
          </div>

          {/* RIGHT: STRAIGHTFORWARD INQUIRY FORM */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5D8C5] shadow-xs">
            <div className="space-y-2 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                SEND A MESSAGE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A]">
                Submit Your Enquiry
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#172B3A] text-white text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#C86B4A] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-bold">Message Delivered</h4>
                <p className="text-sm text-[#E5D8C5]/80 max-w-md mx-auto font-light">
                  Thank you for reaching out to Village Deli. A member of our team will review your message and respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Gurgaon, Delhi, Chandigarh"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                    Inquiry Category *
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5D8C5] bg-[#F7F4ED]/50 focus:bg-white focus:outline-hidden focus:border-[#C86B4A] text-sm text-[#172B3A] transition-colors"
                  >
                    {inquiryCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#172B3A] font-semibold block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we assist you?"
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
                  <span>Submit Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
