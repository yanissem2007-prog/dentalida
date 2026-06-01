"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Appt = {
  id: number;
  name: string;
  phone: string;
  service: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};
type TeamUser = { id: number; email: string; name: string; role: string };
type Session = { name: string; role: string; email: string };
type View = "overview" | "demandes" | "equipe" | "parametres";

const STATUSES = ["nouveau", "contacté", "confirmé", "annulé"];
const STATUS_DOT: Record<string, string> = { nouveau: "bg-blue-500", "contacté": "bg-amber-500", "confirmé": "bg-emerald-500", "annulé": "bg-rose-500" };
const STATUS_PILL: Record<string, string> = {
  nouveau: "bg-blue-50 text-blue-700 border-blue-200",
  "contacté": "bg-amber-50 text-amber-700 border-amber-200",
  "confirmé": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "annulé": "bg-rose-50 text-rose-700 border-rose-200",
};

const fmtDate = (iso: string) => { try { return new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return iso; } };
const fmtShort = (iso: string) => { try { return new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); } catch { return iso; } };
const waLink = (phone: string) => `https://wa.me/${phone.replace(/[^0-9]/g, "").replace(/^0/, "213")}`;

const Ico = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  inbox: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5z" /></>,
  team: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  trend: <><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>,
  refresh: <><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
  menu: <><path d="M3 12h18M3 6h18M3 18h18" /></>,
  close: <><path d="M18 6 6 18M6 6l12 12" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5M12 15V3" /></>,
  trash: <><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  sort: <path d="M8 9l4-5 4 5M16 15l-4 5-4-5" />,
};
const I = ({ d, s = 18 }: { d: React.ReactNode; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export default function AdminClient({ initial, team, session }: { initial: Appt[]; team: TeamUser[]; session: Session }) {
  const router = useRouter();
  const [rows, setRows] = useState<Appt[]>(initial);
  const [view, setView] = useState<View>("overview");
  const [filter, setFilter] = useState("tous");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [selected, setSelected] = useState<Appt | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);
  const [sort, setSort] = useState<{ key: "created_at" | "name" | "status"; dir: "asc" | "desc" }>({ key: "created_at", dir: "desc" });
  // settings
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; t: string } | null>(null);

  const counts = useMemo(() => { const c: Record<string, number> = { tous: rows.length }; STATUSES.forEach((s) => (c[s] = rows.filter((r) => r.status === s).length)); return c; }, [rows]);
  const conv = rows.length ? Math.round((counts["confirmé"] / rows.length) * 100) : 0;

  const series = useMemo(() => [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i)); const key = d.toISOString().slice(0, 10);
    return { label: d.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""), count: rows.filter((r) => r.created_at.slice(0, 10) === key).length };
  }), [rows]);
  const maxDay = Math.max(1, ...series.map((s) => s.count));
  const weekTotal = series.reduce((a, s) => a + s.count, 0);

  const topServices = useMemo(() => { const m: Record<string, number> = {}; rows.forEach((r) => { const s = r.service || "Autre"; m[s] = (m[s] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 5); }, [rows]);

  const visible = useMemo(() => {
    let v = rows.filter((r) => {
      if (filter !== "tous" && r.status !== filter) return false;
      if (query) { const q = query.toLowerCase(); return r.name.toLowerCase().includes(q) || r.phone.includes(q) || (r.service || "").toLowerCase().includes(q); }
      return true;
    });
    v = [...v].sort((a, b) => {
      let r = 0;
      if (sort.key === "name") r = a.name.localeCompare(b.name);
      else if (sort.key === "status") r = a.status.localeCompare(b.status);
      else r = a.created_at.localeCompare(b.created_at);
      return sort.dir === "asc" ? r : -r;
    });
    return v;
  }, [rows, filter, query, sort]);

  const toggleSort = (key: typeof sort.key) => setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  const openDetail = (a: Appt) => { setSelected(a); setNoteDraft(a.notes || ""); setConfirmDel(false); };
  const closeDetail = () => { setSelected(null); setConfirmDel(false); };

  const updateStatus = async (id: number, status: string) => {
    setBusy(id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    try { await fetch("/api/admin/appointments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); } finally { setBusy(null); }
  };
  const saveNotes = async () => {
    if (!selected) return;
    const id = selected.id;
    setBusy(id);
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, notes: noteDraft } : r)));
    setSelected((s) => (s ? { ...s, notes: noteDraft } : s));
    try { await fetch("/api/admin/appointments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, notes: noteDraft }) }); } finally { setBusy(null); }
  };
  const deleteAppt = async () => {
    if (!selected) return;
    const id = selected.id;
    setRows((rs) => rs.filter((r) => r.id !== id));
    closeDetail();
    await fetch("/api/admin/appointments", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
  };

  const exportCSV = () => {
    const header = ["Nom", "Téléphone", "Soin", "Date souhaitée", "Statut", "Message", "Notes", "Reçu le"];
    const lines = rows.map((r) => [r.name, r.phone, r.service || "", r.preferred_date || "", r.status, (r.message || "").replace(/\n/g, " "), (r.notes || "").replace(/\n/g, " "), fmtDate(r.created_at)]);
    const csv = [header, ...lines].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `dentalida-rdv-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (pw.next !== pw.confirm) { setPwMsg({ ok: false, t: "Les mots de passe ne correspondent pas" }); return; }
    const res = await fetch("/api/admin/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current: pw.current, next: pw.next }) });
    const data = await res.json();
    if (data.ok) { setPwMsg({ ok: true, t: "Mot de passe mis à jour ✓" }); setPw({ current: "", next: "", confirm: "" }); }
    else setPwMsg({ ok: false, t: data.error || "Erreur" });
  };

  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/login"); router.refresh(); };

  const nav = [
    { k: "overview", label: "Vue d'ensemble", icon: Ico.grid },
    { k: "demandes", label: "Demandes", icon: Ico.inbox, badge: counts["nouveau"] || 0 },
    ...(session.role === "admin" ? [{ k: "equipe", label: "Équipe", icon: Ico.team }] : []),
    { k: "parametres", label: "Paramètres", icon: Ico.settings },
  ] as const;

  const Sidebar = (
    <div className="h-full flex flex-col bg-ink text-pearl">
      <div className="px-6 py-6 flex items-center gap-3 border-b border-white/8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal to-violet-deep flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2C8 2 5 5 5 8c0 4 2 5 2 9 0 2 1 5 2 5s2-3 2-5c0-1 .5-2 1-2s1 1 1 2c0 2 1 5 2 5s2-3 2-5c0-4 2-5 2-9 0-3-3-6-7-6z" /></svg>
        </div>
        <div><div className="font-serif text-xl leading-none">Dentalida</div><div className="text-[9px] uppercase tracking-[0.3em] text-pearl/40 mt-1">Administration</div></div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.25em] text-pearl/30">Menu</div>
        {nav.map((n) => {
          const active = view === n.k;
          return (
            <button key={n.k} onClick={() => { setView(n.k as View); setDrawer(false); }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${active ? "bg-white/10 text-pearl" : "text-pearl/55 hover:text-pearl hover:bg-white/5"}`}>
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-gold" />}
              <span className={active ? "text-gold" : ""}><I d={n.icon} /></span>
              <span className="flex-1 text-left">{n.label}</span>
              {"badge" in n && n.badge > 0 && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-royal text-white">{n.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/8">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white ${session.role === "admin" ? "bg-gradient-to-br from-gold to-royal" : "bg-gradient-to-br from-royal to-violet-deep"}`}>{session.name.charAt(0)}</div>
          <div className="min-w-0 flex-1"><div className="text-sm font-medium truncate">{session.name}</div><div className="text-[10px] uppercase tracking-[0.15em] text-pearl/40">{session.role === "admin" ? "Administrateur" : "Manager"}</div></div>
        </div>
        <button onClick={logout} className="mt-1 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-pearl/55 hover:text-pearl hover:bg-white/5 transition"><I d={Ico.logout} /> Déconnexion</button>
      </div>
    </div>
  );

  const SortTh = ({ label, k }: { label: string; k: typeof sort.key }) => (
    <th className="py-3.5 px-4 font-semibold cursor-pointer select-none" onClick={() => toggleSort(k)}>
      <span className="inline-flex items-center gap-1">{label}<span className={`opacity-40 ${sort.key === k ? "text-royal opacity-100" : ""}`}><I d={Ico.sort} s={12} /></span></span>
    </th>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-ink flex" style={{ cursor: "auto" }}>
      <aside className="hidden lg:block w-[260px] shrink-0 fixed inset-y-0 left-0">{Sidebar}</aside>
      {drawer && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setDrawer(false)} />}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-500 ${drawer ? "translate-x-0" : "-translate-x-full"}`}>{Sidebar}</aside>

      <div className="flex-1 lg:ml-[260px] min-w-0">
        <header className="sticky top-0 z-30 bg-[#f3f4f8]/80 backdrop-blur-xl border-b border-ink/8">
          <div className="px-5 sm:px-8 py-4 flex items-center gap-4">
            <button onClick={() => setDrawer(true)} className="lg:hidden w-10 h-10 rounded-xl bg-white border border-ink/10 flex items-center justify-center"><I d={Ico.menu} /></button>
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl lg:text-3xl font-light leading-none">{view === "overview" ? "Vue d'ensemble" : view === "demandes" ? "Demandes de rendez-vous" : view === "equipe" ? "Équipe" : "Paramètres"}</h1>
              <p className="text-ink/45 text-xs mt-1 hidden sm:block">Bonjour {session.name.split(" ")[0]}, voici l&apos;activité du cabinet.</p>
            </div>
            {view === "demandes" && <button onClick={exportCSV} className="hidden sm:flex h-10 items-center gap-2 px-4 rounded-xl bg-white border border-ink/10 text-sm text-ink/70 hover:text-ink hover:border-ink/25 transition"><I d={Ico.download} s={15} /> Export CSV</button>}
            <button onClick={() => router.refresh()} className="w-10 h-10 rounded-xl bg-white border border-ink/10 flex items-center justify-center text-ink/60 hover:text-ink hover:border-ink/25 transition" title="Actualiser"><I d={Ico.refresh} s={16} /></button>
            <a href="/" target="_blank" className="hidden md:flex h-10 items-center gap-2 px-4 rounded-xl bg-white border border-ink/10 text-sm text-ink/70 hover:text-ink hover:border-ink/25 transition">Voir le site ↗</a>
          </div>
        </header>

        <main className="px-5 sm:px-8 py-7">
          {view === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total demandes", value: counts.tous, icon: Ico.inbox, soft: "bg-blue-50 text-royal" },
                  { label: "Nouveaux", value: counts["nouveau"], icon: Ico.star, soft: "bg-amber-50 text-amber-600" },
                  { label: "Confirmés", value: counts["confirmé"], icon: Ico.check, soft: "bg-emerald-50 text-emerald-600" },
                  { label: "Taux de conversion", value: conv + "%", icon: Ico.trend, soft: "bg-violet-50 text-violet-deep" },
                ].map((k, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${k.soft}`}><I d={k.icon} /></div>
                    <div className="font-serif text-3xl lg:text-4xl leading-none">{k.value}</div>
                    <div className="text-ink/45 text-xs mt-2 uppercase tracking-[0.12em]">{k.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)]">
                  <div className="flex items-center justify-between mb-6">
                    <div><div className="font-medium">Demandes — 7 derniers jours</div><div className="text-ink/40 text-xs mt-0.5">Évolution quotidienne</div></div>
                    <div className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">{weekTotal} cette semaine</div>
                  </div>
                  <div className="flex items-end justify-between gap-3 h-40">
                    {series.map((s, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full flex items-end justify-center h-32">
                          <div className="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t from-royal to-violet-deep relative transition-all duration-500 group-hover:opacity-90" style={{ height: `${(s.count / maxDay) * 100}%`, minHeight: s.count ? 6 : 2 }}>
                            {s.count > 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-ink/70">{s.count}</span>}
                          </div>
                        </div>
                        <span className="text-[11px] text-ink/40 capitalize">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)]">
                  <div className="font-medium mb-1">Soins demandés</div><div className="text-ink/40 text-xs mb-5">Répartition</div>
                  {topServices.length === 0 ? <div className="text-ink/35 text-sm py-8 text-center">Aucune donnée</div> : (
                    <div className="space-y-4">{topServices.map(([name, n], i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5"><span className="text-ink/70 truncate pr-2">{name}</span><span className="text-ink/40">{n}</span></div>
                        <div className="h-2 rounded-full bg-ink/5 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-royal to-gold" style={{ width: `${(n / rows.length) * 100}%` }} /></div>
                      </div>
                    ))}</div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-ink/6"><div className="font-medium">Dernières demandes</div><button onClick={() => setView("demandes")} className="text-xs text-royal hover:underline">Tout voir →</button></div>
                {rows.length === 0 ? <div className="px-6 py-12 text-center text-ink/35 text-sm">Aucune demande pour le moment.</div> : (
                  <div className="divide-y divide-ink/5">{rows.slice(0, 5).map((r) => (
                    <button key={r.id} onClick={() => openDetail(r)} className="w-full text-left flex items-center gap-4 px-6 py-3.5 hover:bg-ink/[0.015]">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal/15 to-violet-deep/15 flex items-center justify-center text-royal text-sm font-semibold">{r.name.charAt(0)}</div>
                      <div className="min-w-0 flex-1"><div className="font-medium text-sm truncate">{r.name}</div><div className="text-ink/45 text-xs truncate">{r.service || "—"} · {r.phone}</div></div>
                      <span className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border ${STATUS_PILL[r.status]}`}><span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status]}`} />{r.status}</span>
                      <span className="text-ink/35 text-xs whitespace-nowrap hidden md:block">{fmtShort(r.created_at)}</span>
                    </button>
                  ))}</div>
                )}
              </div>
            </div>
          )}

          {view === "demandes" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {[{ k: "tous", label: "Toutes" }, ...STATUSES.map((s) => ({ k: s, label: s }))].map((s) => (
                    <button key={s.k} onClick={() => setFilter(s.k)} className={`px-3.5 py-2 rounded-full text-xs font-medium capitalize border transition ${filter === s.k ? "bg-ink text-pearl border-ink" : "bg-white text-ink/60 border-ink/10 hover:border-ink/30"}`}>{s.label} <span className="opacity-50">{counts[s.k] ?? 0}</span></button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"><I d={Ico.search} s={16} /></span>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="w-full bg-white border border-ink/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-royal/40 transition" />
                  </div>
                  <button onClick={exportCSV} className="sm:hidden w-10 h-10 rounded-xl bg-white border border-ink/10 flex items-center justify-center text-ink/60"><I d={Ico.download} s={16} /></button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)] overflow-hidden">
                {visible.length === 0 ? <div className="px-6 py-16 text-center text-ink/35 text-sm">Aucune demande {filter !== "tous" ? `« ${filter} »` : ""}.</div> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[860px]">
                      <thead>
                        <tr className="text-left text-[10px] uppercase tracking-[0.15em] text-ink/40 bg-ink/[0.02]">
                          <SortTh label="Patient" k="name" />
                          <th className="py-3.5 px-4 font-semibold">Contact</th>
                          <th className="py-3.5 px-4 font-semibold">Soin</th>
                          <th className="py-3.5 px-4 font-semibold">Date souhaitée</th>
                          <SortTh label="Reçu" k="created_at" />
                          <SortTh label="Statut" k="status" />
                          <th className="py-3.5 px-4 font-semibold"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/5">
                        {visible.map((r) => (
                          <tr key={r.id} className="hover:bg-ink/[0.015] align-top cursor-pointer" onClick={() => openDetail(r)}>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal/15 to-violet-deep/15 flex items-center justify-center text-royal text-sm font-semibold shrink-0">{r.name.charAt(0)}</div>
                                <div className="min-w-0"><div className="font-medium flex items-center gap-1.5">{r.name}{r.notes && <span className="text-gold" title="Note interne"><I d={Ico.msg} s={12} /></span>}</div>{r.message && <div className="text-ink/40 text-xs mt-0.5 max-w-[180px] truncate">{r.message}</div>}</div>
                              </div>
                            </td>
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <a href={`tel:${r.phone}`} className="w-8 h-8 rounded-lg bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-ink/60" title="Appeler"><I d={Ico.phone} s={14} /></a>
                                <a href={waLink(r.phone)} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center text-emerald-600" title="WhatsApp"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.9 1.2 2.9.8 3.4.8.5 0 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z" /></svg></a>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-ink/70">{r.service || "—"}</td>
                            <td className="py-4 px-4 text-ink/50">{r.preferred_date || "—"}</td>
                            <td className="py-4 px-4 text-ink/45 whitespace-nowrap">{fmtShort(r.created_at)}</td>
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="relative inline-block">
                                <select value={r.status} disabled={busy === r.id} onChange={(e) => updateStatus(r.id, e.target.value)} className={`appearance-none pl-7 pr-7 py-1.5 rounded-full border text-xs capitalize font-medium cursor-pointer focus:outline-none ${STATUS_PILL[r.status]}`}>
                                  {STATUSES.map((s) => <option key={s} value={s} className="bg-white text-ink">{s}</option>)}
                                </select>
                                <span className={`absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status]} pointer-events-none`} />
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"><path d="M6 9l6 6 6-6" /></svg>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-ink/30 text-lg leading-none">›</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {view === "equipe" && session.role === "admin" && (
            <div>
              <p className="text-ink/50 text-sm mb-6">Comptes ayant accès au tableau de bord.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((u) => (
                  <div key={u.id} className="bg-white rounded-2xl p-5 border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white ${u.role === "admin" ? "bg-gradient-to-br from-gold to-royal" : "bg-gradient-to-br from-royal to-violet-deep"}`}>{u.name.charAt(0)}</div>
                      <div className="min-w-0"><div className="font-medium truncate">{u.name}</div><span className={`text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-amber-50 text-amber-700" : "bg-ink/5 text-ink/55"}`}>{u.role === "admin" ? "Admin" : "Manager"}</span></div>
                    </div>
                    <div className="text-ink/50 text-xs border-t border-ink/6 pt-3 truncate">{u.email}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "parametres" && (
            <div className="max-w-lg">
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-ink/6 shadow-[0_2px_20px_-12px_rgba(10,20,40,.2)]">
                <div className="font-medium text-lg mb-1">Mon compte</div>
                <div className="text-ink/45 text-sm mb-6">{session.email} · {session.role === "admin" ? "Administrateur" : "Manager"}</div>
                <form onSubmit={changePassword} className="space-y-4">
                  <div className="font-medium text-sm pt-2">Changer mon mot de passe</div>
                  {pwMsg && <div className={`text-sm px-4 py-2.5 rounded-xl ${pwMsg.ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{pwMsg.t}</div>}
                  <input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} placeholder="Mot de passe actuel" required className="w-full bg-[#f3f4f8] border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-royal/40" />
                  <input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} placeholder="Nouveau mot de passe" required className="w-full bg-[#f3f4f8] border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-royal/40" />
                  <input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} placeholder="Confirmer le nouveau mot de passe" required className="w-full bg-[#f3f4f8] border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-royal/40" />
                  <button type="submit" className="px-6 py-3 rounded-full bg-ink text-pearl text-sm font-medium hover:opacity-90 transition">Mettre à jour</button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Detail drawer */}
      {selected && <div className="fixed inset-0 z-50 bg-black/40" onClick={closeDetail} />}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white shadow-2xl transition-transform duration-500 ${selected ? "translate-x-0" : "translate-x-full"}`}>
        {selected && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-royal to-violet-deep flex items-center justify-center text-white font-semibold">{selected.name.charAt(0)}</div>
                <div><div className="font-serif text-xl leading-none">{selected.name}</div><div className="text-ink/45 text-xs mt-1">Reçu le {fmtDate(selected.created_at)}</div></div>
              </div>
              <button onClick={closeDetail} className="w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-ink/60"><I d={Ico.close} s={16} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Status */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-2">Statut</div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 rounded-full text-xs capitalize border font-medium transition ${selected.status === s ? STATUS_PILL[s] : "bg-white text-ink/50 border-ink/10 hover:border-ink/30"}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle ${STATUS_DOT[s]}`} />{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${selected.phone}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-ink text-pearl text-sm font-medium"><I d={Ico.phone} s={15} /> Appeler</a>
                <a href={waLink(selected.phone)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-medium"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.9 1.2 2.9.8 3.4.8.5 0 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z" /></svg> WhatsApp</a>
              </div>

              {/* Info */}
              <div className="space-y-3">
                {[
                  { label: "Téléphone", value: selected.phone, icon: Ico.phone },
                  { label: "Soin souhaité", value: selected.service || "—", icon: Ico.star },
                  { label: "Date souhaitée", value: selected.preferred_date || "—", icon: Ico.calendar },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#f3f4f8]">
                    <span className="text-ink/40"><I d={it.icon} s={16} /></span>
                    <div className="min-w-0"><div className="text-[10px] uppercase tracking-[0.15em] text-ink/40">{it.label}</div><div className="text-sm font-medium truncate">{it.value}</div></div>
                  </div>
                ))}
              </div>

              {selected.message && (
                <div><div className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-2">Message du patient</div><div className="text-sm text-ink/70 bg-[#f3f4f8] rounded-xl p-4 leading-relaxed">{selected.message}</div></div>
              )}

              {/* Internal notes */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-2">Notes internes</div>
                <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} rows={4} placeholder="Ajouter une note (visible par l'équipe uniquement)…" className="w-full bg-[#f3f4f8] border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-royal/40 resize-none" />
                <button onClick={saveNotes} disabled={busy === selected.id || noteDraft === (selected.notes || "")} className="mt-2 px-4 py-2 rounded-full bg-ink text-pearl text-xs font-medium disabled:opacity-40 transition">Enregistrer la note</button>
              </div>
            </div>

            {/* Danger */}
            <div className="px-6 py-4 border-t border-ink/8">
              {!confirmDel ? (
                <button onClick={() => setConfirmDel(true)} className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700"><I d={Ico.trash} s={15} /> Supprimer cette demande</button>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-ink/60">Confirmer la suppression ?</span>
                  <div className="flex gap-2">
                    <button onClick={() => setConfirmDel(false)} className="px-3 py-1.5 rounded-full bg-ink/5 text-sm">Annuler</button>
                    <button onClick={deleteAppt} className="px-3 py-1.5 rounded-full bg-rose-600 text-white text-sm font-medium">Supprimer</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
