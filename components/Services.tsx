"use client";
import { useEffect, useRef, useState } from "react";

const services = [
  { num: "01", title: "Hollywood Smile", tag: "Esthétique Premium", desc: "Facettes céramiques sur-mesure pour un sourire éclatant digne des stars.", grad: "from-violet-deep via-royal to-azure", glow: "rgba(124,58,237,.6)", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80" },
  { num: "02", title: "Implant Dentaire", tag: "Restauration", desc: "Solution durable et esthétique pour remplacer une ou plusieurs dents.", grad: "from-deep via-royal to-azure", glow: "rgba(59,130,246,.6)", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" },
  { num: "03", title: "Orthodontie", tag: "Alignement", desc: "Alignement dentaire pour enfants et adultes — bagues classiques ou invisibles.", grad: "from-azure via-violet-soft to-violet-deep", glow: "rgba(167,139,250,.6)", img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80" },
  { num: "04", title: "LASER Dentaire", tag: "Technologie", desc: "Technologie laser pour des soins précis, indolores et à guérison rapide.", grad: "from-violet-deep via-violet-soft to-gold", glow: "rgba(212,175,122,.55)", img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80" },
  { num: "05", title: "Parodontologie", tag: "Soins gencives", desc: "Traitement des gencives, prévention et soin des maladies parodontales.", glow: "rgba(212,175,122,.5)", grad: "from-gold via-violet-soft to-royal", img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80" },
  { num: "06", title: "Sourire Gingival", tag: "Correction", desc: "Correction esthétique pour harmoniser dents et gencives.", grad: "from-royal via-violet-deep to-deep", glow: "rgba(30,75,168,.6)", img: "https://images.unsplash.com/photo-1581585504432-aebfa15f99c3?auto=format&fit=crop&w=800&q=80" },
  { num: "07", title: "Esthétique Dentaire", tag: "Beauté du sourire", desc: "Blanchiment, facettes, composites — révélez la beauté naturelle.", grad: "from-violet-soft via-gold to-royal", glow: "rgba(167,139,250,.55)", img: "https://images.unsplash.com/photo-1606811951341-65f0c52b1ee0?auto=format&fit=crop&w=800&q=80" },
];

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const prog = Math.max(0, Math.min(1, -rect.top / total));
      const maxX = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-prog * maxX}px,0,0)`;
      setActive(Math.min(services.length - 1, Math.floor(prog * services.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  return (
    <section id="services" className="relative bg-ink text-pearl">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 pt-24 lg:pt-32 pb-10 lg:pb-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-end reveal">
          <div className="lg:col-span-2 text-[10px] font-mono uppercase tracking-[0.4em] text-pearl/40">
            (02) — Soins
          </div>
          <div className="lg:col-span-6">
            <div className="eyebrow mb-6" style={{ color: "#a78bfa" }}><span>L&apos;Expérience Dentalida</span></div>
            <h2 className="font-serif font-light text-[42px] sm:text-6xl lg:text-8xl leading-[0.95] tracking-[-0.03em]">
              Sept spécialités<br />
              <span className="italic" style={{ background: "linear-gradient(135deg,#a78bfa,#d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>une signature unique.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-pearl/60 text-base lg:text-lg font-light leading-relaxed">
              Une approche complète du sourire, conçue comme une collection de soins d&apos;exception. Chaque procédure est pensée pour révéler le meilleur de vous.
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP horizontal showcase */}
      {isDesktop && (
        <div ref={wrapRef} style={{ height: `${services.length * 90}vh` }} className="relative hidden lg:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${services[active].glow}, transparent 60%)`,
                opacity: 0.6,
              }}
            />
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />

            <div className="absolute top-1/2 left-10 -translate-y-1/2 z-20 flex flex-col gap-3">
              {services.map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-px transition-all duration-500 ${i === active ? "w-16 bg-pearl" : "w-6 bg-pearl/20"}`} />
                  <span className={`text-[10px] font-mono tracking-widest transition ${i === active ? "text-pearl" : "text-pearl/30"}`}>0{i + 1}</span>
                </div>
              ))}
            </div>

            <div ref={trackRef} className="flex h-full will-change-transform" style={{ width: `${services.length * 100}vw` }}>
              {services.map((s, i) => (
                <div key={i} className="w-screen h-full flex items-center justify-center px-32 relative">
                  <div className="grid grid-cols-12 gap-12 max-w-7xl w-full items-center">
                    <div className="col-span-5">
                      <div className="font-mono text-[11px] tracking-[0.4em] text-pearl/40 mb-6">{s.num} / 0{services.length} · {s.tag}</div>
                      <h3 className="font-serif text-7xl xl:text-8xl font-light leading-[0.95] tracking-[-0.02em] mb-8">{s.title}</h3>
                      <p className="text-pearl/70 text-lg max-w-md font-light leading-relaxed mb-10">{s.desc}</p>
                      <a href="#rdv" className="inline-flex items-center gap-3 text-sm font-medium border-b border-gold pb-2 hover:gap-5 transition-all">
                        Réserver pour ce soin
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </a>
                    </div>

                    <div className="col-span-7 relative">
                      <div className={`relative aspect-[4/5] max-w-md mx-auto rounded-[40px] overflow-hidden bg-gradient-to-br ${s.grad}`}>
                        <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-gradient-to-tr ${s.grad} opacity-50 mix-blend-multiply`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-6 right-6 font-serif text-[100px] leading-none text-white/25">{s.num}</div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                          <div className="text-white">
                            <div className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-1">Soin signature</div>
                            <div className="font-serif text-xl">{s.title}</div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-8 right-10 text-[10px] uppercase tracking-[0.4em] text-pearl/50 font-mono flex items-center gap-3">
              <span className="text-pearl">{String(active + 1).padStart(2, "0")}</span>
              <div className="w-16 h-px bg-pearl/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-soft to-gold transition-all duration-500" style={{ width: `${((active + 1) / services.length) * 100}%` }} />
              </div>
              <span className="text-pearl/40">{String(services.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE & TABLET — stacked premium cards */}
      <div className="lg:hidden relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 pb-24 grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <a key={i} href="#rdv" className={`group relative aspect-[4/5] rounded-[28px] overflow-hidden bg-gradient-to-br ${s.grad}`}>
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${s.grad} opacity-50 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute top-5 left-5 right-5 flex justify-between items-start text-white">
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-80 font-mono">{s.tag}</span>
                <span className="font-mono text-xs opacity-70">{s.num}</span>
              </div>

              <div className="absolute top-6 right-6 font-serif text-[80px] sm:text-[100px] leading-none text-white/15">{s.num}</div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight mb-2">{s.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-2">{s.desc}</p>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] border-b border-white/60 pb-1">
                  Réserver
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
