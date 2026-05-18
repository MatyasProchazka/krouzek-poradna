# Lekce 10 – Nasazení, cloud a CI/CD

## Co jsme probírali

- Cesta kódu z počítače k uživatelům: build → artefakt → server → doména → HTTPS.
- Typy hostingu: sdílený webhosting, VPS, PaaS (Railway, Render, Fly.io), serverless (Vercel, Netlify), velký cloud (AWS, Azure, Google Cloud). Kdy co dává smysl a kolik to stojí.
- Proč se SQLite soubor nehodí na serverless (Vercel): souborový systém je dočasný. Řešení: trvalý disk (volume), nebo databáze jako služba (Postgres na Neonu, Turso).
- Docker: image vs. kontejner, Dockerfile, vrstvy a cache, multi-stage build, volume pro data, běh pod ne-root uživatelem.
- Konfigurace přes proměnné prostředí (12-factor app). Stejný image pro vývoj i produkci.
- CI/CD v GitHub Actions: workflow, job, step. Automatické testy a build u každého PR, automatické sestavení image po merge.
- Monitoring: health check, logy, UptimeRobot. Dependabot pro aktualizace.
- DevOps jako kultura: kdo kód napíše, ten ho i provozuje.

## Soubory k prohlédnutí

- [`app/Dockerfile`](../../app/Dockerfile): sestavení image ve dvou fázích
- [`app/docker-compose.yml`](../../app/docker-compose.yml): spuštění jedním příkazem
- [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml): CI/CD pipeline
- [`.github/dependabot.yml`](../../.github/dependabot.yml): automatické aktualizace závislostí
- [`app/src/app/api/health/route.js`](../../app/src/app/api/health/route.js): health check
- [`app/next.config.mjs`](../../app/next.config.mjs): `output: "standalone"`

## Spuštění v Dockeru

```bash
cd app
docker compose up --build
```

Postup pro nasazení na internet je v [příručce → Nasazení](../prirucka.md#11-nasazení-na-internet).

## Vyzkoušej

1. Pushni změnu do svého forku a sleduj na GitHubu záložku **Actions**.
2. Schválně rozbij test, pushni a podívej se, jak vypadá neúspěšný běh.
3. Zastav kontejner (`docker compose down`) a znovu ho spusť. Data v databázi zůstanou, protože jsou ve volume.

## Úkol na doma

1. Přidej do CI krok `npm audit --audit-level=high`.
2. Nasaď si Poradnu na Railway podle příručky a pošli odkaz do skupiny.
3. Zaregistruj si zdarma [UptimeRobot](https://uptimerobot.com) a nastav kontrolu na `/api/health`.
