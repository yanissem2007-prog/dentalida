import { NextResponse } from "next/server";
import { getSql, type AppointmentRow } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["nouveau", "contacté", "confirmé", "annulé"];

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const sql = getSql();
    const rows = (await sql`select * from appointments order by created_at desc`) as unknown as AppointmentRow[];
    return NextResponse.json({ ok: true, appointments: rows });
  } catch {
    return NextResponse.json({ ok: false, error: "Base indisponible" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  let body: { id?: number; status?: string; notes?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalide" }, { status: 400 }); }
  if (!body.id) return NextResponse.json({ error: "id manquant" }, { status: 422 });

  try {
    const sql = getSql();
    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status)) return NextResponse.json({ error: "Statut invalide" }, { status: 422 });
      await sql`update appointments set status = ${body.status} where id = ${body.id}`;
    }
    if (body.notes !== undefined) {
      await sql`update appointments set notes = ${body.notes || null} where id = ${body.id}`;
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Base indisponible" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  let body: { id?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalide" }, { status: 400 }); }
  if (!body.id) return NextResponse.json({ error: "id manquant" }, { status: 422 });

  try {
    const sql = getSql();
    await sql`delete from appointments where id = ${body.id}`;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Base indisponible" }, { status: 500 });
  }
}
