import React from "react";

export default function Hero() {
  const brands = [
    "Samsung",
    "boAt",
    "Zomato",
    "Mamaearth",
    "Lakmé",
    "Coca-Cola",
    "Puma",
    "Swiggy",
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 py-24"
    >
      <style>
        {`
          .brand-marquee {
            width: max-content;
            animation: scrollBrands 25s linear infinite;
          }

          .brand-marquee:hover {
            animation-play-state: paused;
          }

          @keyframes scrollBrands {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-33.333%);
            }
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_42%,rgba(255,43,43,0.35),transparent_35%),linear-gradient(90deg,#050505_0%,#090909_45%,#170000_100%)]" />

      <div className="absolute right-0 top-20 w-[58%] h-[65%] hidden lg:block opacity-50">
        <div className="w-full h-full rounded-full border border-red-500/20 shadow-[0_0_120px_rgba(255,43,43,0.25)]" />
      </div>

      <div className="absolute right-[9%] top-[25%] hidden lg:flex items-center justify-center">
        <div className="w-[420px] h-[420px] rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_100px_rgba(255,43,43,0.25)]">
          <div className="text-[90px] font-black text-red-500 drop-shadow-[0_0_50px_rgba(255,43,43,0.8)]">
            INDIA
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl pt-10 lg:pt-20">
          <div className="w-16 h-1 bg-[#FF2B2B] mb-10" />

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] tracking-tight">
            <span className="block">We Are The</span>
            <span className="block">Creator First</span>
            <span className="block text-[#FF2B2B]">Agency From India</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl">
            We help brands grow through strategic social media marketing,
            influencer collaborations, talent management, creative content, and
            performance-driven digital campaigns.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <button
              onClick={() => scrollToSection("services")}
              className="px-8 py-4 rounded-md bg-gradient-to-r from-[#FF2B2B] to-[#D90429] text-white font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,43,43,0.25)]"
            >
              See What We Do
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 rounded-md border border-red-500/60 text-white font-bold uppercase tracking-wide hover:bg-[#FF2B2B] transition-all duration-300"
            >
              Contact Us
            </button>
          </div>

          <div className="mt-10 max-w-3xl rounded-2xl border border-red-500/25 bg-black/50 backdrop-blur-md px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-5 shadow-[0_0_40px_rgba(255,43,43,0.08)]">
            <div className="text-center">
              <h3 className="text-3xl font-black">5,000+</h3>
            </div>

            <div className="text-center md:border-l border-red-500/20">
              <h3 className="text-3xl font-black">100+</h3>
            </div>

            <div className="text-center md:border-l border-red-500/20">
              <h3 className="text-3xl font-black">8+</h3>
            </div>

            <div className="text-center md:border-l border-red-500/20">
              <h3 className="text-2xl font-black uppercase">Pan India</h3>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-red-500/20 bg-black/40 backdrop-blur-md overflow-hidden py-8">
          <div className="flex items-center justify-center gap-5 mb-8 px-6">
            <div className="h-px flex-1 bg-red-500/20" />

            <span className="uppercase tracking-[0.4em] text-sm font-semibold text-zinc-300 text-center">
              Trusted By Industry Leaders
            </span>

            <div className="h-px flex-1 bg-red-500/20" />
          </div>

          <div className="relative overflow-hidden">
            <div className="brand-marquee flex items-center">
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="mx-12 text-3xl md:text-4xl font-black text-white/80 hover:text-red-500 transition-all duration-300 whitespace-nowrap"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
