// ============================================================================
// Middleware – kontrola před každým požadavkem
// ----------------------------------------------------------------------------
// Stejný princip jako middleware v Expressu (lekce 3): kód, který proběhne
// DŘÍV, než se požadavek dostane ke stránce nebo API. Hodí se pro věci
// společné mnoha stránkám, typicky kontrolu přihlášení.
//
// Tady: stránky, které potřebují přihlášení, pustíme jen přihlášeným.
// Lekce 11: od zavedení škol (SaaS) jsou neveřejné i detaily otázek.
// ============================================================================

import { NextResponse } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/jwt";

export async function middleware(request) {
  const session = await verifyToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next(); // přihlášený → pokračuj

  const { pathname } = request.nextUrl;

  // API: vrátíme JSON s chybou 401
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Nejdřív se přihlas." }, { status: 401 });
  }

  // Stránka: přesměrujeme na přihlášení a zapamatujeme si, kam chtěl jít
  const loginUrl = new URL("/prihlaseni", request.url);
  loginUrl.searchParams.set("dalsi", pathname);
  return NextResponse.redirect(loginUrl);
}

// Na které adresy se middleware vztahuje. API endpointy si přihlášení
// kontrolují samy (getCurrentUser), protože potřebují i data o uživateli.
export const config = {
  matcher: ["/ptat-se", "/otazky/:path*", "/skola"],
};
