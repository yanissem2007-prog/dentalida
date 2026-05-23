"use client";
import { useEffect, useRef } from "react";

const PHOTO_SMILE = "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=85";
const PHOTO_CLINIC = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85";
const PHOTO_PATIENT = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=85";
const PHOTO_TOOLS = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=85";

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      if (mainImgRef.current) {
        mainImgRef.current.style.transform = `perspective(1400px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
      }
      scene.querySelectorAll<HTMLElement>(".pfloat").forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "10");
        el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" ref={sceneRef} className="relative min-h-[100svh] bg-pearl overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16">
      <div className="absolute inset-0 noise opacity-60" />
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-violet-soft/25 blur-[140px] pfloat" data-depth="-20" />
      <div className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full bg-azure/20 blur-[160px] pfloat" data-depth="-15" />

      {/* Top utility bar — dental clinic markers */}
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 mb-6 lg:mb-10 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-ink/40 font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Cabinet Ouvert · 9h — 19h</span>
          <span className="sm:hidden">Ouvert</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>Hai El Badr</span>
          <span className="w-px h-3 bg-ink/20" />
          <span>Kouba · Alger</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Patients</span>
          <span className="text-ink font-medium">1K+</span>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT — Content */}
        <div className="lg:col-span-7 reveal-stagger relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-ink/10 mb-6 lg:mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e4ba8" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 8c0 4 2 5 2 9 0 2 1 5 2 5s2-3 2-5c0-1 .5-2 1-2s1 1 1 2c0 2 1 5 2 5s2-3 2-5c0-4 2-5 2-9 0-3-3-6-7-6z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink/70 font-medium">Cabinet Dentaire · Esthétique du Sourire</span>
          </div>

          <h1 className="font-serif font-light leading-[0.92] tracking-[-0.03em] mb-8 lg:mb-10">
            <span className="block text-[14vw] sm:text-[12vw] lg:text-[9.5vw] xl:text-[120px] text-ink">Redefining</span>
            <span className="block text-[14vw] sm:text-[12vw] lg:text-[9.5vw] xl:text-[120px] italic grad-text">Smiles.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-ink/70 leading-relaxed font-light max-w-xl mb-8 lg:mb-10">
            Cabinet dentaire premium spécialisé en <em className="not-italic font-medium text-ink">Hollywood Smile</em>, <em className="not-italic font-medium text-ink">implants</em>, <em className="not-italic font-medium text-ink">orthodontie</em> et <em className="not-italic font-medium text-ink">esthétique du sourire</em> au cœur d&apos;Alger.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10 lg:mb-14">
            <a href="#rdv" className="btn-primary">
              <span>Prendre Rendez-vous</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#services" className="btn-ghost text-sm !py-3 !px-6"><span>Explorer les Soins</span></a>
          </div>

          {/* Service chips — explicit dental services for clarity */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "✨", label: "Hollywood Smile" },
              { icon: "🦷", label: "Implants" },
              { icon: "⚡", label: "Laser" },
              { icon: "💎", label: "Facettes" },
              { icon: "📐", label: "Orthodontie" },
            ].map((c, i) => (
              <a key={i} href="#services" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/60 border border-ink/10 backdrop-blur text-xs hover:bg-ink hover:text-pearl hover:border-ink transition-all">
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Dental photo collage */}
        <div className="lg:col-span-5 relative" style={{ perspective: "1400px" }}>
          <div className="relative grid grid-cols-6 grid-rows-6 gap-2.5 sm:gap-3 lg:gap-4 aspect-[5/6] max-w-md mx-auto lg:max-w-none">
            {/* Big smile photo */}
            <div ref={mainImgRef} className="col-span-4 row-span-4 col-start-1 row-start-1 relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(124,58,237,0.4)] transition-transform duration-300 ease-out">
              <img src={PHOTO_SMILE} alt="Sourire transformé" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-deep/35 via-transparent to-violet-soft/15 mix-blend-soft-light" />
              <div className="absolute inset-0 ring-1 ring-white/30 rounded-3xl" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[9px] uppercase tracking-[0.3em] font-mono">
                <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur">Sourire · Patiente</span>
                <span className="opacity-70">2024</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[9px] uppercase tracking-[0.3em] opacity-80 mb-1">Procédure signature</div>
                <div className="font-serif text-base sm:text-lg leading-tight">Hollywood Smile</div>
              </div>
            </div>

            {/* Clinic interior */}
            <div className="col-span-2 row-span-3 col-start-5 row-start-1 relative rounded-3xl overflow-hidden pfloat" data-depth="-12">
              <img src={PHOTO_CLINIC} alt="Cabinet Dentalida" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep/60" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[8px] uppercase tracking-[0.3em] opacity-80">Cabinet</div>
                <div className="font-serif text-sm leading-tight">Intérieur</div>
              </div>
            </div>

            {/* Tools */}
            <div className="col-span-2 row-span-3 col-start-5 row-start-4 relative rounded-3xl overflow-hidden pfloat" data-depth="10">
              <img src={PHOTO_TOOLS} alt="Technologie dentaire" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-deep/70" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[8px] uppercase tracking-[0.3em] opacity-80">Technologie</div>
                <div className="font-serif text-sm leading-tight">Laser & Précision</div>
              </div>
            </div>

            {/* Patient closeup */}
            <div className="col-span-4 row-span-2 col-start-1 row-start-5 relative rounded-3xl overflow-hidden pfloat" data-depth="-8">
              <img src={PHOTO_PATIENT} alt="Sourire patient" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-deep/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center px-4 sm:px-6 text-white">
                <div>
                  <div className="flex gap-0.5 mb-2">
                    {[0,1,2,3,4].map(i=>(
                      <svg key={i} className="w-3 h-3" viewBox="0 0 24 24"><path className="star-fill" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <div className="font-serif text-sm sm:text-base italic leading-tight">&laquo; Elle a changé ma vie. &raquo;</div>
                  <div className="text-[9px] uppercase tracking-[0.3em] opacity-70 mt-1">Hadoula · Google</div>
                </div>
              </div>
            </div>

            {/* Floating dental icon badge */}
            <div className="absolute -top-3 -left-3 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pearl border border-ink/10 shadow-xl flex items-center justify-center pfloat" data-depth="-20" style={{ animation: "floatA 7s ease-in-out infinite" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1e4ba8" strokeWidth="1.5">
                <path d="M12 2C8 2 5 5 5 8c0 4 2 5 2 9 0 2 1 5 2 5s2-3 2-5c0-1 .5-2 1-2s1 1 1 2c0 2 1 5 2 5s2-3 2-5c0-4 2-5 2-9 0-3-3-6-7-6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat strip */}
      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-ink/10 reveal">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {[
            { num: "1K+", label: "Patients satisfaits" },
            { num: "15y", label: "Années d'expertise" },
            { num: "5.0", label: "Note Google" },
            { num: "7", label: "Spécialités" },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3">
              <div>
                <div className="font-serif text-3xl lg:text-5xl grad-text leading-none">{s.num}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mt-2">{s.label}</div>
              </div>
              <span className="text-[10px] font-mono text-ink/25">0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
