// GET    /api/questions/:id – detail otázky i s odpověďmi
// DELETE /api/questions/:id – smazání otázky (autor nebo lektor)
//
// Hranaté závorky ve jménu složky [id] = dynamický segment adresy.
// /api/questions/7 → params.id === "7" (vždy text, proto Number()).
import { NextResponse } from "next/server";
import { getQuestion, deleteQuestion } from "@/lib/questions";
import { listAnswers } from "@/lib/answers";
import { getCurrentUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { notFound, unauthorized, forbidden } from "@/lib/http";

export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const { id } = await params;
  // Otázka jiné školy se tváří jako neexistující (404, ne 403),
  // abychom neprozradili ani to, že nějaká taková existuje.
  const question = getQuestion(Number(id), user.organizationId);
  if (!question) return notFound("Otázka nenalezena.");

  return NextResponse.json({ ...question, answers: listAnswers(question.id) });
}

export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const question = getQuestion(Number(id), user.organizationId);
  if (!question) return notFound("Otázka nenalezena.");

  // Lekce 9: AUTORIZACE. Přihlášený ještě neznamená oprávněný.
  // Bez téhle kontroly by kdokoli smazal cizí otázku jen změnou čísla v adrese
  // (takové chybě se říká IDOR – Insecure Direct Object Reference).
  if (!can(user, "question:delete", question)) return forbidden();

  deleteQuestion(question.id, user.organizationId);
  return new NextResponse(null, { status: 204 });
}
