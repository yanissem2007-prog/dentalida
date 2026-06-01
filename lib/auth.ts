import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const COOKIE = "denta_session";
const enc = new TextEncoder();

function secretKey() {
  return enc.encode(process.env.JWT_SECRET || "dev-secret-change-me-in-prod-please-32chars");
}

export type Session = {
  sub: number;
  email: string;
  name: string;
  role: "admin" | "manager";
};

export async function hashPassword(pwd: string) {
  return bcrypt.hash(pwd, 10);
}

export async function verifyPassword(pwd: string, hash: string) {
  return bcrypt.compare(pwd, hash);
}

export async function createToken(payload: Session) {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

/** Lecture de la session côté serveur (Server Components / route handlers). */
export async function getSession(): Promise<Session | null> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}
