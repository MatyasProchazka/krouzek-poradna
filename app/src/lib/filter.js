// ============================================================================
// Filtrování, vyhledávání a řazení otázek NA KLIENTU
// ----------------------------------------------------------------------------
// Otázek je málo, takže je pošleme do prohlížeče všechny najednou a filtrujeme
// je tam. Výhoda: okamžitá odezva, žádné čekání na server při každém písmenku.
// Až by otázek byly tisíce, přesunuli bychom filtrování na server (SQL WHERE,
// LIMIT/OFFSET pro stránkování). To je typické rozhodnutí při návrhu.
//
// Funkce je čistá: dostane pole a nastavení filtru, vrátí NOVÉ pole.
// Původní pole nemění.
// ============================================================================

/** Odstraní diakritiku a převede na malá písmena: "Řešení" → "reseni" */
export function normalize(text) {
  return text
    .normalize("NFD")                  // rozloží "ř" na "r" + háček
    .replace(/[̀-ͯ]/g, "")   // háčky a čárky zahodíme
    .toLowerCase();
}

export const SORTS = {
  newest: "Nejnovější",
  oldest: "Nejstarší",
  answers: "Nejvíc odpovědí",
};

export const STATUSES = {
  all: "Všechny",
  unanswered: "Bez odpovědi",
  answered: "Zodpovězené",
};

/**
 * @param questions  pole otázek
 * @param options    { query, category, status, sort }
 */
export function filterQuestions(questions, { query = "", category = "all", status = "all", sort = "newest" } = {}) {
  const q = normalize(query.trim());

  const filtered = questions.filter((question) => {
    if (category !== "all" && question.category !== category) return false;
    if (status === "answered" && question.answerCount === 0) return false;
    if (status === "unanswered" && question.answerCount > 0) return false;
    if (q && !normalize(`${question.title} ${question.body}`).includes(q)) return false;
    return true;
  });

  // .sort() mění pole, na kterém se zavolá, proto řadíme až kopii z .filter()
  const compare = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
    answers: (a, b) => b.answerCount - a.answerCount || b.createdAt.localeCompare(a.createdAt),
  }[sort] ?? (() => 0);

  return filtered.sort(compare);
}
