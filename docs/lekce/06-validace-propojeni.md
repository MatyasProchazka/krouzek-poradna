# Lekce 6 – Propojení Reactu s backendem a validace dat

## Co jsme probírali

- Celý životní cyklus formuláře: stav → validace na klientu → `fetch` → odpověď serveru → zobrazení chyb nebo přesměrování.
- Proč validovat na klientu (uživatelský zážitek) **i** na serveru (bezpečnost).
- Knihovna Zod: jedno schéma sdílené frontendem i backendem, `safeParse`, transformace dat.
- Jednotný formát chyb v API (`error` + `fields`) a správné stavové kódy (400, 401, 404, 409).
- Ošetření chyb sítě: `try / catch / finally`, stav „odesílám…“.
- Znovupoužitelná komponenta `Field` a přístupnost formulářů (`aria-invalid`, `aria-describedby`).
- Vztah 1:N v databázi (otázka → odpovědi), cizí klíč, `ON DELETE CASCADE`, index.
- Dynamické stránky v Next.js (`/otazky/[id]`) a vnořené API zdroje (`/api/questions/:id/answers`).

## Soubory k prohlédnutí

- [`app/src/lib/validation.js`](../../app/src/lib/validation.js): všechna validační schémata
- [`app/src/lib/http.js`](../../app/src/lib/http.js): společné zpracování těla požadavku a chyb
- [`app/src/components/QuestionForm.js`](../../app/src/components/QuestionForm.js): formulář s validací a chybami u polí
- [`app/src/components/Field.js`](../../app/src/components/Field.js): komponenta pole formuláře
- [`app/src/app/otazky/[id]/page.js`](../../app/src/app/otazky/[id]/page.js): detail otázky s odpověďmi
- [`app/src/app/api/questions/[id]/answers/route.js`](../../app/src/app/api/questions/[id]/answers/route.js): API pro odpovědi

## Vyzkoušej

1. Pošli formulář prázdný: chyby se ukážou hned, bez požadavku na server (ověř v záložce Network).
2. Obejdi frontend a pošli špatná data přímo na API přes Thunder Client. Server je stejně odmítne.
3. Pošli v těle navíc `"authorId": 99`. Zod pole zahodí a autorem bude přihlášený uživatel.

## Úkol na doma

1. Přidej do `questionSchema` pravidlo, že otázka musí končit otazníkem.
2. Zobrazuj pod polem „Podrobnosti“ počítadlo znaků (např. `120 / 5000`).
3. Přidej možnost odpověď upravit (endpoint `PATCH` + validace stejným schématem).
