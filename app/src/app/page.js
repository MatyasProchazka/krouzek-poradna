// ============================================================================
// Hlavní stránka "/" – SERVEROVÁ komponenta
// ----------------------------------------------------------------------------
// Rozdělení práce (lekce 7):
//   server (tato stránka)        → načte data z databáze
//   klient (QuestionList)        → filtruje, hledá, řadí, reaguje na uživatele
//
// Lekce 11: přihlášený vidí otázky SVÉ školy.
// Lekce 12: nepřihlášený návštěvník uvidí landing page produktu.
// ============================================================================

import { Suspense } from "react";
import Link from "next/link";
import { listQuestions } from "@/lib/questions";
import { getCurrentUser } from "@/lib/auth";
import QuestionList from "@/components/QuestionList";
import Landing from "@/components/Landing";

// Strukturovaná data (JSON-LD) pro vyhledávače a AI asistenty: strojově
// čitelný popis, co je tahle stránka zač. Google je umí zobrazit ve výsledcích.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Poradna",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description: "Prostor pro otázky a odpovědi z IT pro střední školy a kroužky.",
  inLanguage: "cs",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CZK" },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Landing />
      </>
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
