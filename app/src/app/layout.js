// ============================================================================
// Kořenový layout – obal, který je společný pro VŠECHNY stránky
// ----------------------------------------------------------------------------
// Co je tady (hlavička, patička), se vykreslí na každé stránce.
// Obsah konkrétní stránky (page.js) se dosadí místo {children}.
// ============================================================================

import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import "./globals.css";

// Metadata se propíšou do <head>: titulek v záložce prohlížeče, popis pro Google
export const metadata = {
  title: "Poradna",
  description: "Zeptej se na cokoliv z webového vývoje.",
};

// Layout je serverová komponenta, může tedy být async a zjistit přihlášení.
export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <html lang="cs">
      <body>
        {/* Skip link: uživatel s klávesnicí přeskočí hlavičku jedním Tabem.
            Je schovaný a objeví se, až na něj přejde focus. */}
        <a href="#obsah" className="skip-link">Přeskočit na obsah</a>
        <header className="site-header">
          <div>
            {/* <Link> místo <a>: přechod mezi stránkami bez načítání celé stránky */}
            <Link href="/" className="brand">Poradna</Link>
            <p>Zeptej se na cokoliv z webového vývoje. Nikdo se nesměje.</p>
          </div>

          <nav className="nav" aria-label="Uživatel">
            {user ? (
              <>
                <span className="muted">Ahoj, {user.name}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/prihlaseni">Přihlásit</Link>
                <Link href="/registrace" className="button-link">Registrace</Link>
              </>
            )}
          </nav>
        </header>
        <main id="obsah">{children}</main>
        <footer className="site-footer">Kroužek Základy webového vývoje</footer>
      </body>
    </html>
  );
}
