// Formulář pro odpověď na otázku. Stejný vzor jako QuestionForm:
// validace na klientu → fetch → zpracování chyb ze serveru → refresh.
//
// Lekce 13: lektor si může nechat od AI navrhnout koncept odpovědi.
// Návrh se jen vloží do pole, odeslání je vždy na člověku.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { answerSchema, validate } from "@/lib/validation";
import Field from "./Field";

export default function AnswerForm({ questionId, canSuggest = false }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [fromAi, setFromAi] = useState(false);

  async function handleSuggest() {
    setSuggesting(true);
    setError("");
    const response = await fetch(`/api/questions/${questionId}/suggest`, { method: "POST" });
    const data = await response.json();
    setSuggesting(false);

    if (!response.ok) return setError(data.error);
    setBody(data.suggestion);
    setFromAi(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { errors } = validate(answerSchema, { body });
    if (errors) return setError(errors.body);

    setSending(true);
    const response = await fetch(`/api/questions/${questionId}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    setSending(false);

    if (!response.ok) {
      const data = await response.json();
      return setError(data.fields?.body ?? data.error);
    }

    setBody("");
    setError("");
    setFromAi(false);
    router.refresh(); // serverová stránka si znovu načte odpovědi z databáze
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <Field
        as="textarea"
        label="Tvoje odpověď"
        name="body"
        rows={fromAi ? 10 : 5}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setError("");
        }}
        error={error}
      />

      {fromAi && (
        <p className="ai-note" role="status">
          ✨ Koncept od AI. Než ho odešleš, zkontroluj fakta a uprav ho svými slovy.
        </p>
      )}

      <div className="form-actions">
        <button type="submit" disabled={sending}>
          {sending ? "Odesílám…" : "Odpovědět"}
        </button>
        {canSuggest && (
          <button type="button" className="ghost" onClick={handleSuggest} disabled={suggesting}>
            {suggesting ? "AI přemýšlí…" : "✨ Navrhnout odpověď pomocí AI"}
          </button>
        )}
      </div>
    </form>
  );
}
