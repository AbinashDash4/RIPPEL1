import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const wordsRef = useRef(null);
  const cardRef = useRef(null);

  const rollingWords = [
    "Marketing",
    "Influencers",
    "Talent Management",
    "Digital Campaigns",
    "Creative Design",
    "Brand Growth",
    "Marketing",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordsRef.current) {
        const tl = gsap.timeline({ repeat: -1 });

        for (let i = 0; i < rollingWords.length - 1; i++) {
          tl.to(wordsRef.current, {
            yPercent: -100 * (i + 1),
            duration: 0.75,
            ease: "power3.inOut",
            delay: 1.6,
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
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".hero-card", {
        scale: 0.85,
        opacity: 0,
        rotateY: -18,
        duration: 1.2,
        ease: "back.out(1.6)",
        delay: 0.3,
      });

      gsap.to(".hero-card", {
        y: 18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-ring", {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbit-ring-reverse", {
        rotate: -360,
        duration: 38,
        repeat: -1,
        ease: "none",
      });

      gsap.to(textRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      gsap.to(imageRef.current, {
        y: 90,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const x = (e.clientX - window.innerWidth / 2) * 0.005;
      const y = (e.clientY - window.innerHeight / 2) * 0.005;

      gsap.to(cardRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCtaClick = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white text-zinc-950 px-6 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-[-20%] right-[-10%] w-[560px] h-[560px] bg-cyan-400/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[560px] h-[560px] bg-blue-500/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div ref={textRef} className="flex flex-col justify-center text-left">
          <span className="hero-fade text-xs uppercase font-mono tracking-[0.25em] text-zinc-500 font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-cyan-400" />
            Marketing Agency | Influencer Marketing | Talent Management
          </span>

          <h1 className="text-6xl md:text-8xl lg:text-[5.7vw] font-black uppercase tracking-tighter leading-[0.9] text-zinc-900 overflow-hidden">
            <span className="hero-title-line block">Ripple</span>
            <span className="hero-title-line block text-cyan-500">
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
                className="flex flex-col text-[34px] md:text-[58px] lg:text-[62px] font-black uppercase tracking-tight text-cyan-500 leading-none"
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
              className="px-6 py-3 bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-cyan-500 hover:text-zinc-950 transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,212,255,0.45)]"
            >
              Book Free Consultation
            </button>

            <button
              onClick={() => handleCtaClick("case-studies")}
              className="px-6 py-3 bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold text-xs uppercase tracking-wider rounded-full hover:border-cyan-400 hover:bg-white transition-all duration-300"
            >
              View Case Studies
            </button>
          </div>
        </div>

        <div
          ref={imageRef}
          className="flex justify-center lg:justify-end items-center relative w-full h-[390px] md:h-[520px] lg:h-[590px]"
        >
          <div className="absolute w-[540px] h-[540px] rounded-full bg-cyan-400/25 blur-[130px]" />

          <div
            ref={cardRef}
            className="hero-card relative w-full max-w-[450px] aspect-[4/5] rounded-[42px] overflow-hidden border border-cyan-400/30 bg-[#020617] shadow-[0_40px_110px_rgba(0,0,0,0.38)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.32),transparent_55%)]" />
            <div className="absolute inset-4 rounded-[34px] border border-cyan-300/20 bg-white/[0.04] backdrop-blur-xl" />

            <div className="absolute top-7 left-7 flex gap-2 z-20">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-ring absolute w-[360px] h-[360px] rounded-full border border-dashed border-cyan-400/25" />
              <div className="orbit-ring-reverse absolute w-[285px] h-[285px] rounded-full border border-cyan-400/25" />
              <div className="absolute w-[220px] h-[220px] rounded-full bg-cyan-400/10 blur-xl" />

              <div className="relative z-10 w-[185px] h-[185px] rounded-full bg-white flex items-center justify-center shadow-[0_0_95px_rgba(0,212,255,0.7)]">
                <img
                  src="/ripple_logo.png"
                  alt="Ripple Creative Logo"
                  className="w-[145px] object-contain"
                />
              </div>
            </div>

            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[240px] h-[4px] rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[70%] bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,212,255,1)]" />
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(0,212,255,1)]"
                />
              ))}
            </div>

            <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[0.3em] text-cyan-300/80 font-bold">
              RIPPLE // CREATIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}