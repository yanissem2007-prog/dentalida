"use client";
import { useEffect, useRef, useState } from "react";

const PHOTO_SMILE = "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=88";
const PHOTO_CLINIC = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=85";
const PHOTO_PATIENT = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=700&q=85";
const PHOTO_TOOLS = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=85";

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Cinematic entrance synced with loader lift
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Pointer depth
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      if (mediaRef.current) mediaRef.current.style.transform = `perspective(1500px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
      scene.querySelectorAll<HTMLElement>(".pfloat").forEach((el) => {
        const d = parseFloat(el.dataset.depth || "10");
        el.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sceneRef}
      className={`relative min-h-[100svh] bg-pearl overflow-hidden flex flex-col pt-28 sm:pt-32 lg:pt-28 ${ready ? "in" : ""}`}
    >
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute top-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-violet-soft/12 blur-[150px]" />
      <div className="absolute bottom-[-20%] left-[-12%] w-[50vw] h-[50vw] rounded-full bg-royal/10 blur-[150px]" />

      {/* Main */}
      <div className="relative flex-1 flex items-center w-full">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-y-14 lg:gap-x-10 items-center py-8 lg:py-0">

          {/* LEFT — text */}
          <div className="lg:col-span-6 relative z-10">
            <div className="up inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-ink/10 mb-7">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1e4ba8" strokeWidth="1.6"><path d="M12 2C8 2 5 5 5 8c0 4 2 5 2 9 0 2 1 5 2 5s2-3 2-5c0-1 .5-2 1-2s1 1 1 2c0 2 1 5 2 5s2-3 2-5c0-4 2-5 2-9 0-3-3-6-7-6z" /></svg>
              <span className="text-[11px] uppercase tracking-[0.28em] text-ink/70 font-medium">Cabinet d&apos;Exception · Alger</span>
            </div>

            <h1 className="font-serif font-light text-ink leading-[0.95] tracking-[-0.03em] text-[13vw] sm:text-[11vw] lg:text-[5.6vw] xl:text-[6.4rem] mb-7">
              <span className="line"><span>Redéfinir</span></span>
              <span className="line"><span className="italic grad-text">le sourire.</span></span>
            </h1>

            <p className="up text-ink/65 text-lg lg:text-xl font-light leading-relaxed max-w-[40ch] mb-9" style={{ transitionDelay: ".15s" }}>
              Esthétique, implants et orthodontie — une médecine du sourire pensée comme un art, au cœur d&apos;Alger.
            </p>

            <div className="up flex flex-wrap items-center gap-3.5 mb-9" style={{ transitionDelay: ".25s" }}>
              <a href="#rdv" data-magnetic className="btn-primary">
                <span>Prendre Rendez-vous</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <a href="#services" data-magnetic className="btn-ghost"><span>Découvrir les soins</span></a>
            </div>

            <div className="up flex flex-wrap gap-2.5" style={{ transitionDelay: ".35s" }}>
              {["Hollywood Smile", "Implants", "Orthodontie", "Laser", "Facettes"].map((c, i) => (
                <a key={i} href="#services" className="px-4 py-2 rounded-full bg-white/55 border border-ink/10 backdrop-blur text-[13px] text-ink/75 hover:bg-ink hover:text-pearl hover:border-ink transition-all">
                  {c}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — collage */}
          <div className="lg:col-span-6 relative" style={{ perspective: "1500px" }}>
            <div ref={mediaRef} className="relative grid grid-cols-6 grid-rows-6 gap-3 lg:gap-4 aspect-[5/6] max-w-[420px] sm:max-w-md mx-auto lg:max-w-none transition-transform duration-300 ease-out" style={{ transformStyle: "preserve-3d" }}>
              <div className="clip-reveal col-span-4 row-span-4 col-start-1 row-start-1 relative rounded-[26px] overflow-hidden shadow-[var(--shadow-lux)]">
                <img src={PHOTO_SMILE} alt="Sourire éclatant — patiente Dentalida" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-white/20 rounded-[26px]" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[10px] uppercase tracking-[0.28em] opacity-75 mb-1">Soin signature</div>
                  <div className="font-serif text-xl sm:text-2xl leading-none">Hollywood Smile</div>
                </div>
              </div>

              <div className="clip-reveal col-span-2 row-span-3 col-start-5 row-start-1 relative rounded-[22px] overflow-hidden pfloat" data-depth="-10" style={{ transitionDelay: ".12s" }}>
                <img src={PHOTO_CLINIC} alt="Le cabinet Dentalida" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep/55" />
                <div className="absolute bottom-3 left-3 text-white font-serif text-sm leading-tight">Le cabinet</div>
              </div>

              <div className="clip-reveal col-span-2 row-span-3 col-start-5 row-start-4 relative rounded-[22px] overflow-hidden pfloat" data-depth="8" style={{ transitionDelay: ".2s" }}>
                <img src={PHOTO_TOOLS} alt="Technologie de soin" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-deep/60" />
                <div className="absolute bottom-3 left-3 text-white font-serif text-sm leading-tight">Précision</div>
              </div>

              <div className="clip-reveal col-span-4 row-span-2 col-start-1 row-start-5 relative rounded-[22px] overflow-hidden pfloat" data-depth="-6" style={{ transitionDelay: ".28s" }}>
                <img src={PHOTO_PATIENT} alt="Patiente satisfaite" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep/75 via-deep/20 to-transparent" />
                <div className="absolute inset-0 flex items-center px-5 text-white">
                  <div>
                    <div className="flex gap-0.5 mb-2">
                      {[0,1,2,3,4].map(i => <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24"><path className="star-fill" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                    </div>
                    <div className="font-serif text-sm sm:text-base italic leading-tight">« Elle a changé ma vie. »</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] opacity-70 mt-1.5">Hadoula · Google</div>
                  </div>
                </div>
              </div>

              <div className="up absolute -top-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-pearl border border-ink/10 shadow-xl flex items-center justify-center pfloat z-10" data-depth="-18" style={{ transitionDelay: ".5s" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1e4ba8" strokeWidth="1.5"><path d="M12 2C8 2 5 5 5 8c0 4 2 5 2 9 0 2 1 5 2 5s2-3 2-5c0-1 .5-2 1-2s1 1 1 2c0 2 1 5 2 5s2-3 2-5c0-4 2-5 2-9 0-3-3-6-7-6z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat row — in flow (no overlap) */}
      <div className="up relative border-t border-ink/10 bg-pearl/40 backdrop-blur-sm" style={{ transitionDelay: ".45s" }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-6">
          {[
            { n: "+1000", l: "Patients satisfaits" },
            { n: "15 ans", l: "D'expertise" },
            { n: "5.0 ★", l: "Note Google" },
            { n: "7", l: "Spécialités" },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline gap-2.5">
              <span className="font-serif text-xl sm:text-2xl text-ink leading-none">{s.n}</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
