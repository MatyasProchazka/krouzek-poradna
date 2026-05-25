// POST /api/questions/:id/accept – označí odpověď jako správnou
// Tělo: { "answerId": 12 }  nebo  { "answerId": null } pro zrušení
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { getQuestion, setAcceptedAnswer } from "@/lib/questions";
import { getAnswer } from "@/lib/answers";
import { can } from "@/lib/permissions";
import { parseBody, notFound, unauthorized, forbidden } from "@/lib/http";

const acceptSchema = z.object({ answerId: z.number().int().positive().nullable() });

export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const question = getQuestion(Number(id), user.organizationId);
  if (!question) return notFound("Otázka nenalezena.");

  if (!can(user, "answer:accept", question)) {
    return forbidden("Správnou odpověď může označit jen autor otázky nebo lektor.");
  }

  const { data, response } = await parseBody(request, acceptSchema);
  if (response) return response;

  if (data.answerId !== null) {
    const answer = getAnswer(data.answerId);
    if (!answer || answer.questionId !== question.id) return notFound("Odpověď nenalezena.");
  }

  return NextResponse.json(setAcceptedAnswer(question.id, data.answerId, user.organizationId));
}
