# Jak pracujeme s gitem

Pravidla, podle kterých se na projektu spolupracuje. Stejný princip používá většina týmů ve firmách.

## Základní pojmy

| Pojem | Co to je |
|-------|----------|
| **commit** | uložený stav projektu s popisem změny („snímek“) |
| **branch** (větev) | samostatná linie vývoje, ve které můžeš pracovat, aniž bys rozbil `main` |
| **merge** | spojení větve zpátky do jiné větve |
| **pull request (PR)** | žádost na GitHubu: „podívejte se na moje změny a spojte je do `main`“ |
| **remote** | kopie repozitáře na serveru (GitHub), obvykle se jmenuje `origin` |

## Postup při každé změně

```bash
# 1. Aktualizuj si main
git checkout main
git pull

# 2. Vytvoř si větev pro jednu konkrétní věc
git checkout -b feature/oblibene-otazky

# 3. Pracuj a průběžně ukládej malé commity
git add .
git commit -m "Přidej tlačítko pro označení oblíbené otázky"

# 4. Pošli větev na GitHub
git push -u origin feature/oblibene-otazky

# 5. Na GitHubu otevři Pull Request, počkej na kontrolu (review) a testy (CI)
# 6. Po schválení PR spoj (Merge) a větev smaž
```

## Pojmenování větví

- `feature/…`: nová funkce (`feature/vyhledavani`)
- `fix/…`: oprava chyby (`fix/prazdny-formular`)
- `docs/…`: jen dokumentace

## Dobrá commit zpráva

- Píše se v rozkazovacím způsobu a říká, **co commit udělá**: „Přidej validaci e-mailu“, ne „přidal jsem něco“.
- První řádek do ~70 znaků. Pokud je potřeba vysvětlit **proč**, přidej prázdný řádek a pak podrobnosti.
- Jeden commit = jedna logická změna. Nemíchej opravu chyby s přeformátováním celého souboru.

## Když se něco pokazí

| Situace | Příkaz |
|---------|--------|
| chci zahodit neuložené změny v souboru | `git restore soubor.js` |
| chci upravit zprávu posledního commitu (ještě nepushnutého) | `git commit --amend` |
| chci se podívat, co jsem změnil | `git diff` |
| konflikt při merge | otevři soubor, vyber správnou verzi mezi `<<<<<<<` a `>>>>>>>`, ulož, `git add`, `git commit` |

## Code review

Při kontrole cizího PR se ptej:

1. Dělá kód to, co slibuje popis PR?
2. Rozumím mu? Pokud ne, je potřeba ho zjednodušit nebo okomentovat.
3. Jsou ošetřené chyby a okrajové případy?
4. Přibyly testy na novou logiku?

Komentuj kód, ne člověka: „Tady by se hodila kontrola na prázdný vstup“ místo „Tohle jsi zapomněl“.
