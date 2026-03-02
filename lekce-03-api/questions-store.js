// ============================================================================
// Lekce 3 – MODEL (vrstva dat)
// ----------------------------------------------------------------------------
// V architektuře MVC (Model–View–Controller) je MODEL část, která se stará
// o data: kde jsou uložená a jak se s nimi pracuje. Zbytek aplikace se
// nemusí starat o to, JAK jsou data uložená, jen volá tyhle funkce.
//
// Zatím ukládáme do pole v paměti serveru. Data přežijí obnovení stránky
// v prohlížeči (na rozdíl od lekce 2), ale ne restart serveru.
// V lekci 4 tohle pole vyměníme za databázi a zbytek kódu zůstane skoro stejný.
// To je hlavní výhoda oddělení vrstev.
// ============================================================================

let nextId = 3;

const questions = [
  {
    id: 1,
    title: "Jaký je rozdíl mezi frontendem a backendem?",
    body: "Pořád to slyším, ale nevím, kde je hranice.",
    category: "backend",
    createdAt: "2026-02-18T18:30:00.000Z",
  },
  {
    id: 2,
    title: "Proč se mi na mobilu stránka zobrazuje maličká?",
    body: "Na počítači vypadá dobře, na telefonu je všechno malé.",
    category: "frontend",
    createdAt: "2026-02-19T20:10:00.000Z",
  },
];

/** Vrátí všechny otázky, nejnovější první. */
function listQuestions() {
  return [...questions].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Najde jednu otázku podle id, nebo vrátí undefined. */
function getQuestion(id) {
  return questions.find((q) => q.id === id);
}

/** Uloží novou otázku a vrátí ji i s přiděleným id. */
function createQuestion({ title, body, category }) {
  const question = {
    id: nextId++,
    title,
    body,
    category,
    createdAt: new Date().toISOString(),
  };
  questions.push(question);
  return question;
}

/** Smaže otázku. Vrací true, pokud něco smazal. */
function deleteQuestion(id) {
  const index = questions.findIndex((q) => q.id === id);
  if (index === -1) return false;
  questions.splice(index, 1);
  return true;
}

module.exports = { listQuestions, getQuestion, createQuestion, deleteQuestion };
