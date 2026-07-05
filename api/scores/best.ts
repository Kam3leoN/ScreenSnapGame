import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBestScore } from "../_lib/handlers.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const best = await getBestScore();
  return res.status(200).json(best);
}
