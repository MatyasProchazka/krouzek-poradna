// sitemap.xml – seznam veřejných stránek pro vyhledávače (lekce 12)
// Vyhledávač je najde i sám přes odkazy, mapa webu mu ale pomůže a řekne,
// jak důležité stránky jsou a jak často se mění.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap() {
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/registrace`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteUrl}/prihlaseni`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
