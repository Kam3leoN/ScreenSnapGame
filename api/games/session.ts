import type { VercelRequest, VercelResponse } from "@vercel/node";
import { startGameSession } from "../_lib/handlers.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const level = Number(req.body?.level);
    const session = startGameSession(level);
    return res.status(200).json(session);
  } catch {
    return res.status(400).json({ error: "Impossible de démarrer la session" });
  }
}
