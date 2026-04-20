// ============================================================================
// Hlavní stránka "/" – SERVEROVÁ komponenta
// ----------------------------------------------------------------------------
// Rozdělení práce (lekce 7):
//   server (tato stránka)        → načte data z databáze
//   klient (QuestionList)        → filtruje, hledá, řadí, reaguje na uživatele
// Data předáváme ze serveru do klientské komponenty přes props. Musí to být
// "obyčejná" data (text, čísla, pole, objekty), protože se posílají po síti.
// ============================================================================

import { Suspense } from "react";
import Link from "next/link";
import { listQuestions } from "@/lib/questions";
import QuestionList from "@/components/QuestionList";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const questions = listQuestions();

  return (
    <section>
      <div className="section-head">
        <h2>Otázky</h2>
        <Link href="/ptat-se" className="button-link">Zeptat se</Link>
      </div>

      {/* QuestionList čte filtry z adresy (useSearchParams), proto Suspense */}
      <Suspense>
        <QuestionList questions={questions} />
      </Suspense>
    </section>
  );
}
