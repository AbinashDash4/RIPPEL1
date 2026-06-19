import React from 'react';
import { Users, Eye, Handshake } from 'lucide-react';

export default function Talent() {
  const categories = [
    { name: 'Fashion Creators', tag: 'Aesthetic & Style', desc: 'Curating modern apparel, visual storytelling, and high-end brand integrations.', color: 'from-[#ff007f] to-[#ff7f00]' },
    { name: 'Tech Creators', tag: 'Innovation & Reviews', desc: 'Deep-diving into state-of-the-art gadgets, coding setups, and software reviews.', color: 'from-[#00f2fe] to-[#4facfe]' },
    { name: 'Lifestyle Influencers', tag: 'Daily & Travel', desc: 'Capturing authentic daily experiences, fitness routines, and global travel diaries.', color: 'from-[#f9d423] to-[#ff4e50]' },
    { name: 'Business Creators', tag: 'Finance & Growth', desc: 'Breaking down market structures, investment tips, and modern startup growth models.', color: 'from-[#b1f91a] to-[#13a805]' },
    { name: 'Entertainment Talents', tag: 'Comedy & Media', desc: 'Creating highly viral memes, video essays, podcasts, and digital shows.', color: 'from-[#b813f5] to-[#f5139c]' }
  ];

  const stats = [
    { label: 'Creators Roster', value: '500+', icon: <Users size={28} /> },
    { label: 'Collective Reach', value: '50M+', icon: <Eye size={28} /> },
    { label: 'Campaigns Launched', value: '100+', icon: <Handshake size={28} /> }
  ];

  return (
    <section
      id="talent network"
      className="relative w-full py-24 md:py-32 bg-zinc-950 text-white z-10 overflow-hidden font-sans border-t border-white/5"
    >
      {/* Background paper texture & grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Floating glowing background aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full glow-blur pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-primary-yellow/5 rounded-full glow-blur pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span
            className="text-xs uppercase font-mono tracking-widest text-primary-yellow bg-zinc-900 border border-white/5 px-4 py-2 rounded-full font-bold inline-block"
            data-aos="fade-down"
          >
            Our Roster
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white font-outfit uppercase tracking-tight mt-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Creator Network
          </h2>
          <p
            className="text-sm md:text-base text-zinc-400 mt-4 leading-relaxed font-sans"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We represent top-tier creators across diverse demographics, delivering authentic partnerships that captivate audiences worldwide.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 w-full">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl flex items-center justify-between shadow-2xl relative group hover:border-primary-yellow/30 transition-all duration-300 transform hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-yellow/5 rounded-bl-full group-hover:bg-primary-yellow/10 transition-colors duration-300" />
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 font-bold">
                  {stat.label}
                </span>
                <div className="text-5xl md:text-6xl font-black font-outfit text-primary-yellow mt-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.25)]">
                  {stat.value}
                </div>
              </div>
              <div className="p-4 bg-zinc-950 border border-white/10 rounded-2xl text-primary-yellow shadow-inner">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/20 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between overflow-hidden relative group hover:border-white transition-all duration-500 h-[280px]"
              data-aos="zoom-in"
              data-aos-delay={idx * 50}
            >
              {/* Dynamic top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.color}`} />
              
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 group-hover:text-white/60 transition-colors">
                  {cat.tag}
                </span>
                <h4 className="text-lg font-black font-outfit text-white leading-snug mt-3 group-hover:text-primary-yellow transition-colors">
                  {cat.name}
                </h4>
              </div>

              <div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed group-hover:text-zinc-300 transition-colors line-clamp-4">
                  {cat.desc}
                </p>
                <div className="mt-4 text-[9px] font-mono tracking-widest font-black text-primary-yellow uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  COLLABORATE NOW →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
