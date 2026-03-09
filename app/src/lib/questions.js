// ============================================================================
// Práce s otázkami (datová vrstva / model)
// ----------------------------------------------------------------------------
// Stejné funkce jako v lekci 3 (questions-store.js), jen místo pole v paměti
// teď mluvíme s databází pomocí SQL. Zbytek aplikace se o SQL nestará.
//
// CRUD = čtyři základní operace s daty:
//   Create → INSERT   Read → SELECT   Update → UPDATE   Delete → DELETE
// ============================================================================

import { db } from "./db";

// Převod řádku z databáze (snake_case) na objekt pro JavaScript (camelCase).
function toQuestion(row) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    category: row.category,
    createdAt: row.created_at,
  };
}

/** READ – všechny otázky, nejnovější první */
export function listQuestions() {
  const rows = db.prepare("SELECT * FROM questions ORDER BY created_at DESC").all();
  return rows.map(toQuestion);
}

/** READ – jedna otázka podle id */
export function getQuestion(id) {
  // Otazník je PARAMETR. Hodnotu nikdy nevkládáme do SQL přímo do textu
  // (např. `WHERE id = ${id}`). Útočník by mohl poslat kus SQL kódu
  // a databáze by ho provedla, tomu se říká SQL injection.
  // Parametry databáze bezpečně dosadí sama.
  const row = db.prepare("SELECT * FROM questions WHERE id = ?").get(id);
  return row ? toQuestion(row) : null;
}

/** CREATE – uloží novou otázku a vrátí ji */
export function createQuestion({ title, body, category }) {
  const result = db
    .prepare("INSERT INTO questions (title, body, category) VALUES (?, ?, ?)")
    .run(title, body, category);
  return getQuestion(result.lastInsertRowid);
}

/** DELETE – smaže otázku, vrací true, pokud něco smazal */
export function deleteQuestion(id) {
  const result = db.prepare("DELETE FROM questions WHERE id = ?").run(id);
  return result.changes > 0;
}
