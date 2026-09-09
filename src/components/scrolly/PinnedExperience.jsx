import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../../store/useStore';
import { ExperienceCanvas } from '../3d/ExperienceCanvas';
import { PinnedNarrativeOverlay } from './PinnedNarrativeOverlay';

gsap.registerPlugin(ScrollTrigger);

export function PinnedExperience() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const setJourneyProgress = useStore((state) => state.setJourneyProgress);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // GSAP ScrollTrigger bound to the 600vh virtual track
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.0, // Buttery smooth scrubbing on touch and mousewheel
      onUpdate: (self) => {
        // self.progress is normalized 0.0 to 1.0
        setJourneyProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setJourneyProgress]);

  return (
    // 500vh Virtual Scroll Track: gives ample space for the 16 scenes without rushing
    <div
      ref={containerRef}
      id="pinned-journey-track"
      className="relative w-full h-[500vh]"
    >
      {/* 
        Sticky 100vh Viewport: 
        The screen stays pinned right in front of the user until the 500vh track finishes!
      */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#F7F4ED]"
      >
        {/* The 3D WebGL Canvas Layer */}
        <ExperienceCanvas />

        {/* The Spatial Editorial Narrative Overlay */}
        <PinnedNarrativeOverlay />
      </div>
    </div>
  );
}
