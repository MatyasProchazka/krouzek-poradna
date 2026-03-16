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

export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSending(true);

    // Neřízené vstupy: hodnoty si přečteme až při odeslání přes FormData
    // (stejně jako v lekci 2). U jednoduchých formulářů to stačí.
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSending(false);

    if (!response.ok) {
      setError((await response.json()).error);
      return;
    }

    // Server nastavil cookie s tokenem. Prohlížeč ji od teď posílá sám.
    // Přesměrujeme tam, kam uživatel původně chtěl (viz middleware.js).
    router.push(searchParams.get("dalsi") ?? "/");
    router.refresh(); // hlavička se překreslí a ukáže jméno přihlášeného
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {isRegister && (
        <>
          <label htmlFor="name">Jméno</label>
          <input id="name" name="name" autoComplete="name" />
        </>
      )}

      <label htmlFor="email">E-mail</label>
      <input id="email" name="email" type="email" autoComplete="email" />

      <label htmlFor="password">Heslo</label>
      {/* autoComplete pomůže správci hesel v prohlížeči */}
      <input
        id="password"
        name="password"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
      />

      <button type="submit" disabled={sending}>
        {isRegister ? "Vytvořit účet" : "Přihlásit se"}
      </button>
      <p className="error" aria-live="polite">{error}</p>

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
