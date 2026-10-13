/**
 * Affiche la note d'un artisan avec cinq étoiles et sa valeur exacte.
 * Accepte une note comprise entre 0 et 5 (nombre ou chaîne numérique).
 *
 * Exemple : <ArtisanRating value={artisan.grade} onDark />
 */
export default function ArtisanRating({ value, onDark = false }) {
  const normalizedValue =
    typeof value === 'string' ? value.trim().replace(',', '.') : value;
  const grade = Number(normalizedValue);
  const hasGrade =
    normalizedValue !== null &&
    normalizedValue !== undefined &&
    normalizedValue !== '' &&
    Number.isFinite(grade) &&
    grade >= 0 &&
    grade <= 5;

  if (!hasGrade) {
    return <span className="artisan-rating">Note non renseignée</span>;
  }

  const formattedGrade = grade.toLocaleString('fr-FR', {
    maximumFractionDigits: 2,
  });

  const emptyColor = onDark ? '#d1e6f5' : '#a1acb8';
  const filledColor = onDark ? '#ffe29a' : '#b57e00';

  return (
    <span
      className="artisan-rating d-inline-flex align-items-center gap-2"
      role="img"
      aria-label={`Note : ${formattedGrade} sur 5`}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          position: 'relative',
          fontSize: '1.25rem',
          lineHeight: 1,
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: emptyColor }}>★★★★★</span>
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${(grade / 5) * 100}%`,
            overflow: 'hidden',
            color: filledColor,
          }}
        >
          ★★★★★
        </span>
      </span>
      <span aria-hidden="true" style={{ whiteSpace: 'nowrap' }}>
        {formattedGrade}/5
      </span>
    </span>
  );
}
