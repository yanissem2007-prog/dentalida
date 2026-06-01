import ParallaxImage from "./ParallaxImage";

const stats = [
  { count: 1000, suffix: "+", label: "Patients accompagnés" },
  { count: 15, suffix: "", label: "Années d'expertise" },
  { count: 7, suffix: "", label: "Spécialités réunies" },
  { count: 98, suffix: "%", label: "Recommandations" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-14 lg:mb-20 reveal">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-7"><span>La Maison Dentalida</span></div>
            <h2 className="font-serif font-light text-[40px] sm:text-6xl lg:text-7xl leading-[1.04] tracking-[-0.03em]">
              <span className="line"><span>Une médecine du sourire,</span></span>
              <span className="line"><span className="italic grad-text-soft">pensée comme un art.</span></span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="gold-rule mb-5" />
            <p className="text-ink/65 text-lg font-light leading-relaxed">
              Depuis quinze ans, nous réunissons expertise clinique, technologies de pointe et une attention sincère pour transformer chaque visite en une expérience sereine.
            </p>
          </div>
        </div>

        {/* Editorial image composition */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Tall portrait */}
          <div className="lg:col-span-5 reveal">
            <div className="clip-reveal relative aspect-[4/5] rounded-[26px] overflow-hidden h-full">
              <ParallaxImage src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=88" alt="Cabinet Dentalida" speed={18} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 idx text-white/70">Le cabinet — Alger</div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-serif text-3xl leading-none mb-1">Un lieu pensé<br/>pour la sérénité.</div>
              </div>
            </div>
          </div>

          {/* Center pull quote + detail */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="reveal flex-1 flex flex-col justify-center bg-ink text-pearl rounded-[26px] p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-violet-deep/30 blur-[90px]" />
              <div className="relative">
                <svg width="34" height="34" viewBox="0 0 24 24" className="text-gold/60 mb-5" fill="currentColor"><path d="M9.5 4C6 4 3 7 3 11v9h8v-9H6.5c0-2 1.5-3.5 3-3.5V4zM21 4c-3.5 0-6.5 3-6.5 7v9H22v-9h-4.5c0-2 1.5-3.5 3-3.5V4z"/></svg>
                <p className="font-serif text-2xl lg:text-[1.7rem] font-light leading-[1.3] italic">
                  Chaque sourire est une histoire que nous écrivons avec vous.
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal to-violet-deep flex items-center justify-center text-white text-sm font-semibold">D</div>
                  <div>
                    <div className="text-sm font-medium">Dr. Medjtouh</div>
                    <div className="idx text-pearl/45 text-[9px]">Fondatrice · Chirurgien-dentiste</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal clip-reveal relative aspect-[16/10] rounded-[26px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=85" alt="Technologie de soin" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent" />
              <div className="absolute bottom-4 left-5 idx text-white/80">Précision · Confort</div>
            </div>
          </div>

          {/* Right values list */}
          <div className="lg:col-span-3 reveal-stagger flex flex-col justify-between gap-4">
            {[
              { t: "Écoute & douceur", d: "Une approche humaine, sans jugement, à chaque rendez-vous." },
              { t: "Excellence clinique", d: "Des protocoles rigoureux et des matériaux haut de gamme." },
              { t: "Résultats durables", d: "Un suivi attentif, avant, pendant et après chaque soin." },
            ].map((v, i) => (
              <div key={i} className="flex-1 border border-ink/10 rounded-[22px] p-6 hover:border-ink/25 transition-colors bg-white/40">
                <div className="idx text-ink/35 mb-4">0{i + 1}</div>
                <div className="font-serif text-xl mb-2">{v.t}</div>
                <p className="text-sm text-ink/55 font-light leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prestige stats band */}
        <div className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-ink/12 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 reveal-stagger">
          {stats.map((s, i) => (
            <div key={i} className="relative">
              <div className="gold-rule mb-5 opacity-60" />
              <div className="font-serif font-light text-5xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-none flex items-start">
                <span className="stat-num grad-text" data-count={s.count}>0</span>
                <span className="grad-text text-3xl lg:text-4xl mt-1">{s.suffix}</span>
              </div>
              <div className="text-ink/55 text-sm mt-4 max-w-[18ch]">{s.label}</div>
              <span className="idx text-ink/25 absolute top-0 right-0 hidden sm:block">0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
