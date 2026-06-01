import AppointmentForm from "./AppointmentForm";

export default function Appointment() {
  return (
    <section id="rdv" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-ink text-pearl">
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-pearl/10 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 noise opacity-40" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-royal/25 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-deep/25 blur-[150px]" />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left — emotional */}
        <div className="lg:col-span-6 reveal">
          <div className="eyebrow mb-7" style={{ color: "#c9a96a" }}><span>Réserver · Sans engagement</span></div>
          <h2 className="font-serif font-light text-[44px] sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.03em] mb-8">
            <span className="line"><span>Le sourire que</span></span>
            <span className="line"><span className="italic" style={{ background: "linear-gradient(120deg,#a78bfa,#c9a96a,#fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>vous méritez</span></span>
            <span className="line"><span>commence ici.</span></span>
          </h2>
          <p className="text-pearl/65 text-lg font-light leading-relaxed max-w-[46ch] mb-10">
            Laissez-nous vos coordonnées : notre équipe vous recontacte rapidement pour fixer un créneau et répondre à toutes vos questions.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="tel:+213553994355" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-pearl/20 flex items-center justify-center group-hover:bg-pearl group-hover:text-ink transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <div className="idx text-pearl/45">Appelez-nous</div>
                <div className="font-serif text-xl">0553 99 43 55</div>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-pearl/50 text-sm">
            <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> Réponse sous 24h</div>
            <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7 7 .5-5 4.5 1.5 7L12 17l-6.5 4L7 14l-5-4.5L9 9z" /></svg> 5★ Google Reviews</div>
            <div className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" /></svg> Hygiène maximale</div>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-6 reveal">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
