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
import { CATEGORY_KEYS } from "@/lib/categories";

export function GET() {
  return NextResponse.json(listQuestions());
}

export async function POST(request) {
  const { title, body = "", category } = await request.json();

  // Zatím ruční validace jako v lekci 3. V lekci 6 ji nahradí knihovna Zod.
  if (typeof title !== "string" || title.trim().length < 5) {
    return NextResponse.json({ error: "Otázka musí mít aspoň 5 znaků." }, { status: 400 });
  }
  if (!CATEGORY_KEYS.includes(category)) {
    return NextResponse.json({ error: "Neznámá kategorie." }, { status: 400 });
  }

  const question = createQuestion({ title: title.trim(), body: String(body).trim(), category });
  return NextResponse.json(question, { status: 201 });
}
