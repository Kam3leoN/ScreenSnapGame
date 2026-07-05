import type { VercelRequest } from "@vercel/node";

/**
 * Parse le corps JSON d'une requête Vercel (string ou objet).
 */
export function parseJsonBody<T extends Record<string, unknown>>(req: VercelRequest): T {
  const raw = req.body;
  if (raw == null || raw === "") return {} as T;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return {} as T;
    }
  }
  return raw as T;
}
