"use client";
import { useRef, useState } from "react";

// Vrai avant / après — deux photos distinctes par cas.
// 👉 Remplace ces URL par tes vraies photos patients (même cadrage avant/après).
const sets = [
  {
    label: "Hollywood Smile",
    before: "https://images.unsplash.com/photo-1581585504432-aebfa15f99c3?auto=format&fit=crop&w=1200&q=88",
    after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=88",
  },
  {
    label: "Sourire Gingival",
    before: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1200&q=88",
    after: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=88",
  },
  {
    label: "Esthétique Dentaire",
    before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=88",
    after: "https://images.unsplash.com/photo-1606811951341-65f0c52b1ee0?auto=format&fit=crop&w=1200&q=88",
  },
];

// Léger traitement « avant » pour accentuer le contraste narratif (ternit la photo d'avant).
const BEFORE_FILTER = "saturate(0.6) brightness(0.85) contrast(0.95) sepia(0.12)";

export default function BeforeAfter() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [idx, setIdx] = useState(0);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPct(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const onPointerUp = () => { dragging.current = false; };

  const current = sets[idx];

  return (
    <section id="transformation" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-pearl via-silver/40 to-pearl">
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-ink/[0.06] to-transparent pointer-events-none" />
      <div className="absolute inset-0 noise opacity-50" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-20 items-end reveal">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-7"><span>Avant · Après</span></div>
            <h2 className="font-serif font-light text-[40px] sm:text-6xl lg:text-7xl leading-[1.04] tracking-[-0.03em]">
              <span className="line"><span>Un sourire peut</span></span>
              <span className="line"><span className="italic grad-text">changer une vie.</span></span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="gold-rule mb-5" />
            <p className="text-ink/65 leading-relaxed font-light text-base lg:text-lg">
              Faites glisser pour révéler le résultat. Chaque transformation est unique — précise, douce, durable.
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
                <div className={`text-[11px] tracking-[0.25em] uppercase mb-2 ${i === idx ? "text-gold" : "text-ink/35"}`}>Cas 0{i + 1}</div>
                <div className="font-serif text-lg lg:text-xl leading-tight">{s.label}</div>
              </button>
            ))}
            <div className="hidden lg:block mt-6 pt-6 border-t border-ink/10 text-xs text-ink/55 leading-relaxed">
              <div className="font-medium text-ink mb-2">Méthode signature</div>
              Étude numérique, mock-up esthétique, validation patient, puis pose minutieuse.
            </div>
          </div>

          {/* Slider main */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div
              ref={wrapRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="ba-wrap relative aspect-[4/3] sm:aspect-[16/10] rounded-[24px] lg:rounded-[40px] overflow-hidden shadow-[var(--shadow-lux)] cursor-ew-resize"
              style={{ touchAction: "pan-y" }}
            >
              {/* Before — vraie photo d'avant (ternie) */}
              <img src={current.before} alt={`Avant — ${current.label}`} className="absolute inset-0 w-full h-full object-cover" style={{ filter: BEFORE_FILTER }} draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur text-white text-[11px] uppercase tracking-[0.25em]">Avant</div>

              {/* After — vraie photo de résultat */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: pct + "%" }}>
                <img src={current.after} alt={`Après — ${current.label}`} className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (pct / 100)}%`, maxWidth: "none" }} draggable={false} />
                <div className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-royal to-violet-deep text-white text-[11px] uppercase tracking-[0.25em]">Après</div>
              </div>

              {/* Handle */}
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: pct + "%", transform: "translateX(-50%)" }}>
                <div className="w-[2px] h-full bg-white/95 shadow-[0_0_22px_rgba(255,255,255,0.7)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a1428" strokeWidth="2"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mt-5 lg:mt-6">
              <a href="#rdv" className="inline-flex items-center gap-2 text-sm font-medium border-b border-ink pb-1 hover:gap-4 transition-all">
                Commencer ma transformation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-10 text-xs text-ink/60 leading-relaxed">
          <div className="font-medium text-ink mb-2">Méthode signature</div>
          Étude numérique, mock-up esthétique, validation patient, puis pose minutieuse.
        </div>
      </div>
    </section>
  );
}
