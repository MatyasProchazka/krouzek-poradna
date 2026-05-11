# Lekce 9 – Bezpečnost webu: autorizace, útoky a obrana

## Co jsme probírali

- Autorizace: role (RBAC) a vlastnictví záznamů. Pravidla na jednom místě, „deny by default“.
- 401 vs. 403: nepřihlášený vs. nemá oprávnění.
- Proč nestačí schovat tlačítko: IDOR (změna ID v adrese) a volání API přímo.
- OWASP Top 10 v kostce a co z toho už Poradna řeší:
  - **SQL injection**: parametrizované dotazy (lekce 4)
  - **XSS**: React escapuje výstup, `textContent` místo `innerHTML` (lekce 2), CSP hlavička
  - **CSRF**: cookie `sameSite=lax` + API přijímá jen JSON (lekce 5)
  - **Brute force**: rate limiting přihlášení (429 Too Many Requests)
  - **Únik dat**: hash hesel, hash se nikdy neposílá ven, tajné klíče mimo git
  - **Clickjacking**: `X-Frame-Options` / `frame-ancestors`
- Bezpečnostní HTTP hlavičky a jejich kontrola na securityheaders.com.
- Obrana do hloubky (defense in depth): validace + oprávnění + omezení v databázi (`CHECK`).
- Závislosti jako riziko: `npm audit`, Dependabot.

## Soubory k prohlédnutí

- [`app/src/lib/permissions.js`](../../app/src/lib/permissions.js): všechna pravidla oprávnění
- [`app/src/lib/rate-limit.js`](../../app/src/lib/rate-limit.js): omezení počtu pokusů
- [`app/next.config.mjs`](../../app/next.config.mjs): bezpečnostní hlavičky
- [`app/src/app/api/questions/[id]/route.js`](../../app/src/app/api/questions/[id]/route.js): DELETE s kontrolou oprávnění
- [`app/scripts/set-role.mjs`](../../app/scripts/set-role.mjs): nastavení role lektora
- [`app/tests/permissions.test.js`](../../app/tests/permissions.test.js): testy oprávnění

## Vyzkoušej

1. Zaregistruj dva účty. Druhým účtem zkus přes Thunder Client smazat otázku prvního (`DELETE /api/questions/:id`). Dostaneš 403.
2. Udělej z jednoho účtu lektora: `npm run set-role -- tvuj@email.cz lektor`.
3. Zkus se šestkrát za minutu přihlásit se špatným heslem.
4. Pusť `npm audit` a podívej se, jestli projekt nemá zranitelné závislosti.

## Úkol na doma

1. Přidej pravidlo `question:edit` (smí jen autor, a to jen do 15 minut od vytvoření) a otestuj ho.
2. Do otázky zkus vložit `<img src=x onerror=alert(1)>`. Co se stane a proč?
3. Zkontroluj nějaký známý web na [securityheaders.com](https://securityheaders.com). Jakou dostal známku?
