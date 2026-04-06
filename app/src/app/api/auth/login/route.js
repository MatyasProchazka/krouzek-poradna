// POST /api/auth/login – přihlášení e-mailem a heslem
import { NextResponse } from "next/server";
import { verifyPassword, startSession } from "@/lib/auth";
import { findUserByEmailWithPassword } from "@/lib/users";
import { loginSchema } from "@/lib/validation";
import { parseBody } from "@/lib/http";

export async function POST(request) {
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
