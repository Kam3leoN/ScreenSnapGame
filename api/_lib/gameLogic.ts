import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import {
  computeSessionScore,
  LEVEL_SETTINGS,
  type LevelId,
  type RoundEvent,
} from "../../shared/gameRules.js";
import { GameModel } from "./models.js";

export interface GameTokenPayload {
  level: LevelId;
  issuedAt: number;
  nonce: string;
}

function getSecret(): string {
  return process.env.GAME_TOKEN_SECRET ?? "dev-secret-change-me";
}

/**
 * Crée un token signé pour une session de jeu.
 */
export function createGameToken(level: LevelId): string {
  const payload: GameTokenPayload = {
    level,
    issuedAt: Date.now(),
    nonce: randomBytes(8).toString("hex"),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

/**
 * Vérifie et décode un token de partie.
 */
export function verifyGameToken(token: string): GameTokenPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = createHmac("sha256", getSecret()).update(body).digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as GameTokenPayload;
    if (!LEVEL_SETTINGS[payload.level]) return null;
    if (Date.now() - payload.issuedAt > 2 * 60 * 60 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export interface SubmitScoreInput {
  token: string;
  username: string;
  score: number;
  events: RoundEvent[];
}

/**
 * Valide la soumission de score côté serveur.
 */
export function validateScoreSubmission(input: SubmitScoreInput): {
  ok: boolean;
  score: number;
  level: string;
  error?: string;
} {
  const payload = verifyGameToken(input.token);
  if (!payload) {
    return { ok: false, score: 0, level: "", error: "Session de jeu invalide ou expirée." };
  }

  const settings = LEVEL_SETTINGS[payload.level];
  const serverScore = computeSessionScore(input.events);

  if (serverScore !== input.score) {
    return {
      ok: false,
      score: serverScore,
      level: settings.name,
      error: "Score incohérent avec la partie.",
    };
  }

  const maxRounds = input.events.length;
  const maxPossible = maxRounds * (settings.choices * 100 + settings.time * 10);
  if (input.score > maxPossible) {
    return {
      ok: false,
      score: serverScore,
      level: settings.name,
      error: "Score supérieur au maximum possible.",
    };
  }

  return { ok: true, score: serverScore, level: settings.name };
}

export interface RoundResult {
  image: string;
  correctTitle: string;
  correctIndex: number;
  answers: { index: number; title: string }[];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Tire une manche : 1 bonne réponse + distracteurs uniques.
 */
export async function generateRound(choicesCount: number): Promise<RoundResult> {
  const total = await GameModel.countDocuments();
  if (total < choicesCount) {
    throw new Error("Pas assez de jeux en base de données.");
  }

  const picked = new Set<string>();
  const games: { title: string; image: string }[] = [];

  while (games.length < choicesCount) {
    const skip = Math.floor(Math.random() * total);
    const doc = await GameModel.findOne().skip(skip).lean();
    if (!doc || picked.has(String(doc._id))) continue;
    picked.add(String(doc._id));
    games.push({ title: doc.title, image: doc.image });
  }

  const correct = games[0];
  const distractors = shuffle(games.slice(1));
  const ordered = shuffle([correct, ...distractors]);
  const correctIndex = ordered.findIndex((g) => g.title === correct.title) + 1;

  return {
    image: correct.image,
    correctTitle: correct.title,
    correctIndex,
    answers: ordered.map((g, i) => ({ index: i + 1, title: g.title })),
  };
}
