import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X, ArrowRight, Clock } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { useStore } from '../../store/useStore';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const openModal = useStore((state) => state.openModal);
  const mobileMenuOpen = useStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = useStore((state) => state.setMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      openModal(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 glass-panel shadow-sm' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Botanical Leaf Icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-[#172B3A] text-[#F7F4ED] flex items-center justify-center font-serif text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
              VD
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-tight text-[#172B3A] block leading-none">
                Village Deli
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#A8B29B] font-semibold flex items-center gap-1 mt-0.5">
                <Clock className="w-2.5 h-2.5 text-[#C86B4A]" /> 24/7 Always Open
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.slice(1, 7).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-xs font-medium text-[#202321]/80 hover:text-[#C86B4A] transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions: "Find a Location" & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('locations')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#172B3A] text-[#F7F4ED] hover:bg-[#C86B4A] transition-colors shadow-sm cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>Find a Location</span>
            </button>

            <button
              onClick={() => openModal('contact')}
              className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-[#172B3A] hover:text-[#C86B4A] px-3 py-2 cursor-pointer transition-colors"
            >
              <span>Contact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#172B3A] hover:bg-[#E8EFEA] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F7F4ED]/95 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 lg:hidden animate-in fade-in duration-200">
          <div className="flex-1 flex flex-col justify-center space-y-4 max-w-sm mx-auto w-full">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between text-left py-2.5 border-b border-[#C86B4A]/20 text-[#172B3A] hover:text-[#C86B4A] transition-colors"
              >
                <span className="font-serif text-lg font-medium">{link.label}</span>
                <span className="text-xs font-mono text-[#A8B29B]">{link.num}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#C86B4A]/30 max-w-sm mx-auto w-full flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('locations');
              }}
              className="w-full py-3 px-4 rounded-full bg-[#172B3A] text-[#F7F4ED] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-[#C86B4A]" />
              Find a Location
            </button>
          </div>
        </div>
      )}
    </>
  );
}
