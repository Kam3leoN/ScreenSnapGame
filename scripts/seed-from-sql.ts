import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../api/_lib/db.ts";
import { GameModel, ScoreModel, SettingModel } from "../api/_lib/models.ts";
import { LEVEL_SETTINGS } from "../shared/gameRules.ts";

dotenv.config();

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseGameInserts(sql: string) {
  const match = sql.match(/INSERT INTO `snap_games`[^;]+;/s);
  if (!match) return [];

  const valuesBlock = match[0].match(/\((\d+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'\)/g);
  if (!valuesBlock) return [];

  return valuesBlock.map((row) => {
    const m = row.match(/\((\d+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'\)/);
    if (!m) return null;
    return {
      legacyId: Number(m[1]),
      title: m[2].replace(/\\'/g, "'"),
      image: m[3].replace(/\\'/g, "'"),
    };
  }).filter(Boolean) as { legacyId: number; title: string; image: string }[];
}

function parseScoreInserts(sql: string) {
  const match = sql.match(/INSERT INTO `snap_scores`[^;]+;/s);
  if (!match) return [];

  const rows = match[0].match(/\(\d+,\s*'[^']*',\s*\d+,\s*'[^']*',\s*'[^']*'\)/g) ?? [];
  return rows.map((row) => {
    const m = row.match(/\(\d+,\s*'([^']*)',\s*(\d+),\s*'[^']*',\s*'([^']*)'\)/);
    if (!m) return null;
    const date = m[3] === "0000-00-00 00:00:00" ? new Date() : new Date(m[3]);
    return {
      username: m[1],
      hiscore: Number(m[2]),
      level: "Facile",
      createdAt: date,
    };
  }).filter(Boolean) as { username: string; hiscore: number; level: string; createdAt: Date }[];
}

async function seed() {
  await connectDb();

  const gamesSql = readFileSync(join(root, "sql/snap_games.sql"), "utf8");
  const scoresSql = readFileSync(join(root, "sql/snap_scores.sql"), "utf8");

  const games = parseGameInserts(gamesSql);
  for (const game of games) {
    await GameModel.updateOne(
      { legacyId: game.legacyId },
      { $set: game },
      { upsert: true }
    );
  }
  console.log(`Games seeded: ${games.length}`);

  for (const setting of Object.values(LEVEL_SETTINGS)) {
    await SettingModel.updateOne({ level: setting.level }, { $set: setting }, { upsert: true });
  }
  console.log("Settings seeded: 3");

  const scores = parseScoreInserts(scoresSql);
  for (const score of scores) {
    await ScoreModel.updateOne(
      { username: score.username },
      { $setOnInsert: score },
      { upsert: true }
    );
  }
  console.log(`Scores seeded: ${scores.length}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
