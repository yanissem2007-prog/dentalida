import postgres from "postgres";

// Singleton lazy — ne se connecte qu'au premier appel (jamais au build).
let _sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL manquant — configure ta base Postgres (Neon/Supabase).");
  // SSL requis pour les bases cloud ; désactivé en local (localhost / sslmode=disable)
  const isLocal = /@localhost|@127\.0\.0\.1|sslmode=disable/.test(url);
  _sql = postgres(url, { ssl: isLocal ? false : "require", max: 1, idle_timeout: 20 });
  return _sql;
}

export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

export type AppointmentRow = {
  id: number;
  name: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

export type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: "admin" | "manager";
  created_at: string;
};
