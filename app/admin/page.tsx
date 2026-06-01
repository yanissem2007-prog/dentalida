import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSql, hasDb, type AppointmentRow, type UserRow } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  let appointments: AppointmentRow[] = [];
  let team: Array<Pick<UserRow, "id" | "email" | "name" | "role">> = [];
  let dbError = false;

  if (hasDb()) {
    try {
      const sql = getSql();
      appointments = (await sql`select * from appointments order by created_at desc`) as unknown as AppointmentRow[];
      if (session.role === "admin") {
        team = (await sql`select id, email, name, role from users order by role, id`) as unknown as typeof team;
      }
    } catch {
      dbError = true;
    }
  } else {
    dbError = true;
  }

  if (dbError) {
    return (
      <main className="min-h-screen bg-ink text-pearl flex items-center justify-center px-5">
        <div className="max-w-lg text-center">
          <div className="font-serif text-3xl mb-4">Base non configurée</div>
          <p className="text-pearl/55 mb-6">
            Connecte une base Postgres (<code className="text-gold">DATABASE_URL</code>) puis lance{" "}
            <code className="text-gold">/api/seed?secret=…</code> pour initialiser les tables et les comptes.
          </p>
          <a href="/login" className="text-pearl/60 hover:text-pearl">← Connexion</a>
        </div>
      </main>
    );
  }

  return (
    <AdminClient
      initial={appointments.map((a) => ({
        id: a.id,
        name: a.name,
        phone: a.phone,
        service: a.service,
        preferred_date: a.preferred_date,
        message: a.message,
        status: a.status,
        notes: a.notes ?? null,
        created_at: typeof a.created_at === "string" ? a.created_at : new Date(a.created_at).toISOString(),
      }))}
      team={team}
      session={{ name: session.name, role: session.role, email: session.email }}
    />
  );
}
