import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome({ testimonials = [] }) {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const zoomBoxRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const welcomeSubtitleRef = useRef(null);
  const welcomeDescRef = useRef(null);
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);

  // Default fallback avatar letters
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    const pinnedElement = pinnedRef.current;
    const container = containerRef.current;
    if (!pinnedElement || !container) return;

    // GSAP ScrollTrigger timeline for 200vh interaction
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinnedElement,
          pinSpacing: false,
        }
      });

      // Screen 1: Morph center box and reveal massive WELCOME typography
      tl.to(zoomBoxRef.current, {
        scale: window.innerWidth < 768 ? 2.8 : 3.8,
        y: '10vh',
        opacity: 0.85,
        duration: 1,
        ease: 'none'
      }, 0);

      tl.to(welcomeTextRef.current, {
        opacity: 0.35,
        scale: 1.1,
        duration: 1,
        ease: 'none'
      }, 0);

      tl.to(welcomeSubtitleRef.current, {
        opacity: 1,
        y: -15,
        duration: 0.8,
        ease: 'none'
      }, 0.2);

      tl.to(welcomeDescRef.current, {
        opacity: 1,
        y: -15,
        duration: 0.8,
        ease: 'none'
      }, 0.3);

      // Transition Screen 1 out, Screen 2 (Testimonials) in
      tl.to(screen1Ref.current, {
        opacity: 0,
        y: -100,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 1);

      tl.to(screen2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 1);

    }, container);

    return () => ctx.revert();
  }, []);

  // Split testimonials for the two rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1 = [...testimonials.slice(0, midPoint), ...testimonials.slice(0, midPoint)];
  const row2 = [...testimonials.slice(midPoint), ...testimonials.slice(midPoint)];

  // Make sure row2 has cards if testimonials list is odd/small
  if (row2.length === 0 && row1.length > 0) {
    row2.push(...row1);
  }

  const renderCard = (card, index) => {
    return (
      <div
        key={`${card.name}-${index}`}
        className="flex-shrink-0 w-[320px] md:w-[380px] bg-white/40 backdrop-blur-md border border-zinc-200/50 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 pointer-events-auto"
      >
        <div className="flex items-center gap-1 text-primary-yellow mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} fill="currentColor" stroke="none" />
          ))}
        </div>
        <p className="text-zinc-700 text-sm font-sans mb-4 italic leading-relaxed whitespace-normal break-words">
          "{card.message}"
        </p>
        <div className="flex items-center gap-3 border-t border-zinc-200/40 pt-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-yellow to-orange-500 flex items-center justify-center text-zinc-950 text-xs font-black font-outfit shadow-sm">
            {getInitials(card.name)}
          </div>
          <div className="text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-zinc-900 font-outfit">
                {card.name}
              </span>
              <CheckCircle size={12} className="text-blue-500 fill-blue-500/10" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">
              {card.role} · @{card.name.toLowerCase().replace(/\s+/g, '')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full h-[200vh] bg-gradient-to-b from-zinc-50 to-zinc-15"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Paper texture */}
      <div className="paper-texture z-0 pointer-events-none" />

      {/* Pinned Viewport Container (100vh) */}
      <div
        ref={pinnedRef}
        className="welcome-pinned-container absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center"
      >

        {/* SCREEN 1: Massive Typography Welcome Reveal */}
        <div
          ref={screen1Ref}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 z-10"
        >
          {/* Morph zoom shape */}
          <div
            ref={zoomBoxRef}
            className="w-[180px] h-[180px] rounded-3xl border border-zinc-300 bg-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.05)] flex items-center justify-center -z-10 scale-100"
          >
            <div className="w-12 h-12 rounded-full bg-primary-yellow flex items-center justify-center animate-bounce">
              <Star size={20} className="text-zinc-950" fill="currentColor" />
            </div>
          </div>

          <h2
            ref={welcomeTextRef}
            className="text-[20vw] font-black tracking-tighter text-zinc-900/10 select-none font-outfit uppercase mt-4 leading-none pointer-events-none"
          >
            WELCOME
          </h2>

          <p
            ref={welcomeSubtitleRef}
            className="text-sm md:text-lg font-mono uppercase tracking-[0.4em] text-zinc-500 font-bold opacity-0 translate-y-10"
          >
            To Ripple Creative
          </p>

          <p
            ref={welcomeDescRef}
            className="text-sm md:text-base text-zinc-500 max-w-xl text-center leading-relaxed mt-4 opacity-0 translate-y-10 font-sans"
          >
            A full-service digital marketing agency helping brands create meaningful connections, build communities, and drive measurable growth.
          </p>
        </div>

        {/* SCREEN 2: Infinite Testimonials Marquee */}
        <div
          ref={screen2Ref}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 md:px-8 py-20 z-20 opacity-0 translate-y-24 pointer-events-none"
        >
          {/* Headings */}
          <div className="text-center mb-10 max-w-lg">
            <span className="text-xs uppercase font-mono tracking-widest text-primary-yellow bg-zinc-900 px-3 py-1.5 rounded-full font-bold">
              Client Success Stories
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-zinc-900 font-outfit uppercase tracking-tight mt-4">
              What Our Clients Say
            </h3>
          </div>

          {/* Scrolling Marquees Row 1 */}
          <div className="w-full overflow-hidden flex flex-col gap-6 select-none relative mask-gradient">

            {/* Row 1: Left moving marquee */}
            <div className="w-full flex overflow-hidden py-4 pointer-events-auto">
              <div className="flex gap-6 animate-marquee-left whitespace-nowrap">
                {row1.map((card, idx) => renderCard(card, idx))}
              </div>
            </div>

            {/* Row 2: Right moving marquee */}
            <div className="w-full flex overflow-hidden py-4 pointer-events-auto">
              <div className="flex gap-6 animate-marquee-right whitespace-nowrap">
                {row2.map((card, idx) => renderCard(card, idx))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
