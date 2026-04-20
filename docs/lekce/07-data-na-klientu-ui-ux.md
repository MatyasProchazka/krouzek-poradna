# Lekce 7 – Práce s daty na klientu, komponenty v Reactu a UI/UX

## Co jsme probírali

- Jak rozdělit stránku na komponenty: prezentační (`QuestionCard`, `CategoryBadge`) a ty s logikou (`QuestionList`).
- Kudy tečou data: server načte, klient dostane přes props a zpracuje.
- Filtrování, vyhledávání (bez diakritiky) a řazení na klientu. Kdy to stačí a kdy patří na server (stránkování, SQL `WHERE`).
- Stav v URL místo `useState`: sdílitelné odkazy, funkční tlačítko Zpět.
- `useMemo` a kdy se vyplatí optimalizovat.
- Principy UX: srozumitelnost, zpětná vazba (načítání, „odesílám…“), prázdné stavy, chybové stránky, relativní čas, české skloňování.
- Responzivita (Grid, media queries) a tmavý režim podle systému (`prefers-color-scheme`).
- Přístupnost: skip link, text jen pro čtečky (`sr-only`), `aria-live`, `aria-pressed`, barva nikdy jako jediný nositel informace, `prefers-reduced-motion`.

## Soubory k prohlédnutí

- [`app/src/components/QuestionList.js`](../../app/src/components/QuestionList.js): filtry, hledání, stav v URL
- [`app/src/components/QuestionCard.js`](../../app/src/components/QuestionCard.js): prezentační komponenta
- [`app/src/lib/filter.js`](../../app/src/lib/filter.js): čistá funkce pro filtrování a řazení
- [`app/src/lib/format.js`](../../app/src/lib/format.js): skloňování a relativní čas
- [`app/src/app/loading.js`](../../app/src/app/loading.js) a [`not-found.js`](../../app/src/app/not-found.js): stavy načítání a chyby
- [`app/src/app/globals.css`](../../app/src/app/globals.css): sekce „Lekce 7“

## Vyzkoušej

1. Vyhledej „reseni“ bez háčků a ověř, že najde i „řešení“.
2. Nastav filtr a pošli si odkaz do jiného okna. Filtr zůstane.
3. Projdi celou stránku jen klávesou Tab. Vidíš vždy, kde je focus?
4. Přepni systém do tmavého režimu.

## Úkol na doma

1. Přidej filtr „Moje otázky“ (jen otázky přihlášeného uživatele).
2. Zvýrazni v nalezených otázkách hledané slovo (prvek `<mark>`).
3. Otestuj stránku nástrojem **Lighthouse** (F12 → Lighthouse) a oprav aspoň jednu věc z části *Accessibility*.
