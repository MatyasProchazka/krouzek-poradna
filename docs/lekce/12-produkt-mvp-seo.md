# Lekce 12 – Od kódu k produktu: MVP, SEO a podnikání

## Co jsme probírali

- Produktové myšlení: nejdřív problém a uživatel, potom technologie.
- Persony, hodnotová nabídka, user stories, akceptační kritéria.
- MVP a prioritizace MoSCoW. Proč vydat brzy a učit se od uživatelů.
- Metriky: aktivace, retence, hlavní metrika.
- Agilní řízení v praxi: backlog, GitHub Issues a Projects, sprinty, retrospektiva.
- Landing page: struktura, hlavní sdělení, CTA, ceník.
- SEO: metadata, Open Graph, `robots.txt`, `sitemap.xml`, strukturovaná data (JSON-LD), sémantické HTML, rychlost. GEO pro AI asistenty.
- Podnikání: weby vs. systémy, nacenění, smlouva, fakturace a formy podnikání, komunikace se zákazníkem, marketing, čísla SaaS (MRR, churn, CAC, LTV).

## Soubory k prohlédnutí

- [`docs/produkt/mvp.md`](../produkt/mvp.md): produktový plán Poradny
- [`docs/produkt/podnikani.md`](../produkt/podnikani.md): podnikání ve webovém vývoji
- [`app/src/components/Landing.js`](../../app/src/components/Landing.js): landing page
- [`app/src/app/layout.js`](../../app/src/app/layout.js): SEO metadata a Open Graph
- [`app/src/app/robots.js`](../../app/src/app/robots.js) a [`sitemap.js`](../../app/src/app/sitemap.js)
- [`.github/ISSUE_TEMPLATE/`](../../.github/ISSUE_TEMPLATE/): šablony pro user stories a chyby

## Vyzkoušej

1. Odhlas se a prohlédni si landing page na počítači i na mobilu.
2. Otevři `http://localhost:3000/robots.txt` a `/sitemap.xml`.
3. Pusť Lighthouse a podívej se na skóre v kategorii *SEO*.
4. Strukturovaná data ověř v [Rich Results Testu](https://search.google.com/test/rich-results) (po nasazení na internet).

## Úkol na doma

1. Napiš 3 user stories pro funkci, která v Poradně chybí, a založ je jako issues.
2. Vymysli produkt, který by řešil problém z tvého okolí. Sepiš problém, personu a MVP na jednu stránku.
3. Zkus nacenit jednoduchý web pro místní firmu: rozpad na úkoly, odhad hodin, cena.
