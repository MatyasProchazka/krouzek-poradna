// POST /api/auth/login – přihlášení e-mailem a heslem
import { NextResponse } from "next/server";
import { verifyPassword, startSession } from "@/lib/auth";
import { findUserByEmailWithPassword } from "@/lib/users";
import { loginSchema } from "@/lib/validation";
import { parseBody, tooManyRequests } from "@/lib/http";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request) {
  // Lekce 9: max. 5 pokusů za minutu z jedné IP adresy (ochrana proti hádání hesel)
  const { allowed, retryAfter } = rateLimit(`login:${clientIp(request)}`);
  if (!allowed) return tooManyRequests(retryAfter);

  const { data, response } = await parseBody(request, loginSchema);
  if (response) return response;

  const user = findUserByEmailWithPassword(data.email);
  const valid = user && (await verifyPassword(data.password, user.password_hash));

  if (!valid) {
    // Schválně neříkáme, JESTLI neexistuje e-mail, nebo je špatné heslo.
    // Útočník by si jinak mohl zjistit, kdo všechno má v aplikaci účet.
    // 401 Unauthorized = nejsi (správně) přihlášený
    return NextResponse.json({ error: "Nesprávný e-mail nebo heslo." }, { status: 401 });
  }

  await startSession(user);
  return NextResponse.json({ id: user.id, name: user.name });
}
