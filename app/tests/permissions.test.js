// Testy oprávnění. U bezpečnostních pravidel se testy vyplatí nejvíc:
// chyba tady neznamená rozbité tlačítko, ale únik nebo smazaná data.
import { describe, it, expect, beforeEach } from "vitest";
import { can } from "@/lib/permissions";
import { rateLimit, resetRateLimits } from "@/lib/rate-limit";

const student = { id: 1, role: "student" };
const otherStudent = { id: 2, role: "student" };
const lektor = { id: 3, role: "lektor" };
const questionOfStudent = { id: 10, authorId: 1 };

describe("can()", () => {
  it("nepřihlášený nesmí nic", () => {
    expect(can(null, "question:create")).toBe(false);
    expect(can(null, "question:delete", questionOfStudent)).toBe(false);
  });

  it("autor smí smazat svoji otázku, cizí ne", () => {
    expect(can(student, "question:delete", questionOfStudent)).toBe(true);
    expect(can(otherStudent, "question:delete", questionOfStudent)).toBe(false);
  });

  it("lektor smí smazat cokoliv", () => {
    expect(can(lektor, "question:delete", questionOfStudent)).toBe(true);
    expect(can(lektor, "answer:delete", { authorId: 999 })).toBe(true);
  });

  it("správnou odpověď označí jen autor otázky nebo lektor", () => {
    expect(can(student, "answer:accept", questionOfStudent)).toBe(true);
    expect(can(otherStudent, "answer:accept", questionOfStudent)).toBe(false);
    expect(can(lektor, "answer:accept", questionOfStudent)).toBe(true);
  });

  it("neznámá akce je zakázaná (deny by default)", () => {
    expect(can(lektor, "users:delete-all")).toBe(false);
  });
});

describe("rateLimit()", () => {
  beforeEach(() => resetRateLimits());

  it("povolí limit pokusů a další odmítne", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit("test", { limit: 5, now }).allowed).toBe(true);
    }
    const sixth = rateLimit("test", { limit: 5, now });
    expect(sixth.allowed).toBe(false);
    expect(sixth.retryAfter).toBe(60);
  });

  it("po uplynutí okna zase povolí", () => {
    for (let i = 0; i < 5; i++) rateLimit("test", { now: 0 });
    expect(rateLimit("test", { now: 61_000 }).allowed).toBe(true);
  });
});
