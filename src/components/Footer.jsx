import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = ['Home', 'Services', 'Case Studies', 'Talent Network', 'About', 'Contact'];

  const servicesLinks = [
    'Social Media Marketing',
    'Social Media Management',
    'Influencer Marketing',
    'Talent Management',
    'Digital Campaigns',
    'Creative Design'
  ];

  const marqueeText = "RIPPLE CREATIVE · SCALE BRANDS · CREATOR ECONOMY · INFLUENCER OUTREACH · PERFORMANCE DRIVEN · ";

  const handleLinkClick = (sectionId) => {
    // Lowercase matches IDs exactly
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-luxury-yellow text-zinc-950 overflow-hidden font-sans z-30 py-16 md:py-24 border-t-2 border-yellow-300">
      
      {/* 4 LAYERED SCROLLING TEXT MARQUEE BACKGROUND */}
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 opacity-[0.08] select-none pointer-events-none z-0 py-8">
        {/* Layer 1: Left */}
        <div className="flex whitespace-nowrap animate-marquee-left text-[7vw] font-black tracking-tighter leading-none uppercase">
          {marqueeText + marqueeText}
        </div>
        {/* Layer 2: Right */}
        <div className="flex whitespace-nowrap animate-marquee-right text-[7vw] font-black tracking-tighter leading-none uppercase">
          {marqueeText + marqueeText}
        </div>
        {/* Layer 3: Left */}
        <div className="flex whitespace-nowrap animate-marquee-left text-[7vw] font-black tracking-tighter leading-none uppercase">
          {marqueeText + marqueeText}
        </div>
        {/* Layer 4: Right */}
        <div className="flex whitespace-nowrap animate-marquee-right text-[7vw] font-black tracking-tighter leading-none uppercase">
          {marqueeText + marqueeText}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center relative z-10 text-center">
        
        {/* PROFILE SHOWCASE */}
        <div className="flex flex-col items-center justify-center group mb-8">
          
          {/* Floating Profile Image Frame representing the Agency */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-zinc-950 bg-zinc-950 shadow-2xl relative flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-105 select-none hover:shadow-zinc-950/60 animate-pulse">
            
            {/* Custom Vector Icon for Agency Roster */}
            <svg className="w-16 h-16 text-luxury-yellow" viewBox="0 0 100 100">
              <circle cx="35" cy="45" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M 10, 85 C 10, 70 20, 65 35, 65 C 42, 65 48, 68 52, 72" fill="none" stroke="currentColor" strokeWidth="4" />
              <circle cx="65" cy="38" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M 45, 85 C 45, 72 54, 58 65, 58 C 76, 58 85, 70 85, 85" fill="none" stroke="currentColor" strokeWidth="4" />
            </svg>

            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent pointer-events-none" />
          </div>

          <span className="text-xs uppercase font-mono tracking-widest font-black text-zinc-900 mt-4">
            RIPPLE CREATIVE NETWORK
          </span>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-6">
            
            {/* Follow blue neon button */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all duration-300 transform hover:scale-105"
            >
              Follow
            </a>

            {/* Message white button */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-6 py-2.5 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-full border border-zinc-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Message
            </button>

          </div>

        </div>

        {/* LUXURY BRANDING LOGO */}
        <div className="flex flex-col items-center mt-6">
          <div 
            onClick={scrollToTop}
            className="cursor-pointer hover:scale-105 duration-300 select-none py-2"
          >
            {/* Logo Image */}
            <img 
              src="/ripple_logo.png" 
              alt="Ripple Creative Brand" 
              className="h-10 md:h-12 w-auto object-contain mx-auto filter brightness-95" 
            />
          </div>
          <p className="text-xs uppercase font-mono tracking-widest text-zinc-700 font-bold mt-2">
            Creating Ripples That Drive Growth
          </p>
        </div>

        {/* SERVICES LINK DIRECTORY */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-10 w-full max-w-2xl border-t border-zinc-950/10 pt-8">
          {servicesLinks.map((srv) => (
            <button
              key={srv}
              onClick={() => handleLinkClick('services')}
              className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-800 hover:text-white transition-colors duration-300"
            >
              {srv}
            </button>
          ))}
        </div>

        {/* RESPONSIVE NAVIGATION LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-6 w-full max-w-lg border-t border-zinc-950/10 pt-6">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleLinkClick(link)}
              className="text-xs uppercase font-mono tracking-widest font-black text-zinc-900 hover:text-white transition-colors duration-300"
            >
              {link}
            </button>
          ))}
        </div>

        {/* ROUNDED TRANSPARENT DIVIDER */}
        <div className="w-full max-w-3xl h-[1.5px] bg-zinc-950/10 rounded-full my-8" />

        {/* COPYRIGHTS & LEGAL */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-widest">
          
          <div>
            © 2026 Ripple Creative. All Rights Reserved.
          </div>

          <div className="flex gap-6">
            <a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-black uppercase text-zinc-900 border-l border-zinc-950/20 pl-6"
            >
              Back to top
              <ArrowUp size={12} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
