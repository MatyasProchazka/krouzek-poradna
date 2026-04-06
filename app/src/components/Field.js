// ============================================================================
// Pole formuláře s popiskem a chybovou hláškou
// ----------------------------------------------------------------------------
// Malá znovupoužitelná komponenta. Místo abychom v každém formuláři opakovali
// label + input + chybu + aria atributy, napíšeme to jednou tady.
//
// Props:
//   label     – text popisku
//   name      – název pole (zároveň id)
//   error     – chybová hláška, nebo nic
//   as        – "input" (výchozí), "textarea" nebo "select"
//   children  – <option> prvky pro select
//   ...rest   – všechno ostatní se předá přímo vstupu (type, value, onChange…)
// ============================================================================

export default function Field({ label, name, error, as: Tag = "input", children, ...rest }) {
  const errorId = `${name}-error`;

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <Tag
        id={name}
        name={name}
        // aria-invalid: čtečka obrazovky oznámí, že pole je vyplněné špatně
        aria-invalid={error ? "true" : undefined}
        // aria-describedby: propojí pole s jeho chybovou hláškou
        aria-describedby={error ? errorId : undefined}
        {...rest}
      >
        {children}
      </Tag>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
