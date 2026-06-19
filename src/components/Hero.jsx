import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const waterRef = useRef(null);
  const wordsRef = useRef(null);
  const ringsGroupRef = useRef(null);
  const dropRef = useRef(null);

  const rollingWords = [
    "Marketing",
    "Influencers",
    "Talent Management",
    "Digital Campaigns",
    "Creative Design",
    "Brand Growth",
    "Marketing",
  ];

  // Spawn a single expanding ripple ring at (x, y) within the water surface
  const spawnRipple = (x, y, opts = {}) => {
    const group = ringsGroupRef.current;
    if (!group) return;

    const {
      maxRadius = 230,
      duration = 2.6,
      strokeWidth = 1.6,
      opacity = 0.55,
    } = opts;

    const ns = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "0");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "var(--ripple-line)");
    circle.setAttribute("stroke-width", strokeWidth);
    circle.setAttribute("opacity", opacity);
    group.appendChild(circle);

    gsap.fromTo(
      circle,
      { attr: { r: 0 }, opacity },
      {
        attr: { r: maxRadius },
        opacity: 0,
        duration,
        ease: "power2.out",
        onComplete: () => circle.remove(),
      }
    );

    // subtle stroke thinning as the ring expands, like real water
    gsap.to(circle, {
      attr: { "stroke-width": 0.2 },
      duration,
      ease: "power1.out",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rolling word mechanic — settles like water finding level, not a slot reel
      if (wordsRef.current) {
        const tl = gsap.timeline({ repeat: -1 });
        for (let i = 0; i < rollingWords.length - 1; i++) {
          tl.to(wordsRef.current, {
            yPercent: -100 * (i + 1),
            duration: 0.9,
            ease: "power2.inOut",
            delay: 1.7,
          });
        }
        tl.set(wordsRef.current, { yPercent: 0 });
      }

      gsap.from(".hero-title-line", {
        y: 120,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".hero-fade", {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      // Water surface fades/scales in
      gsap.from(waterRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.2,
      });

      // Gentle ambient bob, like a surface, not a card floating in space
      gsap.to(waterRef.current, {
        y: 10,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll parallax
      gsap.to(textRef.current, {
        y: -70,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      gsap.to(waterRef.current, {
        y: 70,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    // The opening drop — the literal "Ripple" moment, fired once on load
    const dropTimer = setTimeout(() => {
      if (dropRef.current) {
        gsap.fromTo(
          dropRef.current,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }
      spawnRipple(230, 230, { maxRadius: 80, duration: 1.6, strokeWidth: 2.4, opacity: 0.8 });
      spawnRipple(230, 230, { maxRadius: 150, duration: 2.2, strokeWidth: 1.8, opacity: 0.6 });
      spawnRipple(230, 230, { maxRadius: 220, duration: 2.8, strokeWidth: 1.2, opacity: 0.4 });
    }, 900);

    // Idle ambient ripple, slow and infrequent — water never sits perfectly still
    const ambientInterval = setInterval(() => {
      const x = 90 + Math.random() * 280;
      const y = 90 + Math.random() * 280;
      spawnRipple(x, y, { maxRadius: 70, duration: 3, strokeWidth: 1, opacity: 0.25 });
    }, 3400);

    return () => {
      ctx.revert();
      clearTimeout(dropTimer);
      clearInterval(ambientInterval);
    };
  }, []);

  const handleCtaClick = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaterClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 460;
    const y = ((e.clientY - rect.top) / rect.height) * 460;
    spawnRipple(x, y, { maxRadius: 60, duration: 1.4, strokeWidth: 2, opacity: 0.7 });
    spawnRipple(x, y, { maxRadius: 130, duration: 2, strokeWidth: 1.3, opacity: 0.45 });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 md:py-32 overflow-hidden"
      style={{
        "--ripple-ink": "#0B1A1F",
        "--ripple-deep": "#0891B2",
        "--ripple-bright": "#22D3EE",
        "--ripple-line": "#0E7490",
        "--ripple-paper": "#FAFAF9",
        backgroundColor: "var(--ripple-paper)",
        color: "var(--ripple-ink)",
      }}
    >
      {/* Faint horizon wash, not a glow blob — sits low like light off water */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(8,145,178,0.10), rgba(8,145,178,0))",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div ref={textRef} className="flex flex-col justify-center text-left">
          <span className="hero-fade text-xs uppercase font-mono tracking-[0.25em] text-zinc-500 font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px]" style={{ backgroundColor: "var(--ripple-deep)" }} />
            Marketing Agency &middot; Influencer Marketing &middot; Talent Management
          </span>

          <h1 className="text-6xl md:text-8xl lg:text-[5.7vw] font-black uppercase tracking-tighter leading-[0.9] overflow-hidden">
            <span className="hero-title-line block">Ripple</span>
            <span
              className="hero-title-line block"
              style={{ color: "var(--ripple-deep)" }}
            >
              Creative
            </span>
          </h1>

          <div className="hero-fade mt-8 pb-6 border-b border-zinc-200 max-w-[720px]">
            <p className="text-xl md:text-3xl font-semibold text-zinc-500 mb-4">
              Creating Digital Ripples Through
            </p>

            <div className="relative h-[54px] md:h-[72px] overflow-hidden w-full">
              <div
                ref={wordsRef}
                className="flex flex-col text-[34px] md:text-[58px] lg:text-[62px] font-black uppercase tracking-tight leading-none"
                style={{ color: "var(--ripple-deep)" }}
              >
                {rollingWords.map((word, idx) => (
                  <div
                    key={idx}
                    className="h-[54px] md:h-[72px] flex items-center whitespace-nowrap"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="hero-fade text-sm md:text-base text-zinc-600 max-w-xl mt-6 leading-relaxed">
            We help brands grow through strategic social media marketing,
            influencer collaborations, talent management, creative content, and
            performance-driven digital campaigns.
          </p>

          <div className="hero-fade flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => handleCtaClick("contact")}
              className="px-6 py-3 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300"
              style={{ backgroundColor: "var(--ripple-ink)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--ripple-deep)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--ripple-ink)")}
            >
              Book Free Consultation
            </button>

            <button
              onClick={() => handleCtaClick("case-studies")}
              className="px-6 py-3 bg-transparent font-bold text-xs uppercase tracking-wider rounded-full border transition-all duration-300"
              style={{ borderColor: "#D4D4D8", color: "var(--ripple-ink)" }}
            >
              View Case Studies
            </button>
          </div>
        </div>

        {/* The signature element: an actual ripple-on-water surface */}
        <div className="flex justify-center lg:justify-end items-center relative w-full h-[390px] md:h-[460px] lg:h-[480px]">
          <div
            ref={waterRef}
            onClick={handleWaterClick}
            className="relative w-full max-w-[460px] aspect-square cursor-pointer select-none"
            title="Drop a ripple"
          >
            <svg
              viewBox="0 0 460 460"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                <radialGradient id="waterSurface" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="#CFFAFE" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#A5F3FC" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#A5F3FC" stopOpacity="0" />
                </radialGradient>
                <clipPath id="waterClip">
                  <circle cx="230" cy="230" r="220" />
                </clipPath>
              </defs>

              {/* still water base */}
              <circle cx="230" cy="230" r="220" fill="url(#waterSurface)" />
              <circle
                cx="230"
                cy="230"
                r="219.5"
                fill="none"
                stroke="#0E7490"
                strokeOpacity="0.15"
                strokeWidth="1"
              />

              {/* static depth rings, fixed reference rings for the "still" state */}
              <g clipPath="url(#waterClip)" opacity="0.35">
                <circle cx="230" cy="230" r="60" fill="none" stroke="#0E7490" strokeWidth="1" />
                <circle cx="230" cy="230" r="120" fill="none" stroke="#0E7490" strokeWidth="0.75" />
                <circle cx="230" cy="230" r="180" fill="none" stroke="#0E7490" strokeWidth="0.5" />
              </g>

              {/* animated ripple rings get appended here at runtime */}
              <g ref={ringsGroupRef} clipPath="url(#waterClip)" />

              {/* the drop / wordmark, centered */}
              <g ref={dropRef} style={{ transformOrigin: "230px 230px" }}>
                <circle cx="230" cy="230" r="7" fill="var(--ripple-ink)" />
              </g>

              <foreignObject x="115" y="195" width="230" height="70">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src="/ripple_logo.png"
                    alt="Ripple Creative Logo"
                    className="max-w-[120px] max-h-[60px] object-contain"
                  />
                </div>
              </foreignObject>
            </svg>

            <div
              className="absolute bottom-2 right-2 text-[10px] font-mono tracking-[0.3em] font-bold pointer-events-none"
              style={{ color: "#0E7490", opacity: 0.6 }}
            >
              TAP THE WATER
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
