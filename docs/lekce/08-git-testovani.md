# Lekce 8 – Git v týmu a testování

## Co jsme probírali

- Proč verzovat kód a jak git funguje uvnitř: commity, větve, `HEAD`, historie.
- Týmový postup: větev → commity → push → pull request → code review → merge.
- Dobré commit zprávy, pojmenování větví, řešení konfliktů.
- Proč testovat: jistota při změnách, dokumentace chování, rychlejší vývoj.
- Pyramida testů: unit → integrační → end-to-end (E2E).
- Vitest: `describe`, `it`, `expect`, vzor Arrange–Act–Assert, okrajové případy.
- Jak psát testovatelný kód: čisté funkce, „čas jako parametr“, databáze v paměti.
- Ruční testování vs. automatické. Krátká ukázka E2E nástroje Playwright.

## Soubory k prohlédnutí

- [`app/tests/`](../../app/tests/): unit testy (`format`, `filter`, `validation`) a integrační test databáze (`questions`)
- [`app/vitest.config.mjs`](../../app/vitest.config.mjs): nastavení testů
- [`docs/git-workflow.md`](../git-workflow.md): pravidla práce s gitem
- [`.github/pull_request_template.md`](../../.github/pull_request_template.md): šablona PR

## Spuštění testů

```bash
cd app
npm test             # jednorázově
npm run test:watch   # průběžně při každé změně souboru
```

## Vyzkoušej

1. Rozbij schválně funkci `pluralize` (třeba změň `<= 4` na `< 4`) a spusť testy. Který test selže a proč?
2. Projdi si historii projektu: `git log --oneline --graph` a `git diff lekce-07 lekce-08 --stat`.

## Úkol na doma

1. Forkni repo na GitHubu, vytvoř větev, přidej test pro funkci `normalize` s prázdným řetězcem a otevři pull request.
2. Napiš test pro `createAnswer`, který ověří, že odpověď má správné `questionId`.
3. Dobrovolně: zkus TDD. Nejdřív napiš test na funkci `truncate(text, delka)`, pak ji naimplementuj.
