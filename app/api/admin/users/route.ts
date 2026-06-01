import { NextResponse } from "next/server";
import { getSql, type UserRow } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Réservé à l'admin (middleware bloque déjà les managers).
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Réservé à l'administrateur" }, { status: 403 });
  }
  try {
    const sql = getSql();
    const rows = (await sql`select id, email, name, role, created_at from users order by role, id`) as unknown as Omit<UserRow, "password_hash">[];
    return NextResponse.json({ ok: true, users: rows });
  } catch {
    return NextResponse.json({ ok: false, error: "Base indisponible" }, { status: 500 });
  }
}
