"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#about", label: "Maison" },
  { href: "#services", label: "Soins" },
  { href: "#transformation", label: "Transformations" },
  { href: "#temoignages", label: "Avis" },
  { href: "#technologie", label: "Technologie" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide on scroll down (past hero), reveal on scroll up
      if (y > 240 && y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className={`nav-shell fixed top-0 inset-x-0 z-50 ${scrolled ? "pt-3 sm:pt-4" : "pt-4 sm:pt-6"} ${hidden && !open ? "-translate-y-[140%]" : "translate-y-0"}`}>
        <nav className={`nav-pill ${scrolled ? "scrolled" : ""} max-w-[1320px] mx-3 sm:mx-6 lg:mx-auto rounded-full px-3 sm:px-4 lg:pl-7 lg:pr-3 py-2.5 flex items-center justify-between`}>
          <a href="#hero" className="flex items-center gap-2.5 pl-1">
            <Logo size={36} />
            <span className="font-serif text-xl sm:text-2xl tracking-wide leading-none">Dentalida</span>
          </a>

          <div className="hidden lg:flex items-center gap-6 xl:gap-9 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`nav-link text-ink/70 hover:text-ink transition-colors ${active === l.href ? "active text-ink" : ""}`}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="tel:+213553994355" className="hidden xl:flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink transition mr-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              0553 99 43 55
            </a>
            <a href="#rdv" data-magnetic className="hidden sm:inline-flex btn-primary !py-3 !px-6 text-[13px]"><span>Rendez-vous</span></a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="lg:hidden relative w-11 h-11 rounded-full bg-ink text-pearl flex flex-col items-center justify-center gap-[5px] active:scale-95 transition"
            >
              <span className="w-[18px] h-px bg-pearl" />
              <span className="w-[18px] h-px bg-pearl" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? "open" : ""} lg:hidden`}>
        <div className="relative h-full flex flex-col px-6 py-6 text-white overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-violet-deep/25 blur-[130px]" />
          <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full bg-royal/25 blur-[130px]" />

          <div className="relative flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Logo size={38} />
              <span className="font-serif text-2xl tracking-wide">Dentalida</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fermer" className="w-11 h-11 rounded-full bg-pearl/10 border border-pearl/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <nav className="relative flex-1 flex flex-col justify-center">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="mm-link group flex items-baseline justify-between py-3.5 border-b border-pearl/10">
                <span className="font-serif text-[2rem] sm:text-4xl font-light tracking-[-0.02em] group-hover:translate-x-1 transition-transform">{l.label}</span>
                <span className="idx text-pearl/35">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="relative pt-7 grid grid-cols-2 gap-3 mm-link">
            <a href="tel:+213553994355" className="flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-pearl/20 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Appeler
            </a>
            <a href="#rdv" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-gradient-to-r from-royal to-violet-deep text-sm font-medium">
              Réserver
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="relative pt-6 text-center idx text-pearl/40">Cité CNEP · Hai el Badr · Kouba</div>
        </div>
      </div>
    </>
  );
}
