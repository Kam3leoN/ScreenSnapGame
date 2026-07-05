import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChoiceGrid } from "../components/ChoiceGrid";
import { JokerPanel } from "../components/JokerPanel";
import { LifeBar } from "../components/LifeBar";
import { ScreenBezel } from "../components/ScreenBezel";
import { TimerDisplay } from "../components/TimerDisplay";
import { useCountdown } from "../hooks/useCountdown";
import { useGameAudio } from "../hooks/useGameAudio";
import { useGameEngine } from "../hooks/useGameEngine";
import { getBestScore, startSession } from "../services/api";
import type { LevelId, ScoreEntry } from "../types/game";

function parseLevel(raw: string | undefined): LevelId | null {
  const n = Number(raw);
  if (n === 1 || n === 2 || n === 3) return n;
  return null;
}

/**
 * Écran de jeu principal.
 */
export function GamePage() {
  const { level: levelParam } = useParams();
  const level = parseLevel(levelParam);
  const navigate = useNavigate();
  const { state, init, loadRound, answer, onTimerExpire, useFifty, useSwitch, clearFeedback } =
    useGameEngine();
  const { play, playTheme, stopTheme } = useGameAudio();
  const [best, setBest] = useState<ScoreEntry | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [roundError, setRoundError] = useState<string | null>(null);
  const [roundActive, setRoundActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const timerRemainingRef = useRef(0);

  const { remaining, reset } = useCountdown(
    state.settings?.time ?? 0,
    roundActive && !processing,
    () => {
      if (!processing) {
        onTimerExpire();
        play("lose");
        window.K?.Toast?.show({
          title: "Temps écoulé",
          variant: "error",
          displayLength: 750,
        });
      }
    }
  );

  timerRemainingRef.current = remaining;

  useEffect(() => {
    if (!level) {
      navigate("/", { replace: true });
      return;
    }
    setLoadError(null);
    startSession(level)
      .then((session) => init(session))
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : "Impossible de démarrer la partie.");
      });
    getBestScore().then(setBest).catch(() => setBest(null));
    playTheme();
    return () => stopTheme();
  }, [level, init, navigate, playTheme, stopTheme]);

  useEffect(() => {
    if (state.settings && !state.round && !state.loading && !state.gameOver) {
      setRoundError(null);
      void loadRound().catch((err) => {
        setRoundError(err instanceof Error ? err.message : "Impossible de charger une manche.");
      });
    }
  }, [state.settings, state.round, state.loading, state.gameOver, loadRound]);

  useEffect(() => {
    if (state.round && state.settings) {
      reset(state.settings.time);
      setRoundActive(true);
      setProcessing(false);
    }
  }, [state.round, state.settings, reset]);

  useEffect(() => {
    if (!state.feedback || state.gameOver) return;
    const id = window.setTimeout(() => {
      if (!state.gameOver) void loadRound();
    }, 500);
    return () => clearTimeout(id);
  }, [state.feedback, state.gameOver, loadRound]);

  useEffect(() => {
    if (!state.feedback) return;
    if (state.feedback === "good") {
      play("good");
      window.K?.Toast?.show({ title: "Bonne réponse !", variant: "success", displayLength: 750 });
    } else {
      play("bad");
      window.K?.Toast?.show({ title: "Mauvaise réponse.", variant: "error", displayLength: 750 });
    }
    const id = window.setTimeout(() => clearFeedback(), 400);
    return () => clearTimeout(id);
  }, [state.feedback, play, clearFeedback]);

  useEffect(() => {
    if (state.gameOver && state.session) {
      setRoundActive(false);
      navigate("/gameover", {
        state: {
          token: state.session.token,
          score: state.score,
          events: state.events,
          settingsName: state.settings?.name ?? "",
          level,
        },
      });
    }
  }, [state.gameOver, state.session, state.score, state.events, state.settings, level, navigate]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (processing || !state.round) return;
      setProcessing(true);
      setRoundActive(false);
      const timerLeft = timerRemainingRef.current;
      const correct = index === state.round.correctIndex;
      answer(index, timerLeft);
      if (correct && state.settings) {
        const newScore = state.score + state.settings.choices * 100 + timerLeft * 10;
        if (newScore >= 10000) play("extra");
      }
    },
    [processing, state.round, state.settings, state.score, answer, play]
  );

  const handleFifty = useCallback(() => {
    useFifty();
  }, [useFifty]);

  const handleSwitch = useCallback(() => {
    setRoundActive(false);
    useSwitch();
    void loadRound();
  }, [useSwitch, loadRound]);

  if (loadError) {
    return (
      <div className="container ssg-loading">
        <p>{loadError}</p>
        <button type="button" className="btn btn--filled btn--sm ripple" onClick={() => navigate("/")}>
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  if (!state.settings) {
    return <div className="container ssg-loading">Chargement de la partie…</div>;
  }

  if (roundError && !state.round) {
    return (
      <div className="container ssg-loading">
        <p>{roundError}</p>
        <button
          type="button"
          className="btn btn--filled btn--sm ripple"
          onClick={() => void loadRound().catch(() => undefined)}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="ssg-game container">
      <h1 className="ssg-title">ScreenSnapGame</h1>
      <div className="ssg-game__grid">
        <aside className="ssg-game__side">
          <div className="chip ssg-chip">Meilleur score</div>
          <p className="ssg-game__best">
            {best ? (
              <>
                <strong>{best.hiscore.toLocaleString("fr-FR")}</strong>
                <br />
                {best.username}
              </>
            ) : (
              "—"
            )}
          </p>
          <JokerPanel
            fiftyLeft={state.fiftyLeft}
            switchLeft={state.switchLeft}
            fiftyEnabled={state.settings.fifty}
            switchEnabled={state.settings.switch}
            onFifty={handleFifty}
            onSwitch={handleSwitch}
            disabled={processing}
          />
        </aside>

        <section className="ssg-game__center">
          {state.round && (
            <ScreenBezel image={state.round.image} title={state.round.correctTitle} />
          )}
          {state.round && (
            <ChoiceGrid
              answers={state.round.answers}
              hiddenIndexes={state.hiddenIndexes}
              disabled={processing}
              onSelect={handleAnswer}
            />
          )}
        </section>

        <aside className="ssg-game__side">
          <div className="chip ssg-chip">Score</div>
          <p className="ssg-game__score">{state.score.toLocaleString("fr-FR")}</p>
          <LifeBar lives={state.lives} />
          <TimerDisplay remaining={remaining} total={state.settings.time} />
        </aside>
      </div>
    </div>
  );
}
