// ============================================================================
// Lekce 2 – JavaScript v prohlížeči
// ----------------------------------------------------------------------------
// JavaScript tu dělá tři věci:
//   1. drží DATA (pole otázek),
//   2. VYKRESLUJE data do HTML (funkce render),
//   3. reaguje na UDÁLOSTI (odeslání formuláře).
// Tenhle vzorec "data → vykreslení → událost změní data → znovu vykreslit"
// je přesně to, co později za nás bude dělat React.
// ============================================================================

// 1) DATA – zatím jen v paměti prohlížeče. Po obnovení stránky zmizí,
//    protože nemáme server ani databázi (to přijde v lekcích 3 a 4).
const questions = [
  {
    title: "Jaký je rozdíl mezi frontendem a backendem?",
    body: "Pořád to slyším, ale nevím, kde je hranice.",
    category: "backend",
    createdAt: new Date("2026-02-18T18:30:00"),
  },
  {
    title: "Proč se mi na mobilu stránka zobrazuje maličká?",
    body: "Na počítači vypadá dobře, na telefonu je všechno malé.",
    category: "frontend",
    createdAt: new Date("2026-02-19T20:10:00"),
  },
];

// Názvy kategorií pro zobrazení (hodnota v <select> → hezký text)
const CATEGORY_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  hosting: "Hosting a domény",
  jine: "Jiné",
};

// Najdeme si prvky ze stránky, se kterými budeme pracovat.
// DOM (Document Object Model) = stránka jako strom objektů v JavaScriptu.
const form = document.querySelector("#question-form");
const list = document.querySelector("#question-list");
const count = document.querySelector("#count");

// 2) VYKRESLENÍ – z pole otázek vytvoří HTML prvky.
function render() {
  list.innerHTML = ""; // vyprázdníme seznam a vykreslíme ho celý znovu

  // Nejnovější otázky nahoře: zkopírujeme pole a seřadíme ho podle data.
  const sorted = [...questions].sort((a, b) => b.createdAt - a.createdAt);

  for (const q of sorted) {
    const li = document.createElement("li");
    li.className = "question";

    // POZOR: text od uživatele vkládáme přes textContent, NE přes innerHTML.
    // Kdyby někdo napsal do otázky <script>…</script>, přes innerHTML by se
    // spustil (útok XSS). textContent ho zobrazí jen jako obyčejný text.
    const h3 = document.createElement("h3");
    h3.textContent = q.title;

    const p = document.createElement("p");
    p.textContent = q.body || "Bez podrobností.";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${CATEGORY_LABELS[q.category]} · ${q.createdAt.toLocaleString("cs-CZ")}`;

    li.append(h3, p, meta);
    list.append(li);
  }

  count.textContent = questions.length;
}

// 3) UDÁLOST – co se stane po odeslání formuláře.
form.addEventListener("submit", (event) => {
  // Výchozí chování formuláře je odeslat data na server a znovu načíst stránku.
  // Server zatím nemáme, takže to zakážeme a vyřešíme vše v JavaScriptu.
  event.preventDefault();

  // FormData přečte hodnoty všech polí podle atributu name="…"
  const data = new FormData(form);

  questions.push({
    title: data.get("title").trim(),
    body: data.get("body").trim(),
    category: data.get("category"),
    createdAt: new Date(),
  });

  form.reset();  // vyčistí formulář
  render();      // data se změnila → překreslíme
});

// Úvodní vykreslení po načtení stránky
render();

// ----------------------------------------------------------------------------
// Zkus si:
//   1. Ulož otázky do localStorage, aby po obnovení stránky nezmizely.
//      (localStorage.setItem("questions", JSON.stringify(questions)))
//   2. Přidej tlačítko "Smazat" ke každé otázce.
//   3. Přidej nad seznam pole pro vyhledávání v otázkách.
// ----------------------------------------------------------------------------
