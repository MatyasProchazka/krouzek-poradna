// ============================================================================
// Landing page – úvodní stránka pro nepřihlášené návštěvníky (lekce 12)
// ----------------------------------------------------------------------------
// Landing page má jediný úkol: během pár vteřin vysvětlit, CO produkt dělá,
// PRO KOHO je a CO má návštěvník udělat dál (call to action, CTA).
//
// Osvědčená struktura:
//   1. Hero – hlavní sdělení + tlačítko
//   2. Problém a řešení / hlavní přínosy
//   3. Jak to funguje (3 kroky)
//   4. Ceník
//   5. Závěrečné CTA
//
// Text je psaný z pohledu zákazníka (co z toho má on), ne z pohledu
// technologie ("postaveno na Next.js" nikoho nezajímá).
// ============================================================================

import Link from "next/link";
import { PLANS } from "@/lib/organizations";

const FEATURES = [
  {
    title: "Žádný stres z hloupých otázek",
    text: "Studenti se ptají ve vlastním prostoru své školy. Bez reklam a bez cizích lidí.",
  },
  {
    title: "Odpovědi zůstávají",
    text: "Na stejnou otázku se neodpovídá dvakrát. Vyhledávání najde i staré odpovědi.",
  },
  {
    title: "Lektor má přehled",
    text: "Vidí, co studenty trápí, označuje správné odpovědi a moderuje obsah.",
  },
];

const STEPS = [
  "Lektor založí prostor pro svoji školu",
  "Pošle studentům kód pozvánky",
  "Studenti se ptají, lektor i spolužáci odpovídají",
];

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        {/* Jen jeden <h1> na stránce: hlavní téma pro vyhledávače i čtečky */}
        <h1>Místo, kde se studenti nebojí zeptat</h1>
        <p className="lead">
          Poradna je jednoduchý prostor pro otázky a odpovědi z IT pro střední školy, kroužky a kurzy.
        </p>
        <div className="hero-actions">
          <Link href="/registrace" className="button-link big">Založit Poradnu zdarma</Link>
          <Link href="/prihlaseni">Už mám účet</Link>
        </div>
      </section>

      <section className="features" aria-label="Přínosy">
        {FEATURES.map((f) => (
          <div key={f.title} className="card">
            <h2>{f.title}</h2>
            <p className="muted">{f.text}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="how">
        <h2 id="how">Jak to funguje</h2>
        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="pricing">
        <h2 id="pricing">Ceník</h2>
        <div className="pricing">
          <div className="card">
            <h3>{PLANS.free.name}</h3>
            <p className="price">0 Kč</p>
            <p className="muted">Do {PLANS.free.maxMembers} členů. Ideální pro kroužek nebo jednu třídu.</p>
          </div>
          <div className="card featured">
            <h3>{PLANS.skola.name}</h3>
            <p className="price">990 Kč <span>/ rok</span></p>
            <p className="muted">Neomezeně tříd a lektorů pro celou školu, přednostní podpora.</p>
          </div>
        </div>
      </section>

      <section className="hero cta">
        <h2>Vyzkoušej to s kroužkem ještě tento týden</h2>
        <Link href="/registrace" className="button-link big">Začít zdarma</Link>
      </section>
    </div>
  );
}
