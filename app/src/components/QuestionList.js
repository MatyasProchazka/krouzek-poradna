// ============================================================================
// Seznam otázek s vyhledáváním, filtry a řazením – KLIENTSKÁ komponenta
// ----------------------------------------------------------------------------
// Data (všechny otázky) dostane od serverové stránky přes props.
// Filtrování probíhá v prohlížeči, okamžitě při psaní.
//
// Kde držet stav filtrů? Mohli bychom v useState, ale dáme ho do ADRESY
// (?q=hosting&kategorie=backend). Výhody:
//   • odkaz na vyfiltrovaný seznam jde poslat kamarádovi,
//   • tlačítko Zpět v prohlížeči funguje,
//   • po obnovení stránky filtr zůstane.
// ============================================================================
"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import QuestionCard from "./QuestionCard";
import { CATEGORIES } from "@/lib/categories";
import { filterQuestions, SORTS, STATUSES } from "@/lib/filter";
import { pluralize } from "@/lib/format";

export default function QuestionList({ questions }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Aktuální nastavení filtru přečteme z adresy (s výchozími hodnotami)
  const filters = {
    query: searchParams.get("q") ?? "",
    category: searchParams.get("kategorie") ?? "all",
    status: searchParams.get("stav") ?? "all",
    sort: searchParams.get("razeni") ?? "newest",
  };

  // Změna filtru = změna adresy. router.replace nepřidá záznam do historie
  // při každém písmenku, scroll: false nechá stránku tam, kde je.
  function setFilter(param, value, defaultValue) {
    const params = new URLSearchParams(searchParams);
    if (!value || value === defaultValue) params.delete(param);
    else params.set(param, value);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  // useMemo: filtrování se přepočítá jen když se změní otázky nebo filtr,
  // ne při každém překreslení komponenty. U malých dat to není nutné,
  // ale je dobré o téhle optimalizaci vědět.
  const visible = useMemo(
    () => filterQuestions(questions, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, filters.query, filters.category, filters.status, filters.sort],
  );

  const isFiltered = filters.query || filters.category !== "all" || filters.status !== "all";

  return (
    <>
      {/* role="search" řekne čtečkám obrazovky, že tohle je vyhledávání */}
      <div className="filters" role="search">
        <label className="sr-only" htmlFor="search">Hledat v otázkách</label>
        <input
          id="search"
          type="search"
          placeholder="Hledat… (třeba „hosting“)"
          value={filters.query}
          onChange={(e) => setFilter("q", e.target.value, "")}
        />

        <label className="sr-only" htmlFor="filter-category">Kategorie</label>
        <select id="filter-category" value={filters.category} onChange={(e) => setFilter("kategorie", e.target.value, "all")}>
          <option value="all">Všechny kategorie</option>
          {Object.entries(CATEGORIES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filter-sort">Řazení</label>
        <select id="filter-sort" value={filters.sort} onChange={(e) => setFilter("razeni", e.target.value, "newest")}>
          {Object.entries(SORTS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Přepínač stavu jako skupina tlačítek. aria-pressed říká, které je zapnuté. */}
      <div className="segmented" role="group" aria-label="Stav otázky">
        {Object.entries(STATUSES).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={filters.status === value}
            onClick={() => setFilter("stav", value, "all")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* aria-live: čtečka oznámí nový počet výsledků, když se změní */}
      <p className="muted" aria-live="polite">
        {isFiltered
          ? `Nalezeno: ${pluralize(visible.length, ["otázka", "otázky", "otázek"])}`
          : pluralize(visible.length, ["otázka", "otázky", "otázek"])}
      </p>

      {visible.length > 0 ? (
        <ul className="question-list">
          {visible.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </ul>
      ) : (
        // Prázdný stav: nikdy nenechávej uživatele před prázdnou obrazovkou.
        // Řekni mu, co se stalo a co může udělat.
        <div className="empty">
          <p><strong>Nic jsme nenašli.</strong></p>
          <p className="muted">Zkus jiné slovo nebo zruš filtry.</p>
          <button type="button" className="ghost" onClick={() => router.replace(pathname, { scroll: false })}>
            Zrušit filtry
          </button>
        </div>
      )}
    </>
  );
}
