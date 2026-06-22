// POST /api/questions/:id/suggest – AI návrh odpovědi (jen lektor)
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getQuestion } from "@/lib/questions";
import { can } from "@/lib/permissions";
import { suggestAnswer, AiNotConfiguredError } from "@/lib/ai";
import { rateLimit } from "@/lib/rate-limit";
import { unauthorized, forbidden, notFound, tooManyRequests } from "@/lib/http";

export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  if (!can(user, "answer:suggest")) return forbidden("Návrh odpovědi pomocí AI je jen pro lektory.");

  // Každé volání AI stojí peníze, proto limit na uživatele
  const { allowed, retryAfter } = rateLimit(`ai:${user.id}`, { limit: 10 });
  if (!allowed) return tooManyRequests(retryAfter);

  const { id } = await params;
  const question = getQuestion(Number(id), user.organizationId);
  if (!question) return notFound("Otázka nenalezena.");

  try {
    const suggestion = await suggestAnswer(question);
    return NextResponse.json({ suggestion });
  } catch (error) {
    if (error instanceof AiNotConfiguredError) {
      // 501 Not Implemented: funkce na tomhle serveru není zapnutá
      return NextResponse.json(
        { error: "AI není nastavená. Doplň ANTHROPIC_API_KEY do .env.local (viz příručka)." },
        { status: 501 },
      );
    }
    // 502 Bad Gateway: chyba u služby, na které závisíme
    return NextResponse.json({ error: "AI teď neodpovídá, zkus to za chvíli." }, { status: 502 });
  }
}
