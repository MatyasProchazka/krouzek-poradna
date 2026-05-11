// ============================================================================
// Tlačítko, které zavolá API akci (smazat, označit…)
// ----------------------------------------------------------------------------
// Jedna obecná komponenta pro všechny "klikni a pošli požadavek" akce.
// Tlačítko se zobrazuje jen tomu, kdo akci smí udělat (rozhoduje rodič
// pomocí can()), ale skutečná kontrola je stejně na serveru.
// ============================================================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActionButton({ url, method = "POST", body, confirmText, redirectTo, variant = "ghost", children }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    // U nevratných akcí se zeptáme. window.confirm je nejjednodušší řešení,
    // hezčí je vlastní dialog (prvek <dialog>).
    if (confirmText && !window.confirm(confirmText)) return;

    setBusy(true);
    setError("");
    const response = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    setBusy(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Akce se nepovedla.");
      return;
    }

    if (redirectTo) router.push(redirectTo);
    router.refresh();
  }

  return (
    <span className="action">
      <button type="button" className={variant} onClick={run} disabled={busy}>
        {children}
      </button>
      {error && <span className="field-error" role="alert">{error}</span>}
    </span>
  );
}
