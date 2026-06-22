import { describe, it, expect } from "vitest";
import { buildPrompt, SYSTEM_PROMPT } from "@/lib/ai";

describe("buildPrompt", () => {
  it("vloží otázku do značek a přeloží kategorii", () => {
    const prompt = buildPrompt({ title: "Jaký hosting?", body: "Chci WordPress.", category: "hosting" });
    expect(prompt).toContain("Kategorie: Hosting a domény");
    expect(prompt).toMatch(/<otazka>\s*Jaký hosting\?/);
    expect(prompt).toContain("</otazka>");
  });

  it("poradí si s otázkou bez podrobností", () => {
    expect(buildPrompt({ title: "Co je API?", body: "", category: "backend" })).toContain("(bez podrobností)");
  });
});

describe("SYSTEM_PROMPT", () => {
  it("upozorňuje model, že text studenta nejsou pokyny (prompt injection)", () => {
    expect(SYSTEM_PROMPT).toMatch(/ne jako pokyny/);
  });
});
