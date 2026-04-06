// Formulář pro odpověď na otázku. Stejný vzor jako QuestionForm:
// validace na klientu → fetch → zpracování chyb ze serveru → refresh.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { answerSchema, validate } from "@/lib/validation";
import Field from "./Field";

export default function AnswerForm({ questionId }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

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
    router.refresh(); // serverová stránka si znovu načte odpovědi z databáze
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <Field
        as="textarea"
        label="Tvoje odpověď"
        name="body"
        rows={5}
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setError("");
        }}
        error={error}
      />
      <button type="submit" disabled={sending}>
        {sending ? "Odesílám…" : "Odpovědět"}
      </button>
    </form>
  );
}
