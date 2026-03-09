// ============================================================================
// Formulář pro novou otázku – KLIENTSKÁ komponenta
// ----------------------------------------------------------------------------
// "use client" říká Next.js, že tahle komponenta běží v PROHLÍŽEČI.
// Potřebujeme to, protože reaguje na psaní a klikání (stav, události).
// Komponenty bez "use client" jsou SERVEROVÉ: vykreslí se na serveru
// a do prohlížeče dorazí už hotové HTML.
// ============================================================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export default function QuestionForm() {
  const router = useRouter();

  // useState = STAV komponenty. Když se stav změní, React komponentu
  // automaticky překreslí. Žádné ruční innerHTML jako v lekci 2.
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("frontend");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSending(true);

    // Stejný fetch jako v lekci 3, jen teď volá API v Next.js
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, category }),
    });

    setSending(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      return;
    }

    setTitle("");
    setBody("");
    // router.refresh() řekne Next.js, ať znovu vykreslí serverové komponenty
    // na stránce. Seznam otázek se tak načte z databáze znovu, i s tou novou.
    router.refresh();
  }

  // JSX: vypadá jako HTML, ale je to JavaScript. Proto className místo class
  // a htmlFor místo for. Do {složených závorek} jde vložit libovolný výraz.
  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="title">Otázka</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}  // "řízený" vstup: hodnota žije ve stavu
        placeholder="Např. Jaký hosting pro WordPress?"
      />

      <label htmlFor="body">Podrobnosti</label>
      <textarea id="body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />

      <label htmlFor="category">Kategorie</label>
      <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        {/* Možnosti vygenerujeme z objektu kategorií. Každá položka seznamu
            v Reactu potřebuje unikátní `key`, aby React věděl, co je co. */}
        {Object.entries(CATEGORIES).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      <button type="submit" disabled={sending}>
        {sending ? "Odesílám…" : "Odeslat otázku"}
      </button>
      <p className="error" aria-live="polite">{error}</p>
    </form>
  );
}
