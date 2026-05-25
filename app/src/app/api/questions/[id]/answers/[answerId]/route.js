// DELETE /api/questions/:id/answers/:answerId – smazání odpovědi (autor nebo lektor)
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAnswer, deleteAnswer } from "@/lib/answers";
import { getQuestion } from "@/lib/questions";
import { can } from "@/lib/permissions";
import { notFound, unauthorized, forbidden } from "@/lib/http";

export async function DELETE(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const { id, answerId } = await params;
  // Nejdřív ověříme, že otázka patří do uživatelovy školy
  const question = getQuestion(Number(id), user.organizationId);
  if (!question) return notFound("Otázka nenalezena.");

  const answer = getAnswer(Number(answerId));
  // Kontrolujeme i to, že odpověď opravdu patří k otázce z adresy
  if (!answer || answer.questionId !== Number(id)) return notFound("Odpověď nenalezena.");

  if (!can(user, "answer:delete", answer)) return forbidden();

  deleteAnswer(answer.id);
  return new NextResponse(null, { status: 204 });
}
