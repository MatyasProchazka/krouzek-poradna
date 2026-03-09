// ============================================================================
// Hlavní stránka "/" – SERVEROVÁ komponenta
// ----------------------------------------------------------------------------
// Next.js používá routování podle souborů: app/page.js = adresa "/".
// app/otazky/page.js by byla adresa "/otazky" atd.
//
// Tahle komponenta běží na SERVERU, takže si může sáhnout rovnou do databáze,
// bez API mezi tím. Do prohlížeče se pošle už hotové HTML (rychlé a dobré
// pro SEO). Interaktivní části (formulář) jsou samostatné klientské komponenty.
// ============================================================================

import { listQuestions } from "@/lib/questions";
import { CATEGORIES } from "@/lib/categories";
import QuestionForm from "@/components/QuestionForm";

// Stránku vykresli při každém požadavku znovu (data se mění), nenechávej ji
// uloženou jako statické HTML z doby buildu.
export const dynamic = "force-dynamic";

export default function HomePage() {
  const questions = listQuestions(); // přímé volání datové vrstvy na serveru

  return (
    <div className="layout">
      <section className="card">
        <h2>Nová otázka</h2>
        <QuestionForm />
      </section>

      <section>
        <h2>
          Otázky <span className="count">{questions.length}</span>
        </h2>
        <ul className="question-list">
          {questions.map((q) => (
            <li key={q.id} className="question">
              <h3>{q.title}</h3>
              {/* React text automaticky "escapuje": <script> se zobrazí jako
                  text a nespustí se. Ochranu proti XSS z lekce 2 máme zadarmo. */}
              <p>{q.body || "Bez podrobností."}</p>
              <div className="meta">
                {CATEGORIES[q.category]} · {new Date(q.createdAt + "Z").toLocaleString("cs-CZ")}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
