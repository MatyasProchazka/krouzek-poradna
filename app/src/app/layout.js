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
// Lekce 12 (SEO): šablona titulku, Open Graph pro hezký náhled při sdílení
// odkazu na sociálních sítích a v chatu, kanonická adresa webu.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Poradna – otázky a odpovědi z IT pro školy",
    template: "%s · Poradna", // podstránky: "Registrace · Poradna"
  },
  description:
    "Jednoduchý prostor, kde se studenti ptají na cokoliv z IT a lektor i spolužáci odpovídají. Pro střední školy, kroužky a kurzy. Zdarma do 30 členů.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Poradna",
    title: "Poradna – místo, kde se studenti nebojí zeptat",
    description: "Otázky a odpovědi z IT pro střední školy, kroužky a kurzy.",
  },
  alternates: { canonical: "/" },
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
                {/* Lekce 11: název školy (tenantu), ve které uživatel je */}
                <Link href="/skola" className="org-chip">{user.organizationName}</Link>
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
