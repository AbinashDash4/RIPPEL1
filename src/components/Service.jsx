import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Megaphone,
  BarChart3,
  Users,
  Star,
  Rocket,
  Palette,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Service() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const headingRef = useRef(null);

  const cardsData = [
    {
      title: "Social Media Marketing",
      tag: "Growth",
      color: "#00D4FF",
      description:
        "Data-driven social strategies designed to increase reach, engagement, and conversions.",
      icon: <Megaphone size={42} />,
    },
    {
      title: "Social Media Management",
      tag: "Management",
      color: "#2563EB",
      description:
        "Complete management of your social channels including planning, posting, and engagement.",
      icon: <BarChart3 size={42} />,
    },
    {
      title: "Influencer Marketing",
      tag: "Creator Economy",
      color: "#8B5CF6",
      description:
        "Connect your brand with the right creators for authentic and result-driven campaigns.",
      icon: <Users size={42} />,
    },
    {
      title: "Talent Management",
      tag: "Creator Growth",
      color: "#EC4899",
      description:
        "Helping creators secure partnerships, negotiate deals, and grow their personal brand.",
      icon: <Star size={42} />,
    },
    {
      title: "Digital Campaigns",
      tag: "Performance",
      color: "#22C55E",
      description:
        "Launch high-performing digital campaigns across social and performance platforms.",
      icon: <Rocket size={42} />,
    },
    {
      title: "Creative Design",
      tag: "Branding",
      color: "#FACC15",
      description:
        "Premium social creatives, motion graphics, brand visuals, and campaign design.",
      icon: <Palette size={42} />,
    },
  ];

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [bgAccent, setBgAccent] = useState(cardsData[0].color);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const heading = headingRef.current;

    if (!container || !pinned) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".desktop-service-card");

      gsap.fromTo(
        heading,
        { scale: 1.15, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
        }
      );

      gsap.to(".service-bg-title", {
        xPercent: -6,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (window.innerWidth >= 768) {
        const progressObj = { value: 0 };

        const updateCards = (progress) => {
          const activeIndex = progress * (cardsData.length - 1);
          const roundedIndex = Math.min(
            Math.round(activeIndex),
            cardsData.length - 1
          );

          setActiveCardIndex(roundedIndex);
          setBgAccent(cardsData[roundedIndex].color);

          cards.forEach((card, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isActive = index === roundedIndex;

            const x = offset * 350;
            const y = Math.sin(offset) * 85 + absOffset * 25;
            const z = -absOffset * 170;
            const rotateY = offset * -20;
            const rotateZ = offset * 5;
            const scale = isActive ? 1.08 : Math.max(0.7, 1 - absOffset * 0.13);
            const opacity = Math.max(0.15, 1 - absOffset * 0.3);
            const blur = absOffset * 1.3;

            gsap.set(card, {
              x,
              y,
              z,
              rotateY,
              rotateZ,
              scale,
              opacity,
              filter: `blur(${blur}px)`,
              zIndex: 100 - Math.round(absOffset * 10),
              boxShadow: isActive
                ? `0 0 90px ${cardsData[roundedIndex].color}45`
                : "0 25px 55px rgba(0,0,0,0.25)",
              transformOrigin: "center center",
            });
          });
        };

        updateCards(0);

        gsap.to(progressObj, {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=2700",
            scrub: 1.15,
            pin: pinned,
            anticipatePin: 1,
          },
          onUpdate: () => updateCards(progressObj.value),
        });

        cards.forEach((card, index) => {
          gsap.to(card, {
            y: "+=14",
            duration: 2.4 + index * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleMobileScroll = (e) => {
    if (window.innerWidth >= 768) return;

    const element = e.target;
    const cardWidth = element.offsetWidth * 0.82;
    const index = Math.min(
      Math.max(Math.round(element.scrollLeft / cardWidth), 0),
      cardsData.length - 1
    );

    setActiveCardIndex(index);
    setBgAccent(cardsData[index].color);
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full min-h-[160vh] md:min-h-[350vh] bg-[#081120] text-white z-10 select-none overflow-hidden border-t border-white/10"
    >
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${bgAccent}38 0%, transparent 58%)`,
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[520px] h-[520px] bg-cyan-500/10 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[460px] h-[460px] bg-blue-500/10 blur-[130px] rounded-full animate-pulse" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:28px_28px] opacity-20" />

      <div
        ref={pinnedRef}
        className="absolute top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center"
      >
        <div
          ref={headingRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <h2 className="service-bg-title text-[18vw] font-black uppercase tracking-tighter leading-none bg-gradient-to-r from-cyan-400/10 via-white/5 to-cyan-400/10 bg-clip-text text-transparent">
            SERVICES
          </h2>
        </div>

        <div className="absolute top-14 text-center z-20 hidden md:block">
          <p className="text-cyan-300 text-xs uppercase tracking-[0.4em] font-mono">
            What We Do
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase mt-3">
            Growth Services
          </h2>
          <p className="text-white/45 text-sm mt-3 max-w-xl mx-auto">
            Premium digital growth solutions for brands, creators, and campaigns.
          </p>
        </div>

        <div
          className="relative w-full h-[580px] hidden md:flex items-center justify-center z-10"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`desktop-service-card absolute w-[420px] h-[540px] rounded-[34px] bg-white/[0.07] border backdrop-blur-2xl p-10 flex flex-col justify-between overflow-hidden group pointer-events-auto transition-colors duration-500 ${activeCardIndex === index
                ? "border-cyan-300/70"
                : "border-white/10"
                }`}
            >
              <div
                className="absolute -top-28 -right-28 w-64 h-64 rounded-full blur-3xl opacity-30 group-hover:opacity-55 transition-all duration-700"
                style={{ backgroundColor: card.color }}
              />

              <div
                className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 transition-all duration-700"
                style={{ backgroundColor: card.color }}
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, ${card.color}1f, transparent 62%)`,
                }}
              />

              <div className="relative z-10 flex justify-between items-start">
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold px-4 py-2 rounded-full border bg-black/30"
                  style={{
                    borderColor: `${card.color}60`,
                    color: card.color,
                  }}
                >
                  {card.tag}
                </span>

                <div
                  className="p-4 rounded-2xl bg-black/30 border border-white/10 transition-all duration-700 group-hover:rotate-6 group-hover:scale-110"
                  style={{ color: card.color }}
                >
                  {card.icon}
                </div>
              </div>

              <div className="relative z-10">
                <span
                  className="text-[11px] font-mono uppercase tracking-[0.35em]"
                  style={{ color: card.color }}
                >
                  0{index + 1}
                </span>

                <h3 className="text-3xl font-black uppercase tracking-tight text-white mt-3 mb-4 group-hover:text-cyan-300 transition-colors duration-500">
                  {card.title}
                </h3>

                <p className="text-sm text-white/55 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/40 font-bold uppercase">
                  Ripple Creative
                </span>

                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 group-hover:text-[#081120] transition-all duration-300"
                  style={{
                    backgroundColor:
                      activeCardIndex === index ? card.color : "rgba(255,255,255,0.1)",
                  }}
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 hidden md:flex gap-3 z-30">
          {cardsData.map((_, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 rounded-full ${activeCardIndex === idx
                ? "w-12 h-2 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                : "w-2 h-2 bg-white/20"
                }`}
            />
          ))}
        </div>

        <div className="w-full flex flex-col items-center justify-center z-20 md:hidden px-6">
          <div className="text-center mb-7">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-300">
              What We Offer
            </span>
            <h2 className="text-4xl font-black uppercase mt-3">Services</h2>
          </div>

          <div
            onScroll={handleMobileScroll}
            className="w-full overflow-x-auto flex gap-6 snap-x snap-mandatory no-scrollbar pb-8"
          >
            {cardsData.map((card, index) => (
              <div
                key={index}
                className={`snap-center flex-shrink-0 w-[82vw] h-[460px] rounded-[30px] bg-white/[0.08] border p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 ${activeCardIndex === index
                  ? "scale-100 opacity-100 border-cyan-300/50"
                  : "scale-90 opacity-50 border-white/10"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border bg-black/30"
                    style={{ borderColor: `${card.color}50`, color: card.color }}
                  >
                    {card.tag}
                  </span>

                  <div style={{ color: card.color }}>{card.icon}</div>
                </div>

                <div>
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.35em]"
                    style={{ color: card.color }}
                  >
                    0{index + 1}
                  </span>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-3 mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs text-white/55 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-[9px] font-mono text-white/40 font-bold uppercase">
                    Swipe Service
                  </span>
                  <span className="text-xs" style={{ color: card.color }}>
                    {index + 1}/6
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {cardsData.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeCardIndex === idx
                  ? "w-7 bg-cyan-400"
                  : "w-1.5 bg-white/20"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}