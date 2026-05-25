// ============================================================================
// Organizace (školy) – základ SaaS
// ----------------------------------------------------------------------------
// SaaS (Software as a Service) = jedna aplikace, kterou si "pronajímá" mnoho
// zákazníků. Každý zákazník (tady škola) je TENANT a vidí jen svoje data,
// přestože všichni sdílí stejný kód, server i databázi.
//
// Používáme nejjednodušší model multi-tenancy: sdílené tabulky se sloupcem
// organization_id. Alternativy (samostatná databáze nebo schéma pro každého
// zákazníka) jsou popsané v docs/architektura.md.
// ============================================================================

import { randomBytes } from "node:crypto";
import { db } from "./db";

export const PLANS = {
  free: { name: "Zdarma", maxMembers: 30 },
  skola: { name: "Škola", maxMembers: 1000 },
};

function toOrganization(row) {
  return {
    id: row.id,
    name: row.name,
    inviteCode: row.invite_code,
    plan: row.plan,
    createdAt: row.created_at,
  };
}

/** Náhodný a čitelný kód pozvánky, např. "K7Q-2MX-9PD" */
export function generateInviteCode() {
  // Bez znaků, které se pletou (0/O, 1/I/L)
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(9);
  const chars = [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
  return `${chars.slice(0, 3)}-${chars.slice(3, 6)}-${chars.slice(6, 9)}`;
}

export function getOrganization(id) {
  const row = db.prepare("SELECT * FROM organizations WHERE id = ?").get(id);
  return row ? toOrganization(row) : null;
}

export function findOrganizationByInvite(code) {
  const row = db.prepare("SELECT * FROM organizations WHERE invite_code = ?").get(code.trim().toUpperCase());
  return row ? toOrganization(row) : null;
}

export function createOrganization({ name }) {
  const result = db
    .prepare("INSERT INTO organizations (name, invite_code) VALUES (?, ?)")
    .run(name, generateInviteCode());
  return getOrganization(result.lastInsertRowid);
}

export function countMembers(organizationId) {
  return db.prepare("SELECT COUNT(*) AS n FROM users WHERE organization_id = ?").get(organizationId).n;
}

/** Vygeneruje nový kód pozvánky (např. když starý unikl na veřejnost) */
export function regenerateInviteCode(organizationId) {
  db.prepare("UPDATE organizations SET invite_code = ? WHERE id = ?").run(generateInviteCode(), organizationId);
  return getOrganization(organizationId);
}
