// ============================================================================
// Detail otázky /otazky/:id – serverová stránka
// ----------------------------------------------------------------------------
// Dynamická adresa: složka [id] zachytí cokoliv za /otazky/.
// Data čteme přímo z databáze (serverová komponenta), formulář a akční
// tlačítka jsou klientské komponenty, které volají API.
// ============================================================================

import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestion } from "@/lib/questions";
import { listAnswers } from "@/lib/answers";
import { getCurrentUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { formatDateTime, pluralize } from "@/lib/format";
import CategoryBadge from "@/components/CategoryBadge";
import AnswerForm from "@/components/AnswerForm";
import ActionButton from "@/components/ActionButton";

export const dynamic = "force-dynamic";

// generateMetadata: titulek záložky podle konkrétní otázky (dobré i pro SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const question = getQuestion(Number(id));
  return { title: question ? `${question.title} · Poradna` : "Otázka nenalezena" };
}

export default async function QuestionDetailPage({ params }) {
  const { id } = await params;
  const question = getQuestion(Number(id));
  if (!question) notFound(); // zobrazí stránku 404

  const user = await getCurrentUser();

  // Správná odpověď půjde nahoru, ostatní zůstanou v pořadí, jak přišly
  const answers = listAnswers(question.id).sort(
    (a, b) => (b.id === question.acceptedAnswerId) - (a.id === question.acceptedAnswerId),
  );

  const canAccept = can(user, "answer:accept", question);

  return (
    <article className="detail">
      <Link href="/" className="back">← Všechny otázky</Link>

      <header className="question">
        <div className="question-top">
          <CategoryBadge category={question.category} />
          {question.acceptedAnswerId && <span className="status status-ok">✓ Vyřešeno</span>}
        </div>
        <h2>{question.title}</h2>
        {/* white-space: pre-wrap v CSS zachová odřádkování z textarey */}
        <p className="prewrap">{question.body || "Bez podrobností."}</p>
        <div className="meta">
          {question.authorName} · {formatDateTime(question.createdAt)}
        </div>

        {/* Tlačítko vidí jen ten, kdo smí mazat. Server to ale kontroluje znovu. */}
        {can(user, "question:delete", question) && (
          <div className="actions">
            <ActionButton
              url={`/api/questions/${question.id}`}
              method="DELETE"
              confirmText="Opravdu smazat otázku i se všemi odpověďmi?"
              redirectTo="/"
              variant="danger"
            >
              Smazat otázku
            </ActionButton>
          </div>
        )}
      </header>

      <section aria-labelledby="answers-title">
        <h3 id="answers-title">{pluralize(answers.length, ["odpověď", "odpovědi", "odpovědí"])}</h3>

        {answers.length === 0 && <p className="muted">Zatím nikdo neodpověděl. Buď první!</p>}

        <ul className="answer-list">
          {answers.map((a) => {
            const accepted = a.id === question.acceptedAnswerId;
            return (
              <li key={a.id} className={`answer ${accepted ? "is-accepted" : ""}`}>
                {accepted && <div className="accepted-label">✓ Správná odpověď</div>}
                <p className="prewrap">{a.body}</p>
                <div className="meta">
                  {a.authorName}
                  {a.authorRole === "lektor" && <span className="role-badge">Lektor</span>} ·{" "}
                  {formatDateTime(a.createdAt)}
                </div>

                <div className="actions">
                  {canAccept && (
                    <ActionButton url={`/api/questions/${question.id}/accept`} body={{ answerId: accepted ? null : a.id }}>
                      {accepted ? "Zrušit označení" : "Označit jako správnou"}
                    </ActionButton>
                  )}
                  {can(user, "answer:delete", a) && (
                    <ActionButton
                      url={`/api/questions/${question.id}/answers/${a.id}`}
                      method="DELETE"
                      confirmText="Opravdu smazat odpověď?"
                      variant="danger"
                    >
                      Smazat
                    </ActionButton>
                  )}
                </div>
              </li>
            );
          })}
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
