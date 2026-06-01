"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Comment se passe la première consultation ?",
    a: "Nous prenons le temps d'écouter vos attentes, d'examiner votre sourire et d'établir un plan de traitement personnalisé. Une simulation esthétique peut être réalisée pour les soins du sourire.",
  },
  {
    q: "Les soins sont-ils douloureux ?",
    a: "Notre priorité est votre confort. Anesthésie locale, technologie laser et gestes minutieux rendent la plupart des soins quasi indolores. Nous accompagnons aussi les patients anxieux avec beaucoup de douceur.",
  },
  {
    q: "Combien de temps dure un Hollywood Smile ?",
    a: "Selon le cas, la pose de facettes se déroule généralement sur quelques séances, sur environ deux semaines. Tout commence par une étude numérique validée avec vous avant la réalisation.",
  },
  {
    q: "Proposez-vous des facilités de paiement ?",
    a: "Chaque traitement fait l'objet d'un devis clair et transparent, discuté en consultation. N'hésitez pas à nous en parler pour étudier ensemble les modalités possibles.",
  },
  {
    q: "J'ai la phobie du dentiste, est-ce un problème ?",
    a: "Pas du tout — c'est même l'une de nos spécialités humaines. De nombreux patients ont surmonté leur appréhension chez Dentalida grâce à une approche patiente, rassurante et sans jugement.",
  },
  {
    q: "Comment prendre rendez-vous ?",
    a: "Par téléphone ou WhatsApp au 0553 99 43 55, ou directement via le formulaire de rendez-vous en bas de page. Nous vous recontactons rapidement pour confirmer un créneau.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-ink/[0.06] to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Sticky header */}
        <div className="lg:col-span-5 reveal">
          <div className="lg:sticky lg:top-32">
            <div className="eyebrow mb-7"><span>Questions fréquentes</span></div>
            <h2 className="font-serif font-light text-[40px] sm:text-6xl lg:text-7xl leading-[1.04] tracking-[-0.03em] mb-8">
              <span className="line"><span>Tout ce qu&apos;il faut</span></span>
              <span className="line"><span className="italic grad-text">savoir, simplement.</span></span>
            </h2>
            <p className="text-ink/60 text-lg font-light leading-relaxed mb-8 max-w-[40ch]">
              Une question avant de franchir le pas ? Voici l&apos;essentiel. Pour le reste, notre équipe vous répond avec plaisir.
            </p>
            <a href="#rdv" data-magnetic className="btn-primary">
              <span>Prendre Rendez-vous</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-6 lg:col-start-7 reveal">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-serif text-xl lg:text-2xl leading-snug transition-colors ${isOpen ? "text-ink" : "text-ink/70 group-hover:text-ink"}`}>
                      {f.q}
                    </span>
                    <span className={`mt-1.5 flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-ink border-ink rotate-45" : "border-ink/25"}`}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isOpen ? "#f7f5f0" : "currentColor"} strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="text-ink/60 font-light leading-relaxed pb-7 pr-12 max-w-[52ch]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
