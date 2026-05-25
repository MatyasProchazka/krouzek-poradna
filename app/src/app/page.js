// ============================================================================
// Hlavní stránka "/" – SERVEROVÁ komponenta
// ----------------------------------------------------------------------------
// Rozdělení práce (lekce 7):
//   server (tato stránka)        → načte data z databáze
//   klient (QuestionList)        → filtruje, hledá, řadí, reaguje na uživatele
//
// Lekce 11: přihlášený vidí otázky SVÉ školy. Nepřihlášený uvítání.
// ============================================================================

import { Suspense } from "react";
import Link from "next/link";
import { listQuestions } from "@/lib/questions";
import { getCurrentUser } from "@/lib/auth";
import QuestionList from "@/components/QuestionList";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <section className="card narrow empty">
        <h2>Vítej v Poradně</h2>
        <p className="muted">Každá škola má svůj vlastní prostor. Přihlas se, nebo se připoj kódem od lektora.</p>
        <p>
          <Link href="/prihlaseni">Přihlásit</Link> · <Link href="/registrace">Registrace</Link>
        </p>
      </section>
    );
  }

  const questions = listQuestions(user.organizationId);

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
