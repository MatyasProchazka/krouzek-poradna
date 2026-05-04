import { describe, it, expect } from "vitest";
import { filterQuestions, normalize } from "@/lib/filter";

// Testovací data (fixtures): malá, přehledná a pokrývající různé případy
const questions = [
  { id: 1, title: "Řešení CSS gridu", body: "", category: "frontend", answerCount: 2, createdAt: "2026-03-01 10:00:00" },
  { id: 2, title: "Jaký hosting?", body: "WordPress a doména", category: "hosting", answerCount: 0, createdAt: "2026-03-03 10:00:00" },
  { id: 3, title: "Co je JWT", body: "token", category: "backend", answerCount: 5, createdAt: "2026-03-02 10:00:00" },
];

describe("normalize", () => {
  it("odstraní diakritiku a zmenší písmena", () => {
    expect(normalize("Řešení ŽLUŤOUČKÝ")).toBe("reseni zlutoucky");
  });
});

describe("filterQuestions", () => {
  it("bez filtru vrátí vše, nejnovější první", () => {
    expect(filterQuestions(questions).map((q) => q.id)).toEqual([2, 3, 1]);
  });

  it("hledá bez ohledu na diakritiku a velikost písmen", () => {
    expect(filterQuestions(questions, { query: "RESENI" }).map((q) => q.id)).toEqual([1]);
  });

  it("hledá i v textu otázky, nejen v názvu", () => {
    expect(filterQuestions(questions, { query: "wordpress" }).map((q) => q.id)).toEqual([2]);
  });

  it("filtruje podle kategorie", () => {
    expect(filterQuestions(questions, { category: "backend" }).map((q) => q.id)).toEqual([3]);
  });

  it("filtruje otázky bez odpovědi", () => {
    expect(filterQuestions(questions, { status: "unanswered" }).map((q) => q.id)).toEqual([2]);
  });

  it("řadí podle počtu odpovědí", () => {
    expect(filterQuestions(questions, { sort: "answers" }).map((q) => q.id)).toEqual([3, 1, 2]);
  });

  it("nezmění původní pole", () => {
    const copy = structuredClone(questions);
    filterQuestions(questions, { sort: "oldest" });
    expect(questions).toEqual(copy);
  });
});
