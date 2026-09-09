import React, { useEffect, useState, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let rafId;

    const onMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorText(target.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else {
        const clickable = e.target.closest('a, button, [role="button"], input, select, textarea');
        if (clickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      const { targetX, targetY } = posRef.current;
      posRef.current.x += (targetX - posRef.current.x) * 0.18;
      posRef.current.y += (targetY - posRef.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          cursorText
            ? 'w-16 h-16 bg-[#C86B4A] text-[#F7F4ED] shadow-xl text-[10px] font-mono font-bold tracking-widest'
            : isHovered
            ? 'w-10 h-10 bg-[#172B3A]/20 border border-[#C86B4A] backdrop-blur-xs scale-110'
            : 'w-3 h-3 bg-[#C86B4A]'
        }`}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
