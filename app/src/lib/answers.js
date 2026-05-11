// ============================================================================
// Práce s odpověďmi (datová vrstva)
// ----------------------------------------------------------------------------
// Vztah 1:N (jedna ku mnoha): jedna otázka může mít mnoho odpovědí,
// každá odpověď patří právě jedné otázce (sloupec question_id).
// ============================================================================

import { db } from "./db";

function toAnswer(row) {
  return {
    id: row.id,
    questionId: row.question_id,
    body: row.body,
    createdAt: row.created_at,
    authorId: row.author_id,
    authorName: row.author_name ?? "Anonym",
    authorRole: row.author_role ?? "student",
  };
}

/** Odpovědi k jedné otázce, nejstarší první (jak šly za sebou) */
export function listAnswers(questionId) {
  const rows = db
    .prepare(
      `SELECT a.*, u.name AS author_name, u.role AS author_role
       FROM answers a
       LEFT JOIN users u ON u.id = a.author_id
       WHERE a.question_id = ?
       ORDER BY a.created_at ASC`,
    )
    .all(questionId);
  return rows.map(toAnswer);
}

export function createAnswer({ questionId, body, authorId }) {
  const result = db
    .prepare("INSERT INTO answers (question_id, body, author_id) VALUES (?, ?, ?)")
    .run(questionId, body, authorId);
  const row = db
    .prepare("SELECT a.*, u.name AS author_name, u.role AS author_role FROM answers a LEFT JOIN users u ON u.id = a.author_id WHERE a.id = ?")
    .get(result.lastInsertRowid);
  return toAnswer(row);
}

export function getAnswer(id) {
  const row = db.prepare("SELECT * FROM answers WHERE id = ?").get(id);
  return row ? toAnswer(row) : null;
}

export function deleteAnswer(id) {
  return db.prepare("DELETE FROM answers WHERE id = ?").run(id).changes > 0;
}
