import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  createRound,
  getBestScore,
  getSettings,
  listScores,
  startGameSession,
  submitScore,
} from "../api/_lib/handlers.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get("/api/settings/:level", (req, res) => {
  try {
    const level = Number(req.params.level);
    const settings = getSettings(level);
    res.json(settings);
  } catch {
    res.status(400).json({ error: "Niveau invalide" });
  }
});

app.post("/api/games/session", (req, res) => {
  try {
    const level = Number(req.body.level);
    const session = startGameSession(level);
    res.json(session);
  } catch {
    res.status(400).json({ error: "Impossible de démarrer la session" });
  }
});

app.post("/api/games/round", async (req, res) => {
  try {
    const choices = Number(req.body.choices ?? 4);
    const round = await createRound(choices);
    res.json(round);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Erreur round" });
  }
});

app.get("/api/scores", async (req, res) => {
  const limit = Number(req.query.limit ?? 100);
  const scores = await listScores(limit);
  res.json(scores);
});

app.get("/api/scores/best", async (_req, res) => {
  const best = await getBestScore();
  res.json(best);
});

app.post("/api/scores", async (req, res) => {
  const result = await submitScore({
    token: req.body.token,
    username: req.body.username,
    score: Number(req.body.score),
    events: req.body.events ?? [],
    ip: req.ip,
  });
  res.status(result.ok ? 200 : 400).json(result);
});

app.listen(port, () => {
  console.log(`ScreenSnapGame API on http://localhost:${port}`);
});
