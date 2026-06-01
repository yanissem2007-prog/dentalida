import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const enc = new TextEncoder();

async function getRole(token?: string): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, enc.encode(process.env.JWT_SECRET || "dev-secret-change-me-in-prod-please-32chars"));
    return (payload as { role?: string }).role || null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("denta_session")?.value;
  const role = await getRole(token);
  const { pathname } = req.nextUrl;

  // Pages admin → redirige vers /login si pas connecté
  if (pathname.startsWith("/admin")) {
    if (!role) {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  // API admin → 401 si pas connecté ; /api/admin/users réservé à l'admin
  if (pathname.startsWith("/api/admin")) {
    if (!role) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    if (pathname.startsWith("/api/admin/users") && role !== "admin") {
      return NextResponse.json({ error: "Réservé à l'administrateur" }, { status: 403 });
    }
  }

  // Déjà connecté → /login renvoie au dashboard
  if (pathname === "/login" && role) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/login"],
};
