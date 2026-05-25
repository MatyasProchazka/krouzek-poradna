# Lekce 11 – SaaS a architektura aplikací

## Co jsme probírali

- Co je SaaS: software jako služba, předplatné místo licence, aktualizace pro všechny najednou. Příklady: Google Workspace, Notion, Slack, Fakturoid.
- Výhody a nevýhody SaaS pro zákazníka i pro autora (opakované příjmy vs. závislost na dodavateli, data v cizím cloudu, GDPR).
- Multi-tenancy: tři modely izolace dat a proč Poradna používá sdílené tabulky s `organization_id`.
- Typické části SaaS: workspace / organizace, pozvánky, role, tarify a limity, billing.
- Monolit vs. mikroslužby: kdy co, proč začít monolitem.
- API design a dokumentace: konzistentní adresy, stavové kódy, formát chyb, OpenAPI a Swagger.
- Zabezpečení SaaS: izolace tenantů, 404 místo 403, tajné kódy pozvánek, test izolace.

## Soubory k prohlédnutí

- [`app/src/lib/organizations.js`](../../app/src/lib/organizations.js): organizace, kódy pozvánek, tarify
- [`app/src/lib/questions.js`](../../app/src/lib/questions.js): každý dotaz filtruje podle `organization_id`
- [`app/src/lib/users.js`](../../app/src/lib/users.js): `registerAccount` s transakcí
- [`app/src/app/skola/page.js`](../../app/src/app/skola/page.js): přehled školy a pozvánky
- [`app/tests/questions.test.js`](../../app/tests/questions.test.js): test oddělení organizací
- [`docs/architektura.md`](../architektura.md): diagramy vrstev, modelů a datového modelu
- [`docs/api/openapi.yaml`](../api/openapi.yaml): dokumentace API

## Vyzkoušej

1. Zaregistruj se a založ vlastní školu. Na stránce *Moje škola* uvidíš kód pozvánky.
2. V anonymním okně se zaregistruj s tímhle kódem jako student.
3. Třetím účtem s kódem `KROUZEK-2026` (výchozí škola) ověř, že otázky první školy nevidíš ani přes API.
4. Vlož `docs/api/openapi.yaml` do [editor.swagger.io](https://editor.swagger.io).

## Úkol na doma

1. Přidej na stránku *Moje škola* seznam členů (jen pro lektora).
2. Doplň do OpenAPI endpoint, který v aplikaci ještě chybí (třeba úprava otázky), a pak ho naimplementuj.
3. Promysli: co všechno by se muselo změnit, kdyby každá škola měla vlastní databázi?
