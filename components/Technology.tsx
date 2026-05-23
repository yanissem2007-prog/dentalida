const techs = [
  { title: "Imagerie 3D", desc: "Diagnostics ultra précis.", grad: "from-violet-soft to-violet-deep", icon: <><path d="M2 12s5-7 10-7 10 7 10 7-5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></> },
  { title: "Laser Médical", desc: "Soins sans douleur.", grad: "from-azure to-royal", icon: <><path d="M2 12l4-4 4 4-4 4z" /><path d="M14 6l8 8M12 14l8 8" /></> },
  { title: "CAD/CAM", desc: "Facettes sur mesure.", grad: "from-gold to-violet-soft", icon: <path d="M3 12h4l3-9 4 18 3-9h4" /> },
  { title: "Stérilisation", desc: "Hygiène hospitalière.", grad: "from-violet-deep to-azure", icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
];

export default function Technology() {
  return (
    <section id="technologie" className="relative py-24 md:py-32 lg:py-40 bg-ink text-pearl overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-deep/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-azure/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 reveal">
          <div className="eyebrow mb-6" style={{ color: "#a78bfa" }}><span>Technologie · Précision</span></div>
          <h2 className="font-serif font-light text-[40px] sm:text-5xl lg:text-7xl leading-[1.05] mb-8">
            Un cabinet où la{" "}
            <span className="italic" style={{ background: "linear-gradient(135deg,#a78bfa,#d4af7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              technologie
            </span>{" "}
            sert le confort.
          </h2>
          <p className="text-pearl/70 text-lg font-light leading-relaxed mb-12">
            Équipements de dernière génération, normes d&apos;hygiène strictes et protocoles modernes pour des soins précis, sûrs et agréables.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {techs.map((t, i) => (
              <div key={i} className="glass-dark p-6 rounded-2xl">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.grad} flex items-center justify-center mb-4`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">{t.icon}</svg>
                </div>
                <div className="font-serif text-xl mb-1">{t.title}</div>
                <div className="text-pearl/60 text-sm">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 reveal flex justify-center">
          <div className="orbit">
            <div className="orbit-ring" />
            <div className="orbit-ring r2" />
            <div className="orbit-ring r3" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-56 h-56 rounded-full overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(124,58,237,0.5)]">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80"
                  alt="Technologie Dentalida"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-royal/50 via-transparent to-violet-soft/40 mix-blend-overlay" />
                <div className="absolute inset-2 rounded-full border border-white/15" />
              </div>
            </div>

            <div className="absolute inset-0" style={{ animation: "spinR 30s linear infinite" }}>
              <div className="orbit-dot" style={{ top: 0, left: "50%", background: "#3b82f6", boxShadow: "0 0 30px #3b82f6" }} />
              <div className="orbit-dot" style={{ bottom: 0, left: "50%", background: "#a78bfa", boxShadow: "0 0 30px #a78bfa" }} />
              <div className="orbit-dot" style={{ top: "50%", left: 0, background: "#d4af7a", boxShadow: "0 0 30px #d4af7a" }} />
              <div className="orbit-dot" style={{ top: "50%", right: 0, background: "#7c3aed", boxShadow: "0 0 30px #7c3aed" }} />
            </div>

            <div className="absolute top-4 right-8 text-xs text-pearl/60 font-mono">PRECISION · 99.8%</div>
            <div className="absolute bottom-8 left-4 text-xs text-pearl/60 font-mono">STERILE · ISO</div>
          </div>
        </div>
      </div>
    </section>
  );
}
