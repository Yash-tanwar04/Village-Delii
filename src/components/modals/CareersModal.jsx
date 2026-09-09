import React, { useState } from 'react';
import { X, CheckCircle2, UploadCloud, Users, Briefcase } from 'lucide-react';
import { CAREERS_DATA } from '../../data/careers';
import { useStore } from '../../store/useStore';

export function CareersModal() {
  const closeModal = useStore((state) => state.closeModal);
  const [selectedDept, setSelectedDept] = useState(CAREERS_DATA.departments[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState('');

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
              {CAREERS_DATA.badge}
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#172B3A]">
              {CAREERS_DATA.title}
            </h2>
            <p className="text-xs text-[#202321]/75">
              {CAREERS_DATA.lead}
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
          <p className="text-xs sm:text-sm text-[#202321]/85 leading-relaxed">
            {CAREERS_DATA.description}
          </p>

          {/* Department Streams */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CAREERS_DATA.departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => setSelectedDept(dept.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  selectedDept === dept.id
                    ? 'bg-[#172B3A] text-white border-[#172B3A] shadow-sm'
                    : 'bg-white text-[#172B3A] border-[#C86B4A]/30 hover:border-[#C86B4A]'
                }`}
              >
                <div className="font-serif font-bold text-xs mb-1">{dept.title}</div>
                <p className={`text-[11px] leading-tight ${selectedDept === dept.id ? 'text-white/80' : 'text-[#202321]/70'}`}>
                  {dept.description}
                </p>
              </button>
            ))}
          </div>

          {/* Application Form */}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#E8EFEA] border border-[#A8B29B]/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#172B3A] mx-auto" />
              <h3 className="text-xl font-serif font-bold text-[#172B3A]">
                Application Submitted
              </h3>
              <p className="text-xs text-[#202321]/80 max-w-md mx-auto">
                Thank you for applying to Village Deli. Our talent team reviews applications continually and will reach out if your profile matches an opening.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-full bg-[#172B3A] text-white text-xs font-semibold hover:bg-[#C86B4A] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#C86B4A]/20">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#172B3A]">
                Send Your Resume
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="Mobile Number"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">City / Preferred Base *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#C86B4A]/40 text-xs text-[#172B3A] focus:outline-hidden focus:border-[#C86B4A]"
                    placeholder="e.g. Gurgaon, Ambala"
                  />
                </div>
              </div>

              {/* Upload Resume Mock */}
              <div>
                <label className="block text-[11px] font-semibold text-[#172B3A] mb-1">Attach Resume (PDF / DOCX)</label>
                <div className="relative border-2 border-dashed border-[#C86B4A]/40 rounded-2xl p-4 text-center hover:bg-white transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={(e) => setResumeName(e.target.files[0]?.name || '')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-6 h-6 text-[#A8B29B] mx-auto mb-1" />
                  <span className="text-xs font-semibold text-[#172B3A]">
                    {resumeName || "Click to browse or drag & drop your resume"}
                  </span>
                  <div className="text-[10px] text-[#202321]/60 mt-0.5">Maximum file size: 5MB</div>
                </div>
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
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
