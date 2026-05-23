export default function Social() {
  return (
    <section className="py-24 bg-gradient-to-b from-pearl to-silver overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-6 reveal-stagger">
          <a href="https://www.instagram.com/dentalida/" target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-3xl p-10 lg:p-14 bg-gradient-to-br from-violet-deep via-violet-soft to-gold transition-transform hover:scale-[1.02] duration-700">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, white, transparent 50%)" }} />
            <div className="relative flex items-center justify-between text-white">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] opacity-70 mb-3">Suivez-nous</div>
                <div className="font-serif text-4xl mb-2">@dentalida</div>
                <div className="opacity-80 text-sm">Découvrez nos transformations sur Instagram</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </div>
            </div>
          </a>

          <a href="https://www.facebook.com/CabinetDentaire.Dentalida.HaiElbadr/" target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-3xl p-10 lg:p-14 bg-gradient-to-br from-deep via-royal to-azure transition-transform hover:scale-[1.02] duration-700">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 80%, white, transparent 50%)" }} />
            <div className="relative flex items-center justify-between text-white">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] opacity-70 mb-3">Communauté</div>
                <div className="font-serif text-4xl mb-2">Dentalida</div>
                <div className="opacity-80 text-sm">Rejoignez notre page Facebook</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
