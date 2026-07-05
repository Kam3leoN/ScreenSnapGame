interface LifeBarProps {
  lives: number;
}

/**
 * Affichage des vies restantes.
 */
export function LifeBar({ lives }: LifeBarProps) {
  return (
    <div className="ssg-lives" aria-label={`${lives} vies restantes`}>
      {Array.from({ length: lives }, (_, i) => (
        <span key={i} className="ssg-lives__heart" aria-hidden="true">
          ♥
        </span>
      ))}
    </div>
  );
}
