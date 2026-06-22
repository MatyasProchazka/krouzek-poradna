# Poradna – projekt kroužku Základy webového vývoje

Ukázkový projekt, na kterém si v kroužku krok za krokem ukazujeme, jak vzniká moderní webová aplikace. **Poradna** je jednoduchý systém otázek a odpovědí pro školy: studenti se ptají na cokoliv z IT, lektor i spolužáci odpovídají.

Projekt roste s kroužkem. Každá lekce do něj přidá jednu vrstvu a má vlastní tag (`lekce-01` až `lekce-13`), takže se můžeš kdykoli vrátit ke stavu po libovolné lekci:

```bash
git checkout lekce-05      # stav po lekci 5
git checkout main          # nejnovější verze
```

## Co Poradna umí

- registrace, přihlášení (JWT v `httpOnly` cookie), role student / lektor
- otázky, odpovědi, označení správné odpovědi
- vyhledávání bez diakritiky, filtry a řazení, stav filtru v adrese
- validace na klientu i serveru (Zod), oprávnění, rate limiting, bezpečnostní hlavičky
- více škol v jedné aplikaci (SaaS, multi-tenancy) s pozvánkami
- landing page, SEO metadata, sitemap, strukturovaná data
- AI návrh odpovědi pro lektora
- testy (Vitest), CI/CD (GitHub Actions), Docker

## Struktura

```
lekce-01-jak-funguje-web/   lekce 1: miniaturní HTTP server bez knihoven
lekce-02-html-css-js/       lekce 2: statický prototyp Poradny
lekce-03-api/               lekce 3: REST API v Expressu + frontend volající fetch
app/                        lekce 4–13: hlavní aplikace (Next.js + SQLite)
  src/app/                  stránky a API (routování podle složek)
  src/components/           React komponenty
  src/lib/                  logika: databáze, validace, oprávnění, AI…
  tests/                    automatické testy
docs/                       plán kroužku, příručka, zápisy z lekcí, architektura
.github/                    CI/CD, šablony pro issues a pull requesty
```

## Rychlý start

Potřebuješ [Node.js](https://nodejs.org) ve verzi 22 nebo novější. Návod k instalaci je v [příručce](docs/prirucka.md).

```bash
cd app
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm install
npm run dev
```

Otevři http://localhost:3000. Ke škole z ukázkových dat se připojíš při registraci kódem `KROUZEK-2026`, nebo si založ vlastní školu. Lektora z účtu uděláš příkazem `npm run set-role -- tvuj@email.cz lektor`.

```bash
npm test        # testy
npm run build   # produkční build
```

## Dokumentace

- [Plán kroužku](docs/plan-krouzku.md) – přehled všech 13 lekcí a co v nich v repu přibylo
- [Příručka](docs/prirucka.md) – instalace a nastavení nástrojů a služeb (Node.js, git, Docker, nasazení, API klíče…)
- [Zápisy z lekcí](docs/lekce/) – co jsme probírali, soubory k prohlédnutí, úkoly na doma
- [Architektura](docs/architektura.md) – diagramy vrstev, multi-tenancy a datového modelu
- [API](docs/api/openapi.yaml) – popis endpointů ve formátu OpenAPI
- [Jak pracujeme s gitem](docs/git-workflow.md)
- [Produkt a MVP](docs/produkt/mvp.md) a [podnikání ve webovém vývoji](docs/produkt/podnikani.md)
- [AI ve vývoji](docs/ai-ve-vyvoji.md)
