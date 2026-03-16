# Lekce 5 – Autentizace: přihlášení, session, JWT *(2 hodiny)*

## Co jsme probírali

- Autentizace (kdo jsi) vs. autorizace (co smíš). Autorizaci řešíme v lekci 9.
- Proč se hesla neukládají: hash, sůl, proč je bcrypt schválně pomalý.
- HTTP je bezstavové. Jak si server „pamatuje“ přihlášení: session na serveru vs. JWT.
- Anatomie JWT: hlavička, data, podpis. Proč data v tokenu nejsou tajná. Ukázka na jwt.io.
- Cookies a jejich bezpečnostní vlastnosti: `httpOnly`, `secure`, `sameSite`.
- Middleware: ochrana stránek a API na jednom místě.
- Proměnné prostředí a tajné klíče: `.env.local` nikdy do gitu.
- Bezpečné chybové hlášky při přihlášení (neprozrazovat, jestli účet existuje).

## Soubory k prohlédnutí

- [`app/src/lib/auth.js`](../../app/src/lib/auth.js): hashování hesel, cookie, aktuální uživatel
- [`app/src/lib/jwt.js`](../../app/src/lib/jwt.js): vytvoření a ověření tokenu
- [`app/src/middleware.js`](../../app/src/middleware.js): ochrana stránky `/ptat-se`
- [`app/src/app/api/auth/`](../../app/src/app/api/auth/): registrace, přihlášení, odhlášení
- [`app/src/components/AuthForm.js`](../../app/src/components/AuthForm.js): jedna komponenta pro dva formuláře
- [`app/src/lib/db.js`](../../app/src/lib/db.js): migrace č. 2 (tabulka `users`)

## Spuštění

```bash
cd app
cp .env.example .env.local    # Windows: copy .env.example .env.local
npm install
npm run dev
```

Zaregistruj se, polož otázku a pak se ve vývojářských nástrojích podívej do *Application → Cookies* na cookie `poradna_session`. Její hodnotu vlož na [jwt.io](https://jwt.io).

## Úkol na doma

1. Změň platnost tokenu na 1 minutu a vyzkoušej, co se stane, když vyprší.
2. Uprav hlavičku, aby se u přihlášeného uživatele zobrazovalo i jeho první písmeno v kolečku (avatar).
3. Promysli: co by se muselo změnit, kdybychom místo JWT chtěli session uložené v databázi?
