import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createRound } from "../_lib/handlers.js";
import { parseJsonBody } from "../_lib/parseBody.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = parseJsonBody<{ choices?: number | string }>(req);
    const choices = Number(body.choices ?? 4);
    if (choices < 3 || choices > 6) {
      return res.status(400).json({ error: "Nombre de choix invalide" });
    }
    const round = await createRound(choices);
    return res.status(200).json(round);
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Erreur round",
    });
  }
}
