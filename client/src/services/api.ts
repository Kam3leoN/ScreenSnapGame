import type {
  GameRound,
  GameSession,
  GameSettings,
  RoundEvent,
  ScoreEntry,
} from "../types/game";
import type { LevelId } from "../types/game";

const API_BASE = "/api";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Erreur réseau");
  }
  return res.json() as Promise<T>;
}

export function getSettings(level: LevelId): Promise<GameSettings> {
  return request<GameSettings>(`/settings/${level}`);
}

export function startSession(level: LevelId): Promise<GameSession> {
  return request<GameSession>("/games/session", {
    method: "POST",
    body: JSON.stringify({ level }),
  });
}

export function fetchRound(choices: number): Promise<GameRound> {
  return request<GameRound>("/games/round", {
    method: "POST",
    body: JSON.stringify({ choices }),
  });
}

export function getScores(limit = 100): Promise<ScoreEntry[]> {
  return request<ScoreEntry[]>(`/scores?limit=${limit}`);
}

export function getBestScore(): Promise<ScoreEntry | null> {
  return request<ScoreEntry | null>("/scores/best");
}

export function submitScore(payload: {
  token: string;
  username: string;
  score: number;
  events: RoundEvent[];
}): Promise<{ ok: boolean; message: string }> {
  return request("/scores", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
