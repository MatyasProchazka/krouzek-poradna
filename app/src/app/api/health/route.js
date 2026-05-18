// ============================================================================
// GET /api/health – kontrola, že aplikace žije
// ----------------------------------------------------------------------------
// Hostingové služby a monitoring (UptimeRobot, Docker HEALTHCHECK…) sem
// pravidelně posílají požadavek. Když nepřijde odpověď 200, ví, že je
// problém, a můžou aplikaci restartovat nebo poslat upozornění.
// ============================================================================

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export function GET() {
  try {
    // Jednoduchý dotaz ověří, že funguje i databáze, nejen webový server
    db.prepare("SELECT 1").get();
    return NextResponse.json({ status: "ok", time: new Date().toISOString() });
  } catch (error) {
    // 503 Service Unavailable = služba teď nefunguje
    return NextResponse.json({ status: "error", message: error.message }, { status: 503 });
  }
}
