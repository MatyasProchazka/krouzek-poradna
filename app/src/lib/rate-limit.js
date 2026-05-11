// ============================================================================
// Rate limiting – omezení počtu pokusů
// ----------------------------------------------------------------------------
// Bez omezení může útočník zkoušet tisíce hesel za minutu (brute force)
// nebo zahltit server požadavky. Rate limit povolí třeba 5 pokusů za minutu
// z jedné IP adresy a další odmítne se stavovým kódem 429 Too Many Requests.
//
// Tahle jednoduchá verze si pamatuje pokusy v paměti serveru. Stačí, když
// aplikace běží na jednom serveru. Při více serverech (nebo serverless)
// by si každý pamatoval něco jiného, pak se používá sdílené úložiště,
// typicky Redis.
// ============================================================================

const buckets = new Map(); // klíč → pole časů pokusů

/**
 * Zaznamená pokus a řekne, jestli je povolený.
 * @returns {{ allowed: boolean, retryAfter: number }} retryAfter v sekundách
 */
export function rateLimit(key, { limit = 5, windowMs = 60_000, now = Date.now() } = {}) {
  // Necháme si jen pokusy z posledního časového okna ("klouzavé okno")
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true, retryAfter: 0 };
}

/** IP adresa klienta. Za proxy (Vercel, Nginx) je v hlavičce X-Forwarded-For. */
export function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
}

/** Jen pro testy: vyčistí paměť */
export function resetRateLimits() {
  buckets.clear();
}
