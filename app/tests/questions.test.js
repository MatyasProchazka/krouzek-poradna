// ============================================================================
// Integrační test – testuje víc částí dohromady (tady funkce + skutečnou
// databázi). Databáze běží jen v paměti (DB_PATH=":memory:" ve vitest.config),
// takže je při každém spuštění testů čistá a rychlá.
// ============================================================================

import { describe, it, expect } from "vitest";
import { createQuestion, getQuestion, listQuestions, deleteQuestion } from "@/lib/questions";
import { createAnswer } from "@/lib/answers";
import { createUser, registerAccount } from "@/lib/users";
import { createOrganization } from "@/lib/organizations";

describe("datová vrstva otázek", () => {
  const org = createOrganization({ name: "Testovací škola" });
  const author = createUser({ name: "Testér", email: "tester@example.cz", passwordHash: "x", organizationId: org.id });
  const base = { body: "", category: "jine", authorId: author.id, organizationId: org.id };

  it("uloží otázku a vrátí ji i s autorem", () => {
    const q = createQuestion({ ...base, title: "Testovací otázka" });
    expect(q.id).toBeTypeOf("number");
    expect(q.authorName).toBe("Testér");
    expect(getQuestion(q.id, org.id).title).toBe("Testovací otázka");
  });

  it("spočítá odpovědi", () => {
    const q = createQuestion({ ...base, title: "Otázka s odpovědí" });
    createAnswer({ questionId: q.id, body: "Tohle je odpověď.", authorId: author.id });
    expect(listQuestions(org.id).find((x) => x.id === q.id).answerCount).toBe(1);
  });

  it("při smazání otázky smaže i odpovědi (ON DELETE CASCADE)", () => {
    const q = createQuestion({ ...base, title: "Otázka ke smazání" });
    createAnswer({ questionId: q.id, body: "Odpověď ke smazání.", authorId: author.id });
    expect(deleteQuestion(q.id, org.id)).toBe(true);
    expect(getQuestion(q.id, org.id)).toBeNull();
  });

  it("vrátí null pro neexistující otázku", () => {
    expect(getQuestion(999999, org.id)).toBeNull();
  });
});

// Nejdůležitější test celého SaaS: data jedné školy nesmí být vidět v jiné
describe("oddělení organizací (tenant isolation)", () => {
  const schoolA = createOrganization({ name: "Škola A" });
  const schoolB = createOrganization({ name: "Škola B" });
  const userA = createUser({ name: "A", email: "a@example.cz", passwordHash: "x", organizationId: schoolA.id });
  const secret = createQuestion({ title: "Tajná otázka školy A", body: "", category: "jine", authorId: userA.id, organizationId: schoolA.id });

  it("škola B nevidí otázky školy A v seznamu", () => {
    expect(listQuestions(schoolB.id).map((q) => q.id)).not.toContain(secret.id);
  });

  it("škola B nenačte otázku školy A ani podle id", () => {
    expect(getQuestion(secret.id, schoolB.id)).toBeNull();
  });

  it("škola B nesmaže otázku školy A", () => {
    expect(deleteQuestion(secret.id, schoolB.id)).toBe(false);
    expect(getQuestion(secret.id, schoolA.id)).not.toBeNull();
  });
});

describe("registrace do organizace", () => {
  it("založení školy udělá z uživatele lektora", () => {
    const { user } = registerAccount({ name: "Ředitel", email: "reditel@example.cz", passwordHash: "x", organizationName: "Nová škola" });
    expect(user.role).toBe("lektor");
    expect(user.organizationName).toBe("Nová škola");
  });

  it("neplatný kód pozvánky vrátí chybu u pole", () => {
    const { errors } = registerAccount({ name: "X", email: "x@example.cz", passwordHash: "x", inviteCode: "NEEXISTUJE" });
    expect(errors.inviteCode).toBeDefined();
  });
});
