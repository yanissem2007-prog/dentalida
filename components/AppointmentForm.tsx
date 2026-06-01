"use client";
import { useState } from "react";

const services = [
  "Hollywood Smile", "Implant Dentaire", "Orthodontie", "LASER Dentaire",
  "Parodontologie", "Sourire Gingival", "Esthétique Dentaire", "Première consultation",
];

const WHATSAPP = "213553994355";

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: "", phone: "", service: services[7], date: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er: typeof errors = {};
    if (form.name.trim().length < 2) er.name = "Votre nom est requis";
    if (!/[0-9]{6,}/.test(form.phone.replace(/\s/g, ""))) er.phone = "Numéro invalide";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const buildWhatsApp = () => {
    const lines = [
      "Bonjour Dentalida, je souhaite prendre rendez-vous.",
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      `Soin : ${form.service}`,
      form.date ? `Date souhaitée : ${form.date}` : "",
      form.message ? `Message : ${form.message}` : "",
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // bot
    if (!validate()) return;

    // Best-effort record / email (works once RESEND_API_KEY is configured) — never blocks UX
    try {
      await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* silencieux — WhatsApp reste le canal garanti */
    }

    window.open(buildWhatsApp(), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="glass-dark rounded-[28px] p-8 lg:p-10 text-center min-h-[420px] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-royal to-violet-deep flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="font-serif text-3xl mb-3 text-pearl">Demande envoyée</h3>
        <p className="text-pearl/60 font-light mb-8 max-w-sm">
          Merci {form.name.split(" ")[0]} ! Votre demande s&apos;ouvre dans WhatsApp. Notre équipe vous recontacte rapidement pour confirmer votre créneau.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={buildWhatsApp()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.9 1.2 2.9.8 3.4.8.5 0 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" /></svg>
            Ouvrir WhatsApp
          </a>
          <a href="tel:+213553994355" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-pearl/25 text-pearl text-sm">Appeler</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-dark rounded-[28px] p-6 sm:p-8 lg:p-10">
      <div className="mb-6">
        <div className="font-serif text-2xl text-pearl mb-1">Demande de rendez-vous</div>
        <p className="text-pearl/50 text-sm font-light">Réponse rapide · Sans engagement</p>
      </div>

      {/* honeypot */}
      <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Nom complet *</label>
            <input value={form.name} onChange={set("name")} placeholder="Votre nom" className="w-full bg-white/5 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/30 text-sm focus:outline-none focus:border-violet-soft transition" />
            {errors.name && <span className="text-[11px] text-rose-300 mt-1 block">{errors.name}</span>}
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Téléphone *</label>
            <input value={form.phone} onChange={set("phone")} type="tel" inputMode="tel" placeholder="0X XX XX XX XX" className="w-full bg-white/5 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/30 text-sm focus:outline-none focus:border-violet-soft transition" />
            {errors.phone && <span className="text-[11px] text-rose-300 mt-1 block">{errors.phone}</span>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Soin souhaité</label>
            <div className="relative">
              <select value={form.service} onChange={set("service")} className="w-full bg-white/5 border border-pearl/15 rounded-xl pl-4 pr-10 py-3 text-pearl text-sm focus:outline-none focus:border-violet-soft transition appearance-none cursor-pointer">
                {services.map((s) => <option key={s} value={s} className="bg-ink text-pearl">{s}</option>)}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-4 top-1/2 -translate-y-1/2 text-pearl/50 pointer-events-none"><path d="M6 9l6 6 6-6" /></svg>
            </div>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Date préférée</label>
            <input value={form.date} onChange={set("date")} type="date" className="w-full bg-white/5 border border-pearl/15 rounded-xl px-4 py-3 text-pearl text-sm focus:outline-none focus:border-violet-soft transition [color-scheme:dark]" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Message (optionnel)</label>
          <textarea value={form.message} onChange={set("message")} rows={3} placeholder="Décrivez votre besoin…" className="w-full bg-white/5 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/30 text-sm focus:outline-none focus:border-violet-soft transition resize-none" />
        </div>
      </div>

      <button type="submit" className="mt-6 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors">
        Confirmer le rendez-vous
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </button>
      <p className="text-center text-[11px] text-pearl/40 mt-4">Vos informations restent confidentielles et ne servent qu&apos;à vous recontacter.</p>
    </form>
  );
}
