# Poradna – projekt kroužku Základy webového vývoje

Ukázkový projekt, na kterém si v kroužku krok za krokem ukazujeme, jak vzniká moderní webová aplikace. **Poradna** je jednoduchý systém otázek a odpovědí: studenti se ptají na cokoliv z IT a lektor jim odpovídá.

Projekt roste s kroužkem. Každá lekce do něj přidá jednu vrstvu a má vlastní tag (`lekce-01`, `lekce-02`, …), takže se můžeš kdykoli vrátit ke stavu po libovolné lekci.

## Struktura

```
lekce-01-jak-funguje-web/   miniaturní HTTP server bez knihoven
lekce-02-html-css-js/       statický prototyp Poradny (HTML, CSS, JS)
lekce-03-api/               REST API v Expressu + frontend volající fetch
app/                        hlavní aplikace Poradna (Next.js + SQLite), od lekce 4
docs/                       plán kroužku, příručka, zápisy z lekcí
```

## Rychlý start

Potřebuješ jen [Node.js](https://nodejs.org) (verze 22 nebo novější). Návod k instalaci je v [příručce](docs/prirucka.md).

```bash
cd app
npm install
npm run dev
```

Pak otevři http://localhost:3000. Starší lekce (01–03) se spouštějí podle zápisů v `docs/lekce/`.

## Dokumentace

- [Plán kroužku](docs/plan-krouzku.md) – přehled všech lekcí a co v nich v repu přibude
- [Příručka](docs/prirucka.md) – instalace a nastavení nástrojů a služeb
- [Zápisy z lekcí](docs/lekce/) – co jsme probírali a úkoly na doma
- [Architektura](docs/architektura.md) – diagramy vrstev a datového modelu
- [API](docs/api/openapi.yaml) – popis endpointů ve formátu OpenAPI
- [Jak pracujeme s gitem](docs/git-workflow.md)
