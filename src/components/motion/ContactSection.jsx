import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Headphones, ShieldCheck } from 'lucide-react';
import { CONTACT_DATA } from '../../data/contact';
import { BRAND } from '../../data/brand';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    interest: CONTACT_DATA.interestOptions[0],
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5]">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-mono uppercase tracking-widest text-[#A8B29B]">
            <Headphones className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>Section 12 • Direct Communication</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
            {CONTACT_DATA.title}
          </h2>

          <p className="text-base sm:text-lg text-[#202321]/80 leading-relaxed">
            {CONTACT_DATA.subtitle}
          </p>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Form strictly from PDF Page 19 */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#E5D8C5] p-8 sm:p-12 shadow-sm">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#172B3A] mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs text-[#202321]/70 mb-8">
              Complete the fields below to connect with our retail, property or partnership team.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-2xl font-bold">Enquiry Received</h4>
                <p className="text-xs max-w-md mx-auto text-emerald-800">
                  Thank you for connecting with Village Deli. Our representative will get back to you promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-full bg-[#172B3A] text-white text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#172B3A] mb-1.5">
                    {CONTACT_DATA.formFields.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sen"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                  />
                </div>

                {/* Mobile & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1.5">
                      {CONTACT_DATA.formFields.mobile} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1.5">
                      {CONTACT_DATA.formFields.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                </div>

                {/* City & Interest Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1.5">
                      {CONTACT_DATA.formFields.city} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Gurgaon, Chandigarh, Delhi"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1.5">
                      {CONTACT_DATA.formFields.interestLabel} *
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    >
                      {CONTACT_DATA.interestOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Message note */}
                <div>
                  <label className="block text-xs font-bold text-[#172B3A] mb-1.5">
                    Your Message (Optional)
                  </label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can Village Deli assist you today?"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs sm:text-sm text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#172B3A] hover:bg-[#A8B29B] text-white font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C86B4A]" />
                  <span>{CONTACT_DATA.submitButtonText}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Brand Operating Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#172B3A] text-white rounded-[32px] p-8 sm:p-10 border border-[#E5D8C5] space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block mb-1">
                  Brand Philosophy
                </span>
                <h4 className="font-serif text-2xl font-bold">
                  {BRAND.coreBrandStatement.headline}
                </h4>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#E5D8C5]">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C86B4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">24/7 Operations:</strong>
                    <span>Open 24 Hours a Day, 7 Days a Week</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A8B29B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Regional Operations:</strong>
                    <span>Highways & Townships in Punjab and Haryana</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#C86B4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Alliance:</strong>
                    <span>{BRAND.footer.collaboration}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#E5D8C5] italic">
                "{BRAND.aboutIntro.callout}"
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
