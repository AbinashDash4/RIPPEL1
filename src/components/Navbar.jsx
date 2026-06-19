import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X, Star, MessageSquare } from "lucide-react";

export default function Navbar({ onAddTestimonial }) {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", role: "", message: "" });
  const [formError, setFormError] = useState("");

  const links = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Case Studies", id: "case-studies" },
    { label: "Talent Network", id: "talent-network" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-logo",
        { x: -60, opacity: 0, filter: "blur(8px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" }
      );

      gsap.fromTo(
        ".nav-link-item",
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".nav-cta",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.8)",
          delay: 0.55,
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        ".mobile-link",
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.08,
          ease: "power4.out",
        }
      );
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      setFormError("Name and Message fields are required!");
      return;
    }

    onAddTestimonial?.({
      name: formData.name,
      role: formData.role || "Partner Client",
      message: formData.message,
    });

    setFormData({ name: "", role: "", message: "" });
    setFormError("");
    setModalOpen(false);
  };

  const handleLinkClick = (sectionId) => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${visible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
          <div className="h-16 px-4 md:px-6 flex items-center justify-between rounded-full border border-white/10 bg-[#081120]/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

            <div
              onClick={() => handleLinkClick("home")}
              className="nav-logo flex items-center cursor-pointer group"
            >
              <img
                src="/ripple_logo.png"
                alt="Ripple Creative Logo"
                className="h-8 md:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(0,212,255,0.75)]"
              />
            </div>

            <nav className="hidden lg:flex items-center gap-7">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="nav-link-item text-[11px] font-semibold tracking-[0.16em] text-white/70 hover:text-cyan-300 uppercase font-mono relative group transition-colors duration-300 py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setModalOpen(true)}
                className="nav-cta px-5 py-2.5 bg-cyan-400 text-[#081120] rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.55)] hover:scale-105"
              >
                <MessageSquare size={14} />
                Review Us
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="p-2 bg-cyan-400 text-[#081120] rounded-full hover:scale-105 transition-transform"
              >
                <MessageSquare size={16} />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-cyan-300 transition-colors p-1"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 bg-[#081120]/95 backdrop-blur-3xl flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

        <div className="flex flex-col gap-6 relative z-10">
          {links.map((link, index) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="mobile-link text-4xl font-black tracking-tight text-white hover:text-cyan-300 uppercase text-left"
            >
              <span className="text-cyan-400 text-sm mr-3">
                0{index + 1}
              </span>
              {link.label}
            </button>
          ))}

          <div className="mt-8 border-t border-white/10 pt-8 mobile-link">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setModalOpen(true);
              }}
              className="w-full py-4 bg-cyan-400 text-[#081120] rounded-2xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <Star size={18} fill="currentColor" />
              Add Testimonial
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#081120]/95 border border-cyan-400/20 p-8 rounded-3xl backdrop-blur-xl shadow-[0_0_80px_rgba(0,212,255,0.12)]">
            <button
              onClick={() => {
                setModalOpen(false);
                setFormError("");
              }}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-400/10 text-cyan-300 rounded-xl">
                <Star size={22} fill="currentColor" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">
                  Client Review
                </h3>
                <p className="text-xs text-white/45">
                  Share your Ripple Creative experience.
                </p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitTestimonial} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Client / Brand Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />

              <input
                type="text"
                placeholder="Your Role / Title"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />

              <textarea
                rows={4}
                placeholder="Your Message / Success Story *"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
              />

              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-cyan-400 text-[#081120] rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)]"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}