// Konfigurace Next.js. Většinou stačí výchozí nastavení.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 je nativní modul (část je napsaná v C++). Next.js ho nesmí
  // "zabalit" do svého bundlu, ale musí ho načíst přímo z node_modules.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
