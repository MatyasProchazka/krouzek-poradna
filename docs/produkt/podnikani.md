# Podnikání ve webovém vývoji

Podklady ke druhé části lekce 12. Jde o obecný přehled pro orientaci, ne o právní ani daňové poradenství. Konkrétní situaci je vždy dobré probrat s účetním.

## Weby vs. systémy

| | Prezentační web | Webový systém / aplikace |
|---|---|---|
| Příklad | web kavárny, portfolio | rezervační systém, Poradna, e-shop na míru |
| Technologie | WordPress, Webflow, statický web | framework (Next.js, Laravel, .NET…) + databáze |
| Délka zakázky | dny až týdny | měsíce |
| Cena | jednotky až desítky tisíc Kč | desítky tisíc až miliony Kč |
| Po předání | občasné úpravy | průběžný vývoj, správa, podpora |
| Riziko | nízké | vysoké: nejasné zadání, rostoucí rozsah |

## Jak nacenit práci

- **Hodinová sazba:** férové u nejasného zadání. Juniorní vývojář v ČR zhruba 400–800 Kč/h, zkušený 1 000–2 000 Kč/h a víc (orientačně, liší se podle regionu a oboru).
- **Fixní cena:** zákazník ji má rád, ale riziko neodhadnuté práce nese vývojář. Funguje jen s přesnou specifikací.
- **Odhad:** rozpadni práci na malé úkoly, každý odhadni, sečti a přidej rezervu 20–50 %. Začátečníci odhadují skoro vždy málo.
- **Údržba a hosting:** měsíční paušál (aktualizace, zálohy, drobné úpravy). Je to stabilní příjem.

## Smlouva a zadání

Před začátkem práce si sepiš aspoň jednoduchou smlouvu nebo závaznou objednávku:

1. **Rozsah:** co přesně dodáš a co už ne (třeba „texty a fotky dodá zákazník“).
2. **Cena a platby:** záloha předem (obvykle 30–50 %), zbytek po předání.
3. **Termíny** a co se stane, když zákazník nedodá podklady.
4. **Počet kol úprav** v ceně, každé další se účtuje zvlášť.
5. **Licence a práva** ke kódu a grafice, přístupy k hostingu a doméně.
6. **Předávací protokol:** co znamená „hotovo“.

## Fakturace a forma podnikání

| Forma | Pro koho | Poznámka |
|---|---|---|
| **DPP / DPČ** | občasná práce pro jednoho zadavatele | nejjednodušší, za tebe řeší zaměstnavatel |
| **Živnost (OSVČ)** | samostatná práce pro více klientů | živnostenský list (u programování obvykle živnost volná), faktury, daňové přiznání, zálohy na pojištění; existuje i paušální daň |
| **s.r.o.** | větší zakázky, víc společníků | odděluje majetek firmy od osobního, víc administrativy a účetnictví |

Faktura musí obsahovat povinné údaje (identifikace obou stran, IČO, číslo faktury, datum vystavení a splatnosti, předmět plnění, cenu). Na fakturaci existují jednoduché české SaaS služby, např. Fakturoid nebo iDoklad.

## Komunikace se zákazníkem

- **Ptej se na cíl, ne na řešení.** Zákazník řekne „chci aplikaci“, ale ve skutečnosti potřebuje „méně telefonátů s rezervacemi“.
- **Ukazuj průběžně.** Raději každý týden kousek než po třech měsících velké překvapení.
- **Všechno důležité písemně.** Po schůzce pošli e-mail se shrnutím, co jste se dohodli.
- **Změna zadání = změna ceny nebo termínu.** Řekni to včas a slušně.
- **Zákaznický servis** po předání: jak tě zákazník kontaktuje, do kdy odpovíš, co je v ceně.

## Produkt se musí i prodat

- **SEO:** aby tě našli ve vyhledávačích. Technické SEO (rychlost, metadata, sitemap, strukturovaná data) + obsah, který odpovídá na otázky lidí. V Poradně: `layout.js`, `robots.js`, `sitemap.js`, JSON-LD na landing page.
- **GEO (Generative Engine Optimization):** aby tě uměly doporučit i AI asistenty. Pomáhají jasné, fakticky přesné texty, strukturovaná data a odpovědi na konkrétní otázky.
- **Online reklama:** Google Ads, Sklik, sociální sítě. Rychlé, ale placené. Měř, kolik stojí jeden zákazník.
- **Doporučení a portfolio:** u freelancera často nejsilnější kanál. Každý spokojený zákazník je reference.
- **Obsah:** blog, ukázky práce, LinkedIn. Pomalé, ale dlouhodobě to funguje.

## Model SaaS v číslech (na příkladu Poradny)

- **MRR** (Monthly Recurring Revenue): měsíční opakovaný příjem. 40 škol × 990 Kč/rok ≈ 3 300 Kč měsíčně.
- **Churn:** kolik zákazníků za měsíc odejde. I 5 % měsíčně znamená, že za rok přijdeš o víc než třetinu.
- **CAC** (cena získání zákazníka) vs. **LTV** (kolik zákazník za celou dobu zaplatí). Zdravý byznys má LTV aspoň 3× vyšší než CAC.
- **Náklady:** hosting, doména, e-mail, nástroje, ale hlavně tvůj čas.
