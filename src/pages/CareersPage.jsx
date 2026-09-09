import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight, Mail, Users, Briefcase, TrendingUp, Heart, BookOpen, Globe, CheckCircle2, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREERS_DATA } from '../data/careers';
import { TextReveal, ScrollReveal, CardPop } from '../components/motion/MotionPrimitives';

gsap.registerPlugin(ScrollTrigger);

const VALUE_ICONS = [TrendingUp, Heart, BookOpen, Globe];
const DEPT_ICONS  = [Users, Briefcase, TrendingUp, Users, BookOpen, Globe];

const MARQUEE_TRACKS = [
  'STORE OPERATIONS', 'CUSTOMER EXPERIENCE', 'MANAGEMENT & LEADERSHIP',
  'FOOD & CULINARY', 'TECHNOLOGY & SYSTEMS', 'BUSINESS DEVELOPMENT',
];

export function CareersPage() {
  const [activeDept, setActiveDept] = useState(0);
  const ticker1Ref  = useRef(null);
  const cardsRef    = useRef([]);
  const deptRowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous marquee
      gsap.to(ticker1Ref.current, {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1,
      });

      // Value cards stagger
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          delay: i * 0.07,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#F7F4ED] text-[#202321] overflow-x-clip min-h-screen">

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 bg-[#F7F4ED] text-[#202321] border-b border-[#E5D8C5] text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#C86B4A]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#172B3A]/15 text-xs font-mono tracking-widest text-[#172B3A] mb-8 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C86B4A]" />
            <span>07 / TALENT & CULTURE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9 space-y-4">
              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight leading-[0.94] text-[#172B3A]">
                <TextReveal>BUILD THE FUTURE</TextReveal>
                <span className="block italic font-bold text-[#C86B4A] mt-2">
                  <TextReveal delay={0.12}>WITH VILLAGE DELI.</TextReveal>
                </span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[#C86B4A] italic font-medium">"{CAREERS_DATA.lead}"</p>
              <p className="text-base sm:text-lg text-[#202321]/80 font-light max-w-2xl pt-1 leading-relaxed">{CAREERS_DATA.description}</p>
            </div>
            <div className="lg:col-span-3 lg:text-right font-mono text-xs text-[#202321]/70 space-y-1">
              <div className="text-[#C86B4A] font-bold text-sm">6 TALENT TRACKS</div>
              <div>HOVER TO EXPLORE OPPORTUNITIES</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Moving marquee ──────────────────────────────────────────────── */}
      <div className="py-4 bg-[#C86B4A] overflow-hidden whitespace-nowrap border-b border-[#172B3A]/20 select-none">
        <div ref={ticker1Ref} className="inline-block will-change-transform">
          {[...MARQUEE_TRACKS, ...MARQUEE_TRACKS].map((item, idx) => (
            <span key={idx} className="mx-6 inline-flex items-center gap-5 font-serif font-black text-2xl sm:text-3xl text-[#172B3A] tracking-tight">
              <span>{item}</span>
              <span className="text-white/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── 6 Talent tracks (Hover Reveal Rows) ───────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-left border-b border-[#E5D8C5]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">Opportunity Areas</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#172B3A] leading-tight">
              Where You Can Make an Impact
            </h2>
            <p className="text-base text-[#202321]/75 font-light leading-relaxed">
              Every team at Village Deli is united by a commitment to everyday freshness, operational excellence, and warm community hospitality.
            </p>
          </div>

          <div className="text-xs font-mono text-[#202321]/60 flex items-center gap-1.5 self-start sm:self-end">
            <Eye className="w-4 h-4 text-[#C86B4A]" />
            <span>Hover over any track to inspect details</span>
          </div>
        </div>

        <div className="border-t border-[#172B3A]/20 divide-y divide-[#172B3A]/12">
          {CAREERS_DATA.departments.map((dept, idx) => {
            const isSelected = activeDept === idx;
            const Icon = DEPT_ICONS[idx] || Briefcase;
            return (
              <div 
                key={dept.id}
                ref={el => deptRowsRef.current[idx] = el}
                onMouseEnter={() => setActiveDept(idx)}
                onClick={() => setActiveDept(isSelected ? null : idx)}
                className={'card-pop group py-8 sm:py-10 cursor-pointer rounded-2xl px-4 ' +
                  (isSelected 
                    ? 'bg-white shadow-md border-l-4 border-l-[#C86B4A] pl-6' 
                    : 'hover:bg-white/50 hover:pl-6 opacity-75 hover:opacity-100')}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className={'font-mono text-sm font-bold shrink-0 transition-colors ' + 
                      (isSelected ? 'text-[#C86B4A]' : 'text-[#172B3A]/50 group-hover:text-[#C86B4A]')}>
                      0{idx + 1} / TRACK
                    </span>
                    <div className="flex items-center gap-3.5">
                      <div className={'w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ' +
                        (isSelected ? 'bg-[#C86B4A] border-[#C86B4A] text-white shadow-xs' : 'border-[#172B3A]/20 text-[#172B3A] group-hover:border-[#C86B4A] group-hover:text-[#C86B4A]')}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#172B3A] group-hover:text-[#C86B4A] transition-colors">
                        {dept.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 pl-16 sm:pl-24 lg:pl-0">
                    <p className="text-sm text-[#202321]/70 font-light max-w-sm hidden md:block">{dept.description}</p>
                    <div className={'w-9 h-9 rounded-full border border-[#172B3A]/20 flex items-center justify-center transition-all duration-300 shrink-0 ' +
                      (isSelected ? 'bg-[#172B3A] text-white border-[#172B3A] rotate-45' : 'text-[#172B3A] group-hover:bg-[#C86B4A] group-hover:border-[#C86B4A] group-hover:text-white')}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover-Revealed Drawer Details */}
                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-[#172B3A]/10 pl-6 sm:pl-24 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-fade-in">
                    <div className="space-y-2 max-w-xl">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                        Role Overview & Mission
                      </span>
                      <p className="text-sm text-[#202321]/85 font-light leading-relaxed">
                        {dept.description}
                      </p>
                    </div>

                    <Link 
                      to={'/contact?track=career-' + dept.id} 
                      data-cursor="APPLY"
                      className="px-6 py-2.5 rounded-full bg-[#172B3A] text-white text-xs font-mono font-bold hover:bg-[#C86B4A] transition-all inline-flex items-center gap-2 shadow-md shrink-0 hover:scale-105 duration-200"
                    >
                      <span>Apply for {dept.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C86B4A]" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Why Work With Us — CARD GRID ───────────────────────────────── */}
      <section className="py-20 border-b border-[#E5D8C5] bg-[#F7F4ED]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-14">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">
                Our Workplace Ethos
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#172B3A] leading-tight">
                Built for People.<br />
                <span className="italic font-normal text-[#C86B4A]">Designed for Life.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#202321]/80 font-light leading-relaxed max-w-sm">
                We believe exceptional customer experiences begin with an empowered, respected, and thriving team.
              </p>
            </div>

            {/* 2×2 luxury value cards with hover reveal */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: 'Rapid Regional Growth',  desc: 'Join as an early leader as we expand across North India highways and townships.',            icon: TrendingUp },
                { title: 'Respect & Recognition',  desc: 'Transparent merit, inclusive culture, and frontline empowerment in everything we do.',        icon: Heart },
                { title: 'Hands-on Learning',       desc: 'Real retail operations, customer psychology, food craft, and business leadership.',            icon: BookOpen },
                { title: 'Long-term Stability',     desc: 'Sustainable business practices and robust regional institutional backing behind every role.',  icon: Globe },
              ].map((item, idx) => {
                const Icon = VALUE_ICONS[idx];
                return (
                  <div key={idx}
                    ref={el => cardsRef.current[idx] = el}
                    className="card-pop p-7 rounded-[24px] bg-white border border-[#E5D8C5] shadow-xs cursor-default group flex flex-col justify-between space-y-4">
                    
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#172B3A]/5 border border-[#172B3A]/10 flex items-center justify-center
                        group-hover:bg-[#C86B4A] group-hover:border-[#C86B4A] transition-all duration-300 shadow-xs">
                        <Icon className="w-5 h-5 text-[#172B3A] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[10px] font-mono text-[#C86B4A] font-bold tracking-widest uppercase">
                        VALUE 0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-xl font-bold text-[#172B3A] leading-snug group-hover:text-[#C86B4A] transition-colors">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-[#202321]/70 font-light leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Expanding bottom accent line */}
                    <div className="pt-2">
                      <div className="w-8 h-0.5 bg-[#C86B4A] group-hover:w-full transition-all duration-500 rounded-full" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#172B3A] text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86B4A] font-bold block">Direct Talent Connect</span>
          <h3 className="font-serif text-3xl sm:text-5xl font-bold">Don't See Your Exact Role?</h3>
          <p className="text-sm sm:text-base text-[#E5D8C5] max-w-xl mx-auto font-light leading-relaxed">
            We are always eager to meet passionate individuals across food craft, store management, and technology. Send your portfolio or resume directly to our talent team.
          </p>
          <div className="pt-3 flex justify-center">
            <Link to="/contact?track=general-career" data-cursor="RESUME"
              className="px-8 py-3.5 rounded-full bg-[#C86B4A] text-[#172B3A] font-bold text-xs sm:text-sm tracking-wider hover:bg-[#b55c3c] hover:text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105 duration-200">
              <Mail className="w-4 h-4" />
              <span>Send Your Resume</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
