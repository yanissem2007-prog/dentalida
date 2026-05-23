"use client";
import { useEffect, useRef, useState } from "react";

const sets = [
  {
    label: "Hollywood Smile",
    before: "https://images.unsplash.com/photo-1581585504432-aebfa15f99c3?auto=format&fit=crop&w=1200&q=85",
    after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Alignement & Esthétique",
    before: "https://images.unsplash.com/photo-1559757175-08d12d3c0e5b?auto=format&fit=crop&w=1200&q=85",
    after: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function BeforeAfter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [idx, setIdx] = useState(0);
  const dragging = useRef(false);

  const setFromX = (x: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    let p = ((x - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPct(p);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => dragging.current && setFromX(e.clientX);
    const onUp = () => (dragging.current = false);
    const onTMove = (e: TouchEvent) => dragging.current && setFromX(e.touches[0].clientX);
    const onTEnd = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTMove, { passive: true });
    window.addEventListener("touchend", onTEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTMove);
      window.removeEventListener("touchend", onTEnd);
    };
  }, []);

  const current = sets[idx];

  return (
    <section id="transformation" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-pearl via-silver/40 to-pearl">
      <div className="absolute inset-0 noise opacity-50" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-20 items-end reveal">
          <div className="lg:col-span-2 text-[10px] font-mono uppercase tracking-[0.4em] text-ink/40">
            (03) — Transformations
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow mb-6"><span>Avant · Après</span></div>
            <h2 className="font-serif font-light text-[44px] sm:text-6xl lg:text-8xl leading-[0.95] tracking-[-0.03em]">
              Un sourire peut<br />
              <span className="italic grad-text">changer une vie.</span>
            </h2>
          </div>
          <div className="lg:col-span-3">
            <p className="text-ink/70 leading-relaxed font-light text-base lg:text-lg">
              Glissez pour révéler le résultat. Chaque transformation est unique, pensée comme une œuvre — précise, douce, durable.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center reveal">
          {/* Side controls */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex lg:flex-col gap-3 lg:gap-4">
            {sets.map((s, i) => (
              <button
                key={i}
                onClick={() => { setIdx(i); setPct(50); }}
                className={`flex-1 lg:flex-none text-left p-4 lg:p-5 rounded-2xl border transition-all ${i === idx ? "border-ink bg-ink text-pearl" : "border-ink/15 bg-white/40 hover:border-ink/40"}`}
              >
                <div className={`text-[10px] font-mono uppercase tracking-[0.3em] mb-2 ${i === idx ? "text-pearl/50" : "text-ink/40"}`}>0{i + 1}</div>
                <div className="font-serif text-lg lg:text-xl leading-tight">{s.label}</div>
              </button>
            ))}

            <div className="hidden lg:block mt-6 pt-6 border-t border-ink/10 text-xs text-ink/50 leading-relaxed">
              <div className="font-medium text-ink mb-2">Méthode signature</div>
              Étude numérique, mock-up esthétique, validation patient, puis pose minutieuse.
            </div>
          </div>

          {/* Slider main */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div
              ref={wrapRef}
              className="ba-wrap relative aspect-[4/3] sm:aspect-[16/10] rounded-[24px] lg:rounded-[40px] overflow-hidden shadow-[0_50px_120px_-30px_rgba(10,20,40,0.45)] select-none touch-pan-y"
              onMouseDown={(e) => { dragging.current = true; setFromX(e.clientX); }}
              onTouchStart={(e) => { dragging.current = true; setFromX(e.touches[0].clientX); }}
            >
              {/* Before */}
              <img
                src={current.before}
                alt={`Avant - ${current.label}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "saturate(0.65) brightness(0.78) contrast(0.95)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur text-white text-[10px] uppercase tracking-[0.3em] font-mono">Avant</div>

              {/* After clipped */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: pct + "%" }}>
                <img
                  src={current.after}
                  alt={`Après - ${current.label}`}
                  className="absolute inset-0 h-full object-cover"
                  style={{ width: `${100 / (pct / 100)}%`, maxWidth: "none" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-deep/15 to-transparent" />
                <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-deep to-royal text-white text-[10px] uppercase tracking-[0.3em] font-mono">Après</div>
              </div>

              {/* Handle */}
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: pct + "%", transform: "translateX(-50%)" }}>
                <div className="w-[2px] h-full bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border border-white/40 shadow-2xl flex items-center justify-center backdrop-blur">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a1428" strokeWidth="2">
                    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 lg:mt-6 px-1">
              <div className="text-[11px] uppercase tracking-[0.3em] text-ink/50 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 7L3 12l5 5M16 7l5 5-5 5M3 12h18" /></svg>
                Glissez pour révéler
              </div>
              <a href="#rdv" className="inline-flex items-center gap-2 text-sm font-medium border-b border-ink pb-1 hover:gap-4 transition-all">
                Commencer ma transformation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile method note */}
        <div className="lg:hidden mt-10 text-xs text-ink/60 leading-relaxed">
          <div className="font-medium text-ink mb-2">Méthode signature</div>
          Étude numérique, mock-up esthétique, validation patient, puis pose minutieuse.
        </div>
      </div>
    </section>
  );
}
