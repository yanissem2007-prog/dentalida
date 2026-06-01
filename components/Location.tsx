export default function Location() {
  return (
    <section id="contact" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-ink/[0.06] to-transparent pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="eyebrow justify-center mb-6 inline-flex"><span>Localisation · Alger</span></div>
          <h2 className="font-serif font-light text-[40px] sm:text-5xl lg:text-7xl leading-[1.05] tracking-[-0.02em] mb-6">
            Au cœur de <span className="italic grad-text">Hai El Badr.</span>
          </h2>
          <p className="text-ink/60 text-lg font-light">Facile d&apos;accès, dans un cadre moderne et accueillant.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 reveal">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=500&q=80" alt="Cabinet" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white text-[10px] uppercase tracking-[0.2em] font-mono">Cabinet</div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=500&q=80" alt="Équipement" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-deep/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white text-[10px] uppercase tracking-[0.2em] font-mono">Tech</div>
              </div>
            </div>
            <div className="relative aspect-[5/3] rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.0855%2C36.7100%2C3.1055%2C36.7250&layer=mapnik&marker=36.7175%2C3.0955"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: "saturate(0.8) contrast(1.05)" }}
                loading="lazy"
              />
              <div className="absolute top-4 left-4 glass rounded-2xl p-3 pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-royal to-violet-deep flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="font-medium text-xs">Hai El Badr, Kouba</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 reveal-stagger">
            <div className="glass rounded-3xl p-8 mb-4">
              <div className="text-xs uppercase tracking-widest text-royal mb-2">Adresse</div>
              <div className="font-serif text-2xl mb-4">Cité CNEP Hai el Badr<br />Bt 23A n°3, Kouba</div>
              <a href="https://maps.app.goo.gl/FU8d6PwS19BBH8Qm8" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-royal">
                Itinéraire
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
              </a>
            </div>

            <div className="glass rounded-3xl p-8 mb-4">
              <div className="text-xs uppercase tracking-widest text-royal mb-2">Téléphone</div>
              <a href="tel:+213553994355" className="font-serif text-2xl block mb-2">0553 99 43 55</a>
              <div className="text-sm text-ink/60">Réponse rapide, du lundi au samedi</div>
            </div>

            <div className="glass rounded-3xl p-8">
              <div className="text-xs uppercase tracking-widest text-royal mb-4">Horaires d&apos;ouverture</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ink/60">Lun — Jeu</span><span className="font-medium">9h00 — 19h00</span></div>
                <div className="flex justify-between"><span className="text-ink/60">Vendredi</span><span className="font-medium">9h00 — 12h00</span></div>
                <div className="flex justify-between"><span className="text-ink/60">Samedi</span><span className="font-medium">9h00 — 18h00</span></div>
                <div className="flex justify-between"><span className="text-ink/60">Dimanche</span><span className="font-medium text-ink/40">Fermé</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
