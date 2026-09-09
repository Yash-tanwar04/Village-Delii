import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, Clock, MapPin, Mail } from 'lucide-react';
import { BRAND } from '../../data/brand';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navColumns = [
    {
      title: "Explore",
      links: [
        { label: "Home", path: "/" },
        { label: "About Village Deli", path: "/about" },
        { label: "What We Offer", path: "/offerings" },
        { label: "The Experience", path: "/experience" },
      ]
    },
    {
      title: "Network & Growth",
      links: [
        { label: "Our Locations", path: "/locations" },
        { label: "Haryana Expansion", path: "/expansion" },
        { label: "Partner With Us", path: "/partner" },
        { label: "Careers", path: "/careers" },
      ]
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      svg: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
          <polygon points="10 15 15 12 10 9 10 15"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-[#172B3A] text-[#F7F4ED] border-t border-[#E5D8C5]/20 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10 text-left">
          
          {/* Brand & Strategic Collaboration Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C86B4A] text-[#172B3A] flex items-center justify-center font-serif text-xl font-bold shadow-md">
                VD
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-white block leading-none">
                  Village Deli
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86B4A] font-semibold mt-1 block font-mono">
                  {BRAND.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#E5D8C5]/80 max-w-sm leading-relaxed">
              {BRAND.coreBrandStatement.statement}
            </p>

            {/* Strategic Collaboration Badge from Page 20 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-2xl bg-white/5 border border-[#C86B4A]/30 text-xs text-[#E5D8C5] max-w-fit">
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg shrink-0">
                <img src="/assets/images/harhith-logo.jpg" alt="HarHith" className="h-6 w-auto object-contain rounded" />
                <div className="h-5 w-px bg-gray-300" />
                <img src="/assets/images/vita-logo.jpg" alt="Vita" className="h-6 w-auto object-contain rounded" />
              </div>
              <span className="font-mono text-xs">{BRAND.footer.collaboration}</span>
            </div>

            <div className="text-xs text-[#E5D8C5]/60 flex items-center gap-2 pt-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#A8B29B]" />
              <span>24 Hours a Day • 7 Days a Week</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {navColumns.map((col, idx) => (
            <div key={idx} className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86B4A]">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E5D8C5]/80">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="hover:text-[#C86B4A] transition-colors inline-block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86B4A]">
              Connect
            </h4>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#A8B29B] text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label={s.name}
                >
                  {s.svg}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full bg-[#C86B4A] text-[#172B3A] hover:bg-[#b55c3c] transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Village Deli</span>
              </Link>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#E5D8C5]/70 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3 h-3 text-[#C86B4A]" />
              </button>
            </div>
          </div>

        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D8C5]/60 text-left">
          <div>{BRAND.footer.copyright}</div>
          <div className="flex items-center gap-6">
            {BRAND.footer.legalLinks.map((legal, i) => (
              <a
                key={i}
                href={legal.href}
                className="hover:text-white transition-colors"
              >
                {legal.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
