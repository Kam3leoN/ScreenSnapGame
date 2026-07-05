import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { submitScore } from "../services/api";
import type { GameStateSnapshot } from "../types/game";

/**
 * Écran de fin de partie et enregistrement du score.
 */
export function GameOverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const snapshot = location.state as GameStateSnapshot | null;
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!snapshot) {
      navigate("/", { replace: true });
    }
  }, [snapshot, navigate]);

  if (!snapshot) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const result = await submitScore({
        token: snapshot.token,
        username,
        score: snapshot.score,
        events: snapshot.events,
      });
      setMessage(result.message);
      window.K?.Toast?.show({
        title: result.message,
        variant: result.ok ? "success" : "error",
      });
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ssg-gameover container">
      <img src="/img/gameover.svg" alt="" className="ssg-gameover__art" width={200} />
      <h1 className="ssg-title">Game Over</h1>
      <p className="ssg-gameover__score">
        Score : <strong>{snapshot.score.toLocaleString("fr-FR")}</strong>
      </p>
      <p className="ssg-gameover__level">Niveau : {snapshot.settingsName}</p>

      <form className="ssg-gameover__form" onSubmit={handleSubmit}>
        <label className="ssg-gameover__label" htmlFor="player">
          Pseudo (3 à 9 caractères)
        </label>
        <input
          id="player"
          className="field__input ssg-gameover__input"
          type="text"
          minLength={3}
          maxLength={9}
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <button
          type="submit"
          className="btn btn--filled btn--sm btn--primary ripple"
          disabled={submitting}
        >
          Enregistrer le score
        </button>
      </form>

      {message && <p className="ssg-gameover__message" role="status">{message}</p>}

      <div className="ssg-gameover__actions">
        <Link to="/" className="btn btn--filled btn--sm ripple">
          Rejouer
        </Link>
        <Link to="/hiscores" className="btn btn--text btn--sm ripple">
          Hi-Scores
        </Link>
      </div>
    </div>
  );
}
