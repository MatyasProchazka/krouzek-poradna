// ============================================================================
// Pomocné funkce pro API route handlery
// ----------------------------------------------------------------------------
// Každý endpoint dělá na začátku totéž: přečte JSON z těla požadavku
// a zvaliduje ho. Abychom to nepsali pořád dokola (princip DRY = Don't
// Repeat Yourself), máme to tady na jednom místě.
// ============================================================================

import { NextResponse } from "next/server";
import { validate } from "./validation";

/**
 * Přečte a zvaliduje tělo požadavku.
 * Vrací { data } při úspěchu, nebo { response } s chybou 400, kterou stačí vrátit.
 */
export async function parseBody(request, schema) {
  let json;
  try {
    json = await request.json();
  } catch {
    return { response: NextResponse.json({ error: "Tělo požadavku není platný JSON." }, { status: 400 }) };
  }

  const { data, errors } = validate(schema, json);
  if (errors) {
    // Jednotný tvar chyb pro celé API: { error: "souhrn", fields: { pole: "hláška" } }
    // Frontend díky tomu ví, kterou chybu zobrazit u kterého pole.
    return {
      response: NextResponse.json({ error: "Zkontroluj zvýrazněná pole.", fields: errors }, { status: 400 }),
    };
  }
  return { data };
}

export function unauthorized(message = "Nejdřív se přihlas.") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function notFound(message = "Nenalezeno.") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function forbidden(message = "Na tohle nemáš oprávnění.") {
  // 401 = nevím, kdo jsi (nepřihlášený). 403 = vím, kdo jsi, ale nesmíš to.
  return NextResponse.json({ error: message }, { status: 403 });
}

export function tooManyRequests(retryAfter) {
  return NextResponse.json(
    { error: `Příliš mnoho pokusů. Zkus to znovu za ${retryAfter} s.` },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
