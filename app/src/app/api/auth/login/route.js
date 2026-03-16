// POST /api/auth/login – přihlášení e-mailem a heslem
import { NextResponse } from "next/server";
import { verifyPassword, startSession } from "@/lib/auth";
import { findUserByEmailWithPassword } from "@/lib/users";

export async function POST(request) {
  const { email, password } = await request.json();

  const user = email ? findUserByEmailWithPassword(email) : null;
  const valid = user && (await verifyPassword(password ?? "", user.password_hash));

  if (!valid) {
    // Schválně neříkáme, JESTLI neexistuje e-mail, nebo je špatné heslo.
    // Útočník by si jinak mohl zjistit, kdo všechno má v aplikaci účet.
    // 401 Unauthorized = nejsi (správně) přihlášený
    return NextResponse.json({ error: "Nesprávný e-mail nebo heslo." }, { status: 401 });
  }

  await startSession(user);
  return NextResponse.json({ id: user.id, name: user.name });
}
