// ============================================================================
// Unit testy – testují jednu malou část kódu (funkci) izolovaně
// ----------------------------------------------------------------------------
// Struktura testu (vzor AAA):
//   Arrange – připrav vstupy
//   Act     – zavolej testovanou funkci
//   Assert  – ověř, že výsledek je takový, jaký čekáš
//
// describe() seskupuje testy, it() je jeden test, expect() je ověření.
// Spuštění:  npm test
// ============================================================================

import { describe, it, expect } from "vitest";
import { pluralize, timeAgo, parseDbDate } from "@/lib/format";

const FORMS = ["odpověď", "odpovědi", "odpovědí"];

describe("pluralize", () => {
  it("použije 1. tvar pro jedničku", () => {
    expect(pluralize(1, FORMS)).toBe("1 odpověď");
  });

  it("použije 2. tvar pro 2 až 4", () => {
    expect(pluralize(2, FORMS)).toBe("2 odpovědi");
    expect(pluralize(4, FORMS)).toBe("4 odpovědi");
  });

  // Okrajové případy (edge cases) jsou místa, kde se chyby schovávají nejčastěji
  it("použije 3. tvar pro nulu a pět a víc", () => {
    expect(pluralize(0, FORMS)).toBe("0 odpovědí");
    expect(pluralize(5, FORMS)).toBe("5 odpovědí");
    expect(pluralize(12, FORMS)).toBe("12 odpovědí");
  });
});

describe("parseDbDate", () => {
  it("bere čas z databáze jako UTC", () => {
    expect(parseDbDate("2026-03-09 16:00:00").toISOString()).toBe("2026-03-09T16:00:00.000Z");
  });
});

describe("timeAgo", () => {
  // Čas "teď" předáváme jako parametr, aby test dával vždy stejný výsledek.
  // Kdyby funkce vždy brala new Date(), test by zítra mohl selhat.
  const now = new Date("2026-03-09T16:00:00Z");

  it("vrátí 'právě teď' pro méně než minutu", () => {
    expect(timeAgo("2026-03-09 15:59:30", now)).toBe("právě teď");
  });

  it("vrátí minuty", () => {
    expect(timeAgo("2026-03-09 15:55:00", now)).toBe("před 5 minutami");
  });

  it("vrátí 'včera' pro den zpátky", () => {
    expect(timeAgo("2026-03-08 16:00:00", now)).toBe("včera");
  });
});
