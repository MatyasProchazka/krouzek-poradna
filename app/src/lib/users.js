// ============================================================================
// Práce s uživateli (datová vrstva)
// ============================================================================

import { db } from "./db";

function toUser(row) {
  // Hash hesla schválně NEvracíme. Co se nepošle ven, nemůže uniknout.
  return { id: row.id, name: row.name, email: row.email, role: row.role, createdAt: row.created_at };
}

/** Najde uživatele podle e-mailu. Vrací i hash hesla, používá se jen při přihlášení. */
export function findUserByEmailWithPassword(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) ?? null;
}

export function getUserById(id) {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  return row ? toUser(row) : null;
}

export function createUser({ name, email, passwordHash }) {
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email.toLowerCase(), passwordHash);
  return getUserById(result.lastInsertRowid);
}
