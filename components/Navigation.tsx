"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "À propos" },
    { href: "#services", label: "Soins" },
    { href: "#transformation", label: "Transformations" },
    { href: "#temoignages", label: "Témoignages" },
    { href: "#technologie", label: "Technologie" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav id="nav" className={`fixed top-0 inset-x-0 z-50 nav-glass ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <Logo size={44} />
            <span className="font-serif text-2xl tracking-wider">Dentalida</span>
          </a>
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-royal transition">{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+213553994355" className="hidden md:flex items-center gap-2 text-sm font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              0553 99 43 55
            </a>
            <a href="#rdv" className="hidden sm:inline-flex btn-primary !py-3 !px-6 text-sm"><span>Rendez-vous</span></a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="lg:hidden relative w-11 h-11 rounded-full bg-ink text-pearl flex flex-col items-center justify-center gap-1.5 shadow-lg active:scale-95 transition"
            >
              <span className="w-5 h-px bg-pearl" />
              <span className="w-5 h-px bg-pearl" />
              <span className="w-5 h-px bg-pearl" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="relative h-full flex flex-col px-6 py-6 text-white overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-deep/30 blur-[120px]" />
          <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-royal/30 blur-[120px]" />

          <div className="relative flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <span className="font-serif text-2xl tracking-wider">Dentalida</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="w-11 h-11 rounded-full bg-pearl/10 border border-pearl/20 flex items-center justify-center backdrop-blur"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <nav className="relative flex-1 flex flex-col justify-center gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between py-4 border-b border-pearl/10"
              >
                <span className="font-serif text-3xl sm:text-4xl font-light tracking-[-0.02em] group-hover:italic transition-all">{l.label}</span>
                <span className="text-[10px] font-mono text-pearl/40 tracking-widest">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="relative pt-8 grid grid-cols-2 gap-3">
            <a href="tel:+213553994355" className="flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-pearl/20 backdrop-blur text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Appeler
            </a>
            <a
              href="#rdv"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-gradient-to-r from-violet-deep to-royal text-sm font-medium"
            >
              Réserver
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="relative pt-6 text-center text-[10px] uppercase tracking-[0.4em] text-pearl/40">
            Cité CNEP · Hai el Badr · Kouba
          </div>
        </div>
      </div>
    </>
  );
}
