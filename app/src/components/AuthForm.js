// ============================================================================
// Formulář pro přihlášení i registraci – jedna komponenta, dva režimy
// ----------------------------------------------------------------------------
// Komponenta dostává PROPS (vlastnosti) od rodiče, tady `mode`.
// Díky tomu ji použijeme na dvou stránkách a nemusíme kód kopírovat.
// ============================================================================
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginSchema, registerSchema, validate } from "@/lib/validation";
import Field from "./Field";

export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    // Neřízené vstupy: hodnoty si přečteme až při odeslání přes FormData
    // (stejně jako v lekci 2). U jednoduchých formulářů to stačí.
    const values = Object.fromEntries(new FormData(event.currentTarget));

    // Lekce 6: validace na klientu podle sdíleného schématu
    const { errors: clientErrors } = validate(isRegister ? registerSchema : loginSchema, values);
    setErrors(clientErrors ?? {});
    if (clientErrors) return;

    setSending(true);
    const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSending(false);

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.fields ?? {});
      setFormError(data.error);
      return;
    }

    // Server nastavil cookie s tokenem. Prohlížeč ji od teď posílá sám.
    // Přesměrujeme tam, kam uživatel původně chtěl (viz middleware.js).
    router.push(searchParams.get("dalsi") ?? "/");
    router.refresh(); // hlavička se překreslí a ukáže jméno přihlášeného
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      {isRegister && <Field label="Jméno" name="name" autoComplete="name" error={errors.name} />}

      <Field label="E-mail" name="email" type="email" autoComplete="email" error={errors.email} />

      {/* autoComplete pomůže správci hesel v prohlížeči */}
      <Field
        label="Heslo"
        name="password"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        error={errors.password}
      />

      <button type="submit" disabled={sending}>
        {isRegister ? "Vytvořit účet" : "Přihlásit se"}
      </button>
      <p className="error" aria-live="polite">{formError}</p>

      <p className="muted">
        {isRegister ? (
          <>Už máš účet? <Link href="/prihlaseni">Přihlas se</Link></>
        ) : (
          <>Nemáš účet? <Link href="/registrace">Zaregistruj se</Link></>
        )}
      </p>
    </form>
  );
}
