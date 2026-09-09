import React, { useState } from 'react';
import { X, CheckCircle2, Send, Mail } from 'lucide-react';
import { CONTACT_DATA } from '../../data/contact';
import { useStore } from '../../store/useStore';

export function ContactModal() {
  const closeModal = useStore((state) => state.closeModal);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    interest: CONTACT_DATA.interestOptions[0],
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#F7F4ED] rounded-3xl shadow-2xl border border-[#C86B4A]/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#C86B4A]/30 flex items-center justify-between bg-[#EFEBE3]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A] mb-1">
              GET IN TOUCH
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#172B3A]">
              {CONTACT_DATA.title}
            </h2>
            <p className="text-xs text-[#202321]/75">
              {CONTACT_DATA.subtitle}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-[#C86B4A] hover:text-white flex items-center justify-center text-[#172B3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#E8EFEA] border border-[#A8B29B]/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#172B3A] mx-auto" />
              <h3 className="text-xl font-serif font-bold text-[#172B3A]">
                Enquiry Successfully Submitted
              </h3>
              <p className="text-xs text-[#202321]/80 max-w-md mx-auto">
                Thank you for contacting Village Deli. Our team has received your message and will respond shortly.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-full bg-[#172B3A] text-white text-xs font-semibold hover:bg-[#C86B4A] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">
                    {CONTACT_DATA.formFields.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">
                    {CONTACT_DATA.formFields.mobile} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="Mobile Number"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">
                    {CONTACT_DATA.formFields.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">
                    {CONTACT_DATA.formFields.city} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="e.g. Gurgaon, Chandigarh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">
                  {CONTACT_DATA.formFields.interestLabel} *
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                >
                  {CONTACT_DATA.interestOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">
                  Message / Comments (Optional)
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                  placeholder="How can we assist you?"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-full border border-[#C86B4A]/40 text-xs font-semibold text-[#172B3A] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#172B3A] text-white text-xs font-semibold hover:bg-[#C86B4A] transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#C86B4A]" />
                  <span>{CONTACT_DATA.submitButtonText}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
