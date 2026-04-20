// Barevný štítek kategorie. Barvu určuje CSS třída podle kategorie.
// Barva ale nikdy není JEDINÝ nositel informace: vždy je tam i text
// (barvoslepí uživatelé by jinak neměli šanci).
import { CATEGORIES } from "@/lib/categories";

export default function CategoryBadge({ category }) {
  return <span className={`badge badge-${category}`}>{CATEGORIES[category] ?? category}</span>;
}
