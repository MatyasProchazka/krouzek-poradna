// ============================================================================
// Stav načítání
// ----------------------------------------------------------------------------
// Next.js tuhle komponentu automaticky ukáže, zatímco se na serveru připravuje
// stránka. Místo bílé obrazovky uživatel vidí "kostru" obsahu (skeleton),
// takže ví, že se něco děje a co zhruba přijde.
// ============================================================================

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Načítám…">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton" />
      ))}
    </div>
  );
}
