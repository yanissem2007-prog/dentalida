"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Connexion impossible");
        setLoading(false);
        return;
      }
      router.replace(params.get("from") || "/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100svh] bg-ink text-pearl flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 noise opacity-40" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-royal/25 blur-[140px]" />
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full bg-violet-deep/25 blur-[140px]" />

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={56} />
          <div className="font-serif text-3xl tracking-wide mt-4">Dentalida</div>
          <div className="text-[11px] uppercase tracking-[0.35em] text-pearl/45 mt-2">Espace d&apos;administration</div>
        </div>

        <form onSubmit={onSubmit} className="glass-dark rounded-[28px] p-8">
          <h1 className="font-serif text-2xl mb-6">Connexion</h1>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-200 text-sm">{error}</div>
          )}

          <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="username"
            required
            className="w-full bg-white/5 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/30 text-sm focus:outline-none focus:border-violet-soft transition mb-5"
            placeholder="vous@exemple.com"
          />

          <label className="block text-[11px] uppercase tracking-[0.2em] text-pearl/50 mb-2">Mot de passe</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
            className="w-full bg-white/5 border border-pearl/15 rounded-xl px-4 py-3 text-pearl placeholder-pearl/30 text-sm focus:outline-none focus:border-violet-soft transition mb-7"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
            {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
          </button>
        </form>

        <a href="/" className="block text-center text-pearl/40 text-sm mt-6 hover:text-pearl transition">← Retour au site</a>
      </div>
    </main>
  );
}
