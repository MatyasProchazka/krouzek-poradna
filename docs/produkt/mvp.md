# Poradna: produktový plán a MVP

Ukázka, jak se plánuje produkt dřív, než se začne programovat. Ke lekci 12.

## 1. Problém

Studenti se na hodinách a v kroužcích často bojí zeptat („bude to znít hloupě“). Otázky pak řeší po Discordech a soukromých zprávách, lektor odpovídá pořád dokola na totéž a odpovědi se ztrácí.

## 2. Pro koho

| Persona | Kdo to je | Co potřebuje |
|---------|-----------|--------------|
| **Student Tomáš**, 16 let | průmyslovka, začíná s webem | zeptat se bez ostychu, najít, jestli se už někdo neptal |
| **Lektorka Jana** | vede kroužek, učí informatiku | odpovídat jednou, ne desetkrát; vidět, co studenty trápí |
| **Ředitel školy** | rozhoduje o nákupu | jednoduchost, bezpečnost dat, rozumná cena |

## 3. Hodnotová nabídka

> Poradna je **soukromý prostor školy pro otázky a odpovědi z IT**. Na rozdíl od Discordu se odpovědi neztratí, na rozdíl od Stack Overflow je to bezpečné místo jen pro vlastní studenty.

## 4. User stories

Formát: *Jako [kdo] chci [co], abych [proč].*

- Jako **student** chci položit otázku, abych dostal radu od lektora nebo spolužáků.
- Jako **student** chci vyhledat v otázkách, abych se nemusel ptát na něco, co už je zodpovězené.
- Jako **lektor** chci označit správnou odpověď, aby ostatní hned viděli řešení.
- Jako **lektor** chci pozvat studenty kódem, aby se do prostoru nedostal nikdo cizí.
- Jako **lektor** chci smazat nevhodný obsah, aby Poradna zůstala příjemným místem.

## 5. Rozsah MVP (MoSCoW)

MVP (Minimum Viable Product) = nejmenší verze produktu, která už řeší problém a dá se dát do rukou skutečným uživatelům. Cílem je co nejdřív zjistit, jestli to lidi chtějí.

| Priorita | Funkce | Stav |
|----------|--------|------|
| **Must** (bez toho to nejde) | registrace a přihlášení, otázky, odpovědi, prostor pro školu, pozvánky | ✅ lekce 4–11 |
| **Should** (velmi důležité) | vyhledávání a filtry, správná odpověď, role lektora | ✅ lekce 7, 9 |
| **Could** (bylo by fajn) | AI návrh odpovědi pro lektora, e-mailové notifikace, Markdown v odpovědích | AI v lekci 13 |
| **Won't** (teď ne) | mobilní aplikace, platby kartou, hlasování o odpovědích | — |

## 6. Jak poznáme, že to funguje (metriky)

- **Aktivace:** kolik nově registrovaných položí nebo zodpoví první otázku do 7 dní.
- **Retence:** kolik škol je aktivních i po měsíci.
- **Hlavní metrika:** počet zodpovězených otázek týdně.
- **Kvalitativně:** rozhovory s 5 lektory a 10 studenty po prvním měsíci.

## 7. Roadmapa

| Fáze | Cíl |
|------|-----|
| **Pilot** | 1 kroužek, ruční onboarding, sběr zpětné vazby |
| **Beta** | 5–10 škol na Vysočině zdarma, ladění podle zpětné vazby |
| **Spuštění** | placený tarif pro školy, landing page, SEO |
| **Růst** | integrace s MS Teams / Google Classroom, AI funkce |

## 8. Jak se plánuje vývoj

- Každá user story = **issue** na GitHubu (šablony v `.github/ISSUE_TEMPLATE/`).
- Issues seřazené na nástěnce **GitHub Projects** ve sloupcích *Backlog → Rozpracováno → Review → Hotovo*.
- Práce ve **sprintech** po 1–2 týdnech: na začátku vybrat, co se stihne, na konci ukázat výsledek a zhodnotit, co zlepšit (retrospektiva).
