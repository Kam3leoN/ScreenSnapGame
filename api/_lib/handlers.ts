import type { LevelId } from "../../shared/gameRules.js";
import { LEVEL_SETTINGS, validateUsername } from "../../shared/gameRules.js";
import { connectDb } from "./db.js";
import { createGameToken, generateRound, validateScoreSubmission } from "./gameLogic.js";
import { ScoreModel } from "./models.js";
import type { RoundEvent } from "../../shared/gameRules.js";

/**
 * Paramètres de niveau (statiques, pas de DB requise).
 */
export function getSettings(level: number) {
  const settings = LEVEL_SETTINGS[level as LevelId];
  if (!settings) throw new Error("Niveau invalide");
  return settings;
}

export function startGameSession(level: number) {
  const settings = getSettings(level);
  const token = createGameToken(level as LevelId);
  return { settings, token };
}

export async function createRound(choices: number) {
  return generateRound(choices);
}

export async function listScores(limit = 100) {
  const conn = await connectDb();
  if (!conn) return [];
  return ScoreModel.find().sort({ hiscore: -1 }).limit(limit).lean();
}

export async function getBestScore() {
  const conn = await connectDb();
  if (!conn) return null;
  const best = await ScoreModel.findOne().sort({ hiscore: -1 }).lean();
  return best ?? null;
}

export async function submitScore(body: {
  token: string;
  username: string;
  score: number;
  events: RoundEvent[];
  ip?: string;
}) {
  const usernameError = validateUsername(body.username);
  if (usernameError) {
    return { ok: false as const, message: usernameError };
  }

  const validation = validateScoreSubmission({
    token: body.token,
    username: body.username,
    score: body.score,
    events: body.events,
  });

  if (!validation.ok) {
    return { ok: false as const, message: validation.error ?? "Score refusé." };
  }

  const conn = await connectDb();
  if (!conn) {
    return {
      ok: false as const,
      message: "Enregistrement des scores indisponible (base de données non configurée).",
    };
  }

  const username = body.username.trim();
  const existing = await ScoreModel.findOne({ username });

  if (!existing) {
    await ScoreModel.create({
      username,
      hiscore: validation.score,
      level: validation.level,
      ip: body.ip,
      createdAt: new Date(),
    });
    return { ok: true as const, message: "Bravo ! Votre score est enregistré." };
  }

  if (validation.score > existing.hiscore) {
    existing.hiscore = validation.score;
    existing.level = validation.level;
    existing.createdAt = new Date();
    if (body.ip) existing.ip = body.ip;
    await existing.save();
    return { ok: true as const, message: "Bravo ! Vous avez augmenté votre Hi-Score." };
  }

  if (validation.score === existing.hiscore) {
    return { ok: true as const, message: "Score égal à votre précédent Hi-Score." };
  }

  return { ok: true as const, message: "Score inférieur à votre Hi-Score précédent." };
}
