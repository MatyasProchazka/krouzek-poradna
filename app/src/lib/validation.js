// ============================================================================
// Validace dat pomocí knihovny Zod
// ----------------------------------------------------------------------------
// Validace = kontrola, že data mají správný tvar a dávají smysl
// (otázka není prázdná, e-mail vypadá jako e-mail, heslo je dost dlouhé…).
//
// Kde validovat?
//   NA KLIENTU  → kvůli uživateli: okamžitá zpětná vazba, bez čekání na server.
//   NA SERVERU  → kvůli bezpečnosti: klienta jde obejít (curl, Postman,
//                 upravený JavaScript), takže server musí kontrolovat VŽDY.
//
// Zod nám umožní napsat pravidla JEDNOU (tady) a použít je na obou místech.
// Tento soubor proto neobsahuje nic, co by běželo jen na serveru.
// ============================================================================

import { z } from "zod";
import { CATEGORY_KEYS } from "./categories";

// Schéma popisuje, jak mají data vypadat. .trim() rovnou ořízne mezery.
export const questionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Otázka musí mít aspoň 5 znaků.")
    .max(150, "Otázka může mít nejvýš 150 znaků. Podrobnosti napiš níž."),
  body: z.string().trim().max(5000, "Podrobnosti můžou mít nejvýš 5000 znaků.").default(""),
  // z.enum povolí jen hodnoty ze seznamu, cokoliv jiného je chyba
  category: z.enum(CATEGORY_KEYS, { error: "Vyber kategorii ze seznamu." }),
});

export const answerSchema = z.object({
  body: z
    .string()
    .trim()
    .min(10, "Odpověď musí mít aspoň 10 znaků.")
    .max(10000, "Odpověď může mít nejvýš 10 000 znaků."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Jméno musí mít aspoň 2 znaky.").max(60),
    email: z.email("Zadej platný e-mail.").transform((e) => e.toLowerCase()),
    password: z.string().min(8, "Heslo musí mít aspoň 8 znaků.").max(200),
    // Lekce 11: buď kód pozvánky do existující školy, nebo název nové školy
    mode: z.enum(["join", "create"]).default("join"),
    inviteCode: z.string().trim().optional(),
    organizationName: z.string().trim().optional(),
  })
  // superRefine: pravidlo, které se týká víc polí najednou
  .superRefine((data, ctx) => {
    if (data.mode === "join" && !data.inviteCode) {
      ctx.addIssue({ code: "custom", path: ["inviteCode"], message: "Zadej kód pozvánky od lektora." });
    }
    if (data.mode === "create" && (!data.organizationName || data.organizationName.length < 3)) {
      ctx.addIssue({ code: "custom", path: ["organizationName"], message: "Název školy musí mít aspoň 3 znaky." });
    }
  });

export const loginSchema = z.object({
  email: z.email("Zadej platný e-mail."),
  password: z.string().min(1, "Zadej heslo."),
});

/**
 * Pomocná funkce: zvaliduje data a vrátí buď { data }, nebo { errors }.
 * errors je objekt { nazevPole: "první chybová hláška" }, ideální pro
 * zobrazení chyby přímo pod konkrétním polem formuláře.
 */
export function validate(schema, input) {
  const result = schema.safeParse(input); // safeParse nehází výjimku, vrací výsledek
  if (result.success) return { data: result.data };

  const fieldErrors = z.flattenError(result.error).fieldErrors;
  const errors = Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages[0]]),
  );
  return { errors };
}
