import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal: Splits text into words/phrases and animates them with a staggered upward mask reveal.
 */
export function TextReveal({ children, className = '', delay = 0, duration = 0.85, stagger = 0.05 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.word-reveal-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, stagger]);

  if (typeof children !== 'string') {
    return <div ref={containerRef} className={className}>{children}</div>;
  }

  const words = children.split(' ');

  return (
    <span ref={containerRef} className={'inline-flex flex-wrap gap-x-[0.3em] ' + className}>
      {words.map((w, idx) => (
        <span key={idx} className="inline-block overflow-hidden pb-1">
          <span className="word-reveal-inner inline-block will-change-transform">
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * ScrollReveal: Fades and lifts elements into view smoothly when scrolled into viewport.
 */
export function ScrollReveal({ children, className = '', yOffset = 30, duration = 0.8, delay = 0 }) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: yOffset, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, yOffset]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}

/**
 * CardPop: Wraps any card with smooth tactile scale, lift, shadow, and border pop on hover.
 */
export function CardPop({ children, className = '', onClick, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={'card-pop group ' + className}
    >
      {children}
    </div>
  );
}
