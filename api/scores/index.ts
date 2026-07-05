import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBestScore, listScores, submitScore } from "../_lib/handlers.js";
import { parseJsonBody } from "../_lib/parseBody.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const limit = Number(req.query.limit ?? 100);
    const scores = await listScores(limit);
    return res.status(200).json(scores);
  }

  if (req.method === "POST") {
    const body = parseJsonBody<{
      token?: string;
      username?: string;
      score?: number | string;
      events?: unknown;
    }>(req);

    const result = await submitScore({
      token: String(body.token ?? ""),
      username: String(body.username ?? ""),
      score: Number(body.score ?? 0),
      events: Array.isArray(body.events) ? body.events : [],
      ip: req.headers["x-forwarded-for"]?.toString().split(",")[0],
    });
    return res.status(result.ok ? 200 : 400).json(result);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
