// Stránka /ptat-se – formulář pro novou otázku.
// Nepřihlášené sem nepustí middleware.js (přesměruje je na /prihlaseni).
import QuestionForm from "@/components/QuestionForm";

export const metadata = { title: "Nová otázka · Poradna" };

export default function AskPage() {
  return (
    <section className="card narrow">
      <h2>Nová otázka</h2>
      <QuestionForm />
    </section>
  );
}
