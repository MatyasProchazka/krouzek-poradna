import { describe, it, expect } from "vitest";
import { validate, questionSchema, registerSchema } from "@/lib/validation";

describe("questionSchema", () => {
  it("přijme platnou otázku a ořízne mezery", () => {
    const { data, errors } = validate(questionSchema, { title: "  Co je API?  ", category: "backend" });
    expect(errors).toBeUndefined();
    expect(data).toEqual({ title: "Co je API?", body: "", category: "backend" });
  });

  it("odmítne krátký název a neznámou kategorii", () => {
    const { errors } = validate(questionSchema, { title: "abc", category: "hacking" });
    expect(errors.title).toMatch(/aspoň 5 znaků/);
    expect(errors.category).toBeDefined();
  });

  it("zahodí pole, která ve schématu nejsou", () => {
    // Bezpečnost: klient nesmí podstrčit třeba autora otázky
    const { data } = validate(questionSchema, { title: "Platná otázka", category: "jine", authorId: 99 });
    expect(data).not.toHaveProperty("authorId");
  });
});

describe("registerSchema", () => {
  it("převede e-mail na malá písmena", () => {
    const { data } = validate(registerSchema, { name: "Jana", email: "Jana@Example.CZ", password: "dlouheheslo" });
    expect(data.email).toBe("jana@example.cz");
  });

  it("vyžaduje heslo aspoň 8 znaků", () => {
    const { errors } = validate(registerSchema, { name: "Jana", email: "jana@example.cz", password: "kratke" });
    expect(errors.password).toBeDefined();
  });
});
