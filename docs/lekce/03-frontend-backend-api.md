# Lekce 3 – Frontend vs. backend, API a používané technologie

## Co jsme probírali

- Co běží v prohlížeči (frontend) a co na serveru (backend) a proč to rozdělujeme.
- API jako smlouva mezi frontendem a backendem. REST: zdroje, HTTP metody, stavové kódy.
- Formát JSON.
- Architektura MVC: model (data), view (zobrazení), controller (logika požadavku).
- Proč backend nikdy nevěří datům z frontendu.
- Mapa technologií: React, Vue, Next.js, Node.js, Express, PHP, Python/Django, .NET, databáze, REST vs. GraphQL, Docker. Co se k čemu používá a co z toho budeme v kroužku potkávat.

## Soubory k prohlédnutí

- [`lekce-03-api/server.js`](../../lekce-03-api/server.js): REST API v Expressu (controller)
- [`lekce-03-api/questions-store.js`](../../lekce-03-api/questions-store.js): práce s daty (model)
- [`lekce-03-api/public/app.js`](../../lekce-03-api/public/app.js): frontend, který volá API přes `fetch`

## Spuštění

```bash
cd lekce-03-api
npm install
npm run dev
```

Otevři `http://localhost:3000`. API si můžeš vyzkoušet i samostatně, viz [příručka → Testování API](../prirucka.md#5-testování-api-postman--thunder-client).

## Úkol na doma

1. Přidej endpoint `PATCH /api/questions/:id`, který změní název otázky.
2. Zkus poslat přes Postman nebo Thunder Client otázku s neexistující kategorií. Co vrátí server?
3. Najdi na internetu nějaké veřejné API (třeba počasí) a zavolej ho z prohlížeče pomocí `fetch`.
