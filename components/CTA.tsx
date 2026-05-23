export default function CTA() {
  return (
    <section id="rdv" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-ink text-pearl">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,.3), transparent 60%)" }} />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-royal/30 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-deep/30 blur-[150px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 text-center reveal">
        <div className="eyebrow justify-center mb-8 inline-flex" style={{ color: "#d4af7a" }}><span>Prêt à transformer votre sourire ?</span></div>
        <h2 className="font-serif font-light text-[44px] sm:text-6xl lg:text-[110px] leading-[0.96] tracking-[-0.03em] mb-8 lg:mb-10">
          Le sourire <span className="italic" style={{ background: "linear-gradient(135deg,#a78bfa,#d4af7a,#fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>que vous méritez</span>
          <br />
          commence ici.
        </h2>
        <p className="text-pearl/70 text-lg lg:text-xl font-light max-w-2xl mx-auto mb-12">
          Réservez une consultation personnalisée. Notre équipe vous accueille avec attention pour révéler la version la plus lumineuse de votre sourire.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="tel:+213553994355" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-pearl text-ink rounded-full font-medium overflow-hidden transition-transform hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Réserver une Consultation
            </span>
          </a>
          <a href="https://maps.app.goo.gl/FU8d6PwS19BBH8Qm8" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-5 border border-pearl/30 text-pearl rounded-full font-medium hover:bg-pearl hover:text-ink transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Voir l&apos;itinéraire
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 text-pearl/50 text-sm">
          <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> Réponse sous 24h</div>
          <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><path d="M12 2l3 7 7 .5-5 4.5 1.5 7L12 17l-6.5 4L7 14l-5-4.5L9 9z" /></svg> 5★ Google Reviews</div>
          <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" /></svg> Hygiène & sécurité maximales</div>
        </div>
      </div>
    </section>
  );
}
