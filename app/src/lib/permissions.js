// ============================================================================
// Autorizace – "co smíš dělat?"
// ----------------------------------------------------------------------------
// Všechna pravidla oprávnění jsou na JEDNOM místě. Když se zeptáš "kdo smí
// mazat odpovědi?", odpověď najdeš tady, ne roztroušenou po deseti souborech.
//
// Používáme dvě úrovně:
//   ROLE (RBAC – role-based access control): lektor smí víc než student
//   VLASTNICTVÍ: autor smí spravovat svůj obsah
//
// Zlaté pravidlo: oprávnění se kontrolují na SERVERU. Schovat tlačítko
// v UI je jen pohodlí pro uživatele, ne zabezpečení. Útočník pošle
// požadavek přímo na API (to jsme si zkoušeli v lekci 6).
// ============================================================================

export const ROLES = {
  student: "Student",
  lektor: "Lektor",
};

const isLektor = (user) => user?.role === "lektor";
const isOwner = (user, resource) => Boolean(user && resource && resource.authorId === user.id);

/**
 * Smí uživatel provést akci nad daným záznamem?
 * Čistá funkce: snadno se testuje (tests/permissions.test.js).
 *
 * @param user      přihlášený uživatel nebo null
 * @param action    "question:create" | "question:delete" | "answer:create" | "answer:delete" | "answer:accept" | "answer:suggest"
 * @param resource  otázka nebo odpověď, které se akce týká
 */
export function can(user, action, resource) {
  if (!user) return false; // nepřihlášený nesmí nic měnit

  switch (action) {
    case "question:create":
    case "answer:create":
      return true; // každý přihlášený

    case "question:delete":
    case "answer:delete":
      return isLektor(user) || isOwner(user, resource);

    case "answer:accept":
      // Odpověď jako "vyřešeno" označí autor OTÁZKY nebo lektor.
      // resource je tady otázka, ne odpověď.
      return isLektor(user) || isOwner(user, resource);

    case "answer:suggest":
      // Lekce 13: AI návrh odpovědi jen pro lektora (stojí peníze a lektor
      // za odpověď ručí)
      return isLektor(user);

    default:
      // Neznámá akce = zakázáno. Bezpečnější je zapomenuté pravidlo
      // zakázat než omylem povolit (princip "deny by default").
      return false;
  }
}
