// GET /api/questions/:id – detail otázky i s odpověďmi
//
// Hranaté závorky ve jménu složky [id] = dynamický segment adresy.
// /api/questions/7 → params.id === "7" (vždy text, proto Number()).
import { NextResponse } from "next/server";
import { getQuestion } from "@/lib/questions";
import { listAnswers } from "@/lib/answers";
import { notFound } from "@/lib/http";

export async function GET(request, { params }) {
  const { id } = await params;
  const question = getQuestion(Number(id));
  if (!question) return notFound("Otázka nenalezena.");

  return NextResponse.json({ ...question, answers: listAnswers(question.id) });
}
