// ============================================================================
// Formulář pro novou otázku – KLIENTSKÁ komponenta
// ----------------------------------------------------------------------------
// "use client" říká Next.js, že tahle komponenta běží v PROHLÍŽEČI.
// Potřebujeme to, protože reaguje na psaní a klikání (stav, události).
//
// Lekce 6: validace na klientu podle STEJNÉHO schématu, jaké používá server
// (lib/validation.js). Uživatel vidí chybu hned u pole a server dostane
// jen data, která dávají smysl. Server je přesto kontroluje znovu.
// ============================================================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { questionSchema, validate } from "@/lib/validation";
import Field from "./Field";

const EMPTY = { title: "", body: "", category: "frontend" };

export default function QuestionForm() {
  const router = useRouter();

  // Hodnoty celého formuláře držíme v jednom objektu ve stavu.
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});   // { title: "…", category: "…" }
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  // Jedna obslužná funkce pro všechna pole. Pozná je podle atributu name.
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Jakmile uživatel pole opravuje, chybu u něj schováme
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    // 1) Validace na klientu: rychlá odezva, žádný zbytečný požadavek
    const { errors: clientErrors } = validate(questionSchema, values);
    if (clientErrors) {
      setErrors(clientErrors);
      return;
    }

    // 2) Odeslání na server
    setSending(true);
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        // 3) Server může vrátit chyby polí (validace) i obecnou chybu
        setErrors(data.fields ?? {});
        setFormError(data.error);
        return;
      }

      // Hotovo: přesměrujeme na detail nově vytvořené otázky
      router.push(`/otazky/${data.id}`);
      router.refresh();
    } catch {
      // fetch selže úplně, když není připojení nebo server neběží
      setFormError("Nepodařilo se spojit se serverem. Zkus to znovu.");
    } finally {
      setSending(false); // proběhne vždy, ať skončíme jakkoli
    }
  }

  return (
    // noValidate vypne vestavěnou validaci prohlížeče, máme vlastní (Zod)
    <form onSubmit={handleSubmit} className="form" noValidate>
      <Field
        label="Otázka"
        name="title"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Např. Jaký hosting pro WordPress?"
      />

      <Field
        as="textarea"
        label="Podrobnosti"
        name="body"
        rows={5}
        value={values.body}
        onChange={handleChange}
        error={errors.body}
        placeholder="Co přesně řešíš, co už jsi zkoušel…"
      />

      <Field as="select" label="Kategorie" name="category" value={values.category} onChange={handleChange} error={errors.category}>
        {Object.entries(CATEGORIES).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </Field>

      <button type="submit" disabled={sending}>
        {sending ? "Odesílám…" : "Odeslat otázku"}
      </button>
      <p className="error" aria-live="polite">{formError}</p>
    </form>
  );
}
