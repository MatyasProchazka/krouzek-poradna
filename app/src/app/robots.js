// ============================================================================
// robots.txt – pokyny pro vyhledávače (lekce 12)
// ----------------------------------------------------------------------------
// Next.js z tohoto souboru vygeneruje /robots.txt. Říkáme v něm, co mají
// roboti (Googlebot, Seznambot…) procházet a kde najdou mapu webu.
// Neveřejné části (otázky škol, API) indexovat nechceme.
// ============================================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/otazky/", "/ptat-se", "/skola"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
