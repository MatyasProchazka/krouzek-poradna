// POST /api/auth/register – registrace nového uživatele
import { NextResponse } from "next/server";
import { hashPassword, startSession } from "@/lib/auth";
import { createUser, findUserByEmailWithPassword } from "@/lib/users";
import { registerSchema } from "@/lib/validation";
import { parseBody } from "@/lib/http";

export async function POST(request) {
  // Lekce 6: validace přes Zod (jméno, platný e-mail, heslo aspoň 8 znaků)
  const { data, response } = await parseBody(request, registerSchema);
  if (response) return response;

  if (findUserByEmailWithPassword(data.email)) {
    // 409 Conflict = takový záznam už existuje
    return NextResponse.json(
      { error: "Účet s tímto e-mailem už existuje.", fields: { email: "Tenhle e-mail už je zaregistrovaný." } },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(data.password);
  const user = createUser({ name: data.name, email: data.email, passwordHash });

  await startSession(user); // po registraci rovnou přihlásíme
  return NextResponse.json(user, { status: 201 });
}
