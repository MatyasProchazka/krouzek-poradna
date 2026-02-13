# Plán kroužku Základy webového vývoje

Kroužek provází celým životem jedné webové aplikace, od první HTML stránky až po nasazený SaaS s AI funkcí. Všechny ukázky stavíme na jednom projektu, **Poradně**: jednoduchém systému, kde studenti pokládají otázky z oblasti IT a lektor (nebo kdokoli, kdo ví) na ně odpovídá.

Proč zrovna Poradna? Je dost malá, aby se dala pochopit celá, a zároveň obsahuje všechno, co má skutečná aplikace: uživatele, přihlášení, databázi, formuláře, oprávnění, vyhledávání i nasazení.

Každá lekce trvá zhruba hodinu (lekce 5 dvě hodiny). Zhruba polovina času je výklad, druhá polovina jsou ukázky přímo v repozitáři.

## Přehled lekcí

| # | Téma | Blok osnovy | Co v repu přibude | Tag |
|---|------|-------------|-------------------|-----|
| 1 | Úvod do kroužku, jak funguje web | 1. Základy webového vývoje | `lekce-01-jak-funguje-web/` – miniaturní HTTP server bez knihoven | `lekce-01` |
| 2 | Základy webu: HTML, CSS, JavaScript | 1. Základy webového vývoje | `lekce-02-html-css-js/` – statický prototyp Poradny | `lekce-02` |
| 3 | Frontend vs. backend, API, používané technologie | 1. Základy webového vývoje | `lekce-03-api/` – REST API v Expressu + frontend volající `fetch` | `lekce-03` |
| 4 | React, Next.js, komunikace FE–BE, databáze | 1. + 2. blok | `app/` – Next.js aplikace s SQLite databází | `lekce-04` |
| 5 | Autentizace: přihlášení, session, JWT *(2 h)* | 1. Základy webového vývoje | registrace, přihlášení, JWT v cookie, middleware | `lekce-05` |
| 6 | Propojení Reactu s backendem, validace dat | 1. + 2. blok | Zod validace na klientu i serveru, odpovědi, detail otázky | `lekce-06` |
| 7 | Práce s daty na klientu, komponenty, UI/UX | 2. Návrh a plánování | vyhledávání, filtry, řazení, responzivita, přístupnost | `lekce-07` |
| 8 | Git v týmu a testování | 2. Návrh a plánování | Vitest testy, git workflow, šablona PR | `lekce-08` |
| 9 | Bezpečnost webu: autorizace, útoky, obrana | 1. + 4. blok | role, oprávnění, rate limiting, bezpečnostní hlavičky | `lekce-09` |
| 10 | Nasazení, cloud a CI/CD | 4. SaaS a moderní architektury | Dockerfile, GitHub Actions, health check, `.env` | `lekce-10` |
| 11 | SaaS a architektura aplikací | 4. SaaS a moderní architektury | více škol v jedné aplikaci (multi-tenancy), OpenAPI dokumentace | `lekce-11` |
| 12 | Od kódu k produktu: MVP, SEO, podnikání | 2. + 3. blok | landing page, SEO metadata, MVP a ceník v `docs/produkt/` | `lekce-12` |
| 13 | AI ve vývoji a shrnutí kroužku | volitelné doplňky | AI návrh odpovědi pro lektora, `docs/ai-ve-vyvoji.md` | `lekce-13` |

## Jak s repem pracovat během kroužku

Každá lekce má v repu jeden commit a tag `lekce-XX`. Stav projektu po libovolné lekci si zobrazíš takto:

```bash
git checkout lekce-05     # stav po lekci 5
git checkout main         # zpátky na nejnovější verzi
```

Rozdíl mezi dvěma lekcemi (co přesně se změnilo) ukáže:

```bash
git diff lekce-05 lekce-06 --stat
```

Ke každé lekci je v `docs/lekce/` krátký zápis: co jsme probírali, které soubory si projít a malý úkol na doma.

## Návaznost na osnovu

Osnova kroužku měla čtyři bloky a volitelné doplňky. V lekcích jsou pokryté takto:

1. **Základy webového vývoje** (frontend vs. backend, API, MVC, HTTP, zabezpečení, moderní technologie): lekce 1–6 a 9.
2. **Základy webového návrhu a plánování** (UX/UI, databáze, projektové plánování, Git, testování): lekce 4, 7, 8 a 12.
3. **Základy podnikání ve webovém vývoji** (weby vs. systémy, marketing a SEO, komunikace se zákazníky, finance): lekce 12.
4. **SaaS a moderní architektury** (SaaS, mikroservisy, cloud, CI/CD, zabezpečení SaaS): lekce 10 a 11.
5. **Volitelné doplňky** (DevOps, API design a dokumentace, mobil vs. web, etika): průběžně v lekcích 10, 11 a 13.
