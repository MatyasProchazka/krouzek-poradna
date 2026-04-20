// ============================================================================
// Karta jedné otázky v seznamu – "hloupá" (prezentační) komponenta
// ----------------------------------------------------------------------------
// Nemá žádný stav, jen dostane data přes props a vykreslí je. Takové
// komponenty se nejsnáz znovu používají i testují. Logiku (filtrování,
// načítání) drží rodič.
// ============================================================================

import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import { pluralize, timeAgo, formatDateTime } from "@/lib/format";

export default function QuestionCard({ question }) {
  const answered = question.answerCount > 0;

  return (
    <li className={`question ${answered ? "is-answered" : ""}`}>
      <div className="question-top">
        <CategoryBadge category={question.category} />
        <span className={`status ${answered ? "status-ok" : ""}`}>
          {answered ? "✓ " : ""}
          {pluralize(question.answerCount, ["odpověď", "odpovědi", "odpovědí"])}
        </span>
      </div>

      <h3>
        <Link href={`/otazky/${question.id}`}>{question.title}</Link>
      </h3>

      {/* Dlouhý text zkrátíme v CSS (line-clamp), celý je na detailu */}
      {question.body && <p className="clamp">{question.body}</p>}

      <div className="meta">
        {question.authorName} ·{" "}
        {/* <time> je sémantický prvek pro datum, title ukáže přesný čas.
            Relativní čas se na serveru a v prohlížeči může lišit o pár sekund,
            suppressHydrationWarning řekne Reactu, že je to v pořádku. */}
        <time dateTime={question.createdAt} title={formatDateTime(question.createdAt)} suppressHydrationWarning>
          {timeAgo(question.createdAt)}
        </time>
      </div>
    </li>
  );
}
