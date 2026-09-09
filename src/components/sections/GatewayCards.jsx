import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShoppingBag, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  Users, 
  Mail, 
  Clock 
} from 'lucide-react';
import { useStore } from '../../store/useStore';

export function GatewayCards() {
  const openModal = useStore((state) => state.openModal);

  const cards = [
    {
      id: "offerings",
      title: "What We Offer",
      subtitle: "Everything You Need. All Under One Roof.",
      description: "From everyday essentials and fresh farm produce to freshly baked goods, quick meals, and chilled beverages.",
      image: "/assets/images/ghibli-produce.jpg",
      badge: "6 DEPARTMENTS",
      icon: ShoppingBag,
      cta: "Explore Offerings"
    },
    {
      id: "experience",
      title: "The Village Deli Experience",
      subtitle: "A Store Experience That Delivers More.",
      description: "Onsite stone-ground flour mill, cold-pressed raw juices, fresh oven bakes, express convenience, and a welcoming lounge.",
      image: "/assets/images/ghibli-bakery.jpg",
      badge: "ONSITE CRAFT",
      icon: Sparkles,
      cta: "Discover Experiences"
    },
    {
      id: "locations",
      title: "Our Locations",
      subtitle: "Find Your Nearest Village Deli.",
      description: "Explore 24/7 neighbourhood stores across Haryana & Punjab with Google Maps navigation and instant calling.",
      image: "/assets/images/ghibli-night.jpg",
      badge: "24/7 ALWAYS OPEN",
      icon: MapPin,
      cta: "Open Store Locator"
    },
    {
      id: "expansion",
      title: "Our Expansion Story",
      subtitle: "From Punjab to Haryana to North India.",
      description: "Strategic collaboration with HarHith & Vita, scaling across expressways, mobility hubs, and residential townships.",
      image: "/assets/images/ghibli-expansion.jpg",
      badge: "REGIONAL NETWORK",
      icon: TrendingUp,
      cta: "View Expansion Plan"
    },
    {
      id: "partner",
      title: "Partner With Us",
      subtitle: "Let's Build the Future of Convenience Together.",
      description: "High-potential avenues for Property Owners, Fuel Station Operators, Business Partners, and Strategic Institutions.",
      badge: "BUSINESS OPPORTUNITY",
      icon: Briefcase,
      cta: "Explore Partnerships"
    },
    {
      id: "careers",
      title: "Careers at Village Deli",
      subtitle: "Build the Future With Village Deli.",
      description: "Join a growing team across store operations, customer experience, food craft, management, and technology.",
      badge: "WE'RE GROWING",
      icon: Users,
      cta: "Explore Careers"
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "Have a Question or Business Proposal?",
      description: "Submit your inquiry for general questions, franchise partnerships, properties, or strategic collaboration.",
      badge: "DIRECT ENQUIRY",
      icon: Mail,
      cta: "Send an Enquiry"
    }
  ];

  return (
    <section className="relative z-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isSpanTwo = idx === 0 || idx === 3;

          return (
            <div
              key={card.id}
              onClick={() => openModal(card.id)}
              className={`group relative overflow-hidden rounded-3xl bg-[#F7F4ED] border border-[#C86B4A]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isSpanTwo ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image Banner */}
              {card.image && (
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#172B3A]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F7F4ED] via-transparent to-black/30" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#172B3A]/90 backdrop-blur-md text-[#F7F4ED] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                      <Icon className="w-3 h-3 text-[#C86B4A]" />
                      {card.badge}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {!card.image && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#172B3A] text-[10px] font-bold tracking-wider uppercase mb-2">
                      <Icon className="w-3 h-3 text-[#C86B4A]" />
                      {card.badge}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#C86B4A]">
                    {card.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#202321]/75 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card CTA Action */}
                <div className="pt-4 border-t border-[#C86B4A]/20 flex items-center justify-between text-xs font-bold text-[#172B3A] group-hover:text-[#C86B4A]">
                  <span>{card.cta}</span>
                  <div className="w-8 h-8 rounded-full bg-[#E8EFEA] text-[#172B3A] group-hover:bg-[#C86B4A] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
