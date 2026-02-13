// ============================================================================
// Lekce 1 – Jak funguje web
// ----------------------------------------------------------------------------
// Nejmenší možný webový server. Nepoužíváme žádnou knihovnu, jen modul `http`,
// který je součástí Node.js. Cílem je vidět, že "web" není nic magického:
// prohlížeč (klient) pošle textový POŽADAVEK a server vrátí textovou ODPOVĚĎ.
//
// Spuštění:   node server.js
// Pak otevři: http://localhost:3000
//             http://localhost:3000/api/cas
//             http://localhost:3000/neexistuje
// ============================================================================

const http = require("node:http");

const PORT = 3000;

// createServer dostane funkci, která se zavolá při KAŽDÉM příchozím požadavku.
//   req (request)  = co poslal klient: metoda, adresa, hlavičky, případně tělo
//   res (response) = objekt, do kterého zapisujeme odpověď
const server = http.createServer((req, res) => {
  // Každý požadavek si vypíšeme do terminálu, ať vidíme, co prohlížeč posílá.
  // Všimni si, že prohlížeč sám od sebe chce i /favicon.ico.
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.url}`);
  console.log("  User-Agent:", req.headers["user-agent"]);

  // --- Směrování (routing) ---------------------------------------------------
  // Podle adresy (URL) rozhodneme, co vrátit. Frameworky jako Express nebo
  // Next.js dělají přesně tohle, jen pohodlněji.

  if (req.method === "GET" && req.url === "/") {
    // Stavový kód 200 = "OK, tady to máš".
    // Hlavička Content-Type říká prohlížeči, JAK má tělo odpovědi zobrazit.
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <h1>Ahoj z mého prvního serveru 👋</h1>
      <p>Tuhle stránku nevytvořil prohlížeč, poslal ji server jako obyčejný text.</p>
      <p>Zkus <a href="/api/cas">/api/cas</a> nebo <a href="/neexistuje">/neexistuje</a>.</p>
    `);
    return;
  }

  if (req.method === "GET" && req.url === "/api/cas") {
    // Stejný server umí vracet i DATA místo stránky. Formát JSON je dnes
    // standard pro komunikaci mezi frontendem a backendem (API).
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ cas: new Date().toISOString(), zprava: "Tohle jsou data, ne stránka." }));
    return;
  }

  // Cokoliv jiného: stavový kód 404 = "tohle tu nemám".
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404 – stránka nenalezena");
});

server.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}  (ukončíš Ctrl+C)`);
});

// ----------------------------------------------------------------------------
// Zkus si:
//   1. Otevři v prohlížeči vývojářské nástroje (F12) → záložka Network
//      a sleduj požadavky, stavové kódy a hlavičky.
//   2. V terminálu zkus:  curl -i http://localhost:3000/api/cas
//      Přepínač -i ukáže i hlavičky odpovědi.
//   3. Přidej vlastní adresu, třeba /api/vtip, která vrátí náhodný vtip v JSONu.
// ----------------------------------------------------------------------------
