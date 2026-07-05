import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getScores } from "../services/api";
import type { ScoreEntry } from "../types/game";

/**
 * Classement des meilleurs scores.
 */
export function HiScoresPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScores(100)
      .then(setScores)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ssg-hiscores container">
      <h1 className="ssg-title">Hi-Scores</h1>
      {loading && <p>Chargement…</p>}
      {!loading && scores.length === 0 && <p>Aucun score enregistré.</p>}
      {!loading && scores.length > 0 && (
        <table className="ssg-hiscores__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Joueur</th>
              <th>Score</th>
              <th>Niveau</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={`${s.username}-${i}`}>
                <td>{i + 1}</td>
                <td>{s.username}</td>
                <td>{s.hiscore.toLocaleString("fr-FR")}</td>
                <td>{s.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/" className="btn btn--filled btn--sm ripple ssg-hiscores__back">
        Retour
      </Link>
    </div>
  );
}
