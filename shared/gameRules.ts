/** Niveaux de difficulté ScreenSnapGame (source: ancien start.php). */

export type LevelId = 1 | 2 | 3;

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

export const LEVEL_SETTINGS: Record<LevelId, GameSettings> = {
  1: {
    level: 1,
    name: "Facile",
    time: 16,
    lives: 5,
    choices: 4,
    fifty: true,
    switch: true,
    fiftyUses: 1,
    switchUses: 1,
  },
  2: {
    level: 2,
    name: "Moyen",
    time: 12,
    lives: 4,
    choices: 5,
    fifty: true,
    switch: false,
    fiftyUses: 1,
    switchUses: 0,
  },
  3: {
    level: 3,
    name: "Difficile",
    time: 8,
    lives: 3,
    choices: 6,
    fifty: false,
    switch: false,
    fiftyUses: 0,
    switchUses: 0,
  },
};

export interface RoundAnswer {
  index: number;
  title: string;
}

export interface GameRound {
  image: string;
  correctIndex: number;
  answers: RoundAnswer[];
}

export interface RoundEvent {
  correct: boolean;
  timerRemaining: number;
  choices: number;
}

/**
 * Points pour une bonne réponse.
 */
export function computeRoundScore(choices: number, timerRemaining: number): number {
  return choices * 100 + timerRemaining * 10;
}

/**
 * Détermine si le joueur gagne une vie bonus au palier suivant.
 */
export function shouldGrantExtraLife(score: number, previousPalier: number): boolean {
  if (score >= 10000 && previousPalier === 0) return true;
  if (score >= 25000 && previousPalier === 1) return true;
  if (score >= 50000 && previousPalier >= 1) {
    const expectedPalier = Math.floor(1 + score / 50000);
    return expectedPalier > previousPalier;
  }
  return false;
}

/**
 * Recalcule le score serveur à partir des événements de partie.
 */
export function computeSessionScore(events: RoundEvent[]): number {
  return events.reduce(
    (total, event) =>
      event.correct ? total + computeRoundScore(event.choices, event.timerRemaining) : total,
    0
  );
}

export function validateUsername(username: string): string | null {
  const trimmed = username.trim();
  if (!trimmed) return "Indiquez votre pseudo.";
  if (trimmed.length < 3) return "3 caractères minimum.";
  if (trimmed.length > 9) return "9 caractères maximum.";
  return null;
}

export function levelNameFromId(level: LevelId): string {
  return LEVEL_SETTINGS[level].name;
}
