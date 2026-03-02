// ============================================================================
// Lekce 3 – FRONTEND, který mluví s backendem přes API
// ----------------------------------------------------------------------------
// Oproti lekci 2 se změnilo jediné: data už nejsou v poli v prohlížeči,
// ale bereme si je ze serveru funkcí fetch(). HTML a CSS jsou stejné.
//
// fetch() je ASYNCHRONNÍ: požadavek po síti chvíli trvá a prohlížeč mezitím
// nečeká zamrzlý. Slovíčko `await` říká "počkej na výsledek, pak pokračuj".
// ============================================================================

const CATEGORY_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  hosting: "Hosting a domény",
  jine: "Jiné",
};

const form = document.querySelector("#question-form");
const list = document.querySelector("#question-list");
const count = document.querySelector("#count");
const errorBox = document.querySelector("#error");

/** Načte otázky z API a vykreslí je. */
async function loadQuestions() {
  // GET požadavek na náš backend. Adresa je relativní, protože frontend
  // i API běží na stejném serveru (localhost:3000).
  const response = await fetch("/api/questions");
  const questions = await response.json(); // tělo odpovědi převedeme z JSONu
  render(questions);
}

function render(questions) {
  list.innerHTML = "";
  for (const q of questions) {
    const li = document.createElement("li");
    li.className = "question";

    const h3 = document.createElement("h3");
    h3.textContent = q.title;

    const p = document.createElement("p");
    p.textContent = q.body || "Bez podrobností.";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${CATEGORY_LABELS[q.category]} · ${new Date(q.createdAt).toLocaleString("cs-CZ")}`;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "link-button";
    del.textContent = "Smazat";
    del.addEventListener("click", () => deleteQuestion(q.id));

    li.append(h3, p, meta, del);
    list.append(li);
  }
  count.textContent = questions.length;
}

async function deleteQuestion(id) {
  await fetch(`/api/questions/${id}`, { method: "DELETE" });
  await loadQuestions(); // po změně si načteme aktuální stav ze serveru
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.textContent = "";

  const data = Object.fromEntries(new FormData(form)); // { title, body, category }

  // POST požadavek: posíláme data v těle jako JSON a hlavičkou říkáme,
  // v jakém formátu jsou (aby je express.json() na serveru uměl přečíst).
  const response = await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // response.ok je true pro stavové kódy 200–299
  if (!response.ok) {
    const { error } = await response.json();
    errorBox.textContent = error; // chybu od serveru ukážeme uživateli
    return;
  }

  form.reset();
  await loadQuestions();
});

loadQuestions();
