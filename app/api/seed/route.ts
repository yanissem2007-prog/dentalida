import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Initialise la base : crée les tables + les comptes (1 admin, 2 managers).
 * Protégé par ?secret=SEED_SECRET. Idempotent (ne recrée pas un compte existant).
 * À appeler UNE fois : /api/seed?secret=...
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ ok: false, error: "Accès refusé" }, { status: 403 });
  }

  try {
    const sql = getSql();

    await sql`
      create table if not exists users (
        id serial primary key,
        email text unique not null,
        password_hash text not null,
        name text not null,
        role text not null default 'manager',
        created_at timestamptz not null default now()
      )`;

    await sql`
      create table if not exists appointments (
        id serial primary key,
        name text not null,
        phone text not null,
        service text,
        preferred_date text,
        message text,
        status text not null default 'nouveau',
        notes text,
        created_at timestamptz not null default now()
      )`;
    await sql`alter table appointments add column if not exists notes text`;

    const accounts = [
      { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: "Administrateur", role: "admin" },
      { email: process.env.MANAGER1_EMAIL, password: process.env.MANAGER1_PASSWORD, name: "Manager 1", role: "manager" },
      { email: process.env.MANAGER2_EMAIL, password: process.env.MANAGER2_PASSWORD, name: "Manager 2", role: "manager" },
    ];

    const created: string[] = [];
    const skipped: string[] = [];
    for (const a of accounts) {
      if (!a.email || !a.password) continue;
      const email = a.email.trim().toLowerCase();
      const exists = await sql`select 1 from users where email = ${email} limit 1`;
      if (exists.length) { skipped.push(email); continue; }
      const hash = await hashPassword(a.password);
      await sql`insert into users (email, password_hash, name, role) values (${email}, ${hash}, ${a.name}, ${a.role})`;
      created.push(`${email} (${a.role})`);
    }

    return NextResponse.json({ ok: true, created, skipped, message: "Base initialisée." });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e as Error).message) }, { status: 500 });
  }
}
