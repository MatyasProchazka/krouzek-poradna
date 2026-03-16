// ============================================================================
// JWT – JSON Web Token
// ----------------------------------------------------------------------------
// Po přihlášení potřebuje server u každého dalšího požadavku vědět, KDO ho
// posílá. HTTP si nic nepamatuje (je "bezstavový"), takže prohlížeč musí
// s každým požadavkem poslat nějaký důkaz. Dvě klasická řešení:
//
//   1) SESSION na serveru: server si uloží "přihlášení č. 8f3a… = uživatel 5"
//      do databáze/paměti a prohlížeči pošle jen to náhodné číslo v cookie.
//   2) JWT: server pošle prohlížeči token, ve kterém PŘÍMO je napsáno
//      "uživatel 5, platí do 18:00" a celé je to PODEPSANÉ tajným klíčem.
//      Server si nemusí nic pamatovat, jen ověří podpis.
//
// JWT má tři části oddělené tečkou:  HLAVIČKA.DATA.PODPIS
// Data NEJSOU šifrovaná, jen zakódovaná (base64). Kdokoli si je přečte
// (zkus token vložit na jwt.io). Podpis ale zaručí, že je nikdo nezměnil.
// → Do tokenu nikdy nedávej hesla ani jiné tajné údaje.
//
// Tento soubor schválně neimportuje databázi, aby šel použít i v middleware.js,
// které běží v omezeném prostředí (Edge runtime).
// ============================================================================

import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "poradna_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dní v sekundách

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    // Na produkci bez tajného klíče raději spadneme, než abychom běželi nezabezpečeně.
    throw new Error("Chybí proměnná prostředí JWT_SECRET");
  }
  // Při vývoji použijeme náhradní klíč, ať jde projekt spustit hned po stažení.
  return new TextEncoder().encode(secret ?? "dev-only-secret-nepouzivat-na-produkci");
}

/** Vytvoří podepsaný token pro uživatele. */
export async function createToken(user) {
  return new SignJWT({ name: user.name })   // vlastní data ("claims")
    .setProtectedHeader({ alg: "HS256" })  // algoritmus podpisu
    .setSubject(String(user.id))           // "sub" = o kom token je
    .setIssuedAt()                         // "iat" = kdy byl vydán
    .setExpirationTime(`${SESSION_MAX_AGE}s`) // "exp" = do kdy platí
    .sign(getSecret());
}

/** Ověří token. Vrací { id, name }, nebo null, když je neplatný či prošlý. */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return { id: Number(payload.sub), name: payload.name };
  } catch {
    return null; // špatný podpis, prošlá platnost, nesmysl…
  }
}
