import type { LevelId } from "../../../shared/gameRules";

export type { LevelId };

export interface GameSettings {
  level: LevelId;
  name: string;
  time: number;
  lives: number;
  choices: number;
  fifty: boolean;
  switch: boolean;
  fiftyUses: number;
  switchUses: number;
}

export interface RoundAnswer {
  index: number;
  title: string;
}

export interface GameRound {
  image: string;
  correctTitle: string;
  correctIndex: number;
  answers: RoundAnswer[];
}

export interface RoundEvent {
  correct: boolean;
  timerRemaining: number;
  choices: number;
}

export interface ScoreEntry {
  username: string;
  hiscore: number;
  level: string;
  createdAt?: string;
}

export interface GameSession {
  settings: GameSettings;
  token: string;
}

export interface GameStateSnapshot {
  level: LevelId;
  token: string;
  score: number;
  events: RoundEvent[];
  settingsName: string;
}
