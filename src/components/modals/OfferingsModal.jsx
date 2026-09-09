import React, { useState } from 'react';
import { X, ShoppingCart, Apple, Croissant, Sandwich, CupSoda, Milk, Sparkles, CheckCircle2 } from 'lucide-react';
import { OFFERINGS } from '../../data/offerings';
import { EXPERIENCES } from '../../data/experience';
import { useStore } from '../../store/useStore';

export function OfferingsModal() {
  const closeModal = useStore((state) => state.closeModal);
  const [activeTab, setActiveTab] = useState('offerings');

  const getIcon = (title) => {
    switch (title) {
      case "Groceries": return ShoppingCart;
      case "Fresh Produce": return Apple;
      case "Fresh Bakery": return Croissant;
      case "Quick Meals": return Sandwich;
      case "Beverages": return CupSoda;
      default: return Milk;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F7F4ED] rounded-3xl shadow-2xl border border-[#C86B4A]/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#C86B4A]/30 flex items-center justify-between bg-[#EFEBE3]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#C86B4A] mb-1">
              CURATED RETAIL & CRAFTSMANSHIP
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#172B3A]">
              {OFFERINGS.title}
            </h2>
            <p className="text-xs text-[#202321]/75">
              {OFFERINGS.tagline}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-[#C86B4A] hover:text-white flex items-center justify-center text-[#172B3A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="p-4 sm:px-6 border-b border-[#C86B4A]/20 flex gap-2">
          <button
            onClick={() => setActiveTab('offerings')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
              activeTab === 'offerings'
                ? 'bg-[#172B3A] text-white'
                : 'bg-white text-[#172B3A] border border-[#C86B4A]/30 hover:bg-[#E8EFEA]'
            }`}
          >
            The 6 Core Offerings
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors ${
              activeTab === 'experiences'
                ? 'bg-[#172B3A] text-white'
                : 'bg-white text-[#172B3A] border border-[#C86B4A]/30 hover:bg-[#E8EFEA]'
            }`}
          >
            The 5 In-Store Experiences
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'offerings' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OFFERINGS.categories.map((cat) => {
                const Icon = getIcon(cat.title);
                return (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-white border border-[#C86B4A]/30 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#E8EFEA] text-[#172B3A]">
                          {cat.tag}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#F7F4ED] text-[#C86B4A] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#172B3A]">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#C86B4A]">
                        {cat.description}
                      </p>
                      <p className="text-xs text-[#202321]/75 leading-relaxed pt-1">
                        {cat.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#202321]/80 italic max-w-2xl">
                {EXPERIENCES.intro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPERIENCES.items.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-white border border-[#C86B4A]/30 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#FFF0DA] text-[#C86B4A]">
                        {exp.feature}
                      </span>
                      <Sparkles className="w-4 h-4 text-[#C86B4A]" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#172B3A]">
                      {exp.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#172B3A]/90">
                      {exp.description}
                    </p>
                    <p className="text-xs text-[#202321]/75 leading-relaxed">
                      {exp.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
