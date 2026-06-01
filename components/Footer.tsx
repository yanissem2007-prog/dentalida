import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#06101f] text-pearl/80 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <a href="#" className="flex items-center gap-3 mb-6">
              <Logo size={52} />
              <span className="font-serif text-3xl tracking-wider text-white">Dentalida</span>
            </a>
            <p className="font-light leading-relaxed max-w-md mb-8">Cabinet dentaire premium au cœur d&apos;Alger. Excellence médicale, technologies modernes et soins personnalisés pour un sourire à votre image.</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/dentalida/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-pearl/15 flex items-center justify-center hover:bg-pearl/10 hover:border-gold transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.facebook.com/CabinetDentaire.Dentalida.HaiElbadr/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-pearl/15 flex items-center justify-center hover:bg-pearl/10 hover:border-gold transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
              </a>
              <a href="tel:+213553994355" className="w-11 h-11 rounded-full border border-pearl/15 flex items-center justify-center hover:bg-pearl/10 hover:border-gold transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-widest text-gold mb-5">Navigation</div>
            <ul className="space-y-3 text-sm">
              <li><a href="#about">À propos</a></li>
              <li><a href="#services">Nos soins</a></li>
              <li><a href="#transformation">Transformations</a></li>
              <li><a href="#temoignages">Témoignages</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-widest text-gold mb-5">Soins</div>
            <ul className="space-y-3 text-sm">
              <li><a href="#services">Hollywood Smile</a></li>
              <li><a href="#services">Implants</a></li>
              <li><a href="#services">Orthodontie</a></li>
              <li><a href="#services">Laser</a></li>
              <li><a href="#services">Esthétique</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-widest text-gold mb-5">Contact</div>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><svg width="14" height="14" className="mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg><span>Cité CNEP Hai el Badr<br />Bt 23A n°3, Kouba, Alger</span></li>
              <li className="flex gap-3"><svg width="14" height="14" className="mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg><a href="tel:+213553994355">0553 99 43 55</a></li>
              <li className="flex gap-3"><svg width="14" height="14" className="mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg><span>Lun — Sam : 9h — 19h</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-pearl/10 flex flex-wrap justify-between items-center gap-4 text-xs text-pearl/40">
          <div>© 2026 Dentalida. Tous droits réservés.</div>
          <div>Cabinet Dentaire Premium · Alger, Algérie</div>
        </div>
      </div>
    </footer>
  );
}
