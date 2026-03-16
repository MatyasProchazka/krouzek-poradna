// ============================================================================
// Hlavní stránka "/" – SERVEROVÁ komponenta
// ----------------------------------------------------------------------------
// Next.js používá routování podle souborů: app/page.js = adresa "/",
// app/ptat-se/page.js = adresa "/ptat-se" atd.
//
// Tahle komponenta běží na SERVERU, takže si může sáhnout rovnou do databáze,
// bez API mezi tím. Do prohlížeče se pošle už hotové HTML (rychlé a dobré
// pro SEO).
// ============================================================================

import Link from "next/link";
import { listQuestions } from "@/lib/questions";
import { CATEGORIES } from "@/lib/categories";

// Stránku vykresli při každém požadavku znovu (data se mění), nenechávej ji
// uloženou jako statické HTML z doby buildu.
export const dynamic = "force-dynamic";

export default function HomePage() {
  const questions = listQuestions(); // přímé volání datové vrstvy na serveru

  return (
    <section>
      <div className="section-head">
        <h2>
          Otázky <span className="count">{questions.length}</span>
        </h2>
        <Link href="/ptat-se" className="button-link">Zeptat se</Link>
      </div>

      <ul className="question-list">
        {questions.map((q) => (
          <li key={q.id} className="question">
            <h3>{q.title}</h3>
            {/* React text automaticky "escapuje": <script> se zobrazí jako
                text a nespustí se. Ochranu proti XSS z lekce 2 máme zadarmo. */}
            <p>{q.body || "Bez podrobností."}</p>
            <div className="meta">
              {CATEGORIES[q.category]} · {q.authorName} · {new Date(q.createdAt + "Z").toLocaleString("cs-CZ")}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
