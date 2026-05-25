// POST /api/questions/:id/answers – nová odpověď k otázce
//
// Adresa kopíruje vztah v datech: odpovědi "patří pod" otázku.
// Takovým zanořeným adresám se v REST API říká vnořené zdroje.
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getQuestion } from "@/lib/questions";
import { createAnswer } from "@/lib/answers";
import { answerSchema } from "@/lib/validation";
import { parseBody, unauthorized, notFound, forbidden } from "@/lib/http";
import { can } from "@/lib/permissions";

export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (!can(user, "answer:create")) return forbidden();

  const { id } = await params;
  const question = getQuestion(Number(id), user.organizationId);
  if (!question) return notFound("Otázka nenalezena.");

  const { data, response } = await parseBody(request, answerSchema);
  if (response) return response;

  const answer = createAnswer({ questionId: question.id, body: data.body, authorId: user.id });
  return NextResponse.json(answer, { status: 201 });
}
