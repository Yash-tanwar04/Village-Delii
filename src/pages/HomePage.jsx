import React, { useEffect } from 'react';
import { HeroEditorial } from '../components/motion/HeroEditorial';
import { DividerHeroToTwentyFour } from '../components/motion/SectionDividers';
import { TwentyFourSevenWindow } from '../components/motion/TwentyFourSevenWindow';
import { FinalBrandStatement } from '../components/motion/FinalBrandStatement';

export function HomePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      setTimeout(() => {
        if (scrollTarget === 'twentyfour') {
          const el = document.getElementById('twenty-four-seven-window') || document.getElementById('twenty-four-seven');
          if (el) {
            const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
            const targetY = el.offsetTop - navH;
            if (window.__lenis) {
              window.__lenis.scrollTo(targetY, { immediate: true });
            } else {
              window.scrollTo({ top: targetY, behavior: 'instant' });
            }
          }
        } else {
          const y = parseInt(scrollTarget, 10);
          if (!isNaN(y)) {
            if (window.__lenis) {
              window.__lenis.scrollTo(y, { immediate: true });
            } else {
              window.scrollTo({ top: y, behavior: 'instant' });
            }
          }
        }
      }, 400);
    }
  }, []);

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip select-none">
      {/* 01. EDITORIAL HERO */}
      <HeroEditorial />

      {/* SEAMLESS TRANSITION DIVIDER */}
      <DividerHeroToTwentyFour />

      {/* 02. 24/7 DAY & NIGHT CELESTIAL WINDOW */}
      <TwentyFourSevenWindow />

      {/* 03. THE VILLAGE DELI PROMISE & CLOSING */}
      <FinalBrandStatement />
    </div>
  );
}
