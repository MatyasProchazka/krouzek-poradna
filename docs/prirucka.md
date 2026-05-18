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
8. [Účet lektora](#8-účet-lektora)
9. [Docker](#9-docker)
10. [GitHub Actions (CI/CD)](#10-github-actions-cicd)
11. [Nasazení na internet](#11-nasazení-na-internet)

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

Podrobněji se gitu věnuje lekce 8 a dokument [Jak pracujeme s gitem](git-workflow.md).

### Fork a pull request (lekce 8)

1. Na stránce repozitáře na GitHubu klikni na **Fork**: vytvoří se tvoje vlastní kopie.
2. Naklonuj si svůj fork: `git clone https://github.com/<tvuj-ucet>/krouzek-poradna.git`
3. Vytvoř větev, udělej změnu, commitni a pushni (`git push -u origin nazev-vetve`).
4. GitHub ti nabídne tlačítko **Compare & pull request**. Vyplň popis podle šablony a odešli.

> **Přihlášení ke GitHubu z terminálu:** při prvním `git push` se otevře okno prohlížeče (Git Credential Manager na Windows). Na macOS/Linuxu je nejjednodušší nainstalovat [GitHub CLI](https://cli.github.com) a spustit `gh auth login`.

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

## 8. Účet lektora

Od lekce 9 rozlišuje aplikace role **student** a **lektor**. Lektor smí mazat cizí otázky i odpovědi a označovat správné odpovědi. Každý nový účet je student. Lektora z něj udělá správce skriptem:

```bash
cd app
npm run set-role -- jana@example.cz lektor
```

Uživatel musí být nejdřív zaregistrovaný. Změna platí okamžitě, není potřeba se znovu přihlašovat (role se při každém požadavku čte z databáze, ne z tokenu).

## 9. Docker

Docker spouští aplikace v izolovaných kontejnerech. Na kroužku ho používáme k ukázce, jak se aplikace balí pro server (lekce 10). Pro běžný vývoj ho nepotřebuješ.

1. Nainstaluj **Docker Desktop** z [docker.com](https://www.docker.com/products/docker-desktop/) (Windows, macOS). Na Windows instalátor nabídne zapnutí WSL 2, potvrď.
2. Ověř: `docker --version` a `docker compose version`.
3. Spuštění Poradny:

```bash
cd app
docker compose up --build      # první build trvá pár minut
```

Aplikace poběží na `http://localhost:3000`. Zastavení: `Ctrl+C`, úklid: `docker compose down`. Data zůstanou ve volume `poradna-data`. Smazat je i s daty: `docker compose down -v`.

## 10. GitHub Actions (CI/CD)

Pipeline je v `.github/workflows/ci.yml` a na GitHubu se spouští **sama**, nic se nenastavuje.

- Výsledky: záložka **Actions** v repozitáři. U pull requestu se zobrazí zelená fajfka nebo červený křížek.
- Docker image se po pushi do `main` nahraje do **GitHub Container Registry** (`ghcr.io/<uzivatel>/<repo>`). Najdeš ho v repozitáři vpravo v sekci *Packages*. Ve výchozím stavu je soukromý, veřejným ho uděláš v nastavení balíčku (*Package settings → Change visibility*).
- Ve forku je potřeba Actions jednou povolit: záložka *Actions* → *I understand my workflows, go ahead and enable them*.

> Název image v ghcr.io musí být malými písmeny. Pokud má tvůj účet nebo repozitář velká písmena, uprav v `ci.yml` řádek `tags` ručně, např. `ghcr.io/jannovak/krouzek-poradna:latest`.

## 11. Nasazení na internet

Poradna ukládá data do souboru SQLite, potřebuje tedy hosting s **trvalým diskem**. Serverless platformy jako Vercel nebo Netlify disk po každém požadavku zahazují, data by mizela.

### Varianta A: Railway (nejjednodušší, má zkušební kredit)

1. Přihlas se na [railway.com](https://railway.com) přes GitHub.
2. *New Project → Deploy from GitHub repo* → vyber svůj fork.
3. V nastavení služby (*Settings*) nastav **Root Directory** na `app`. Railway najde `Dockerfile` a použije ho.
4. Přidej **Volume** (pravým tlačítkem na službu → *Attach volume*) s cestou `/data`.
5. V záložce **Variables** přidej `JWT_SECRET` s náhodnou hodnotou.
6. V *Settings → Networking* klikni na **Generate Domain**. Dostaneš adresu typu `poradna-production.up.railway.app`.

Po každém pushi do `main` Railway aplikaci sám znovu nasadí.

### Varianta B: vlastní VPS (např. levný server za ~100–150 Kč měsíčně)

```bash
# na serveru s nainstalovaným Dockerem
git clone https://github.com/<uzivatel>/krouzek-poradna.git
cd krouzek-poradna/app
echo "JWT_SECRET=$(openssl rand -hex 32)" > .env
docker compose up -d --build
```

Před aplikaci se pak dává reverzní proxy s HTTPS certifikátem, nejjednodušeji [Caddy](https://caddyserver.com), který certifikát od Let's Encrypt zařídí sám.

### Vlastní doména

U registrátora domény (např. Forpsi, Wedos, Active24) přidej v DNS záznam `CNAME` (nebo `A` u VPS) odkazující na adresu od hostingu. Změna DNS se projeví během minut až hodin.
