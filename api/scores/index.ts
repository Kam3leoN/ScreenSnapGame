import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBestScore, listScores, submitScore } from "../_lib/handlers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const limit = Number(req.query.limit ?? 100);
    const scores = await listScores(limit);
    return res.status(200).json(scores);
  }

  if (req.method === "POST") {
    const result = await submitScore({
      token: String(req.body?.token ?? ""),
      username: String(req.body?.username ?? ""),
      score: Number(req.body?.score ?? 0),
      events: req.body?.events ?? [],
      ip: req.headers["x-forwarded-for"]?.toString().split(",")[0],
    });
    return res.status(result.ok ? 200 : 400).json(result);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
