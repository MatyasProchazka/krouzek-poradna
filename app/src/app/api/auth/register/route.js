// POST /api/auth/register – registrace nového uživatele
import { NextResponse } from "next/server";
import { hashPassword, startSession } from "@/lib/auth";
import { findUserByEmailWithPassword, registerAccount } from "@/lib/users";
import { registerSchema } from "@/lib/validation";
import { parseBody, tooManyRequests } from "@/lib/http";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request) {
  // Lekce 9: max. 5 pokusů za minutu z jedné IP adresy
  const { allowed, retryAfter } = rateLimit(`register:${clientIp(request)}`);
  if (!allowed) return tooManyRequests(retryAfter);

  // Lekce 6: validace přes Zod
  const { data, response } = await parseBody(request, registerSchema);
  if (response) return response;

  if (findUserByEmailWithPassword(data.email)) {
    // 409 Conflict = takový záznam už existuje
    return NextResponse.json(
      { error: "Účet s tímto e-mailem už existuje.", fields: { email: "Tenhle e-mail už je zaregistrovaný." } },
      { status: 409 },
    );
  }

  // Lekce 11: připojení ke škole kódem, nebo založení nové školy
  const { user, errors } = registerAccount({
    name: data.name,
    email: data.email,
    passwordHash: await hashPassword(data.password),
    inviteCode: data.mode === "join" ? data.inviteCode : undefined,
    organizationName: data.mode === "create" ? data.organizationName : undefined,
  });
  if (errors) {
    return NextResponse.json({ error: "Zkontroluj zvýrazněná pole.", fields: errors }, { status: 400 });
  }

  await startSession(user); // po registraci rovnou přihlásíme
  return NextResponse.json(user, { status: 201 });
}
