import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSettings } from "../_lib/handlers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const level = Number(req.query.level);
    const settings = await getSettings(level);
    return res.status(200).json(settings);
  } catch {
    return res.status(400).json({ error: "Niveau invalide" });
  }
}
