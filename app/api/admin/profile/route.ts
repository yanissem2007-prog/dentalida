import { NextResponse } from "next/server";
import { getSql, type UserRow } from "@/lib/db";
import { getSession, verifyPassword, hashPassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Changement de son propre mot de passe.
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });

  let body: { current?: string; next?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalide" }, { status: 400 }); }

  const current = body.current || "";
  const next = body.next || "";
  if (next.length < 6) return NextResponse.json({ ok: false, error: "Le nouveau mot de passe doit faire au moins 6 caractères" }, { status: 422 });

  try {
    const sql = getSql();
    const rows = (await sql`select * from users where id = ${session.sub} limit 1`) as unknown as UserRow[];
    const user = rows[0];
    if (!user || !(await verifyPassword(current, user.password_hash))) {
      return NextResponse.json({ ok: false, error: "Mot de passe actuel incorrect" }, { status: 401 });
    }
    const hash = await hashPassword(next);
    await sql`update users set password_hash = ${hash} where id = ${session.sub}`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Base indisponible" }, { status: 500 });
  }
}
