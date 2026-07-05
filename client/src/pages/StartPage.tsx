import { useEffect, useState } from "react";
import { LevelCard } from "../components/LevelCard";
import { getScores } from "../services/api";
import type { ScoreEntry } from "../types/game";
import { LEVEL_SETTINGS } from "@shared/gameRules";

/**
 * Page d'accueil — sélection du niveau et règles.
 */
export function StartPage() {
  const [topScores, setTopScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    getScores(5)
      .then(setTopScores)
      .catch(() => setTopScores([]));
  }, []);

  return (
    <div className="ssg-start container">
      <h1 className="ssg-title">ScreenSnapGame</h1>
      <p className="ssg-lead">
        Identifiez le jeu vidéo à partir de sa capture d&apos;écran. Chaque bonne réponse
        rapporte des points ; perdez une vie si le temps expire ou si vous vous trompez.
      </p>

      <section className="ssg-rules">
        <article className="card">
          <div className="card__content">
            <h2 className="card__title">Principe</h2>
            <p>
              Cliquez sur le bon titre parmi les propositions. Vous disposez de quelques
              secondes par capture.
            </p>
          </div>
        </article>
        <article className="card">
          <div className="card__content">
            <h2 className="card__title">Hi-Score</h2>
            <p>
              +100 pts × nombre de propositions, +10 pts × secondes restantes.
            </p>
          </div>
        </article>
        <article className="card">
          <div className="card__content">
            <h2 className="card__title">Extra Life</h2>
            <p>À 10 000 pts, puis tous les 25 000 pts.</p>
          </div>
        </article>
      </section>

      <h2 className="ssg-subtitle">Choisissez un niveau</h2>
      <div className="ssg-levels">
        <LevelCard {...LEVEL_SETTINGS[1]} switchJoker={LEVEL_SETTINGS[1].switch} tone="easy" />
        <LevelCard {...LEVEL_SETTINGS[2]} switchJoker={LEVEL_SETTINGS[2].switch} tone="medium" />
        <LevelCard {...LEVEL_SETTINGS[3]} switchJoker={LEVEL_SETTINGS[3].switch} tone="hard" />
      </div>

      {topScores.length > 0 && (
        <section className="ssg-top5">
          <h2 className="ssg-subtitle">Top 5</h2>
          <ol className="ssg-top5__list">
            {topScores.map((s, i) => (
              <li key={s.username}>
                {i + 1}. {s.username} — {s.hiscore.toLocaleString("fr-FR")} pts
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
