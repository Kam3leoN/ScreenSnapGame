import type { VercelRequest, VercelResponse } from "@vercel/node";
import { parseJsonBody } from "../_lib/parseBody.js";
import { startGameSession } from "../_lib/handlers.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = parseJsonBody<{ level?: number | string }>(req);
    const level = Number(body.level);
    if (level !== 1 && level !== 2 && level !== 3) {
      return res.status(400).json({ error: "Niveau invalide" });
    }
    const session = startGameSession(level);
    return res.status(200).json(session);
  } catch {
    return res.status(400).json({ error: "Impossible de démarrer la session" });
  }
}
