import Star from "./Star";

export default function About() {
  const stats = [
    { count: 1000, label: "Patients" },
    { count: 15, label: "Années" },
    { count: 98, label: "Satisfaction", pct: true },
    { count: 8, label: "Spécialités" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Eyebrow header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-24 items-end reveal">
          <div className="lg:col-span-2 text-[10px] font-mono uppercase tracking-[0.4em] text-ink/40">
            (01) — Maison
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-serif font-light text-[44px] sm:text-6xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-[-0.03em]">
              Une maison médicale<br />
              <span className="italic grad-text">conçue pour le sourire.</span>
            </h2>
          </div>
        </div>

        {/* Image collage + content */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          {/* Big portrait */}
          <div className="lg:col-span-5 reveal">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=85"
                alt="Cabinet Dentalida"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-deep/70 via-royal/20 to-transparent" />
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-mono">Cabinet · Intérieur</div>
                <div className="w-10 h-10 rounded-full border border-white/30 backdrop-blur flex items-center justify-center">
                  <span className="text-[10px] font-mono">01</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-serif text-4xl mb-2">15<span className="text-2xl text-white/60">+ ans</span></div>
                <div className="text-white/70 text-sm font-light">d&apos;excellence médicale au cœur d&apos;Alger.</div>
              </div>
            </div>
          </div>

          {/* Middle — content */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-12 reveal-stagger">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-light leading-[1.2] mb-8 grad-text-soft italic">
                &laquo; Chez Dentalida, chaque sourire est l&apos;histoire que nous écrivons avec vous. &raquo;
              </p>
              <p className="text-ink/70 leading-relaxed font-light">
                Une équipe pluridisciplinaire qui allie expertise reconnue, technologies de pointe et écoute attentive. De la simple consultation à la transformation complète, chaque visite est pensée pour être confortable, rassurante et hautement professionnelle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-ink/15 border border-ink/15">
              {stats.map((s, i) => (
                <div key={i} className="bg-pearl p-6 lg:p-8">
                  <div className="font-serif text-4xl lg:text-5xl stat-num grad-text" data-count={s.count} dangerouslySetInnerHTML={{ __html: s.pct ? '0<span class="text-2xl">%</span>' : "0" }} />
                  <div className="text-[10px] text-ink/50 mt-2 uppercase tracking-[0.3em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — secondary visual */}
          <div className="lg:col-span-3 flex flex-col gap-6 reveal">
            <div className="relative flex-1 min-h-[280px] rounded-[28px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=85"
                alt="Sourire"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-deep/40" />
              <div className="absolute top-6 left-6 right-6 flex justify-between text-white text-[10px] uppercase tracking-[0.3em] font-mono">
                <span>Patient</span>
                <span>02</span>
              </div>
            </div>

            <div className="bg-ink text-pearl p-8 rounded-[28px] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-violet-deep/40 blur-3xl" />
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} />)}
                </div>
                <p className="font-serif italic text-lg leading-snug mb-4">&laquo; Elle a changé ma vie. &raquo;</p>
                <div className="text-[10px] uppercase tracking-[0.3em] text-pearl/50">Hadoula · Patiente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
