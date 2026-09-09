import React, { useState } from 'react';
import { Briefcase, Users, ChefHat, TrendingUp, Cpu, Sparkles, Send, X, CheckCircle2 } from 'lucide-react';
import { CAREERS_DATA } from '../../data/careers';

export function CareersSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Store Operations',
    city: '',
    experience: '',
  });

  const icons = {
    'store-operations': Briefcase,
    'customer-experience': Users,
    management: TrendingUp,
    'food-culinary': ChefHat,
    technology: Cpu,
    'business-dev': Sparkles,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="careers" className="py-28 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5]">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172B3A]/5 border border-[#E5D8C5] text-xs font-mono uppercase tracking-widest text-[#A8B29B]">
            <Users className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>Section 10 • Human Culture</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#172B3A] leading-tight">
            {CAREERS_DATA.title}
          </h2>

          <p className="font-serif text-2xl sm:text-3xl text-[#A8B29B] italic font-medium">
            "{CAREERS_DATA.lead}"
          </p>

          <p className="text-base sm:text-lg text-[#202321]/80 leading-relaxed pt-2">
            {CAREERS_DATA.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setModalOpen(true);
                setSubmitted(false);
              }}
              className="px-6 py-3 rounded-full bg-[#172B3A] text-[#F7F4ED] hover:bg-[#A8B29B] font-semibold text-xs sm:text-sm transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#C86B4A]" />
              <span>{CAREERS_DATA.secondaryCta}</span>
            </button>
            <span className="text-xs text-[#202321]/60 font-mono">
              Positions across Punjab & Haryana
            </span>
          </div>
        </div>

        {/* 6 Human Career Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREERS_DATA.departments.map((dept, idx) => {
            const Icon = icons[dept.id] || Briefcase;

            return (
              <div
                key={dept.id}
                className="bg-white rounded-[28px] p-7 border border-[#E5D8C5] shadow-xs hover:border-[#A8B29B] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F4ED] border border-[#E5D8C5] text-[#172B3A] flex items-center justify-center mb-5 group-hover:bg-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-[#A8B29B] block mb-1">Discipline 0{idx + 1}</span>
                  <h3 className="font-serif text-xl font-bold text-[#172B3A] mb-2 group-hover:text-[#A8B29B] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#202321]/75 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E5D8C5]/40 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, department: dept.title });
                      setModalOpen(true);
                      setSubmitted(false);
                    }}
                    className="text-xs font-semibold text-[#172B3A] hover:text-[#A8B29B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply for this role</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Resume Dispatch Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-[#202321] rounded-[32px] border border-[#E5D8C5] p-8 sm:p-10 max-w-xl w-full text-left relative shadow-2xl space-y-6">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F4ED] hover:bg-[#E5D8C5] text-[#172B3A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#A8B29B] uppercase tracking-wider font-bold">
                Direct Talent Application
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#172B3A]">
                Join the Team
              </h3>
              <p className="text-xs text-[#202321]/70">
                Selected discipline: <strong>{formData.department}</strong>
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-900">Application Received</h4>
                <p className="text-xs text-emerald-800">
                  Thank you for your interest in building Village Deli. Our talent team will reach out if there is an operational match.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-full bg-[#172B3A] text-white font-semibold text-xs"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Meera Rawat"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1">Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98123 45678"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="meera@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#172B3A] mb-1">Current City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Gurgaon, Chandigarh"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B3A] mb-1">Background / Past Experience *</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Briefly describe your retail, culinary, customer service or operational background..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F7F4ED] border border-[#E5D8C5] text-xs text-[#172B3A] focus:outline-none focus:border-[#A8B29B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#172B3A] hover:bg-[#A8B29B] text-white font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C86B4A]" />
                  <span>Send Resume Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
