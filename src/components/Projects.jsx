import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FolderOpen, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);

  const projectsData = [
    {
      title: 'Influencer Campaigns',
      tag: 'Creator Economy',
      client: 'Pulse Fashion',
      challenge: 'Break into a highly saturated Gen-Z apparel market with zero initial brand awareness.',
      strategy: 'Mobilized 25 fashion creators on TikTok for aesthetic style lookbooks and clothing hauls.',
      results: '+180% Sales Spike & 4.8M Organic Views',
      color: '#facc15'
    },
    {
      title: 'Social Media Growth',
      tag: 'Growth & Reach',
      client: 'Zenith Tech',
      challenge: 'Static channels and low engagement across LinkedIn and Instagram networks.',
      strategy: 'Deployed motion graphics tutorials, viral reels templates, and community interactions.',
      results: '300K+ New Followers & 4.2% Engagement Rate',
      color: '#3b82f6'
    },
    {
      title: 'Brand Launch Campaigns',
      tag: 'Launch Strategics',
      client: 'Elysium Hotel',
      challenge: 'Grand opening launch requiring premium outreach during tourism off-season.',
      strategy: 'Launched luxury lifestyle VIP press campaigns and local travel influencer meetups.',
      results: '100% Booking Occupancy in First Month',
      color: '#ec4899'
    },
    {
      title: 'Creator Partnerships',
      tag: 'Creator Relations',
      client: 'Apex Energy',
      challenge: 'Traditional advertisements yielding low ROI and high customer acquisition costs.',
      strategy: 'Structured long-term ambassador partnerships with gaming and lifestyle influencers.',
      results: '40% Reduction in CAC & 12M Impressions',
      color: '#8b5cf6'
    },
    {
      title: 'Product Promotions',
      tag: 'Direct Conversions',
      client: 'Vortex Audio',
      challenge: 'Promoting a premium wireless headphone line directly to target audiences.',
      strategy: 'Sent reviewers review models, launching custom discount codes and tech reviews.',
      results: '$500K Campaign Sales in First 14 Days',
      color: '#10b981'
    },
    {
      title: 'Digital Marketing Success Stories',
      tag: 'Campaign Scaler',
      client: 'Nova SaaS Systems',
      challenge: 'B2B startup struggling to qualify leads via standard paid search channels.',
      strategy: 'Engineered viral infographics, targeted social ads, and interactive case study content.',
      results: '3.5x Customer Conversion Rate Growth',
      color: '#f97316'
    }
  ];

  useEffect(() => {
    const pinnedElement = pinnedRef.current;
    const container = containerRef.current;
    if (!pinnedElement || !container) return;

    // GSAP ScrollTrigger timeline for 3D Folder Explosion
    const ctx = gsap.context(() => {
      if (window.innerWidth >= 768) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            pin: pinnedElement,
            pinSpacing: false
          }
        });

        // 1. Open the folder flap (rotateX down to -130deg)
        tl.to('.folder-cover-front', {
          rotateX: -130,
          duration: 1,
          ease: 'power2.inOut'
        });

        // 2. Rise the project cards stacked inside
        tl.to('.project-card-desktop', {
          y: (i) => -180 - (i % 2) * 45,
          z: (i) => 40 + i * 15,
          scale: 0.92,
          stagger: 0.08,
          duration: 1,
          ease: 'power2.out'
        }, '>-0.5');

        // 3. Explode / Spread cards to outer positions
        const positions = [
          { x: -380, y: -210, rotate: -7 },  // Card 0: Top-Left
          { x: 0, y: -270, rotate: -1 },      // Card 1: Top-Center
          { x: 380, y: -210, rotate: 5 },     // Card 2: Top-Right
          { x: -390, y: 140, rotate: -3 },    // Card 3: Bottom-Left
          { x: 0, y: 200, rotate: 1 },       // Card 4: Bottom-Center
          { x: 390, y: 140, rotate: 4 }      // Card 5: Bottom-Right
        ];

        positions.forEach((pos, idx) => {
          tl.to(`.project-card-desktop-${idx}`, {
            x: pos.x,
            y: pos.y,
            rotate: pos.rotate,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out'
          }, 'explode-label');
        });

        // Fold down folder base to give focus to cards
        tl.to('.folder-base-system', {
          y: 350,
          opacity: 0,
          scale: 0.7,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 'explode-label');

        // Fade in Watermark typography
        tl.to('.watermark-text', {
          opacity: 0.04,
          scale: 1.05,
          duration: 1.5,
          ease: 'power3.out'
        }, 'explode-label');
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="case studies"
      className="relative w-full min-h-[160vh] md:min-h-[220vh] bg-[#f7f6f2] text-zinc-900 z-10 font-sans border-t border-zinc-200/50"
    >
      {/* Ambient soft yellow glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-luxury-yellow/15 rounded-full glow-blur -z-10 pointer-events-none" />

      {/* Pinned Desktop Viewport (100vh) */}
      <div
        ref={pinnedRef}
        className="projects-pinned-container absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center"
      >
        
        {/* Giant Watermark Typography (Desktop Only) */}
        <div className="watermark-text absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 select-none scale-95 transition-all duration-1000 hidden md:flex">
          <h2 className="text-[22vw] font-black uppercase text-zinc-950/15 tracking-tighter leading-none font-outfit">
            OUR WORK
          </h2>
        </div>

        {/* Header (Desktop Only, absolute top) */}
        <div className="absolute top-24 left-0 right-0 text-center z-30 hidden md:block">
          <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 bg-zinc-950/5 border border-zinc-900/10 px-4 py-2 rounded-full font-bold">
            Featured Case Studies
          </span>
        </div>

        {/* 3D Folder Explosion System (Desktop Only) */}
        <div className="relative w-[400px] h-[260px] flex items-end justify-center z-20 select-none hidden md:flex" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
          
          {/* FOLDER SYSTEM CONTAINER */}
          <div className="folder-base-system absolute inset-0 w-full h-full flex items-end justify-center origin-bottom transform-style-3d">
            
            {/* Back Folder Face */}
            <div className="absolute bottom-0 w-[400px] h-[240px] bg-luxury-yellow border-t-2 border-yellow-300 rounded-[28px] shadow-lg flex items-start p-6 overflow-hidden">
              <div className="paper-texture" />
              <FolderOpen size={30} className="text-zinc-950/80 mr-3 mt-1" />
              <span className="font-mono text-xs font-bold text-zinc-950/70 tracking-widest uppercase">
                CASE STUDIES // 2026
              </span>
            </div>

            {/* Folder Front Cover Flap */}
            <div className="folder-cover-front absolute bottom-0 w-[400px] h-[240px] bg-luxury-yellow border border-yellow-300 rounded-[28px] shadow-2xl origin-bottom select-none z-30 flex flex-col justify-end p-6" style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}>
              <div className="paper-texture" />
              
              {/* Marching ants design accent */}
              <div className="w-full border-t border-dashed border-zinc-950/20 mb-3" />
              
              <div className="flex justify-between items-center text-zinc-950">
                <span className="font-outfit font-black tracking-tight text-lg">
                  RIPPLE.WEB
                </span>
                <span className="font-mono text-[9px] border border-zinc-950/25 px-2 py-0.5 rounded font-bold">
                  CONFIDENTIAL
                </span>
              </div>
            </div>

          </div>

          {/* CASE STUDY CARDS STACKED IN FOLDER (Desktop only) */}
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={`project-card-desktop project-card-desktop-${index} absolute w-[340px] h-[290px] rounded-[30px] bg-white/85 backdrop-blur-2xl border border-zinc-200 p-6 flex flex-col justify-between shadow-xl select-none z-20 origin-bottom hover:border-luxury-yellow hover:-translate-y-3 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer pointer-events-auto`}
              style={{ transform: 'translate3d(0, 20px, -20px) scale(0.9)' }}
            >
              <div className="flex flex-col justify-between h-full text-left">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                      {project.tag}
                    </span>
                    <span className="text-[10px] font-mono font-black text-blue-600">
                      {project.client}
                    </span>
                  </div>
                  <h4 className="text-base font-black font-outfit text-zinc-900 leading-tight border-b border-zinc-150 pb-1.5 mb-2.5">
                    {project.title}
                  </h4>
                  
                  <div className="flex flex-col gap-2 text-[10px] font-sans">
                    <div>
                      <strong className="font-mono text-[8px] text-zinc-400 block uppercase leading-none mb-0.5">Challenge</strong>
                      <span className="text-zinc-600 line-clamp-2 leading-tight block">{project.challenge}</span>
                    </div>
                    <div>
                      <strong className="font-mono text-[8px] text-zinc-400 block uppercase leading-none mb-0.5">Strategy</strong>
                      <span className="text-zinc-600 line-clamp-2 leading-tight block">{project.strategy}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-zinc-100 flex justify-between items-center bg-zinc-50 -mx-6 -mb-6 p-4 rounded-b-[28px]">
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 block uppercase leading-none mb-0.5">Results</span>
                    <span className="font-black text-xs text-zinc-950 font-outfit leading-none">{project.results}</span>
                  </div>
                  <span className="text-zinc-400 text-xs">→</span>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* MOBILE SECTION: Responsive swipeable snap-scroll cards */}
        <div className="w-full flex flex-col items-center px-6 py-20 z-25 md:hidden">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 bg-zinc-950/5 border border-zinc-900/10 px-3 py-1.5 rounded-full font-bold">
              Agency Portfolio
            </span>
            <h3 className="text-3xl font-black text-zinc-900 font-outfit uppercase tracking-tight mt-4">
              Featured Work
            </h3>
          </div>

          {/* Snap-scroll carousel */}
          <div className="w-full overflow-x-auto flex gap-6 snap-x snap-mandatory no-scrollbar pb-6 pointer-events-auto">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-[82vw] max-w-[320px] h-[340px] rounded-3xl bg-white border border-zinc-200 p-6 flex flex-col justify-between shadow-xl"
              >
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                        {project.tag}
                      </span>
                      <span className="text-[10px] font-mono font-black text-blue-600">
                        {project.client}
                      </span>
                    </div>
                    <h4 className="text-base font-black font-outfit text-zinc-900 leading-tight border-b border-zinc-150 pb-1.5 mb-2.5">
                      {project.title}
                    </h4>
                    
                    <div className="flex flex-col gap-2 text-[10px] font-sans">
                      <div>
                        <strong className="font-mono text-[8px] text-zinc-400 block uppercase leading-none mb-0.5">Challenge</strong>
                        <span className="text-zinc-600 line-clamp-2 leading-tight block">{project.challenge}</span>
                      </div>
                      <div>
                        <strong className="font-mono text-[8px] text-zinc-400 block uppercase leading-none mb-0.5">Strategy</strong>
                        <span className="text-zinc-600 line-clamp-2 leading-tight block">{project.strategy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-100 flex justify-between items-center bg-zinc-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-400 block uppercase leading-none mb-0.5">Results</span>
                      <span className="font-black text-xs text-zinc-950 font-outfit leading-none">{project.results}</span>
                    </div>
                    <span className="text-zinc-400 text-xs">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-400">
            Swipe left/right <ArrowRight size={14} />
          </div>
        </div>

      </div>
    </section>
  );
}
