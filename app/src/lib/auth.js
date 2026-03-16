// ============================================================================
// Autentizace – "kdo jsi?"
// ----------------------------------------------------------------------------
// AUTENTIZACE = ověření identity (přihlášení jménem a heslem).
// AUTORIZACE  = co smíš dělat (třeba jen lektor smí odpovídat). Ta přijde v lekci 9.
// ============================================================================

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createToken, verifyToken, SESSION_COOKIE, SESSION_MAX_AGE } from "./jwt";
import { getUserById } from "./users";

// ----------------------------------------------------------------------------
// HESLA
// Heslo nikdy neukládáme v čitelné podobě. Ukládáme jeho HASH: výsledek
// jednosměrné funkce, ze kterého původní heslo nejde zpětně získat.
// Při přihlášení zahashujeme zadané heslo znovu a porovnáme výsledky.
//
// bcrypt je navíc schválně POMALÝ (cost 10 ≈ desítky ms) a ke každému heslu
// přidává náhodnou "sůl". Když databáze unikne, útočník nemůže hesla rychle
// hádat ani použít předpočítané tabulky.
// ----------------------------------------------------------------------------

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// ----------------------------------------------------------------------------
// COOKIE S TOKENEM
// Token uložíme do cookie, kterou prohlížeč automaticky posílá s každým
// požadavkem na náš web. Důležité vlastnosti cookie:
//   httpOnly  – JavaScript na stránce ji nepřečte (ochrana při útoku XSS)
//   secure    – posílá se jen přes HTTPS (na localhostu vypnuto)
//   sameSite  – "lax": jiné weby ji nemůžou poslat s formulářem (ochrana proti CSRF)
// ----------------------------------------------------------------------------

export async function startSession(user) {
  const token = await createToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function endSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Vrátí aktuálně přihlášeného uživatele, nebo null.
 * Dá se volat v serverových komponentách i v API route handlerech.
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = await verifyToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  // Token říká "uživatel 5". Načteme aktuální data z databáze. Kdyby byl
  // účet mezitím smazaný, vrátíme null, i když token ještě platí.
  return getUserById(session.id);
}
