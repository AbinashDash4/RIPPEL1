import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AOS from 'aos';

// Styles
import 'lenis/dist/lenis.css';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import Service from './components/Service';
import Talent from './components/Talent';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Testimonials state shared across Navbar modal and Welcome marquee rows
  const [testimonials, setTestimonials] = useState([
    {
      name: "Acme Corporates",
      role: "Marketing Director",
      message: "The influencer strategy designed by Ripple yielded a 3x increase in our quarterly signups!"
    },
    {
      name: "Apex Gaming",
      role: "CEO & Founder",
      message: "Their talent network represents the absolute best in the creator economy. Unmatched conversions."
    },
    {
      name: "Pulse Fashion",
      role: "Design Lead",
      message: "Gorgeous visual campaigns, creative direction, and seamless talent collaborations. Fully recommended."
    },
    {
      name: "Nova SaaS Systems",
      role: "VP of Growth",
      message: "Ripple Creative transformed our social channels from static posts to highly engaging growth platforms."
    }
  ]);

  const handleAddTestimonial = (newTestimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initialize AOS animations
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });

    // Clean up
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* Noise texture overlay across the site */}
      <div className="noise-overlay" />

      {/* FIXED PREMIUM NAVBAR */}
      <Navbar onAddTestimonial={handleAddTestimonial} />

      {/* FULLSCREEN FIXED BACKGROUND PORTFOLIO / CASE STUDIES WATERMARK SCANNER */}
      <Portfolio />

      {/* CONTENT: Scrolls over fixed background portfolio with overlap effects */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* HERO SECTION */}
        <div className="pointer-events-auto">
          <Hero />
        </div>

        {/* SERVICES SECTION */}
        <div className="pointer-events-auto">
          <Service />
        </div>

        {/* CASE STUDIES SECTION */}
        <div className="pointer-events-auto">
          <Projects />
        </div>

        {/* TALENT NETWORK SECTION */}
        <div className="pointer-events-auto">
          <Talent />
        </div>

        {/* ABOUT / WELCOME SECTION */}
        <div className="pointer-events-auto">
          <Welcome testimonials={testimonials} />
        </div>

        {/* CONTACT SECTION */}
        <div className="pointer-events-auto">
          <Contact />
        </div>

        {/* FOOTER SECTION */}
        <div className="pointer-events-auto">
          <Footer />
        </div>

      </div>

    </div>
  );
}
