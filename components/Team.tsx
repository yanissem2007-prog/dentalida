const expertise = [
  "Esthétique dentaire",
  "Implantologie",
  "Hollywood Smile",
  "Orthodontie",
];

import ParallaxImage from "./ParallaxImage";

export default function Team() {
  return (
    <section id="equipe" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-ink text-pearl">
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-pearl/10 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 noise opacity-40" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-violet-deep/20 blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[35vw] h-[35vw] rounded-full bg-royal/20 blur-[150px]" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Portrait */}
        <div className="lg:col-span-5 reveal">
          <div className="clip-reveal relative aspect-[4/5] rounded-[28px] overflow-hidden max-w-md mx-auto lg:mx-0">
            <ParallaxImage src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=88" alt="Dr. Medjtouh — Chirurgien-dentiste" speed={18} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-serif text-3xl mb-1">Dr. Medjtouh</div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-pearl/60">Fondatrice · Chirurgien-dentiste</div>
            </div>
            {/* Rating chip */}
            <div className="absolute top-5 right-5 glass-dark rounded-2xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[0,1,2,3,4].map(i => <svg key={i} className="w-3 h-3" viewBox="0 0 24 24"><path className="star-fill" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <span className="text-[11px] text-pearl/80">5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="lg:col-span-6 lg:col-start-7 reveal-stagger">
          <div className="eyebrow mb-7" style={{ color: "#a78bfa" }}><span>Votre praticienne</span></div>
          <h2 className="font-serif font-light text-[36px] sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] mb-8">
            <span className="line"><span>Une main experte,</span></span>
            <span className="line"><span className="italic" style={{ background: "linear-gradient(120deg,#a78bfa,#c9a96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>un regard d&apos;artiste.</span></span>
          </h2>
          <p className="text-pearl/70 text-lg font-light leading-relaxed mb-6 max-w-[52ch]">
            Reconnue pour sa douceur et sa précision, le Dr. Medjtouh accompagne chaque patient avec écoute et exigence. De la phobie surmontée au sourire transformé, sa réputation se lit dans les mots de celles et ceux qu&apos;elle a soignés.
          </p>
          <p className="text-pearl/55 text-base font-light leading-relaxed mb-10 max-w-[52ch] italic font-serif">
            « Très compétente, minutieuse dans son travail, et surtout douce. » — Asmaa, patiente
          </p>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {expertise.map((e, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-pearl/15 text-[13px] text-pearl/75">{e}</span>
            ))}
          </div>

          <a href="#rdv" data-magnetic className="btn-ghost !text-pearl !border-pearl/25 hover:!bg-pearl hover:!text-ink">
            <span>Consulter le Dr. Medjtouh</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
