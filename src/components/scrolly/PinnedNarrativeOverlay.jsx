import React from 'react';
import { 
  ArrowDown, 
  MapPin, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Store, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset 
} from 'lucide-react';
import { BRAND } from '../../data/brand';
import { OFFERINGS } from '../../data/offerings';
import { EXPERIENCES } from '../../data/experience';
import { EXPANSION } from '../../data/expansion';
import { useStore } from '../../store/useStore';

export function PinnedNarrativeOverlay() {
  const journeyProgress = useStore((state) => state.journeyProgress);
  const openModal = useStore((state) => state.openModal);

  // Time-lapse timestamp & celestial icon for Scene 06
  const getCelestialData = () => {
    if (journeyProgress < 0.62) {
      return { time: "06:00 AM", label: "Golden Dawn Sunrise", icon: Sunrise, iconColor: "text-[#FFA040]" };
    }
    if (journeyProgress < 0.66) {
      return { time: "12:00 PM", label: "Midday Sun & Peak Energy", icon: Sun, iconColor: "text-[#FFD54F]" };
    }
    if (journeyProgress < 0.70) {
      return { time: "06:00 PM", label: "Sunset Dusk & Commute", icon: Sunset, iconColor: "text-[#FF7043]" };
    }
    if (journeyProgress < 0.75) {
      return { time: "12:00 AM", label: "Midnight 24/7 Warm Glow", icon: Moon, iconColor: "text-[#90CAF9]" };
    }
    return { time: "03:00 AM", label: "Serene Late Night Reliability", icon: Moon, iconColor: "text-[#B39DDB]" };
  };

  const celestial = getCelestialData();
  const CelestialIcon = celestial.icon;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 md:p-12 z-10">
      {/* Top Header Status & Celestial HUD */}
      <div className="pt-16 sm:pt-14 flex flex-col items-center gap-2">
        <div className="glass-panel px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-[#172B3A] flex items-center gap-2 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#C86B4A] animate-pulse"></span>
          <span>CINEMATIC JOURNEY</span>
          <span className="text-[#A8B29B]">•</span>
          <span className="font-mono text-[#C86B4A]">{Math.round(journeyProgress * 100)}%</span>
        </div>

        {/* 24/7 Sun & Moon Real-Time Arc Tracker (Visible during 24/7 sequence) */}
        {journeyProgress >= 0.58 && journeyProgress <= 0.82 && (
          <div className="glass-panel-dark px-4 py-2 rounded-2xl flex items-center gap-3 text-white shadow-xl border border-white/15 animate-in fade-in zoom-in-95 duration-300">
            <CelestialIcon className={`w-5 h-5 ${celestial.iconColor} animate-spin-slow`} />
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm text-[#C86B4A] tracking-widest leading-none">
                {celestial.time}
              </span>
              <span className="text-[10px] text-white/70">
                {celestial.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Center / Bottom Floating Narrative Overlays */}
      <div className="my-auto max-w-xl mx-auto w-full pointer-events-auto">
        {/* =========================================================================
            SCENE 01: THE BEGINNING (0.00 - 0.12)
            ========================================================================= */}
        {journeyProgress <= 0.12 && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-xl border border-[#C86B4A]/30 animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8EFEA] text-[#172B3A] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
              {BRAND.badgesJoined}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#172B3A] leading-tight">
              {BRAND.name}
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-[#C86B4A]">
              “{BRAND.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-[#202321]/85 leading-relaxed max-w-md mx-auto">
              {BRAND.heroDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openModal('offerings')}
                className="px-5 py-2.5 rounded-full bg-[#172B3A] text-[#F7F4ED] text-xs sm:text-sm font-semibold hover:bg-[#C86B4A] transition-colors shadow-sm cursor-pointer"
              >
                Explore Village Deli
              </button>
              <button
                onClick={() => openModal('locations')}
                className="px-5 py-2.5 rounded-full bg-[#F7F4ED] text-[#172B3A] border border-[#172B3A]/30 text-xs sm:text-sm font-semibold hover:bg-[#E8EFEA] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C86B4A]" />
                Find a Location
              </button>
            </div>

            <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#A8B29B]">
              <ArrowDown className="w-3.5 h-3.5 text-[#C86B4A] animate-bounce" />
              <span>Scroll down to experience the journey</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 02: THE WORLD STARTS DEVELOPING (0.12 - 0.24)
            ========================================================================= */}
        {journeyProgress > 0.12 && journeyProgress <= 0.24 && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl border border-[#C86B4A]/30 animate-in fade-in duration-500">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              Introduction
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#172B3A] leading-snug">
              {BRAND.aboutIntro.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#202321]/90 leading-relaxed">
              {BRAND.aboutIntro.concept}
            </p>
            <div className="p-3 bg-[#E8EFEA]/70 rounded-2xl border border-[#A8B29B]/25 text-xs font-serif italic text-[#172B3A]">
              “{BRAND.aboutIntro.motto}”
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "Groceries",
                "Fresh Produce",
                "Fresh Bakery",
                "Quick Meals",
                "Beverages",
                "Dairy & Essentials",
              ].map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#F7F4ED] border border-[#C86B4A]/40 text-[#172B3A] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 03: VILLAGE DELI TAKES SHAPE (0.24 - 0.38)
            ========================================================================= */}
        {journeyProgress > 0.24 && journeyProgress <= 0.38 && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl border border-[#C86B4A]/30 animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C86B4A]/20 text-[#C86B4A] text-xs font-bold tracking-wider">
              <Store className="w-3.5 h-3.5" />
              THE FLAGSHIP STORE
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#172B3A]">
              Village Deli Takes Shape
            </h2>
            <p className="text-xs sm:text-sm text-[#202321]/85 leading-relaxed">
              Warm vertical fluted oak battens, floor-to-ceiling clear glass curtain walls, and backlit channel lettering — a modern convenience destination designed for India.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#C86B4A]/30">
                <div className="text-xs font-bold text-[#172B3A]">24/7 Beacon</div>
                <div className="text-[11px] text-[#A8B29B]">Always Open, Always Ready</div>
              </div>
              <div className="p-3 bg-[#F7F4ED] rounded-xl border border-[#C86B4A]/30">
                <div className="text-xs font-bold text-[#172B3A]">Natural Craft</div>
                <div className="text-[11px] text-[#A8B29B]">Timber, stone, & warm light</div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 04: ENTER THE STORE & WHAT WE OFFER (0.38 - 0.48)
            ========================================================================= */}
        {journeyProgress > 0.38 && journeyProgress <= 0.48 && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl border border-[#C86B4A]/30 animate-in fade-in duration-500">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              Step Inside • What We Offer
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#172B3A]">
              {OFFERINGS.tagline}
            </h2>
            <p className="text-xs sm:text-sm text-[#202321]/85">
              {OFFERINGS.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {OFFERINGS.categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#C86B4A]/30 flex flex-col justify-between"
                >
                  <div className="text-xs font-bold text-[#172B3A]">{cat.title}</div>
                  <div className="text-[10px] text-[#202321]/70 line-clamp-1">{cat.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 05: THE VILLAGE DELI EXPERIENCE (0.48 - 0.58)
            ========================================================================= */}
        {journeyProgress > 0.48 && journeyProgress <= 0.58 && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-3 shadow-xl border border-[#C86B4A]/30 animate-in fade-in duration-500">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              Onsite Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#172B3A]">
              {EXPERIENCES.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#202321]/85">
              {EXPERIENCES.subtitle} — where freshness meets convenience and quality meets accessibility.
            </p>
            <div className="space-y-1.5 pt-1">
              {EXPERIENCES.items.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#F7F4ED] border border-[#C86B4A]/20"
                >
                  <span className="text-xs font-bold text-[#172B3A]">{exp.title}</span>
                  <span className="text-[10px] text-[#A8B29B] font-medium">{exp.feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 06: THE 24/7 MOMENT (0.58 - 0.72)
            ========================================================================= */}
        {journeyProgress > 0.58 && journeyProgress <= 0.72 && (
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl border border-white/20 text-[#F7F4ED] animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C86B4A] text-white text-xs font-bold">
                <Clock className="w-3.5 h-3.5" /> 24/7 CONTINUOUS
              </span>
              <div className="flex items-center gap-2 font-mono text-xl font-bold text-[#C86B4A]">
                <CelestialIcon className="w-4 h-4 text-[#FFA040]" />
                <span>{celestial.time}</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F7F4ED]">
                {BRAND.twentyFourSeven.headline}
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-[#C86B4A] mt-1">
                “{BRAND.twentyFourSeven.philosophy}”
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#F7F4ED]/85 leading-relaxed">
              {BRAND.twentyFourSeven.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#E5D8C5] flex items-center justify-between">
              <span>Status: <strong className="text-white">{celestial.label}</strong></span>
              <span className="text-[#6BCB77] font-bold">● Store Open</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 07 & 08: WHY NOW & WHAT MAKES US DIFFERENT (0.72 - 0.80)
            ========================================================================= */}
        {journeyProgress > 0.72 && journeyProgress <= 0.80 && (
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl border border-white/20 text-[#F7F4ED] animate-in fade-in duration-500">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              Operational Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F7F4ED]">
              {BRAND.differentiators.title}
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {BRAND.differentiators.items.map((diff, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-[#C86B4A]">{diff.title}</div>
                  <div className="text-[10px] text-white/70">{diff.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 09 & 10: HARYANA EXPANSION & NORTH INDIA (0.80 - 0.90)
            ========================================================================= */}
        {journeyProgress > 0.80 && journeyProgress <= 0.90 && (
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl space-y-3 shadow-2xl border border-white/20 text-[#F7F4ED] animate-in fade-in duration-500">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              {EXPANSION.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F7F4ED]">
              {EXPANSION.title}
            </h2>
            <p className="text-xs font-serif italic text-[#C86B4A]">
              “{EXPANSION.subheading}”
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              {EXPANSION.description}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-[#E8A858]">
                {EXPANSION.tagline}
              </span>
              <button
                onClick={() => openModal('locations')}
                className="px-4 py-1.5 rounded-full bg-[#C86B4A] text-white text-xs font-medium hover:bg-[#a65538] transition-colors cursor-pointer"
              >
                View Regional Hubs
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 11 & 12: STRATEGIC COLLABORATION & ARCHETYPES (0.90 - 0.96)
            ========================================================================= */}
        {journeyProgress > 0.90 && journeyProgress <= 0.96 && (
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl space-y-3 shadow-2xl border border-white/20 text-[#F7F4ED] animate-in fade-in duration-500">
            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-[#C86B4A] uppercase tracking-wider">
                {EXPANSION.collaboration.title}
              </div>
              <p className="text-xs text-white/85">
                {EXPANSION.collaboration.narrative}
              </p>
              <div className="text-[10px] text-[#C86B4A] font-mono pt-1">
                {EXPANSION.collaboration.legalNotice}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-serif italic text-[#E5D8C5]">
                {EXPANSION.collaboration.banner}
              </span>
              <button
                onClick={() => openModal('partner')}
                className="px-4 py-1.5 rounded-full bg-[#172B3A] border border-[#C86B4A]/40 text-xs font-semibold text-white hover:bg-[#C86B4A] transition-colors cursor-pointer"
              >
                Partner With Us
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SCENE 16 & FINALE: CORE BRAND STATEMENT (0.96 - 1.00)
            ========================================================================= */}
        {journeyProgress > 0.96 && (
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-2xl border border-white/25 text-[#F7F4ED] animate-in fade-in duration-500">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {BRAND.coreBrandStatement.headline}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 max-w-md mx-auto leading-relaxed">
              {BRAND.coreBrandStatement.statement}
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#C86B4A] text-white text-xs font-bold tracking-widest">
              {BRAND.coreBrandStatement.signature}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openModal('locations')}
                className="px-5 py-2.5 rounded-full bg-[#172B3A] border border-[#C86B4A]/50 text-white text-xs font-semibold hover:bg-[#C86B4A] transition-colors cursor-pointer"
              >
                Find Your Store
              </button>
              <button
                onClick={() => openModal('contact')}
                className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
              >
                Connect With Us
              </button>
            </div>

            <p className="text-[11px] text-[#C86B4A] pt-2 animate-bounce font-medium">
              ↓ Scroll down to explore all dedicated sections
            </p>
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="pb-2 flex justify-between items-center text-[10px] text-[#202321]/75 font-mono">
        <span className="hidden sm:inline">24/7 NEIGHBOURHOOD CONVENIENCE</span>
        <span className="mx-auto sm:mx-0">PUNJAB → HARYANA → NORTH INDIA</span>
      </div>
    </div>
  );
}
