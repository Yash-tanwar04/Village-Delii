import React from 'react';
import { HeroEditorial } from '../components/motion/HeroEditorial';
import {
  DividerHeroToManifesto,
  DividerManifestoToExperience,
  DividerTwentyFourToExplore,
} from '../components/motion/SectionDividers';
import { IntroCollage } from '../components/motion/IntroCollage';
import { PinnedExperienceScroll } from '../components/motion/PinnedExperienceScroll';
import { TwentyFourSevenWindow } from '../components/motion/TwentyFourSevenWindow';
import { ExploreEditorialIndex } from '../components/motion/ExploreEditorialIndex';
import { FinalBrandStatement } from '../components/motion/FinalBrandStatement';

export function HomePage() {
  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip select-none">
      {/* 01. HERO */}
      <HeroEditorial />

      {/* DIVIDER 01 */}
      <DividerHeroToManifesto />

      {/* 02. BRAND MANIFESTO */}
      <IntroCollage />

      {/* DIVIDER 02: Kinetic ribbon */}
      <DividerManifestoToExperience />

      {/* 03. EXPERIENCE: Pinned 5-ritual vertical reel */}
      <PinnedExperienceScroll />

      {/* 04. 24/7 WINDOW — transitioned directly from experience */}
      <TwentyFourSevenWindow />

      {/* DIVIDER: transition to explore */}
      <DividerTwentyFourToExplore />

      {/* 05. EXPLORE: Editorial Directory */}
      <ExploreEditorialIndex />

      {/* 06. FINAL BRAND CROWN & CTA */}
      <FinalBrandStatement />
    </div>
  );
}
