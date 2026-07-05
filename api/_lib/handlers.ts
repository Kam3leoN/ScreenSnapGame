import type { LevelId } from "../../shared/gameRules.js";
import { LEVEL_SETTINGS, validateUsername } from "../../shared/gameRules.js";
import { connectDb } from "../_lib/db.js";
import { createGameToken, generateRound, validateScoreSubmission } from "../_lib/gameLogic.js";
import { ScoreModel, SettingModel } from "../_lib/models.js";
import type { RoundEvent } from "../../shared/gameRules.js";

export async function getSettings(level: number) {
  await connectDb();
  const fromDb = await SettingModel.findOne({ level }).lean();
  if (fromDb) {
    return {
      level: fromDb.level,
      name: fromDb.name,
      time: fromDb.time,
      lives: fromDb.lives,
      choices: fromDb.choices,
      fifty: fromDb.fifty,
      switch: fromDb.switch,
      fiftyUses: fromDb.fiftyUses ?? 1,
      switchUses: fromDb.switchUses ?? 0,
    };
  }
  const fallback = LEVEL_SETTINGS[level as LevelId];
  if (!fallback) throw new Error("Niveau invalide");
  return fallback;
}

export async function startGameSession(level: number) {
  const settings = await getSettings(level);
  const token = createGameToken(level as LevelId);
  return { settings, token };
}

export async function createRound(choices: number) {
  await connectDb();
  return generateRound(choices);
}

export async function listScores(limit = 100) {
  await connectDb();
  return ScoreModel.find().sort({ hiscore: -1 }).limit(limit).lean();
}

export async function getBestScore() {
  await connectDb();
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

  await connectDb();
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
