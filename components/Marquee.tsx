const items = [
  "Hollywood Smile",
  "Implant Dentaire",
  "Orthodontie",
  "LASER Dentaire",
  "Esthétique du Sourire",
  "Parodontologie",
  "Réhabilitation",
];

export default function Marquee() {
  return (
    <section className="py-12 border-y border-ink/10 bg-ink text-pearl overflow-hidden relative">
      <div className="marquee whitespace-nowrap">
        {[0, 1].map((g) => (
          <div key={g} className="flex items-center gap-8 sm:gap-12 font-serif text-2xl sm:text-4xl lg:text-5xl font-light pr-8 sm:pr-12" aria-hidden={g === 1}>
            {items.map((it, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="italic">{it}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-gold">
                  <path fill="currentColor" d="M12 2l1.5 4 4 1.5-4 1.5L12 13l-1.5-4-4-1.5 4-1.5z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
