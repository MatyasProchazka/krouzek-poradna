// ============================================================================
// API endpoint /api/questions (Next.js Route Handler)
// ----------------------------------------------------------------------------
// V Next.js je backend přímo součástí projektu. Soubor route.js ve složce
// app/api/questions/ automaticky vytvoří endpoint /api/questions.
// Exportovaná funkce GET obslouží GET požadavky, POST obslouží POST atd.
// Je to totéž co app.get(...) a app.post(...) v Expressu z lekce 3.
// ============================================================================

import { NextResponse } from "next/server";
import { listQuestions, createQuestion } from "@/lib/questions";
import { getCurrentUser } from "@/lib/auth";
import { questionSchema } from "@/lib/validation";
import { parseBody, unauthorized, forbidden } from "@/lib/http";
import { can } from "@/lib/permissions";

export async function GET() {
  // Lekce 11: otázky už nejsou veřejné, každý vidí jen otázky své školy
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  return NextResponse.json(listQuestions(user.organizationId));
}

export async function POST(request) {
  // Ptát se smí jen přihlášený uživatel.
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (!can(user, "question:create")) return forbidden();

  // Lekce 6: místo ručních if-ů validuje Zod podle sdíleného schématu.
  // Do `data` se dostanou jen pole ze schématu, už oříznutá a zkontrolovaná.
  // Cokoliv navíc (třeba podvržené "authorId") Zod zahodí.
  const { data, response } = await parseBody(request, questionSchema);
  if (response) return response;

  // Organizaci bereme z přihlášeného uživatele, NIKDY z dat od klienta
  const question = createQuestion({ ...data, authorId: user.id, organizationId: user.organizationId });
  return NextResponse.json(question, { status: 201 });
}
