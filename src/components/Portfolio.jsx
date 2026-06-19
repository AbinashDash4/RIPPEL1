import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Star, CheckCircle } from "lucide-react";

export default function Portfolio() {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const borderBoxRef = useRef(null);

  const feedbacks = [
    {
      client: "Fashion Brand",
      role: "Influencer Campaign",
      message: "Ripple Creative increased our campaign reach by 320% in 30 days.",
      rating: 5,
    },
    {
      client: "Startup Founder",
      role: "Social Media Growth",
      message: "Our engagement improved and the brand started looking premium.",
      rating: 5,
    },
    {
      client: "Creator Partner",
      role: "Talent Management",
      message: "They helped me get better brand collaborations and partnerships.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const reveal = revealRef.current;
    const borderBox = borderBoxRef.current;

    if (!container || !reveal || !borderBox) return;

    const xToReveal = gsap.quickTo(reveal, "--x", {
      duration: 0.75,
      ease: "power4.out",
    });

    const yToReveal = gsap.quickTo(reveal, "--y", {
      duration: 0.75,
      ease: "power4.out",
    });

    const xToBox = gsap.quickTo(borderBox, "--bx", {
      duration: 0.55,
      ease: "power4.out",
    });

    const yToBox = gsap.quickTo(borderBox, "--by", {
      duration: 0.55,
      ease: "power4.out",
    });

    xToReveal("50vw");
    yToReveal("50vh");
    xToBox("50vw");
    yToBox("50vh");

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xToReveal(`${x}px`);
      yToReveal(`${y}px`);
      xToBox(`${x}px`);
      yToBox(`${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-title", {
        scale: 1.2,
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".portfolio-orb", {
        scale: 0.65,
        opacity: 0,
        rotate: -20,
        duration: 1.2,
        ease: "back.out(1.8)",
        delay: 0.25,
      });

      gsap.from(".feedback-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.to(".portfolio-ring", {
        rotate: 360,
        duration: 38,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".portfolio-ring-reverse", {
        rotate: -360,
        duration: 52,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".portfolio-pulse", {
        scale: 1.12,
        opacity: 0.7,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".portfolio-float", {
        y: 18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".scanner-line", {
        y: 260,
        duration: 2.2,
        repeat: -1,
        ease: "power2.inOut",
      });
    }, container);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  const renderLetter = (letter, index) => {
    const isStroke = letter === "O" || letter === "R";

    return (
      <span
        key={index}
        className={
          isStroke
            ? "text-transparent [-webkit-text-stroke:2px_rgba(239,68,68,0.35)]"
            : "text-white/10"
        }
      >
        {letter}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen z-0 overflow-hidden cursor-crosshair bg-black select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.18),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(127,29,29,0.45),transparent_35%,rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20" />

      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none filter blur-sm brightness-[0.42]">
        <h1 className="portfolio-title text-[17vw] font-black tracking-tighter uppercase leading-none">
          {"OUR WORK".split("").map((char, idx) => renderLetter(char, idx))}
        </h1>

        <div className="portfolio-orb w-[340px] h-[340px] rounded-full border border-red-500/20 flex items-center justify-center bg-black/70 backdrop-blur-xl mt-6 shadow-[0_0_90px_rgba(239,68,68,0.16)]">
          <div className="text-red-400/70 text-sm font-mono tracking-[0.25em] uppercase">
            Ripple Creative
          </div>
        </div>
      </div>

      <div
        ref={revealRef}
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle at center, #ef4444 0%, #7f1d1d 45%, #050505 78%)",
          clipPath: "circle(165px at var(--x, 50vw) var(--y, 50vh))",
          WebkitClipPath: "circle(165px at var(--x, 50vw) var(--y, 50vh))",
        }}
      >
        <h1 className="text-[17vw] font-black tracking-tighter text-black/75 uppercase leading-none">
          OUR WORK
        </h1>

        <div className="portfolio-float w-[340px] h-[340px] rounded-full border border-black/30 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md shadow-[0_0_100px_rgba(0,0,0,0.75)] mt-6 relative overflow-hidden">
          <div className="portfolio-pulse absolute inset-8 rounded-full bg-white/15 blur-2xl" />

          <div className="portfolio-ring absolute w-[290px] h-[290px] rounded-full border border-dashed border-black/35" />
          <div className="portfolio-ring-reverse absolute w-[220px] h-[220px] rounded-full border border-black/25" />

          <svg className="w-52 h-52 text-black relative z-10" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>

            <circle
              cx="50"
              cy="50"
              r="31"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            <circle cx="50" cy="50" r="10" fill="currentColor" />

            <text className="text-[7.5px] font-bold fill-black uppercase tracking-widest font-mono">
              <textPath href="#circlePath">
                Ripple Creative * Campaign Growth *
              </textPath>
            </text>
          </svg>

          <div className="absolute bottom-7 font-mono text-xs font-black text-black tracking-[0.22em] uppercase">
            Campaign System
          </div>
        </div>
      </div>

      {/* CUSTOMER FEEDBACK CARDS */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-5 pointer-events-auto max-w-[92vw] overflow-hidden">
        {feedbacks.map((item, index) => (
          <div
            key={index}
            className="feedback-card w-[280px] bg-black/75 border border-red-500/25 rounded-2xl p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.14)] hover:-translate-y-2 hover:border-red-400/60 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1 text-red-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" stroke="none" />
                ))}
              </div>
              <CheckCircle size={14} className="text-red-400" />
            </div>

            <p className="text-white/80 text-xs leading-relaxed italic">
              "{item.message}"
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-black">
                {item.client.charAt(0)}
              </div>

              <div>
                <p className="text-white text-xs font-bold">{item.client}</p>
                <p className="text-red-300/70 text-[10px] font-mono">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={borderBoxRef}
        className="absolute top-0 left-0 w-[310px] h-[310px] pointer-events-none drop-shadow-[0_0_30px_rgba(239,68,68,0.85)]"
        style={{
          transform:
            "translate3d(calc(var(--bx, 50vw) - 155px), calc(var(--by, 50vh) - 155px), 0)",
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 310 310">
          <rect
            x="6"
            y="6"
            width="298"
            height="298"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="14 9"
          />

          <line
            className="scanner-line"
            x1="20"
            y1="30"
            x2="290"
            y2="30"
            stroke="#ef4444"
            strokeWidth="2"
            opacity="0.6"
          />

          <path d="M 6 50 L 6 6 L 50 6" fill="none" stroke="#dc2626" strokeWidth="5" />
          <path d="M 260 6 L 304 6 L 304 50" fill="none" stroke="#dc2626" strokeWidth="5" />
          <path d="M 6 260 L 6 304 L 50 304" fill="none" stroke="#dc2626" strokeWidth="5" />
          <path d="M 260 304 L 304 304 L 304 260" fill="none" stroke="#dc2626" strokeWidth="5" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none border-[12px] border-black/40 backdrop-blur-[0.4px]" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/75 border border-red-500/25 px-7 py-3 rounded-full backdrop-blur-md shadow-[0_0_45px_rgba(239,68,68,0.2)] z-30">
        <span className="text-xs uppercase font-mono tracking-[0.28em] text-red-300">
          Case Studies • Brand Campaigns • Creator Growth
        </span>
      </div>
    </div>
  );
}