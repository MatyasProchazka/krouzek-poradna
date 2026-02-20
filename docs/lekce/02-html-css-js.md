# Lekce 2 – Základy webu: HTML, CSS, JavaScript

## Co jsme probírali

- Tři jazyky webu a jejich role: HTML (struktura), CSS (vzhled), JavaScript (chování).
- Sémantické HTML, formuláře a proč má každé pole svůj `<label>`.
- CSS selektory, proměnné, box model, Flexbox a Grid, responzivita přes media queries.
- JavaScript v prohlížeči: DOM, události, vykreslování dat do stránky.
- Proč vkládat text od uživatele přes `textContent` a ne přes `innerHTML` (první seznámení s XSS).

## Soubory k prohlédnutí

- [`lekce-02-html-css-js/index.html`](../../lekce-02-html-css-js/index.html): struktura stránky
- [`lekce-02-html-css-js/styles.css`](../../lekce-02-html-css-js/styles.css): vzhled a responzivní rozložení
- [`lekce-02-html-css-js/app.js`](../../lekce-02-html-css-js/app.js): data, vykreslení a obsluha formuláře

## Spuštění

Otevři `index.html` v prohlížeči. Pohodlnější je rozšíření **Live Server** ve VS Code (pravým tlačítkem na soubor → *Open with Live Server*), které stránku obnoví při každém uložení.

## Úkol na doma

1. Ulož otázky do `localStorage`, aby po obnovení stránky nezmizely.
2. Přidej ke každé otázce tlačítko „Smazat“.
3. Zkus stránku zúžit ve vývojářských nástrojích (F12 → ikona telefonu) a uprav CSS, aby vypadala dobře i na mobilu.
