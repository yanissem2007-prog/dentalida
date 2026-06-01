"use client";
import Star from "./Star";

const reviews = [
  { name: "Hadoula Dz", initial: "H", grad: "from-royal to-violet-deep", text: "Vous m'avez fait un excellent travail, très satisfaite. Un dentiste compétent qui travaille avec le cœur, elle a changé ma vie et m'a rendu le sourire.", proc: "Hollywood Smile" },
  { name: "Asmaa Messedaa", initial: "A", grad: "from-violet-soft to-gold", text: "J'ai pu enfin surmonter ma phobie des dentistes grâce à Dentalida. Très compétente, minutieuse, et surtout douce.", proc: "Soins esthétiques" },
  { name: "Mohamed Chenane", initial: "M", grad: "from-deep to-azure", text: "Excellente équipe. Très satisfait de mon Hollywood Smile. Sans exagérer, ça ressemble à ceux des stars.", proc: "Hollywood Smile" },
  { name: "Sehad Dalia", initial: "S", grad: "from-gold to-royal", text: "Je recommande fortement Dentalida, qui fait un travail exceptionnel et très professionnel.", proc: "Consultation" },
  { name: "Lydia Abbas", initial: "L", grad: "from-azure to-violet-soft", text: "Un travail parfait, des dentistes très respectueux, avec un prix raisonnable. Je vous conseille d'y aller.", proc: "Réhabilitation" },
];

const Card = ({ r, sm = false }: { r: typeof reviews[0]; sm?: boolean }) => (
  <div className={`flex-shrink-0 w-[300px] sm:w-[360px] ${sm ? "lg:w-[340px]" : "lg:w-[420px]"} glass rounded-3xl p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]`}>
    <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${r.grad} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700`} />
    <div className="relative">
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} />)}
        </div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-ink/40 font-mono">{r.proc}</span>
      </div>
      <p className="font-serif italic text-lg leading-snug text-ink/85 mb-6">&laquo; {r.text} &raquo;</p>
      <div className="flex items-center gap-3 pt-5 border-t border-ink/10">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.grad} flex items-center justify-center text-white font-medium text-sm`}>{r.initial}</div>
        <div className="flex-1">
          <div className="font-medium text-sm">{r.name}</div>
          <div className="text-[10px] text-ink/40 uppercase tracking-[0.2em]">Google Reviews</div>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-ink/15">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const row1 = reviews;
  const row2 = [...reviews].reverse();

  return (
    <section id="temoignages" className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-pearl via-silver to-pearl">
      <div className="absolute inset-0 noise opacity-50" />
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-soft/20 blur-[140px]" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-azure/15 blur-[140px]" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative mb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-end reveal">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-7"><span>Témoignages · Vérifiés Google</span></div>
            <h2 className="font-serif font-light text-[40px] sm:text-6xl lg:text-7xl leading-[1.04] tracking-[-0.03em]">
              <span className="line"><span>Des sourires</span></span>
              <span className="line"><span className="italic grad-text">qui parlent pour nous.</span></span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-3">
            <div className="font-serif text-6xl lg:text-7xl grad-text leading-none">5.0</div>
            <div className="lg:text-right">
              <div className="flex gap-1 mb-2 lg:justify-end">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} />)}
              </div>
              <div className="idx text-ink/45">+1000 patients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-moving rows */}
      <div className="relative" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
        <div className="flex gap-5 mb-6 will-change-transform" style={{ animation: "tickerLeft 60s linear infinite", width: "max-content" }}>
          {[...row1, ...row1].map((r, i) => <Card key={i} r={r} />)}
        </div>
        <div className="flex gap-5 will-change-transform" style={{ animation: "tickerRight 75s linear infinite", width: "max-content" }}>
          {[...row2, ...row2].map((r, i) => <Card key={i} r={r} sm />)}
        </div>
      </div>

      {/* CTA strip */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-20 reveal">
        <div className="relative overflow-hidden rounded-[32px] bg-ink text-pearl p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-deep/40 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-royal/30 blur-[120px]" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.4em] text-pearl/50 mb-3 font-mono">Rejoignez la communauté</div>
            <div className="font-serif text-3xl lg:text-5xl font-light leading-[1.05]">
              Votre histoire <span className="italic grad-text">commence ici.</span>
            </div>
          </div>
          <a href="#rdv" className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pearl text-ink font-medium hover:scale-105 transition-transform">
            <span>Réserver</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
