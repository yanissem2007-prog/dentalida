import { NextResponse } from "next/server";
import { getSql, hasDb } from "@/lib/db";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  message?: string;
};

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const phone = (data.phone || "").trim();

  // Validation serveur
  if (name.length < 2 || !/[0-9]{6,}/.test(phone.replace(/\s/g, ""))) {
    return NextResponse.json({ ok: false, error: "Nom ou téléphone manquant" }, { status: 422 });
  }

  // Enregistrement en base — pour le dashboard admin (best-effort).
  if (hasDb()) {
    try {
      const sql = getSql();
      await sql`
        insert into appointments (name, phone, service, preferred_date, message)
        values (${name}, ${phone}, ${data.service || null}, ${data.date || null}, ${data.message || null})`;
    } catch {
      // si la table n'existe pas encore / DB indispo, on n'empêche pas la confirmation
    }
  }

  // Envoi email optionnel — actif dès que RESEND_API_KEY est configuré sur Vercel.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RDV_TO_EMAIL;
  if (key && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Dentalida <onboarding@resend.dev>",
          to: [to],
          subject: `Nouveau rendez-vous — ${name}`,
          text: [
            `Nom : ${name}`,
            `Téléphone : ${phone}`,
            `Soin : ${data.service || "—"}`,
            `Date souhaitée : ${data.date || "—"}`,
            `Message : ${data.message || "—"}`,
          ].join("\n"),
        }),
      });
    } catch {
      // l'échec d'email ne casse pas la confirmation côté patient
    }
  }

  return NextResponse.json({ ok: true });
}
