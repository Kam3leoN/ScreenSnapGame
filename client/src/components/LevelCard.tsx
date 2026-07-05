import { Link } from "react-router-dom";
import type { LevelId } from "../types/game";

interface LevelCardProps {
  level: LevelId;
  name: string;
  time: number;
  lives: number;
  choices: number;
  fifty: boolean;
  switchJoker: boolean;
  tone: "easy" | "medium" | "hard";
}

/**
 * Carte de sélection de niveau (K3UI card).
 */
export function LevelCard({
  level,
  name,
  time,
  lives,
  choices,
  fifty,
  switchJoker,
  tone,
}: LevelCardProps) {
  return (
    <article className={`card ssg-level-card ssg-level-card--${tone}`}>
      <div className="card__content">
        <h2 className="card__title">Niveau : {name}</h2>
        <ul className="ssg-level-card__list">
          <li>Temps : <strong>{time} secondes</strong></li>
          <li>Essais : <strong>{lives} vies</strong></li>
          <li>Choix : <strong>{choices} réponses</strong></li>
          <li>Score : <strong>x{choices}</strong></li>
          <li>Joker 50:50 : <strong>{fifty ? "Oui" : "Non"}</strong></li>
          <li>Joker Switch : <strong>{switchJoker ? "Oui" : "Non"}</strong></li>
        </ul>
        <Link
          to={`/game/${level}`}
          className="btn btn--filled btn--sm btn--primary ripple ssg-level-card__play"
        >
          Jouer
        </Link>
      </div>
    </article>
  );
}
