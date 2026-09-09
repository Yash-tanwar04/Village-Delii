import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X, Clock } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (headerRef.current) {
        const h = headerRef.current.getBoundingClientRect().height;
        if (h > 0) {
          document.documentElement.style.setProperty('--navbar-height', `${Math.round(h)}px`);
        }
      }
    };

    updateNavbarHeight();

    let ro;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      ro = new ResizeObserver(updateNavbarHeight);
      ro.observe(headerRef.current);
    }

    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "What We Offer", path: "/offerings" },
    { label: "Experience", path: "/experience" },
    { label: "Locations", path: "/locations" },
    { label: "Expansion", path: "/expansion" },
    { label: "Partner & Careers", path: "/partner", matchPaths: ["/partner", "/careers", "/join"] },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#F7F4ED]/95 backdrop-blur-md shadow-sm border-b border-[#E5D8C5] text-[#172B3A]'
            : 'py-4.5 bg-[#F7F4ED]/85 backdrop-blur-sm border-b border-[#E5D8C5]/50 text-[#172B3A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#172B3A] text-[#C86B4A] flex items-center justify-center font-serif text-lg font-bold shadow-xs transition-transform duration-300 group-hover:scale-105">
              VD
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-xl tracking-tight text-[#172B3A] block leading-none">
                Village Deli
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A8B29B] font-semibold flex items-center gap-1 mt-0.5 font-mono">
                <Clock className="w-2.5 h-2.5 text-[#C86B4A]" /> 24/7 Always Open
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = link.matchPaths
                ? link.matchPaths.includes(location.pathname)
                : location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-semibold tracking-wide transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#C86B4A] font-bold'
                      : 'text-[#202321]/80 hover:text-[#C86B4A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C86B4A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Persistent CTA & Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/locations"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#172B3A] text-[#F7F4ED] hover:bg-[#A8B29B] transition-colors shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>Find a Store</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#172B3A] hover:bg-[#E5D8C5]/30 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F7F4ED]/98 backdrop-blur-2xl flex flex-col pt-24 pb-8 px-6 lg:hidden animate-in fade-in duration-200">
          <div className="flex-1 flex flex-col justify-center space-y-2.5 max-w-sm mx-auto w-full text-left">
            {navLinks.map((link, idx) => {
              const isActive = link.matchPaths
                ? link.matchPaths.includes(location.pathname)
                : location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between py-2.5 border-b border-[#E5D8C5]/60 transition-colors ${
                    isActive ? 'text-[#C86B4A] font-bold' : 'text-[#172B3A] hover:text-[#C86B4A]'
                  }`}
                >
                  <span className="font-serif text-lg font-bold">{link.label}</span>
                  <span className="text-xs font-mono text-[#C86B4A]">0{idx + 1}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#E5D8C5] max-w-sm mx-auto w-full">
            <Link
              to="/locations"
              className="w-full py-3.5 px-4 rounded-full bg-[#172B3A] text-[#F7F4ED] font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-[#C86B4A]" />
              Find a Store
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
