import { NextResponse } from "next/server";
import { getSql, type UserRow } from "@/lib/db";
import { verifyPassword, createToken, COOKIE } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email et mot de passe requis" }, { status: 400 });
  }

  try {
    const sql = getSql();
    const rows = (await sql`select * from users where email = ${email} limit 1`) as unknown as UserRow[];
    const user = rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ ok: false, error: "Identifiants incorrects" }, { status: 401 });
    }

    const token = await createToken({ sub: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({ ok: true, role: user.role });
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Base de données indisponible" }, { status: 500 });
  }
}
