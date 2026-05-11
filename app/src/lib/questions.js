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
    authorId: row.author_id,
    authorName: row.author_name ?? "Anonym",
    answerCount: row.answer_count ?? 0,
    acceptedAnswerId: row.accepted_answer_id ?? null,
  };
}

// JOIN spojí řádky dvou tabulek podle podmínky. LEFT JOIN vrátí otázku
// i tehdy, když nemá autora (starší otázky z lekce 4).
// Poddotaz (SELECT COUNT…) spočítá odpovědi ke každé otázce.
const SELECT_QUESTIONS = `
  SELECT q.*, u.name AS author_name,
         (SELECT COUNT(*) FROM answers a WHERE a.question_id = q.id) AS answer_count
  FROM questions q
  LEFT JOIN users u ON u.id = q.author_id
`;

/** READ – všechny otázky, nejnovější první */
export function listQuestions() {
  const rows = db.prepare(`${SELECT_QUESTIONS} ORDER BY q.created_at DESC`).all();
  return rows.map(toQuestion);
}

/** READ – jedna otázka podle id */
export function getQuestion(id) {
  // Otazník je PARAMETR. Hodnotu nikdy nevkládáme do SQL přímo do textu
  // (např. `WHERE id = ${id}`). Útočník by mohl poslat kus SQL kódu
  // a databáze by ho provedla, tomu se říká SQL injection.
  // Parametry databáze bezpečně dosadí sama.
  const row = db.prepare(`${SELECT_QUESTIONS} WHERE q.id = ?`).get(id);
  return row ? toQuestion(row) : null;
}

/** CREATE – uloží novou otázku a vrátí ji */
export function createQuestion({ title, body, category, authorId }) {
  const result = db
    .prepare("INSERT INTO questions (title, body, category, author_id) VALUES (?, ?, ?, ?)")
    .run(title, body, category, authorId);
  return getQuestion(result.lastInsertRowid);
}

/** DELETE – smaže otázku, vrací true, pokud něco smazal */
export function deleteQuestion(id) {
  const result = db.prepare("DELETE FROM questions WHERE id = ?").run(id);
  return result.changes > 0;
}

/** UPDATE – označí odpověď jako správnou (nebo zruší označení: answerId = null) */
export function setAcceptedAnswer(questionId, answerId) {
  db.prepare("UPDATE questions SET accepted_answer_id = ? WHERE id = ?").run(answerId, questionId);
  return getQuestion(questionId);
}
