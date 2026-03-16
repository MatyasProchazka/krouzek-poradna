// ============================================================================
// Databáze (SQLite)
// ----------------------------------------------------------------------------
// SQLite je RELAČNÍ databáze uložená v jediném souboru (poradna.db).
// Nepotřebuje žádný server ani instalaci, proto je ideální na učení
// i na menší projekty. Mluví se s ní jazykem SQL, stejně jako s PostgreSQL
// nebo MySQL, takže znalosti se dají přenést.
//
// Relační = data jsou v TABULKÁCH (řádky a sloupce) a tabulky se na sebe
// odkazují přes ID (cizí klíče). Opak jsou NoSQL databáze (např. MongoDB),
// které ukládají celé "dokumenty" ve formátu podobném JSONu.
// ============================================================================

import Database from "better-sqlite3";
import path from "node:path";

// Kde leží soubor s databází. Přes proměnnou prostředí DB_PATH ho jde změnit
// (testy například používají ":memory:" = databáze jen v paměti).
const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), "poradna.db");

// ----------------------------------------------------------------------------
// MIGRACE
// Struktura databáze (schéma) se během vývoje mění: v každé lekci můžou
// přibýt tabulky nebo sloupce. Migrace jsou kroky, které schéma postupně
// upravují. Databáze si pamatuje číslo poslední provedené migrace
// (PRAGMA user_version), takže při spuštění provede jen ty nové.
// Pravidlo: starou migraci NIKDY neměň, vždy přidej novou na konec.
// ----------------------------------------------------------------------------
const MIGRATIONS = [
  // 1 – Lekce 4: tabulka otázek + pár ukázkových dat
  `
  CREATE TABLE questions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,  -- unikátní číslo řádku, přiděluje databáze
    title       TEXT    NOT NULL,                   -- NOT NULL = hodnota je povinná
    body        TEXT    NOT NULL DEFAULT '',
    category    TEXT    NOT NULL,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  INSERT INTO questions (title, body, category, created_at) VALUES
    ('Jaký je rozdíl mezi frontendem a backendem?', 'Pořád to slyším, ale nevím, kde je hranice.', 'backend', '2026-02-18 18:30:00'),
    ('Proč se mi na mobilu stránka zobrazuje maličká?', 'Na počítači vypadá dobře, na telefonu je všechno malé.', 'frontend', '2026-02-19 20:10:00'),
    ('Co je to REST API?', 'V lekci padlo slovo endpoint, co to přesně je?', 'backend', '2026-03-03 17:45:00');
  `,

  // 2 – Lekce 5: uživatelé a autor otázky
  `
  CREATE TABLE users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE,           -- UNIQUE: jeden e-mail = jeden účet
    password_hash  TEXT NOT NULL,                  -- NIKDY neukládáme heslo, jen jeho hash
    created_at     TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Cizí klíč: author_id odkazuje na řádek v tabulce users.
  -- Starší otázky z lekce 4 autora nemají, proto je sloupec nepovinný (NULL).
  ALTER TABLE questions ADD COLUMN author_id INTEGER REFERENCES users(id);
  `,
];

function migrate(db) {
  const current = db.pragma("user_version", { simple: true });
  for (let i = current; i < MIGRATIONS.length; i++) {
    // Transakce: buď proběhne celá migrace, nebo nic. Databáze nikdy nezůstane
    // napůl upravená.
    db.transaction(() => {
      db.exec(MIGRATIONS[i]);
      db.pragma(`user_version = ${i + 1}`);
    })();
  }
}

function createDb() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");  // rychlejší souběžné čtení a zápis
  db.pragma("foreign_keys = ON");   // hlídej vazby mezi tabulkami
  migrate(db);
  return db;
}

// Při vývoji Next.js po každé změně kódu znovu načítá moduly. Abychom
// neotevírali stále nová spojení s databází, uložíme si to první do globalThis.
const globalForDb = globalThis;
export const db = globalForDb.__poradnaDb ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb.__poradnaDb = db;
