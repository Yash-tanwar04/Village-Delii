import React, { useState } from 'react';
import { X, CheckCircle2, Briefcase, Building, Fuel, Globe } from 'lucide-react';
import { PARTNERS_DATA } from '../../data/partners';
import { useStore } from '../../store/useStore';

export function PartnerModal() {
  const closeModal = useStore((state) => state.closeModal);
  const selectedPartnerCategory = useStore((state) => state.selectedPartnerCategory);

  const [selectedCategory, setSelectedCategory] = useState(
    selectedPartnerCategory || PARTNERS_DATA.categories[0].id
  );
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    proposal: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#F7F4ED] rounded-3xl shadow-2xl border border-[#C86B4A]/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#C86B4A]/30 flex items-center justify-between bg-[#EFEBE3]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A] mb-1">
              PARTNERSHIP OPPORTUNITIES
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#172B3A]">
              {PARTNERS_DATA.title}
            </h2>
            <p className="text-xs text-[#202321]/75">
              {PARTNERS_DATA.subtitle}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-[#C86B4A] hover:text-white flex items-center justify-center text-[#172B3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 4 Partnership Types (Page 17) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PARTNERS_DATA.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#172B3A] text-white border-[#172B3A] shadow-md'
                    : 'bg-white text-[#172B3A] border-[#C86B4A]/30 hover:border-[#C86B4A]'
                }`}
              >
                <div className="font-serif font-bold text-base mb-1">{cat.title}</div>
                <p className={`text-xs ${selectedCategory === cat.id ? 'text-white/80' : 'text-[#202321]/70'}`}>
                  {cat.description}
                </p>
              </button>
            ))}
          </div>

          {/* Proposal Form */}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#E8EFEA] border border-[#A8B29B]/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#172B3A] mx-auto" />
              <h3 className="text-xl font-serif font-bold text-[#172B3A]">
                Partnership Inquiry Received
              </h3>
              <p className="text-xs text-[#202321]/80 max-w-md mx-auto">
                Thank you for your interest in building the future of convenience with Village Deli. Our business development team will review your proposal and get in touch.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-full bg-[#172B3A] text-white text-xs font-semibold hover:bg-[#C86B4A] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#172B3A]">
                Submit Your Proposal
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="Your Mobile Number"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Email Address *</label>
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
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">City *</label>
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
                <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Property or Business Details</label>
                <textarea
                  rows="3"
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                  placeholder="Share details about your property location, frontage, fuel station volume, or strategic interest..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-full border border-[#C86B4A]/40 text-xs font-semibold text-[#172B3A] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#172B3A] text-white text-xs font-semibold hover:bg-[#C86B4A] transition-colors shadow-sm"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
