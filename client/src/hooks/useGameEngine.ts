import { useCallback, useReducer } from "react";
import {
  computeRoundScore,
  shouldGrantExtraLife,
} from "@shared/gameRules";
import { fetchRound } from "../services/api";
import type {
  GameRound,
  GameSession,
  GameSettings,
  RoundEvent,
} from "../types/game";

interface GameEngineState {
  session: GameSession | null;
  settings: GameSettings | null;
  round: GameRound | null;
  lives: number;
  score: number;
  palier: number;
  fiftyLeft: number;
  switchLeft: number;
  hiddenIndexes: number[];
  events: RoundEvent[];
  loading: boolean;
  feedback: "good" | "bad" | null;
  gameOver: boolean;
}

type Action =
  | { type: "INIT"; payload: GameSession }
  | { type: "ROUND_LOADING" }
  | { type: "ROUND_LOADED"; payload: GameRound }
  | { type: "ROUND_ERROR" }
  | { type: "ANSWER"; payload: { index: number; timerRemaining: number } }
  | { type: "TIMER_EXPIRED" }
  | { type: "FIFTY" }
  | { type: "SWITCH" }
  | { type: "CLEAR_FEEDBACK" };

function reducer(state: GameEngineState, action: Action): GameEngineState {
  switch (action.type) {
    case "INIT": {
      const { settings } = action.payload;
      return {
        ...state,
        session: action.payload,
        settings,
        lives: settings.lives,
        fiftyLeft: settings.fiftyUses,
        switchLeft: settings.switchUses,
        score: 0,
        palier: 0,
        events: [],
        gameOver: false,
      };
    }
    case "ROUND_LOADING":
      return { ...state, loading: true, hiddenIndexes: [], feedback: null };
    case "ROUND_LOADED":
      return { ...state, loading: false, round: action.payload };
    case "ROUND_ERROR":
      return { ...state, loading: false };
    case "CLEAR_FEEDBACK":
      return { ...state, feedback: null };
    case "TIMER_EXPIRED": {
      if (!state.settings) return state;
      const lives = state.lives - 1;
      return {
        ...state,
        lives,
        gameOver: lives <= 0,
        events: [
          ...state.events,
          { correct: false, timerRemaining: 0, choices: state.settings.choices },
        ],
        feedback: "bad",
      };
    }
    case "ANSWER": {
      if (!state.settings || !state.round) return state;
      const correct = action.payload.index === state.round.correctIndex;
      let lives = state.lives;
      let score = state.score;
      let palier = state.palier;
      const event: RoundEvent = {
        correct,
        timerRemaining: correct ? action.payload.timerRemaining : 0,
        choices: state.settings.choices,
      };

      if (correct) {
        score += computeRoundScore(state.settings.choices, action.payload.timerRemaining);
        if (shouldGrantExtraLife(score, palier)) {
          palier += 1;
          lives += 1;
        }
      } else {
        lives -= 1;
      }

      return {
        ...state,
        score,
        lives,
        palier,
        events: [...state.events, event],
        gameOver: lives <= 0,
        feedback: correct ? "good" : "bad",
      };
    }
    case "FIFTY": {
      if (!state.round || !state.settings || state.fiftyLeft <= 0) return state;
      const wrong = state.round.answers
        .filter((a) => a.index !== state.round!.correctIndex)
        .map((a) => a.index);
      const shuffled = [...wrong].sort(() => Math.random() - 0.5);
      const hiddenIndexes = shuffled.slice(0, 2);
      return {
        ...state,
        fiftyLeft: state.fiftyLeft - 1,
        hiddenIndexes,
      };
    }
    case "SWITCH": {
      if (state.switchLeft <= 0) return state;
      return {
        ...state,
        switchLeft: state.switchLeft - 1,
        hiddenIndexes: [],
      };
    }
    default:
      return state;
  }
}

const initialState: GameEngineState = {
  session: null,
  settings: null,
  round: null,
  lives: 0,
  score: 0,
  palier: 0,
  fiftyLeft: 0,
  switchLeft: 0,
  hiddenIndexes: [],
  events: [],
  loading: false,
  feedback: null,
  gameOver: false,
};

/**
 * Moteur de jeu ScreenSnapGame (port de screengame.js).
 */
export function useGameEngine() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback((session: GameSession) => {
    dispatch({ type: "INIT", payload: session });
  }, []);

  const loadRound = useCallback(async () => {
    if (!state.settings) return;
    dispatch({ type: "ROUND_LOADING" });
    try {
      const round = await fetchRound(state.settings.choices);
      dispatch({ type: "ROUND_LOADED", payload: round });
    } catch (err) {
      dispatch({ type: "ROUND_ERROR" });
      throw err;
    }
  }, [state.settings]);

  const answer = useCallback((index: number, timerRemaining: number) => {
    dispatch({ type: "ANSWER", payload: { index, timerRemaining } });
  }, []);

  const onTimerExpire = useCallback(() => {
    dispatch({ type: "TIMER_EXPIRED" });
  }, []);

  const useFifty = useCallback(() => dispatch({ type: "FIFTY" }), []);
  const useSwitch = useCallback(() => dispatch({ type: "SWITCH" }), []);
  const clearFeedback = useCallback(() => dispatch({ type: "CLEAR_FEEDBACK" }), []);

  return {
    state,
    init,
    loadRound,
    answer,
    onTimerExpire,
    useFifty,
    useSwitch,
    clearFeedback,
  };
}
