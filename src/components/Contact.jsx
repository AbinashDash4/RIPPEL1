import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Social Media Marketing");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const servicesList = [
    "Social Media Marketing",
    "Social Media Management",
    "Influencer Marketing",
    "Talent Management",
    "Digital Campaigns",
    "Creative Design",
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      url: "https://wa.me/917978825471",
      action: "Open WhatsApp chat",
    },
    {
      name: "Instagram",
      icon: (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      url: "https://instagram.com",
      action: "Open Instagram profile",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      url: "https://linkedin.com",
      action: "Open LinkedIn profile",
    },
    {
      name: "Facebook",
      icon: (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      url: "https://facebook.com",
      action: "Open Facebook page",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 768) {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "+=80%",
            pin: true,
            pinSpacing: false,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name required");
      setSuccess(false);
      return;
    }

    if (!message.trim()) {
      setError("Project Details required");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(false);
    setSending(true);

    try {
      await emailjs.send(
        "service_u9klt7n",
        "template_5m4ltjr",
        {
          name,
          company,
          email,
          phone,
          service,
          message,
          to_email: "abinashdash022@gmail.com",
        },
        "XFPa_8M6bdW_o9qOj"
      );

      setSuccess(true);

      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setService("Social Media Marketing");
      setMessage("");

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-6 py-24 md:py-32 overflow-hidden z-20 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="text-[25vw] font-black uppercase text-white/5 tracking-tighter leading-none font-outfit select-none">
          CONNECT
        </h2>
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center z-10 text-center relative">
        <h3 className="text-4xl md:text-[7vw] font-black uppercase tracking-tighter text-white font-outfit leading-none mb-2">
          Let's Grow Together
        </h3>

        <p className="text-sm md:text-lg text-zinc-400 max-w-xl font-sans mb-8">
          Ready to scale your brand with strategic marketing and creator
          partnerships?
        </p>

        {error && (
          <div className="w-full max-w-2xl mb-6 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl font-medium font-mono uppercase tracking-wider text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full max-w-2xl mb-6 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-xl font-medium font-mono uppercase tracking-wider text-center">
            Inquiry sent successfully! We will contact you soon.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-4xl items-start text-left mt-4">
          <div className="lg:col-span-4 flex flex-col justify-center gap-6">
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono font-bold">
              Social Channels
            </p>

            <div className="flex flex-wrap lg:flex-col gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-3 px-5 rounded-full border border-white/10 hover:border-white bg-transparent hover:bg-white hover:text-black transition-all duration-500 scale-100 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] cursor-pointer"
                  title={social.action}
                >
                  <span className="p-1 rounded-full group-hover:scale-110 duration-500">
                    {social.icon}
                  </span>
                  <span className="text-xs uppercase font-mono tracking-wider font-bold">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 w-full">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-5 w-full bg-zinc-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/55 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/55 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/55 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/55 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">
                  Service Required
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/55 transition-colors cursor-pointer"
                >
                  {servicesList.map((srv) => (
                    <option
                      key={srv}
                      value={srv}
                      className="bg-zinc-900 text-white"
                    >
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-1.5 font-bold">
                  Project Details *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your campaign goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/55 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-white text-zinc-950 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
