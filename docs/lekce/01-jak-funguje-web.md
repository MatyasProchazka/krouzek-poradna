# Lekce 1 – Úvod do kroužku a jak funguje web

## Co jsme probírali

- Jak bude kroužek probíhat: online v MS Teams, jednou týdně, záznamy, dotazy kdykoli ve skupině.
- Co je projekt Poradna a jak ho budeme lekci po lekci stavět.
- Cesta požadavku: adresa v prohlížeči → DNS → server → odpověď → vykreslení stránky.
- Klient a server, protokol HTTP, metody (GET, POST…), stavové kódy (200, 404, 500…), hlavičky.
- Stránka (HTML) vs. data (JSON).

## Soubory k prohlédnutí

- [`lekce-01-jak-funguje-web/server.js`](../../lekce-01-jak-funguje-web/server.js): webový server na 40 řádcích, bez knihoven.

## Spuštění

```bash
cd lekce-01-jak-funguje-web
node server.js
```

Otevři `http://localhost:3000` a vývojářské nástroje prohlížeče (F12 → Network).

## Úkol na doma

1. Nainstaluj si podle [příručky](../prirucka.md) Node.js, VS Code a git.
2. Přidej do serveru adresu `/api/vtip`, která vrátí náhodný vtip ve formátu JSON.
3. Na libovolném webu (třeba seznam.cz) se podívej do záložky Network: kolik požadavků stránka udělá a jaké stavové kódy vidíš?
