// Vlastní stránka 404. Zobrazí se pro neexistující adresu i při volání notFound().
// Dobrá chybová stránka mluví lidsky a nabídne cestu dál.
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card narrow empty">
      <h2>Tohle tu nemáme</h2>
      <p className="muted">Stránka neexistuje, nebo byla otázka smazaná.</p>
      <Link href="/" className="button-link">Zpět na otázky</Link>
    </section>
  );
}
