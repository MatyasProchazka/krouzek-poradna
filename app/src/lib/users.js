// ============================================================================
// Práce s uživateli (datová vrstva)
// ============================================================================

import { db } from "./db";
import { createOrganization, findOrganizationByInvite, countMembers, PLANS } from "./organizations";

function toUser(row) {
  // Hash hesla schválně NEvracíme. Co se nepošle ven, nemůže uniknout.
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    organizationId: row.organization_id,
    organizationName: row.organization_name ?? null,
    createdAt: row.created_at,
  };
}

/** Najde uživatele podle e-mailu. Vrací i hash hesla, používá se jen při přihlášení. */
export function findUserByEmailWithPassword(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) ?? null;
}

export function getUserById(id) {
  const row = db
    .prepare(
      `SELECT u.*, o.name AS organization_name
       FROM users u LEFT JOIN organizations o ON o.id = u.organization_id
       WHERE u.id = ?`,
    )
    .get(id);
  return row ? toUser(row) : null;
}

export function createUser({ name, email, passwordHash, organizationId = null, role = "student" }) {
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash, organization_id, role) VALUES (?, ?, ?, ?, ?)")
    .run(name, email.toLowerCase(), passwordHash, organizationId, role);
  return getUserById(result.lastInsertRowid);
}

/**
 * Registrace v SaaS: uživatel se buď připojí ke škole kódem pozvánky,
 * nebo založí novou školu a stane se jejím lektorem (správcem).
 * Vrací { user } nebo { errors } s chybami polí.
 */
export function registerAccount({ name, email, passwordHash, inviteCode, organizationName }) {
  if (inviteCode) {
    const org = findOrganizationByInvite(inviteCode);
    if (!org) return { errors: { inviteCode: "Takový kód pozvánky neexistuje." } };

    // Limit tarifu: typický SaaS model "zdarma do X uživatelů, pak placeně"
    if (countMembers(org.id) >= PLANS[org.plan].maxMembers) {
      return { errors: { inviteCode: "Škola má plný počet míst ve svém tarifu." } };
    }
    return { user: createUser({ name, email, passwordHash, organizationId: org.id }) };
  }

  // Založení nové organizace + prvního uživatele musí proběhnout celé, nebo vůbec.
  // Transakce zajistí, že nevznikne škola bez správce (nebo naopak).
  const create = db.transaction(() => {
    const org = createOrganization({ name: organizationName });
    return createUser({ name, email, passwordHash, organizationId: org.id, role: "lektor" });
  });
  return { user: create() };
}
