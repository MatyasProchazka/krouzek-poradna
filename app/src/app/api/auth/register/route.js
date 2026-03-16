// POST /api/auth/register – registrace nového uživatele
import { NextResponse } from "next/server";
import { hashPassword, startSession } from "@/lib/auth";
import { createUser, findUserByEmailWithPassword } from "@/lib/users";

export async function POST(request) {
  const { name, email, password } = await request.json();

  // Základní kontrola. Pořádnou validaci přidáme v lekci 6.
  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Vyplň jméno, e-mail a heslo (aspoň 8 znaků)." },
      { status: 400 },
    );
  }

  if (findUserByEmailWithPassword(email)) {
    // 409 Conflict = takový záznam už existuje
    return NextResponse.json({ error: "Účet s tímto e-mailem už existuje." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = createUser({ name, email, passwordHash });

  await startSession(user); // po registraci rovnou přihlásíme
  return NextResponse.json(user, { status: 201 });
}
