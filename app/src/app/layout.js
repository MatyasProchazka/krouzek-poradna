// ============================================================================
// Kořenový layout – obal, který je společný pro VŠECHNY stránky
// ----------------------------------------------------------------------------
// Co je tady (hlavička, patička), se vykreslí na každé stránce.
// Obsah konkrétní stránky (page.js) se dosadí místo {children}.
// ============================================================================

import Link from "next/link";
import "./globals.css";

// Metadata se propíšou do <head>: titulek v záložce prohlížeče, popis pro Google
export const metadata = {
  title: "Poradna",
  description: "Zeptej se na cokoliv z webového vývoje.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        <header className="site-header">
          {/* <Link> místo <a>: přechod mezi stránkami bez načítání celé stránky */}
          <Link href="/" className="brand">Poradna</Link>
          <p>Zeptej se na cokoliv z webového vývoje. Nikdo se nesměje.</p>
        </header>
        <main>{children}</main>
        <footer className="site-footer">Kroužek Základy webového vývoje</footer>
      </body>
    </html>
  );
}
