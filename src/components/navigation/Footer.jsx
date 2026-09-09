import React from 'react';
import { ArrowUp, ShieldCheck, Clock } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { NAV_LINKS } from '../../data/navigation';
import { useStore } from '../../store/useStore';

export function Footer() {
  const openModal = useStore((state) => state.openModal);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <footer className="relative z-20 bg-[#172B3A] text-[#F7F4ED] border-t border-[#C86B4A]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Strategic Collaboration Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#C86B4A] text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
                VD
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-white block leading-none">
                  Village Deli
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86B4A] font-semibold mt-1 block">
                  {BRAND.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-white/75 max-w-md leading-relaxed">
              {BRAND.coreBrandStatement.statement}
            </p>

            {/* Strategic Collaboration Badge from Page 20 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C86B4A]/30 text-xs font-medium text-[#E5D8C5]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>{BRAND.footer.collaboration}</span>
            </div>

            <div className="text-xs text-white/60 flex items-center gap-2 pt-2">
              <Clock className="w-3.5 h-3.5 text-[#C86B4A]" />
              <span>24 Hours a Day • 7 Days a Week • Always Ready</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      if (link.id === 'home') scrollToTop();
                      else openModal(link.id);
                    }}
                    className="hover:text-[#C86B4A] transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us & Back to Top */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C86B4A]">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C86B4A] text-white flex items-center justify-center transition-colors"
                  aria-label={s.name}
                >
                  {s.svg}
                </a>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#C86B4A]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
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
