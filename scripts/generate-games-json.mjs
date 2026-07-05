import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseGameInserts(sql) {
  const match = sql.match(/INSERT INTO `snap_games`[^;]+;/s);
  if (!match) return [];

  const valuesBlock = match[0].match(/\((\d+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'\)/g);
  if (!valuesBlock) return [];

  return valuesBlock
    .map((row) => {
      const m = row.match(/\((\d+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'\)/);
      if (!m) return null;
      return {
        legacyId: Number(m[1]),
        title: m[2].replace(/\\'/g, "'"),
        image: m[3].replace(/\\'/g, "'"),
      };
    })
    .filter(Boolean);
}

const sql = readFileSync(join(root, "sql/snap_games.sql"), "utf8");
const games = parseGameInserts(sql);
const outDir = join(root, "data");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "games.json"), JSON.stringify(games, null, 2));
console.log(`Generated ${games.length} games -> data/games.json`);
