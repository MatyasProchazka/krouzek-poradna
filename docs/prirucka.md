# Příručka: nastavení nástrojů a služeb

Tady najdeš všechno, co potřebuješ nainstalovat a nastavit, abys mohl projekt spustit a sledovat kroužek. Kapitoly přibývají postupně s lekcemi, ve kterých nástroj poprvé použijeme.

## Obsah

1. [Node.js](#1-nodejs)
2. [Visual Studio Code](#2-visual-studio-code)
3. [Terminál](#3-terminál)
4. [Git a GitHub](#4-git-a-github)
5. [Testování API (Postman / Thunder Client)](#5-testování-api-postman--thunder-client)
6. [Next.js aplikace a SQLite](#6-nextjs-aplikace-a-sqlite)
7. [Proměnné prostředí a tajné klíče](#7-proměnné-prostředí-a-tajné-klíče)

---

## 1. Node.js

Node.js umožňuje spouštět JavaScript mimo prohlížeč, typicky na serveru. Spolu s ním se nainstaluje `npm`, správce balíčků (knihoven).

1. Stáhni verzi **LTS** (22 nebo novější) z [nodejs.org](https://nodejs.org).
2. Nainstaluj s výchozím nastavením.
3. Ověř v terminálu:

```bash
node -v    # např. v22.12.0
npm -v     # např. 10.9.0
```

> **Tip:** Pokud potřebuješ mít víc verzí Node.js najednou, použij [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) nebo [nvm-windows](https://github.com/coreybutler/nvm-windows).

## 2. Visual Studio Code

Editor, ve kterém budeme psát kód. Stáhneš ho z [code.visualstudio.com](https://code.visualstudio.com).

Doporučená rozšíření (Extensions, `Ctrl+Shift+X`):

| Rozšíření | K čemu je |
|-----------|-----------|
| **ESLint** | upozorňuje na chyby v JavaScriptu |
| **Prettier** | automaticky formátuje kód |
| **Live Server** | otevře HTML soubor v prohlížeči a obnovuje ho při uložení (lekce 2) |
| **SQLite Viewer** | prohlížení databáze přímo ve VS Code (od lekce 4) |
| **GitLens** | přehledná historie gitu |

Užitečné nastavení: *Settings → Format On Save* zapnout.

## 3. Terminál

Terminál (příkazová řádka) budeme používat ke spouštění serveru, instalaci balíčků a práci s gitem.

- **Windows:** použij terminál přímo ve VS Code (`Ctrl+ö` nebo *View → Terminal*), případně Windows Terminal s PowerShellem.
- **macOS / Linux:** aplikace Terminál, případně terminál ve VS Code.

Základní příkazy:

| Příkaz | Co dělá |
|--------|---------|
| `cd slozka` | přejde do složky |
| `cd ..` | o úroveň výš |
| `ls` (Windows PowerShell taky `dir`) | vypíše obsah složky |
| `Ctrl+C` | ukončí běžící program (např. server) |

## 4. Git a GitHub

**Git** je systém pro správu verzí: pamatuje si každou změnu v kódu. **GitHub** je služba, kde jsou git repozitáře uložené online a kde se na nich dá spolupracovat.

### Instalace

1. Stáhni git z [git-scm.com](https://git-scm.com) a nainstaluj (výchozí volby jsou v pořádku).
2. Nastav jméno a e-mail, které se budou zapisovat do commitů:

```bash
git config --global user.name "Jan Novák"
git config --global user.email "jan.novak@example.com"
```

3. Založ si účet na [github.com](https://github.com).

### Stažení projektu kroužku

```bash
git clone https://github.com/<uzivatel>/krouzek-poradna.git
cd krouzek-poradna
```

### Přepínání mezi lekcemi

```bash
git tag                   # seznam všech lekcí
git checkout lekce-03     # stav po lekci 3
git checkout main         # nejnovější stav
```

Podrobněji se gitu věnuje lekce 8.

## 5. Testování API (Postman / Thunder Client)

Od lekce 3 má projekt vlastní API. Volat ho můžeš i bez frontendu, a právě tak se API při vývoji nejčastěji zkouší.

**Možnost A: Thunder Client** (rozšíření do VS Code, nejjednodušší)

1. Nainstaluj rozšíření *Thunder Client*.
2. V levém panelu klikni na ikonu blesku → *New Request*.
3. Zadej metodu (GET/POST…) a adresu, např. `http://localhost:3000/api/questions`.
4. U POST požadavku vyplň na záložce *Body → JSON* tělo, např.:

```json
{ "title": "Co je to API?", "category": "backend" }
```

**Možnost B: Postman** (samostatná aplikace z [postman.com](https://www.postman.com/downloads/)) funguje stejně, jen má víc funkcí, třeba sdílení kolekcí požadavků.

**Možnost C: curl** (v terminálu, na Windows je od verze 10 předinstalovaný):

```bash
curl http://localhost:3000/api/questions
curl -X POST http://localhost:3000/api/questions -H "Content-Type: application/json" -d "{\"title\":\"Co je to API?\",\"category\":\"backend\"}"
```

## 6. Next.js aplikace a SQLite

Od lekce 4 žije hlavní aplikace ve složce `app/`.

```bash
cd app
npm install      # stáhne Next.js, React a ovladač databáze
npm run dev      # vývojový server na http://localhost:3000
```

**Databáze.** Používáme SQLite, tedy databázi v jediném souboru `app/poradna.db`. Nic se neinstaluje, soubor se vytvoří sám při prvním spuštění a migrace v `src/lib/db.js` do něj doplní tabulky.

- Prohlížení dat: rozšíření **SQLite Viewer** ve VS Code (stačí na soubor kliknout), nebo aplikace [DB Browser for SQLite](https://sqlitebrowser.org).
- Začít s čistou databází: zastav server a smaž `poradna.db` (případně i `poradna.db-wal` a `poradna.db-shm`).
- Soubor databáze se do gitu neukládá (je v `.gitignore`), každý má svoji.

**Problémy s instalací `better-sqlite3`.** Ovladač databáze je nativní modul. Pro běžné systémy se stáhne hotový, ale na Windows se občas musí sestavit. Pokud `npm install` skončí chybou kolem `node-gyp`:

1. Ujisti se, že máš Node.js ve verzi LTS (ne nejnovější „Current“), pro které existují hotové balíčky.
2. Případně nainstaluj *Visual Studio Build Tools* s volbou „Desktop development with C++“ a spusť `npm install` znovu.

## 7. Proměnné prostředí a tajné klíče

Některé údaje se nesmí objevit v kódu ani v gitu: hesla k databázím, API klíče, tajný klíč pro podepisování tokenů. Ukládají se do **proměnných prostředí**, které si každý nastaví sám.

V Next.js to funguje přes soubory `.env`:

| Soubor | Do gitu? | K čemu |
|--------|----------|--------|
| `.env.example` | **ano** | vzor: jaké proměnné aplikace potřebuje, bez skutečných hodnot |
| `.env.local` | **ne** | tvoje skutečné hodnoty pro vývoj na vlastním počítači |

Postup:

```bash
cd app
cp .env.example .env.local        # Windows: copy .env.example .env.local
```

Pak v `.env.local` nahraď `JWT_SECRET` náhodným řetězcem. Vygeneruješ ho třeba takto:

```bash
node -e "console.log(crypto.randomUUID() + crypto.randomUUID())"
```

> Při vývoji (`npm run dev`) aplikace poběží i bez `.env.local` s náhradním klíčem. V produkčním režimu (`npm run build && npm start`) ale bez `JWT_SECRET` záměrně spadne.

Když tajný klíč omylem commitneš, nestačí ho smazat dalším commitem, v historii gitu zůstane. Klíč je potřeba **změnit** (vygenerovat nový).
