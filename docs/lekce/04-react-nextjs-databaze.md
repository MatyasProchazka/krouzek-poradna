# Lekce 4 – React, Next.js, komunikace FE–BE a databáze

## Co jsme probírali

- Proč React: komponenty, stav (`useState`), deklarativní vykreslování. Porovnání s ručním `innerHTML` z lekce 2.
- JSX: HTML-like zápis v JavaScriptu, `className`, `{výrazy}`, seznamy a `key`.
- Next.js jako framework nad Reactem: routování podle souborů, serverové a klientské komponenty, API přímo v projektu (Route Handlers).
- Dva způsoby, jak se frontend dostane k datům: serverová komponenta čte rovnou z databáze, klientská komponenta volá API přes `fetch`.
- Databáze: relační vs. NoSQL, tabulky, řádky, sloupce, primární klíč, datové typy.
- SQL a CRUD: `SELECT`, `INSERT`, `UPDATE`, `DELETE`. Parametry a SQL injection.
- Migrace: jak se struktura databáze mění v čase.

## Soubory k prohlédnutí

- [`app/src/lib/db.js`](../../app/src/lib/db.js): připojení k SQLite a migrace
- [`app/src/lib/questions.js`](../../app/src/lib/questions.js): CRUD funkce v SQL
- [`app/src/app/page.js`](../../app/src/app/page.js): serverová komponenta, která čte z databáze
- [`app/src/components/QuestionForm.js`](../../app/src/components/QuestionForm.js): klientská komponenta se stavem
- [`app/src/app/api/questions/route.js`](../../app/src/app/api/questions/route.js): API endpoint

## Spuštění

```bash
cd app
npm install
npm run dev
```

Otevři `http://localhost:3000`. Databáze `poradna.db` se vytvoří sama při prvním spuštění. Prohlédnout si ji můžeš rozšířením *SQLite Viewer* ve VS Code.

## Úkol na doma

1. Přidej do `questions.js` funkci `updateQuestion` a endpoint, který ji zavolá.
2. Otevři `poradna.db` v SQLite Vieweru a zkus ručně napsat SQL dotaz, který vrátí jen otázky z kategorie „backend“.
3. Rozděl seznam otázek na stránce do samostatné komponenty `QuestionCard`.
