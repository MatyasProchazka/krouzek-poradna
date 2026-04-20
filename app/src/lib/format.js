// ============================================================================
// Formátování pro zobrazení
// ----------------------------------------------------------------------------
// Malé "čisté" funkce (pure functions): stejný vstup → vždy stejný výstup,
// nic nemění kolem sebe. Snadno se používají kdekoli a snadno se testují
// (lekce 8).
// ============================================================================

/**
 * České skloňování podle počtu.
 *   pluralize(1, ["odpověď", "odpovědi", "odpovědí"]) → "1 odpověď"
 *   pluralize(3, …) → "3 odpovědi"
 *   pluralize(5, …) → "5 odpovědí"
 */
export function pluralize(count, [one, few, many]) {
  if (count === 1) return `${count} ${one}`;
  if (count >= 2 && count <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
}

/** SQLite ukládá čas v UTC bez označení zóny, proto přidáváme "Z". */
export function parseDbDate(value) {
  return new Date(value.endsWith("Z") ? value : value.replace(" ", "T") + "Z");
}

/**
 * Relativní čas: "před 5 minutami", "včera"…  Lidem se čte lépe než
 * přesné datum. Přesné datum dáme do atributu title (ukáže se po najetí myší).
 * Intl.RelativeTimeFormat je vestavěný v JavaScriptu a umí česky.
 */
export function timeAgo(value, now = new Date()) {
  const seconds = Math.round((parseDbDate(value) - now) / 1000); // záporné = minulost
  const rtf = new Intl.RelativeTimeFormat("cs", { numeric: "auto" });

  const units = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "právě teď";
}

export function formatDateTime(value) {
  return parseDbDate(value).toLocaleString("cs-CZ", { dateStyle: "medium", timeStyle: "short" });
}
