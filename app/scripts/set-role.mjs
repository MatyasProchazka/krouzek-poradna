// ============================================================================
// Nastavení role uživatele z příkazové řádky
// ----------------------------------------------------------------------------
// Lektora nejde vytvořit přes registraci (to by se mohl lektorem udělat
// kdokoli). Roli nastaví správce přímo v databázi tímhle skriptem.
//
// Použití:  npm run set-role -- jana@example.cz lektor
//           npm run set-role -- jana@example.cz student
//
// Aplikace musí být aspoň jednou spuštěná, aby databáze existovala,
// a uživatel musí být zaregistrovaný.
// ============================================================================

import Database from "better-sqlite3";
import path from "node:path";

const [email, role] = process.argv.slice(2);
const ROLES = ["student", "lektor"];

if (!email || !ROLES.includes(role)) {
  console.error("Použití: npm run set-role -- <email> <student|lektor>");
  process.exit(1);
}

const db = new Database(process.env.DB_PATH ?? path.join(process.cwd(), "poradna.db"));
const result = db.prepare("UPDATE users SET role = ? WHERE email = ?").run(role, email.toLowerCase());

if (result.changes === 0) {
  console.error(`Uživatel ${email} neexistuje. Nejdřív se zaregistruj v aplikaci.`);
  process.exit(1);
}

console.log(`✓ ${email} má teď roli „${role}“. Změna platí hned (role se čte z databáze).`);
