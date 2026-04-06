// ============================================================================
// Detail otázky /otazky/:id – serverová stránka
// ----------------------------------------------------------------------------
// Dynamická adresa: složka [id] zachytí cokoliv za /otazky/.
// Data čteme přímo z databáze (serverová komponenta), formulář pro odpověď
// je klientská komponenta, která volá API.
// ============================================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestion } from "@/lib/questions";
import { listAnswers } from "@/lib/answers";
import { getCurrentUser } from "@/lib/auth";
import { CATEGORIES } from "@/lib/categories";
import AnswerForm from "@/components/AnswerForm";

export const dynamic = "force-dynamic";

// generateMetadata: titulek záložky podle konkrétní otázky (dobré i pro SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const question = getQuestion(Number(id));
  return { title: question ? `${question.title} · Poradna` : "Otázka nenalezena" };
}

function formatDate(value) {
  return new Date(value + "Z").toLocaleString("cs-CZ");
}

export default async function QuestionDetailPage({ params }) {
  const { id } = await params;
  const question = getQuestion(Number(id));
  if (!question) notFound(); // zobrazí stránku 404

  const answers = listAnswers(question.id);
  const user = await getCurrentUser();

  return (
    <article className="detail">
      <Link href="/" className="back">← Všechny otázky</Link>

      <header className="question">
        <h2>{question.title}</h2>
        {/* white-space: pre-wrap v CSS zachová odřádkování z textarey */}
        <p className="prewrap">{question.body || "Bez podrobností."}</p>
        <div className="meta">
          {CATEGORIES[question.category]} · {question.authorName} · {formatDate(question.createdAt)}
        </div>
      </header>

      <section aria-labelledby="answers-title">
        <h3 id="answers-title">
          Odpovědi <span className="count">{answers.length}</span>
        </h3>

        {answers.length === 0 && <p className="muted">Zatím nikdo neodpověděl. Buď první!</p>}

        <ul className="answer-list">
          {answers.map((a) => (
            <li key={a.id} className="answer">
              <p className="prewrap">{a.body}</p>
              <div className="meta">{a.authorName} · {formatDate(a.createdAt)}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        {user ? (
          <AnswerForm questionId={question.id} />
        ) : (
          <p className="muted">
            <Link href={`/prihlaseni?dalsi=/otazky/${question.id}`}>Přihlas se</Link>, abys mohl odpovědět.
          </p>
        )}
      </section>
    </article>
  );
}
