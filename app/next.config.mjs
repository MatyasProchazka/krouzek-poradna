// Konfigurace Next.js

const isProd = process.env.NODE_ENV === "production";

// ----------------------------------------------------------------------------
// Bezpečnostní HTTP hlavičky (lekce 9)
// Prohlížeč se podle nich řídí a sám blokuje některé typy útoků.
// Zkontrolovat si je můžeš na https://securityheaders.com
// ----------------------------------------------------------------------------
const securityHeaders = [
  // Stránka se nesmí vložit do <iframe> na cizím webu (ochrana proti clickjackingu:
  // útočník by naši stránku schoval pod svoje tlačítko a nechal tě kliknout).
  { key: "X-Frame-Options", value: "DENY" },
  // Prohlížeč nesmí "hádat" typ souboru, bere jen Content-Type ze serveru.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Při odchodu na jiný web pošli jen doménu, ne celou adresu stránky.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Stránka nepotřebuje kameru, mikrofon ani polohu, tak je rovnou zakážeme.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy: odkud se smí načítat skripty, styly, obrázky…
  // Když se útočníkovi podaří vložit <script src="https://zly-web.cz/...">,
  // prohlížeč ho nespustí. 'unsafe-inline' potřebuje Next.js pro své vložené
  // skripty. Přísnější varianta s "nonce" je v dokumentaci Next.js.
  // Ve vývoji CSP vypínáme, protože hot reload potřebuje 'unsafe-eval'.
  ...(isProd
    ? [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "form-action 'self'",
          ].join("; "),
        },
        // HSTS: prohlížeč si zapamatuje, že web chodí jen přes HTTPS
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      ]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lekce 10: "standalone" vytvoří při buildu složku .next/standalone se
  // vším, co aplikace potřebuje ke spuštění (bez vývojových nástrojů).
  // Docker image je díky tomu malý. Viz Dockerfile.
  output: "standalone",

  // better-sqlite3 je nativní modul (část je napsaná v C++). Next.js ho nesmí
  // "zabalit" do svého bundlu, ale musí ho načíst přímo z node_modules.
  serverExternalPackages: ["better-sqlite3"],

  // Next.js do odpovědí přidává hlavičku "X-Powered-By: Next.js". Útočníkovi
  // to zbytečně prozrazuje, na čem web běží.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
