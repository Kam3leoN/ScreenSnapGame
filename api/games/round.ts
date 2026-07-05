import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createRound } from "../_lib/handlers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const choices = Number(req.body?.choices ?? 4);
    const round = await createRound(choices);
    return res.status(200).json(round);
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Erreur round",
    });
  }
}
