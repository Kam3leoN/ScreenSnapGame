interface TimerDisplayProps {
  remaining: number;
  total: number;
}

/**
 * Affichage numérique du chronomètre.
 */
export function TimerDisplay({ remaining, total }: TimerDisplayProps) {
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const urgent = remaining <= 3;

  return (
    <div className={`ssg-timer ${urgent ? "ssg-timer--urgent" : ""}`}>
      <div className="ssg-timer__value" aria-live="polite">
        {remaining}
      </div>
      <div className="ssg-timer__bar" role="progressbar" aria-valuenow={remaining} aria-valuemin={0} aria-valuemax={total}>
        <span className="ssg-timer__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="ssg-timer__label">secondes</span>
    </div>
  );
}
