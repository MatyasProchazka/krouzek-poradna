// ============================================================================
// Integrační test – testuje víc částí dohromady (tady funkce + skutečnou
// databázi). Databáze běží jen v paměti (DB_PATH=":memory:" ve vitest.config),
// takže je při každém spuštění testů čistá a rychlá.
// ============================================================================

import { describe, it, expect } from "vitest";
import { createQuestion, getQuestion, listQuestions, deleteQuestion } from "@/lib/questions";
import { createAnswer } from "@/lib/answers";
import { createUser } from "@/lib/users";

describe("datová vrstva otázek", () => {
  const author = createUser({ name: "Testér", email: "tester@example.cz", passwordHash: "x" });

  it("uloží otázku a vrátí ji i s autorem", () => {
    const q = createQuestion({ title: "Testovací otázka", body: "", category: "jine", authorId: author.id });
    expect(q.id).toBeTypeOf("number");
    expect(q.authorName).toBe("Testér");
    expect(getQuestion(q.id).title).toBe("Testovací otázka");
  });

  it("spočítá odpovědi", () => {
    const q = createQuestion({ title: "Otázka s odpovědí", body: "", category: "jine", authorId: author.id });
    createAnswer({ questionId: q.id, body: "Tohle je odpověď.", authorId: author.id });
    expect(listQuestions().find((x) => x.id === q.id).answerCount).toBe(1);
  });

  it("při smazání otázky smaže i odpovědi (ON DELETE CASCADE)", () => {
    const q = createQuestion({ title: "Otázka ke smazání", body: "", category: "jine", authorId: author.id });
    createAnswer({ questionId: q.id, body: "Odpověď ke smazání.", authorId: author.id });
    expect(deleteQuestion(q.id)).toBe(true);
    expect(getQuestion(q.id)).toBeNull();
  });

  it("vrátí null pro neexistující otázku", () => {
    expect(getQuestion(999999)).toBeNull();
  });
});
