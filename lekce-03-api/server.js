// ============================================================================
// Lekce 3 – BACKEND: REST API v Expressu
// ----------------------------------------------------------------------------
// Rozdělení rolí:
//   FRONTEND (public/)       běží v prohlížeči uživatele, zobrazuje data
//   BACKEND  (tento soubor)  běží na serveru, data ukládá a hlídá pravidla
//   API                      domluvený "jazyk", kterým spolu mluví
//
// REST API = adresy (endpointy) popisují ZDROJE (např. /api/questions)
// a HTTP metody říkají, CO se zdrojem chceme udělat:
//   GET    /api/questions       seznam otázek
//   GET    /api/questions/:id   jedna otázka
//   POST   /api/questions       vytvoř novou otázku
//   DELETE /api/questions/:id   smaž otázku
//
// Spuštění:  npm install   (jen poprvé, stáhne Express)
//            npm run dev   (server se sám restartuje při změně souboru)
// Pak otevři http://localhost:3000
// ============================================================================

const express = require("express");
const path = require("node:path");
const store = require("./questions-store");

const app = express();
const PORT = 3000;

// --- Middleware --------------------------------------------------------------
// Middleware je funkce, která proběhne u každého požadavku PŘED naším kódem.

// Rozparsuje tělo požadavku ve formátu JSON → máme ho pak v req.body
app.use(express.json());

// Vlastní middleware: zaloguje každý požadavek (stejně jako v lekci 1)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pošle požadavek dál; bez next() by se zasekl
});

// Složka public/ obsahuje frontend (HTML, CSS, JS). Express ji servíruje
// jako statické soubory, takže http://localhost:3000 vrátí public/index.html.
app.use(express.static(path.join(__dirname, "public")));

// Kategorie, které povolujeme. Backend NIKDY nevěří tomu, co přijde
// z frontendu. Uživatel může poslat požadavek i mimo náš formulář (curl, Postman).
const CATEGORIES = ["frontend", "backend", "hosting", "jine"];

// --- Endpointy (CONTROLLER v MVC) ------------------------------------------------
// Controller přijme požadavek, zavolá model a vrátí odpověď.

app.get("/api/questions", (req, res) => {
  res.json(store.listQuestions()); // res.json nastaví Content-Type i stavový kód 200
});

app.get("/api/questions/:id", (req, res) => {
  // :id je parametr v adrese, Express ho dá do req.params.id (vždy jako text)
  const question = store.getQuestion(Number(req.params.id));
  if (!question) {
    return res.status(404).json({ error: "Otázka nenalezena" });
  }
  res.json(question);
});

app.post("/api/questions", (req, res) => {
  const { title, body = "", category } = req.body;

  // Jednoduchá validace. Pořádně ji vyřešíme v lekci 6 knihovnou Zod.
  if (typeof title !== "string" || title.trim().length < 5) {
    // 400 Bad Request = chyba je na straně klienta (poslal špatná data)
    return res.status(400).json({ error: "Otázka musí mít aspoň 5 znaků." });
  }
  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({ error: "Neznámá kategorie." });
  }

  const question = store.createQuestion({ title: title.trim(), body: String(body).trim(), category });
  // 201 Created = něco nového vzniklo. Vracíme to, aby frontend znal nové id.
  res.status(201).json(question);
});

app.delete("/api/questions/:id", (req, res) => {
  const deleted = store.deleteQuestion(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Otázka nenalezena" });
  // 204 No Content = povedlo se, ale nic nevracím
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API běží na http://localhost:${PORT}`);
});

// ----------------------------------------------------------------------------
// Zkus API i bez prohlížeče:
//   curl http://localhost:3000/api/questions
//   curl -X POST http://localhost:3000/api/questions \
//        -H "Content-Type: application/json" \
//        -d '{"title":"Co je to API?","category":"backend"}'
// Pohodlnější je aplikace Postman nebo rozšíření Thunder Client ve VS Code.
// ----------------------------------------------------------------------------
